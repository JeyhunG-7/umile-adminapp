import axios from "axios";

const instance = axios.create({
    withCredentials: true
});

// fetch(`http://localhost:8080/model/orders`, {
//     method: 'GET',
//     mode: 'cors'
// }).then(data => {
//     console.log('FETCH PART 1 => ', data);
//     return data.json();
// }).then(data => {
//     console.log('FETCH PART 2 => ', data);
// })

/**
 * Custom made requester
 * @param {string} url request url
 * @param {object} param param object 
 * @param {function} err for error message
 */
export async function makeGetRequest(url, { params = {} } = {}, err) {
    try {
        var u = new URL(`http://localhost:8080/api${url}`);
        u.search = new URLSearchParams(params).toString();
        try{
            var result = await fetch(u, {
                method: 'GET',
                mode: 'cors'
            });
            console.log("FETCH PART 1 => ", result);
            var data = await result.json();
            console.log("FETCH PART 2 => ", data);
        } catch(e){
            console.error(e);
            return;
        }
        
        // const { data: { data, success, message, devMessage } } = await instance.get(`http://localhost:8080${url}`, { params });

        // console.log('GET =>', url, 'Success:', success, 'Data:', data, 'Message:', message, 'Dev Message:', devMessage);

        if (data.success) {
            return data.data;
        } else {
            // if (err) err(message);
            // console.error('Server message and devMessage:', message, devMessage);
        }
    } catch (error) {
        // console.error(error);
        // alert(error.message);
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
    console.log('OBJ =>', obj);
    console.log('PARAMS =>', params);
    var u = new URL(`http://localhost:8080/api${url}`);
    u.search = new URLSearchParams(params).toString();
    try{
        var result = await fetch(u, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        });
        console.log("FETCH PART 1 => ", result);
        var data = await result.json();
        console.log("FETCH PART 2 => ", data);
        if (data.success) {
            return data.data;
        }
    } catch(e){
        console.error(e);
        err(e);
        return;
    }
    // try {

        
    //     // console.log('POST REQUEST');
    //     // const { data: { data, success, message, devMessage } } = await instance.post(`http://localhost:8080/api${url}`, obj, { params });

    //     // console.log('POST =>', url, 'Success:', success, 'Data:', data, 'Message:', message, 'Dev Message:', devMessage);

    //     if (success) {
    //         return data;
    //     } else {
    //         if (err) err(message);
    //         console.error('Server message and devMessage:', message, devMessage);
    //     }
    // } catch (error) {
    //     console.error(error);
    //     alert(error.message);
    // }

    return false;
}

export const roundTo = (inNum, exp = 0) => {
    if (!inNum) return inNum;
    const num = Number(inNum);
    if (isNaN(num)) throw new Error('func roundTo -> received NaN');
    const decimal = Math.pow(10, exp);
    return Math.round((num + Number.EPSILON) * decimal) / decimal;
}