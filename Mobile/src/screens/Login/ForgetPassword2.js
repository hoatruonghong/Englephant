import React, { useContext, useState }  from 'react';
import { Text, View, StyleSheet, ImageBackground, Image, TextInput, TouchableOpacity } from "react-native";
import Buttons from "./../../components/Buttons";
import colors from './../../../assets/colors';
import { FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

const image = require("./../../../assets/images/forest-landscape.png");

export default function ForgetPasswordOTP({navigation}) {
  const [OTP, onChangeOTP] = React.useState('');

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        
        <View style={styles.header}>
          <TouchableOpacity onPress={()=> navigation.goBack()}>
            <FontAwesomeIcon icon="fa-solid fa-arrow-left" size={24} color={colors.black_green}/>
          </TouchableOpacity>
          <Text style={styles.title}>Quên mật khẩu</Text>
          <Text style={styles.info}>Vui lòng nhập mã xác thực chúng tôi đã gửi đến bạn</Text>
          
        </View>

        <View style={styles.formArea}>
          <View style={styles.detailArea}>
            <Text style={styles.label}>Mã xác thực</Text>
            <View style={styles.inputWrap}>
              <FontAwesomeIcon icon="fa-solid fa-lock" size={20} color={colors.main_green} style={styles.inputIcon}/>
              <TextInput
                  style={styles.input}
                  onChangeText={onChangeOTP}
                  value={OTP}
                  placeholder="xxxxxx"
                  keyboardType="numeric"
              />
            </View>
          </View>

          <View style={styles.wrapButton}>
            <Buttons.GreenButton title="Nhập"  onPress={()=> navigation.navigate("ChangePassword")}/>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex:1
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  header:{
    flex: 2,
    marginLeft:40,
    marginTop: 30
  },
  arrow:{
    paddingTop: 0
  },
  title: {
    textAlign: 'left',
    color: colors.black_green,
    fontSize: 32,
    fontWeight: "700",
    letterSpacing: 0.25,
  },
  info: {
    width: 220,
    fontSize: 16,
    fontWeight: '500',
    bottom: 0,
    color: colors.black_green
  },  
  formArea:{
    backgroundColor: colors.white,
    flex: 5,    
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    borderWidth: 3,
    borderColor: colors.main_green,
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20
  },
  detailArea: {
    width: '100%',
    paddingBottom: 20,
    paddingLeft: '8.9%',
    paddingRight: '8.9%',
  },
  label: {
    fontSize: 16,
    color: colors.black_green,
    marginBottom: 5,
  },
  inputWrap: {
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
  wrapButton: {
    marginTop: '4.5%',
    width: '82.2%',
  },
});
