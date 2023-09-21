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
import SetGoal from './src/screens/Signin/Signin3';
import Signin2 from './src/screens/Signin/Signin2';
import Account from './src/screens/Setting/Account';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  const {height, width, scale, fontScale} = useWindowDimensions();
  return (
    <NavigationContainer>
      <Stack.Navigator      
        screenOptions={{
          headerShown: false
        }} >
        <Stack.Screen name="Login" component={Login}    />
        <Stack.Screen  name="Signin" component={Signin}  />
        <Stack.Screen name="Account" component={Account}  />

      </Stack.Navigator>

    </NavigationContainer>
    //<ForgetPassword/>
    //<ChangePassword/>
    // <SetGoal/>

    //<Warmup height = {height} width = {width} scale={scale} fontScale={fontScale}/>
  );
}


export default App;
