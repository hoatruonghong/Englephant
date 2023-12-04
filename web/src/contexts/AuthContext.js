import React, { createContext, useReducer, useEffect } from 'react'
import { authReducer } from "./../reducers/authReducer";
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from './constants';
import axios from "axios";
import setAuthToken from './../utils/setAuthToken';

export const AuthContext = createContext()

const AuthContextProvider = ({children}) => {
    const [authState, dispatch] = useReducer(authReducer, {
        authLoading: true,
        isAuthenticated: false,
        user: null
    })
    // Authenticate user
    const loadUser = async () => {
        // console.log("local storage",localStorage[LOCAL_STORAGE_TOKEN_NAME]);
		if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
			setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME])
		}

		try {
			const response = await axios.get(`${apiUrl}/auth`)
            console.log("response  ",response.data);
			if (response.data.success) {
				dispatch({
					type: 'SET_AUTH',
					payload: { isAuthenticated: true, user: response.data.user }
				})
			}
		} catch (error) {
			localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
			setAuthToken(null)
			dispatch({
				type: 'SET_AUTH',
				payload: { isAuthenticated: false, user: null }
			})
		}
	}
    useEffect(() => {
        loadUser()
      }, []);

    // Login
    const loginUser = async loginForm => {
        try {
            const res = await axios.post(`${apiUrl}/auth/login`, loginForm)
            if (res.data.success) {
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, res.data.data.response.accessToken)
                await loadUser()
            }
            return res.data
        } catch (error) {
            if (error.response.data) return error.response.data
            else return {success: false, message: error.message}
        }
    }

    // Context data
    const authContextData = {loginUser, authState}

    // Return provider
    return (
        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthContextProvider