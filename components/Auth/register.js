import React from 'react';
import firebase from '../../src/firebase';
import {Form, TextInput, PasswordInput, SubmitButton, ErrorMessage} from '../Form';

class Register extends React.Component {
    state = {
        mismatchpassword: null,
        registerError: null,
    };
    handleSubmit = (formData) => {
        const {username, email, password, passwordConfirm} = formData;
        if (password !== passwordConfirm) {
            this.setState({
                mismatchpassword: true,
            });
            return;
        }
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((createdUser) => {
                console.log(createdUser);
            })
            .catch((e) => {
                console.error(e);
                this.setState({
                    registerError: e.message,
                });
            });
    };
    render() {
        const {mismatchpassword, registerError} = this.state;
        return (
            <div>
                <Form
                    style={{maxWidth: '450px'}}
                    handleSubmit={this.handleSubmit}
                    requiredFields={['email']}>
                    <div className="input-container">
                        <TextInput label="Username" name="username" validate="text" />
                    </div>
                    <div className="input-container">
                        <TextInput
                            label="Email"
                            name="email"
                            required
                            validate="email"
                            helptext="jsmith@mail.com"
                            errormessage="Enter valid email address."
                        />
                    </div>
                    <div className="input-container">
                        <PasswordInput label="Password" name="password" validate="text" />
                    </div>
                    <div className="input-container">
                        <PasswordInput
                            label="Password Confirmation"
                            name="passwordConfirm"
                            type="password"
                            validate="text"
                        />
                    </div>
                    {mismatchpassword && (
                        <div style={{color: 'red'}}>Passwords do not match.</div>
                    )}
                    {registerError && <div style={{color: 'red'}}>{registerError}</div>}
                    <ErrorMessage />

                    <div>
                        <SubmitButton buttonText="Register Account" />
                    </div>
                </Form>
                <style jsx>
                    {`
                        .input-container {
                            margin-bottom: 30px;
                        }
                    `}
                </style>
            </div>
        );
    }
}
export default Register;
