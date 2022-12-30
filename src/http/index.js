export const API_BASE_URL = 'http://localhost:8080';
export const ACCESS_TOKEN = 'accessToken';
export const BASE_URL_THINGS_SPEAK = "https://api.thingspeak.com/"
export const API_KEY_READ = "0ASNPTOU1P7D8KQQ";
export const IP_THINGS_SPEAK = 1966150;
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



const requestWithNoAnswer = (options) =>{
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
            {
                if(response.ok){
                    return response.ok;
                }
                else return response.json();
            }
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


export function addTask(taskRequest,idEmployee) {
    return request({
        url: API_BASE_URL + `/employees/${idEmployee}/task`,
        method: 'POST',
        body: JSON.stringify(taskRequest)
    });
}

export function deleteEmployee(idEmployee) {
    return requestWithNoAnswer({
        url: API_BASE_URL + `/employees/${idEmployee}`,
        method: 'DELETE',
    });
}


export function signup(signupRequest) {
    return request({
        url: API_BASE_URL + "/auth/signup",
        method: 'POST',
        body: JSON.stringify(signupRequest)
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

export function getTaskEmployee(idEmployee) {
    return request({
        url: API_BASE_URL + `/employees/${idEmployee}/task`,
        method: 'GET',
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

export const getTemperatureForChart = async () => {
    const response = await fetch(`${BASE_URL_THINGS_SPEAK}channels/${IP_THINGS_SPEAK}/fields/1.json?api_key=${API_KEY_READ}&results=100`, {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json'
        }});

    const body = await response.json();
    const res = body.feeds;
    console.log(res)
    return res;
}