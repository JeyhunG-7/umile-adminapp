import { GetAuthToken } from "../Components/Helpers/LocalStorage";

export async function makeGetRequest(url, { auth = false, query = {} }) {
    try {

        let opts = {
            method: 'GET'
        }

        try{
            if (auth){
                var auth_token = GetAuthToken();
                if (!auth_token){
                    return false;
                }

                opts.headers = {
                    'Authorization': `Bearer ${auth_token}`,
                }
                
            }

            var u = new URL(`http:/fakehost/api/${url}`);
            u.search = new URLSearchParams(query).toString();
            let relative_url = u.pathname + u.search;
            let result = await fetch(relative_url, opts); 
            var data = await result.json();
        } catch(e){
            console.error(e);
            return;
        }


        if (data.success) {
            return data.data;
        } else {
            console.error('Server message and devMessage:', data);
        }
    } catch (error) {
        console.error(error);
    }

    return false;
}

/**
 * Custom made requester
 * @param {string} url request url
 * @param {object} param param object 
 * @param {function} err for error message
 */
export async function makePostRequest(url, { auth = false, body = {} }) {
    try{

        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

        if (auth){
            var auth_token = GetAuthToken();
            if (!auth_token){
                return false;
            }
            
            headers.Authorization = `Bearer ${auth_token}`;
        }

        var result = await fetch(`/api/${url}`, {
            method: 'POST',
            mode: 'cors',
            headers: headers,
            body: JSON.stringify(body)
        });
        var data = await result.json();
        if (data.success) {
            return data.data;
        }
    } catch(e){
        console.error(e);
        return;
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