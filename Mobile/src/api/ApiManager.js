import axios from 'axios';

const ApiManager = axios.create({
    baseURL: "http://192.168.1.81:5000/api", //192.168.1.81 is local host for mobile
    responseType: 'json',
    withCredentials: true,
});

export default ApiManager;