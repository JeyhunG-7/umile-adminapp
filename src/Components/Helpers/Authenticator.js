import { GetAuthToken, SetAuthToken, RemoveAuthToken } from './LocalStorage';
import ApiResponse from '../../Models/ApiResponse';

export async function IsSignedInAsync() {
    var auth_token = GetAuthToken();
    return auth_token;
}

export async function AuthenticateAsync(email, password) {
    
}

export async function logoutAsync() {
    RemoveAuthToken();
}