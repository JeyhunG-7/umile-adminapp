import React, { useState } from 'react';
import './NewCustomer.css';
import Validate from 'validate.js';

import { Paper, Button, TextField } from '@material-ui/core';

import DynamicIcon from '../../Components/Helpers/DynamicIcon';
import { makePostRequest } from '../../utilities';


export default function NewCustomer(props) {
    const [customerName, setCustomerName] = useState(null);
    const [email, setEmail] = useState(null);

    const [loadingSubmit, setLoadingSubmit] = useState(false);

    const [stateObj, setMessage] = useState({
        customerNameMessage: null,
        emailMessage: null
    });

    const constraints = {
        customerName: {
            format: {
                pattern: "[A-Za-z '’-]+",
                message: "Enter valid customer name."
            },
            presence: {
                allowEmpty: false,
                message: "Required!"
            }
        },
        email: {
            email: {
                message: "Enter valid email."
            },
            presence: {
                allowEmpty: false,
                message: "Required!"
            }
        }
    };

    function submitSendInvite() {
        setLoadingSubmit(true);
        let check = Validate({
            email: email,
            customerName: customerName
        }, constraints,
            {
                fullMessages: false
            }
        );

        check && setMessage(prevState => {
            return {
                ...prevState,
                customerNameMessage: check.customerName ? check.customerName[0] : null,
                emailMessage: check.email ? check.email[0] : null
            }
        });

        if (!check) {
            let result = makePostRequest('/admin/createinvitation', { 
                auth: true, 
                body: {
                    email: email,
                    first_name: customerName
                }
            });

            if (!result){
                console.log("Error: couldn't send invitation");
            }

        }
        setLoadingSubmit(false);

    }

    function _renderSubmitButton() {
        if (loadingSubmit) {
            return (
                <DynamicIcon type="loadingWhiteCircle" width={39} height={39} />
            );
        } else {
            return (
                <>Send invite</>
            );
        }
    }

    return (
        <div className="new-customer">
            <Paper className="paper-new-customer flex-column" elevation={0}>
                <div className="info-header">
                    <h2 className="lft">Invite New Customer</h2>
                </div>
                <TextField
                    label="Name"
                    className="input-ci"
                    variant="outlined"
                    value={customerName || ''}
                    error={stateObj.customerNameMessage}
                    helperText={stateObj.customerNameMessage}
                    onChange={({ target: { value } }) => {
                        setCustomerName(value);
                        setMessage(prevState => {
                            return {
                                ...prevState,
                                customerNameMessage: null
                            }
                        });
                    }}
                />
                <TextField
                    label="Email"
                    className="input-ci"
                    variant="outlined"
                    value={email || ''}
                    error={stateObj.emailMessage}
                    helperText={stateObj.emailMessage}
                    onChange={({ target: { value } }) => {
                        setEmail(value);
                        setMessage(prevState => {
                            return {
                                ...prevState,
                                emailMessage: null
                            }
                        });
                    }}
                />
                <Button variant="contained"
                    color="primary"
                    className="submit-invite"
                    onClick={submitSendInvite}>
                    {_renderSubmitButton()}
                </Button>
            </Paper>
        </div>

    );
}