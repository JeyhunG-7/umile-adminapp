import React from 'react';
import ScheduledOrder from './ScheduledOrder';


export default function Scheduled(props) {

    function _renderOrders() {
        if (props.orders.length > 0) {
            let tmpList = props.orders
                .map((order) =>
                    <ScheduledOrder
                        key={order.id + order.received_date}
                        order={order}
                        statusList={props.statusList} 
                        onUpdate={() => props.onUpdate()}/>
                );
            return tmpList;
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