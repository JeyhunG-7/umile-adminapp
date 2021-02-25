import ApiResponse from '../../Models/ApiResponse';
import { GetAuthToken, SetAuthToken, RemoveAuthToken } from './LocalStorage';

export async function IsSignedInAsync() {
    var auth_token = GetAuthToken();
    if (!auth_token){
        return false;
    }

    try{
        var rawData = await fetch('/api/admin/login', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${auth_token}`
            }
        });
        var response = await rawData.json();
        
        if (!response.success){
            RemoveAuthToken();
            return false;
        }

        return true;
    } catch(e){
        console.error(e);
        return false;
    }   
}

export async function AuthenticateAsync(email, password) {
    try{
        var rawData = await fetch('/api/admin/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: email,
                password: password,
            })
        });
        var response = await rawData.json();
        console.log(response);
        if (response.success){
            SetAuthToken(response.data);
            return ApiResponse.createSuccess();;
        } else {
            return ApiResponse.createError(response.message);
        }
    } catch(e){
        console.error(e);
        return ApiResponse.createError('Something went wrong while login in. Please try again later');
    }    
}

export async function logoutAsync() {
    var auth_token = GetAuthToken();
    if (!auth_token){
        return ApiResponse.createError();
    }

    try{
        var rawData = await fetch('/api/admin/logout', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${auth_token}`
            }
        });
        var response = await rawData.json();
        
        if (!response.success){
            console.log('Error while logging out');
        }
    } catch(e){
        console.error(e);
    } finally {
        RemoveAuthToken();
        return ApiResponse.createSuccess();
    }
}