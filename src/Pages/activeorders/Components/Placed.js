import React from 'react';
import PlacedOrder from './PlacedOrder';


export default function Placed(props) {

    function _renderOrders() {
        if (props.orders.length > 0) {
            let tmpList = props.orders
                .map((order) =>
                    <PlacedOrder
                        key={order.id + order.received_date}
                        order={order}
                        statusList={props.statusList}
                        onUpdate={() => props.onUpdate()} />
                );
            return tmpList;
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