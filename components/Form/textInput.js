import {getProp, formatPhoneNumber, validateEmail, formatDate} from '../../lib/utils';
import OutsideClick from '../OutsideClick';
import {Consumer} from './context';
import {teal} from '../../lib/styles';
import format from 'date-fns/format';
import css from 'styled-jsx/css';
import {withRouter} from 'next/router';

class TextInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            shouldShowError: false,
            isValidInput: false,
            showToolTip: false,
        };
        this.baseState = this.state;
    }

    handleValidationOnChange = (e) => {
        let {value, name} = e.target;
        const validation = getProp(this.props, 'validate', '');
        let isValidInput;

        if (validation === 'email') {
            isValidInput = validateEmail(value);
        } else if (validation === 'phone') {
            value = formatPhoneNumber(value);
            isValidInput = value.length === 12;
        } else if (validation === 'date') {
            value = formatDate(value);
            let userInput = new Date(value);
            const isPastDate = userInput < new Date();

            isValidInput =
                value.length === 10 && userInput != 'Invalid Date' && isPastDate;
        } else {
            isValidInput = !!value;
        }

        this.setState({
            [name]: value,
            value: value,
            isValidInput,
        });
    };

    handleClick = (e) => {
        this.setState({
            shouldShowError: false,
            isAttempted: true,
        });
        this.props.handleinputclick && this.props.handleInputClick(e);
    };

    handleOutsideClick = () => {
        const {isAttempted, isValidInput, showToolTip} = this.state;
        const shouldShowError = isAttempted && !isValidInput && !showToolTip;
        this.setState({
            shouldShowError,
            showToolTip: false,
        });
    };

    handleToolTip = () => {
        this.setState({
            showToolTip: !this.state.showToolTip,
            shouldShowError: false,
        });
    };

    /* reset component on route change */
    componentDidUpdate = (prevProps) => {
        const path = getProp(this.props, 'router.asPath');
        const prevPath = getProp(prevProps, 'router.asPath');
        if (path !== prevPath) {
            this.setState(this.baseState);
        }
    };

    render() {
        const label = getProp(this.props, 'label', '');
        const helptext = getProp(this.props, 'helptext', '');
        const required = getProp(this.props, 'required');
        const refnumber = getProp(this.props, 'refnumber');
        const tooltips = getProp(this.props, 'tooltips', false);
        const errormessage = getProp(
            this.props,
            'errormessage',
            'Please enter valid input.'
        );
        const placeholder = getProp(this.props, 'placeholder', '');
        const name = getProp(this.props, 'name', '');

        const validation = getProp(this.props, 'validate', '');
        let maxCharacters = '50';
        if (validation === 'phone') {
            maxCharacters = 12;
        } else if (validation === 'date') {
            maxCharacters = 10;
        }

        const shouldShowError = !this.props.required ? false : this.state.shouldShowError;
        const phoneError = this.state.phoneError;
        const value = this.state.value;

        // style classes
        const errorClass = shouldShowError || phoneError ? 'error' : '';
        const tooltipClass = this.state.showToolTip ? 'tooltip' : '';

        const overrides = getProp(this.props, 'overrides', {});
        const {className: jsxClassName = '', styles: overrideStyles = ''} = overrides;
        return (
            <Consumer>
                {(formContext) => (
                    <div style={{position: 'relative'}}>
                        <div className={`labels ${jsxClassName}`}>
                            <div className="labels-left">
                                <div
                                    className={`label ${jsxClassName}`}
                                    dangerouslySetInnerHTML={{__html: label}}
                                />
                                {required && (
                                    <div
                                        style={{
                                            color: 'var(--error)',
                                            marginLeft: '2px',
                                        }}>
                                        *
                                    </div>
                                )}
                                {refnumber && (
                                    <div
                                        style={{
                                            fontSize: '8px',
                                            fontWeight: '700',
                                            verticalAlign: 'top',
                                            marginLeft: '3px',
                                        }}>
                                        {refnumber}
                                    </div>
                                )}
                                <div
                                    className="helptext"
                                    dangerouslySetInnerHTML={{__html: helptext}}
                                />
                            </div>
                        </div>
                        <div>
                            <OutsideClick onClick={this.handleOutsideClick}>
                                <input
                                    {...this.props}
                                    maxLength={maxCharacters}
                                    type="text"
                                    name={name}
                                    placeholder={placeholder}
                                    onChange={(e) => {
                                        this.handleValidationOnChange(e);
                                        formContext.handleTextChange(e);
                                    }}
                                    onClick={this.handleClick}
                                    onFocus={this.handleClick}
                                    onBlur={this.handleOutsideClick}
                                    className={`${errorClass} ${tooltipClass} ${jsxClassName}`}
                                    value={value}
                                />
                            </OutsideClick>
                            {phoneError && (
                                <div className="error-message">{phoneError}</div>
                            )}
                            {shouldShowError && (
                                <div
                                    className={`input-error ${jsxClassName}`}
                                    style={{display: 'block'}}>
                                    {errormessage}
                                </div>
                            )}
                        </div>
                        <style jsx>
                            {`
                                .error {
                                    border: 1px solid var(--error);
                                }
                                input {
                                    font-size: 15px;
                                    height: 45px;
                                    width: 100%;
                                    min-width: 200px;
                                    background: #fff;
                                    border: 1px solid var(--gray-300);
                                    border-radius: var(--border-radius);
                                }
                                input::placeholder {
                                    color: #a8a8a8;
                                    opacity: 0.5;
                                }
                                input.tooltip {
                                    border: 1px solid blue;
                                    box-shadow: 0 0 15px 0 rgba(0, 118, 192, 0.5);
                                }
                                input:focus {
                                    outline: 0;
                                    border: 2px solid var(--teal-200);
                                    background: #fff;
                                }
                                .labels {
                                    display: flex;
                                    padding-bottom: 5px;
                                    justify-content: space-between;
                                }
                                .labels-left {
                                    display: flex;
                                }

                                .helptext {
                                    font-style: italic;
                                    color: rgba(0, 0, 0, 0.5);
                                    margin-left: 5px;
                                }
                                .input-error {
                                    font-size: 13px;
                                    position: absolute;
                                    font-weight: bold;
                                    left: 10px;
                                    bottom: -5px;
                                    padding: 0 5px;
                                    background: #fff;
                                    color: var(--error);
                                }
                            `}
                        </style>
                        {overrideStyles}
                    </div>
                )}
            </Consumer>
        );
    }
}
export default withRouter(TextInput);
