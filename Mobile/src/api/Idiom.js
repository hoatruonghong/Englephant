import axios from 'axios';

const loadRandom = async () => {
    try {
        const result = await axios.get('http://10.0.2.2:5000/api/idiom/random');
        return result;
    } catch (error) {
        return error.response;        
    }
}

module.exports = {
    loadRandom
}