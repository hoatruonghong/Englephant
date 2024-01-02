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
import { faHeart, faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar} from '@fortawesome/free-regular-svg-icons/faStar';

export default function RevisionNode({route, navigation}) {
  const heartperstar=2;
  const {result} = route.params;
  const time = result.time;
  const numofstars = result.star;
  const numofhearts = numofstars*heartperstar;
  const numofcard = result.numofcard;
  const {height, width} = useWindowDimensions();

  const renderHeart = () => {
    return (
        <View style={{flex: 0.15, flexDirection: "row", width: "85%", height: "5%", top: "5%"}}>
            <View style={{flex: 0.1}}>
                <FontAwesomeIcon icon={faHeart}  color={colors.red} size={18}/>
            </View>
            <View style={{flex: 0.8}}>
                <Text style={style.textleft}>nhận được</Text> 
            </View>
            <View style={{flex: 0.1}}>
                <Text style={style.textright}>{numofhearts}</Text>   
            </View>
        </View>
    )
  }

  const renderStars = () => {
    const size = 40;
    return (
        <View style={style.subsubContainer}>
            <FontAwesomeIcon icon={numofstars>0?faStar: farStar}  color={colors.yellow} size={size}/>
            <FontAwesomeIcon icon={numofstars>1?faStar: farStar}  color={colors.yellow} size={size}/>
            <FontAwesomeIcon icon={numofstars==3?faStar: farStar}  color={colors.yellow} size={size}/>
        </View>
    )
  }

  const renderTime = () => {
    return (
        <View style={{flex: 0.15, flexDirection: "row", width: "85%", height: "5%", top: "5%"}}>
            <View style={{flex: 0.8}}>
                <Text style={style.textleft}>Thời gian hoàn thành (s)</Text> 
            </View>
            <View style={{flex: 0.2}}>
                <Text style={style.textright}>{time}</Text>
            </View>
        </View>
    )
  }

  const renderFlashcardResult = () => {
    if (numofcard==0) return;
    return (
        <View style={{flex: 0.15, flexDirection: "row", width: "85%", height: "5%", top: "5%"}}>
            <View style={{flex: 0.8}}>
                <Text style={style.textleft}>Số flashcard nhận được</Text> 
            </View>
            <View style={{flex: 0.2}}>
                <Text style={style.textright}>{numofcard}</Text>
            </View>
        </View>
    )
  }

  const renderStarResult = () => {
    return (
        <View style={{flex: 0.4}}>
            <View style={{flex: 1/3, flexDirection: "row", width: "85%", height: "5%", top: "2%"}}>
                <FontAwesomeIcon icon={numofstars>=1? faStar : farStar }  color={colors.yellow} size={16}/>
                <Text style={style.text}> đúng 60% quiz </Text>
            </View>
            <View style={{flex: 1/3, flexDirection: "row", width: "85%", height: "5%", top: "2%"}}>
                <FontAwesomeIcon icon={numofstars>=2? faStar : farStar }  color={colors.yellow} size={16}/>
                <Text style={style.text}> đúng 80% quiz </Text>
            </View>
            <View style={{flex: 1/3, flexDirection: "row", width: "85%", height: "5%", top: "2%"}}>
                <FontAwesomeIcon icon={numofstars==3? faStar : farStar }  color={colors.yellow} size={16}/>
                <Text style={style.text}> đúng 100% quiz </Text>
            </View>
        </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require('./../../../assets/images/bg.png')} style={styles.bg}>
        <View style={style.mascotcontainer}>
            <MascotHappy width={width*0.6}
              height={height*0.6}
              viewBox='-50 -132 390 780'/>
        </View>
          <TouchableOpacity style={styles.close} onPress={() => navigation.pop(4)}>
            <FontAwesomeIcon icon="xmark"  color={colors.black} size={32}/>
          </TouchableOpacity>
          <View style={style.container}>
            <Text style={style.title}>Tổng kết</Text>
            <View style={style.subcontainer}>
                {renderStars()}
                {renderStarResult()}
                {renderHeart()}
                {renderFlashcardResult()}
                {renderTime()}
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
    text: {
        color: colors.black_green,
        fontSize: 16,
        textAlign: "center"
    },
    textleft: {
        color: colors.black_green,
        fontSize: 18,
        textAlign: "left",
        fontWeight: "bold",
    },
    textright: {
        color: colors.black_green,
        fontSize: 18,
        textAlign: "right",
        fontWeight: "bold",
    },
    subsubContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      margin:10
    },
})