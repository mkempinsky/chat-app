import {gray, red} from '../../lib/styles';
import {SuccessIcon, Error} from '../Svgs';
import Link from 'next/link';
import Button from '../Button';
import {callTrackingNumberLink, callTrackingNumber} from '../../lib/globals';
const Response = ({success}) => {
    return (
        <div className="response">
            {success && (
                <React.Fragment>
                    <div>
                        <SuccessIcon />
                    </div>
                    <div className="response__header">Thank you for contacting us.</div>
                </React.Fragment>
            )}
            {!success && (
                <React.Fragment>
                    <div>
                        <Error fill={red()} />
                    </div>
                    <div className="response__header">
                        There was an error submitting this form.
                    </div>
                </React.Fragment>
            )}

            <div>
                If you are in need of immediate treatment, please contact an admissions
                navigator to explore treatment options.
            </div>
            <div>
                <a href={callTrackingNumberLink}>Call {callTrackingNumber}</a>
            </div>
            <div className="response__button-container">
                <Link as="/treatment-centers" href={{pathname: '/treatment-centers'}}>
                    <a>
                        <Button
                            theme="dark-blue"
                            style={{
                                margin: '5px 10px',
                                width: '300px',
                                textAlign: 'center'
                            }}>
                            Explore Our Treatment Centers
                        </Button>
                    </a>
                </Link>
            </div>
            <style jsx>
                {`
                    a {
                        font-weight: bold;
                    }
                    .response {
                        background: ${gray(450)};
                        padding: 30px 15px;
                        text-align: center;
                        font-size: 18px;
                        line-height: 1.8;
                        border: 2px solid #fff;
                    }
                    .response__header {
                        font-weight: bold;
                        font-size: 22px;
                        margin: 10px 0 24px 0;
                    }
                    .response__button-container {
                        display: block;
                        margin: 15px auto;
                    }
                `}
            </style>
        </div>
    );
};
export default Response;
