import React, { useState, createRef, useEffect }  from 'react';
import { Text, View, Image, TextInput, SafeAreaView, FlatList, TouchableOpacity, Animated, Modal } from "react-native";
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

export default function PracticeQuiz({route, navigation}) {

    const {profile} = useLogin();
    const learnerId = profile._id;
    const {nodeId, quizzes} = route.params;
    const numofquiz = quizzes.length;
    const [answers, setAnswers] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
    const [isDisabled, setIsDisabled] = useState(false);
    const [score, setScore] = useState(0);
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
        axios.get(uri)
        .then(function (res) {
            setAnswers(res.data.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    useEffect(() => {
        if (answers.length==0)
            getAnswers(0)
        }
    );

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
                    setScore(score+1);
                }
                break;
            }
            case "Điền - Nghe":
            case "Điền - Hình":{
                let correct_option = answers[0];
                setIsDisabled(true);
                if(text==correct_option.content){
                    setScore(score+1);
                }
                onChangeText("");
                break;
            }
        }        
    };

    const unlockNewNode = (nodeId) => {
        uri = 'https://englephant.vercel.app/api/map/node/'+nodeId;
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
        uri = 'https://englephant.vercel.app/api/map/node-result/'+nodeId;
        console.log(uri)
        axios.put(uri,{
            learnerId: learnerId,
            point: score,
            totalnumofquiz: numofquiz,
            time: time/1000
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
        console.log(score);
        time = new Date()-starttime;
        sendResult();
        if (score>=numofquiz*0.6){
            setPass(true);
            let star = score/numofquiz == 1 ? 3: score/numofquiz >=0.8? 2 : 1;
            navigation.navigate("Done", {cards: [], result: {star: star, time: time/1000}})
            unlockNewNode(nodeId);
        } else setShowResultModal(true);
    }

    //Handle pressing Next action
    const handleNext = () => {
        if (recorder.current) {
            if(recorder.current.state.result>75)
                setScore(score+1);
            if(recorder.current.state.recording == true)
                recorder.current.changeRecordEvent();
        }
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
                <Text style = {[styles.questionText, {marginRight: "4%"}]}>{currentQuestionIndex}/{numofquiz}</Text>
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
                <Text style={styles.questionText}>{question.question}</Text>
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
                            ()=>sound.play()}>
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
                return (item.image && <Image style={{
                    width: "80%",
                    alignSelf: "center",
                    aspectRatio: 1.25,
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
                            color={colors.bright_gray_brown}
                            placeholderTextColor={colors.bright_gray_brown}
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
        let modalContent = "Bạn chưa đủ điểm để đi tiếp";
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