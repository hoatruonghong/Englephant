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
			const response = await axios.get(`${apiUrl}/tutor/account/auth`)
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
            console.log(`${apiUrl}/tutor/account/login`, loginForm);
            const res = await axios.post(`${apiUrl}/tutor/account/login`, loginForm)
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

    // Update
    const updateUser = async updateForm => {
        try {
            console.log(`${apiUrl}/tutor/account/${authState.user._id}`, updateForm);
            const res = await axios.put(`${apiUrl}/tutor/account/${authState.user._id}`, updateForm)
            if (res.data.success) {
                // localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, res.data.data.response.accessToken)
                await loadUser()
            }
            return res.data
        } catch (error) {
            if (error.response.data) return error.response.data
            else return {success: false, message: error.message}
        }
    }

    // Logout
    const logoutUser = () => {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
        dispatch({
            type: 'SET_AUTH',
            payload: { isAuthenticated: false, user: null }
        })
    }

    // Context data
    const authContextData = {loginUser, authState, logoutUser, updateUser}

    // Return provider
    return (
        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthContextProvider