import React from 'react';
import PlacedOrder from './PlacedOrder';


export default function Placed(props) {
    let orders = props.orders;

    function _renderOrders() {
        if (orders.length > 0) {
            let ordersList = orders
                .map((order) =>
                    <PlacedOrder
                        key={order.id}
                        order={order} />
                );
            return ordersList;
        }
    }

    return (
        <>
            <ul className="ul-hdr-placed-table">
                <li>Order #</li>
                <li>Vendor</li>
                <li>Address</li>
                <li>Status Date</li>
                <li>Status</li>
            </ul>
            {_renderOrders()}
        </>
    );
}