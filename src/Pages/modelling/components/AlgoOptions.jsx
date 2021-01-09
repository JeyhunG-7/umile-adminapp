import React, { useState } from 'react';
import { Modal, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SettingsIcon from '@material-ui/icons/Settings';
import '../Modelling.css';

const dirBiasOptions = [
    { name: 'Next available places', value: 1 },
    { name: 'All available places', value: 2 }
]

export default ({ options, setOptions }) => {

    const [settingsOpen, setSettingsOpen] = useState(false);

    const weightsTotal = (options.dirW + options.disW) / 100;

    return (
        <>
            <div
                className='settings-btn'
                style={{ margin: '2px 5px 2px auto' }}
                onClick={() => setSettingsOpen(true)}
            >
                <SettingsIcon style={{ margin: '2px', fontSize: 25 }} />
            </div>

            <Modal
                open={settingsOpen}
                onClose={() => setSettingsOpen(false)}
            >
                <div
                    className='modal'
                    style={{
                        borderColor: weightsTotal === 1 ? 'green' : 'red',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <div>
                        <TextField
                            size="small"
                            type="number"
                            variant="filled"
                            margin="normal"
                            value={options.dirW}
                            style={{ width: 150 }}
                            onChange={({ target: { value } }) => setOptions({ ...options, dirW: Number(value) })}
                            label='Directional weight'
                        />

                        <TextField
                            size="small"
                            type="number"
                            variant="filled"
                            margin="normal"
                            value={options.disW}
                            style={{ width: 150, marginLeft: 15 }}
                            onChange={({ target: { value } }) => setOptions({ ...options, disW: Number(value) })}
                            label='Distance weight'
                        />
                    </div>

                    <Autocomplete
                        style={{ marginTop: 5 }}
                        options={dirBiasOptions}
                        getOptionLabel={option => option.name}
                        value={dirBiasOptions.find(elem => elem.value === options.dirBias)}
                        onChange={(event, elem) => setOptions({ ...options, dirBias: elem.value })}
                        renderInput={params =>
                            <TextField
                                {...params}
                                fullWidth
                                variant="filled"
                                label="Directional bias towards"
                            />
                        }
                    />
                </div>
            </Modal>
        </>
    );
}