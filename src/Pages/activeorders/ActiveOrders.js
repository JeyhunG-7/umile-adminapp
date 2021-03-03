import React, { useEffect, useState } from 'react';
import './ActiveOrders.css';

import { Paper } from '@material-ui/core';

import ScheduledOrders from './Components/Scheduled';
import PlacedOrders from './Components/Placed';
import { makeGetRequest } from '../../utilities';


export default function ActiveOrders(props) {
    const [orderUpdated, setOrderUpdated] = useState(true);
    const [statusList, setStatusList] = useState([]);

    const [scheduledOrders, setScheduledOrders] = useState([{}]);
    const [placedOrders, setPlacedOrders] = useState([{}]);

    useEffect(() => {
        async function effect() {
            var statusList = await makeGetRequest('/admin/orders/statuses', { auth: true, query: { cityId: 1, active: true } });
            if (statusList) {
                setStatusList(statusList);
            }
            var scheduledOrders = await makeGetRequest('/admin/orders/list', { auth: true, query: { cityId: 1, active: true } });
            if (scheduledOrders) {
                setPlacedOrders(scheduledOrders.filter((o) => o.status.id < 3));
                setScheduledOrders(scheduledOrders.filter((o) => o.status.id >= 3));
            }
        }

        if (orderUpdated) {
            effect();
            setOrderUpdated(false);
        }
    }, [orderUpdated]);

    return (
        <div className="active-orders">
            <Paper className="paper-scheduled flex-column" elevation={0}>
                <h3>Scheduled orders</h3>
                <ScheduledOrders statusList={statusList} orders={scheduledOrders} onUpdate={() => setOrderUpdated(true)}/>
            </Paper>
            <Paper className="paper-placed flex-column" elevation={0}>
                <h3>Placed orders</h3>
                <PlacedOrders statusList={statusList} orders={placedOrders} onUpdate={() => setOrderUpdated(true)}/>
            </Paper>
        </div>
    );
}