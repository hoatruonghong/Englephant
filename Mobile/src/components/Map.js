import React from "react";
import axios from "axios";
import { Text, StyleSheet, TouchableOpacity, ImageBackground} from "react-native";
import colors from "../../assets/colors";
import MapTitleContainer from "../../assets/svg/map_title_container.svg";
import { FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faStar } from '@fortawesome/free-solid-svg-icons/faStar';
import { faStar as farStar} from '@fortawesome/free-regular-svg-icons/faStar';

library.add(faStar);


export default function Map(props) {
  const [data, setData] = React.useState([]);
  const { name, image, lock, star, height, width, index, navigation, learnerId } = props;
  const getMap = () => {
    axios.get('http://10.0.2.2:5000/api/map/login', {
      username: username,
      password: password
    })
    .then(function (res) {
      if (res.data.success) {
        setProfile(res.data.data.user);
        setIsLoggedIn(true);
      }      
      console.log(res.data.data.user, 'profile', profile);
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  const onPressLockedMap = ()=>{};
  const onPressUnlockedMap = ()=>{
    uri = 'http://10.0.2.2:5000/api/map/learn/'+learnerId+'/'+index;
    axios.get(uri)
    .then(function (res) {
      setData(res.data.data);
      navigation.navigate(index.toString());
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  if (name == "None"){
    return(
      <TouchableOpacity style={[{width: width*0.22, height: height*0.5}]}/>
    )
  }
  if (lock){
    return (
      <TouchableOpacity style={[{width: width*0.22, height: height*0.5},styles.map]} onPress={onPressLockedMap}>
        <ImageBackground source={require("./../../assets/images/Locked.png")} resizeMode="stretch" style = {styles.image}/>
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
        <ImageBackground source={{uri: image}} resizeMode="cover" style = {styles.image}/>
        <MapTitleContainer width="100%"
                  height="100%"
                  viewBox='0 -41 80 120'/>
        <Text style={styles.text}>{name}</Text>
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
  image:{
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