import React from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import colors from './../../assets/colors';

function GreenButton(props) {
  const { onPress, title } = props;
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

function RedButton(props) {
  const { onPress, title } = props;
  return (
    <Pressable style={[styles.button, styles.redColor]} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

function BlueButton(props) {
  const { onPress, title } = props;
  return (
    <Pressable style={[styles.button, styles.blueColor]} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
    button: {
      width: '100%',
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 14,
      paddingHorizontal: 40,
      borderRadius: 16,
      elevation: 3,
      zIndex: 3,
      backgroundColor: colors.main_green,
    },
    text: {
      fontSize: 16,
      lineHeight: 22,
      fontWeight: "700",
      letterSpacing: 0.25,
      color: colors.white,
    },
    redColor: {
      backgroundColor: colors.red,
    },
    blueColor: {
      backgroundColor: colors.blue,
    }
  });

module.exports = {
    GreenButton, RedButton, BlueButton
}