import React from 'react';
import './ActiveOrders.css';

import { Paper } from '@material-ui/core';

import ScheduledOrders from './Components/Scheduled';
import PlacedOrders from './Components/Placed';


export default function ActiveOrders(props) {

    // BE call - get scheduled order list
    const scheduledList = [
        {
            id: 1, //order id
            status: "Scheduled for delivery",
            pickup: {
                companyName: 'Arvel',
                address: '303-13 Ave SW Calgary, AB',
                date: 1614103891997 //status date
            },
            dropoff: {
                customerName: 'Sttefanie Woi',
                address: '2509 14 St SW, Calgary, AB',
                phone: '4033977020',
                notes: null
            }
        },
        {
            id: 2, //order id
            status: "Scheduled for delivery",
            pickup: {
                companyName: 'Arvel',
                address: '303-13 Ave SW Calgary, AB',
                date: 1614303791997 //status date
            },
            dropoff: {
                customerName: 'Sttefanie Woi',
                address: '2509 14 St SW, Calgary, AB',
                phone: '4033977020',
                notes: null
            }
        },
        {
            id: 3, //order id
            status: "Scheduled for delivery",
            pickup: {
                companyName: 'Arvel',
                address: '303-13 Ave SW Calgary, AB',
                date: 1614703691997 //status date
            },
            dropoff: {
                customerName: 'Steve Johnson',
                address: '3124 4 St SE, Calgary, AB',
                phone: '4033971234',
                notes: null
            }
        }
    ]

    // BE call - get placed order list
    const placedList = [
        {
            id: 4, //order id
            status: "Submitted for delivery",
            pickup: {
                companyName: 'Arvel',
                address: '303-13 Ave SW Calgary, AB',
                date: 1614103891997 //status date
            },
            dropoff: {
                customerName: 'Sttefanie Woi',
                address: '2509 14 St SW, Calgary, AB',
                phone: '4033977020',
                notes: null
            }
        },
        {
            id: 5, //order id
            status: "Submitted for delivery",
            pickup: {
                companyName: 'Arvel',
                address: '303-13 Ave SW Calgary, AB',
                date: 1614303791997 //status date
            },
            dropoff: {
                customerName: 'Sttefanie Woi',
                address: '2509 14 St SW, Calgary, AB',
                phone: '4033977020',
                notes: null
            }
        },
        {
            id: 6, //order id
            status: "Submitted for delivery",
            pickup: {
                companyName: 'Arvel',
                address: '303-13 Ave SW Calgary, AB',
                date: 1614703691997 //status date
            },
            dropoff: {
                customerName: 'Steve Johnson',
                address: '3124 4 St SE, Calgary, AB',
                phone: '4033971234',
                notes: null
            }
        }
    ]

    return (
        <div className="active-orders">
            <Paper className="paper-scheduled flex-column" elevation={0}>
                <h3>Scheduled orders</h3>
                <ScheduledOrders orders={scheduledList} />
            </Paper>
            <Paper className="paper-placed flex-column" elevation={0}>
                <h3>Placed orders</h3>
                <PlacedOrders orders={placedList} />
            </Paper>
        </div>
    );
}