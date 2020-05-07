import Link from 'next/link';
import {CaptchaV3} from '../CaptchaV3';
import {Consumer} from './context';

const Disclaimer = ({insurance = false, recaptchaAction}) => {
    if (!recaptchaAction) {
        console.warn(
            'Missing recaptcha action. Please add recapchaAction prop to your Disclaimer component.'
        );
    }
    return (
        <Consumer>
            {formContext => (
                <React.Fragment>
                    <CaptchaV3
                        verifyCaptcha={formContext.verifyCaptcha}
                        action={recaptchaAction}
                    />
                    <div className="disclaimer">
                        By submitting this form you agree to the{' '}
                        <Link
                            as="/terms-of-use"
                            href={{
                                pathname: 'page-templates',
                                query: {
                                    slug: 'terms-of-use'
                                }
                            }}>
                            <a target="_blank" className="text-xxs">
                                terms of use
                            </a>
                        </Link>{' '}
                        and{' '}
                        <Link
                            as="/policy"
                            href={{
                                pathname: 'page-templates',
                                query: {
                                    slug: 'policy'
                                }
                            }}>
                            <a target="_blank" className="text-xxs">
                                privacy policy
                            </a>
                        </Link>{' '}
                        of the website.{' '}
                        <div>
                            We respect your privacy. By sharing your phone number, you
                            agree to receive texts from us – including details about your
                            benefits. Message and data rates may apply. Sharing this
                            information is not a condition of treatment.
                        </div>
                        {insurance && (
                            <div className="insurance-disclaimer">
                                <div>
                                    <span
                                        style={{
                                            marginRight: '5px',
                                            fontWeight: 'bold'
                                        }}>
                                        1
                                    </span>
                                    <span
                                        style={{
                                            fontWeight: 'bold',
                                            position: 'relative'
                                        }}>
                                        Insurance Disclaimer:
                                    </span>{' '}
                                    American Addiction Centers will attempt to verify your
                                    health insurance benefits and/or necessary
                                    authorizations on your behalf. Please note, this is
                                    only a quote of benefits and/or authorization. We
                                    cannot guarantee payment or verification eligibility
                                    as conveyed by your health insurance provider will be
                                    accurate and complete. Payment of benefits are subject
                                    to all terms, conditions, limitations, and exclusions
                                    of the member’s contract at time of service. Your
                                    health insurance company will only pay for services
                                    that it determines to be “reasonable and necessary.”
                                    American Addiction Centers will make every effort to
                                    have all services preauthorized by your health
                                    insurance company. If your health insurance company
                                    determines that a particular service is not reasonable
                                    and necessary, or that a particular service is not
                                    covered under your plan, your insurer will deny
                                    payment for that service and it will become your
                                    responsibility.
                                </div>
                            </div>
                        )}
                        <style jsx>
                            {`
                                .disclaimer {
                                    font-size: 10px;
                                }
                            `}
                        </style>
                    </div>
                </React.Fragment>
            )}
        </Consumer>
    );
};
export default Disclaimer;
