import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Modal, Backdrop, Fade, MenuItem } from '@material-ui/core';
import OrdersMap from './OrdersMap';


const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(2, 4, 3)
    },
}));

const DropoffsModal = React.forwardRef((props, ref) => {
    const order = props.order;

    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <MenuItem onClick={handleOpen}>
                <i className="lni lni-eye"></i>
            </MenuItem>
            <Modal
                open={open}
                className={`${classes.modal} modal-route`}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{ timeout: 500 }}
            >
                <Fade in={open}>
                    <div className="flex-column body-modal-dropoffs">
                        <h3>Drop off information</h3>
                        <ul className="ul-hdr-dropoff-table">
                            <li>id</li>
                            <li>Name</li>
                            <li>Address</li>
                            <li>Phone</li>
                            <li>Notes</li>
                        </ul>
                        <OrdersMap dropoffs={order.dropoffs}/>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
});

export default DropoffsModal;