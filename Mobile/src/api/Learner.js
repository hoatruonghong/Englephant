import axios from 'axios';

const update = async (params) => {
    try {
        console.log(params);
        const result = await axios.put('http://10.0.2.2:5000/api/learner/'+params.id, {
            fullname: params.fullname,
            phone: params.password,
            email: params.email,
        });
        return result;
    } catch (error) {
        return error.response;        
    }
}

const getInfo = async (params) => {
    try {
        const result = await axios.get('http://10.0.2.2:5000/api/learner/'+params.id);
        return result;
    } catch (error) {
        return error.response;        
    }
}

module.exports = {
    getInfo, update
}