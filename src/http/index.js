export const API_BASE_URL = 'http://localhost:8080';
export const ACCESS_TOKEN = 'accessToken';

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true"
    })
    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN));
    }
    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);
    return fetch(options.url, options)
        .then(response =>
            response.json().then(json => {
                if(!response.ok) {
                    return Promise.reject(json);
                }
                return json;
            })
        );
}
export function getCurrentUser() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/user/me",
        method: 'GET',
    });
}

export function login(loginRequest) {
    return request({
        url: API_BASE_URL + "/auth/login",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function signup(signupRequest) {
    return request({
        url: API_BASE_URL + "/auth/signup",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

export function orders() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    return request({
        url: API_BASE_URL + "/orders",
        method: 'GET',
    });
}

export function employees() {
    if(!isTokenExist()) {
        return Promise.reject("No access token set.");
    }
    return request({
        url: API_BASE_URL + "/employees",
        method: 'GET',
    });
}

export function addUser(addRequest) {
    return request({
        url: API_BASE_URL + "/auth/signup/manager",
        method: 'POST',
        body: JSON.stringify(addRequest)
    });
}

export function putUser(signupRequest, id) {
    console.log("Here")
    console.log(signupRequest)
    console.log(id)
    return request({
        url: API_BASE_URL + `/users/${id}`,
        method: 'PUT',
        body: JSON.stringify(signupRequest)
    });
}

function isTokenExist() {
    return localStorage.getItem(ACCESS_TOKEN);
}