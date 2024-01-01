import React from 'react';
import {
  ImageBackground,
  SafeAreaView,
  Text,
  useWindowDimensions,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import MascotHappy from '../../../assets/svg/mascot_happy.svg';
import styles from '../styles';
import colors from '../../../assets/colors';
import GoButton from '../../components/GoButton';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);

export default function Done({route, navigation}) {
  const {height, width} = useWindowDimensions();
  const { cards } = route.params;
  const star =3;
  return (
    <SafeAreaView style={styles.container}>
        <ImageBackground source={require('./../../../assets/images/bg.png')} style={styles.bg}>
            <MascotHappy width={width}
                height={height}
                viewBox='-50 -132 390 780'/>
            <TouchableOpacity style={styles.close} onPress={() => navigation.pop(2)}>
            <FontAwesomeIcon icon="xmark"  color={colors.black} size={32}/>
            </TouchableOpacity>
            <Text style={[{top: "60%", width: "100%"},styles.heading]}>Chúc mừng!!!</Text>
            <Text style={[{top: "66%", left: "10%", width: "80%"},styles.text]}>
              Chúc mừng bạn đã hoàn thành bài học với {star} sao! 
              Bấm GO để nhận flashcard!
            </Text>
            <View>
              <FontAwesomeIcon icon="star"  color={colors.bright_gray_brown} size={13}/>
              <Text style={style.conditionText}> đúng 60% quiz </Text>
            </View>
            <View>
              <FontAwesomeIcon icon="star"  color={colors.bright_gray_brown} size={13}/>
              <Text style={style.conditionText}> đúng 80% quiz </Text>
            </View>
            <View>
              <FontAwesomeIcon icon="star"  color={colors.bright_gray_brown} size={13}/>
              <Text style={style.conditionText}> đúng 100% quiz </Text>
            </View>
            <GoButton 
            onPress={() => navigation.navigate("Flashcard", {cards: cards})}
            height={height} 
            width={width}
            top={height*0.75}
            />
        </ImageBackground>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  conditionText: {
    color: colors.bright_gray_brown,
    fontSize: 13,
  }
})