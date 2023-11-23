import React from 'react'
import './../styles/auth.css'
import {ReactComponent as EnglephantLogo} from './../assets/images/mascot-logo.svg';
import LoginForm from './../components/auth/LoginForm';
import ForgetPassForm from './../components/auth/ForgetPassForm';
import VerifyForm from './../components/auth/VerifyForm';
import ChangePassForm from './../components/auth/ChangePassForm';

const Auth = ({authRoute}) => {
    let body

    body = (
        <>
        {authRoute === "login" && <LoginForm />}
        {authRoute === "forget-password" && <ForgetPassForm />}
        {authRoute === "verify-otp" && <VerifyForm />}
        {authRoute === "change-password" && <ChangePassForm />}
        </>
    )

    return (
        <div className="authContainer">
            <div className="container-fluid">
                <div class="row">                
                    <div class="col-sm-8 logo-image">
                        <EnglephantLogo width={450}/>
                    </div>
                    <div class="col-sm-4">
                        {body}
                    </div>                
                </div>
            </div>
        </div>
    )
}

export default Auth