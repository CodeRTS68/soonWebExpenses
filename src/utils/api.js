import axios from 'axios';

export const api = axios.create({
    baseURL: "https://intense-springs-88456.herokuapp.com/"
});