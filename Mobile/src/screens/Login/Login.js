import React, { useContext, useState }  from 'react';
import { Text, View, StyleSheet, ImageBackground, Image, TextInput, AsyncStorage} from "react-native";
import Buttons from "./../../components/Buttons";
import colors from './../../../assets/colors';
import { FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import { isValidEmail, isValidObjField, updateError } from '../../utils/validForms';
import { useLogin } from '../../context/LoginProvider';
import Auth from './../../api/Auth';
import Learner from './../../api/Learner';

const image = require("./../../../assets/images/forest-landscape.png");

export default function Login({navigation}) {
  const { setIsLoggedIn, profile, learnerId, setProfile, setLearnerId, isLoggedIn } = useLogin();

  const [username, onChangeUsername] = React.useState('');
  const [password, onChangePassword] = React.useState('');
  
  const handleLogin = async () => {
    console.log("login", isLoggedIn);
    const res = await Auth.login({username, password});
    if (res.status == 200) {
      const learnerData = await Learner.getInfo({id: res.data.data.user.id});
      await setLearnerId(res.data.data.user.id);
      await setProfile(learnerData.data.data);

      setIsLoggedIn(true);
    } else {
      console.log(res);
    }
    
  };

  const isValidForm = () => {
    if (!isValidObjField({username, password}))
      return updateError('Required all fields!', setError);

    if (!isValidEmail(email)) return updateError('Invalid email!', setError);

    if (!password.trim() || password.length < 8)
      return updateError('Password is too short!', setError);

    return true;
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
            <View style={styles.inputWrap}>
              <FontAwesomeIcon icon="fa-solid fa-user" size={20} color={colors.main_green} style={styles.inputIcon}/>
              <TextInput
                  style={styles.input}
                  onChangeText={onChangeUsername}
                  value={username}
                  placeholder="Username"
              />     
            </View>       
          </View>
          <View style={styles.detailArea}>
            <Text style={styles.label}>Mật khẩu</Text>
            <View style={styles.inputWrap}>
              <FontAwesomeIcon icon="fa-solid fa-lock" size={20} color={colors.main_green} style={styles.inputIcon}/>
              <TextInput
                style={styles.input}
                onChangeText={onChangePassword}
                value={password}
                placeholder="Password"
                secureTextEntry
              />
            </View>
          </View>

          <Text style={styles.forgotPassword} onPress={()=> navigation.navigate("ForgetPassword")}
          >Quên mật khẩu?</Text>

          <View style={styles.wrapButton}>
            <Buttons.GreenButton title="Đăng nhập"  onPress={handleLogin}/>
          </View>
          
          <Text style={styles.info}>Chưa có tài khoản? <Text style={styles.link} onPress={() => navigation.navigate('Signin')}>Đăng ký</Text> </Text>       
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: colors.white,
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
  forgotPassword: {
    alignSelf: 'stretch',
    paddingTop: 10,
    paddingLeft: '8.9%',
    paddingBottom: 10,
    textAlign: 'left',
    color: colors.dark_green,
    fontWeight: '700',
  },
  info: {
    paddingTop: 50,
    fontSize: 16,
    fontWeight: '500',
    bottom: 0,
    color: colors.black_green,
  },
  wrapButton: {
    width: '82.2%',
  },
  link:{
    color: colors.blue,
  }
});
