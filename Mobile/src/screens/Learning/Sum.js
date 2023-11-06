import React from 'react';
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View
} from 'react-native';
import MascotHappy from '../../../assets/svg/mascot_happy.svg';
import colors from '../../../assets/colors';
import styles from '../styles';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHeart, fas, faStar } from '@fortawesome/free-solid-svg-icons';

library.add(fas);

const result = [{key: 1, point: 8, totalnumofquiz: 12},{key: 2, point: 8, totalnumofquiz: 12},{key: 3, point: 8, totalnumofquiz: 12},{key: 4, point: 8, totalnumofquiz: 12},{key: 5, point: 32, totalnumofquiz: 48}]
const resultlength = result.length;
const numofstars = 3;
const numofhearts = 15;
const time = "40:32";
const numofflashcard = 7;
const totalnumofflashcard = 9;

export default function Sum({navigation}) {
  const {height, width} = useWindowDimensions();

  const renderHeart = () => {
    return (<View style={style.subsubContainer}>
        <Text style={{
            color: colors.black_green,
            fontWeight: "bold",
            fontSize: 24
        }}>{numofhearts+" "}</Text>
        <FontAwesomeIcon icon={faHeart}  color={colors.red} size={32}/>
      </View>)
  }

  const renderStars = () => {
    if (numofstars==3)
      return (
        <View style={style.subsubContainer}>
          <FontAwesomeIcon icon={faStar}  color={colors.yellow} size={32}/>
          <FontAwesomeIcon icon={faStar}  color={colors.yellow} size={32}/>
          <FontAwesomeIcon icon={faStar}  color={colors.yellow} size={32}/>
        </View>
      )
    if (numofstars==2)
      return (
        <View style={style.subsubContainer}>
          <FontAwesomeIcon icon={faStar}  color={colors.yellow} size={32}/>
          <FontAwesomeIcon icon={faStar}  color={colors.yellow} size={32}/>
        </View>
      )
    return (
      <View style={style.subsubContainer}>
        <FontAwesomeIcon icon={faStar}  color={colors.yellow} size={32}/>
      </View>
    )
  }

  const renderTime = () => {
    return (
        <View style={{flex: 1, flexDirection: "row", width: "80%", height: "5%", top: "5%"}}>
            <View style={{flex: 0.8}}>
                <Text style={style.textleft}>Thời gian hoàn thành</Text> 
            </View>
            <View style={{flex: 0.2}}>
                <Text style={style.textright}>{time}</Text>
            </View>
        </View>
    )
  }

  const renderFlashcardResult = () => {
    return (
        <View style={{flex: 1, flexDirection: "row", width: "80%", height: "5%", top: "5%"}}>
            <View style={{flex: 0.8}}>
                <Text style={style.textleft}>Số flashcard nhận được</Text> 
            </View>
            <View style={{flex: 0.2}}>
                <Text style={style.textright}>{numofflashcard+'/'+totalnumofflashcard}</Text>
            </View>
        </View>
    )
  }

  const renderNodeResult = () => {
    let temp = result.slice(0,resultlength-1);
    return temp.map((node, index) =>(
        <View style={{flex: 1, flexDirection: "row", width: "80%", height: "5%", top: "2%"}}>
            <View style={{flex: 1}}>
                <Text style={style.textleft}>{'   '+node.key}</Text> 
            </View>
            <View style={{flex: 1}}>
                <Text style={style.textright}>{node.point+'/'+node.totalnumofquiz}</Text>
            </View>
        </View>
    ))
  }

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require('./../../../assets/images/bg.png')} style={styles.bg}>
        <View style={style.mascotcontainer}>
            <MascotHappy width={width*0.6}
              height={height*0.6}
              viewBox='-50 -132 390 780'/>
        </View>
          <TouchableOpacity style={styles.close} onPress={() => navigation.navigate("MyTabs")}>
            <FontAwesomeIcon icon="xmark"  color={colors.black} size={32}/>
          </TouchableOpacity>
          <View style={style.container}>
            <Text style={style.title}>Tổng kết Map</Text>
            <View style={style.subcontainer}>
                <View style={{flex: 1, flexDirection: "row", width: "80%", top: "2%"}}>
                    <View style={{flex: 1}}>
                        <Text style={style.textleft}>Số câu đúng</Text> 
                    </View>
                    <View style={{flex: 1}}>
                        <Text style={style.textright}>{result[resultlength-1].point+'/'+result[resultlength-1].totalnumofquiz}</Text>
                    </View>
                </View>
                {renderNodeResult()}
                {renderFlashcardResult()}
                {renderTime()}
                {renderHeart()}
                {renderStars()}
            </View>
            <Text></Text>
          </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
    mascotcontainer: {
        width: "100%",
        height: "70%",
        alignItems: "center",
        justifyContent: "center",
    },
    container: {
        top: "40%",
        left: "10%",
        width: "80%",
        height: "50%",
        borderRadius: 20,
        backgroundColor: colors.dark_brown,
        position: "absolute"
    },
    title: {
        top: "3%",
        color: "white",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 18
    },
    subcontainer: {
        top: "5%",
        width: "100%",
        height: "90%",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
        borderColor: colors.dark_brown,
        borderWidth: 3,
        backgroundColor: "white"
    },
    textleft: {
        color: colors.black_green,
        fontSize: 16,
        textAlign: "left"
    },
    textright: {
        color: colors.black_green,
        fontSize: 16,
        textAlign: "right"
    },
    subsubContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      margin:10
    },
})