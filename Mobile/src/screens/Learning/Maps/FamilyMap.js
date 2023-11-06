import React, {useState, useEffect} from 'react';
import axios from "axios";
import { Text, StyleSheet, TouchableOpacity, ImageBackground, SafeAreaView, View } from "react-native";
import colors from '../../../../assets/colors';
import { useLogin } from '../../../context/LoginProvider';

const mapId=2;

export default function FamilyMap({navigation}){
    const {profile} = useLogin();
    const learnerId = profile.id;
    const [nodeState, setNodeState] = useState(["Unlock","Next","Lock","Lock","Lock"]);

    //check node state
    function checkNodeState() {
      uri = 'http://10.0.2.2:5000/api/map/check-node/'+mapId+'/'+learnerId;
      axios.get(uri)
      .then(function (res) {
        setNodeState(res.data.data)
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    useEffect(()=>checkNodeState());

    const getNodeOpacity = (node) => {
      return node == "Unlock"? 0 : node == "Next"? 0.5 : 1;
    }

    function onPressQuiz({navigation, position}){
      uri = 'http://10.0.2.2:5000/api/quiz/node/'+mapId+'/'+position;
      axios.get(uri)
      .then(function (res) {
        if (nodeState[position-1] == "Unlock")
          if (position % 2 ==1)
            navigation.navigate("LearningQuiz", {nodeId: res.data.nodeId, lessons: res.data.lesson, quizzes: res.data.quiz, flashcards: res.data.flashcard});
          else navigation.navigate("PracticeQuiz", {nodeId: res.data.nodeId, quizzes: res.data.quiz});
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    function onPressSum({navigation}){
      uri = 'http://10.0.2.2:5000/api/map/sum/'+mapId+'/'+learnerId;
      console.log(uri)
      axios.get(uri)
      .then(function (res) {
        console.log(res.data.data);
        navigation.navigate("Sum", {result: res.data.data});
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    return (
        <SafeAreaView style={{flex:1}}>
            <ImageBackground source={require("./../../../../assets/images/FamilyMap.png")} resizeMode="cover" style={{flex:1}}/>
            <TouchableOpacity style={[styles.node1, {opacity: getNodeOpacity(nodeState[0])}]} onPress={()=>onPressQuiz({navigation: navigation, position:1})}/>
            <TouchableOpacity style={[styles.node2, {opacity: getNodeOpacity(nodeState[1])}]} onPress={()=>onPressQuiz({navigation: navigation, position:2})}/>
            <TouchableOpacity style={[styles.node3, {opacity: getNodeOpacity(nodeState[2])}]} onPress={()=>onPressQuiz({navigation: navigation, position:3})}/>
            <TouchableOpacity style={[styles.node4, {opacity: getNodeOpacity(nodeState[3])}]} onPress={()=>onPressQuiz({navigation: navigation, position:4})}/>
            <TouchableOpacity style={[styles.node5, {opacity: getNodeOpacity(nodeState[4])}]} onPress={()=>onPressSum({})}/>
        </SafeAreaView>
    ) 
}
const styles = StyleSheet.create({
    node1wrapper: {
      top: "65%",
      left: "18%",
      width: "50%",
      height: "22%",
      position: "absolute",
      backgroundColor: colors.white,
      transform: [{ rotate: '5deg'}]
    },
    node1: {
      top: "73%",
      left: "19%",
      width: "45%",
      height: "19%",
      position: "absolute",
      backgroundColor: colors.bright_gray_brown,
      transform: [{ rotate: '5deg'}]
    },
    node2: {
      top: "59.25%",
      left: "47.5%",
      width: "45%",
      height: "19%",
      position: "absolute",
      backgroundColor: colors.bright_gray_brown,
      transform: [{ rotate: '-5deg'}]
    },
    node3: {
      top: "44.15%",
      left: "8%",
      width: "45%",
      height: "19%",
      position: "absolute",
      backgroundColor: colors.bright_gray_brown
    },
    node4: {
      top: "30.5%",
      left: "45.5%",
      width: "45%",
      height: "19%",
      position: "absolute",
      backgroundColor: colors.bright_gray_brown,
      transform: [{ rotate: '15deg'}]
    },
    node5: {
      top: "13.5%",
      left: "20.5%",
      width: "45%",
      height: "19%",
      position: "absolute",
      backgroundColor: colors.bright_gray_brown,
      transform: [{ rotate: '-10deg'}]
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
  });