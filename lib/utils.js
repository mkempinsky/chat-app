import url from 'url';
import {complianceUrls} from './globals';

export const getProp = (obj, keys, defaultValue = null) => {
    const objectKeys = keys.split('.');
    const allKeys = objectKeys.reduce((acc, key) => {
        const match = key.match(/\[\d\]$/);
        if (match) {
            const propName = key.slice(0, match.index);
            propName && acc.push(propName);
            const index = +key.slice(match.index + 1, key.length - 1);
            acc.push(index);
        } else {
            acc.push(key);
        }

        return acc;
    }, []);

    const result = allKeys.reduce((acc, cur) => {
        return acc === null || acc === undefined ? acc : acc[cur];
    }, obj);

    return result !== undefined && result !== null ? result : defaultValue;
};

export const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

export const splitPathname = (pathname) => {
    if (typeof pathname !== 'string') {
        console.log('Path must be a string');
        return;
    }
    let path = `/${pathname}/`;
    path = path.split('/');
    path = path.filter((item) => item !== '');
    return path;
};

export const getSlug = (str) => {
    const pathname = splitPathname(str);
    return pathname[pathname.length - 1];
};

export const isValidEmail = (input) => {
    if (typeof input !== 'string') {
        console.warn('Email input must be a sting.');
        return false;
    }
    return /.+@.+\..+/.test(input);
};

export const getElemOffset = (el) => {
    if (typeof window === 'undefined') {
        console.log('window object not available');
        return;
    }
    const rect = el.getBoundingClientRect();
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    return {top: rect.top + scrollTop, left: rect.left + scrollLeft};
};

export const getHeadings = (html) => {
    if (!html) return [];
    // grab all the heading from the content
    const expression = /<h2.*>(.*?)<\/h2>/g;
    const matches = html.match(expression) || [];
    const headings = matches.map((item) => {
        const startString = item.indexOf('>');
        const endString = item.indexOf('</');
        const title = item.substring(startString + 1, endString);
        if (title === '') {
            return;
        } else {
            return title;
        }
    });

    return headings;
};

export const splitByWord = (str) => {
    if (typeof str !== 'string') {
        console.log('Must pass a string to kebabCase');
        return [];
    }

    /**
     * URI with spaces
     */
    if (str.match('%20')) {
        return str.split('%20');
    }

    /**
     * Spaces
     */
    if (str.match(' ')) {
        return str.split(' ');
    }

    /**
     * Dashes
     */
    if (str.match('-')) {
        return str.split('-');
    }

    /**
     * Underscores
     */
    if (str.match('_')) {
        return str.split('_');
    }

    /**
     * Camel case
     */
    if (/[A-Z]/.test(str)) {
        const splitBySpaces = str.split('').reduce((acc, letter, i) => {
            if (/[A-Z]/.test(letter) && i !== 0) {
                acc += ' ';
            }

            acc += letter;

            return acc;
        }, '');

        return splitBySpaces.split(' ');
    }

    return [str];
};

export const toCapitalCase = (str) => {
    const wordArray = splitByWord(str);

    const capitalized = wordArray.map((word) => {
        const firstLetter = word.slice(0, 1);
        const uppercase = firstLetter.toUpperCase();
        return uppercase + word.slice(1);
    });

    return capitalized.join(' ');
};

export function alphabetize(prop) {
    return (a, b) => {
        const aValue = prop ? getProp(a, prop) : a;
        const bValue = prop ? getProp(b, prop) : b;
        if (aValue.toLowerCase() < bValue.toLowerCase()) {
            return -1;
        } else if (aValue.toLowerCase() > bValue.toLowerCase()) {
            return 1;
        } else {
            return 0;
        }
    };
}

export function alphabetizeArrayByKey(array, key) {
    if (!array || !Array.isArray(array)) return [];
    const newArray = array.sort(function (a, b) {
        const varA = getProp(a, key);
        const varB = getProp(b, key);
        if (varA < varB) {
            return -1;
        }
        if (varA > varB) {
            return 1;
        }
        return 0;
    });
    return newArray;
}

export const tagsToReplace = {
    '&#8211;': '-',
    '&#038;': '&',
    '&#8217;': "'",
    '&#8220;': '"',
};

/**
 * Escaping HTML entities because dangerouslySetInnerHTML
 * doesn't work with <title> tags
 * https://github.com/zeit/next.js/issues/910
 */
export function replaceHtmlEntities(str) {
    if (!str || typeof str !== 'string') return;
    return str.replace(/&\S+;/g, (tag) => {
        return tagsToReplace[tag] || str;
    });
}

export const appendScript = (src) => {
    if (typeof src !== 'string') {
        console.warn('You must provide a string as a source');
        return;
    }
    if (typeof document === 'undefined') {
        console.warn('No document found');
        return;
    }
    const script = document.createElement('script');
    script.src = src;
    document.body.appendChild(script);
};

export const getDataFromProps = (props) => {
    const data = getProp(props, 'data') || getProp(props, 'data.data') || [];
    return data;
};

export const getStatusCode = (props) => {
    const status =
        getProp(props, 'status') ||
        getProp(props, 'data.status') ||
        getProp(props, 'data.data.status');
    return status;
};

export const shouldShowError = (props) => {
    const statusCode = getStatusCode(props);
    if (props.error) {
        return statusCode || 404;
    } else if (statusCode && statusCode !== 200) {
        return statusCode;
    } else if (getDataFromProps(props).length === 0) {
        return statusCode || 404;
    }
    return false;
};

export const isSpanishPage = (slug) => {
    return slug === 'esp';
};

export const getCookieObject = () => {
    if (typeof document === 'undefined') {
        console.warn('No document found');
        return {};
    }
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieList = decodedCookie.split(';');
    const cookieObject = cookieList.reduce((acc, cookie) => {
        const cookieValues = cookie.split('=');
        if (cookieValues.length) {
            acc[cookieValues[0].trim()] = cookieValues[1] ? cookieValues[1].trim() : '';
        }
        return acc;
    }, {});
    return cookieObject;
};

export const getCookie = (name) => {
    const value = getCookieObject();
    return value[name] || '';
};

export const formatPhoneNumber = (value) => {
    if (!value || typeof value !== 'string') return '';
    let num = value.replace(/\D/g, '');
    if (value.length > 4) {
        var dash1 = '-';
    } else {
        var dash1 = '';
    }
    if (value.length > 7) {
        var dash2 = '-';
    } else {
        var dash2 = '';
    }
    value =
        num.substring(0, 3) + dash1 + num.substring(3, 6) + dash2 + num.substring(6, 10);
    return value;
};

export const validateEmail = (value) => {
    const isValid = value.indexOf('@') >= 1 && value.indexOf('.') >= 1;
    return isValid;
};

export const getTimeZone = () => {
    function timezone(dt) {
        return /\((.*)\)/.exec(new Date().toString())[1];
    }

    const dt = new Date();
    const timeZone = timezone(dt);

    return timeZone;
};
export const isCompliancePage = (path) => {
    const complianceUrlsTrailingSlash = [...complianceUrls].map((path) => {
        return `${path}/`;
    });
    const complianceUrlsBeginningSlash = [...complianceUrls].map((path) => {
        return `/${path}`;
    });
    const pathname = url.parse(path, true).pathname;
    const isCompliancePage =
        complianceUrls.includes(pathname) ||
        complianceUrlsTrailingSlash.includes(pathname) ||
        complianceUrlsBeginningSlash.includes(pathname);
    return isCompliancePage;
};

export const containsUrl = (path, urls) => {
    const urlsTrailingSlash = [...urls].map((path) => {
        return `${path}/`;
    });
    const urlsBeginningSlash = [...urls].map((path) => {
        return `/${path}`;
    });
    const pathname = url.parse(path, true).pathname;
    const containsUrl =
        urls.includes(pathname) ||
        urlsTrailingSlash.includes(pathname) ||
        urlsBeginningSlash.includes(pathname);
    return containsUrl;
};

export const filterPaths = (paths) => {
    const filteredPaths = paths.reduce((acc, path) => {
        const firstCharacter = path.substring(0, 1);
        if (firstCharacter !== '?' && path.includes('?')) {
            acc.push(path.split('?')[0]);
        } else if (firstCharacter !== '#' && firstCharacter !== '?' && path !== 'page') {
            acc.push(path);
        }
        return acc;
    }, []);
    return filteredPaths;
};

export const formatDate = (value) => {
    // replace all characters other than numbers

    let num = value.replace(/\D/g, '');
    const firstNumber = parseInt(num[0]);
    if (firstNumber > 1) {
        return '';
    }

    let dash1;
    let dash2;

    if (value.length > 2) {
        dash1 = '/';
    } else {
        dash1 = '';
    }
    if (value.length > 5) {
        dash2 = '/';
    } else {
        dash2 = '';
    }

    value =
        num.substring(0, 2) + dash1 + num.substring(2, 4) + dash2 + num.substring(4, 8);

    return value;
};

export const lazyLoadImagesServerside = `
console.log('serverside lazy');
let script = document.createElement('script');
script.src =
    'https://cdn.jsdelivr.net/npm/vanilla-lazyload@12.0.0/dist/lazyload.min.js';
// Use vanilla-lazyload
window.lazyLoadOptions = {
    elements_selector: '[loading=lazyel], [loading=lazybg]'
};
let head = document.getElementsByTagName('head')[0];
head.append(script);
`;

export const lazyLoadImagesClientside = () => {
    let script = document.createElement('script');
    script.src =
        'https://cdn.jsdelivr.net/npm/vanilla-lazyload@12.0.0/dist/lazyload.min.js';
    // Use vanilla-lazyload
    window.lazyLoadOptions = {
        elements_selector: '[loading=lazyel], [loading=lazybg]',
    };
    let head = document.getElementsByTagName('head')[0];
    head.append(script);
};

export const isValidJson = (schema) => {
    let isValidJson;
    try {
        schema = JSON.parse(schema);
        isValidJson = true;
    } catch (e) {
        return null;
    }
    return isValidJson;
};

export const removeTrailingSlash = (url) => {
    const lastChar = url.substr(-1);
    if (lastChar === '/') {
        url = url.substring(0, url.length - 1);
    }
    return url;
};
