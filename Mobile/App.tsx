/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { View, Text, Button, Image } from 'react-native';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator  } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

import {Login} from './navigation/screen/login/Login';
import {LandingScreen} from './navigation/screen/home/Landing';
import {HomeScreen} from './navigation/screen/home/Home';


const switchNavigator = createSwitchNavigator({
  landingStack: {
    screen: createStackNavigator(
    {
      LoginPage: Login,
    },
    {
      defaultNavigationOptions: {
        headerShown: false,
      }
    }
    )
  },
  homeStack: createBottomTabNavigator({
    //home tab icon
    home: {
      screen: createStackNavigator(
        {
        HomePage: HomeScreen,
        MapPage: LandingScreen
        }, 
        {
          defaultNavigationOptions: {
            headerShown: false,
          },
        }
      ),
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => {
          let icon =
            focused == true
              ? require("./assets/images/FontAwesome - Icons.png")
              : require("./assets/images/FontAwesome - Icons.png");
          return <Image source={icon} />;
        },
      },
    },

    exercise: {
      screen: createStackNavigator(
        {ExercisePage: HomeScreen}
      ),
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => {
          let icon =
            focused == true
              ? require("./assets/images/FontAwesome - Icons.png")
              : require("./assets/images/FontAwesome - Icons.png");
          return <Image source={icon} />;
        },
      },
    }
  })
})

const AppNavigation = createAppContainer(switchNavigator);

function App(): JSX.Element {
  return <AppNavigation />;
}

export default App;
