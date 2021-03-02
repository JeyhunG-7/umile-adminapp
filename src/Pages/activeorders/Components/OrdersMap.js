import React from 'react'
import ScheduledOrder from './ScheduledOrder';


export default function OrdersMap(props) {
    let mapItems = [];

    if (props.scheduled && props.orders?.length > 0) {
        mapItems = props.orders
            .map((order) =>
                <ScheduledOrder
                    key={order.id}
                    order={order} />
            );
    }

    return (
        <>
            {
                mapItems
            }
        </>
    );
}