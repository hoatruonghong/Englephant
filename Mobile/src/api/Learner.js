import axios from 'axios';
import { host } from './ApiManager';

const update = async (params) => {
    try {
        console.log('heeee',params);
        const result = await axios.put('https://englephant.vercel.app/api/learner/'+params.id, {
            fullname: params.fullname,
            phone: params.password,
            email: params.email,
            gender: params.gender,
            bornYear: params.bornYear,
        });
        return result;
    } catch (error) {
        return error.response;        
    }
}

const getInfo = async (params) => {
    try {
        const result = await axios.get('https://englephant.vercel.app/api/learner/'+params.id);
        return result;
    } catch (error) {
        return error.response;        
    }
}

const getMoreTime = async (params) => {
    try {
        const result = await axios.put(`${host}/api/exchangetable/exchange-item`, {
            type: 'peanut2time',
            from: params.peanut,
            to: params.time,
            learnerId: params.learnerId,
        });
        console.log("loggg", result);
        return result;        
    } catch (error) {
        console.log(error);
        return error.response;
    }
}
const getMorePeanut = async (params) => {
    try {
        const result = await axios.put('https://englephant.vercel.app/api/exchangetable/exchange-item', {
            type: 'price2peanut',
            from: params.price,
            to: params.peanut,
            learnerId: params.learnerId,
        });
        return result;        
    } catch (error) {
        console.log(error);
        return error.response;
    }
}

const getItem = async (params) => {
    try {
        const result = await axios.get(`${host}/api/learner/item/`+params.id);
        console.log(result.data);
        return result;
    } catch (error) {
        return error.response;        
    }
}

module.exports = {
    getInfo, update, getMorePeanut, getMoreTime, getItem
}