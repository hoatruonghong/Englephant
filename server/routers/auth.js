import express from "express"
import jwt from "jsonwebtoken"
import argon2 from "argon2"

import User from "../models/user.js"
import { sendError, sendServerError, sendSuccess} from "../helper/client.js"
import { learnerRegisterValidate, userLoginValidate } from "../validation/auth.js"
import { verifyToken} from '../middleware/index.js'

const authRouter = express.Router()

/**
 * @route POST /api/auth/register
 * @description learner registers
 * @access public
 */
authRouter.post('/register', async (req, res) => {
    const errors = learnerRegisterValidate(req.body)
    if (errors) return sendError(res, errors)
    let {username, email, phone, password} = req.body 

    try {
        const isExistUser = await User.exists({
            $or: [
                { email, phone},
                { email, phone: null },
                { phone, email: null }
            ]
        })
        if (isExistUser) return sendError(res, "User already exists!")

        // const otp = generateOTP()

        password = await argon2.hash(password)

        // req.session.register = JSON.stringify({
        //     username, email, password, phone
        // })
        const user = await User.create({username, email, phone, password})
        return sendSuccess(res, "Register successfully")

    } catch (error) {
        console.log(error);
        return sendServerError(res);   
    }
})

/**
 * @route POST /api/auth/login
 * @description learner login
 * @access public
 */
authRouter.post('/login', async (req, res) => {
    const errors = userLoginValidate(req.body)
    if (errors) return sendError(res, errors)
    let {username, password} = req.body 
    try {
        let user = await User.findOne({
            username
        })
        let successLogin = true 
        if (user) {
            const passwordValid = await argon2.verify(user.password, password)
            if (!passwordValid) successLogin = false
        }
        else return sendError(res, 'user not exists')
        if (!successLogin) return sendError(res, 'password is wrong')
        const userData = {
            id: user._id,
            username: username,
            email: user.email,
            phone: user.phone,
            mode: user.defaultMode
        }
        const accessToken = jwt.sign(
            {user: userData},
            process.env.JWT_SECRET_KEY,
            {expiresIn: '30s'}
        )

        const refreshToken = jwt.sign(
            {user: userData},
            process.env.JWT_REFRESH_SECRET_KEY,
            {expiresIn: '1h'}
        )

        const response = {
            accessToken,
            refreshToken
        }

        return sendSuccess(res, 'Login successfully.', {
            response,
            user: userData
        })

    } catch (error) {
        console.log(error);
        return sendServerError(res);  
    }
})

/**
 * @route POST /api/auth/logout
 * @description user log out
 * @access private
 */
authRouter.post('/logout', verifyToken, async (req, res) => {
    const { refreshToken } = req.body
    if (refreshToken in TOKEN_LIST)
        delete TOKEN_LIST[refreshToken]
    else return sendError(res, 'refresh token is invalid.', 401)
    try {
        jwt.verify(req.verifyToken, process.env.JWT_SECRET_KEY, {
            complete: true
        })
        TOKEN_BLACKLIST[req.verifyToken] = req.verifyToken
        clearTokenList(TOKEN_BLACKLIST)
    } catch (error) { }
    return sendSuccess(res, 'log out successfully.')
})

export default authRouter