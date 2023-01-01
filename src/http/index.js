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

export function addNewEmployee(taskRequest) {
    return request({
        url: API_BASE_URL + `/employees`,
        method: 'POST',
        body: JSON.stringify(taskRequest)
    });
}


export function addNewAnimal(taskRequest) {
    return request({
        url: API_BASE_URL + `/animals`,
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

export function deleteAnimal(idEmployee) {
    return requestWithNoAnswer({
        url: API_BASE_URL + `/animals/${idEmployee}`,
        method: 'DELETE',
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

export function animals() {
    if(!isTokenExist()) {
        return Promise.reject("No access token set.");
    }
    return request({
        url: API_BASE_URL + "/animals",
        method: 'GET',
    });
}


export function getTaskEmployee(idEmployee) {
    return request({
        url: API_BASE_URL + `/employees/${idEmployee}/task`,
        method: 'GET',
    });
}


export function getAnimalHistory(idAnimal) {
    return request({
        url: API_BASE_URL + `/animals/history/${idAnimal}`,
        method: 'GET',
    });
}



function isTokenExist() {
    return localStorage.getItem(ACCESS_TOKEN);
}

