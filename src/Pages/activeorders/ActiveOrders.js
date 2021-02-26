import React from 'react';
import './ActiveOrders.css';

import { Paper } from '@material-ui/core';


export default function ActiveOrders(props) {
    return (
        <div className="active-orders">
            <Paper className="paper-ao flex-column" elevation={0}>
                <p>active orders</p>
            </Paper>
        </div>
    );
}