import React, { useState }  from 'react';
import { View, StyleSheet, Image, TouchableOpacity, ScrollView, Text, useWindowDimensions } from "react-native";
import axios from 'axios';

import colors from './../../../assets/colors';
//import icons
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faVolumeUp, faEye } from '@fortawesome/free-solid-svg-icons';

library.add(faVolumeUp, faEye);

export default function LRLesson({route, navigation}) {

    const {lessonId, lesson, quizzes, image} = route.params;
    const [textVisible, setTextVisible] = useState(true);
    const {height} = useWindowDimensions();

    const onPress = () => {
        uri = 'http://192.168.1.81:5000/api/lr/quiz/'+lessonId;
        axios.get(uri)
        .then(function (res) {
          navigation.navigate("LRQuiz",{lessonId: lessonId, quizzes: quizzes, image: image});
        })
        .catch(function (error) {
        console.log(error);
        });
      }

    return (
        <View style={styles.container}>
            <View style={[styles.wrapContent, {height: height* 0.5}]}>
                <View
                    style={styles.ListenReadIteamWrapper}
                >
                    <View style={styles.topItem}>
                        <View style={styles.dot} />
                        <View style={styles.dot} />
                    </View>
                    <Image source={{uri: image}} 
                    style={styles.image}
                    />
                    {textVisible && 
                        <ScrollView style={{height: height*0.4}}>
                            <Text style={styles.contentText}>{lesson}</Text>
                        </ScrollView>
                    }
                    <View style={{height: height*0.05, justifyContent: "space-evenly", flexDirection:"row"}}>
                        <TouchableOpacity>
                            <FontAwesomeIcon icon={faVolumeUp}  color={colors.main_green} size={30}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>setTextVisible(!textVisible)}>
                            <FontAwesomeIcon icon={faEye}  color={colors.main_green} size={30}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <TouchableOpacity style={[styles.button, {height: height*0.07}]} onPress={()=>onPress()}>
                <Text style={styles.buttonText}>Tiếp</Text>
            </TouchableOpacity>
        </View>
    )
};


const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: colors.brightest_green,
        alignItems: "center"
    },
    wrapContent: {
        paddingTop: '5%',
        width: '84%',
        height: "50%"
    },
    ListenReadIteamWrapper: {
        borderWidth: 2,
        borderRadius: 20,
        borderColor: colors.bright_gray_brown,
        paddingHorizontal: '5%',
        marginBottom: '3%',
        backgroundColor: "white",
    },
    topItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 15
    },
    dot:{
        width: 10,
        aspectRatio: 1,
        borderRadius: 10,
        backgroundColor: colors.bright_gray_brown
    },
    button: {
        top: '88%',
        width: '84%',
        height: "7%",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
        position: "absolute",
        backgroundColor: colors.main_green,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "white",
        textAlign:"center"
    },
    image: {
        width: "90%",
        aspectRatio: 1.5,
        borderRadius: 20,
        resizeMode: 'cover',
        marginBottom: 15,
        alignSelf: "center"
    },
    contentText: {
        fontSize: 16,
        color: colors.black_green,
        lineHeight: 20
    },
});
