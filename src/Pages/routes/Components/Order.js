import React from 'react'

import DropoffsMap from './DropoffsMap';


export default function Order(props) {
    const pickupInfo = props.order.pickup;
    const dropOffs = props.order.dropoffs;

    return (
        <div className="div-order">
            <div style={{ width: '100%', margin: 'auto', borderBottom: '1px solid green' }} className="flex-column">
                <div className="div-pick-up flex-column">
                    <div className="div-order-id">Order id: {props.order.id}</div>
                    <h3>Pick up information</h3>
                    <ul className="ul-hdr-pickup-table">
                        <li>Company</li>
                        <li>Address</li>
                    </ul>
                    <ul className="ul-row-pickup-table">
                        <li>{pickupInfo.companyName}</li>
                        <li>{pickupInfo.address}</li>
                    </ul>
                </div>
                <div className="div-pick-up flex-column">
                    <h3>Drop off information</h3>
                    <ul className="ul-hdr-dropoff-table">
                        <li>id</li>
                        <li>Name</li>
                        <li>Address</li>
                        <li>Phone</li>
                        <li>Notes</li>
                    </ul>
                    <DropoffsMap dropoffs={dropOffs} />
                </div>
            </div>
        </div>
    );
}