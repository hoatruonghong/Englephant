import React from "react";
import { Text, View, StyleSheet, Pressable, TouchableOpacity } from "react-native";
import colors from './../../assets/colors';
import { HeartWrap, PeanutWrap, CardWrap, BudWrap, TimeWrap, Image } from './IconWrap';

const iconWrap = (item) => {
  switch (item.itemName) {
    case 'heart':
      return <HeartWrap num={item.num}/>
    case 'peanut':
      return <PeanutWrap num={item.num}/>
      break;
    case 'bud':
      return <BudWrap num={item.num}/>
      break;
    case 'card':
      return <CardWrap currentNum={item.currentNum} totalNum={item.totalNum}/>
      break;
    case 'time':
      return <TimeWrap num={item.time}/>
      break;
  }
};

function HeaderBarWithItems(props) {
  const { items } = props;  
  return (
    <View style={styles.container}>
      <View style={styles.leftSide}>
        {iconWrap(items[0])}
      </View>
      <View style={styles.rightSide}>
        {iconWrap(items[1])}
      </View>
    </View>
  );
}

function HeaderBarPlain(props) {
  const { onPress } = props;
  return (
    <View style={styles.container}>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      height: '8%',
      backgroundColor: colors.dark_green,
      borderBottomWidth: 1.5,        
      borderColor: colors.bright_gray_brown,
      flexDirection: 'row',
      alignItems: 'center',
      padding: '2%',
      paddingLeft: '10%',
      paddingRight: '10%',
    },
    leftSide: {
      flex: 1,
      marginRight: '5%',
    },
    rightSide: {
      flex: 1,
      marginLeft: '5%',
    },
    headerIcon: {
      alignSelf: 'center',
      flex: 1,
      marginLeft: '3%', 
    },
    headerText: {
        alignSelf: 'center',
        color: colors.white,
        fontSize: 24,
        fontWeight: "600",
        // textAlign: 'center',
        marginLeft: '18%',
        flex: 8,
    },
    text: {
      alignSelf: 'center',
      color: colors.white,
      fontSize: 24,
      fontWeight: "600",
      // textAlign: 'center',
      marginLeft: '18%',
      flex: 8,
    },
  });

module.exports = {
  HeaderBarWithItems, HeaderBarPlain
}