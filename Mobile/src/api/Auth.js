import axios from 'axios';

const login = async (params) => {
    try {
        const result = await axios.post('http://192.168.1.81:5000/api/auth/login', {
            username: params.username,
            password: params.password
        });
        return result;
    } catch (error) {
        return error.response;        
    }
}

const register = async (params) => {
    try {
        const result = await axios.post('http://192.168.1.81:5000/api/auth/register', {
            username: params.username,
            password: params.password,
            phone: params.phone,
            fullname: params.fullname,
            mode: params.mode,
            gender:params.gender,
            targetTime: params.targetTime
        });
        return result;
    } catch (error) {
        console.log(error.response);
        return error.response;        
    }
}

module.exports = {
    login, register
}