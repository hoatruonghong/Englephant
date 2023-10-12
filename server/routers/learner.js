import express from "express"
const learnerRouter = express.Router();

import { sendError, sendServerError, sendSuccess } from "../helper/client.js"
import { verifyToken} from '../middleware/index.js'

import Learner from "../models/learner.js";

/**
 * @route GET /api/learner/:id
 * @description get learner information
 * @access public
 */
learnerRouter.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const learner = await Learner.findById(id)

        if (learner) return sendSuccess(res, "Get user successfully.", learner);
        return sendError(res, "Information not found.");
        
    } catch (error) {
        console.log(error);
        return sendServerError(res);  
    }
});

/**
 * @route PUT /api/learner/:id
 * @description update learner information
 * @access public
 */
learnerRouter.put('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { username, email, phone } = req.body

        const learner = await Learner.findById(id)
        if (!learner) sendError(res, "Information not found.");

        await Learner.findByIdAndUpdate(id, {phone: phone, email: email, username: username});
        return sendSuccess(res, "Update account information successfully.", { username, phone, email });        
    } catch (error) {
        console.log(error);
        return sendServerError(res);  
    }
});

/**
 * @route DELETE /api/learner/:id
 * @description learner deletes account
 * @access public
 */
learnerRouter.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params

        const learner = await Learner.findById(id)
        if (!learner) return sendError(res, "Information not found.");

        await Learner.deleteOne({_id: id});
        return sendSuccess(res, "Update account information successfully.", learner);        
    } catch (error) {
        console.log(error);
        return sendServerError(res);  
    }
});
export default learnerRouter
