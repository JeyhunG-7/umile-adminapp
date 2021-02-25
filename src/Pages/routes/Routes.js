import React from 'react';
import './Routes.css';

import { Paper } from '@material-ui/core';

import RoutesMap from './Components/RoutesMap';


export default function Routes(props) {
    let tmpList=[
        {
            id: 1,
            driver: 'Kenan Ron',
            distance: '150km',
            duration: '3hr 30min',
            payout: '$57',
            orders: [],
            status: 1 //not completed
        },
        {
            id: 2,
            driver: 'Kenan Ron',
            distance: '123km',
            duration: '2hr 30min',
            payout: '$47',
            orders: [],
            status: 2 //not completed
        }
    ]

    return (
        <div className="routes">
            <Paper className="paper-routes flex-column" elevation={0}>
                <ul className='ul-hdr-routes-table'>
                    <li>id</li>
                    <li>Driver</li>
                    <li>Distance</li>
                    <li>Duration</li>
                    <li>Payout</li>
                    <li>Status</li>
                </ul>
                <RoutesMap routes={tmpList}/>
            </Paper>
        </div>
    );
}