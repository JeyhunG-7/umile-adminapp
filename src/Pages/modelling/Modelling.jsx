import React, { useEffect, useState } from 'react';
import { makeGetRequest, roundTo } from '../../utilities';
import mapboxgl from 'mapbox-gl';
import { Backdrop, CircularProgress } from '@material-ui/core';
import RandomOrder from './components/RandomOrder';
import Variables from './components/Variables';
import RouteInfo from './components/RouteInfo';
import logo from '../../Images/logo_transparent.png';
import deleteLogo from '../../Images/delete.svg';
import './Modelling.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiY2hpbmdpei11bWlsZSIsImEiOiJja2pjaWhlc2YwNDZyMnlyeDF6anJ5MDg2In0.l2TmWAq-Hvn-LOwfP-DUug';

const SCHEDULED_COLOR = '#006400';
const NOT_SCHEDULED_COLOR = "#D3D3D3";
const SELECTED_COLOUR = "lightblue";

let map;
let markersOnMap = [];
let layerIdsOnMap = [];

export default () => {

    const [orders, setOrders] = useState([]);
    const [routes, setRoutes] = useState([]);
    const [selectedRoute, setSelectedRoute] = useState(0);
    const [backdropOpen, setBackdropOpen] = useState(false);
    const [mapLoaded, setMapLoaded] = useState(false);

    const [variables, setVariables] = useState({
        baseTime: { value: 10, display: 'Base Time', units: 'mins' },
        wage: { value: 15, display: 'Wage', units: '$ per hour' },
        carRate: { value: 0.15, display: 'Car Rate', units: '$ per km' },
        profitMargin: { value: 15, display: 'Profit Margin', units: '%' },
    });

    useEffect(() => {

        const fetchData = async () => {
            const orderResult = await makeGetRequest('/model/orders', {}, (err) => alert(err));
            if (!orderResult) return;

            setOrders(orderResult);

            const routeResult = await makeGetRequest('/model/routes', {}, (err) => alert(err));
            if (!routeResult) return;

            setRoutes(routeResult);
        }

        map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/dark-v10',
            center: [-114.066666, 51.049999],
            zoom: 9
        });

        map.on('load', () => setMapLoaded(true));

        fetchData();
    }, [])

    useEffect(() => {
        if (!map || !mapLoaded || !orders) return;

        markersOnMap.forEach(marker => marker.remove());
        markersOnMap = [];

        orders.forEach(({ id, scheduled, places: { pickup, delivery } }) => {

            pickup.concat(delivery).forEach(({ placeId, geometry }, index) => {
                const action = index === 0 ? 'Pick Up' : 'Delivery';

                const marker = new mapboxgl.Marker({
                    color: scheduled ? SCHEDULED_COLOR : NOT_SCHEDULED_COLOR
                })
                    .setLngLat(geometry.coordinates)
                    .setPopup(new mapboxgl.Popup({ offset: 25 })
                        .setHTML(`<h3> Order ${id} </h3>
                              <p> Place ID: ${placeId} </p>
                              <p> Action: ${action} </p>`)
                    )
                    .addTo(map);

                markersOnMap.push(marker);
            })
        })

    }, [mapLoaded, orders])

    useEffect(() => {
        if (!map || !mapLoaded || !routes) return;

        layerIdsOnMap.forEach(layerId => {
            if (map.getLayer(layerId)) {
                map.removeLayer(layerId);
                map.removeSource(layerId);
            }
        })

        routes.forEach(({ id, geojson }) => {

            const layerId = `line-${id}`

            map.addSource(layerId, { type: 'geojson', data: geojson });

            map.addLayer({
                id: layerId,
                source: layerId,
                type: 'line',
                layout: {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                paint: {
                    'line-color': 'orange',
                    'line-width': 5
                }
            })

            layerIdsOnMap.push(layerId);
        })

    }, [mapLoaded, routes])

    const deleteOrder = async (id) => {
        const result = await makeGetRequest('/model/order/delete', { params: { id } }, (err) => alert(err));
        if (!result) return;

        const newArr = orders.filter(elem => elem.id !== id);
        setOrders(newArr);
    }

    const deleteAllOrders = async () => {
        const result = await makeGetRequest('/model/order/deleteAll', {}, (err) => alert(err));
        if (!result) return;

        setOrders([]);
    }

    const runScheduler = async () => {
        setBackdropOpen(true);

        const result = await makeGetRequest('/model/run', {}, (err) => alert(err));
        if (!result) return;

        const routeResult = await makeGetRequest('/model/routes', {}, (err) => alert(err));
        if (!routeResult) return;

        const orderResult = await makeGetRequest('/model/orders', {}, (err) => alert(err));
        if (!orderResult) return;

        setOrders(orderResult);
        setRoutes(routeResult);
        setBackdropOpen(false);
    }

    const deleteRoute = async (id) => {
        const result = await makeGetRequest('/model/route/delete', { params: { id } }, (err) => alert(err));
        if (!result) return;

        const newArr = routes.filter(elem => elem.id !== id);
        setRoutes(newArr);
    }

    const toggleRouteFull = async (id, flag) => {
        const result = await makeGetRequest('/model/route/full', { params: { id, flag } }, (err) => alert(err));
        if (!result) return;

        const newArr = routes.map(elem => {
            if (elem.id === id) elem.full = flag;
            return elem;
        });

        setRoutes(newArr);
    }

    const toHrsAndMins = (value) => {
        const durationMins = roundTo(value / 60, 0);
        const hrs = Math.trunc(durationMins / 60);
        const mins = durationMins % 60;

        return `${hrs} hrs ${mins} mins`
    }

    return (
        <>
            <div className='container'>
                <div className='logo'>
                    <img src={logo} alt='logo' style={{ width: 'inherit', height: 'inherit' }} />
                </div>

                <div className='top-banner'>
                    <RouteInfo
                        selected={selectedRoute}
                        variables={variables}
                        routes={routes}
                        setSelectedRoute={setSelectedRoute}
                    />
                </div>

                <div className='left-nav'>
                    <Variables variables={variables} setVariables={setVariables} />

                    <RandomOrder setOrders={setOrders} />

                    <div className='sub-header'>Orders</div>

                    <div style={{ display: 'flex' }}>
                        <button
                            className="clear-btn"
                            onClick={deleteAllOrders}
                        >
                            Clear All
                        </button>
                    </div>

                    <div className='orders-container'>
                        {orders.map(({ id, scheduled, places: { delivery, pickup } }) => {
                            return (
                                <div
                                    key={id}
                                    className='order-row'
                                    style={{ backgroundColor: scheduled ? SCHEDULED_COLOR : NOT_SCHEDULED_COLOR }}
                                >
                                    <div style={{ display: 'flex' }}>
                                        <span style={{ margin: 'auto' }}>ID: {id}</span>
                                        <span style={{ margin: 'auto' }}>Pickups: {pickup.length}</span>
                                        <span style={{ margin: 'auto' }}>Deliveries: {delivery.length}</span>
                                        <img
                                            width={12}
                                            height={14}
                                            src={deleteLogo}
                                            alt='delete-logo'
                                            onClick={() => deleteOrder(id)}
                                            style={{ cursor: 'pointer', marginLeft: 'auto', fill: 'red' }}
                                        />
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    <div style={{ paddingTop: 7 }}>
                        <div className='sub-header'>Routes</div>

                        <div className='routes-container'>
                            {routes.map(({ id, full, totalDistance, totalDuration, handlingTime }) => {

                                const distance = roundTo(totalDistance / 1000, 1);
                                const btnText = full ? 'Make not full' : 'Make full';
                                const backgroundColor = selectedRoute === id ? SELECTED_COLOUR : (full ? SCHEDULED_COLOR : NOT_SCHEDULED_COLOR);

                                return (
                                    <div
                                        key={id}
                                        className='order-row'
                                        style={{ cursor: 'pointer', backgroundColor }}
                                        onClick={() => setSelectedRoute(id)}
                                    >
                                        <div style={{ display: 'flex' }}>
                                            <span>ID: {id}</span>

                                            <span style={{ margin: 'auto' }}>
                                                <input
                                                    type="checkbox"
                                                    defaultChecked={true}
                                                    onChange={({ target: { checked } }) => {
                                                        const visibility = checked ? 'visible' : 'none';
                                                        const layerId = `line-${id}`;

                                                        if (map.getLayer(layerId)) {
                                                            map.setLayoutProperty(layerId, 'visibility', visibility);
                                                        }
                                                    }}
                                                />
                                                Display on map
                                            </span>

                                            <img
                                                width={12}
                                                height={14}
                                                src={deleteLogo}
                                                alt='delete-logo'
                                                onClick={() => deleteRoute(id)}
                                                style={{ cursor: 'pointer', marginLeft: 'auto', fill: 'red' }}
                                            />
                                        </div>

                                        <div style={{ display: 'flex', marginTop: '7px' }}>
                                            <span>{distance} km</span>
                                            <span style={{ margin: 'auto' }}>{toHrsAndMins(totalDuration)}</span>
                                            <span>{toHrsAndMins(handlingTime)}</span>
                                        </div>

                                        <div style={{ display: 'flex', marginTop: '7px' }}>
                                            <span>
                                                Route is
                                                <strong style={{ marginLeft: '5px' }}>
                                                    {full ? 'full' : 'not full yet'}
                                                </strong>
                                            </span>

                                            <button
                                                style={{ marginLeft: 'auto', borderRadius: '.2em' }}
                                                onClick={() => toggleRouteFull(id, !full)}
                                            >
                                                {btnText}
                                            </button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>

                <div id='map'></div>

                <div className='btn-blue' style={{ margin: '2px 5px 2px auto' }} onClick={runScheduler}>
                    <span style={{ margin: 'auto', fontSize: 20 }}>RUN</span>
                </div>
            </div>

            <Backdrop open={backdropOpen} style={{ color: '#fff', zIndex: 1 }}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    );
}