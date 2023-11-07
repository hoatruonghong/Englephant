import React, { useContext, useState }  from 'react';
import { Text, View, StyleSheet, ImageBackground, Image, TextInput, useWindowDimensions } from "react-native";
import Buttons from "./../../components/Buttons";
import colors from './../../../assets/colors';
import content from './../../../declarations.d';
import { FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import { useNavigation } from "@react-navigation/native";

const image = require("./../../../assets/images/forest-landscape.png");

const Signin = ({navigation}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');

    const handleNext = () => {
        navigation.navigate('Signin2', {
            username: username,
            password: password,
            repassword: repassword
        });
    }
    return (
    <View style={styles.container}>
        <View style = {styles.backgroundContainer}>
            <Image
                style={styles.logo}
                source={require('./../../../assets/images/ellipse.png')}
                resizeMode = 'cover' style = {styles.backdrop}
            />
        </View>
        <View style = {styles.logoContainer}>        
            <Image
                style={styles.logo}
                source={require('./../../../assets/images/mascot.png')}
            />    
        </View>
        <View style = {styles.nameContainer}>        
            <Text style={styles.appName}>Englephant</Text>
            <Text style={styles.title}>Đăng ký</Text>    
        </View>
        <View style = {styles.formContainer}>
            <View style={styles.detailArea}>
                <Text style={styles.label}>Tên đăng nhập</Text>
                <View style={styles.inputWrap}>
                    <FontAwesomeIcon icon="fa-solid fa-user" size={20} color={colors.main_green} style={styles.inputIcon}/>
                    <TextInput
                        style={styles.input}
                        placeholder="Username"
                        onChangeText={setUsername}
                        value={username}
                    />
                </View>
            </View>
            <View style={styles.detailArea}>
                <Text style={styles.label}>Mật khẩu</Text>
                <View style={styles.inputWrap}>
                    <FontAwesomeIcon icon="fa-solid fa-lock" size={20} color={colors.main_green} style={styles.inputIcon}/>
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        onChangeText={setPassword}
                        value={password}
                        secureTextEntry
                    />
                </View>
            </View>
            <View style={styles.detailArea}>
                <Text style={styles.label}>Nhập lại mật khẩu</Text>
                <View style={styles.inputWrap}>
                    <FontAwesomeIcon icon="fa-solid fa-lock" size={20} color={colors.main_green} style={styles.inputIcon}/>
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        onChangeText={setRepassword}
                        value={repassword}
                        secureTextEntry
                    />
                </View>
            </View>
            <View style={styles.buttonArea}>
                <Buttons.GreenButton title="Tiếp" onPress={handleNext}/>         
            </View>
            <Text style={styles.info}>Đã có tài khoản? <Text style={styles.link}  onPress={() => navigation.navigate('Login')}>Đăng nhập</Text> </Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    backgroundContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    logoContainer: {
        position: 'absolute',
        top: 130,
        right: 30,
        alignItems: 'flex-end',
    },
    logo:{        
    },
    nameContainer:{
        paddingLeft: '8.9%',
        paddingTop: 50,
    },
    appName: {
        fontSize: 48,
        fontWeight: '900',
        color: colors.white,
        letterSpacing: 1.5,
    },
    title: {
        textAlign: 'left',
        color: colors.white,
        fontSize: 32,
        fontWeight: 'bold',
        letterSpacing: 0.25,
    },
    formContainer: {
        top: 120,
        alignItems: 'center',
    },
    detailArea: {
        width: '100%',
        paddingBottom: 10,
        paddingLeft: '8.9%',
        paddingRight: '8.9%',
    },
    label: {
        fontSize: 16,
        fontWeight: '400',
        color: colors.black_green,
        marginBottom: 5,
    },
    inputWrap:{
        width: '100%',
        borderWidth: 1.5,
        borderRadius: 16,
        borderColor: colors.main_green,
        flexDirection: 'row', 
        alignItems: 'center',
        padding: 3,
    },
    inputIcon: {
        marginLeft: 5,
        marginRight: 5,
    },
    input: {
        width: '90%',
        padding: 3,
    },
    buttonArea: {
        alignItems: 'center',
        marginTop: '10%',
        width: '82.2%',
    },
    info: {
        paddingTop: 50,
        fontSize: 16,
        bottom: 0,
        fontWeight: '500',
        alignSelf: 'center',
        color: colors.black_green,
    },
    link:{
        color: colors.blue,
    }
    
});

export default Signin