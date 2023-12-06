import axios from 'axios';

const loadRandom = async () => {
    try {
        const result = await axios.get('https://englephant.vercel.app/api/idiom/random');
        return result;
    } catch (error) {
        return error.response;        
    }
}

module.exports = {
    loadRandom
}