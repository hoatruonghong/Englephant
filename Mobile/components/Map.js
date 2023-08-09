import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, PixelRatio, ImageBackground } from "react-native";
import colors from "../../assets/colors/colors";

export default function Map(props) {
  const { onPress, title, bg } = props;
  return (
    <TouchableOpacity style={styles.map} onPress={onPress}>
      <ImageBackground source={bg} resizeMode="cover"></ImageBackground>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  map: {
    width: "22%",
    height: "50%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  text: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "700",
    letterSpacing: 0.25,
    color: colors.white,
    transform: [{ rotate: '52deg'}]
  },
});