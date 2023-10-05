import React, { useContext, useState }  from 'react';
import { Text, View, StyleSheet, ImageBackground, Image, TextInput, useWindowDimensions } from "react-native";
import Buttons from "./../../components/Buttons";
import colors from './../../../assets/colors';
import content from './../../../declarations.d';
import SelectDropdown from 'react-native-select-dropdown';


const image = require("./../../../assets/images/forest-landscape.png");

const Signin2 = ({navigation}) => {
    const ages = ["Dưới 10 tuổi", "Từ 10 đến 18", "Trên 18"];
    const genders = ["Nam", "Nữ", "Khác"];

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
                <Text style={styles.label}>Tên người dùng</Text>
                <TextInput
                    style={styles.input}
                    placeholder="username"
                />            
            </View>
            
            <View style={styles.detailAreaTwo}>
                <View style={[styles.dropdownArea, styles.dropdownAreaLeft]}>
                    <Text style={styles.label}>Tuổi</Text>
                    <SelectDropdown
                        data={ages}
                        onSelect={(selectedItem, index) => {
                            console.log(selectedItem, index)
                        }}
                        defaultButtonText={'--'}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem
                        }}
                        rowTextForSelection={(item, index) => {
                            return item
                        }}
                        buttonStyle={styles.dropdownBtn}
                        buttonTextStyle={styles.dropdownBtnText}
                        dropdownStyle={styles.dropdownDropdownStyle}
                        rowStyle={styles.dropdownRowStyle}
                        rowTextStyle={styles.dropdownRowTxtStyle}
                    />  
                </View>
                <View style={[styles.dropdownArea, styles.dropdownAreaRight]}>
                    <Text style={styles.label}>Giới tính</Text>
                    <SelectDropdown
                        data={genders}
                        onSelect={(selectedItem, index) => {
                            console.log(selectedItem, index)
                        }}
                        defaultButtonText={'--'}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem
                        }}
                        rowTextForSelection={(item, index) => {
                            return item
                        }}
                        buttonStyle={styles.dropdownBtn}
                        buttonTextStyle={styles.dropdownBtnText}
                        dropdownStyle={styles.dropdownDropdownStyle}
                        rowStyle={styles.dropdownRowStyle}
                        rowTextStyle={styles.dropdownRowTxtStyle}
                    />
                      
                </View>
            </View>

            <View style={styles.detailArea}>
                <Text style={styles.label}>Số điện thoại</Text>
                <TextInput
                    style={styles.input}
                    placeholder="xxxxxxxxxx"
                />            
            </View>
            <View style={styles.buttonArea}>
                <Buttons.GreenButton title="Tiếp" onPress={()=>navigation.navigate("SetGoal")}/>         
            </View>
            <Text style={styles.info}>Đã có tài khoản? <Text style={styles.link}  onPress={() => navigation.navigate('Login')}>Đăng nhập</Text> </Text>       
            
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
        paddingBottom: 10,
        width: '100%',
        marginLeft: '20%',
    },    
    detailAreaTwo: {
        width: '80%',
        flexDirection: 'row',
        paddingBottom: 10,

    },

    dropdownArea:{
        flex: 1
    },
    dropdownAreaLeft:{
    },
    dropdownAreaRight:{
    },
    dropdownBtn: {
        width: '95%',
        height: 40,
        backgroundColor: '#FFF',
        borderRadius: 16,
        borderWidth: 1.5,
        borderColor: colors.main_green,
    }, 
    dropdownBtnTxt: {color: colors.main_green, textAlign: 'left', },
    dropdownDropdownStyle: {backgroundColor: '#EFEFEF'},
    dropdownRowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: colors.main_green},
    dropdownRowTxtStyle: {color: colors.main_green, textAlign: 'left'},
    
    label:{
        fontSize: 16,
        color: colors.black_green,
    },
    input: {
        height: 40,
        width: '80%',
        borderWidth: 1.5,
        borderRadius: 16,
        borderColor: colors.main_green,
        marginTop: 5,
        padding: 10,

    },
    buttonArea: {
        width: '80%',
        alignItems: 'center',
        marginTop: '10%'
    },
    info: {
        paddingTop: 50,
        fontSize: 16,
        fontWeight: "500",
        bottom: 0,
        alignSelf: 'center',
        color: colors.black_green,
    },
    link:{
        color: colors.blue,
    }
    
});

export default Signin2