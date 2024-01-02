import React, { useContext, useState }  from 'react';
import { Text, View, StyleSheet, ImageBackground, Image, TextInput, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import { FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import Buttons from "./../../components/Buttons";
import colors from './../../../assets/colors';
import { useLogin } from './../../context/LoginProvider';

export default function Setting({navigation}) {
    const { setIsLoggedIn, setLearnerId, setProfile } = useLogin();

    const handleLogout = () => {
        setIsLoggedIn(false);
        setLearnerId("");
    }

    return (
        <View style={styles.container}>
            <View style={styles.wrapFeature}>
                <TouchableOpacity style={styles.feature}  onPress={() => navigation.navigate('UserInfo')}>
                    <FontAwesomeIcon icon="fa-solid fa-user" size={20} color={colors.bright_gray_brown} style={styles.featureIcon}/>
                    <Text style={styles.featureText}>Cập nhật thông tin</Text>
                </TouchableOpacity>
                <View style={styles.feature}>
                    <FontAwesomeIcon icon="fa-solid fa-key" size={20} color={colors.bright_gray_brown} style={styles.featureIcon}/>
                    <Text style={styles.featureText}>Đổi mật khẩu</Text>
                </View>
                <TouchableOpacity style={styles.feature} onPress={()=> navigation.navigate('Welcome')}>
                    <FontAwesomeIcon icon="fa-solid fa-headset" size={20} color={colors.bright_gray_brown} style={styles.featureIcon}/>
                    <Text style={styles.featureText}>Hỗ trợ</Text>
                </TouchableOpacity>
                <View style={styles.feature}>
                    <FontAwesomeIcon icon="fa-solid fa-comments" size={20} color={colors.bright_gray_brown} style={styles.featureIcon}/>
                    <Text style={styles.featureText}>Góp ý</Text>
                </View>
                <View style={styles.feature}>
                    <FontAwesomeIcon icon="fa-solid fa-circle-xmark" size={20} color={colors.bright_gray_brown} style={styles.featureIcon}/>
                    <Text style={styles.featureText}>Xóa tài khoản</Text>
                </View>
            </View>
            <View style={styles.wrapButton}>
                <Buttons.RedButton title="Đăng xuất" onPress={handleLogout}/>
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
    }
});
