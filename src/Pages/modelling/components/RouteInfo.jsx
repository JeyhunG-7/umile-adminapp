import React, { useEffect, useState } from 'react';
import { roundTo } from '../../../utilities';
import '../Modelling.css';

const PRECISION_DECIMALS = 2;

export default ({ selected, routes, variables, setSelectedRoute }) => {

    const [routeInfo, setRouteInfo] = useState([]);

    useEffect(() => {
        if (!routes || routes.length === 0) {
            setRouteInfo([]);
            return;
        }

        if (selected !== 0) {
            const result = [];

            const foundRoute = routes.find(elem => elem.id === selected);
            if (!foundRoute) return;

            const { totalDuration, totalDistance, pickups, deliveries, handlingTime } = foundRoute;
            const { baseTime, wage, carRate, profitMargin, flatFeeAction, flatFeeDel } = variables;

            const distanceInKm = totalDistance / 1000;
            const totalTime = baseTime.value + (totalDuration / 60) + handlingTime;

            const timeCompensation = roundTo((totalTime / 60) * wage.value, PRECISION_DECIMALS);
            const vehicleExpense = roundTo(carRate.value * distanceInKm, PRECISION_DECIMALS);
            const totalDriverPay = roundTo(timeCompensation + vehicleExpense, PRECISION_DECIMALS);
            const profit = roundTo((profitMargin.value / 100) * totalDriverPay, PRECISION_DECIMALS);
            const totalCost = roundTo(profit + totalDriverPay, PRECISION_DECIMALS);
            const costPerDel = roundTo(totalCost / deliveries, PRECISION_DECIMALS);
            const costPerAction = roundTo(totalCost / (deliveries + pickups), PRECISION_DECIMALS);
            // const costPerKm = roundTo(totalCost / distanceInKm, PRECISION_DECIMALS);
            const flatFeePickupRevenue = roundTo((deliveries + pickups) * flatFeeAction.value - totalDriverPay, PRECISION_DECIMALS);
            const flatFeeDeliveryRevenue = roundTo(deliveries * flatFeeDel.value - totalDriverPay, PRECISION_DECIMALS);

            result.push({ display: 'Time Compensation', value: timeCompensation, units: '$' });
            result.push({ display: 'Vehicle Compensation', value: vehicleExpense, units: '$' });
            result.push({ display: 'Total Driver Pay', value: totalDriverPay, units: '$' });
            result.push({ display: 'Profit Margin Revenue', value: profit, units: '$' });
            result.push({ display: 'Total cost', value: totalCost, units: '$' });
            result.push({ display: 'Pickups / Deliveries', value: `${pickups} / ${deliveries}`, units: '' });
            result.push({ display: 'Cost per delivery', value: costPerDel, units: '$' });
            result.push({ display: 'Cost per action', value: costPerAction, units: '$' });
            // result.push({ display: 'Cost per km', value: costPerKm, units: '$' });
            result.push({ display: 'Flat fee stops', value: flatFeePickupRevenue, units: '$' });
            result.push({ display: 'Flat fee delivery', value: flatFeeDeliveryRevenue, units: '$' });

            setRouteInfo(result);
        } else {
            setRouteInfo([]);
        }
    }, [selected, routes, variables])

    return (
        <div style={{
            display: 'flex',
            backgroundColor: routeInfo.length > 0 ? 'lightblue' : 'unset',
            width: '100%'
        }}>
            <div className='route-information' >

                {routeInfo.map(({ display, value, units }, index) => (
                    <div key={index} style={{ padding: 1 }}>
                        {display}: <strong>{value}</strong> {units}
                    </div>
                ))}
            </div>

            {routeInfo.length > 0 &&
                <span
                    style={{ margin: '5px', color: 'blue', cursor: 'pointer' }}
                    onClick={() => setSelectedRoute(0)}
                >
                    dismiss
                </span>
            }
        </div>
    );
}