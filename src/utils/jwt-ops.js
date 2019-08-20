import jwtDecode from "jwt-decode";
import {api} from './api';

const jwtKey = "jwt";

export function setDefaultAuthHeader(jwtToken){
    api.defaults.headers.common["Authorization"] = jwtToken;
}

export function saveJwtToken(data){
    localStorage.setItem(jwtKey, data);
}

export function deleteJwtToken(){
    localStorage.removeItem(jwtKey);
}

export function getJwtToken(){
    return localStorage.getItem(jwtKey);
}

export function decodeJwt(jwtToken){
    return jwtDecode(jwtToken);
}

export function isTokenExpired(exp){
    const currentTime =Date.now() / 1000;
    return exp < currentTime;
}