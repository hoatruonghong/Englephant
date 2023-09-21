import express from "express"
const userRouter = express.Router();

import { sendError, sendServerError, sendSuccess } from "../helper/client.js"
import User from "../models/user.js";

/**
 * @route GET /api/user
 * @description get user
 * @access public
 */
userRouter.get('/', async (req, res) => {
    try {
        const users = await User.find();
        return sendSuccess(users, "Get all users successfully");
        
    } catch (error) {
        console.log(error);
        return sendServerError(res);  
    }
})






export default userRouter
