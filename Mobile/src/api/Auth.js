import axios from 'axios';

const login = async (params) => {
    try {
        const result = await axios.post('http://10.0.2.2:5000/api/auth/login', {
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
        const result = await axios.post('http://10.0.2.2:5000/api/auth/register', {
            username: params.username,
            password: params.password,
            phone: params.phone,
        });
        return result;
    } catch (error) {
        return error.response;        
    }
}

module.exports = {
    login
}