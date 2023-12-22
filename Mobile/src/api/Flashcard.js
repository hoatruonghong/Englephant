import axios from 'axios';

const unlockCardDefault = async (params) => {
    try {
        console.log('https://englephant.vercel.app/api/card/learner/'+params.learnerId);
        const res = await axios.post('https://englephant.vercel.app/api/card/learner/'+params.learnerId, {
            "cards": [
                "656d7e8d1b65b53883de9498",
                "656d7f681b65b53883de9499",
                "656d804c1b65b53883de949a",
                "656d81fb1b65b53883de949b",
                "656d82a11b65b53883de949c",
                "656d83041b65b53883de949d",
                "656d83631b65b53883de949e",
                "656d83e91b65b53883de949f",
                "656d84601b65b53883de94a0"        
            ],
            "nodeId": "65279ee58b2b3620d82c969f"
        });
        console.log("loggg", res.data);
        return true
    } catch (error) {
        return error.response;        
    }
}

module.exports = {
    unlockCardDefault
}