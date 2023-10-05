import React from "react";
import { Text, StyleSheet, TouchableOpacity, ImageBackground} from "react-native";
import colors from "../../assets/colors";
import MapTitleContainer from "../../assets/svg/map_title_container.svg";
import { FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faStar } from '@fortawesome/free-solid-svg-icons/faStar';
import { faStar as farStar} from '@fortawesome/free-regular-svg-icons/faStar';

library.add(faStar);


export default function Map(props) {
  const { title, bg, mode, star, height, width } = props;
  const onPressLockedMap = ()=>{};
  const onPressUnlockedMap = ()=>{};
  if (mode == "None"){
    return(
      <TouchableOpacity style={[{width: width*0.22, height: height*0.5}]}/>
    )
  }
  if (mode == "Locked"){
    return (
      <TouchableOpacity style={[{width: width*0.22, height: height*0.5},styles.map]} onPress={onPressLockedMap}>
        <ImageBackground source={require("./../../assets/images/Locked.png")} resizeMode="stretch" style = {styles.bg}/>
      </TouchableOpacity>
    );
  } else {
    let star1 = farStar;
    let star2 = farStar;
    let star3 = farStar;
    if (star == 3) {
      star1 = faStar;
      star2 = faStar;
      star3 = faStar;
    } else if (star == 2) {
      star1 = faStar;
      star2 = faStar;    
    } else if (star == 1) star1 = faStar;
    return (
      <TouchableOpacity style={[{width: width*0.22, height: height*0.5},styles.map]} onPress={onPressUnlockedMap}>
        <ImageBackground source={bg} resizeMode="stretch" style = {styles.bg}/>
        <MapTitleContainer width="100%"
                  height="100%"
                  viewBox='0 -41 80 120'/>
        <Text style={styles.text}>{title}</Text>
        <FontAwesomeIcon icon={star1} style={[styles.star,{left: 32, bottom: 7}]}/>
        <FontAwesomeIcon icon={star2} style={[styles.star,{left: 42, bottom: 19}]}/>
        <FontAwesomeIcon icon={star3} style={[styles.star,{left: 52, bottom: 31}]}/>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    borderRadius: 20,
    borderColor: colors.bright_gray_brown,
    borderWidth: 3,
    overflow: 'hidden',
    backgroundColor: colors.bright_gray_brown
  },
  bg:{
    width: "100%",
    height: "100%",
    position: "absolute"
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
  star: {
    color: "#FFFFFF",
    size: 32,
    position: "absolute",
    transform: [{ rotate: '-52deg'}]
  },
});