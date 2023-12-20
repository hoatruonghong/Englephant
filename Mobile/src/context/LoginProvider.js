import React, { createContext, useContext, useState }  from 'react';

const LoginContext = createContext();

const LoginProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [learnerId, setLearnerId] = useState('6523a83652d8423281c01341');
    const [profile, setProfile] = useState({
        _id:"6523a83652d8423281c01341",    
        username:"TestAccount",
        fullname:"TestAccount",
        phone:"1234567890",
        email:"",
        password:"123456",
        bornYear:"2018",
        defaultmode:"Trẻ em",
        peanut: 0,
        heart: 0,
        bud: 0,
        currentMap: 3,
        gender: "Nam",
        talkroomTime: 20,
        targetTime: 10,
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