import {Consumer} from './context';

/** the only purpose of this component is to live as a child of <Form/> and call the handleSubmit() function of the formContext */

const ErrorMessage = (props) => {
    return (
        <React.Fragment>
            <Consumer>
                {(formContext) => <div className="err-msg">{formContext.error}</div>}
            </Consumer>
            <style jsx>
                {`
                    .err-msg {
                        color: red;
                        font-weight: bold;
                        font-size: 13px;
                    }
                `}
            </style>
        </React.Fragment>
    );
};
export default ErrorMessage;
