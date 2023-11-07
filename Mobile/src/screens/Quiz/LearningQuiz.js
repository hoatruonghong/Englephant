import React, { useReducer, useState, createRef }  from 'react';
import { Text, View, StyleSheet, Image, TextInput, SafeAreaView, FlatList, TouchableOpacity, Animated, Modal } from "react-native";
import axios from 'axios';
import Sound from 'react-native-sound';
import PronunciationAssess from '../PronunciationAssessment/PronunciationAssess';
import Buttons from "./../../components/Buttons";
import colors from './../../../assets/colors';
import style from '../styles';
import MascotCry from '../../../assets/svg/mascot_cry.svg';
import MascotHappy from '../../../assets/svg/mascot_happy.svg';

import { useLogin } from '../../context/LoginProvider';
//import icons
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faXmark, faVolumeUp } from '@fortawesome/free-solid-svg-icons';

library.add(faXmark, faVolumeUp);

function reducer(score, curentId){
    return score.map((s, i) => (i === curentId)?  s + 1 : s );
  }

export default function LearningQuiz({route, navigation}) {

    const {profile} = useLogin();
    const learnerId = profile.id;
    const {nodeId, lessons, quizzes, flashcards} = route.params;
    const numofquiz = quizzes.length;
    const numofcard = flashcards.length;
    const quizzesPerCard = 3;
    const cardThreshold = quizzesPerCard > 3? Math.ceil(quizzesPerCard*0.75): 2;
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

    //create ref to interact with Pronunciation Assess component
    const recorder = createRef()

    //get answers
    const getAnswers = (index)=>{
        uri = 'http://10.0.2.2:5000/api/quiz/answer/'+quizzes[index]._id;
        axios.get(uri)
        .then(function (res) {
            setAnswers(res.data.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    const chooseAnswer = (selectedOption) => {
        setCurrentOptionSelected(selectedOption);
    }

    const validateAnswer = (type) => {
        switch (type){
            case "Từ - Nghe":
            case "Từ - Hình": {
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
        uri = 'http://10.0.2.2:5000/api/card/node/'+nodeId+'/'+learnerId;
        axios.get(uri)
        .then(function (res) {
            let havingFlashcards = res.data.data;
            let cards_id = [];
            let cards_content = [];
            for (let i = 0; i < numofcard; i++){
                if (score[i] >= cardThreshold){
                    if (!havingFlashcards || (havingFlashcards!=[] && !havingFlashcards.includes(flashcards[i]._id))){
                        cards_id.push(flashcards[i]._id);
                        cards_content.push(flashcards[i]);
                    }
                }
            }
            if (havingFlashcards.length >= (numofcard -2) || cards_id.length >= (numofcard - 2)){
                setPass(true);
                unlockNewNode(nodeId);
            }
            uri = 'http://10.0.2.2:5000/api/card/learner/'+learnerId;
            axios.post(uri,{
                cards: cards_id,
                nodeId: nodeId
            })
            .then(function (res) {
                if (cards_id.length>0)
                    navigation.navigate("Flashcard", {cards: cards_content, onGoBack: ()=>setShowResultModal(true)});
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
        uri = 'http://10.0.2.2:5000/api/map/node/'+nodeId;
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
        inputRange: [0, numofquiz+lessons.length],
        outputRange: ['0%','100%']
    });

    //Send Node result to backend
    const sendResult = () => {
        uri = 'http://10.0.2.2:5000/api/map/node-result/'+nodeId;
        axios.put(uri,{
            learnerId: learnerId,
            point: score.reduce((s, i) => s + i, 0),
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
    const handleResult = () => {
        console.log(score);
        getFlashcards();
        sendResult();
    }

    //Handle pressing Next action
    const handleNext = () => {
        if (currentLessonIndex < numofcard){
            setCurrentLessonIndex(currentLessonIndex+1);
            if (currentLessonIndex == numofcard -1)
                getAnswers(0);
        } else {
            if (recorder.current && recorder.current.state.recording == true)
                recorder.current.changeRecordEvent();
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
            }
        }
        Animated.timing(progress, {
            toValue: currentQuestionIndex+currentLessonIndex+1,
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
    const renderLesson = () => {
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
            case "image":
                return (<Image style={{
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
        let type = "word";
        if (answers && answers.length>0){
            if (answers[0].image){
                type = "image";
            }
            if (answers[0].audio){
                type = "audio";
            }
            if (answers[0].video){
                type = "video";
            }
        }
        if (answers && answers!=[])
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
                            >
                            </FlatList>
                        )
                    }
                case "Phát âm - Hình":
                case "Phát âm - Nghe":
                    return (
                        <View style={styles.wrapOptions}>
                            <PronunciationAssess ref={recorder}/>
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
                            />
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
        let modalContent = "Bạn chưa đạt đủ flashcard để đi tiếp";
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
            {currentLessonIndex < numofcard? renderLesson() : renderQuestion()}
            {renderOptions()}
            {renderButton()}
            {renderModal()}
            
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        padding: "5%",
        flex: 1,
    },
    wrapProgressBar: {
        width: '86%',
        height: 10,
        top: "3%",
        borderRadius: 5,
        backgroundColor: colors.main_green,
    },
    wrapQuestions: {
        height: "50%",
    },
    questionText: {
        fontSize: 16,
        fontWeight: '500',
        color: colors.black_green,
        textAlign: "center",
        marginTop: 10
    },
    wrapOptions: {
        height: "40%",
    },
    wrapOption: {
        width: "47.5%",
        height: 120,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: colors.bright_gray_brown,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20
    },
    optionText: {
        fontSize: 20,
        fontWeight: '500',
        color: colors.black_green,
    },
    input: {
        width: "93%",
        margin: 12,
        borderWidth: 2,
        borderColor: colors.bright_gray_brown,
        borderRadius: 16,
        padding: 10,
        backgroundColor: "white"
    },
    wrapper: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        width: "80%",
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        borderWidth: 2,
        borderColor: colors.bright_gray_brown,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        elevation: 5,
        zIndex: 5,
    },
    titleStyle: {
        fontSize: 20,
        fontWeight: "bold",
        color: colors.black_green,
    }
});