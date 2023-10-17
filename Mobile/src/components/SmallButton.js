import React from "react";
import { StyleSheet, TouchableOpacity} from "react-native";
import colors from "../../assets/colors";
import { FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

export default function SmallButton(props) {
  const { onPress, width, icon } = props;
  return (
    <TouchableOpacity 
      style={[{
        width: width*0.12, 
        aspectRatio:1,
        marginLeft: width*0.02,
        marginBottom: width*0.02
        },
        styles.button
      ]} 
      onPress={onPress}
    >
        <FontAwesomeIcon icon={icon} color = {colors.dark_brown} size={width*0.06} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: colors.bright_gray_brown,
  }
});