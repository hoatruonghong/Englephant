import express from "express"
const userRouter = express.Router();

import { sendError, sendServerError, sendSuccess } from "../helper/client.js"
import { verifyToken} from '../middleware/index.js'

import User from "../models/user.js";

/**
 * @route GET /api/user
 * @description get user
 * @access public
 */
userRouter.get('/', async (req, res) => {
    try {
        const users = await User.find();
        if (users) return sendSuccess(res, "Get user successfully.", users);
        return sendError(res, "Information not found.");
        
    } catch (error) {
        console.log(error);
        return sendServerError(res);  
    }
})

/**
* @route GET /api/user/:id
* @description get about information by id
* @access public
*/
userRouter.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id, {password: false})

        if (user) return sendSuccess(res, "Get user successfully.", user)
        return sendError(res, "No information found.")
    } catch (error) {
        console.log(error)
        return sendServerError(res)
    }
})

export default userRouter
