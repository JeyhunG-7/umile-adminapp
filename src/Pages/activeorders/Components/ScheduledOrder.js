import React from 'react'
import Moment from 'react-moment';
import DropoffsModal from './DropoffsModal';


export default function ScheduledOrder(props) {
    let order = props.order;

    return (
        <div className="ul-row-scheduled-table">
            <div className="ul-li">{order.id}</div>
            <div className="ul-li">{order.pickup.companyName}</div>
            <div className="ul-li">{order.pickup.address}</div>
            <div className="ul-li"><Moment date={order.pickup.date} format="ll" withTitle /></div>
            <div className="ul-li"><DropoffsModal order={order} /></div>
        </div>
    );
}