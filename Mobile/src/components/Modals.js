import React, { useState }  from 'react';
import { Text, View, StyleSheet, Modal, TouchableOpacity, FlatList } from "react-native";
import colors from './../../assets/colors';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import ModalItems from './ModalItems';

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
              <FontAwesomeIcon icon="fa-solid fa-xmark" size={24} color={colors.white} style={styles.modalTitleIcon}/>
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
});

module.exports = {
  MultipleSelectModal, MoreTimeModal
}