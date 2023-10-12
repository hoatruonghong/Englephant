import React, { useContext, useState }  from 'react';
import { Text, View, StyleSheet, ImageBackground, Image, TextInput, SafeAreaView, ScrollView, FlatList, TouchableOpacity } from "react-native";
import Buttons from "./../../components/Buttons";
import colors from './../../../assets/colors';
import TalkRoomItem from './../../components/TalkRoom';
const talkRoomData = [
    {
        id: "1",
        avatar: require("./../../../assets/images/mascot.png"),
        fullname: "Kole Ferdy",
        age: 25,
        nationality: require("./../../../assets/images/flag.png"),
        session: "16h00-16h30",
        introduction: "Nice to see you guy. I'll help you improve speaking skill.",

    },  
    {
        id: "2",
        avatar: require("./../../../assets/images/mascot.png"),
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
  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity style={styles.headerIcon} onPress={() => navigation.goBack()}>
                <Image source={require("./../../../assets/images/back-icon-white.png")} />
            </TouchableOpacity>
            <Text style={styles.headerText}>Phòng giao tiếp</Text>
        </View>
        {/* <ScrollView> */}

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
                        <Image
                            style={styles.smallIcon}
                            source={require("./../../../assets/images/peanut-icon.png")}
                        />
                        <Text style={styles.smallText}>1</Text>
                        <Image
                            style={styles.smallIcon}
                            source={require("./../../../assets/images/add-icon.png")}
                        />
                    </View>
                    <View style={styles.wrapIcon}>
                        <Image
                            style={styles.smallIcon}
                            source={require("./../../../assets/images/clock-icon.png")}
                        />
                        <Text style={styles.smallText}>60:00</Text>
                        <Image
                            style={styles.smallIcon}
                            source={require("./../../../assets/images/add-icon.png")}
                        />
                    </View>
                </View>
                <View style={styles.infoRightContent}>
                    <Image source={require("./../../../assets/images/elephant.png")} />
                </View>
            </View>
        </View>
        <View style={styles.wrapTalkRooms}>
            <FlatList
                nestedScrollEnabled 
                showsHorizontalScrollIndicator={false}
                data={talkRoomData}
                renderItem={TalkRoomItem}
                keyExtractor={(item) => item.id}
            />
        </View>
        {/* </ScrollView> */}

    </View>

  )
};


const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: colors.brightest_green,
    },
    header: {
        height: '7.%',
        backgroundColor: colors.dark_green,
        borderWidth: 1.5,
        borderColor: colors.bright_gray_brown,
        flexDirection: 'row',
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
    wrapInfo: {
        backgroundColor: colors.white,
        marginTop: '3%',
        marginBottom: 0,
        marginLeft: '6%',
        marginRight: '6%',
        backgroundColor: colors.white,
        borderWidth: 3,        
        borderRadius: 16,
        borderColor: colors.bright_gray_brown,
        padding: '3%',
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
        backgroundColor: colors.white,
        flex: 1,
        height: '60%',  
        borderWidth: 2,        
        borderRadius: 20,
        borderColor: colors.bright_gray_brown,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginRight: '8%',
        marginLeft: '4%',
        marginTop: 5,
        paddingLeft: 10,
        paddingRight: 10,
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
        marginTop: '2%',
        marginLeft: '6%',
        marginRight: '6%',
        marginBottom: '20%',
    },

});
