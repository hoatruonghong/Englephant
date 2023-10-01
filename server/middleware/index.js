import jwt from "jsonwebtoken"
import { sendError, sendServerError, sendSuccess } from "../helper/client.js"

/**
 * header contain
 * Authorised : Bearer token
 */
export const verifyToken = async (req, res, next) => {
    try {
        const data = req.headers['authorization']
        const token = data?.split(" ")[1];
        if(!token) return sendError(res, 'jwt must be provided.', 401)

        if(token in TOKEN_LIST || token in TOKEN_BLACKLIST)
            return sendError(res, "Unauthorized.", 401)
        
        const { payload } = jwt.verify(token, process.env.JWT_SECRET_KEY, {
            complete: true
        })
        
        if(!payload.user) return sendError(res, "Unauthorized.", 401)

        req.verifyToken = token
        req.user = payload.user
        next()

    } catch (error) {
        return sendError(res, 'jwt expired.', 401)
    }
}

export const verifyAdmin = async (req, res, next) => {
    if (req.user.role !== 'admin')
        return sendError(res, 'Forbidden.',403)
    next()    
}

export const verifyLearner = async (req, res, next) => {
    if (req.user.role !== 'learner')
        return sendError(res, 'Forbidden.',403)
    next()    
}

export const verifyTutor = async (req, res, next) => {
    if (req.user.role !== 'tutor')
        return sendError(res, 'Forbidden.', 403)
    next()
}