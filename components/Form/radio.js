import React from 'react';
import {getProp} from '../../lib/utils';
import {blue, red} from '../../lib/styles';
import CheckSolid from '../Svgs/CheckSolid';
import OutsideClick from '../OutsideClick';
import {Consumer} from './context';
import {withRouter} from 'next/router';

class Radio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
        this.baseState = this.state;
    }

    handleUpdate = value => {
        this.setState({
            value
        });
    };
    handleOutsideClick = () => {
        this.setState({isDropdownActive: false});
    };

    handleBlur = () => {
        this.setState({
            isDropdownActive: false,
            isAttempted: true
        });
    };

    /* reset component on route change */
    componentDidUpdate = prevProps => {
        const path = getProp(this.props, 'router.asPath');
        const prevPath = getProp(prevProps, 'router.asPath');
        if (path !== prevPath) {
            this.setState(this.baseState);
        }
    };

    render() {
        const options = getProp(this.props, 'options', []);
        const name = getProp(this.props, 'name', '');
        const label = getProp(this.props, 'label', '');
        const required = getProp(this.props, 'required', false);
        const activeColor = getProp(this.props, 'activeColor', blue());

        const overrides = getProp(this.props, 'overrides', {});
        const {className: jsxClassName = '', styles: overrideStyles = ''} = overrides;
        return (
            <Consumer>
                {formContext => (
                    <div className={`radio-input ${jsxClassName}`}>
                        <div className={`label ${jsxClassName}`}>
                            {label} {required && <span>{' ' + '*'}</span>}
                        </div>

                        <div
                            className={`options ${jsxClassName}`}
                            style={{...this.props.style}}>
                            {options.map(option => {
                                const isActive =
                                    this.state.value === option.value ? 'active' : '';
                                return (
                                    <div
                                        className={`option-container ${jsxClassName}`}
                                        key={option.value}
                                        data-value={option.value}
                                        data-name={name}
                                        onClick={e => {
                                            this.handleUpdate(option.value);
                                            formContext.handleRadioChange(e);
                                        }}>
                                        <div
                                            className={`option ${isActive} ${jsxClassName}`}>
                                            {isActive && (
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        marginTop: '2px'
                                                    }}>
                                                    <CheckSolid
                                                        width="14px"
                                                        height="14px"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                        <div className={`label ${jsxClassName}`}>
                                            {option.label}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <style jsx>
                            {`
                                .options {
                                    display: flex;
                                    align-items: center;
                                    margin: 15px 0;
                                }
                                .label {
                                    font-size: 13px;
                                    text-align: left;
                                }
                                .option-container {
                                    display: flex;
                                    align-items: center;
                                    margin-right: 50px;
                                }
                                .option {
                                    min-width: 20px;
                                    min-height: 20px;
                                    border: 1px solid #ccc;
                                    border-radius: 3px;
                                    margin: 10px 5px 10px 0;
                                    box-shadow: inset 0 0 10px rgba(200, 200, 200, 0.3);
                                }
                                .option:hover {
                                    cursor: pointer;
                                    box-shadow: inset 0 0 10px rgba(200, 200, 200, 0.8);
                                    transition: all 0.25s;
                                }
                                .option.active {
                                    background: ${activeColor};
                                    box-shadow: none;
                                    border: 1px solid ${activeColor};
                                }
                                span {
                                    color: ${red()};
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
export default withRouter(Radio);
