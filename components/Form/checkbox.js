import {getProp} from '../../lib/utils';
import {gray, blue} from '../../lib/styles';
import {Consumer} from './context';

class CheckBox extends React.Component {
    state = {
        isChecked: false
    };

    toggleCheck = () => {
        this.setState({
            isChecked: !this.state.isChecked
        });
    };

    render() {
        const label = getProp(this.props, 'label');
        const name = getProp(this.props, 'name');
        const isChecked = this.state.isChecked;
        return (
            <Consumer>
                {formContext => (
                    <div
                        className="checkbox-container"
                        style={this.props.style}
                        onClick={() => {
                            this.toggleCheck();
                            formContext.handleCheckboxChange(name, !this.state.isChecked);
                        }}>
                        <div
                            className="outter-circle"
                            style={{
                                border: isChecked
                                    ? `1px solid ${blue()}`
                                    : `1px solid ${gray(300)}`
                            }}>
                            <div
                                className="inner-circle"
                                style={{background: isChecked ? blue() : '#fff'}}
                            />
                        </div>
                        <label>{label}</label>
                        <style jsx>
                            {`
                                .outter-circle {
                                    max-width: 28px;
                                    min-width: 28px;
                                    min-height: 28px;
                                    max-height: 28px;
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    border-radius: 100%;
                                }
                                .inner-circle {
                                    max-width: 20px;
                                    min-width: 20px;
                                    min-height: 20px;
                                    max-height: 20px;
                                    border-radius: 100%;
                                }
                                .checkbox-container {
                                    display: flex;
                                    max-height: 65px;
                                    align-items: center;
                                    height: 100%;
                                }
                                .checkbox-container:hover {
                                    cursor: pointer;
                                }
                                label {
                                    margin-left: 5px;
                                    padding: 0;
                                }
                            `}
                        </style>
                    </div>
                )}
            </Consumer>
        );
    }
}
export default CheckBox;
