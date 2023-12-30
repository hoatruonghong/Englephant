import * as React from "react";
import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import axios from "axios";
//import icons
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheckCircle, faLock } from '@fortawesome/free-solid-svg-icons';

library.add(faCheckCircle, faLock);

import colors from './../../assets/colors';

export default function ListenReadItem({ item, navigation, onPressInactive }) {
  if (!item.active){
    return(
      <TouchableOpacity 
        style={[styles.ListenReadIteamWrapper,{backgroundColor: colors.bright_gray_brown}]}
        onPress={()=>onPressInactive()}
      >
        <View style={styles.topItem}>
          <View style={styles.leftSide}>
            <View style={[styles.dot, {backgroundColor: "white"}]} />
            <Text style={styles.titleText}>{"  "+item.name}</Text>
          </View>
          <View style={[styles.dot, {backgroundColor: "white"}]} />
        </View>
        <View style={styles.iconItem2}>
          <FontAwesomeIcon icon={faLock}  color={"white"} size={30}/>
        </View>
      </TouchableOpacity>
    )
    
  }
  const renderIcon = (isDone) => {
    if(isDone)
      return (
        <View style={styles.iconItem}>
          <FontAwesomeIcon icon={faCheckCircle}  color={colors.main_green} size={30}/>
        </View>
        )
  }

  const renderProgress = (item) => {
    if (item.point)
      return (
        <View style={styles.progressItem}>
            <Text style={styles.contentText}>{item.point}/{item.total}</Text>
            <Text style={styles.contentText}>{Math.round(item.point/item.total*100)+'%'}</Text>
        </View>
      )
  }

  const onPressActive = () => {
    uri = 'https://englephant.vercel.app/api/lr/quiz/'+item._id;
    axios.get(uri)
    .then(function (res) {
      navigation.navigate("LRLesson",{name: item.name, lessonId: item._id, lesson: item.description, quizzes: res.data.quiz, image: item.image});
    })
    .catch(function (error) {
    console.log(error);
    });
  }
  return (
    <TouchableOpacity 
      style={[styles.ListenReadIteamWrapper,{backgroundColor: "white"}]}
      onPress={()=>onPressActive()}
    >
      <View style={styles.topItem}>
        <View style={styles.leftSide}>
          <View style={[styles.dot, {backgroundColor: colors.bright_gray_brown}]} />
          <Text style={styles.titleText}>{"  "+item.name}</Text>
        </View>
        <View style={[styles.dot, {backgroundColor: colors.bright_gray_brown}]} />
      </View>
      <View style={styles.contentItem}>
        <View style={styles.imageItem}>
          <Image source={{uri: item.image}} 
           style={styles.image}
          />
        </View>
        {renderProgress(item)}
        {renderIcon(item.isDone)}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  ListenReadIteamWrapper: {
    borderWidth: 2,
    borderRadius: 20,
    borderColor: colors.bright_gray_brown,
    flexDirection: 'column',
    paddingLeft: '5%',
    paddingRight: '5%',
    marginBottom: '3%',
  },
  topItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftSide: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightSide: {
  },
  dot:{
    width: 10,
    aspectRatio: 1,
    borderRadius: 10,
  },
  contentItem: {
    width: "100%",
    flex: 1,
    backgroundColor: "white",
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
  },
  imageItem: {
    width: '33%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 50,
    aspectRatio: 1.25,
    borderRadius: 6,
    resizeMode: 'cover',
    padding: 15
  },
  progressItem: {
    width: '53.7%',
  },
  iconItem: {
    width: '13.3%',
    padding: 15
  },
  iconItem2: {
    width: '100%',
    flex:1,
    alignItems: "flex-end",
    padding: 15
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.black_green,
  },
  contentText: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.black_green,
  },
});