import React from "react";
import { Text, StyleSheet, TouchableOpacity} from "react-native";
import colors from "../../assets/colors";

export default function GoButton(props) {
  const { onPress, height, width, top } = props;
  return (
    <TouchableOpacity 
      style={[{
        width: width*0.34, 
        height: height*0.08, 
        left: width*0.33,
        top: top,
        backgroundColor: colors.red,
        },
        styles.button
      ]} 
      onPress={onPress}
    >
      <Text style={styles.text}>GO</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    position: "absolute"
  },
  text: {
    fontSize: 40,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    textAlign:"center"
  },
});