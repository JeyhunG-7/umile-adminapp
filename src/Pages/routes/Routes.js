import React from 'react';
import './Routes.css';

import { Paper } from '@material-ui/core';

import RoutesMap from './Components/RoutesMap';


export default function Routes(props) {
    let tmpList = [
        {
            id: 1,
            driver: 'Kenan Ron',
            date: 1614303891997,
            duration: '3hr 30min',
            payout: '$57',
            pickup: {
                companyName: 'Arvel',
                address: '303-13 Ave SW Calgary, AB'
            },
            orders: [
                {
                    id: 4,
                    customerName: 'Sttefanie Woi',
                    address: '2509 14 St SW, Calgary, AB',
                    phone: '4033977020',
                    notes: null
                },
                {
                    id: 3,
                    customerName: 'John Akistein',
                    address: '2104 17 St SW, Calgary, AB',
                    phone: '4031235678',
                    notes: 'Buzzer 202'
                }
            ],
            status: 1 //not completed
        },
        {
            id: 2,
            driver: 'Kenan Ron',
            date: 1614303691997,
            duration: '2hr 30min',
            payout: '$47',
            pickup: {
                companyName: 'Arvel',
                address: '303-13 Ave SW Calgary, AB'
            },
            orders: [
                {
                    id: 1,
                    customerName: 'Sttefanie Woi',
                    address: '2509 14 St SW, Calgary, AB',
                    phone: '4033977020',
                    notes: null
                },
                {
                    id: 2,
                    customerName: 'John Akistein',
                    address: '2104 17 St SW, Calgary, AB',
                    phone: '4031235678',
                    notes: 'Buzzer 202'
                }
            ],
            status: 2 //not completed
        }
    ]

    return (
        <div className="routes">
            <Paper className="paper-routes flex-column" elevation={0}>
                <ul className='ul-hdr-routes-table'>
                    <li>id</li>
                    <li>Date</li>
                    <li>Driver</li>
                    <li>Duration</li>
                    <li>Payout</li>
                    <li>Status</li>
                </ul>
                <RoutesMap routes={tmpList} />
            </Paper>
        </div>
    );
}