import {red, blue} from '../../lib/styles';
import {Consumer} from './context';

const TextArea = props => {
    return (
        <Consumer>
            {formContext => {
                return (
                    <div>
                        {props.label && (
                            <label htmlFor={props.name}>
                                {props.label}
                                {props.required && <span>{' ' + '*'}</span>}
                            </label>
                        )}
                        <textarea
                            id={props.name}
                            onChange={
                                props.handleChange || formContext.handleTextAreaChange
                            }
                            {...props}
                        />
                        <style jsx>{`
                            textarea {
                                font-size: 13px;
                                height: 45px;
                                width: 100%;
                            }
                            label {
                                padding-bottom: 5px;
                                text-align: left;
                                width: 100%;
                                height: 24px;
                            }
                            span {
                                color: ${red()};
                            }
                            textarea:focus {
                                outline: 0;
                                border: 1px solid ${blue()};
                                background: #fff;
                            }
                        `}</style>
                    </div>
                );
            }}
        </Consumer>
    );
};

export default TextArea;
