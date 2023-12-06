import axios from 'axios';

const ApiManager = axios.create({
    baseURL: "https://englephant.vercel.app/api", //10.0.2.2 is local host for mobile
    responseType: 'json',
    withCredentials: true,
});

export default ApiManager;