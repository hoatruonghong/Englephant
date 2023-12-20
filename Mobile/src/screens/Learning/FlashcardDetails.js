import React from "react";
import { Text, StyleSheet, TouchableOpacity, View, SafeAreaView, Image} from "react-native";
import Sound from 'react-native-sound';
import colors from "../../../assets/colors";
import { FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faXmark, faVolumeUp, faDumbbell } from '@fortawesome/free-solid-svg-icons';

library.add(faXmark, faVolumeUp, faDumbbell);

export default function FlashcardDetails({route, navigation}) {
  const { word, pronunciation, audio, color, synonym, antonym, prefix, postfix, familywords } = route.params;
  
  let sound = new Sound(audio,'',
  error => {
    if (error) 
      console.log('play error: ',error)
  })
  return (
    <SafeAreaView style={{backgroundColor: color, flex: 1}}>
      <View style={[styles.container, {borderColor: color}]}>
      <TouchableOpacity style={styles.close} onPress={() => navigation.goBack(null)}>
          <FontAwesomeIcon icon={faXmark}  color={colors.black} size={32}/>
      </TouchableOpacity>
      <View style={styles.subContainer}>
        <Text style={styles.word}>{word}</Text>
        <View style={styles.subsubContainer}>
          {/* <TouchableOpacity onPress={()=>{}}>
            <FontAwesomeIcon icon={faDumbbell}  color={color} size={32}/>
          </TouchableOpacity> */}
          <Text style={styles.text}>{'    /'+pronunciation+'/    '}</Text>
          <TouchableOpacity onPress={()=>{sound.play()}}>
            <FontAwesomeIcon icon={faVolumeUp}  color={color} size={32}/>
          </TouchableOpacity>
        </View>
        <Text style={styles.fieldname}>Tiền tố</Text>
        <Text style={styles.text}>{prefix=="None"? "Không có":prefix}</Text>
        <Text style={styles.fieldname}>Hậu tố</Text>
        <Text style={styles.text}>{postfix=="None"? "Không có":postfix}</Text>
        <Text style={styles.fieldname}>Family words</Text>
        <Text style={styles.text}>{familywords=="None"? "Không có":familywords}</Text>
        <Text style={styles.fieldname}>Đồng nghĩa</Text>
        <Text style={styles.text}>{synonym=="None"? "Không có":synonym}</Text>
        <Text style={styles.fieldname}>Trái nghĩa</Text>
        <Text style={styles.text}>{antonym=="None"? "Không có":antonym}</Text>
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
    flex: 0.9,
    width: "90%"
  },
  subsubContainer: {
    flexDirection: "row",
    marginTop: "4%",
    marginBottom:"12%"
  },
  word: {
      color: colors.black,
      fontSize: 32,
      fontWeight: 'bold',
      letterSpacing: 0.25,
  },
  text: {
      color: colors.black,
      fontSize: 16,
      marginBottom: 16
  },
  fieldname: {
      color: colors.black,
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5
  },
});