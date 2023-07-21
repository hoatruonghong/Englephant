import React, { useContext, useState }  from 'react';
import { Text, View, StyleSheet, ImageBackground, Image, TextInput } from "react-native";
import Buttons from "./../../components/Buttons";
import colors from './../../../assets/colors';

const image = require("./../../../assets/images/forest-landscape.png");

export default function ForgetPassword() {
  const [phonenum, onChangePhonenum] = React.useState('');

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        
        <View style={styles.header}>
            <Image
                style={styles.arrow}
                source={require('./../../../assets/images/back.png')}
            />
            <Text style={styles.title}>Quên mật khẩu</Text>
            <Text style={styles.info}>Vui lòng nhập số điện thoại đăng ký app để nhận mã xác thực</Text>
          
        </View>

        <View style={styles.formArea}>
          <View style={styles.detailArea}>
            <Text style={styles.label}>Số điện thoại</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangePhonenum}
                value={phonenum}
                placeholder="098xxx"
                keyboardType="numeric"
            />            
          </View>

          <Buttons.GreenButton title="Nhập" />
          
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
    flex: 3,    
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20
  },
  detailArea: {
    paddingTop: 10,
    paddingBottom: 20
  },
  label: {
    fontSize: 16,
    color: colors.black_green,
    paddingLeft: 20
  },
  input: {
    height: 40,
    width: 296,
    margin: 12,
    borderWidth: 1.5,
    borderRadius: 16,
    borderColor: colors.main_green,
    padding: 10,
  },
});
