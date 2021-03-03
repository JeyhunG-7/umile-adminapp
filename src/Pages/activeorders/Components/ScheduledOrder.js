import React, { useState } from 'react';
import Moment from 'react-moment';
import OrderModal from './OrderModal';

import { Button, Menu, MenuItem } from '@material-ui/core';
import { makePostRequest } from '../../../utilities';


export default function ScheduledOrder(props) {
    let order = props.order;
    const [anchorEl, setAnchorEl] = useState(null);
    const [status, setStatus] = useState(order?.status?.value);

    function handleOpenMenu(e) {
        setAnchorEl(e.currentTarget);
    }

    function handleCloseMenu() {
        setAnchorEl(null);
    }

    async function handleStatusChange(status) {
        const result = await makePostRequest('/admin/orders/changeStatus', { auth: true, body: { orderId: order.id, statusId: status.id } });
        if(result){
            setStatus(status.name);
            props.onUpdate();
            handleCloseMenu();
        }
    }

    function _renderMenuItems() {
        if (props.statusList?.length > 0) {
            let menuList = props.statusList
                .map((status) =>
                    <MenuItem key={status.id} onClick={() => handleStatusChange(status)}>{status.name}</MenuItem>
                );
            return menuList;
        }
    }

    return (
        <div className="ul-row-scheduled-table">
            <div className="ul-li">{order?.id}</div>
            <div className="ul-li">{order?.client?.company}</div>
            <div className="ul-li">{order?.pickup?.address}</div>
            <div className="ul-li">
                <Moment date={order?.status?.timestamp} format="ll" withTitle />
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