import React, { useState }  from 'react';
import { Text, View, StyleSheet, Modal, TouchableOpacity } from "react-native";
import colors from './../../assets/colors';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

function ChooseModal(props) {
  const { onPress, title, visible, setModalVisible } = props;

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <View style={styles.modalTitle}>
              <Text style={styles.modalTitleText}>Chọn phòng</Text>
            </View>
            <TouchableOpacity onPress={()=>setModalVisible(false)}>
              <FontAwesomeIcon icon="fa-solid fa-xmark" size={24} color={colors.white} style={styles.modalTitleIcon}/>
            </TouchableOpacity>
          </View>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.modalTimeItem}>
              <Text style={styles.modalTimeTitle}>15 phút</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalTimeItem}>
              <Text style={styles.modalTimeTitle}>20 phút</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalTimeItem}>
              <Text style={styles.modalTimeTitle}>30 phút</Text>
            </TouchableOpacity>
          </View>                        
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.blue,
  },
  modalContainer: {
    width: '83%',
    backgroundColor: colors.shadow_gray_brown,
    alignSelf: 'center',
    alignItems: 'center',
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
  modalTimeItem: {
    backgroundColor: colors.white,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.bright_gray_brown,
    marginBottom: '2%',
    alignItems: 'center',
    padding: '6%',
  },
  modalTimeTitle: {
    color: colors.black_green,
    fontSize: 20,
    fontWeight: 'regular',
  }
});

module.exports = {
  ChooseModal
}