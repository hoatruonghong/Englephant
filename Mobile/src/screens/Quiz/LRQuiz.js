import React, { useState, useEffect }  from 'react';
import { Text, View, Image, SafeAreaView, FlatList, TouchableOpacity, Animated, Modal } from "react-native";
import axios from 'axios';
import Buttons from "../../components/Buttons";
import colors from '../../../assets/colors';
import style from '../styles';
import styles from "./QuizStyle";
import MascotCry from '../../../assets/svg/mascot_cry.svg';
import MascotHappy from '../../../assets/svg/mascot_happy.svg';

import { useLogin } from '../../context/LoginProvider';
//import icons
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

library.add(faXmark);

export default function LRQuiz({route, navigation}) {

    const {profile} = useLogin();
    const learnerId = profile._id;
    const {lessonId, quizzes, image} = route.params;
    const numofquiz = quizzes.length;
    const [answers, setAnswers] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
    const [isDisabled, setIsDisabled] = useState(false);
    const [score, setScore] = useState(0);
    const [showResultModal, setShowResultModal] = useState(false);
    const [progress, setProgress] = useState(new Animated.Value(0));
    const [pass, setPass] = useState(false);

    //get answers
    const getAnswers = (index)=>{
        uri = 'https://englephant.vercel.app/api/lr/answer/'+quizzes[index]._id;
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

    const validateAnswer = () => {
        let correct_option = null;
        for (let x in answers)
            if (answers[x].isCorrect)
                correct_option=answers[x];
        setIsDisabled(true);
        if(currentOptionSelected==correct_option){
            setScore(score+1);
        }
    };

    const unlockNewLesson = (lessonId) => {
        uri = 'https://englephant.vercel.app/api/lr/'+lessonId;
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
        uri = 'https://englephant.vercel.app/api/lr/result/'+lessonId;
        axios.put(uri,{
            learnerId: learnerId,
            point: score,
            totalnumofquiz: numofquiz
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
        if (score>=numofquiz*0.6){
            setPass(true);
            unlockNewLesson(lessonId);
        }
        setShowResultModal(true);
        sendResult();
    }

    //Handle pressing Next action
    const handleNext = () => {
            if(currentQuestionIndex==numofquiz-1){
                //last question
                validateAnswer(quizzes[currentQuestionIndex].type, currentOptionSelected);
                handleResult();
            } else {
                validateAnswer(quizzes[currentQuestionIndex].type, currentOptionSelected);
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
        return (
            <View style={styles.wrapQuestions}>
                {renderImage(image)}
                <Text style={styles.questionText}>{quizzes[currentQuestionIndex].question}</Text>
            </View>
        )
    };

    const renderImage = (image) => {
        return ( image &&
                <Image style={{
                    width: "80%",
                    alignSelf: "center",
                    aspectRatio: 1.25,
                    resizeMode: "cover",
                    borderRadius: 16
                  }} source={{uri: image}}/>
        )
    }

    const renderContent = (item) => {
        return (
            <Text 
            style={[
                styles.optionText, {
                    color: item==currentOptionSelected?
                    colors.white:
                    colors.dark_green
                }]}>{item.content}</Text>
        )
    }
    const renderOptions = () => {
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
                        {renderContent(item)}
                    </TouchableOpacity>
                )
            }
            contentContainerStyle={{width: "100%", height: "100%"}}
            >
            </FlatList>
        )
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
        let modalContent = "Bạn chưa vượt qua được bài Nghe Đọc này rồi";
        if (pass){
            modalTitle = "Chúc mừng";
            modalContent = "Chúc mừng bạn đã hoàn thành bài Nghe Đọc";
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