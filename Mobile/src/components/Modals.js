import React, { useState }  from 'react';
import { Text, View, StyleSheet, Modal, TouchableOpacity, FlatList } from "react-native";
import colors from './../../assets/colors';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import ModalItems from './ModalItems';
import MascotDef from '../../assets/svg/mascot_default.svg';
import MascotCry from '../../assets/svg/mascot_cry.svg';
import { RedButton, BlueButton } from "./Buttons.js";

const modalTitle = (title) => {
  switch (title) {
    case 'ChooseRoom':
      return "Chọn phòng"
    case 'BuyPeanut':
      return "Mua đậu"
    case 'MoreTime':
      return "Đổi đậu";
    case 'MoreBud':
      return "Đổi mầm"
    default:
      return "Modal";
  }
}

const modalItem = (item, title, id, setModalVisible, navigation) => {
  switch (title) {
    case 'ChooseRoom':
      return <ModalItems.TimeItem time={item} key={id} setModalVisible={setModalVisible} navigation={navigation} />
    case 'BuyPeanut':
      return <ModalItems.BuyPeanutItem peanut={item.peanut} price={item.price} key={id} setModalVisible={setModalVisible} />
    case 'MoreTime':
      return <ModalItems.MoreTimeItem peanut={item.peanut} time={item.time} key={id} setModalVisible={setModalVisible} />
    case 'MoreBud':
      break;
    default:
      break;
  }
}

const modalBtn = (title, setModalVisible) => {
  switch (title) {
    case 'MoreTime':
      return <ModalItems.BuyPeanutButton setModalVisible={setModalVisible}/>
    case 'MoreBud':
      return <ModalItems.BuyPeanutButton />
    default:
      break;
  }
}

//ChooseRoom, Buy peanut
function MultipleSelectModal(props) {
  const { onPress, visible, setModalVisible, title, data, navigation } = props;
  return (
    <View>
      <Modal
        animationType="slide"
        visible={visible}
        transparent={true}   
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <View style={styles.modalTitle}>
              <Text style={styles.modalTitleText}>{modalTitle(title)}</Text>
            </View>
            <TouchableOpacity onPress={()=>{setModalVisible(false)}}>
              <FontAwesomeIcon icon="fa-solid fa-xmark" size={24} color={colors.white}/>
            </TouchableOpacity>
          </View>
          <View style={styles.modalContent}>
            {
              data.map((item, id) => {
                return (
                  modalItem(item, title, id, setModalVisible, navigation)
                )
              })
            }
            {modalBtn(title, setModalVisible)}
          </View>                        
        </View>
      </Modal>
    </View>
  );
}

//More time
function MoreTimeModal(props) {
  const { onPress, visible, setModalVisible, title, data, navigation } = props;
  return (
    <View>
      <Modal
        animationType="slide"
        visible={visible}
        transparent={true}        
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <View style={styles.modalTitle}>
              <Text style={styles.modalTitleText}>{modalTitle(title)}</Text>
            </View>
            <TouchableOpacity onPress={()=>{setModalVisible(false)}}>
              <FontAwesomeIcon icon="fa-solid fa-xmark" size={24} color={colors.white} style={styles.modalTitleIcon}/>
            </TouchableOpacity>
          </View>
          <View style={styles.modalContent}>
            <FlatList              
              data={data}
              renderItem={(item, index)=> modalItem(item.item, title, index, setModalVisible, navigation)}
              keyExtractor={(item, index) => index}
              horizontal={false}
              numColumns={2}
              columnWrapperStyle={{justifyContent: 'space-between'}}
            />
            {modalBtn(title, setModalVisible)}
          </View>                        
        </View>
      </Modal>
    </View>
  );
}

//Not enough time
function NotEnoughTimeModal(props) {
  const { onPress, visible, setModalVisible, title, data, navigation } = props;
  return (
    <View>
      <Modal
        animationType="slide"
        visible={visible}
        transparent={true}        
      >
        <View style={styles.infoModalContainer}>
          <View style={styles.infoModalHeader}>
            <View style={styles.infoModalTitle}>
              <Text style={styles.infoModalTitleText}>Không đủ thời gian</Text>
            </View>
            <TouchableOpacity onPress={()=>{setModalVisible(false)}}>
              <FontAwesomeIcon icon="fa-solid fa-xmark" size={24} color={colors.bright_gray_brown} style={styles.modalTitleIcon}/>
            </TouchableOpacity>
          </View>
          <MascotCry viewBox='0 0 68 90'/>
          <Text style={styles.infoModalText}>Bạn có muốn đổi thêm thời gian?</Text>
          <View style={styles.infoModalContent}>
            <View style={styles.infoModalBtn}>
              <RedButton title="Thoát" onPress={()=>{setModalVisible(false)}} />
            </View>
            <View style={styles.infoModalBtn}>
              <BlueButton title="Đổi" onPress={()=>{setModalVisible('moreTime')}} />
            </View>    
          </View>                        
        </View>
      </Modal>
    </View>
  );
}

//Waiting for register
function WaitingModal(props) {
  const { onPress, visible, setModalVisible, title, content, navigation } = props;
  return (
    <View>
      <Modal
        animationType="slide"
        visible={visible}
        transparent={true}        
      >
        <View style={styles.infoModalContainer}>
          <View style={styles.infoModalHeader}>
            <View style={styles.infoModalTitle}>
              <Text style={styles.infoModalTitleText}>{title}</Text>
            </View>
            <TouchableOpacity onPress={()=>{setModalVisible(false)}}>
              <FontAwesomeIcon icon="fa-solid fa-xmark" size={24} color={colors.bright_gray_brown} style={styles.modalTitleIcon}/>
            </TouchableOpacity>
          </View>
          <MascotDef/>
          <Text style={styles.infoModalText}>{content}</Text>          
        </View>
      </Modal>
    </View>
  );
}
//Use peanut to get time

//Confirm join tutorroom
function ConfirmJoinModal(props) {
  const { onPress, visible, setModalVisible, title, data, navigation } = props;
  return (
    <View>
      <Modal
        animationType="slide"
        visible={visible}
        transparent={true}        
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <View style={styles.modalTitle}>
              <Text style={styles.modalTitleText}>{modalTitle(title)}</Text>
            </View>
            <TouchableOpacity onPress={()=>{setModalVisible(false)}}>
              <FontAwesomeIcon icon="fa-solid fa-xmark" size={24} color={colors.white} style={styles.modalTitleIcon}/>
            </TouchableOpacity>
          </View>
          <View style={styles.modalContent}>
            <FlatList              
              data={data}
              renderItem={(item, index)=> modalItem(item.item, title, index, setModalVisible, navigation)}
              keyExtractor={(item, index) => index}
              horizontal={false}
              numColumns={2}
              columnWrapperStyle={{justifyContent: 'space-between'}}
            />
            {modalBtn(title, setModalVisible)}
          </View>                        
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '83%',
    backgroundColor: colors.shadow_gray_brown,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.shadow_gray_brown,
    marginTop: '50%',
  },
  modalHeader: {
    width: '100%',
    backgroundColor: colors.shadow_gray_brown,
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.shadow_gray_brown,
    padding: 8,
  },
  modalTitle: {
    width: '92%',
  },
  modalTitleText: {
    color: colors.white,
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: 'medium',
  },
  modalTitleIcon: {
  },
  modalContent: {
    backgroundColor: colors.brightest_green,
    width: '100%',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.shadow_gray_brown,
    padding: '4%',
    paddingBottom: '2%',
  },

  /**Infor modal */
  infoModalContainer: {
    width: '83%',
    backgroundColor: colors.white,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.bright_gray_brown,
    marginTop: '50%',
    paddingLeft: '2%',
    paddingRight: '2%',
  }, 
  infoModalHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
  },
  infoModalTitleText: {
    color: colors.black_green,
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  infoModalContent: {
    width: '100%',
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: '5%',
    paddingTop: '5%'
  },
  infoModalBtn: {
    flex: 0.45,
  },
  infoModalText: {
    color: colors.black_green,
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: 'medium',
  },
});

module.exports = {
  MultipleSelectModal, MoreTimeModal, ConfirmJoinModal, NotEnoughTimeModal, WaitingModal
}