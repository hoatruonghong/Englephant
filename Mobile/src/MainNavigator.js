import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet, useWindowDimensions, Text } from 'react-native';
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
import TalkRoom from './screens/Exercise/TalkRoom';
import ListenRead from './screens/Exercise/ListenRead';
import Pronunciation from './screens/Exercise/Pronunciation';
import LearningQuiz from './screens/Quiz/LearningQuiz';
import PracticeQuiz from './screens/Quiz/PracticeQuiz';
import Flashcard from './screens/Learning/Flashcard';
import FlashcardDetails from './screens/Learning/FlashcardDetails';
import Relax from './screens/Learning/Relax';
import Sum from './screens/Learning/Sum';
import LRQuiz from './screens/Quiz/LRQuiz';
import {HeaderBar} from './components/HeaderBar';
import LRLesson from './screens/Exercise/LRLesson';
import PLesson from './screens/Exercise/PLesson';
import PronunciationQuiz from './screens/Quiz/PronunciationQuiz';
import ArchiveScreen from './screens/Archive/ArchiveScreen';
import TutorRoom from './screens/Exercise/TutorRoom';
import Wardrobe from './screens/Setting/Wardrobe';
import TimeCounter from './components/TimeCounter';
import Auth from './api/Auth';
import Done from './screens/Learning/Done';
import RevisionNode from './screens/Learning/RevisionNode';
import Welcome from './screens/Onboarding/Welcome';
import LearnMap from './screens/Onboarding/LearnMap';
import Room from './screens/Exercise/Room';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      detachInactiveScreens={false}
      screenOptions={
        { 
          headerShown: false, 
          tabBarActiveTintColor: colors.shadow_gray_brown, 
          tabBarInactiveTintColor: colors.bright_gray_brown,
          tabBarShowLabel: false,
          tabBarStyle: {height: "8%", borderTopWidth: 2, borderColor: colors.bright_gray_brown},
          unmountOnBlur: true
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
        name="ArchiveCollection" 
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
  const {profile, learnerId} = useLogin();
  const [heart, setHeart] = useState(0);
  const [peanut, setPeanut] = useState(0);

  useEffect(() => {
    uri = 'https://englephant.vercel.app/api/learner/'+learnerId;
    const learner = axios.get(uri)
    .then(function (res) {
      setHeart(res.data.data.heart);
      setPeanut(res.data.data.peanut);
    })
    .catch(function (error) {
        console.log(error);
    });
  })

  return (
    <Stack.Navigator screenOptions={styles.headerWrap} initialRouteName='MapSelecting'>
      <Stack.Screen name="MapSelecting" component={MapSelecting}
        options={{
          headerTitle : () => {return (<HeaderBar items={[{name:"heart", num:heart}, {name:"peanut", num:peanut}]}/>)},
        }}
      />
      <Stack.Screen name="2" component={FamilyMap}
        options={{
          headerBackVisible: false,
          headerTitle : () => {return (<HeaderBar items={[{name:"heart", num:heart}, {name:"peanut", num:peanut}]}/>)},
        }}
      />
      <Stack.Screen name="1" component={FruitMap}
        options={{
          headerBackVisible: false,
          headerTitle : () => {return (<HeaderBar items={[{name:"heart", num:heart}, {name:"peanut", num:peanut}]}/>)},
        }}
      />
      <Stack.Screen name="3" component={SchoolMap}
        options={{
          headerBackVisible: false,
          headerTitle : () => {return (<HeaderBar items={[{name:"heart", num:heart}, {name:"peanut", num:peanut}]}/>)},
        }}      
      />
    </Stack.Navigator>    
  )
}

function ExerciseScreens() {
  const {profile, learnerId} = useLogin();
  const [heart, setHeart] = useState(0);
  const [peanut, setPeanut] = useState(0);

  useEffect(() => {
    uri = 'https://englephant.vercel.app/api/learner/'+learnerId;
    axios.get(uri)
    .then(function (res) {
      setHeart(res.data.data.heart);
      setPeanut(res.data.data.peanut);
    })
    .catch(function (error) {
        console.log(error);
    });
  })

  return (
    <Stack.Navigator screenOptions={styles.headerWrap}>
      <Stack.Screen name="ExerciseMain" component={ExerciseMain}
        options={{
          headerTitle : () => {return (<HeaderBar items={[{name:"heart", num:heart}, {name:"peanut", num:peanut}]}/>)},
        }}
      />
      <Stack.Screen name="ListenRead" component={ListenRead} 
        options={{
          headerTitle: 'Nghe đọc',
        }}
      />
      <Stack.Screen name="Pronunciation" component={Pronunciation} 
        options={{
          headerTitle: 'Phát âm',
        }}
      />
      <Stack.Screen name="TalkRoom" component={TalkRoom}
        options={{
          headerTitle: 'Phòng giao tiếp',
        }}
      />           
    </Stack.Navigator>    
  )
}

function ArchiveScreens() {
  const {profile, learnerId} = useLogin();
  const [heart, setHeart] = useState(profile.heart);
  const [card, setCard] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    axios.get('https://englephant.vercel.app/api/learner/'+learnerId)
    .then(function (res) {
      setHeart(res.data.data.heart);
    })
    .catch(function (error) {
        console.log(error);
    });
    axios.get('https://englephant.vercel.app/api/card/learner/'+learnerId)
    .then(function (res) {
      // console.log(res.data.data);
      setCard(res.data.data);
    })
    .catch(function (error) {
        console.log(error);
    });
  })

  return (
    <Stack.Navigator screenOptions={styles.headerWrap}>
      <Stack.Screen name="Archive" component={ArchiveScreen} 
      options={{
        headerTitle : () => {return (<HeaderBar items={[{name:"heart", num:heart}, {name:"card", num:card, total: total}]}/>)},
      }}/>

    </Stack.Navigator>    
  )
}

function AccountScreens() {
  return (
    <Stack.Navigator      
      screenOptions={{ headerShown: false }} >
      <Stack.Screen name="Account" component={Account} />
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

function StackNavigator(){
  return(
    <Stack.Navigator      
      screenOptions={styles.headerWrap}
    >
      <Stack.Group screenOptions={{headerShown: false}}>
      <Stack.Screen name="MyTabs" component={MyTabs} />
      <Stack.Screen name="Done" component={Done} />
      <Stack.Screen name="RevisionNode" component={RevisionNode} />
      <Stack.Screen name="Sum" component={Sum} />
      <Stack.Screen name="Relax" component={Relax} />
      <Stack.Screen name="Flashcard" component={Flashcard} />
      <Stack.Screen name="FlashcardDetails" component={FlashcardDetails} />
      <Stack.Screen name="Warmup" component={Warmup} />
      <Stack.Screen name="LearningQuiz" component={LearningQuiz} />
      <Stack.Screen name="PracticeQuiz" component={PracticeQuiz} />
      <Stack.Screen name="LRQuiz" component={LRQuiz} />
      <Stack.Screen name="PronunciationQuiz" component={PronunciationQuiz}/>
      <Stack.Screen name="PLesson" component={PLesson} />
      <Stack.Screen name="Welcome" component={Welcome} />
      {/* <Stack.Screen name="FirstMap" component={LearnMap} /> */}
      </Stack.Group>

      <Stack.Screen name="Setting" component={Setting} 
        options={{ headerTitle: 'Cài đặt tài khoản'}} />
      <Stack.Screen name="UserInfo" component={UserInfo} 
        options={{ headerTitle: 'Cập nhật thông tin' }} />
      <Stack.Screen name="Notification" component={Notification} 
        options={{ headerTitle: 'Thông báo' }} />
      <Stack.Screen name="Wardrobe" component={Wardrobe} 
        options={{ headerTitle: 'Tủ đồ' }} />
      <Stack.Screen name="TutorRoom" component={TutorRoom}
        options={{
          headerTitle : () => {return (<TimeCounter time={1200} />)},
        }} />
      <Stack.Screen name="Room" component={Room}
        // options={{
        //   headerTitle : () => {return (<TimeCounter time={1200} />)},
        // }} 
      />
      
      <Stack.Screen name="LRLesson" component={LRLesson}
        options={({ route }) => ({ title: route.params.name })}
      />
    </Stack.Navigator>)
}

const MainNavigator = () => {
    const { isLoggedIn } = useLogin();
    return isLoggedIn ? <StackNavigator /> : <AuthScreens />;
}

const styles = StyleSheet.create({
  headerWrap : {
    headerStyle: {
      height: '8%',
      backgroundColor: colors.dark_green,
      borderBottomWidth: 2, 
      borderColor: colors.bright_gray_brown,
      justifyContent: "center",
    },
    headerTitleStyle: {
      color: colors.white,
      fontSize: 24,
      fontWeight: 'semibold',
    },
    headerTintColor: colors.white,
    headerTitleAlign: 'center',
  },

})

export default MainNavigator;