import axios from 'axios';

const ApiManager = axios.create({
    baseURL: "http://10.0.2.2:5000/api", //10.0.2.2 is local host for mobile
    responseType: 'json',
    withCredentials: true,
});

export default ApiManager;