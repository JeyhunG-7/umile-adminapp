import React from 'react';
import './ActiveOrders.css';

import { Paper } from '@material-ui/core';

import ScheduledOrders from './Components/Scheduled';


export default function ActiveOrders(props) {
    const tmpScheduled = [
        {
            id: 1, //order id
            pickup: {
                companyName: 'Arvel',
                address: '303-13 Ave SW Calgary, AB',
                date: 1614303891997 //status date
            },
            dropoffs: [
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
        },
        {
            id: 2, //order id
            pickup: {
                companyName: 'Dwarf Stars',
                address: '4104 17 St SW Calgary, AB',
                date: 1614303691997 //status date
            },
            dropoffs: [
                {
                    id: 3,
                    customerName: 'Sttefanie Woi',
                    address: '2509 14 St SW, Calgary, AB',
                    phone: '4033977020',
                    notes: null
                },
                {
                    id: 4,
                    customerName: 'John Akistein',
                    address: '2104 17 St SW, Calgary, AB',
                    phone: '4031235678',
                    notes: 'Buzzer 202'
                }
            ]
        }
    ];

    return (
        <div className="active-orders">
            <Paper className="paper-scheduled flex-column" elevation={0}>
                <h3>Scheduled orders</h3>
                <ScheduledOrders orders={tmpScheduled}/>
            </Paper>
            <Paper className="paper-placed flex-column" elevation={0}>
                <h3>Placed orders</h3>
            </Paper>
        </div>
    );
}