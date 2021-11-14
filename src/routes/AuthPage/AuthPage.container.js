import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import { login } from 'Store/Admin/Admin.dispatcher';
import AuthPage from './AuthPage.component';

import { EMAIL_REGEX, PASSWORD_MIN_LENGTH } from './AuthPage.config';

export const mapStateToProps = (state) => ({
    admin: state.AdminReducer.admin,
    isLoggedIn: state.AdminReducer.isLoggedIn,
});

export const mapDispatchToProps = (dispatch) => ({
    login: (loginData) => login(dispatch, loginData),
});

export const AuthPageContainer = (props) => {
    const { login, isLoggedIn } = props;

    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const onEmailChange = (event) => {
        if (!event.target.value.match(EMAIL_REGEX)) {
            setEmailError(true);
        } else {
            setEmailError(false);
        }
    };

    const onPasswordChange = (event) => {
        if (event.target.value.length < PASSWORD_MIN_LENGTH) {
            setPasswordError(true);
        } else setPasswordError(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // const data = new FormData(event.currentTarget);

        if (!emailError && !passwordError) {
            setIsLoading(true);
            login({
                email: 'rtgtrgtr@gmail.com',
                password: 'Magento777',
            });
            // signInWithEmailAndPassword(data.get('email'), data.get('password'));
        } else {
            alert('Notification component');
        }
    };

    const containerProps = {
        handleSubmit,
        onEmailChange,
        onPasswordChange,
        emailError,
        passwordError,
        isLoading,
    };

    if (isLoggedIn) {
        return <Redirect to="/" />;
    }

    return (
        <AuthPage
            {...containerProps}
        />
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthPageContainer);
