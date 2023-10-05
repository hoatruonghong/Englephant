import React from "react";
import { Text, View, StyleSheet, Pressable, Image, TouchableOpacity } from "react-native";
import colors from './../../assets/colors';
import { FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

function HeartWrap(props) {
  const { onPress, num } = props;
  return (
    <View style={[styles.container, styles.noPlus]}>
        <FontAwesomeIcon icon="fa-solid fa-heart" style={[styles.smallIcon, styles.iconHeart]} />
        <Text style={styles.smallText}>{num}</Text>
    </View>
  );
}

function PeanutWrap(props) {
  const { onPress, num } = props;
  return (
    <View style={[styles.container, styles.hasPlus]}>
        <Image style={styles.smallIcon}
            source={require("./../../assets/images/peanut-icon.png")}
        />
        <TouchableOpacity style={styles.rightSide}>
            <Text style={styles.smallText}>{num}</Text>            
            <FontAwesomeIcon icon="fa-solid fa-circle-plus"  style={[styles.smallIcon,styles.iconPlus]} />
        </TouchableOpacity>
    </View>
  );
}

function CardWrap(props) {
    const { onPress, currentNum, totalNum } = props;
    return (
      <View style={[styles.container, styles.noPlus]}>
          <Image style={styles.smallIcon}
              source={require("./../../assets/images/card-icon.png")}
          />
          <Text style={styles.smallText}>{currentNum}/{totalNum}</Text>
      </View>
    );
}

function BudWrap(props) {
    const { onPress, num } = props;
    return (
      <View style={[styles.container, styles.hasPlus]}>
          <Image style={styles.smallIcon}
              source={require("./../../assets/images/bud-icon.png")}
          />
          <View style={styles.rightSide}>
              <Text style={styles.smallText}>{num}</Text>
              <FontAwesomeIcon icon="fa-solid fa-circle-plus"  style={[styles.smallIcon,styles.iconPlus]} />
          </View>
      </View>
    );
}

function TimeWrap(props) {
    const { onPress, time } = props;
    return (
      <View style={[styles.container, styles.noPlus]}>
          <Image style={styles.smallIcon}
              source={require("./../../assets/images/clock-icon.png")}
          />
          <Text style={styles.smallText}>{time}</Text>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        height: '100%',  
        borderWidth: 2,        
        borderRadius: 20,
        borderColor: colors.bright_gray_brown,
    },
    noPlus:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 0,
        paddingLeft: 10,
        paddingRight: 10,
    },
    hasPlus: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
    },
    iconHeart: {
        color: colors.red,
        size: 40,
    },
    iconPlus: {
        color: colors.shadow_gray_brown,
    },
    rightSide: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    smallIcon: {
    },
    smallText: {
        color: colors.black_green,
        fontSize: 18,
        fontWeight: "500",
        marginRight: 5,
    },
  });

module.exports = {
    HeartWrap, PeanutWrap, CardWrap, BudWrap, TimeWrap
}