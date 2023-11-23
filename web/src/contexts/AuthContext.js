import React from 'react'
import { createContext, useReducer } from "React";
import { authReducer } from "./../reducers/authReducer";
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from './constants';
import axios from "axios";

export const AuthContext = createContext()

const AuthContextProvider = ({children}) => {
    const [authState, dispatch] = useReducer(authReducer, {
        authLoading: true,
        isAuthenticated: false,
        user: null
    })

    // Login
    const loginUser = async loginForm => {
        try {
            const res = await axios.post(`${apiUrl}/auth/login`, loginForm)
            if (res.data.success) {
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, res.data.access_token)
            }
            return res.data
        } catch (error) {
            if (error.response.data) return error.response.data
            else return {success: false, message: error.message}
        }
    }

    // Context data
    const authContextData = {loginUser}

    // Return provider
    return (
        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthContextProvider