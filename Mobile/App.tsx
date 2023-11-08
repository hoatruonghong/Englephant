import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import MainNavigator from './src/MainNavigator';
import LoginProvider from './src/context/LoginProvider';
import Quiz from './src/screens/Quiz/LRQuiz';

export default function App() {
  return (
    <LoginProvider>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </LoginProvider>
  );
}