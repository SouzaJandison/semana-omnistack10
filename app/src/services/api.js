import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.0.25:8000', //IP doexpo e porta ligada do backend
});

export default api;