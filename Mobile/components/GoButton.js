import React from "react";
import { Text, StyleSheet, TouchableOpacity} from "react-native";
import colors from "../assets/colors";

export default function GoButton(props) {
  const { onPress, title } = props;
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "34%",
    height: "4%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    top: "39%",
    left: "33%",
    backgroundColor: colors.red,
    position: "absolute"
  },
  text: {
    fontSize: 40,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});