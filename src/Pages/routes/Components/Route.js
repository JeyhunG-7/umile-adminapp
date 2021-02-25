import React from 'react'

import { Button } from '@material-ui/core';


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
        <ul className="ul-row-routes-table">
            <li>{route.id}</li>
            <li>{route.driver}</li>
            <li>{route.distance}</li>
            <li>{route.duration}</li>
            <li>{route.payout}</li>
            <li>{_renderRouteStatus(route)}</li>
            <li>
                <Button className="btn-view-route">
                    <i className="lni lni-eye"></i>
                </Button>
            </li>
        </ul>
    );
}