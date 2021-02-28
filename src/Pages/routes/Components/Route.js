import React from 'react'
import Moment from 'react-moment';

import { Button } from '@material-ui/core';

import OrderModal from './OrdersModal';


export default function Route(props) {
    const route = props.route;

    function completeRoute(){
        // BE call
    }

    function _renderRouteStatus(route){
        if(route.status === 1){
            return(
                <Button variant="contained" color="primary" className="btn-complete" onClick={completeRoute}>Complete</Button>
            );
        } else{
            return(
                <div className="status-completed">Completed</div>
            );
        }
    }

    return (
        <div className="ul-row-routes-table">
            <div className="ul-li">{route.id}</div>
            <div className="ul-li"><Moment date={route.date} format="ll" withTitle /></div>
            <div className="ul-li">{route.driver}</div>
            <div className="ul-li">{route.duration}</div>
            <div className="ul-li">{route.payout}</div>
            <div className="ul-li">{_renderRouteStatus(route)}</div>
            <div className="ul-li">
                <OrderModal orders={route.orders}/>
            </div>
        </div>
    );
}