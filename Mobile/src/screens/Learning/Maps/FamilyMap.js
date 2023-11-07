import React, {useState, useEffect} from 'react';
import axios from "axios";
import { Text, StyleSheet, TouchableOpacity, ImageBackground, SafeAreaView, View, Image } from "react-native";
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
        navigation.navigate("Sum", {result: res.data.result, flashcard: res.data.flashcard});
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    return (
        <SafeAreaView style={{flex:1}}>
            <ImageBackground source={require("./../../../../assets/images/learningbg.png")} resizeMode="cover" style={{flex:1}}/>
            <View style={[styles.nodewrapper, styles.node5position]}>
              <View style={styles.pin}>
                <View style={[styles.pinwrapper, {opacity: getNodeOpacity(nodeState[4])}]}></View>
              </View>
              <Image 
                style={[styles.node,{resizeMode: "cover"}]} 
                source={{uri: "https://i.imgur.com/KJqTdar.png"}}/>
              <TouchableOpacity 
                style={[styles.node, {
                  backgroundColor: colors.bright_gray_brown,
                  opacity: getNodeOpacity(nodeState[4])
                }]} 
                onPress={()=>{if (nodeState[4] == "Unlock") onPressSum({navigation: navigation})}}/>
            </View>
            <View style={[styles.nodewrapper, styles.node4position]}>
              <View style={styles.pin}>
                <View style={[styles.pinwrapper, {opacity: getNodeOpacity(nodeState[3])}]}></View>
              </View>
              <Image 
                style={[styles.node,{resizeMode: "cover"}]} 
                source={{uri: "https://i.imgur.com/UdFrJKc.png"}}/>
              <TouchableOpacity 
                style={[styles.node, {
                  backgroundColor: colors.bright_gray_brown,
                  opacity: getNodeOpacity(nodeState[3])
                }]} 
                onPress={()=>onPressQuiz({navigation: navigation, position:4})}/>
            </View>
            <View style={[styles.nodewrapper, styles.node3position]}>
              <View style={styles.pin}>
                <View style={[styles.pinwrapper, {opacity: getNodeOpacity(nodeState[2])}]}></View>
              </View>
              <Image 
                style={[styles.node,{resizeMode: "cover"}]} 
                source={{uri: "https://i.imgur.com/msAdpeg.png"}}/>
              <TouchableOpacity 
                style={[styles.node, {
                  backgroundColor: colors.bright_gray_brown,
                  opacity: getNodeOpacity(nodeState[2])
                }]} 
                onPress={()=>onPressQuiz({navigation: navigation, position:3})}/>
            </View>
            <View style={[styles.nodewrapper, styles.node2position]}>
              <View style={styles.pin}>
                <View style={[styles.pinwrapper, {opacity: getNodeOpacity(nodeState[1])}]}></View>
              </View>
              <Image 
                style={[styles.node,{resizeMode: "cover"}]} 
                source={{uri: "https://i.imgur.com/tvdEUra.png"}}/>
              <TouchableOpacity 
                style={[styles.node, {
                  backgroundColor: colors.bright_gray_brown,
                  opacity: getNodeOpacity(nodeState[1])
                }]} 
                onPress={()=>onPressQuiz({navigation: navigation, position:2})}/>
            </View>
            <View style={[styles.nodewrapper, styles.node1position]}>
              <View style={styles.pin}></View>
              <Image 
                style={[styles.node,{resizeMode: "cover"}]} 
                source={{uri: "https://i.imgur.com/pNJmCXo.png"}}/>
              <TouchableOpacity 
                style={styles.node} 
                onPress={()=>onPressQuiz({navigation: navigation, position:1})}/>
            </View>
        </SafeAreaView>
    ) 
}
const styles = StyleSheet.create({
    nodewrapper: {
      width: "50%",
      height: "26%",
      position: "absolute",
      backgroundColor: "white",
    },
    node1position: {
      top: "70%",
      left: "15%",
      transform: [{ rotate: '5deg'}]
    },
    node2position: {
      top: "56%",
      left: "43%",
      transform: [{ rotate: '-5deg'}]
    },
    node3position: {
      top: "38%",
      left: "5%",
    },
    node4position: {
      top: "21%",
      left: "40%",
      transform: [{ rotate: '15deg'}]
    },
    node5position: {
      top: "5%",
      left: "14%",
      transform: [{ rotate: '-10deg'}]
    },
    pin: {
      width: "10%",
      borderRadius: 100,
      aspectRatio: 1,
      left: "45%",
      top: "5%",
      position: "absolute",
      backgroundColor: colors.red
    },
    pinwrapper: {
      width: "100%",
      aspectRatio: 1,
      borderRadius: 100,
      position: "absolute",
      backgroundColor: colors.bright_gray_brown
    },
    node: {
      top: "20%",
      left: "5%",
      width: "90%",
      height: "75%",
      position: "absolute",
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
      color: colors.black_green,
      position: "absolute",
      transform: [{ rotate: '-52deg'}]
    },
  });