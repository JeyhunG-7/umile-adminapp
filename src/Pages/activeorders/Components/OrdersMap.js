import React from 'react'
import ScheduledOrder from './ScheduledOrder';
import Dropoff from './Dropoff';


export default function OrdersMap(props) {
    let mapItems = [];

    if (props.scheduled && props.orders?.length > 0) {
        mapItems = props.orders
            .map((order) =>
                <ScheduledOrder
                    key={order.id}
                    order={order} />
            );
    } else if (props.dropoffs?.length > 0) {
        mapItems = props.dropoffs
            .map((dropoff) =>
                <Dropoff
                    key={dropoff.id}
                    dropoff={dropoff} />
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