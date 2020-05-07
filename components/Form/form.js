import React from 'react';
import {Provider} from './context';

/*
 * FORM Component
 * should handle all input fields and return a formData array upon submit
 * each field should call a custom handle function if passed as prop
 * button and recaptcha is not included in form component but should be added
 */

export const RequiredLabel = () => {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'flex-end',
                color: gray(300),
                fontSize: '12px',
            }}>
            <span style={{color: red()}}>*</span> = required fields
        </div>
    );
};

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: [],
            handleTextChange: this.handleTextChange,
            handleTextAreaChange: this.handleTextAreaChange,
            handleDropdownUpdate: this.handleDropdownUpdate,
            handleRadioChange: this.handleRadioChange,
            handleOptionUpdate: this.handleOptionUpdate,
            handleSubmit: this.handleSubmit,
            verifyCaptcha: this.verifyCaptcha,
            isCaptchaSuccessful: true,
            formSubmitted: false,
            isLoading: false,
            isSubmissionSuccessful: false,
        };
    }

    verifyCaptcha = (isCaptchaSuccessful) => {
        this.setState({isCaptchaSuccessful});
    };

    handleTextChange = (e) => {
        const {name, value} = e.target;
        this.setState((prevState) => ({
            formData: {
                ...prevState.formData,
                [name]: value,
            },
            error: '',
        }));
    };
    handleTextAreaChange = (e) => {
        const {name, value} = e.target;
        this.setState((prevState) => ({
            formData: {
                ...prevState.formData,
                [name]: value,
            },
        }));
    };

    handleDropdownUpdate = (name, value) => {
        this.setState((prevState) => ({
            ...prevState,
            formData: {
                ...prevState.formData,
                [name]: value,
            },
        }));
    };

    handleRadioChange = (e) => {
        const value = e.currentTarget.dataset.value;
        const name = e.currentTarget.dataset.name;
        this.setState((prevState) => ({
            ...prevState,
            formData: {
                ...prevState.formData,
                [name]: value,
            },
        }));
    };

    handleOptionUpdate = (name, value, option) => {
        this.setState((prevState) => ({
            formData: {
                ...prevState.formData,
                [name]: {value, option},
            },
        }));
        this.props.handleOptionUpdate &&
            this.props.handleOptionUpdate(name, value, option);
    };

    checkRequiredFields = () => {
        const {requiredFields = []} = this.props;

        const {formData} = this.state;

        const emptyFields = requiredFields.filter((field) => !formData[field]);
        const allFieldsEntered = !emptyFields.length;
        if (!allFieldsEntered) {
            this.setState({
                error: 'Please enter all required fields.',
            });
        }
        return allFieldsEntered;
    };

    handleSubmit = async (e) => {
        e.preventDefault();

        const checkRequiredFields = this.checkRequiredFields();
        if (!checkRequiredFields) return;

        const {handleSubmit: submit} = this.props;
        const {isCaptchaSuccessful, formData} = this.state;

        if (!isCaptchaSuccessful) return;

        // this is the funtion passed as props.handleSubmit - do whatever needs to be done with formData in parent component
        if (!submit) {
            console.error(
                'Form Component requires hanldeSubmit function to be passed as prop.'
            );
            return;
        }
        const submitResponse = await submit(formData);

        this.setState({formSubmitted: true});
    };

    render() {
        const {children, style = {}, overrides = {}} = this.props;

        const {className: jsxClassName = '', styles: overrideStyles = ''} = overrides;

        const {error} = this.state;

        return (
            <Provider value={this.state}>
                <form style={style} className={jsxClassName}>
                    {children}
                </form>
                <style jsx>{`
                    form {
                        padding: 20px;
                        background: #fff;
                        border: 1px solid var(--teal-200);
                        border-radius: var(--border-radius);
                    }
                    .error {
                        font-weight: bold;
                        text-align: center;
                        color: #dd4132;
                        margin-top: 30px;
                    }
                    .success {
                        color: green;
                        margin: 15px 0;
                    }
                `}</style>
                {overrideStyles}
            </Provider>
        );
    }
}

export default Form;
