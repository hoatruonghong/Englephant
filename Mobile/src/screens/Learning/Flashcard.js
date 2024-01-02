import React, { useState } from "react";
import { Text, StyleSheet, TouchableOpacity, View, SafeAreaView, Image} from "react-native";
import Sound from 'react-native-sound';
import colors from "../../../assets/colors";
import { FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faXmark, faStar, faVolumeUp, faDumbbell } from '@fortawesome/free-solid-svg-icons';

library.add(faXmark, faStar, faVolumeUp, faDumbbell);

export default function Flashcard({route, navigation}) {
  const { cards, result } = route.params;
  const numofcard = cards.length;
  const [index, setIndex] = useState(0);
  const [content, setContent] = useState(cards[0]);
  
  if(numofcard==0) return navigation.navigate("RevisionNode", {result: {...result, numofcard: numofcard}});
  const changeContent = () => {
    if (index<numofcard-1){
      setContent(cards[index+1]);
      setIndex(index+1);
    }
    else {
      navigation.navigate("RevisionNode", {result: {...result, numofcard: numofcard}});
    }
  }
  
  let sound = new Sound(content.audio,'',
  error => {
    if (error) 
      console.log('play error: ',error)
  })
  let color = content.star==3? colors.red : (content.star==2? colors.yellow : colors.blue);
  const renderStars = () => {
    if (content.star==3)
      return (
        <View style={styles.subsubContainer}>
          <FontAwesomeIcon icon={faStar}  color={color} size={32}/>
          <FontAwesomeIcon icon={faStar}  color={color} size={32}/>
          <FontAwesomeIcon icon={faStar}  color={color} size={32}/>
        </View>
      )
    if (content.star==2)
      return (
        <View style={styles.subsubContainer}>
          <FontAwesomeIcon icon={faStar}  color={color} size={32}/>
          <FontAwesomeIcon icon={faStar}  color={color} size={32}/>
        </View>
      )
    return (
      <View style={styles.subsubContainer}>
        <FontAwesomeIcon icon={faStar}  color={color} size={32}/>
      </View>
    )
  }
  return (
    <SafeAreaView style={{backgroundColor: color, flex: 1}}>
      <View style={[styles.container, {borderColor: color}]}>
      <TouchableOpacity style={styles.close} onPress={() => changeContent()}>
          <FontAwesomeIcon icon={faXmark}  color={colors.black} size={32}/>
      </TouchableOpacity>
      <Image style={styles.image} source={{uri: content.image}}></Image>
      <View style={styles.subContainer}>
        {renderStars()}
        <Text style={styles.word}>{content.word}</Text>
        <View style={styles.subsubContainer}>
          {/* <TouchableOpacity onPress={()=>{}}>
            <FontAwesomeIcon icon={faDumbbell}  color={color} size={32}/>
          </TouchableOpacity> */}
          <Text style={styles.text}>{'    /'+content.pronunciation+'/    '}</Text>
          <TouchableOpacity onPress={()=>{sound.play()}}>
            <FontAwesomeIcon icon={faVolumeUp}  color={color} size={32}/>
          </TouchableOpacity>
        </View>
        <Text style={[styles.text, {color: color}]}>{content.pos}</Text>
        <Text style={styles.text}>{content.viemeaning}</Text>
        <TouchableOpacity 
          onPress={()=>
            navigation.navigate("FlashcardDetails",{ 
              word: content.word, 
              pronunciation: content.pronunciation, 
              audio: content.audio, 
              color: color, 
              synonym: content.synonym, 
              antonym: content.antonym, 
              prefix: content.prefix, 
              postfix: content.postfix, 
              familywords: content.familywords
              })}>
        <Text style={[styles.details, {color: color}]}>Chi tiết</Text>
        </TouchableOpacity>
      </View>
      </View>
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    borderRadius: 20,
    borderWidth: 10,
    overflow: 'hidden',
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image:{
    flex: 0.4,
    top: "5%",
    width: 300,
    aspectRatio: 1,
    resizeMode: "stretch",
  },
  close: {
      flex: 0.1,
      alignItems: 'center',
      position: "absolute",
      right: "10%",
      top: "4%",
      width: "3%",
      zIndex: 1,
      elevation: 1
  },
  subContainer: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center",
    width: "80%"
  },
  subsubContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin:10
  },
  word: {
      textAlign: 'center',
      color: colors.black,
      fontSize: 32,
      fontWeight: 'bold',
      letterSpacing: 0.25,
  },
  text: {
      textAlign: 'center',
      color: colors.black,
      fontSize: 16,
  },
  details: {
      top: "400%",
      textAlign: "center",
      fontSize: 16,
      fontWeight: 'bold',
  },
});