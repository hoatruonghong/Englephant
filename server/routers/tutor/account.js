import express from "express"
import jwt from "jsonwebtoken"
import argon2 from "argon2"
const router = express.Router();

import { sendError, sendServerError, sendSuccess } from "../../helper/client.js"
import { verifyToken} from '../../middleware/index.js'
import { tutorRegisterValidate } from "../../validation/auth.js"

import Tutor from "../../models/tutor.js";

/**
 * @route GET /api/tutor/account/
 * @description tutor load their account information (use payload in header without tutorid)
 * @access public
 */
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const tutor = await Tutor.findById(id).select("-password");

        if (tutor) return sendSuccess(res, "Get user successfully.", tutor);
        return sendError(res, "Information not found.");
        
    } catch (error) {
        console.log(error);
        return sendServerError(res);  
    }
});

/**
 * @route PUT /api/tutor/account/change-password
 * @description tutor update tutor information
 * @access public
 */
router.put('/change-password/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { oldPassword, newPassword } = req.body

        const tutor = await Tutor.findById(id)
        if (tutor) {
            const passwordValid = await argon2.verify(tutor.password, oldPassword)
            if (!passwordValid) return sendError(res, 'current password is wrong')
        }
        else return sendError(res, 'tutor not exists')

        const password = await argon2.hash(newPassword)

        await Tutor.findByIdAndUpdate(id, {password: password});
        return sendSuccess(res, "Change password successfully.");        
    } catch (error) {
        console.log(error);
        return sendServerError(res);  
    }
});

/**
 * @route PUT /api/tutor/account/:id
 * @description tutor update tutor information
 * @access public
 */
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { fullname, email, phone } = req.body

        const tutor = await Tutor.findById(id)
        if (!tutor) sendError(res, "Information not found.");

        await Tutor.findByIdAndUpdate(id, {phone: phone, email: email, fullname: fullname});
        return sendSuccess(res, "Update account information successfully.", { fullname, phone, email });        
    } catch (error) {
        console.log(error);
        return sendServerError(res);  
    }
});

export default router
