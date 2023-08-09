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
  useWindowDimensions
} from 'react-native';
import Login from './src/screens/Login/Login';
import ForgetPassword from './src/screens/Login/ForgetPassword1';
import ChangePassword from './src/screens/Login/ChangePassword';
import Signin from './src/screens/Signin/Signin1';

import PronunciationAssess from "./navigation/pronunciationAssessment/PronunciationAssess";
import Warmup from './navigation/learning/Warmup';

function App(): JSX.Element {
  const {height, width, scale, fontScale} = useWindowDimensions();
  return (
    //<Login/>
    //<ForgetPassword/>
    //<ChangePassword/>
    //<Signin/>
    <Warmup height = {height} width = {width} scale={scale} fontScale={fontScale}/>
  );
}


export default App;
