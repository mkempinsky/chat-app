import {Consumer} from './context';

/** the only purpose of this component is to live as a child of <Form/> and call the handleSubmit() function of the formContext */

const SubmitButton = ({buttonText = 'Submit', isLoading}) => {
    return (
        <React.Fragment>
            <Consumer>
                {(formContext) => (
                    <button onClick={(e) => formContext.handleSubmit(e)}>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <span>{buttonText}</span>
                            {isLoading && (
                                <Loading fill="#fff" style={{maxHeight: '15px'}} />
                            )}
                        </div>
                    </button>
                )}
            </Consumer>
            <style jsx>
                {`
                    button {
                        background: orange;
                        border: none;
                        border-radius: 3px;
                        color: #fff;
                        font-weight: bold;
                        font-size: 16px;
                        width: 100%;
                        min-width: 200px;
                    }
                    button:hover {
                        cursor: pointer;
                    }
                    button:focus {
                        outline: none;
                    }
                `}
            </style>
        </React.Fragment>
    );
};
export default SubmitButton;
