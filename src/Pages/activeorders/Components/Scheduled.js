import React from 'react';
import ScheduledOrder from './ScheduledOrder';


export default function Scheduled(props) {
    let orders = props.orders;

    function _renderOrders() {
        if (orders.length > 0) {
            let ordersList = orders
                .map((order) =>
                    <ScheduledOrder
                        key={order.id}
                        order={order} />
                );
            return ordersList;
        }
    }

    return (
        <>
            <ul className="ul-hdr-scheduled-table">
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