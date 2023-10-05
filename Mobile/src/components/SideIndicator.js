import React from "react";
import { TouchableOpacity, Image} from "react-native";

export default function SideIndicator(props) {
  const { isLeft, onPress, width } = props;
  let sideIndicator;
  if (isLeft){
    sideIndicator=require("./../../assets/images/LeftIndicator.png");
  } else {
    sideIndicator=require("./../../assets/images/RightIndicator.png");
  }
  return (
    <TouchableOpacity onPress={onPress} style={{width: width}}>
      <Image
        style={{
          height: 50,
          resizeMode: 'stretch',
          alignSelf: 'center'
        }}
        source={sideIndicator}
      />
    </TouchableOpacity>
  );
}