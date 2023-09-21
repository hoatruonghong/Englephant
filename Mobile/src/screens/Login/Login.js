import React, { useContext, useState }  from 'react';
import { Text, View, StyleSheet, ImageBackground, Image, TextInput, AsyncStorage} from "react-native";
import Buttons from "./../../components/Buttons";
import colors from './../../../assets/colors';
import { user_login } from './../../api/user_api';
import axios from 'axios';

const image = require("./../../../assets/images/forest-landscape.png");

export default function Login({navigation}) {
  const [username, onChangeUsername] = React.useState('');
  const [password, onChangePassword] = React.useState('');
  
  const postAPI = () => {
    console.log("datt", username, password);
    axios({
      method: 'POST',
      url: 'http://10.0.0.2:5000/api/auth/login',
      body: JSON.stringify({
        username: username,
        password: password
      })
    }).then(res => {
      console.log('in handle',result);
      if (res.status == 200){
        console.log("200 ",res);
        navigation.replace("Warmup");
      }
      else if (res.status == 400) console.log("400", res);
    }).catch(err => console.log('222',err))
  };

  const handleLogin = async () => {
    try {
      const result = await user_login({
        username: username,
        password: password
      })    
      console.log('in handle',result);
      if (result.status == 200){
        console.log("200 ",result);
        navigation.replace("Warmup");
      }
    } catch (error) {
      console.error(error);
    }
    // user_login({
    //   username: username,
    //   password: password
    // }).then((result) => {
    //   console.log("login result", result);
    //   if(result && result.status == 200) {
    //     // AsyncStorage.setItem("AccessToken", result.data)
    //     console.log("200 ",result);
    //     navigation.replace("Warmup");
    //   }
    // }).catch((err)=> {
    //   console.error(err);
    // })
  };

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
                placeholder="Username"
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

          <Buttons.GreenButton title="Đăng nhập"  onPress={postAPI}/>
          
          <Text style={styles.info}>Chưa có tài khoản? <Text style={styles.link} onPress={() => navigation.navigate('Signin')}>Đăng ký</Text> </Text>       
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
