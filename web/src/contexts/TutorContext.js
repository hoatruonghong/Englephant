import React, { createContext, useReducer } from 'react'
import { tutorReducer } from "./../reducers/tutorReducer";
import { apiUrl } from './constants';
import axios from "axios";

export const TutorContext = createContext()

const TutorContextProvider = ({children}) => {
    // State
    const [ tutorState, dispatch ] = useReducer({
        tutors: [],
        tutorsLoading: true
    })

    // Get all tutors
    const getTutors = async () => {
        try {
            const response = await axios.get(`${apiUrl}/tutor`)
            if (response.data.success) {
                dispatch({type: "TUTORS_LOADED_SUCCESS", payload: response.data.data})
            }
        } catch (error) {
            return error.response.data ? error.response.data : {success: false, message: "server error"}
        }
    }

    // Tutor context data
    const tutorContextData = { getTutors }

    return (
        <TutorContext.Provider value={tutorContextData}>
            {children}
        </TutorContext.Provider>
    )
}

export default TutorContextProvider