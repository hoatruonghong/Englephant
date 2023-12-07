import axios from 'axios';

// const update = async (params) => {
//     try {
//         console.log('heeee',params);
//         const result = await axios.put('https://englephant.vercel.app/api/learner/'+params.id, {
//             fullname: params.fullname,
//             phone: params.password,
//             email: params.email,
//             gender: params.gender,
//             bornYear: params.bornYear,
//         });
//         return result;
//     } catch (error) {
//         return error.response;        
//     }
// }

const unlockMapDefault = async (params) => {
    try {
        console.log('https://englephant.vercel.app/api/map/unlock/'+params.learnerId+"/1");
        const r1 = await axios.post('https://englephant.vercel.app/api/map/unlock/'+params.learnerId+"/1");
        const r2 = await axios.post('https://englephant.vercel.app/api/map/unlock/'+params.learnerId+"/2");
        console.log("posttt", r1.data, r2.data);
        return true
    } catch (error) {
        return error.response;        
    }
}

module.exports = {
    unlockMapDefault
}