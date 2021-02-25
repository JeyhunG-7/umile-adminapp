import React, { useState } from 'react';
import './Sign.css';
import Fade from 'react-reveal/Fade';
import { Helmet } from 'react-helmet';

import LogoTransperent from '../../Images/logo_transparent.png';
import ForgotPass from './Components/ForgotPass';
import SignInComponent from './Components/SignIn';


export default function SignIn(props) {
    const [showForgotPass, setShowForgotPass] = useState(false);

    function handleShowForgotPass() {
        setShowForgotPass(true);
    }

    function handleHideForgotPass() {
        setShowForgotPass(false);
    }

    return (
        <>
            <Helmet>
                <title>{'UMile | Sign in'}</title>
            </Helmet>
            <div id="main" className="main sign-in-page">
                <div className="div-logo">
                    <a href="https://umile.xyz/">
                        <img alt="logo" src={LogoTransperent} />
                    </a>
                </div>
                <div className="bg-square"></div>
                <Fade>
                    {
                        showForgotPass
                            ? <ForgotPass handleHideForgotPass={handleHideForgotPass} />
                            : <SignInComponent handleShowForgotPass={handleShowForgotPass} />
                    }
                </Fade>
            </div>
        </>
    );
}