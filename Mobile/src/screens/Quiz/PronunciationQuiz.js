import React, { useState, createRef, useEffect }  from 'react';
import { Text, View, SafeAreaView, FlatList, TouchableOpacity, Animated, Modal } from "react-native";
import axios from 'axios';
import Sound from 'react-native-sound';
import PronunciationAssess from '../PronunciationAssessment/PronunciationAssess';
import Buttons from "./../../components/Buttons";
import colors from './../../../assets/colors';
import style from '../styles';
import styles from "./QuizStyle";
import MascotCry from '../../../assets/svg/mascot_cry.svg';
import MascotHappy from '../../../assets/svg/mascot_happy.svg';

import { useLogin } from '../../context/LoginProvider';
//import icons
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faXmark, faVolumeUp } from '@fortawesome/free-solid-svg-icons';

library.add(faXmark, faVolumeUp);

export default function PronunciationQuiz({route, navigation}) {

    const {profile} = useLogin();
    const learnerId = profile.id;
    const {lessonId, quizzes, sound1, sound2} = route.params;
    const numofquiz = quizzes.length;
    const [answers, setAnswers] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
    const [isDisabled, setIsDisabled] = useState(false);
    const [score1, setScore1] = useState(0);
    const [score2, setScore2] = useState(0);
    const [showResultModal, setShowResultModal] = useState(false);
    const [progress, setProgress] = useState(new Animated.Value(0));
    const [pass, setPass] = useState(false);

    //create ref to interact with Pronunciation Assess component
    const recorder = createRef()

    //get answers
    const getAnswers = (index)=>{
        uri = 'http://10.0.2.2:5000/api/pronunciation/answer/'+quizzes[index]._id;
        axios.get(uri)
        .then(function (res) {
            setAnswers(res.data.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    useEffect(()=> {if (answers.length==0) getAnswers(0);})

    const chooseAnswer = (selectedOption) => {
        setCurrentOptionSelected(selectedOption);
    }

    const validateAnswer = (type, sound) => {
        switch (type){
            case "IPA":
            case "Nghe": {
                let correct_option = null;
                for (let x in answers)
                    if (answers[x].isCorrect)
                        correct_option=answers[x];
                setIsDisabled(true);
                if(currentOptionSelected==correct_option){
                    sound==1? setScore1(score1+1): setScore2(score2+1);
                }
                break;
            }
            case "Phát âm":
                return;
        }        
    };

    const unlockExercise = (lessonId) => {
        uri = 'http://10.0.2.2:5000/api/pronunciation/'+lessonId;
        axios.post(uri,{
            learnerId: learnerId
        })
        .then(function (res) {
            console.log(res.data.message);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    const progressAnim = progress.interpolate({
        inputRange: [0, numofquiz],
        outputRange: ['0%','100%']
    });

    //Send Node result to backend
    const sendResult = () => {
        uri = 'http://10.0.2.2:5000/api/pronunciation/result/'+lessonId;
        axios.put(uri,{
            learnerId: learnerId,
            sound1: sound1,
            accuracy1: score1/5,
            sound2: sound2,
            accuracy2: score2/5,
            pass: pass
        })
        .then(function (res) {
            console.log(res.data.message);
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    //Handle showing result
    const handleResult = async () => {
        console.log(1,score1,2,score2);
        if (score1/5>=0.6 && score2/5>=0.6){
            setPass(true);
            unlockExercise(lessonId);
        }
        setShowResultModal(true);
        sendResult();
    }

    //Handle pressing Next action
    const handleNext = () => {
        let sound = quizzes[currentQuestionIndex].sound;
        if (recorder.current) {
            if(recorder.current.state.result>75)
                sound==1? setScore1(score1+1): setScore2(score2+1);
            if(recorder.current.state.recording == true)
                recorder.current.changeRecordEvent();
        }
        if(currentQuestionIndex==numofquiz-1){
            //last question
            validateAnswer(quizzes[currentQuestionIndex].type, sound);
            handleResult();
        } else {
            validateAnswer(quizzes[currentQuestionIndex].type, sound);
            getAnswers(currentQuestionIndex+1);
            setCurrentQuestionIndex(currentQuestionIndex+1);
            setCurrentOptionSelected(null);
            setIsDisabled(false);
        }
        Animated.timing(progress, {
            toValue: currentQuestionIndex+1,
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
    
    const renderQuestion = () => {
        let content_type = "none";
        let question = quizzes[currentQuestionIndex];
        if (question.audio||question.audio==""){
            content_type = "audio";
        }
        if (question.video){
            content_type = "video";
        }
        return (
            <View style={styles.wrapQuestions}>
                {renderContent(content_type, question)}
                <Text style={styles.questionText}>{question.question}</Text>
                {quizzes[currentQuestionIndex].word && <Text style={styles.wordStyle}>{quizzes[currentQuestionIndex].word}</Text>}
            </View>
        )
    };

    const renderContent = (type, item) => {
        switch (type) {
            case "video":
                return;
            case "none":
                return;
            case "word":
                return (
                    <Text 
                    style={[
                        styles.optionText, {
                            color: item==currentOptionSelected?
                            colors.white:
                            colors.dark_green
                     }]}>{item.content}</Text>
                )
            case "audio":
                const sound = new Sound(item.audio, error => {
                    if (error) {
                      console.log('error', error.message);
                    }
                })
                return (
                    <TouchableOpacity 
                        style={{width: "100%", height: "50%", alignItems: "center", justifyContent: "center"}} 
                        onPress={
                            ()=>sound.play(success => {
                                sound.release();
                                if (success) {
                                  console.log('Successfully finished playing');
                                } else {
                                  console.log('Playback failed due to audio decoding errors');
                                }
                              })}>
                        <FontAwesomeIcon 
                            icon={faVolumeUp}  
                            color={
                                item==currentOptionSelected?
                                colors.white:
                                colors.bright_gray_brown
                            } 
                            size={50}/>
                    </TouchableOpacity>
                )
        }
    }
    const renderOptions = () => {
        let type = "word";
        if (answers && answers.length>0){
            if (answers[0].audio){
                type = "audio";
            }
            if (answers[0].video){
                type = "video";
            }
        }
        switch (quizzes[currentQuestionIndex].type){
            case "IPA":
            case "Nghe":
                {
                    return (
                        <FlatList style={styles.wrapOptions}
                        numColumns={2}
                        data={answers}
                        columnWrapperStyle={{justifyContent: 'space-between'}}
                        renderItem={({item, index}) =>(   
                                <TouchableOpacity 
                                    onPress={()=>{chooseAnswer(item)}}
                                    disabled={isDisabled}
                                    key={item._id}
                                    style={[styles.wrapOption,
                                    {
                                        backgroundColor: 
                                            item==currentOptionSelected?
                                            colors.bright_gray_brown :
                                            colors.white
                                    }]}
                                >
                                    {renderContent(type, item)}
                                </TouchableOpacity>
                            )
                        }
                        contentContainerStyle={{width: "100%", height: "100%", justifyContent: "flex-end"}}
                        >
                        </FlatList>
                    )
                }
            case "Phát âm":
                return (
                    answers.length== 1 && 
                    <View style={styles.wrapOptions}>
                        <PronunciationAssess ref={recorder} refText={answers[0].content}/>
                    </View>
                )
        }
    };

    //Render Next Button
    const renderButton = () => {
        return (
                <Buttons.GreenButton title={"Tiếp"} onPress={()=>handleNext()} />
            )
    };

    //Render Result modal
    const renderModal = () => {
        let modalTitle = "Chưa hoàn thành";
        let modalContent = "Bạn chưa đủ điểm để vượt qua Node";
        if (pass){
            modalTitle = "Chúc mừng";
            modalContent = "Chúc mừng bạn đã hoàn thành Node";
        }
        return(
            <Modal 
                transparent={true}
                visible={showResultModal}
                onRequestClose={() => {
                    setShowResultModal(false);
                    navigation.goBack(null);
                }}
            >
                <View style={styles.wrapper}>
                <View style={styles.modalView}>
                <View style={{flexDirection:'row', width: "100%"}}>
                <TouchableOpacity style={[style.close, {right: "4%"}]} onPress={()=>{
                    setShowResultModal(false);
                    navigation.goBack(null);
                }}>
                        <FontAwesomeIcon icon={faXmark}  color={colors.black_green} size={30}/>
                    </TouchableOpacity>
                    <Text style={styles.titleStyle}>{modalTitle}</Text>
                </View>
                <View style={{width: 90, height: 68, marginTop: "5%", marginBottom: "5%"}}>
                    {pass? <MascotHappy height="100%" width="100%" viewBox='0 0 283 300'/> : <MascotCry viewBox='0 0 68 90'/>}
                </View>
                <Text style={[styles.textStyle, {textAlign: 'center'}]}>{modalContent}</Text>
                </View>
                </View>
                    
            </Modal>
        )
    }
    
    return (
        <SafeAreaView style={styles.container}>
            {renderProgressBar()}
            {renderQuestion()}
            {renderOptions()}
            {renderButton()}
            {renderModal()}
        </SafeAreaView>
    )
};