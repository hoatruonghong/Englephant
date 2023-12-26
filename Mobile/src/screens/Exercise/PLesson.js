import React, { useState }  from 'react';
import { Text, View, Image, SafeAreaView, TouchableOpacity, Animated} from "react-native";
import {Vimeo} from 'react-native-vimeo-iframe';
import Buttons from "./../../components/Buttons";
import colors from './../../../assets/colors';
import style from '../styles';
import styles from '../Quiz/QuizStyle';
//import icons
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faXmark, faVolumeUp } from '@fortawesome/free-solid-svg-icons';

library.add(faXmark, faVolumeUp);

export default function PLesson({route, navigation}) {

    const {lessons} = route.params;
    const numoflesson = lessons.length;
    const [progress, setProgress] = useState(new Animated.Value(0));
    const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
    const [buttonVisible, setButtonVisible] = useState(true);

    const progressAnim = progress.interpolate({
        inputRange: [0, numoflesson-1],
        outputRange: ['0%','100%']
    });


    //Handle pressing Next action
    const handleNext = () => {
        if (currentLessonIndex ==numoflesson-2){
            setButtonVisible(false);
        }
        setCurrentLessonIndex(currentLessonIndex+1);
        Animated.timing(progress, {
            toValue: currentLessonIndex+1,
            duration: 1000,
            useNativeDriver: false
        }).start();
    };

    const renderProgressBar = () => {
        return (
            <View style={{height:"5%", flexDirection: "row"}}>
                <View style={styles.wrapProgressBar}>
                <Animated.View style={[{
                    height: 10,
                    top: "3%",
                    borderRadius: 5,
                    backgroundColor: colors.dark_green,
                }, {
                    width: progressAnim,
                }]}>
                </Animated.View>
            </View>
            <TouchableOpacity style={[style.close, {right: "2%"}]} onPress={()=>navigation.goBack(null)}>
                <FontAwesomeIcon icon={faXmark} color={colors.black_green} size={30}/>
            </TouchableOpacity>
            </View>
            
        )
    };

    const videoCallbacks = {
        timeupdate: (data) => console.log('timeupdate: ', data),
        play: (data) => console.log('play: ', data),
        pause: (data) => console.log('pause: ', data),
        fullscreenchange: (data) => console.log('fullscreenchange: ', data),
        ended: (data) => console.log('ended: ', data),
        controlschange: (data) => console.log('controlschange: ', data),
    };

    const renderLesson = () => {
        return (
            <View style={styles.wrapQuestions}>
                <Vimeo
                    videoId={lessons[currentLessonIndex]}
                    params={'api=1&autoplay=0'}
                    handlers={videoCallbacks}
                />
                <Text style={styles.questionText}>Cùng học phát âm theo video nào</Text>
            </View>
        )
    };

    //Render Next Button
    const renderButton = () => {
        return (
                buttonVisible && <Buttons.GreenButton title={"Tiếp"} onPress={()=>handleNext()} />
            )
    };
    
    return (
        <SafeAreaView style={styles.container}>
            {renderProgressBar()}
            {renderLesson()}
            {renderButton()}
            
        </SafeAreaView>
    )
};