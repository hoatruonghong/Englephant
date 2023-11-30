import React from "react";
import { Text, View, StyleSheet, Pressable, TouchableOpacity } from "react-native";
import colors from './../../assets/colors';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

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

function MicroButton(props) {
  const { onPress} = props;
  return (
    <TouchableOpacity style={[styles.roundButton, styles.microButton]} onPress={onPress}>
      <FontAwesomeIcon
          icon="fa-solid fa-microphone"
          size={30}
          color={colors.black_green}
        />
    </TouchableOpacity>
  );
}

function CamButton(props) {
  const { onPress} = props;
  return (
    <TouchableOpacity style={[styles.roundButton, styles.camButton]} onPress={onPress}>
      <FontAwesomeIcon
          icon="fa-solid fa-video"
          size={30}
          color={colors.black_green}
        />
    </TouchableOpacity>
  );
}

function EndCallButton(props) {
  const { onPress} = props;
  return (
    <TouchableOpacity style={[styles.roundButton, styles.endCallButton]} onPress={onPress}>
      <FontAwesomeIcon
          icon="fa-solid fa-phone-slash"
          size={35}
          color={colors.white}
        />
    </TouchableOpacity>
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
    },
    roundButton: {
      width: 60,
      height: 60,
      borderRadius: 50,
      backgroundColor: colors.white,
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center'
    },
    endCallButton: {
      width: 65,
      height: 65,
      backgroundColor: colors.red,
    }
  });

module.exports = {
    GreenButton, RedButton, BlueButton, MicroButton, CamButton, EndCallButton
}