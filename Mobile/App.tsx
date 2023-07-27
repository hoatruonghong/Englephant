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
  useWindowDimensions
} from 'react-native';

import PronunciationAssess from "./navigation/pronunciationAssessment/PronunciationAssess";
import Warmup from './navigation/learning/Warmup';

function App(): JSX.Element {
  const {height, width, scale, fontScale} = useWindowDimensions();
  return (
    <Warmup height = {height} width = {width} scale={scale} fontScale={fontScale}/>
  );
}


export default App;
