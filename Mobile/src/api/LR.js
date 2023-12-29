import axios from 'axios';

const unlockLRLessonDefault = async (params) => {
    try {
        console.log('https://englephant.vercel.app/api/lr/first-lesson/'+params.learnerId);
        const res = await axios.post('https://englephant.vercel.app/lr/first-lesson/'+params.learnerId);
        console.log(res.data);
        return true
    } catch (error) {
        return error.response;        
    }
}

module.exports = {
    unlockLRLessonDefault
}