import React from 'react'

import Order from './Order';


export default function OrdersMap(props) {
    let listOrders = [];

    if (props.orders.length > 0) {
        listOrders = props.orders
            .map((order) =>
                <Order
                    key={order.id}
                    order={order} />
            );
    }

    return (
        <>
            {
                listOrders
            }
        </>
    );
}