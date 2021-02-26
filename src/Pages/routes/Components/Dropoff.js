import React from 'react'


export default function Dropoff(props) {
    const dropoffInfo = props.dropoff;

    return (
        <ul className="ul-row-orders-table">
            <li>{dropoffInfo.id}</li>
            <li>{dropoffInfo.customerName}</li>
            <li>{dropoffInfo.address}</li>
            <li>{dropoffInfo.phone}</li>
            <li>{dropoffInfo.notes}</li>
        </ul>
    );
}