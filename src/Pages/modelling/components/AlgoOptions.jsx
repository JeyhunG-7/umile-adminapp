import React, { useState } from 'react';
import { Modal, TextField, Slider, Grid } from '@material-ui/core';
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
                    <Grid container spacing={2} style={{ padding: '25px 5px 15px 5px' }}>
                        <Grid item>
                            <div style={{ textAlign: 'center', width: 'min-content' }}>
                                Directional Weight
                            </div>
                        </Grid>
                        <Grid item xs>
                            <Slider
                                value={options.disW}
                                valueLabelDisplay="on"
                                style={{ width: 150 }}
                                onChange={(event, value) => {
                                    const obj = { disW: value, dirW: 100 - value }
                                    setOptions({ ...options, ...obj })
                                }}
                            />
                        </Grid>
                        <Grid item>
                            <div style={{ textAlign: 'center', width: 'min-content' }}>
                                Distance Weight
                            </div>
                        </Grid>
                    </Grid>

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