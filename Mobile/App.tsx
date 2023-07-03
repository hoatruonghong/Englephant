/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

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

import PronunciationAssess from "./navigation/pronunciationAssessment/PronunciationAssess";

function App(): JSX.Element {
  return (
    <PronunciationAssess/>
    //<View><Text>Englephant</Text></View>
  );
}


export default App;
