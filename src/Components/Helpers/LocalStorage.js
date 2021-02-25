const AUTH_TOKEN_KEY = "auth_token";

export function GetAuthToken() {
    return localStorage.getItem(AUTH_TOKEN_KEY);
}

export function SetAuthToken(value) {
    localStorage.setItem(AUTH_TOKEN_KEY, value);
}

export function RemoveAuthToken() {
    localStorage.removeItem(AUTH_TOKEN_KEY);
}