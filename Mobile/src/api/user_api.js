
import ApiManager from './ApiManager';

export const user_login = async data => {
    try {
        console.log("checkkk");
        const result = await ApiManager("/auth/login", {
            method:"POST",
            headers:{
                'content-type': "application/json"
            },
            data: data
        });
        console.log('user_login', result);
        return result;
    } catch (error) {
        return error.response;
    }
};
