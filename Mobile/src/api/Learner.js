import axios from 'axios';

const update = async (params) => {
    try {
        console.log('heeee',params);
        const result = await axios.put('http://192.168.1.81:5000/api/learner/'+params.id, {
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
        const result = await axios.get('http://192.168.1.81:5000/api/learner/'+params.id);
        return result;
    } catch (error) {
        return error.response;        
    }
}

module.exports = {
    getInfo, update
}