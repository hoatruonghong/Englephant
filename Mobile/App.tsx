/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import Login from "./navigation/screen/login/Login";
import MainContainer from "./navigation/MainContainer";

function App(): JSX.Element {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    if (isLoggedIn) return <MainContainer />;
    else return <Login setIsLoggedIn={setIsLoggedIn} />;
}

export default App;
