import React, { useContext } from "react";
import { AuthContext } from './../../contexts/AuthContext';
import { Navigate } from "react-router-dom";
// import Spinner from "react-bootstrap/Spinner";

const ProtectedRoute = (element) => {
    const {
        authState: { isAuthenticated },
    } = useContext(AuthContext);

    // if (authLoading) {
    //     return <Spinner animation="border" />
    // }
    if (isAuthenticated) return element.directTo;
    else return <Navigate to='/login'/>
}

export default ProtectedRoute