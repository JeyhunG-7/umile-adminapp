import React, { useState } from 'react';
import editLogo from '../../../Images/edit.svg'
import '../Modelling.css';

export default ({ variables, setVariables }) => {

    const [editing, setEditing] = useState(false);
    const [edited, setEdited] = useState({});
    const [saveDisabled, setSaveDisabled] = useState(true);

    const onEdit = (key) => ({ target: { value } }) => {
        const newObj = { ...edited, [key]: value };
        const isChanged = variables[key].value !== Number(value);

        setSaveDisabled(!isChanged);
        setEdited(newObj);
    }

    const onDone = async () => {
        const newObj = Object.assign({}, variables);

        for (const [key, value] of Object.entries(edited)) newObj[key].value = value;

        setEdited({});
        setEditing(false);
        setSaveDisabled(true);
        setVariables(newObj);
    }

    const onCancel = async () => {
        setEdited({});
        setEditing(false);
        setSaveDisabled(true);
    }

    return (
        <div className="card">

            <div style={{ display: 'flex' }}>
                <span className="card-header" style={{ marginLeft: '45px' }}>
                    Calculation Variables
                </span>

                {!editing &&
                    <img
                        alt='edit-logo'
                        style={{ marginLeft: 'auto', cursor: 'pointer', width: 12, height: 14 }}
                        src={editLogo}
                        onClick={() => setEditing(true)}
                    />
                }

            </div>

            <div>
                {Object.keys(variables).map(key => {
                    const { value, display, units } = variables[key];

                    return (
                        <div key={key} className='variable-row'>
                            <div>{display}:</div>

                            <div>
                                {editing ?
                                    <input type='number' defaultValue={value} style={{ width: 40 }} onChange={onEdit(key)} />
                                    :
                                    <strong>{value}</strong>
                                }
                            </div>

                            <div>{units}</div>
                        </div>
                    )
                })}
            </div>

            {editing &&
                <div style={{ display: 'flex', marginTop: 10 }}>
                    <button onClick={onCancel}>
                        Cancel
                    </button>
                    <button
                        onClick={onDone}
                        disabled={saveDisabled}
                        className='card-action'
                        style={{ opacity: saveDisabled ? 0.4 : 1 }}
                    >
                        Save
                    </button>
                </div>
            }
        </div>
    );
}