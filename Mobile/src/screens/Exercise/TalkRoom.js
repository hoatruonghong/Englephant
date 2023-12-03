import React, { useContext, useState, useEffect }  from 'react';
import { Modal, Text, View, StyleSheet, Image, FlatList, TouchableOpacity, useWindowDimensions } from "react-native";
import GoButton from '../../components/GoButton';
import TalkRoomItem from './../../components/TalkRoom';
import IconWrap from './../../components/IconWrap';
import Modals from './../../components/Modals';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import colors from './../../../assets/colors';
import { useLogin } from '../../context/LoginProvider';

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
const timeModalData = [15,20,30];

const buyPeanutModalData = [
    {
        peanut: 10, price: 10000
    },
    {
        peanut: 15, price: 15000
    },
    {
        peanut: 20, price: 20000
    }
];
const moreTimeModalData = [
    {
        time: 10, peanut: 10
    },
    {
        time: 15, peanut: 10
    },
    {
        time: 20, peanut: 10
    },
    {
        time: 40, peanut: 40
    }
];

export default function TalkRoom({navigation}) {
    const [modalVisible, setModalVisible] = useState(false);
    const {height, width} = useWindowDimensions();
    const {profile, learnerId} = useLogin();
    const [peanut, setPeanut] = useState(profile.peanut);
    const [talkroomTime, setTalkroomTime] = useState(profile.talkroomTime);


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
                        <IconWrap name="peanut" num={peanut} hasPlus={true}/>
                    </View>
                    <View style={styles.wrapIcon}>
                        <IconWrap name="time" num={talkroomTime} hasPlus={true}/>
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
        // setModalVisible(true);
        navigation.navigate('TutorRoom');
    };

    const ChooseRoomModal = () => {
        return (
            <View>
                <Modals.MultipleSelectModal 
                visible={modalVisible} 
                setModalVisible={setModalVisible}
                title='ChooseRoom'
                data={timeModalData}
                />
                {/* <Modals.MultipleSelectModal 
                visible={modalVisible} 
                setModalVisible={setModalVisible}
                title='BuyPeanut'
                data={buyPeanutModalData}
                /> */}
                {/* <Modals.MultipleSelectModal 
                visible={modalVisible} 
                setModalVisible={setModalVisible}
                title='MoreTime'
                data={moreTimeModalData}
                /> */}
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
            <GoButton 
                onPress={()=>handleGoButton()}
                height={height} 
                width={width}
            />
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
