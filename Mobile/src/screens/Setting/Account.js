import React, { useContext, useState }  from 'react';
import { Text, View, StyleSheet, ImageBackground, Image, TextInput } from "react-native";
import Buttons from "./../../components/Buttons";
import colors from './../../../assets/colors';

export default function Account() {

  return (
    <View style={styles.container}>
      <Text>Login Success </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex:1
  }
});
