import React, { useState, useContext } from 'react';
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

const OrdersModal = React.forwardRef((props, ref) => {
    const pickupInfo = props.pickupInfo;
    const orders = props.orders;

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
                    <div className="flex-column body-modal-route">
                        <OrdersMap orders={orders} />
                    </div>
                </Fade>
            </Modal>
        </div>
    );
});

export default OrdersModal;