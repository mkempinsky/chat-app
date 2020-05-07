import React from 'react';
import {gray, dropShadow, red, BREAKPOINT, blue} from '../../lib/styles';
import {getProp} from '../../lib/utils';
import OutsideClick from '../OutsideClick';
import Image from '../Image';
import {Consumer} from './context';

/*
 *	expects a prop value of 'options' as an array
 *	array should contain objects with 'name' and 'value' keys
 * 	example: options = [{name: 'hello', value: 'world'}]
 */

class SearchSelect extends React.Component {
    state = {
        filteredOptions: null,
        isDropdownActive: null,
        value: '',
        option: '',
        searchValue: '',
        isSearchAttempted: null,
        shouldShowNoValueError: null
    };

    handleReset = (e, name) => {
        e.preventDefault();
        this.setState({
            value: '',
            option: '',
            searchValue: ''
        });
        this.props.context.handleOptionUpdate(name, '', '');
    };

    handleChange = e => {
        const options = getProp(this.props, 'options');
        const searchValue = e.target.value;

        // filter options as user types
        const filteredOptions = options.filter(option => {
            const nameLowerCase = option.name.toLowerCase();
            const searchValueLowerCase = searchValue.toLowerCase();
            return nameLowerCase.indexOf(searchValueLowerCase) > -1;
        });

        // only show dropdown after user types 3rd character
        const shouldShowDropdown = searchValue.length >= 3 ? true : false;

        // show error if there's no results matching user input
        const shouldShowNoOptionsError =
            shouldShowDropdown && filteredOptions.length <= 0;

        this.setState({
            value: '',
            isDropdownActive: shouldShowDropdown,
            option: searchValue,
            filteredOptions,
            isSearchAttempted: true,
            searchValue,
            shouldShowNoOptionsError,
            isUserTyping: true
        });
    };

    toggleSearchResults = e => {
        this.setState({
            isDropdownActive: !this.state.isDropdownActive
        });
    };

    handleOutsideClick = e => {
        const option = this.state.value && this.state.option;
        const shouldShowNoValueError = !this.state.value && this.state.isSearchAttempted;
        this.setState({
            isDropdownActive: false,
            option,
            shouldShowNoValueError
        });
    };

    handleValueUpdateOnClick = e => {
        const value = e.currentTarget.dataset.value;
        const option = e.currentTarget.dataset.option;
        const name = e.currentTarget.dataset.name;
        this.setState({
            value,
            option,
            name,
            isDropdownActive: false,
            shouldShowNoValueError: false
        });
        this.props.context.handleOptionUpdate(name, value, option);
    };

    // handle on focus in parent - example: getProviders()
    handleOnFocus = e => {
        this.setState({
            isSearchAttempted: true,
            shouldShowNoValueError: false
        });
        if (!this.props.onFocus) return;
        this.props.onFocus();
    };

    handleBlur = e => {
        // don't show error when user clicks selection (causing blur)
        if (this.state.isDropdownActive) return;
        const shouldShowNoValueError = !this.state.value && this.state.isSearchAttempted;

        this.setState({
            shouldShowNoValueError
        });
    };

    render() {
        // show the filtered options as user types or all options from props
        const options = this.state.filteredOptions || getProp(this.props, 'options');

        // conditional errors
        const shouldShowNoOptionsError = this.state.shouldShowNoOptionsError;
        const shouldShowNoValueError = this.state.shouldShowNoValueError;

        // props
        const label = getProp(this.props, 'label', '');
        const helptext = getProp(this.props, 'helptext', '');
        const required = getProp(this.props, 'required');
        const placeholder = getProp(this.props, 'placeholder', 'Type to Search');
        const referenceNumber = getProp(this.props, 'referenceNumber');
        const customErrorMessage = getProp(this.props, 'customErrorMessage', '');
        const name = getProp(this.props, 'name', '');

        const overrides = getProp(this.props, 'overrides', {});
        const {className: jsxClassName = '', styles: overrideStyles = ''} = overrides;

        const {option} = this.state;

        return (
            <div
                className="search-select"
                style={this.props.style}
                tabIndex="0"
                onBlur={this.handleBlur}
                onFocus={this.handleOnFocus}>
                <div className="labels">
                    <div className="label" dangerouslySetInnerHTML={{__html: label}} />
                    {required && <div style={{color: red(), marginLeft: '2px'}}>*</div>}
                    {referenceNumber && (
                        <div
                            style={{
                                fontSize: '8px',
                                fontWeight: '700',
                                verticalAlign: 'top',
                                marginLeft: '3px'
                            }}>
                            {referenceNumber}
                        </div>
                    )}
                    <div
                        className="helptext"
                        dangerouslySetInnerHTML={{__html: helptext}}
                    />
                </div>
                <div className="input-container">
                    <input
                        tabIndex="-1"
                        autoComplete="off"
                        name={name}
                        value={option}
                        placeholder={placeholder}
                        onChange={this.handleChange}
                        className={`${jsxClassName} ${
                            shouldShowNoValueError ? 'error' : ''
                        }`}
                    />
                    {option && (
                        <div className="clear" onClick={e => this.handleReset(e, name)}>
                            clear
                        </div>
                    )}
                </div>

                <OutsideClick onClick={this.handleOutsideClick}>
                    {this.state.isDropdownActive && (
                        <div className="options">
                            <ul>
                                {options &&
                                    options.map((option, index) => {
                                        let title = option.name.toLowerCase();
                                        const searchValue = this.state.searchValue.toLowerCase();
                                        if (title.indexOf(searchValue) > -1) {
                                            title = title.replace(
                                                searchValue,
                                                `<b style="color: #000">${searchValue}</b>`
                                            );
                                        }
                                        title = `<span style="text-transform: capitalize">${title}</span>`;
                                        return (
                                            <li
                                                key={
                                                    `${option.value}-${index}` ||
                                                    `${option.name}-${index}`
                                                }
                                                data-value={option.value || option.name}
                                                data-option={option.name}
                                                data-name={this.props.name}
                                                onClick={this.handleValueUpdateOnClick}
                                                dangerouslySetInnerHTML={{
                                                    __html: title
                                                }}
                                            />
                                        );
                                    })}
                                {shouldShowNoOptionsError && (
                                    <li
                                        style={{
                                            fontWeight: 'bold',
                                            color: red(200)
                                        }}>
                                        {customErrorMessage ? (
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html: customErrorMessage
                                                }}
                                            />
                                        ) : (
                                            <div>
                                                No options found. Please check your
                                                spelling.
                                            </div>
                                        )}
                                    </li>
                                )}
                            </ul>
                        </div>
                    )}
                </OutsideClick>

                <style jsx>{`
                    .search-select {
                        max-width: 100%;
                        font-family: Arial, sans-serif;
                    }

                    .search-select:focus {
                        outline: 0;
                    }

                    .search-select:focus input {
                        border: 1px solid ${blue()};
                        background: #fff;
                    }

                    input {
                        border: 1px solid #ddd;
                        border-radius: 4px;
                        display: block;
                        width: 100%;
                        min-height: 45px;
                        position: relative;
                        outline: none;
                        background: #fafafa;
                        font-size: 15px;
                    }

                    .options {
                        position: relative;
                        display: block;
                        min-width: 100%;
                        box-shadow: ${dropShadow()};
                        z-index: 12;
                    }
                    ul {
                        border: 1px solid ${blue()};
                        max-height: 200px;
                        min-width: 100%;
                        overflow-x: scroll;
                        list-style: none;
                        padding: 0;
                        margin: 0;
                        position: absolute;
                        background: #fff;
                        z-index: 1;
                    }
                    li {
                        color: ${gray(700)};
                        padding: 5px 15px;
                        font-size: 13px;
                        text-align: left;
                    }
                    li:hover {
                        cursor: pointer;
                        background: ${gray(450)};
                        transition: all 0.25s;
                    }
                    .warning {
                        color: ${red(200)};
                        font-size: 13px;
                        font-weight: bold;
                        display: block;
                        padding-top: 10px;
                        font-family: Arial, sans-serif;
                    }
                    .labels {
                        display: flex;
                        padding-bottom: 5px;
                    }
                    .label,
                    .helptext {
                        font-family: Arial, sans-serif;
                        font-size: 13px;
                    }
                    .helptext {
                        font-style: italic;
                        color: rgba(0, 0, 0, 0.5);
                        margin-left: 5px;
                    }
                    .input-container {
                        position: relative;
                    }
                    .clear {
                        color: ${blue()};
                        font-size: 12px;
                        position: absolute;
                        top: 5px;
                        right: 5px;
                    }
                    .clear:hover {
                        cursor: pointer;
                    }
                `}</style>
                {overrideStyles}
            </div>
        );
    }
}
export default function SearchSelectWithContext(props) {
    return (
        <Consumer>{context => <SearchSelect {...props} context={context} />}</Consumer>
    );
}
