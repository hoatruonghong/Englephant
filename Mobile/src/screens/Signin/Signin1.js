import React, { useContext, useState }  from 'react';
import { Text, View, StyleSheet, ImageBackground, Image, TextInput, useWindowDimensions } from "react-native";
import Buttons from "./../../components/Buttons";
import colors from './../../../assets/colors';
import content from './../../../declarations.d';

const image = require("./../../../assets/images/forest-landscape.png");

const Signin = () => {
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
                <TextInput
                    style={styles.input}
                    placeholder="Email or Phonenum"
                />            
            </View>
            <View style={styles.detailArea}>
                <Text style={styles.label}>Mật khẩu</Text>
                <TextInput
                    style={styles.input}
                    placeholder="******"
                />            
            </View>
            <View style={styles.detailArea}>
                <Text style={styles.label}>Nhập lại mật khẩu</Text>
                <TextInput
                    style={styles.input}
                    placeholder="******"
                />            
            </View>
            <View style={styles.buttonArea}>
                <Buttons.GreenButton title="Tiếp" />         
            </View>
            <Text style={styles.info}>Đã có tài khoản? <Text style={styles.link}>Đăng nhập</Text> </Text>       
            
        </View>
        
    
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        paddingLeft: 30,
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
        paddingBottom: 10
    },    
    label:{

    },
    input: {
        height: 40,
        width: 296,
        borderWidth: 1.5,
        borderRadius: 16,
        borderColor: colors.main_green,
        marginTop: 5,
        padding: 10,

    },
    buttonArea: {
        alignItems: 'center',
        marginTop: '10%'
    },
    info: {
        paddingTop: 50,
        fontSize: 16,
        bottom: 0,
        alignSelf: 'center',
    },
    link:{
        color: colors.blue,
    }
    
});

export default Signin