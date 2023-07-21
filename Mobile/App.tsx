import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import Login from './src/screens/Login/Login';
import ForgetPassword from './src/screens/Login/ForgetPassword1';
import ChangePassword from './src/screens/Login/ChangePassword';
import Signin from './src/screens/Signin/Signin1';

function App(): JSX.Element {
  return (
    <Login/>
    //<ForgetPassword/>
    //<ChangePassword/>
    //<Signin/>
  );
}


export default App;
