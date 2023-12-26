import React, { useState }  from 'react';
import { Text, View, StyleSheet, Modal, TouchableOpacity, useWindowDimensions } from "react-native";
import colors from './../../assets/colors';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import PeanutIcon from './../../assets/svg/peanut.svg';
import PeanutPurchase from './../../assets/svg/peanut_purchase.svg';
import Learner from './../api/Learner';
import { useLogin } from '../context/LoginProvider';

//Choose talkroom: timeItem
function TimeItem(props) {
  const { onPress, time, navigation, setModalVisible } = props;

  return (
    <TouchableOpacity style={styles.container} onPress={()=> {handleChooseRoom(time, setModalVisible, navigation)}}>
        <Text style={styles.text}>{time} phút</Text>
    </TouchableOpacity>
  );
}

const handleChooseRoom = (choosingTime, setModalVisible, navigation) => {
  if (choosingTime != 0 && choosingTime <= 20) {
    setModalVisible("none");
    navigation.navigate('TutorRoom');
  }
  else {
    setModalVisible("notEnoughTime");
  }
}

//Change peanuts to get time: peanutItem
function MoreTimeItem(props) {
    const { onPress, peanut, time, setModalVisible } = props;
    const { learnerId } = useLogin();

    return (
      <TouchableOpacity style={[styles.container, {flex: 0.49, padding: '3%'}]} onPress={()=>{handleMoreTime(time, peanut, setModalVisible, learnerId)}}>
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
const handleMoreTime = async (time, peanut, setModalVisible, learnerId) => {
  try {
    const res = await Learner.getMoreTime({learnerId: learnerId, peanut: peanut, time: time})
    console.log("success", res.data, peanut, time);
    if (!res.data.success) setModalVisible('buyPeanut');
    else setModalVisible("none");
  } catch (error) {
    console.log(error);
  }
}

//buy peanut: buyPeanutButton
function BuyPeanutButton(props) {
    const { onPress, setModalVisible } = props;
    return (
      <TouchableOpacity style={styles.container} onPress={() => {setModalVisible("buyPeanut")}}>
        <View style={styles.btnWrap}>
            <Text style={styles.text}>Mua đậu</Text>
            <PeanutPurchase/>
        </View>
      </TouchableOpacity>
    );
}

//Buy peanuts: peanutItem
function BuyPeanutItem(props) {
  const { onPress, peanut, price, setModalVisible } = props;
  const { learnerId } = useLogin();

  return (
    <TouchableOpacity style={styles.container} onPress={()=>{handleBuyPeanut(peanut, price, setModalVisible, learnerId)}}>
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
const handleBuyPeanut = async (peanut, price, setModalVisible, learnerId) => {

  //call payment api if possible
  //or call buyPeanut api
  try {
    const res = await Learner.getMorePeanut({learnerId: learnerId, peanut: peanut, price: price})
    setModalVisible("none");

  } catch (error) {
    console.log(error);
  }
}

//Change hearts to get buds: moreBudItem
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