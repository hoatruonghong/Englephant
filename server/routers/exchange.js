import express from "express"
const exchangeRouter = express.Router();

import { sendError, sendServerError, sendSuccess } from "../helper/client.js"
import Exchangetable from "../models/exchangetable.js";
import Learner from "../models/learner.js";

/**
 * @route GET /api/exchangetable/
 * @description query exchange units
 * @access public
 */
exchangeRouter.get('/', async (req, res) => {
    try {
        const units = await Exchangetable.find();

        if (units) return sendSuccess(res, "Get successfully.", units);
        return sendError(res, "Information not found.");
        
    } catch (error) {
        console.log(error);
        return sendServerError(res);  
    }
});

/**
 * @route PUT /api/exchangetable/exchange-item
 * @description update number of bud, heart, peanut, time
 * @access public
 */
exchangeRouter.put('/exchange-item', async (req, res) => {
    try {
        const { type, from, to, learnerId } = req.body

        const learner = await Learner.findById(learnerId)
        if (!learner) return sendError(res, "Information not found.");

        switch (type) {
            case 'price2peanut':
                var newPeanut = learner.peanut + to;
                await Learner.findByIdAndUpdate(learnerId, {peanut: newPeanut})
                return sendSuccess(res, "Update successfully.", { peanut: newPeanut, price: from });
            case 'peanut2time':
                var newPeanut = learner.peanut - from;
                if (newPeanut < 0) return sendError(res, "Not enough peanuts");

                var newTime = learner.talkroomTime + to;
                await Learner.findByIdAndUpdate(learnerId, {peanut: newPeanut, talkroomTime: newTime})
                return sendSuccess(res, "Update successfully.", { peanut: newPeanut, time: newTime });
            default:
                return sendError(res, "Invalid type");
        }       
    
    } catch (error) {
        console.log(error);
        return sendServerError(res);  
    }
});

/**
 * @route PUT /api/exchangetable/add-heart
 * @description update number of heart
 * @access public
 */
exchangeRouter.put('/add-heart', async (req, res) => {
    try {
        const { num, learnerId } = req.body

        const learner = await Learner.findById(learnerId);
        if (!learner) return sendError(res, "Information not found.");
        // if (num < 0)  return sendError(res, "Num must be greater or equal than 0");

        var newHeart = learner.heart + num;
        await Learner.findByIdAndUpdate(learnerId, {heart: newHeart})
        return sendSuccess(res, "Update successfully.", { heart: newHeart });
        
    } catch (error) {
        console.log(error);
        return sendServerError(res);  
    }
});

export default exchangeRouter