import React from 'react';
import axios from "axios";
import { Text, StyleSheet, TouchableOpacity, ImageBackground, SafeAreaView, View } from "react-native";
import colors from '../../../../assets/colors';

export default function FamilyMap(){
    return (
        <SafeAreaView style={{flex:1}}>
            <ImageBackground source={require("./../../../../assets/images/FamilyMap.png")} resizeMode="cover" style={{flex:1}}/>
            <TouchableOpacity style={styles.node1}/>
            <TouchableOpacity style={styles.node2}/>
            <TouchableOpacity style={styles.node3}/>
            <TouchableOpacity style={styles.node4}/>
            <TouchableOpacity style={styles.node5}/>
        </SafeAreaView>
    ) 
}
const styles = StyleSheet.create({
    node1wrapper: {
      top: "65%",
      left: "18%",
      width: "50%",
      height: "22%",
      position: "absolute",
      backgroundColor: colors.white,
      transform: [{ rotate: '5deg'}]
    },
    node1: {
      top: "73%",
      left: "19%",
      width: "45%",
      height: "19%",
      position: "absolute",
      backgroundColor: colors.bright_gray_brown,
      opacity: 0.5,
      transform: [{ rotate: '5deg'}]
    },
    node2: {
      top: "59.25%",
      left: "47.5%",
      width: "45%",
      height: "19%",
      position: "absolute",
      opacity: 0.5,
      backgroundColor: colors.bright_gray_brown,
      transform: [{ rotate: '-5deg'}]
    },
    node3: {
      top: "44.15%",
      left: "8%",
      width: "45%",
      height: "19%",
      position: "absolute",
      opacity: 0.5,
      backgroundColor: colors.bright_gray_brown
    },
    node4: {
      top: "30.5%",
      left: "45.5%",
      width: "45%",
      height: "19%",
      position: "absolute",
      opacity: 0.5,
      backgroundColor: colors.bright_gray_brown,
      transform: [{ rotate: '15deg'}]
    },
    node5: {
      top: "13.5%",
      left: "20.5%",
      width: "45%",
      height: "19%",
      position: "absolute",
      opacity: 0.5,
      backgroundColor: colors.bright_gray_brown,
      transform: [{ rotate: '-10deg'}]
    },
    text: {
      width: 60,
      fontSize: 18,
      lineHeight: 22,
      left: 10,
      bottom: 35,
      fontWeight: "700",
      letterSpacing: 0.25,
      color: colors.black,
      position: "absolute",
      transform: [{ rotate: '-52deg'}]
    },
  });