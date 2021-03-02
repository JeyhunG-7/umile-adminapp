import React, { useState } from 'react';
import Moment from 'react-moment';
import OrderModal from './OrderModal';

import { Button, Menu, MenuItem } from '@material-ui/core';


export default function PlacedOrder(props) {
    let order = props.order;
    const [anchorEl, setAnchorEl] = useState(null);
    const [status, setStatus] = useState(order.status);

    // BE call - get status list
    let tmpStatusList = [
        {
            id: 1,
            name: "Placed"
        },
        {
            id: 2,
            name: "Submitted for delivery"
        },
        {
            id: 3,
            name: "Scheduled for delivery"
        },
        {
            id: 4,
            name: "Delivered"
        },
        {
            id: 5,
            name: "Cancelled"
        }
    ];

    const handleOpenMenu = (event) => setAnchorEl(event.currentTarget);

    const handleCloseMenu = () => setAnchorEl(null);

    function handleStatusChange(status) {
        // BE call - update order status
        setStatus(status.name);
    }

    function _renderMenuItems() {
        let menuList = tmpStatusList
            .map((status) =>
                <MenuItem key={status.id} onClick={() => handleStatusChange(status)}>{status.name}</MenuItem>
            );
        return menuList;
    }

    return (
        <div className="ul-row-placed-table">
            <div className="ul-li">{order.id}</div>
            <div className="ul-li">{order.pickup.companyName}</div>
            <div className="ul-li">{order.pickup.address}</div>
            <div className="ul-li">
                <Moment date={order.pickup.date} format="ll" withTitle />
            </div>
            <div>
                <Button className="btn-menu" variant="contained" disableElevation={true} onClick={handleOpenMenu}>
                    {status}
                </Button>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleCloseMenu}
                >
                    {_renderMenuItems()}
                </Menu>
            </div>
            <div className="ul-li">
                <OrderModal order={order} />
            </div>
        </div>
    );
}