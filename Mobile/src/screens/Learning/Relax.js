import React, { useState, useEffect } from 'react';
import {
  ImageBackground,
  Image,
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  StyleSheet
} from 'react-native';
import colors from '../../../assets/colors';
import styles from '../styles';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);

export default function Relax({navigation}) {
    const {height, width} = useWindowDimensions();
    
    const [timerContent, setTimerContent] = useState('2:00');
    const [timer, countdown] = useState(120);

    useEffect(() => {
            const interval = setInterval(() => {
                startTimer();
              }, 1000);
              return () => clearInterval(interval);
        }
      );

    function startTimer() {
        countdown(timer-1);
        let minutes = Math.floor(timer / 60);
        let seconds = timer % 60;

        if (timer < 0) {
            setTimerContent('0:00');
            return;
        }
        if (seconds < 10) {
            seconds = '0' + seconds;
        }

        setTimerContent(minutes + ':' + seconds);
    }

    const onPress = () => {
        navigation.pop(2);
    }

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={require('./../../../assets/images/forest-landscape.png')} style={styles.bg}>
                <View style={style.gifcontainer}>
                    <Image 
                        style ={{width: "80%"}} 
                        source={require('../../../assets/blink.gif')} 
                        resizeMode='contain'
                    /> 
                </View>
                <TouchableOpacity style={styles.close} onPress={() => onPress()}>
                    <FontAwesomeIcon icon="xmark"  color={colors.black} size={32}/>
                </TouchableOpacity>
                <Text style={[styles.heading,{top: "60%", width: "100%", color: "white"}]}>Tập mắt xíu nào!!!</Text>
                <Text style={[styles.text,{top: "66%", left: "10%", width: "80%", color: "white"}]}>
                    Bạn vừa rất tập trung rồi, đã đến lúc nghỉ ngơi và cho mắt tập thể dục rồi!{"\n"}
                    Hãy chớp mắt theo Englephant nào!!!
                </Text>
                <TouchableOpacity 
                    style={[{
                        width: width*0.34, 
                        height: height*0.08, 
                        left: width*0.33,
                        top: height*0.75,
                        backgroundColor: colors.main_green,
                        },
                        style.button
                    ]} 
                    onPress={onPress}
                    >
                    <Text style={style.text}>{timerContent}</Text>
                </TouchableOpacity>
            </ImageBackground>
        </SafeAreaView>
  );
}

const style = StyleSheet.create({
  gifcontainer: {
    width: "100%",
    height: "60%",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    position: "absolute"
  },
  text: {
    fontSize: 40,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    textAlign:"center"
  },
});