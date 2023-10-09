import React, { useContext, useState }  from 'react';
import { Text, SafeAreaView, View, StyleSheet, ImageBackground, Image, TextInput, Picker } from "react-native";
import Buttons from "./../../components/Buttons";
import colors from './../../../assets/colors';
import content from './../../../declarations.d';
import SelectDropdown from 'react-native-select-dropdown'

const image = require("./../../../assets/images/forest-landscape.png");

const SetGoal = ({navigation}) => {
    const minutes = ["10", "15", "20", "30"]

    return (
    <SafeAreaView style={styles.container}>
        <View style = {styles.backgroundContainer}>
            <Image
                style={styles.logo}
                source={require('./../../../assets/images/ellipse.png')}
                resizeMode = 'cover' style = {styles.backdrop}
            />
        </View>

        <View style = {styles.nameContainer}>        
            <Text style={styles.appName}>Đặt mục tiêu</Text>
            <Text style={styles.title}>Mỗi ngày bạn có thể dành bao nhiêu thời gian với Englephant ?</Text>    
        </View>

        <View style = {styles.formContainer}>
            <View style={styles.detailArea}>
            <SelectDropdown
                data={minutes}
                onSelect={(selectedItem, index) => {
                    console.log(selectedItem, index)
                }}
                defaultButtonText={'-- phút'}
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
            <Text style={styles.info}>Englephant sẽ rất vui nếu mỗi ngày có bạn đồng hành cùng khoảng <Text style={styles.mark}>10-15</Text> phút. </Text>       
            <Text style={styles.info}><Text style={styles.mark}>Chúc bạn thành công !</Text> </Text>   

            <View style={styles.buttonArea}>
                <Buttons.GreenButton title="Đăng ký" />         
            </View>            
        </View>       
    
    </SafeAreaView>
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
    nameContainer:{
        width: "80%",
        paddingLeft: '10%',
        paddingTop: 50,
    },
    appName: {
        fontSize: 40,
        fontWeight: '800',
        color: colors.white,
        letterSpacing: 1.5,
    },
    title: {
        textAlign: 'left',
        color: colors.white,
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: 0.25,
    },
    dropdownBtn: {
        width: '90%',
        height: 40,
        backgroundColor: '#FFF',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: colors.main_green,
      },
    dropdownBtnTxt: {color: colors.main_green, textAlign: 'left'},
    dropdownDropdownStyle: {backgroundColor: '#EFEFEF'},
    dropdownRowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: colors.main_green},
    dropdownRowTxtStyle: {color: colors.main_green, textAlign: 'left'},
    

    formContainer: {
        top: 120,
        alignItems: 'center',
        alignSelf: 'center',
        width: '80%'
    },
    detailArea: {
        paddingBottom: 10
    },    
    buttonArea: {
        width: '90%',
        alignItems: 'center',
        marginTop: '10%',
    },
    info: {
        paddingTop: 30,
        
        fontSize: 16,
        fontWeight: '500',
        bottom: 0,
        alignSelf: 'center',
    },
    mark:{
        color: colors.main_green,
    }
    
});

export default SetGoal