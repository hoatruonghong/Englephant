import React, { useContext, useState }  from 'react';
import { Text, View, StyleSheet, ImageBackground, Image, TextInput, useWindowDimensions, TouchableOpacity } from "react-native";
import Buttons from "./../../components/Buttons";
import colors from './../../../assets/colors';
import content from './../../../declarations.d';
import SelectDropdown from 'react-native-select-dropdown';
import { FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

const image = require("./../../../assets/images/forest-landscape.png");

const Signin2 = ({route, navigation}) => {
    const ages = ["Dưới 10 tuổi", "Từ 10 đến 18", "Trên 18"];
    const genders = ["Nam", "Nữ", "Khác"];
    const [fullname, setFullname] = useState('');
    const [phone, setPhone] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');

    const handleNext = () => {
        route.params.fullname = fullname;
        route.params.phone = phone;
        switch (age) {
            case 1:
                route.params.mode = "Thanh thiếu niên"
                break;
            case 2:
                route.params.mode = "Người lớn"
                break;            
            default:
                route.params.mode = "Trẻ em";
                break;
        }
        route.params.gender = gender;
        navigation.navigate("SetGoal", route.params);
    }
    return (
    <View style={styles.container}>
        <View style = {styles.backgroundContainer}>
            <Image
                style={styles.logo}
                source={require('./../../../assets/images/ellipse.png')}
                resizeMode = 'cover'
            />
        </View>
        <View style = {styles.logoContainer}>        
            <Image
                style={styles.logo}
                source={require('./../../../assets/images/mascot.png')}
            />    
        </View>
        <View style = {styles.nameContainer}>
            <TouchableOpacity onPress={()=> navigation.goBack()}>
                <FontAwesomeIcon icon="fa-solid fa-arrow-left" size={24} color={colors.white}/>
            </TouchableOpacity>
            <Text style={styles.appName}>Englephant</Text>
            <Text style={styles.title}>Đăng ký</Text>    
        </View>
        <View style = {styles.formContainer}>
            <View style={styles.detailArea}>
                <Text style={styles.label}>Tên người dùng</Text>
                <View style={styles.inputWrap}>
                    <FontAwesomeIcon icon="fa-solid fa-user" size={20} color={colors.main_green} style={styles.inputIcon}/>
                    <TextInput
                        style={styles.input}
                        placeholder="Name"
                        onChangeText={setFullname}
                        value={fullname}
                    />
                </View>
            </View>            
            <View style={styles.detailAreaTwo}>
                <View style={[styles.dropdownArea, styles.dropdownAreaLeft]}>
                    <Text style={styles.label}>Tuổi</Text>
                    <SelectDropdown
                        data={ages}
                        onSelect={(selectedItem, index) => {
                            setAge(index)
                            // console.log(selectedItem, index)
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
                            setGender(selectedItem);
                            // console.log(selectedItem, index);
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
                <View style={styles.inputWrap}>
                <FontAwesomeIcon icon="fa-solid fa-phone" size={20} color={colors.main_green} style={styles.inputIcon}/>
                <TextInput
                    style={styles.input}
                    placeholder="098xxx"
                    onChangeText={setPhone}
                    value={phone}
                />
                </View>            
            </View>
            <View style={styles.buttonArea}>
                <Buttons.GreenButton title="Tiếp" onPress={handleNext}/>         
            </View>
            <Text style={styles.info}>Đã có tài khoản? <Text style={styles.link}  onPress={() => navigation.navigate('Login')}>Đăng nhập</Text></Text>
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
        paddingTop: 30,
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
    detailAreaTwo: {
        width: '82.2%',
        flexDirection: 'row',
        paddingBottom: 10,
        justifyContent: 'space-between',
    },
    dropdownArea:{
        width: '48%',
    },
    dropdownAreaLeft:{
    },
    dropdownAreaRight:{
    },
    dropdownBtn: {
        width: '100%',
        height: 40,
        backgroundColor: '#FFF',
        borderRadius: 16,
        borderWidth: 1.5,
        borderColor: colors.main_green,
    }, 
    dropdownBtnText: {
        color: colors.black_green, 
        textAlign: 'left',
        fontSize: 16,
        fontWeight: 'regular',
    },
    dropdownDropdownStyle: {
        backgroundColor: '#EFEFEF',
        borderRadius: 12,
    },
    dropdownRowStyle: {
        backgroundColor: '#EFEFEF', 
        borderBottomColor: colors.main_green
    },
    dropdownRowTxtStyle: {
        color: colors.black_green, 
        textAlign: 'left',
        fontSize: 16,
        fontWeight: 'regular',
    },
    
    label:{
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
        width: '82.2%',
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