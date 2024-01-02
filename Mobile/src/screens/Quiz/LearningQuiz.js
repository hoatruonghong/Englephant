import React, { useReducer, useState, createRef }  from 'react';
import { Text, View, Image, TextInput, SafeAreaView, FlatList, TouchableOpacity, Animated, Modal } from "react-native";
import axios from 'axios';
import {Vimeo} from 'react-native-vimeo-iframe';
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

//log
const zeroes = "000000000000000000000000000000";

function zeroPad(num, padLen) {
    let str = num + "";
    let padNum = padLen - str.length;
    if (padNum > 0) {
        str = zeroes.slice(0, padNum) + str;
    }
    return str;
}
const base = Date.now();

function log(...args) {
    let delta = Date.now() - base;
    let deltaPad = zeroPad(delta, 6);
    console.log(deltaPad + ": ", ...args);
}
function reducer(score, currentId){
    let newscore = [];
    for (i in score){
        console.log(i, currentId)
        newscore.push((i == currentId)?score[i]+1: score[i]) ;
    }
    log(newscore)
    return newscore;
}

export default function LearningQuiz({route, navigation}) {
    const {profile} = useLogin();
    const learnerId = profile._id;
    const {nodeId, lessons, quizzes, flashcards} = route.params;
    const numoflesson = lessons.length;
    const numofquiz = quizzes.length;
    const numofcard = flashcards.length;
    const quizzesPerCard = 3;
    const cardThreshold = quizzesPerCard > 3? Math.ceil(quizzesPerCard*0.75): 2;
    const [state, setState] = useState({answers: [], currentQuestionIndex:0, currentOptionSelected: null, currentCardIndex:0})
    const [answers, setAnswers] = useState([]);
    const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
    const [isDisabled, setIsDisabled] = useState(false);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [score, dispatch] = useReducer(reducer,new Array(numofcard).fill(0));
    const [showResultModal, setShowResultModal] = useState(false);
    const [progress, setProgress] = useState(new Animated.Value(0));
    const [text, onChangeText] = useState('');
    const [pass, setPass] = useState(false);

    //timer
    const [starttime, setStarttime] = useState(new Date());
    let time;

    //create ref to interact with Pronunciation Assess component
    const recorder = createRef()

    //get answers
    const getAnswers = (index)=>{
        uri = 'https://englephant.vercel.app/api/quiz/answer/'+quizzes[index]._id;
        log("begin get " + uri);
        axios.get(uri)
        .then(function (res) {
            console.log(res.data.data)
            setAnswers(res.data.data);
            
            log("end get "+uri)
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    const chooseAnswer = (selectedOption) => {
        setCurrentOptionSelected(selectedOption);
    }

    const validateAnswer = (type) => {
        log("validateAnswer")
        switch (type){
            case "Từ - Nghe":
            case "Từ - Hình": {
                log("Từ - Hình")
                let correct_option = null;
                for (let x in answers)
                    if (answers[x].isCorrect)
                        correct_option=answers[x];
                setIsDisabled(true);
                if(currentOptionSelected==correct_option){
                    dispatch(currentCardIndex);
                }
                break;
            }
            case "Điền - Nghe":
            case "Điền - Hình":{
                log("Điền - Hình")
                let correct_option = answers[0];
                setIsDisabled(true);
                if(text==correct_option.content){
                    dispatch(currentCardIndex);
                }
                onChangeText("");
                break;
            }
        }        
    };

    //get flashcards
    const getFlashcards = () => {
        uri = 'https://englephant.vercel.app/api/card/node/'+nodeId+'/'+learnerId;
        console.log(uri)
        axios.get(uri)
        .then(function (res) {
            let havingFlashcards = res.data.data;
            console.log(havingFlashcards)
            let cards_id = [];
            let cards_content = [];
            for (let i = 0; i < numofcard; i++){
                if (score[i] >= cardThreshold){
                    if (havingFlashcards.length == 0 || (havingFlashcards!=[] && !(havingFlashcards.includes(flashcards[i]._id)))){
                        cards_id.push(flashcards[i]._id);
                        cards_content.push(flashcards[i]);
                    }
                }
            }
            console.log(score.reduce((s, i) => s + i, 0)/numofquiz)
            console.log(cards_id)
            if (score.reduce((s, i) => s + i, 0)/numofquiz >= 0.6 || cards_id.length >= (numofcard - 2)){
                setPass(true);
                unlockNewNode(nodeId);
            }
            uri = 'https://englephant.vercel.app/api/card/learner/'+learnerId;
            console.log(uri)
            console.log(cards_id.length>0)
            console.log(pass)
            axios.post(uri,{
                cards: cards_id,
                nodeId: nodeId
            })
            .then(function (res) {
                console.log("ww")
                if (cards_id.length>0 && pass)
                    navigation.navigate("Done", {cards: cards_content})
                else setShowResultModal(true);
            })
            .catch(function (error) {
                console.log(error);
            });
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    const unlockNewNode = (nodeId) => {
        uri = 'https://englephant.vercel.app/api/map/node/'+nodeId;
        axios.post(uri,{
            learnerId: learnerId
        })
        .then(function (res) {
            console.log(res.data.message)
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    const progressAnim = progress.interpolate({
        inputRange: [0, numofquiz+numoflesson],
        outputRange: ['0%','100%']
    });

    //Send Node result to backend
    const sendResult = () => {
        uri = 'https://englephant.vercel.app/api/map/node-result/'+nodeId;
        console.log(learnerId, score.reduce((s, i) => s + i, 0), numofquiz, time)
        axios.put(uri,{
            learnerId: learnerId,
            point: score.reduce((s, i) => s + i, 0),
            totalnumofquiz: numofquiz,
            time: Math.round(time/1000)
        })
        .then(function (res) {
            console.log(res.data.message);
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    //Handle showing result
    const handleResult = () => {
        log("handle result")
        time = new Date()-starttime;
        //setTimerIsActive(false);
        getFlashcards();
        sendResult();
    }

    //Handle pressing Next action
    const handleNext = () => {
        log("handleNext")
        if (currentLessonIndex < numofcard){
            if (currentLessonIndex == numofcard -1)
                getAnswers(0);
            setCurrentLessonIndex(currentLessonIndex+1);
        } else {
            if (recorder.current) {
                if(recorder.current.state.result>75)
                    dispatch(currentCardIndex);
                if(recorder.current.state.recording == true)
                    recorder.current.changeRecordEvent();
            }
            if(currentQuestionIndex==numofquiz-1){
                //last question
                validateAnswer(quizzes[currentQuestionIndex].type, currentOptionSelected);
                handleResult();
            } else {
                validateAnswer(quizzes[currentQuestionIndex].type, currentOptionSelected);
                if ((currentQuestionIndex+1) % quizzesPerCard == 0)
                    setCurrentCardIndex(currentCardIndex+1);
                getAnswers(currentQuestionIndex+1);
                setCurrentQuestionIndex(currentQuestionIndex+1);
                setCurrentOptionSelected(null);
                setIsDisabled(false);
                log(currentCardIndex, currentQuestionIndex, currentOptionSelected, isDisabled)
            }
        }
        Animated.timing(progress, {
            toValue: currentQuestionIndex+currentLessonIndex+1,
            duration: 1000,
            useNativeDriver: false
        }).start();
    };

    const renderProgressBar = () => {
        log("renderProgressBar")
        return (
            <View style={{height:"5%", flexDirection: "row"}}>
                <Text style = {[styles.questionText, {marginRight: "4%"}]}>{currentQuestionIndex+currentLessonIndex}/{numofquiz+numoflesson}</Text>
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
                <TouchableOpacity style={[style.close, {right: "2%"}]} onPress={()=>{setAnswers([]);navigation.goBack(null)}}>
                    <FontAwesomeIcon icon={faXmark} color={colors.black_green} size={30}/>
                </TouchableOpacity>
            </View>
            
        )
    };
    const renderLesson = () => {
        log("renderLesson")
        if (currentLessonIndex == numofcard)
            return;
        let content_type = "none";
        let lesson = lessons[currentLessonIndex];
        if (lesson.image){
            content_type = "image";
        }
        if (lesson.audio){
            content_type = "audio";
        }
        if (lesson.video){
            content_type = "video";
        }
        return (
            <View style={styles.wrapQuestions}>
                {renderContent(content_type, lesson)}
                <Text style={styles.questionText}>{lessons[currentLessonIndex].content}</Text>
            </View>
        )
    };
    const renderQuestion = () => {
        log("renderQuestion")
        if (currentLessonIndex < numofcard)
            return;
        let content_type = "none";
        let question = quizzes[currentQuestionIndex];
        if (question.image){
            content_type = "image";
        }
        if (question.audio){
            content_type = "audio";
        }
        if (question.video){
            content_type = "video";
        }
        return (
            <View style={styles.wrapQuestions}>
                {renderContent(content_type, question)}
                <Text style={styles.questionText}>{quizzes[currentQuestionIndex].question}</Text>
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

    const renderContent = (type, item) => {
        log("renderContent")
        switch (type) {
            case "video":
                return(
                    <Vimeo
                        videoId={item.video}
                        params={'api=1&autoplay=0'}
                        handlers={videoCallbacks}
                    />
                );
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
                const sound = new Sound(item.audio,'',
                error => {
                  if (error) 
                    console.log('play error: ',error)
                })
                return (
                    <View style = {{alignSelf: "center"}}>
                        <TouchableOpacity 
                            style={{width: "100%", height: "50%", alignItems: "center", justifyContent: "center"}} 
                            onPress={()=>{sound.play()}}>
                            <FontAwesomeIcon 
                                icon={faVolumeUp}  
                                color={
                                    item==currentOptionSelected?
                                    colors.white:
                                    colors.bright_gray_brown
                                } 
                                size={50}/>
                        </TouchableOpacity>
                    </View>
                )
            case "image":
                return (item.image && <Image style={{
                    width: "80%",
                    aspectRatio: 1.25,
                    alignSelf: "center",
                    resizeMode: "cover",
                    borderColor: colors.bright_gray_brown,
                    borderWidth: 2,
                    borderRadius: 16
                  }} source={{uri: item.image}}/>)
        }
    }
      
    const renderOptions = () => {
        log("renderOptions")
        if (answers.length==0 || answers[0].quizId != quizzes[currentQuestionIndex]._id)
            return;
        let type = "word";        console.log(answers)
        if (answers[0].image){
            type = "image";
        }
        if (answers[0].audio){
            type = "audio";
        }
        if (answers[0].video){
            type = "video";
        }
        switch (quizzes[currentQuestionIndex].type){
            case "Từ - Nghe":
            case "Từ - Hình":
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
                        contentContainerStyle={{width: "100%", height: "100%"}}
                        />
                    )
                }
            case "Phát âm - Hình":
            case "Phát âm - Nghe":
                return (
                    answers.length== 1 && 
                    <View style={styles.wrapOptions}>
                        <PronunciationAssess ref={recorder} refText={answers[0].content}/>
                    </View>
                )
            case "Điền - Nghe":
            case "Điền - Hình":
                return (
                    <View style={styles.wrapOptions}>
                        <TextInput
                            style={styles.input}
                            onChangeText={text=>onChangeText(text.toLowerCase().trim())}
                            value={text}
                            placeholder='Điền vào đây'
                            color={colors.bright_gray_brown}
                            placeholderTextColor={colors.bright_gray_brown}
                        />
                    </View>
                )
            default:
                return ;
        }
    };

    //Render Next Button
    const renderButton = () => {
        log("renderButton")
        return (
                <Buttons.GreenButton title={"Tiếp"} onPress={()=>handleNext()} />
            )
    };

    //Render Result modal
    const renderModal = () => {
        log("renderButton")
        let modalTitle = "Chưa hoàn thành";
        let modalContent = "Bạn chưa đạt đủ flashcard để đi tiếp";
        if (pass){
            modalTitle = "Chúc mừng";
            modalContent = "Chúc mừng bạn đã hoàn thành bài học";
        }
        return(
            <Modal 
                transparent={true}
                visible={showResultModal}
                onRequestClose={() => {
                    setShowResultModal(false);
                    navigation.navigate("Relax");
                }}
            >
                <View style={styles.wrapper}>
                <View style={styles.modalView}>
                <View style={{flexDirection:'row', width: "100%"}}>
                <TouchableOpacity style={[style.close, {right: "4%"}]} onPress={()=>{
                    setShowResultModal(false);
                    navigation.navigate("Relax");
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
            {renderLesson()}
            {renderQuestion()}
            {renderOptions()}
            {renderButton()}
            {renderModal()}
            
        </SafeAreaView>
    )
}