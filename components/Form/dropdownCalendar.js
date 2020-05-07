import {getProp} from '../../lib/utils';
import {gray, blue, red, BREAKPOINT, dropShadow} from '../../lib/styles';
import OutsideClick from '../OutsideClick';
import {Consumer, Provider} from './context';
import {DownCaret} from '../Svgs';
import {format} from 'date-fns';
import Calendar from '../Calendar';
class DropdownCalendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isDropdownActive: false,
            isAttempted: false,
            value: null,
            displayValue: null,
            handleCalendarChange: this.handleCalendarChange
        };
    }

    toggleDropdown = e => {
        this.setState(prevState => ({
            isAttempted: true,
            isDropdownActive: !prevState.isDropdownActive
        }));
    };
    handleOutsideClick = () => {
        this.setState({isDropdownActive: false});
    };

    handleCalendarChange = date => {
        let value = format(date, 'MM/DD/YYYY');
        const displayValue = format(date, 'dddd MMMM D, YYYY');
        const {name = ''} = this.props;
        this.setState(
            {
                value,
                displayValue,
                isDropdownActive: false
            },
            () => {
                this.props.context.handleDropdownCalendarUpdate(name, value);
            }
        );
    };

    render() {
        const {isDropdownActive, isAttempted, displayValue} = this.state;
        const {
            placeholder = 'Select Option',
            errormessage,
            label,
            name,
            value,
            header,
            required
        } = this.props;

        const shouldShowError = isAttempted && !value && required;

        const {className: jsxClassName = '', styles: overrides} =
            this.props.overrides || {};
        return (
            <Provider value={this.state}>
                <OutsideClick onClick={this.handleOutsideClick}>
                    <div
                        tabIndex="0"
                        className={`dropdown ${isDropdownActive &&
                            'active'} ${jsxClassName}`}
                        style={this.props.style}>
                        <div
                            className={`${jsxClassName} inner-text ${
                                shouldShowError ? 'error' : ''
                            }`}
                            onClick={this.toggleDropdown}>
                            {!value && !displayValue && placeholder && (
                                <div>{placeholder}</div>
                            )}
                            {displayValue && (
                                <div className="inner-text__value">{displayValue}</div>
                            )}
                            <DownCaret
                                style={{
                                    transform: `rotate(${
                                        isDropdownActive ? '180deg' : '0deg'
                                    })`
                                }}
                            />
                        </div>
                        {isDropdownActive && (
                            <div className="calendar">
                                {header && <div className="header">{header}</div>}
                                <Calendar maxDaysOut={10} />
                            </div>
                        )}
                        {shouldShowError && !isDropdownActive && (
                            <div className="input-error">
                                {errormessage || 'Select Option'}
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
                            .calendar {
                                min-width: 100%;
                                border: 1px solid ${gray(400)};
                                box-shadow: ${dropShadow()};
                                position: absolute;
                                display: block;
                                z-index: 12;
                                background: #fff;
                                padding: 30px;
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
                            .header {
                                color: ${blue(200)};
                                margin-bottom: 10px;
                                font-size: 12px;
                                text-align: center;
                                font-weight: bold;
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
                        <style global="true">
                            {`
							button.react-calendar__tile.react-calendar__month-view__days__day {
								padding: 10px;
							}

							`}
                        </style>
                    </div>
                </OutsideClick>
            </Provider>
        );
    }
}
export default function DropdownCalendarWithContext(props) {
    return (
        <Consumer>
            {context => <DropdownCalendar {...props} context={context} />}
        </Consumer>
    );
}
