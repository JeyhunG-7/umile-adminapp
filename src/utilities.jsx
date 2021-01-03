import axios from "axios";

const instance = axios.create({
    baseURL: '/api/',
    withCredentials: true
});

/**
 * Custom made requester
 * @param {string} url request url
 * @param {object} param param object 
 * @param {function} err for error message
 */
export async function makeGetRequest(url, { params = {} } = {}, err) {
    try {
        const { data: { data, success, message, devMessage } } = await instance.get(url, { params });

        console.log('GET =>', url, 'Success:', success, 'Data:', data, 'Message:', message, 'Dev Message:', devMessage);

        if (success) {
            return data;
        } else {
            if (err) err(message);
            console.error('Server message and devMessage:', message, devMessage);
        }
    } catch (error) {
        console.error(error);
        alert(error.message);
    }

    return false;
}

/**
 * Custom made requester
 * @param {string} url request url
 * @param {object} param param object 
 * @param {function} err for error message
 */
export async function makePostRequest(url, { obj = undefined, params = {} } = {}, err) {
    try {
        const { data: { data, success, message, devMessage } } = await instance.post(url, obj, { params });

        console.log('POST =>', url, 'Success:', success, 'Data:', data, 'Message:', message, 'Dev Message:', devMessage);

        if (success) {
            return data;
        } else {
            if (err) err(message);
            console.error('Server message and devMessage:', message, devMessage);
        }
    } catch (error) {
        console.error(error);
        alert(error.message);
    }

    return false;
}

export const roundTo = (inNum, exp = 0) => {
    if (!inNum) return inNum;
    const num = Number(inNum);
    if (isNaN(num)) throw new Error('func roundTo -> received NaN');
    const decimal = Math.pow(10, exp);
    return Math.round((num + Number.EPSILON) * decimal) / decimal;
}