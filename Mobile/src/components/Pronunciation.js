import * as React from "react";
import axios from "axios";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
//import icons
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faChalkboardUser,faDumbbell, faDice } from '@fortawesome/free-solid-svg-icons';
library.add(faChalkboardUser,faDumbbell, faDice);

import colors from './../../assets/colors';

function LessonItem(props) {
    const { title, type, item, navigation } = props;
    let icon = "";
    let color = '';
    let onPress;
    switch (type) {
        case 1:
            icon = faChalkboardUser;
            color = colors.blue;
            onPress=()=>{
              uri = 'http://10.0.2.2:5000/api/pronunciation/video/'+item.sound1+'/'+item.sound2;
              console.log(item.sound1,item.sound2)
              axios.get(uri)
              .then(function (res) {
                navigation.navigate("PLesson",{lessons: [res.data.data.sound1.video, res.data.data.sound2.video]});
              })
              .catch(function (error) {
                  console.log(error);
              });
            }
            break;
        case 2:
            icon = faDice;
            color= colors.yellow;
            onPress=()=>{
              uri = 'http://10.0.2.2:5000/api/pronunciation/quiz/'+item._id;
              console.log(uri)
              axios.get(uri)
              .then(function (res) {
                navigation.navigate("PronunciationQuiz",{lessonId: item._id, quizzes: res.data.quiz});
              })
              .catch(function (error) {
                  console.log(error);
              });
            }
            break;
        case 3:
            icon = faDumbbell;
            color = colors.red;
            onPress=()=>{
              uri = 'http://10.0.2.2:5000/api/pronunciation/quiz/'+item._id;
              axios.get(uri)
              .then(function (res) {
                navigation.navigate("PronunciationQuiz",{lessonId: item._id, quizzes: res.data.quiz});
              })
              .catch(function (error) {
                  console.log(error);
              });
            }
            break;
    }
    return (
        <TouchableOpacity style={styles.lessonItem} onPress={()=>onPress()}>
            <FontAwesomeIcon icon={icon} color={color} size={34}/>
            <Text style={styles.contentText}>{title}</Text>
        </TouchableOpacity>
    );
};

export default function PronunciationItem({ item, navigation, learnerId }) {
  return (
    <View style={styles.PronunciationItemWrapper}>
      <View style={styles.topItem}>
        <View style={styles.dot} />
        <Text style={styles.titleText}>{item.name}</Text>
        <View style={styles.dot} />
      </View>
      <View style={styles.contentItem}>
        <LessonItem title={"Hướng dẫn"} type={1} item={item} navigation={navigation}/>
        <LessonItem title={"Phân biệt"} type={2} item={item} navigation={navigation}/>
        <LessonItem title={"Luyện tập"} type={3} item={item} navigation={navigation}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  PronunciationItemWrapper: {
    backgroundColor: colors.bright_gray_brown,
    borderRadius: 20,
    flexDirection: 'column',
    padding: '2%',
    marginBottom: '3%',
  },
  topItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contentItem: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  lessonItem: {
    backgroundColor: colors.white,
    width: '30%',
    padding: '2%',
    paddingTop: '5%',
    paddingBottom: '5%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderRadius: 20,
    borderColor: colors.bright_gray_brown,
    elevation: 10,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity:  0.25,
    shadowRadius: 4,
    shawdowColor: colors.shadow_gray_brown, 
  },
  titleText: {
    fontSize: 24,
    fontWeight: "600",
    color: colors.white,
  },
  contentText: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.black_green,
    marginTop: 5,
  },
  dot:{
      width: 10,
      aspectRatio: 1,
      borderRadius: 10,
      backgroundColor: "white"
  },
});