import React, { useContext } from 'react';
import type {PropsWithChildren} from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Login from './screens/Login/Login';
import ForgetPassword from './screens/Login/ForgetPassword1';
import ChangePassword from './screens/Login/ChangePassword';
import Signin from './screens/Signin/Signin1';

// import PronunciationAssess from "./screens/pronunciationAssessment/PronunciationAssess";
import SetGoal from './screens/Signin/Signin3';
import Signin2 from './screens/Signin/Signin2';
import Warmup from './screens/Learning/Warmup';

import Account from './screens/Setting/Account';
import Setting from './screens/Setting/Setting';
import Notification from './screens/Setting/Notification';
import UserInfo from './screens/Setting/UserInfo';
import ForgetPasswordOTP from './screens/Login/ForgetPassword2';

import LoginProvider from './context/LoginProvider';
import { useLogin } from './context/LoginProvider';
import ExerciseMain from './screens/Exercise/ExerciseMain';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
        screenOptions={{ headerShown: false }} >
      <Tab.Screen name="Exercise" component={ExerciseScreens} />
      <Tab.Screen name="Me" component={AccountScreens} />
      <Tab.Screen name="Warmup" component={Warmup} />
    </Tab.Navigator>
  );
}

function ExerciseScreens() {
  return (
    <Stack.Navigator      
      screenOptions={{ headerShown: false }} >
      <Stack.Screen name="ExerciseMain" component={ExerciseMain} />

    </Stack.Navigator>    
  )
}

function AccountScreens() {
  return (
    <Stack.Navigator      
      screenOptions={{ headerShown: false }} >
      <Stack.Screen name="Account" component={Account} />
      <Stack.Screen name="UserInfo" component={UserInfo} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="Setting" component={Setting} />
    </Stack.Navigator>    
  )
}

function AuthScreens() {
  return (
    <Stack.Navigator      
      screenOptions={{ headerShown: false }} >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
      <Stack.Screen name="ForgetPasswordOTP" component={ForgetPasswordOTP} />
      <Stack.Screen name="Signin" component={Signin} />
      <Stack.Screen name="Signin2" component={Signin2} />
      <Stack.Screen name="SetGoal" component={SetGoal} />
      <Stack.Screen name="Warmup" component={Warmup} />

    </Stack.Navigator>    
  );
}

const MainNavigator = () => {
    const { isLoggedIn } = useLogin();
    return isLoggedIn ? <MyTabs /> : <AuthScreens />;
}

export default MainNavigator;