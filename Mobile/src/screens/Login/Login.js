import React, { useContext, useState }  from 'react';
import { Text, View, StyleSheet, ImageBackground, Image, TextInput } from "react-native";
import Buttons from "./../../components/Buttons";
import colors from './../../../assets/colors';

const image = require("./../../../assets/images/forest-landscape.png");

export default function Login() {
  const [username, onChangeUsername] = React.useState('');
  const [password, onChangePassword] = React.useState('');

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <Text style={styles.title}>Đăng nhập</Text>
        <View style={styles.header}>
          <Image
            style={styles.logo}
            source={require('./../../../assets/images/mascot.png')}
          />
        </View>

        <View style={styles.formArea}>
          <View style={styles.detailArea}>
            <Text style={styles.label}>Tên đăng nhập</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeUsername}
                value={username}
                placeholder="Email or Phonenum"
            />            
          </View>

          <View style={styles.detailArea}>
            <Text style={styles.label}>Mật khẩu</Text>
            <TextInput
              style={styles.input}
              onChangeText={onChangePassword}
              value={password}
              placeholder="Password"
            />
          </View>

          <Text style={styles.forgotPassword}>Quên mật khẩu?</Text>

          <Buttons.GreenButton title="Đăng nhập" />
          
          <Text style={styles.info}>Chưa có tài khoản? <Text style={styles.link}>Đăng ký</Text> </Text>       
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'left',
    color: colors.black_green,
    fontSize: 32,
    fontWeight: "700",
    letterSpacing: 0.25,
    paddingLeft: 30,
    paddingTop: 40,
  },
  logo: {

  },
  formArea:{
    backgroundColor: colors.white,
    flex: 5,    
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20
  },
  detailArea: {
    paddingTop: 10,
  },
  label: {
    fontSize: 16,
    color: colors.black_green,
    paddingLeft: 20
  },
  inputContainer:{
    height: 40,
    width: 296,
    margin: 12,
    borderWidth: 1.5,
    borderRadius: 16,
    borderColor: colors.main_green,
    padding: 10,
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

  forgotPassword: {
    alignSelf: 'stretch',
    paddingTop: 10,
    paddingLeft: 50,
    paddingBottom: 10,
    textAlign: 'left',
    color: colors.dark_green,
    fontWeight: '700',
  },
  info: {
    paddingTop: 50,
    fontSize: 16,
    fontWeight: '600',
    bottom: 0
  },
  link:{
    color: colors.blue,
  }
});
