import React, { useState }  from 'react';
import { Text, View, StyleSheet, Modal, TouchableOpacity, useWindowDimensions } from "react-native";
import colors from './../../assets/colors';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import PeanutIcon from './../../assets/svg/peanut.svg';
import PeanutPurchase from './../../assets/svg/peanut_purchase.svg';

//Choose talkroom: timeItem
function TimeItem(props) {
  const { onPress, time } = props;

  return (
    <TouchableOpacity style={styles.container}>
        <Text style={styles.text}>{time} phút</Text>
    </TouchableOpacity>
  );
}

//Buy peanuts: peanutItem
function BuyPeanutItem(props) {
    const { onPress, peanut, price } = props;
  
    return (
      <TouchableOpacity style={styles.container}>
        <View style={styles.buyPeanutWrap}>
            <View style={styles.rowWrap}>
                <Text style={styles.text}>{peanut}</Text>
                <PeanutIcon />
            </View>
            <Text style={styles.text}>{price} đ</Text>
        </View>
      </TouchableOpacity>
    );
}

//Change peanuts to get time: peanutItem
function MoreTimeItem(props) {
    const { onPress, peanut, time } = props;
  
    return (
      <TouchableOpacity style={styles.container}>
        <View style={styles.buyPeanutWrap}>
            <Text style={styles.text}>{time} phút</Text>

            <View style={styles.rowWrap}>
                <Text style={styles.text}>{peanut}</Text>
                <PeanutIcon />
            </View>
        </View>
      </TouchableOpacity>
    );
}

//Change peanuts to get time: buyPeanutButton
function BuyPeanutButton(props) {
    const { onPress } = props;
    const {width, height} = useWindowDimensions();

    return (
      <TouchableOpacity style={styles.container}>
        <View style={styles.btnWrap}>
            <Text style={styles.text}>Mua đậu</Text>
            <PeanutPurchase/>
        </View>
      </TouchableOpacity>
    );
}

//Change peanuts to get time: peanutItem
function MoreBudItem(props) {
    const { onPress, bud, heart } = props;
  
    return (
      <TouchableOpacity style={styles.container}>
        <View style={styles.columnWrap}>
            <View style={styles.rowWrap}>
                <Text style={styles.text}>{bud}</Text>
                <FontAwesomeIcon icon="fa-solid fa-seedling" size={20} color={colors.main_green}/>
            </View>
            <View style={styles.rowWrap}>
                <Text style={styles.text}>{heart}</Text>
                <FontAwesomeIcon icon="fa-solid fa-heart" size={20} color={colors.red}/>
            </View>
        </View>
      </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: colors.bright_gray_brown,
        marginBottom: '2%',
        alignItems: 'center',
        padding: '6%',
    },
    text: {
        color: colors.black_green,
        fontSize: 20,
        fontWeight: 'regular',
    },

    buyPeanutWrap: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    rowWrap: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    btnWrap: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
    }
});

module.exports = {
    TimeItem, BuyPeanutItem, MoreTimeItem, BuyPeanutButton, MoreBudItem
}