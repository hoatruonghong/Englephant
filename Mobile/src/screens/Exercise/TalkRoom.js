import React, { useContext, useState }  from 'react';
import { Modal, Text, View, StyleSheet, ImageBackground, Image, TextInput, SafeAreaView, ScrollView, FlatList, TouchableOpacity } from "react-native";
import Buttons from "./../../components/Buttons";
import colors from './../../../assets/colors';
import TalkRoomItem from './../../components/TalkRoom';
import IconWrap from './../../components/IconWrap';
import { RedButton } from './../../components/Buttons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { ChooseModal } from './../../components/Modals';

const talkRoomData = [
    {
        id: "1",
        avatar: require("./../../../assets/images/avatar.jpg"),
        fullname: "Kole Ferdy",
        age: 25,
        nationality: require("./../../../assets/images/flag.png"),
        session: "16h00-16h30",
        introduction: "Nice to see you guy. I'll help you improve speaking skill.",

    },  
    {
        id: "2",
        avatar: require("./../../../assets/images/avatar.jpg"),
        fullname: "Kole Ferdy",
        age: 25,
        nationality: require("./../../../assets/images/flag.png"),
        session: "16h00-16h30",
        introduction: "Nice to see you guy. I'll help you improve speaking skill.",

    },
    {
        id: "3",
        avatar: require("./../../../assets/images/mascot.png"),
        fullname: "Kole Ferdy",
        age: 25,
        nationality: require("./../../../assets/images/flag.png"),
        session: "16h00-16h30",
        introduction: "Nice to see you guy. I'll help you improve speaking skill.",

    }, 
    {
        id: "4",
        avatar: require("./../../../assets/images/mascot.png"),
        fullname: "Kole Ferdy",
        age: 25,
        nationality: require("./../../../assets/images/flag.png"),
        session: "16h00-16h30",
        introduction: "Nice to see you guy. I'll help you improve speaking skill.",

    }, 
    {
        id: "5",
        avatar: require("./../../../assets/images/mascot.png"),
        fullname: "Kole Ferdy",
        age: 25,
        nationality: require("./../../../assets/images/flag.png"),
        session: "16h00-16h30",
        introduction: "Nice to see you guy. I'll help you improve speaking skill.",

    }, 
];

export default function TalkRoom({navigation}) {
    const [modalVisible, setModalVisible] = useState(false);

    const renderWrapInfo = () => {
        return (
        <View style={styles.wrapInfo}>
            <View style={styles.infoHeader}>
                <View style={{flexDirection: 'row'}}>
                <Image source={require("./../../../assets/images/ellipse-pot.png")} />
                <Text style={styles.titleText}>Chào bạn,</Text>
                </View>
                <Image source={require("./../../../assets/images/ellipse-pot.png")} />
            </View>
            <View style={styles.infoContent}>
                <View style={styles.infoLeftContent}>                    
                    <Text style={styles.smallText}>Hiện bạn đang có</Text>
                    <View style={styles.wrapIcon}>
                        <IconWrap name="peanut" num={10} hasPlus={true}/>
                    </View>
                    <View style={styles.wrapIcon}>
                        <IconWrap name="time" num={60} hasPlus={true}/>
                    </View>
                </View>
                <View style={styles.infoRightContent}>
                    <Image source={require("./../../../assets/images/elephant.png")} />
                </View>
            </View>
        </View>
        );
    };
    
    const handleGoButton = () => {
        setModalVisible(true);
    };

    const ChooseRoomModal = () => {
        return (
            <View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={()=> setModalVisible(false)}
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
                {/* <ChooseModal visible={modalVisible} setModalVisible={setModalVisible}/> */}
            </View>
        );
    };

    return (
    <View style={styles.container}>        
        <View style={styles.wrapTalkRooms}>
            <FlatList
                nestedScrollEnabled={true} 
                showsHorizontalScrollIndicator={false}
                ListHeaderComponent={renderWrapInfo}
                data={talkRoomData}
                renderItem={TalkRoomItem}
                keyExtractor={(item) => item.id}
            />
        </View>
        <View style={styles.wrapChoose}>
            <RedButton title="GO" onPress={handleGoButton} />
        </View>
        {ChooseRoomModal()}
    </View>

  )
};


const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: colors.brightest_green,
    },
    wrapInfo: {
        backgroundColor: colors.white,
        marginTop: '3%',
        marginBottom: 10,
        backgroundColor: colors.white,
        borderWidth: 3,        
        borderRadius: 16,
        borderColor: colors.bright_gray_brown,
        padding: '3%',
        elevation: 0,
    },
    infoHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    infoContent: {
        flexDirection: 'row',
    },
    infoLeftContent: {
        flex: 1,
    },
    wrapIcon: {
        flex: 1,
        marginRight: '8%',
        marginTop: 5,
    },  
    smallText: {
        color: colors.black_green,
        fontSize: 18,
        fontWeight: "500",
    },
    titleText: {
        color: colors.black_green,
        fontSize: 24,
        fontWeight: "500",
    },
    infoRightContent: {
        flex: 1,
        alignItems: 'center',
    },
    wrapTalkRooms: {
        elevation: 0,
        marginTop: '2%',
        marginLeft: '6%',
        marginRight: '6%',
    },    
    wrapChoose: {
        backgroundColor: 'rgba(230, 250, 167, 0.5)',
        position: 'absolute',
        elevation: 1,
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 0,
        height: '20%',
        width: '100%',
        paddingLeft: '33.3%',
        paddingRight: '33.3%',  
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
