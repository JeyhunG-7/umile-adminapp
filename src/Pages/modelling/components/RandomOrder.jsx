import React, { useState } from 'react';
import { makePostRequest, makeGetRequest } from '../../../utilities';
import '../Modelling.css';

const numberOfTimes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 50];
const options = [1, 2, 3, 4, 5, 7, 8, 9, 10, 15, 20, 25, 50];
const disabledStyle = { opacity: 0.5, backgroundColor: 'lightgrey' };

export default ({ setOrders }) => {

    const [deliveries, setDeliveries] = useState(options[0]);
    const [nTimes, setNTimes] = useState(numberOfTimes[0]);
    const [disabled, setDisabled] = useState(false);

    const submit = async () => {
        setDisabled(true);

        const n = nTimes * (deliveries + 1);

        console.log('Number of times, deliveries', deliveries, nTimes, n);

        const randomPoints = await makeGetRequest('/model/randomPoints', { params: { n } }, (err) => alert(err));
        if (!randomPoints) return;

        console.log(`Random points length ${randomPoints.length}`);

        let counter = 0;
        while (randomPoints.length > 0) {
            counter++;

            const pickup = randomPoints.shift();

            const deliver = [];
            for (let i = 0; i < deliveries; i++) {
                deliver.push(randomPoints.shift())
            }

            const result = await makePostRequest('/model/submitOrder', { obj: { pickup, deliver } }, (err) => alert(err));
            if (!result) return;

            console.log(`Order submitted ${counter}`);
        }

        const orders = await makeGetRequest('/model/orders', {}, (err) => alert(err));
        if (!orders) return;

        console.log('Getting orders to update', orders);

        setNTimes(numberOfTimes[0]);
        setDeliveries(options[0]);
        setDisabled(false);
        setOrders(orders);
    }

    return (
        <div
            className="card"
            style={disabled ? disabledStyle : {}}
        >
            <div className="card-header">
                Submit Random Order
            </div>

            <div>
                <select
                    onChange={({ target }) => setNTimes(Number(target.value))}
                    value={nTimes}
                >
                    {numberOfTimes.map((value, index) => <option key={index} value={value}>{value}</option>)}
                </select>
                <span>x</span>

                <span style={{ marginLeft: '5px' }}>Pickup(s): 1</span>

                <span style={{ marginLeft: '5px' }}>Deliveries:</span>

                <select
                    style={{ marginLeft: '2px' }}
                    onChange={({ target }) => setDeliveries(Number(target.value))}
                    value={deliveries}
                >
                    {options.map((value, index) => <option key={index} value={value}>{value}</option>)}
                </select>
            </div>

            <div style={{ display: 'flex', marginTop: 10 }}>
                <button
                    onClick={submit}
                    disabled={disabled}
                    className='card-action'
                >
                    Submit
                </button>
            </div>
        </div>
    );
}