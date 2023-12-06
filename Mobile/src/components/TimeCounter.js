import React, {useState, useEffect} from 'react'
import { StyleSheet, View, Text} from "react-native";
import colors from "../../assets/colors";
import { FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

export default function TimeCounter(props) {
    const {time} = props;
    const [timer, countdown] = useState(props.time);//s
    const [timerContent, setTimerContent] = useState(Math.floor(timer / 60)+":"+timer % 60);

    useEffect(() => {
        const interval = setInterval(() => {
        startTimer();
        }, 1000);
        return () => clearInterval(interval);
    });

    function startTimer() {
        countdown(timer - 1);
        let minutes = Math.floor(timer / 60);
        let seconds = timer % 60;

        if (timer < 0) {
        setTimerContent("00:00");
        return;
        }        
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (seconds < 10) {
        seconds = "0" + seconds;
        }

        setTimerContent(minutes + ":" + seconds);
    }
    return (
        <View style={styles.container}>
            <FontAwesomeIcon icon="fa-solid fa-clock" size={20} color={colors.shadow_gray_brown} />
            <Text style={styles.text}>{timerContent}</Text>
        </View>
    )
}
 
const styles = StyleSheet.create({
    container: {
        width: "60%",
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-between",
        paddingRight: '5%',
        paddingLeft: '5%',
        backgroundColor: colors.white,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: colors.bright_gray_brown,
    },
    text : {
        fontSize: 20,
        fontWeight: "regular"
    }
  });
