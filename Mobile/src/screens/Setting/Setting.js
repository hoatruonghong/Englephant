import React, { useContext, useState }  from 'react';
import { Text, View, StyleSheet, ImageBackground, Image, TextInput, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import Buttons from "./../../components/Buttons";
import colors from './../../../assets/colors';
import { useLogin } from './../../context/LoginProvider';

export default function Setting({navigation}) {
    const { setIsLoggedIn } = useLogin();
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.headerIcon} onPress={() => navigation.goBack()}>
                    <Image source={require("./../../../assets/images/back-icon-white.png")} />
                </TouchableOpacity>
                <Text style={styles.headerText}>Cài đặt tài khoản</Text>
            </View>
            <View style={styles.wrapFeature}>
                <TouchableOpacity style={styles.feature}  onPress={() => navigation.navigate('UserInfo')}>
                    <Image style={styles.featureIcon} source={require("./../../../assets/images/user-icon.png")} />
                    <Text style={styles.featureText}>Cập nhật thông tin</Text>
                </TouchableOpacity>
                <View style={styles.feature}>
                    <Image style={styles.featureIcon} source={require("./../../../assets/images/key-icon.png")} />
                    <Text style={styles.featureText}>Đổi mật khẩu</Text>
                </View>
                <View style={styles.feature}>
                    <Image style={styles.featureIcon} source={require("./../../../assets/images/support-icon.png")} />
                    <Text style={styles.featureText}>Hỗ trợ</Text>
                </View>
                <View style={styles.feature}>
                    <Image style={styles.featureIcon} source={require("./../../../assets/images/chat-icon.png")} />
                    <Text style={styles.featureText}>Góp ý</Text>
                </View>
                <View style={styles.feature}>
                    <Image style={styles.featureIcon} source={require("./../../../assets/images/delete-icon.png")} />
                    <Text style={styles.featureText}>Xóa tài khoản</Text>
                </View>
            </View>
            <View style={styles.wrapButton}>
                <Buttons.RedButton title="Đăng xuất" onPress={()=>setIsLoggedIn(false)}/>
            </View>
            
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
        marginLeft: '13%',
        flex: 8,
    },
    wrapFeature: {
        flex: 8,
        marginTop: 20,
        // justifyContent: 'center',

    },
    feature: {
        backgroundColor: colors.white,
        borderWidth: 1.5,        
        borderRadius: 16,
        borderColor: colors.bright_gray_brown,
        padding: 10,
        marginLeft: 30,
        marginRight: 30,
        marginTop: 15,
        flexDirection: 'row',
        elevation: 10,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity:  0.25,
        shadowRadius: 4,
        shawdowColor: colors.shadow_gray_brown,
    },
    featureIcon: {
        marginLeft: 10,
    },
    featureText: {
        color: colors.black_green,
        fontSize: 16,
        fontWeight: "500",
        marginLeft: 20,
    },
    wrapButton: {
        flex: 3,
        alignItems: 'center',
        marginLeft: 30,
        marginRight: 30,
        // marginBottom: '30%',
    }

  });
