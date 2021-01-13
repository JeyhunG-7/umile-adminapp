import React, { useEffect, useState } from 'react';
import { makeGetRequest, roundTo } from '../../utilities';
import mapboxgl from 'mapbox-gl';
import { Backdrop, CircularProgress } from '@material-ui/core';
import RandomOrder from './components/RandomOrder';
import AlgoOptions from './components/AlgoOptions';
import Variables from './components/Variables';
import RouteInfo from './components/RouteInfo';
import logo from '../../Images/logo_transparent.png';
import deleteLogo from '../../Images/delete.svg';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import './Modelling.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiY2hpbmdpei11bWlsZSIsImEiOiJja2pjaWhlc2YwNDZyMnlyeDF6anJ5MDg2In0.l2TmWAq-Hvn-LOwfP-DUug';

const SCHEDULED_COLOR = '#006400';
const NOT_SCHEDULED_COLOR = "#D3D3D3";
const SELECTED_COLOUR = "lightblue";

let map;
let markersOnMap = [];
let layerIdsOnMap = [];

/**
 * light color - Pick up
 * dark color - drop off
 */
const colorSets = [
    "#0F5570", // blue
    "#6B0D0C", // red
    "#2F6607", // green
    "#05A888", // cyan
    "#9DC757", // lime
    "#A6750D", // yellow
]

export default () => {

    const [orders, setOrders] = useState([]);
    const [routes, setRoutes] = useState([]);
    const [selectedRoute, setSelectedRoute] = useState(0);
    const [backdropOpen, setBackdropOpen] = useState(false);
    const [options, setOptions] = useState({ dirW: 0, disW: 100, dirBias: 2 });
    const [mapLoaded, setMapLoaded] = useState(false);

    const [variables, setVariables] = useState({
        baseTime: { value: 10, display: 'Base Time', units: 'mins' },
        wage: { value: 15, display: 'Wage', units: '$ per hour' },
        carRate: { value: 0.15, display: 'Car Rate', units: '$ per km' },
        profitMargin: { value: 0, display: 'Profit Margin', units: '%' },
        flatFeeAction: { value: 7.49, display: 'Flat fee', units: '$ per action' },
        flatFeeDel: { value: 9.99, display: 'Flat fee', units: '$ per delivery' }
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
        if (!map || !mapLoaded || !orders) {
            setSelectedRoute(0);
            return;
        }

        markersOnMap.forEach(marker => marker.remove());
        markersOnMap = [];

        function createDeliveryMarker(color) {
            return `
            <svg width="30" height="30" version="1.1">
            <g transform="translate(0 -1028.4)"><path style="fill: ${color}" d="m12 0c-4.4183 2.3685e-15 -8 3.5817-8 8 0 1.421 0.3816 2.75 1.0312 3.906 0.1079 0.192 0.221 0.381 0.3438 0.563l6.625 11.531 6.625-11.531c0.102-0.151 0.19-0.311 0.281-0.469l0.063-0.094c0.649-1.156 1.031-2.485 1.031-3.906 0-4.4183-3.582-8-8-8zm0 4c2.209 0 4 1.7909 4 4 0 2.209-1.791 4-4 4-2.2091 0-4-1.791-4-4 0-2.2091 1.7909-4 4-4z" transform="translate(0 1028.4)"/><path d="m12 3c-2.7614 0-5 2.2386-5 5 0 2.761 2.2386 5 5 5 2.761 0 5-2.239 5-5 0-2.7614-2.239-5-5-5zm0 2c1.657 0 3 1.3431 3 3s-1.343 3-3 3-3-1.3431-3-3 1.343-3 3-3z" fill="${color}" transform="translate(0 1028.4)"/></g>
            </svg>
            `
        }

        function createPickUpMarker(color) {
            return `
            <?xml version="1.0" ?><!DOCTYPE svg  PUBLIC '-//W3C//DTD SVG 1.1//EN'  'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'><svg style="background-color: ${color};" enable-background="new 0 0 30 30" height="30px" id="Capa_1" version="1.1" viewBox="0 0 30 30" width="30px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><g><path style="fill: white;" d="M14.6,15.9H7.9c-1.5,0-2.7,1.2-2.7,2.7v1.9c0,1.5,1.2,2.7,2.7,2.7h6.7c1.5,0,2.7-1.2,2.7-2.7v-1.9    C17.3,17.1,16.1,15.9,14.6,15.9z M15.8,20.5c0,0.7-0.5,1.2-1.2,1.2H7.9c-0.7,0-1.2-0.5-1.2-1.2v-1.9c0-0.7,0.5-1.2,1.2-1.2h6.7    c0.7,0,1.2,0.5,1.2,1.2V20.5z M29.6,10.9l-1.4-7.4c-0.1-0.4-0.4-0.6-0.7-0.6h-25c-0.4,0-0.7,0.3-0.7,0.6L0.6,9.6    c-0.2,0.5-0.3,1-0.3,1.5c0,1.5,0.8,2.9,2.1,3.6v10.3c0,1.2,1,2.2,2.2,2.2h14c0.4,0,0.8-0.3,0.8-0.8c0,0,0,0,0-0.1c0,0,0,0,0-0.1    v-9h4v9c0,0,0,0,0,0.1c0,0,0,0,0,0.1c0,0.4,0.3,0.8,0.8,0.8h1.4c1.2,0,2.2-1,2.2-2.2V14.5c1.1-0.7,1.8-1.9,1.9-3.2    C29.7,11.2,29.7,11,29.6,10.9z M26.2,24.9c0,0.4-0.3,0.7-0.7,0.7h-0.7v-9.1c0-0.4-0.3-0.8-0.8-0.8h-5.5c-0.4,0-0.8,0.3-0.8,0.8    v9.1H4.6c-0.4,0-0.7-0.3-0.7-0.7v-9.7c0.2,0,0.4,0.1,0.6,0.1c1.4,0,2.7-0.7,3.5-1.8c0.8,1.1,2,1.8,3.5,1.8s2.7-0.7,3.5-1.8    c0.8,1.1,2,1.8,3.5,1.8s2.7-0.7,3.5-1.8c0.8,1.1,2,1.8,3.5,1.8c0.3,0,0.6,0,0.8-0.1V24.9z M28.1,11c0,1.5-1.2,2.7-2.7,2.7    s-2.7-1.2-2.7-2.7c0-0.4-0.3-0.8-0.8-0.8s-0.8,0.3-0.8,0.8c0,1.5-1.2,2.7-2.7,2.7s-2.7-1.2-2.7-2.7c0-0.4-0.3-0.8-0.8-0.8    s-0.8,0.3-0.8,0.8c0,1.5-1.2,2.7-2.7,2.7c-1.5,0-2.7-1.2-2.7-2.7c0-0.4-0.3-0.8-0.8-0.8S7.3,10.6,7.3,11c0,1.5-1.2,2.7-2.7,2.7    c-1.5,0-2.7-1.2-2.7-2.7c0-0.3,0.1-0.7,0.2-1c0,0,0-0.1,0-0.1l1.1-5.5h23.8l1.2,6.5C28.1,11,28.1,11,28.1,11z" fill="#262324"/></g></g></svg>
            `
        }

        let colorIndex = 0;
        orders.forEach(({ id, places: { pickup, delivery } }) => {

            pickup.concat(delivery).forEach(({ placeId, geometry }, index) => {
                const action = index === 0 ? 'Pick Up' : 'Delivery';

                let div = document.createElement('div');
                div.innerHTML = index === 0 ? createPickUpMarker(colorSets[colorIndex]) : createDeliveryMarker(colorSets[colorIndex]);
                const marker = new mapboxgl.Marker({
                    element: div
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
            colorIndex++;
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
        setRoutes([]);
    }

    const runScheduler = async () => {
        setSelectedRoute(0);
        setBackdropOpen(true);

        const params = { dirW: options.dirW / 100, disW: options.disW / 100, dirBias: options.dirBias }
        const result = await makeGetRequest('/model/run', { params }, (err) => alert(err));

        if (result) {
            const routeResult = await makeGetRequest('/model/routes', {}, (err) => alert(err));
            const orderResult = await makeGetRequest('/model/orders', {}, (err) => alert(err));

            if (!orderResult || !routeResult) return;

            setOrders(orderResult);
            setRoutes(routeResult);
        }

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
            if (elem.id === id) elem.isfull = flag;
            return elem;
        });

        setRoutes(newArr);
    }

    const toHrsAndMins = (value) => {
        const durationMins = roundTo(value / 60, 0);
        const hrs = Math.trunc(durationMins / 60);
        const mins = durationMins % 60;

        const hrTxt = hrs > 1 ? 'hrs' : 'hr';
        const minTxt = mins > 1 ? 'mins' : 'min';

        return `${hrs} ${hrTxt} ${mins} ${minTxt}`
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
                            {routes.map(({ id, isfull, totalDistance, totalDuration, handlingTime }) => {

                                const distance = roundTo(totalDistance / 1000, 1);
                                const btnText = isfull ? 'Make not full' : 'Make full';
                                const backgroundColor = selectedRoute === id ? SELECTED_COLOUR : (isfull ? SCHEDULED_COLOR : NOT_SCHEDULED_COLOR);

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
                                            <span>{toHrsAndMins(handlingTime * 60)}</span>
                                        </div>

                                        <div style={{ display: 'flex', marginTop: '7px' }}>
                                            <span>
                                                Route is
                                                <strong style={{ marginLeft: '5px' }}>
                                                    {isfull ? 'full' : 'not full yet'}
                                                </strong>
                                            </span>

                                            <button
                                                style={{ marginLeft: 'auto', borderRadius: '.2em' }}
                                                onClick={() => toggleRouteFull(id, !isfull)}
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

                <div className='run-btn' style={{ margin: '2px 5px 2px auto' }} onClick={runScheduler}>
                    <PlayArrowIcon style={{ margin: 'auto', fontSize: 55 }} />
                </div>

                <AlgoOptions options={options} setOptions={setOptions} />
            </div>

            <Backdrop open={backdropOpen} style={{ color: '#fff', zIndex: 1 }}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    );
}