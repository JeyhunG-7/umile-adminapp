import React, { useEffect, useState, useContext } from 'react';
import './Sign.css';
import Validate from 'validate.js';
import Fade from 'react-reveal/Fade';
import { Helmet } from 'react-helmet';

import LogoTransperent from '../../Images/logo_transparent.png';
import Loading from '../../Components/Loading';
import DynamicIcon from '../../Components/Helpers/DynamicIcon';
import { GlobalContext, SEVERITY } from '.././../Components/GlobalContext';


export default function SignUp(props) {
    const { setAlert } = useContext(GlobalContext);

    const [email, setEmail] = useState(null);
    const [fname, setFname] = useState(null);
    const [lname, setLname] = useState(null);
    const [phone, setPhone] = useState(null);
    const [compName, setCompName] = useState(null);
    const [pass, setPass] = useState(null);

    const params = props.match.params;

    const [pageLoading, setPageLoading] = useState(true);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [submitDone, setSubmitDone] = useState(false);

    const [stateObj, setMessage] = useState({
        fnameMessage: null,
        lnameMessage: null,
        phoneMessage: null,
        compNameMessage: null,
        passMessage: null
    });

    const constraints = {
        fname: {
            presence: {
                allowEmpty: false
            },
            format: {
                pattern: "[a-zA-Z ]+"
            }
        },
        lname: {
            presence: {
                allowEmpty: false
            },
            format: {
                pattern: "[a-zA-Z ]+"
            }
        },
        phone: {
            presence: {
                allowEmpty: false
            },
            format: {
                pattern: "[0-9]+"
            }
        },
        compName: {
            format: {
                pattern: "[a-zA-Z ]*$"
            }
        },
        password: {
            presence: {
                allowEmpty: false
            },
            length: {
                minimum: 6
            }
        }
    };

    useEffect(() => {
        async function effect() {
            console.log('Effect');
            if (!params.token) {
                setPageLoading(false);
                alert("Sign up is invitation only. Please contact UMile sales team");
                return;
            }

            try {
                var rawData = await fetch('/api/clients/validate', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ token: params.token })
                });
                var response = await rawData.json();
            } catch (e) {
                return;
            }
            if (!response.success) {
                alert("Invalid token. Please contact UMile support team");
            } else {
                setEmail(response.data.email);
            }
            setPageLoading(false);
        }
        effect();
    }, [params]);

    const submitSignUp = async e => {
        setSubmitLoading(true);
        let check = Validate({
            fname: fname,
            lname: lname,
            phone: phone,
            compName: compName,
            password: pass
        }, constraints);

        check && setMessage(prevState => {
            return {
                ...prevState,
                fnameMessage: check.fname ? (check.fname.length > 1 ? "First name required!" : "Enter valid first name") : null,
                lnameMessage: check.lname ? (check.lname.length > 1 ? "Last name required!" : "Enter valid last name") : null,
                phoneMessage: check.phone ? (check.phone.length > 1 ? "Phone number required!" : "Enter valid phone number") : null,
                compNameMessage: check.compName ? "Enter valid company name" : null,
                passMessage: check.password ? (check.password.length > 1 ? "Password required!" : "Minimum 6 characters or more") : null
            }
        });

        if (!check) {
            try {
                console.log("Send api call");
                var rawData = await fetch('/api/clients/signup', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: email,
                        first_name: fname,
                        last_name: lname,
                        phone: phone,
                        company_name: compName,
                        password: pass,
                        token: params.token
                    })
                });
                var response = await rawData.json();
                if(response.success){
                    setSubmitLoading(false);
                    setSubmitDone(true);
                    setTimeout(function(){ 
                        window.location.href ='/signin';
                    }, 1000);
                }
            } catch (e) {
                console.log(e);
                return setAlert({ message: 'Error while signing up', severity: SEVERITY.ERROR });
            }
        } else{
            setSubmitLoading(false);
        }
    }

    function handleOnKeyPress(e) {
        if (e && e.charCode === 13) {
            submitSignUp();
        } else {
            setMessage({
                ...stateObj,
                fnameMessage: null,
                lnameMessage: null,
                phoneMessage: null,
                compNameMessage: null,
                passMessage: null
            });
        }
    }

    function _renderLoadingUi() {
        return (
            <div id="main" className="main sign-up-page">
                <Loading />
            </div>
        )
    }

    function _renderSubmitButton(){
        if(submitLoading){
            return(
                <DynamicIcon type="loadingWhiteCircle" width={39} height={39} />
            );
        } else if(submitDone){
            return(
                <DynamicIcon type="doneLoading" width={39} height={39} />
            );
        } else{
            return(<>Sign Up</>);
        }
    }


    function _renderSignupUi() {
        return (
            <>
                <Helmet>
                    <title>{'UMile | Sign up'}</title>
                </Helmet>
                <div id="main" className="main sign-up-page">
                    <div className="div-logo">
                        <a href="https://umile.xyz/">
                            <img alt="logo" src={LogoTransperent} />
                        </a>
                    </div>
                    <div className="bg-square"></div>
                    <div className="sign-body">
                        <div className="sign-header">Let's Go!</div>
                        <div className="names">
                            <div className={(!stateObj.fnameMessage ? 'user-input fname' : 'user-input fname error')}>
                                <label>First Name</label>
                                <i className="lni lni-user user-icon"></i>
                                <input name="first name"
                                    value={fname || ''}
                                    type="text"
                                    placeholder="Kenan"
                                    onChange={({ target: { value } }) => setFname(value)}
                                    onKeyPress={handleOnKeyPress} />
                                <span className="helper-txt">{stateObj.fnameMessage}</span>
                            </div>
                            <div className={(!stateObj.lnameMessage ? 'user-input lname' : 'user-input lname error')}>
                                <label>Last Name</label>
                                <i className="lni lni-user user-icon"></i>
                                <input name="email"
                                    value={lname || ''}
                                    type="text"
                                    placeholder="Ron"
                                    onChange={({ target: { value } }) => setLname(value)}
                                    onKeyPress={handleOnKeyPress} />
                                <span className="helper-txt">{stateObj.lnameMessage}</span>
                            </div>
                        </div>

                        <div className={(!stateObj.emailMessage ? 'user-input' : 'user-input error')}>
                            <label>Email</label>
                            <i className="lni lni-envelope email-icon"></i>
                            <input name="email"
                                value={email || ''}
                                type="email"
                                placeholder="example@address.com"
                                onKeyPress={handleOnKeyPress}
                                disabled />
                        </div>

                        <div className={(!stateObj.phoneMessage ? 'user-input' : 'user-input error')}>
                            <label>Phone Number</label>
                            <i className="lni lni-apartment company-icon"></i>
                            <input name="phone"
                                value={phone || ''}
                                type="text"
                                placeholder="(123) 456-78-90"
                                onChange={({ target: { value } }) => setPhone(value)}
                                onKeyPress={handleOnKeyPress} />
                            <span className="helper-txt">{stateObj.phoneMessage}</span>
                        </div>

                        <div className={(!stateObj.compNameMessage ? 'user-input' : 'user-input error')}>
                            <label>Company Name</label>
                            <i className="lni lni-apartment company-icon"></i>
                            <input name="company-name"
                                value={compName || ''}
                                type="text"
                                placeholder="UMile"
                                onChange={({ target: { value } }) => setCompName(value)}
                                onKeyPress={handleOnKeyPress} />
                            <span className="helper-txt">{stateObj.compNameMessage}</span>
                        </div>

                        <div className={(!stateObj.passMessage ? 'user-input password' : 'user-input error password')}>
                            <label>Password</label>
                            <i className="lni lni-lock-alt password-icon"></i>
                            <input name="password"
                                value={pass || ''}
                                type="password"
                                placeholder="••••••"
                                onChange={({ target: { value } }) => setPass(value)} 
                                onKeyPress={handleOnKeyPress} />
                            <span className="helper-txt">{stateObj.passMessage}</span>
                        </div>
                        <button className="btn-sign" onClick={submitSignUp}>
                            {_renderSubmitButton()}
                        </button>
                    </div>
                </div>
            </>
        )
    }

    var uiToRender;
    if (pageLoading) {
        uiToRender = _renderLoadingUi();
    } else {
        uiToRender = _renderSignupUi();
    }

    return (
        <div id="main" className="main">
            <Fade>
                {uiToRender}
            </Fade>
        </div>
    )
}