import React, { useEffect, useRef, useState } from 'react';
import '../Sign.css';
import Validate from 'validate.js';
import { withRouter } from 'react-router-dom';

import { IsSignedInAsync, AuthenticateAsync } from './../../../Components/Helpers/Authenticator';
import DynamicIcon from '../../../Components/Helpers/DynamicIcon';
import { PAGES } from '../../../Components/Sidebar';


function SignInComponent(props) {
    const email = useRef(null);
    const password = useRef(null);

    const [stateObj, setMessage] = useState({
        emailMessage: null,
        passMessage: null
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [isProcessing, setProcessing] = useState(false);

    const constraints = {
        email: {
            email: {
                message: "Please enter valid email"
            }
        },
        password: {
            length: {
                minimum: 4
            }
        }
    };

    useEffect(() => {
        async function effect() {
            var isSignedIn = await IsSignedInAsync();
            if (isSignedIn) {
                props.history.push(PAGES.activeOrders.route);
            }
        }

        effect();
    });


    const submitSignIn = async e => {
        setProcessing(true);
        let check = Validate({
            email: email.current.value,
            password: password.current.value
        }, constraints);

        setMessage(prevState => {
            return {
                ...prevState,
                emailMessage: check && check.email ? "Please enter valid email" : null,
                passMessage: check && check.password ? "Minimum 6 characters or more" : null,
            }
        });

        if (!check) {
            var result = await AuthenticateAsync(email.current.value, password.current.value);
            if (result.success) {
                setTimeout(function () {
                    window.location.reload();
                }, 1000);
            } else {
                setErrorMessage(result.errorMessage);
            }
        }
        setProcessing(false);
    }

    function handleOnKeyPress(e) {
        if (e && e.charCode === 13) {
            submitSignIn();
        } else {
            setMessage({
                ...stateObj,
                emailMessage: null,
                passMessage: null,
                BEMessage: null
            });
        }
    }

    function handleShowForgotPass() {
        props.handleShowForgotPass();
    }

    function _renderSignButtopn() {
        if (isProcessing) {
            return (
                <DynamicIcon type="loadingWhiteCircle" width={39} height={39} />
            );
        } else {
            return (
                <>Sign in</>
            );
        }
    }

    return (
        <div className="sign-sec sign-in">
            <div className="sign-body">
                <div className="sign-header">Welcome back!</div>
                <div className={(!stateObj.emailMessage ? 'user-input' : 'user-input error')}>
                    <label>Email</label>
                    <i className="lni lni-envelope email-icon"></i>
                    <input name="email"
                        ref={email}
                        type="email"
                        placeholder="Enter your email"
                        onKeyPress={handleOnKeyPress} />
                    <span className="helper-txt">{stateObj.emailMessage}</span>
                </div>

                <div className={(!stateObj.passMessage ? 'user-input password' : 'user-input error password')}>
                    <label>Password</label>
                    <i className="lni lni-lock-alt password-icon"></i>
                    <button className="btn-forgot-password" onClick={handleShowForgotPass}>Forgot Password?</button>
                    <input name="email"
                        ref={password}
                        type="password"
                        placeholder="Enter password"
                        onKeyPress={handleOnKeyPress} />
                    <span className="helper-txt">{stateObj.passMessage}</span>
                </div>
                <button className="btn-sign" onClick={submitSignIn}>{_renderSignButtopn()}</button>
                <span className="error-txt">
                    {errorMessage}
                </span>
            </div>
        </div>
    );
}

export default withRouter(SignInComponent)