import React, { useContext, useState } from 'react';
import type {PropsWithChildren} from 'react';
import {useWindowDimensions} from 'react-native';
import axios from 'axios';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//for UI
import colors from '../assets/colors';
import { FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBook, faBookOpen, faDumbbell, faUser } from '@fortawesome/free-solid-svg-icons';

library.add(faBook);
library.add(faBookOpen);
library.add(faDumbbell);
library.add(faUser);

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

//Import screens
import ExerciseMain from './screens/Exercise/ExerciseMain';
import MapSelecting from './screens/Learning/MapSelecting';
import FamilyMap from './screens/Learning/Maps/FamilyMap';
import FruitMap from './screens/Learning/Maps/FruitMap';
import SchoolMap from './screens/Learning/Maps/SchoolMap';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={
        { 
          headerShown: false, 
          tabBarActiveTintColor: colors.shadow_gray_brown, 
          tabBarInactiveTintColor: colors.bright_gray_brown,
          tabBarShowLabel: false,
          tabBarStyle: {height: "8%", borderTopWidth: 2, borderColor: colors.bright_gray_brown},
        }
      }>
      <Tab.Screen 
        name="Learning" 
        component={LearningScreens} 
        options={{
          tabBarIcon: ({color}) => (
            <FontAwesomeIcon icon={faBookOpen} color={color} size={24}/>
          )
        }}/>
      <Tab.Screen 
        name="Exercise" 
        component={ExerciseScreens} 
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon icon={faDumbbell} color={color} size={24}/>
          )
        }}/>
      <Tab.Screen 
        name="Archive" 
        component={ArchiveScreens} 
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon icon={faBook} color={color} size={24}/>
          )
        }}/>
      <Tab.Screen 
        name="Me" 
        component={AccountScreens} 
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon icon={faUser} color={color} size={24}/>
          )
        }}/>
    </Tab.Navigator>
  );
}

function LearningScreens() {
  return (
    <Stack.Navigator      
      screenOptions={{ headerShown: false }} >
      <Stack.Screen name="MapSelecting" component={MapSelecting} />
      <Stack.Screen name="1" component={FruitMap}/>
      <Stack.Screen name="2" component={FamilyMap}/>
      <Stack.Screen name="3" component={SchoolMap}/>
    </Stack.Navigator>    
  )
}

function ExerciseScreens() {
  return (
    <Stack.Navigator      
      screenOptions={{ headerShown: false }} >
      <Stack.Screen name="ExerciseMain" component={ExerciseMain} />

    </Stack.Navigator>    
  )
}

function ArchiveScreens() {
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