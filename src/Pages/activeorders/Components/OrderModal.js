import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Modal, Backdrop, Fade, MenuItem } from '@material-ui/core';
import Moment from 'react-moment';


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

const OrderModal = React.forwardRef((props, ref) => {
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
                    <div className="flex-column body-modal-order">
                        <h3>Pick up information</h3>
                        <ul className="ul-hdr-pu-table">
                            <li>Order #</li>
                            <li>Vendor</li>
                            <li>Address</li>
                            <li>Status Date</li>
                            <li>Notes</li>
                        </ul>
                        <ul className="ul-row-pu-table">
                            <li>{order.id}</li>
                            <li>{order.pickup.companyName}</li>
                            <li>{order.pickup.address}</li>
                            <li>
                                <Moment date={order.pickup.date} format="ll" withTitle />
                            </li>
                            <li>{order.pickup.notes}</li>
                        </ul>
                        <h3>Drop off information</h3>
                        <ul className="ul-hdr-do-table">
                            <li>Name</li>
                            <li>Address</li>
                            <li>Phone</li>
                            <li>Notes</li>
                        </ul>
                        <ul className="ul-row-do-table">
                            <li>{order.dropoff.customerName}</li>
                            <li>{order.dropoff.address}</li>
                            <li>{order.dropoff.phone}</li>
                            <li>{order.dropoff.notes}</li>
                        </ul>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
});

export default OrderModal;