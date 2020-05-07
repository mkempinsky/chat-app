import {getProp} from '../../lib/utils';
import {gray, blue, red, BREAKPOINT} from '../../lib/styles';
import OutsideClick from '../OutsideClick';
import {Consumer} from './context';
import {DownCaret} from '../Svgs';

class DropdownSelect extends React.Component {
    state = {
        isDropdownActive: null,
        isAttempted: false,
        value: null
    };

    toggleDropdown = e => {
        this.setState(prevState => ({
            isAttempted: true,
            isDropdownActive: !prevState.isDropdownActive
        }));
    };
    handleUpdate = e => {
        const value = e.currentTarget.dataset.value;
        const valueName = e.currentTarget.dataset.name;
        const title = e.currentTarget.dataset.title;

        this.setState({
            isDropdownActive: false,
            [valueName]: value,
            name: valueName,
            value,
            title
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

    render() {
        const {isDropdownActive, isAttempted} = this.state;

        const placeholderStyle = getProp(this.props, 'placeholderStyle');

        const placeholder = getProp(this.props, 'placeholder', 'Select Option');
        const errorMessage = getProp(this.props, 'errormessage');
        const label = getProp(this.props, 'label');
        const options = getProp(this.props, 'options');
        const name = getProp(this.props, 'name', '');

        const value = getProp(this.props, 'value');

        const required = getProp(this.props, 'required');
        const shouldShowError = isAttempted && !value && required;

        const {className: jsxClassName = '', styles: overrides} =
            this.props.overrides || {};
        return (
            <Consumer>
                {formContext => (
                    <OutsideClick onClick={this.handleOutsideClick}>
                        <div
                            tabIndex="0"
                            onBlur={this.handleBlur}
                            className={`dropdown ${isDropdownActive &&
                                'active'} ${jsxClassName}`}
                            style={this.props.style}>
                            {label && (
                                <div className="labels">
                                    <div
                                        className="label"
                                        dangerouslySetInnerHTML={{__html: label}}
                                    />
                                    {required && (
                                        <div style={{color: red(200), marginLeft: '2px'}}>
                                            *
                                        </div>
                                    )}
                                </div>
                            )}

                            <div
                                className={`${jsxClassName} inner-text ${
                                    shouldShowError ? 'error' : ''
                                }`}
                                onClick={this.toggleDropdown}
                                style={{...placeholderStyle}}>
                                {!value && placeholder && <div>{placeholder}</div>}
                                {value && (
                                    <div className="inner-text__value">{value}</div>
                                )}
                                <DownCaret
                                    style={{
                                        transform: `rotate(${
                                            isDropdownActive ? '180deg' : '0deg'
                                        })`
                                    }}
                                />
                            </div>

                            {this.state.isDropdownActive && (
                                <div className={`options ${jsxClassName}`}>
                                    <ul>
                                        {options.map(item => {
                                            const value = item.value || item;
                                            const title = item.name || item;
                                            const key = title
                                                .toString()
                                                .replace(/' '/g, '-');
                                            return (
                                                <li
                                                    key={key}
                                                    data-value={value}
                                                    data-name={name}
                                                    data-title={title}
                                                    className={jsxClassName}
                                                    onClick={e => {
                                                        this.handleUpdate(e);
                                                        formContext.handleDropdownUpdate(
                                                            name,
                                                            value
                                                        );
                                                    }}>
                                                    {title}
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            )}
                            {shouldShowError && !isDropdownActive && (
                                <div className="input-error">
                                    {errorMessage || 'Select Option'}
                                </div>
                            )}
                            <style jsx>{`
                                .dropdown {
                                    width: 100%;
                                    position: relative;
                                    margin: 0;
                                    margin: 0 5px;
                                }
                                .dropdown:focus {
                                    outline: 0;
                                }

                                .dropdown:focus .inner-text {
                                    border: 1px solid ${blue()};
                                    background: #fff;
                                }

                                .dropdown:first-child {
                                    margin-left: 0;
                                }
                                .dropdown:last-child {
                                    margin-right: 0;
                                }
                                @media screen and (min-width: ${BREAKPOINT}) {
                                    .dropdown {
                                        margin: 0 7.5px;
                                    }
                                }
                                .dropdown:hover {
                                    cursor: pointer;
                                }
                                .dropdown.active .inner-text,
                                .dropdown.active .options {
                                    border: 1px solid ${blue()};
                                    background: #fff;
                                }
                                .dropdown.active .options {
                                    overflow-x: hidden;
                                    box-shadow: inset 0 -10px 10px -10px ${gray(400)};
                                    border-top: none;
                                }
                                .inner-text {
                                    width: 100%;
                                    height: 45px;
                                    border: 1px solid #ddd;
                                    background: #fafafa;
                                    display: flex;
                                    align-items: center;
                                    justify-content: space-between;
                                    padding: 0 10px;
                                    position: relative;
                                    color: #757575;
                                }
                                .inner-text__value {
                                    color: #000;
                                }

                                ul {
                                    list-style: none;
                                    padding: 0;
                                    margin: 0;
                                }
                                li {
                                    padding: 5px 15px;
                                    text-align: center;
                                }
                                li:hover {
                                    cursor: pointer;
                                    background: ${gray(450)};
                                    transition: all 0.25s;
                                }
                                .options-container {
                                    min-width: 100%;
                                    position: absolute;
                                    display: block;
                                    max-height: 150px;
                                    overflow: scroll;
                                    z-index: 12;
                                    background: #fff;
                                }
                                ul {
                                    list-style: none;
                                    padding: 0;
                                    margin: 0;
                                }
                                li {
                                    padding: 5px 15px;
                                    text-align: center;
                                }
                                li:hover {
                                    cursor: pointer;
                                    background: ${gray(450)};
                                    transition: all 0.25s;
                                }
                                .options {
                                    min-width: 100%;
                                    border: 1px solid #ddd;
                                    position: absolute;
                                    display: block;
                                    max-height: 150px;
                                    overflow: scroll;
                                    z-index: 12;
                                    border: 1px solid ${blue()};
                                    background: #fff;
                                }
                                .error {
                                    border: 1px solid ${red(200)};
                                }

                                .labels {
                                    display: flex;
                                    padding-bottom: 5px;
                                    font-family: Arial, sans-serif;
                                    font-size: 13px;
                                    height: 24px;
                                }
                                .input-error {
                                    font-size: 13px;
                                    position: absolute;
                                    font-weight: bold;
                                    left: 10px;
                                    bottom: -6px;
                                    background: #fff;
                                    color: ${red(200)};
                                }
                                /* width */
                                ::-webkit-scrollbar {
                                    width: 10px;
                                }

                                /* Track */
                                ::-webkit-scrollbar-track {
                                    background: ${gray(450)};
                                }

                                /* Handle */
                                ::-webkit-scrollbar-thumb {
                                    background: ${gray(400)};
                                }

                                /* Handle on hover */
                                ::-webkit-scrollbar-thumb:hover {
                                    background: #555;
                                }
                            `}</style>
                            {overrides}
                        </div>
                    </OutsideClick>
                )}
            </Consumer>
        );
    }
}
export default DropdownSelect;
