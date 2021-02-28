import React from 'react';
import OrdersMap from './OrdersMap';


export default function Scheduled(props) {

    return (
        <>
            <ul className="ul-hdr-scheduled-table">
                <li>Order #</li>
                <li>Vendor</li>
                <li>Address</li>
                <li>Status Date</li>
            </ul>
            <OrdersMap scheduled={true} orders={props.orders} />
        </>
    );
}