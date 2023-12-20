import React, { useState }  from 'react';
import { Text, View, StyleSheet, Modal, TouchableOpacity } from "react-native";
import colors from './../../assets/colors';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons/faStar';
import { faStar as farStar} from '@fortawesome/free-regular-svg-icons/faStar';
import MascotExcited from '../../assets/svg/mascot_excited.svg';

//Rate tutorroom
export function RateRoomModal(props) {
    const { onPress, visible, setModalVisible, navigation } = props;
    const [rate, setRate] = useState(0);
    console.log('rate', rate);
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
                <Text style={styles.infoModalTitleText}>Đánh giá</Text>
              </View>
              <TouchableOpacity>
                <FontAwesomeIcon icon="fa-solid fa-xmark" size={24} color={colors.bright_gray_brown} style={styles.modalTitleIcon}/>
              </TouchableOpacity>
            </View>
            <MascotExcited viewBox='0 0 68 90'/>
            <View style={styles.infoModalContent}>
              <TouchableOpacity onPress={()=>{setRate(1)}}>
              <FontAwesomeIcon icon={farStar} color={colors.yellow} size={30}/>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>{setRate(2)}}>
              <FontAwesomeIcon icon={farStar} color={colors.yellow} size={30} />
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>{setRate(3)}}>
              <FontAwesomeIcon icon={farStar} color={colors.yellow} size={30}/>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>{setRate(4)}}>
              <FontAwesomeIcon icon={farStar} color={colors.yellow} size={30} />
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>{setRate(5)}}>
              <FontAwesomeIcon icon={farStar} color={colors.yellow} size={30}/>
              </TouchableOpacity>              
            </View>                        
          </View>
        </Modal>
      </View>
    );
  }
  
const styles = StyleSheet.create({
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
        paddingRight: '10%',
        paddingLeft: '10%',
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
  