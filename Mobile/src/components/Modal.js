import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View, TouchableOpacity} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);

import colors from '../../assets/colors';
import styles from '../screens/styles';
import MascotDef from '../../assets/svg/mascot_default.svg';
import MascotCry from '../../assets/svg/mascot_cry.svg';

export function NotiModal({modalVisible, setModalOff, image, title, content}) {
  return (
    <Modal 
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => {
      setModalOff();
    }}
>
  <View style={styles.wrapper}>
  <View style={styles.modalView}>
    <View style={{flexDirection:'row', width: "100%"}}>
    <TouchableOpacity style={[style.close, {right: "4%"}]} onPress={()=>setModalOff()}>
          <FontAwesomeIcon icon="xmark"  color={colors.black} size={30}/>
      </TouchableOpacity>
      <Text style={styles.titleStyle}>{title}</Text>
    </View>
    <View style={{width: 90, height: 68, marginTop: "5%"}}>
      {image === "cry"? 
        <MascotCry viewBox='0 0 68 90'/>: 
        <MascotDef viewBox='0 0 68 90'/>}
    </View>
    <Text style={[styles.textStyle, {textAlign: 'center'}]}>{content}</Text>
  </View>
  </View>
      
</Modal>
  );
};

export function ExchangeModal({modalVisible, setModalOff, image, title, content, width}) {
    return (
        <View style={styles.modalView}>
            <TouchableOpacity style={styles.close} onPress={setModalOff}>
                <FontAwesomeIcon icon="xmark"  color={colors.black} size={90}/>
            </TouchableOpacity>
            <Text style={styles.titleStyle}>{title}</Text>
            <Text style={styles.textStyle}>{content}</Text>
        </View>
    );
  };

const style = StyleSheet.create({
  modalView: {
    width: "80%",
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.bright_gray_brown,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 5,
    zIndex: 5,
  },
  titleStyle: {
    color: colors.black,
    fontSize: 24,
    fontWeight: "bold",
    left: "10%"
  },
  text: {
    color: colors.black,
    fontSize: 16,
  },
});