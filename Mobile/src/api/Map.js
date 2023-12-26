import axios from 'axios';

const unlockMapDefault = async (params) => {
    try {
        console.log('https://englephant.vercel.app/api/map/unlock/'+params.learnerId+"/1");
        const r1 = await axios.post('https://englephant.vercel.app/api/map/unlock/'+params.learnerId+"/1");
        const r2 = await axios.post('https://englephant.vercel.app/api/map/unlock/'+params.learnerId+"/2");
        return true
    } catch (error) {
        return error.response;        
    }
}

module.exports = {
    unlockMapDefault
}