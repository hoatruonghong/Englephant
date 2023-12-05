import React, {useState, useEffect} from 'react';
import axios from "axios";
import { Text, StyleSheet, TouchableOpacity, ImageBackground, SafeAreaView, View, Image } from "react-native";
import colors from '../../../../assets/colors';
import { useLogin } from '../../../context/LoginProvider';
import { FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons/faStar';
import { faStar as farStar} from '@fortawesome/free-regular-svg-icons/faStar';

const mapId=2;

export default function FamilyMap({navigation}){
    const {profile} = useLogin();
    const learnerId = profile._id;
    const [nodeState, setNodeState] = useState(["Unlock","Next","Lock","Lock","Lock"]);
    const [numStars, setNumStars] = useState([0,0,0,0,0]);

    //check node state
    function checkNodeState() {
      uri = 'http://10.0.2.2:5000/api/map/check-node/'+mapId+'/'+learnerId;
      axios.get(uri)
      .then(function (res) {
        setNodeState(res.data.state);
        setNumStars(res.data.star);
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
        navigation.navigate("Sum", {result: res.data.result, flashcard: res.data.flashcard, map: 2, time: res.data.time});
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    function renderNode(position){
      let opacity = getNodeOpacity(nodeState[position-1]);
      let text = "Learn 1";
      let nodeposition = styles.node1position;
      let img = "https://i.imgur.com/pNJmCXo.png";
      let onPress=()=>{if (opacity == 0) onPressQuiz({navigation: navigation, position: position})};
      let star = numStars[position-1];
      switch (position){
        case 2:
          text = "Practice 1";
          nodeposition = styles.node2position;
          img = "https://i.imgur.com/tvdEUra.png";
          break;
        case 3:
          text = "Learn 2";
          nodeposition = styles.node3position;
          img = "https://i.imgur.com/msAdpeg.png";
          break;
        case 4:
          text = "Practice 2";
          nodeposition = styles.node4position;
          img = "https://i.imgur.com/UdFrJKc.png";
          break;
        case 5:
          text = "Review";
          nodeposition = styles.node5position;
          img = "https://i.imgur.com/KJqTdar.png";
          onPress=()=>{if (opacity == 0) onPressSum({navigation: navigation})};
          break;
      }
      return (
        <View style={[styles.nodewrapper, nodeposition]}>
          {position !=5 && (
            <View style={{top: "5%"}}>
              <FontAwesomeIcon icon={star>0? faStar : farStar} style={[styles.star,{left: "69%"}]}/>
              <FontAwesomeIcon icon={star>1? faStar : farStar} style={[styles.star,{left: "77%"}]}/>
              <FontAwesomeIcon icon={star>2? faStar : farStar} style={[styles.star,{left: "85%"}]}/>
            </View>
          )}
          <Text style={[styles.position, {color: opacity==0? colors.red : colors.bright_gray_brown}]}>{text}</Text>
          <View style={styles.pin}>
            <View style={[styles.pinwrapper, {opacity: opacity}]}/>
          </View>
          <Image 
            style={[styles.node,{resizeMode: "cover"}]} 
            source={{uri: img}}/>
          <TouchableOpacity 
            style={[styles.node, {
              backgroundColor: colors.bright_gray_brown,
              opacity: opacity
            }]} 
            onPress={()=>onPress()}/>
        </View>
      )
    }

    return (
        <SafeAreaView style={{flex:1}}>
            <ImageBackground source={require("./../../../../assets/images/learningbg.png")} resizeMode="cover" style={{flex:1}}/>
            {renderNode(5)}
            {renderNode(4)}
            {renderNode(3)}
            {renderNode(2)}
            {renderNode(1)}
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
      backgroundColor: colors.red,
      justifyContent: "center",
      alignItems: "center"
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
    position: {
      left: "5%",
      top: "5%",
      width: 70,
      fontSize: 13,
      lineHeight: 16,
      fontWeight: "900",
      letterSpacing: 0.25,
    },
    star: {
      color: colors.yellow,
      height: 13,
      size: 13,
      position: "absolute",
    }

  });