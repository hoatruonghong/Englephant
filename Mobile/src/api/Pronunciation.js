import axios from 'axios';

const unlockPLessonDefault = async (params) => {
    try {
        console.log('https://englephant.vercel.app/api/pronunciation/all-lessons/'+params.learnerId);
        const res = await axios.post('https://englephant.vercel.app/pronunciation/all-lessons/'+params.learnerId);
        console.log(res.data);
        return true
    } catch (error) {
        return error.response;        
    }
}

module.exports = {
    unlockPLessonDefault
}