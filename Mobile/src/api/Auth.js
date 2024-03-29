import axios from 'axios';

const login = async (params) => {
    try {
        console.log("params",params);
        const result = await axios.post('https://englephant.vercel.app/api/auth/login', {
            username: params.username,
            password: params.password
        });
        console.log(result.data);
        return result;
    } catch (error) {
        console.log(error);
        return error.response;        
    }
}

const register = async (params) => {
    try {
        console.log("parram", params);
        const result = await axios.post('https://englephant.vercel.app/api/auth/register', {
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
        console.log(error);
        return error.response;        
    }
}

module.exports = {
    login, register
}