import React from 'react'

import Route from './Route';


export default function RoutesMap(props) {
    let listRoutes = [];

    if (props.routes.length > 0) {
        listRoutes = props.routes
            .map((route) =>
                <Route
                    key={route.id}
                    route={route} />
            );
    }

    return (
        <>
            {
                listRoutes
            }
        </>
    );
}