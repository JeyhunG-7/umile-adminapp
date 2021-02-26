import React from 'react'

import Dropoff from './Dropoff';


export default function DropoffsMap(props) {
    let listDropoffs = [];

    if (props.dropoffs.length > 0) {
        listDropoffs = props.dropoffs
            .map((dropoff) =>
                <Dropoff
                    key={dropoff.id}
                    dropoff={dropoff} />
            );
    }

    return (
        <>
            {
                listDropoffs
            }
        </>
    );
}