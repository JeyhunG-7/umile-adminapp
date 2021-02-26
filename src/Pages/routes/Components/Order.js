import React from 'react'


export default function Order(props) {
    const order = props.order;

    return (
        <ul className="ul-row-orders-table">
            <li>{order.id}</li>
            <li>{order.customerName}</li>
            <li>{order.address}</li>
            <li>{order.phone}</li>
            <li>{order.notes}</li>
        </ul>
    );
}