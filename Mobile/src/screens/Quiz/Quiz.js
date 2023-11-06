//https://github.com/RushikeshVidhate/react-native-quiz-app/blob/master/app/screens/Quiz.js
import React, { useContext, useState }  from 'react';
import { Text, View, StyleSheet, Modal, Image, TextInput, SafeAreaView, ScrollView, TouchableOpacity, Animated } from "react-native";
import Buttons from "./../../components/Buttons";
import colors from './../../../assets/colors';
import QuizData from './QuizData';

export default function Quiz() {

    const allQuestions = QuizData;
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [correctOption, setCorrectOption] = useState(null);
    const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
    const [isDisabled, setIsDisabled] = useState(false);
    const [score, setScore] = useState(0)
    const [showNextButton, setShowNextButton] = useState(false)
    const [showScoreModal, setShowScoreModal] = useState(false)
    const [progress, setProgress] = useState(new Animated.Value(0));
    
    const validateAnswer = (selectedOption) => {
        let correct_option = allQuestions[currentQuestionIndex]['correct_option'];
        setCurrentOptionSelected(selectedOption);
        setCorrectOption(correct_option);
        setIsDisabled(true);
        if(selectedOption==correct_option){
            setScore(score+1);
        }
        setShowNextButton(true);
    };
    const handleNext = () => {
        if(currentQuestionIndex==allQuestions.length-1){
            //last question
            setShowScoreModal(true);
        } else {
            setCurrentQuestionIndex(currentQuestionIndex+1);
            setCurrentOptionSelected(null);
            setCorrectOption(null);
            setIsDisabled(false);
            setShowNextButton(false);
        }
        Animated.timing(progress, {
            toValue: currentQuestionIndex+1,
            duration: 1000,
            useNativeDriver: false
        }).start();
    };
    const restartQuiz = () => {
        setShowScoreModal(false);
        setCurrentQuestionIndex(0);
        setScore(0);
        setCurrentOptionSelected(null);
        setCorrectOption(null);
        setIsDisabled(false);
        setShowNextButton(false);
        Animated.timing(progress, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: false
        }).start();
    };

    const progressAnim = progress.interpolate({
        inputRange: [0, allQuestions.length],
        outputRange: ['0%','100%']
    });
    const renderProgressBar = () => {
        return (
            <View style={styles.wrapProgressBar}>
                <Animated.View style={[{
                    height: 20,
                    borderRadius: 20,
                    backgroundColor: colors.dark_green,
                }, {
                    width: progressAnim,
                }]}>
                </Animated.View>
            </View>
        )
    };
    const renderQuestion = () => {
        return (
            <View style={styles.wrapQuestions}>
                <Text style={styles.questionText}>{allQuestions[currentQuestionIndex].question}</Text>
            </View>
        )
    };
    const renderOptions = () => {
        return (
            <View style={styles.wrapOptions}>
                <Text>{currentQuestionIndex}/{allQuestions.length}</Text>
                {   
                    allQuestions[currentQuestionIndex]?.options.map(option => (
                        <TouchableOpacity 
                            onPress={()=>{validateAnswer(option)}}
                            disabled={isDisabled}
                            key={option}
                            style={[styles.wrapOption,
                            {
                                backgroundColor: option==correctOption 
                                ? colors.bright_gray_brown 
                                : option==currentOptionSelected
                                ? colors.red
                                : colors.white,
                            }]}
                        >
                            <Text style={[styles.optionText,
                            {
                                color: option==correctOption 
                                ? colors.white 
                                : option==currentOptionSelected
                                ? colors.white
                                : colors.black_green,
                            }
                            ]}>{option}</Text>
                        </TouchableOpacity>
                    ))
                }
            </View>
        )
    };
    const renderButton = () => {
        if (showNextButton) {
            return (
                <Buttons.GreenButton title={"Tiếp"} onPress={handleNext} />
            )
        }
    };
    
    return (
        <SafeAreaView style={styles.container}>
            {renderProgressBar()}
            {renderQuestion()}
            {renderOptions()}
            {renderButton()}

            {/* Score Modal */}
            <Modal
               animationType="slide"
               transparent={true}
               visible={showScoreModal}
               >
                   <View style={{
                       flex: 1,
                       backgroundColor: colors.main_green,
                       alignItems: 'center',
                       justifyContent: 'center'
                   }}>
                       <View style={{
                           backgroundColor: colors.white,
                           width: '90%',
                           borderRadius: 20,
                           padding: 20,
                           alignItems: 'center'
                       }}>
                           <Text style={{fontSize: 30, fontWeight: 'bold'}}>{ score> (allQuestions.length/2) ? 'Congratulations!' : 'Oops!' }</Text>

                           <View style={{
                               flexDirection: 'row',
                               justifyContent: 'flex-start',
                               alignItems: 'center',
                               marginVertical: 20
                           }}>
                               <Text style={{
                                   fontSize: 30,
                                   color: score> (allQuestions.length/2) ? 'green' : 'red'
                               }}>{score}</Text>
                                <Text style={{
                                    fontSize: 20, color: 'black'
                                }}>/ { allQuestions.length }</Text>
                           </View>
                           {/* Retry Quiz button */}
                           <TouchableOpacity
                           onPress={restartQuiz}
                           style={{
                               backgroundColor: 'yellow',
                               padding: 20, width: '100%', borderRadius: 20
                           }}>
                               <Text style={{
                                   textAlign: 'center', color: 'white', fontSize: 20
                               }}>Retry Quiz</Text>
                           </TouchableOpacity>

                       </View>

                   </View>
            </Modal>
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
        width: '100%',
        height: 20,
        borderRadius: 20,
        backgroundColor: colors.main_green,
    },
    wrapQuestions: {

    },
    questionText: {
        fontSize: 16,
        fontWeight: '500',
        color: colors.black_green,
    },
    wrapOptions: {
    },
    wrapOption: {
        borderRadius: 10,
        borderWidth: 2,
        borderColor: colors.bright_gray_brown,
        alignItems: 'center',
        justifyContent: 'center',
        height: '15%',
        marginBottom: '5%',
    },
    optionText: {
        fontSize: 20,
        fontWeight: '500',
        color: colors.black_green,
    }
});