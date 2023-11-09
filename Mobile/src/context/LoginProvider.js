import React, { createContext, useContext, useState }  from 'react';

const LoginContext = createContext();

const LoginProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [learnerId, setLearnerId] = useState('');
    const [profile, setProfile] = useState({
        id:"6523a83652d8423281c01341",    
        username:"TestAccount",
        fullname:"TestAccount",
        password:"123456",
        bornYear:"2018",
        mode:"Trẻ em",
        peanut: 0,
        heart: 0,
        bud: 0
    });

    return(
        <LoginContext.Provider 
            value={{isLoggedIn, setIsLoggedIn, profile, setProfile, learnerId, setLearnerId}}
        >
            {children}
        </LoginContext.Provider>

    );
};

export const useLogin = () => useContext(LoginContext);

export default LoginProvider;