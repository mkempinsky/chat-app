/**
 * Phone number registered with CallRail
 * Number should swap on DOM load
 */

export const callTrackingNumber = '(888) 966-8152';
export const callTrackingNumberLink = 'tel:+1-888-966-8152';
export const spanishCallTrackingNumber = '(888) 499-7605';
export const spanishCallTrackingNumberLink = 'tel:+1-888-499-7605';

// BD Phone Number
export const bdPhone = '(866) 537-6237';
export const bdPhoneLink = 'tel:+1-866-537-6237';

// Verify Form Tracking Number
export const SsvobVerificationPhone = '(866) 279-7744';
export const SsvobVerificationPhoneLink = 'tel:+1-866-279-7744';
export const SsvobVerificationPhoneSMS = 'sms:+1-866-279-7744';

// Give Hope Number
export const GiveHopePhone = '(866) 596-0816';
export const GiveHopePhoneLink = 'tel:+1-866-596-0816';

// General Inqueries Phone Number
export const generalInquiriesPhone = '(615) 732-1616';
export const generalInquiriesPhoneLink = 'tel:+1-615-732-1616';

// Media & PR Phone Number
export const mediaPhone = '(615) 587-7728';
export const mediaPhoneLink = 'tel:+1-615-587-7728';
export const mediaEmail = 'mediarequest@contactAAC.com';
export const mediaEmailLink = 'mailto:mediarequest@contactAAC.com';

//form error message
export const formMessage = {
    error:
        'There was an issue with your request. Please contact us by phone or try back later.',
    success:
        'We have received your message. We will be in touch within the next 48 hours.',
};

//recaptcha errors
export const recaptchaErrors = {
    isRobotError: '*reCAPTCHA has identified you as a robot',
    uncheckedError: '*Please check the reCAPTCHA box',
};

//recaptchaKey
export const recaptchaKey = '6LcXKXUUAAAAAM5ipnhpJv1VBU845QhAF8Kcv9fk';

// recaptcha v3 Key
export const captcha_v3_key = '6Lce3Z4UAAAAADEx131BbozVpgx0ItFaWmwt0svj';

// scholarship email address
export const scholarshipToEmail = 'scholarship@contactaac.com';
export const scholarshipFromEmail = 'scholarship@americanaddictioncenters.org';

//corporate phone number
export const corporatePhone = '(888) 987-1784';
export const corporatePhoneLink = 'tel:+1-888-987-1784';

// social media links
export const twitterLink = 'https://twitter.com/AAC_Tweet';
export const facebookLink = 'https://www.facebook.com/AmericanAddictionCenters';
export const linkedinLink =
    'https://www.linkedin.com/company/american-addiction-centers/';
export const instagramLink = 'https://www.instagram.com/americanaddictioncenters/';

export const facilityTherapiesUrl =
    'https://www.oxfordtreatment.com/wp-json/wp/v2/therapy-comparison-chart';
export const facilityAmenetiesUrl =
    'https://www.oxfordtreatment.com/wp-json/wp/v2/amenities-comparison-chart';

// Compliance URLs
export const complianceUrls = [
    'policy',
    'notice-of-privacy-practices',
    'terms-of-use',
    'behavioral-health-academic-scholarship',
    'givehope',
    'shotcodes',
    'style-guide',
];

export const insuranceDisclaimer =
    '<strong>Insurance Disclaimer:</strong> American Addiction Centers may attempt to verify your health insurance benefits and/or necessary authorizations on your behalf. Please note, this is only a quote of benefits and/or authorization. We cannot guarantee payment or verification eligibility as conveyed by your health insurance provider will be accurate and complete. Payment of benefits are subject to all terms, conditions, limitations, and exclusions of the member\'s contract at time of service. Your health insurance company will only pay for services that it determines to be "reasonable and necessary." American Addiction Centers will make every effort to have all services preauthorized by your health insurance company. If your health insurance company determines that a particular service is not reasonable and necessary, or that a particular service is not covered under your plan, your insurer will deny payment for that service and it will become your responsibility.';

/**
 * VTX provider names/ids that are specifically in network with aac facilites
 */
export const inNetworkProviders = [
    {payer_id: 'VTX0518', payer_name: '1199 National Benefit Fund (SEUI)'},
    {payer_id: 'VTX0490', payer_name: 'AETNA'},
    {payer_id: 'VTX0498', payer_name: 'BC OF IDAHO'},
    {payer_id: 'VTX0453', payer_name: 'BLUE CROSS BLUE SHIELD'},
    {payer_id: 'VTX0085', payer_name: 'BLUE SHIELD'},
    {payer_id: 'VTX0532', payer_name: 'BLUE CROSS AND BLUE SHIELD OF TEXAS'},
    {payer_id: 'VTX0127', payer_name: 'CIGNA'},
    {payer_id: 'VTX0523', payer_name: 'MAGELLAN HEALTH SERVICES'},
    {payer_id: 'VTX0322', payer_name: 'QUALCARE'},
    {payer_id: 'VTX0154', payer_name: 'ROCKY MOUNTAIN HMO COLORADO'},
    {payer_id: 'VTX0027', payer_name: 'SCHALLER ANDERSON AETNA BETTER HEALTH OF NY'},
    {payer_id: 'VTX0265', payer_name: 'SCHALLER ANDERSON AETNA BETTER HEALTH OF OHIO'},
    {payer_id: 'VTX0130', payer_name: 'TUFTS HEALTH PLAN'},
    {payer_id: 'VTX0063', payer_name: 'UNITEDHEALTHCARE'},
    {payer_id: 'VTX0338', payer_name: 'HUMANA'},
    {payer_id: 'VTX0266', payer_name: 'HEALTH FIRST HEALTH PLAN'},
];
/**
 * Insurance code types from vtx api response
 */
export const approvedInsuranceTypes = [
    {code: 'HM', label: 'Health Maintenance Organization (HMO)'},
    {code: 'PR', label: 'Preferred Provider Organization (PPO)'},
];

// US States Array
export const usStates = [
    {name: 'Alabama', abv: 'AL'},
    {name: 'Alaska', abv: 'AK'},
    {name: 'Arizona', abv: 'AZ'},
    {name: 'Arkansas', abv: 'AR'},
    {name: 'California', abv: 'CA'},
    {name: 'Colorado', abv: 'CO'},
    {name: 'Connecticut', abv: 'CT'},
    {name: 'Delaware', abv: 'DE'},
    {name: 'District of Columbia', abv: 'DC'},
    {name: 'Florida', abv: 'FL'},
    {name: 'Georgia', abv: 'GA'},
    {name: 'Hawaii', abv: 'HI'},
    {name: 'Idaho', abv: 'ID'},
    {name: 'Illinois', abv: 'IL'},
    {name: 'Indiana', abv: 'IN'},
    {name: 'Iowa', abv: 'IA'},
    {name: 'Kansas', abv: 'KS'},
    {name: 'Kentucky', abv: 'KY'},
    {name: 'Louisiana', abv: 'LA'},
    {name: 'Maine', abv: 'ME'},
    {name: 'Maryland', abv: 'MD'},
    {name: 'Massachusetts', abv: 'MA'},
    {name: 'Michigan', abv: 'MI'},
    {name: 'Minnesota', abv: 'MN'},
    {name: 'Mississippi', abv: 'MS'},
    {name: 'Missouri', abv: 'MO'},
    {name: 'Montana', abv: 'MT'},
    {name: 'Nebraska', abv: 'NE'},
    {name: 'Nevada', abv: 'NV'},
    {name: 'New Hampshire', abv: 'NH'},
    {name: 'New Jersey', abv: 'NJ'},
    {name: 'New Mexico', abv: 'NM'},
    {name: 'New York', abv: 'NY'},
    {name: 'North Carolina', abv: 'NC'},
    {name: 'North Dakota', abv: 'ND'},
    {name: 'Ohio', abv: 'OH'},
    {name: 'Oklahoma', abv: 'OK'},
    {name: 'Oregon', abv: 'OR'},
    {name: 'Pennsylvania', abv: 'PA'},
    {name: 'Puerto Rico', abv: 'PR'},
    {name: 'Rhode Island', abv: 'RI'},
    {name: 'South Carolina', abv: 'SC'},
    {name: 'South Dakota', abv: 'SD'},
    {name: 'Tennessee', abv: 'TN'},
    {name: 'Texas', abv: 'TX'},
    {name: 'Utah', abv: 'UT'},
    {name: 'Vermont', abv: 'VT'},
    {name: 'Virginia', abv: 'VA'},
    {name: 'Washington', abv: 'WA'},
    {name: 'West Virginia', abv: 'WV'},
    {name: 'Wisconsin', abv: 'WI'},
    {name: 'Wyoming', abv: 'WY'},
];
