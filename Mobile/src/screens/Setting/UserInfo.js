import React, { useContext, useState }  from 'react';
import { Text, View, StyleSheet, ImageBackground, Image, TextInput, SafeAreaView, ScrollView, FlatList, TouchableOpacity } from "react-native";
import Buttons from "./../../components/Buttons";
import colors from './../../../assets/colors';

import { useLogin } from './../../context/LoginProvider';

export default function UserInfo({navigation}) {
  const { setIsLoggedIn, profile } = useLogin();
  const [dataUser, setDataUser] = React.useState(profile);
  const [name, setName] = useState(profile.username);
  const [phone, setPhone] = useState(profile.phone);
  const [email, setEmail] = useState(profile.email);

  return (
    <View style={styles.container}>
        <View style={styles.wrapForm}>
          {/* Update detail */}
          <Text style={styles.titleText}>Tên người dùng</Text>
          <View style={styles.detailForm}>
            <View style={styles.inputIcon}>
              <Image source={require("./../../../assets/images/user-icon.png")} />
            </View>
            <TextInput style={styles.inputText}
                placeholder={profile.username}
                value={name}
                onChangeText={text=>setName(text)}
            />
          </View>

          {/* Update detail */}
          <Text style={styles.titleText}>Số điện thoại</Text>
          <View style={styles.detailForm}>
            <View style={styles.inputIcon}>
              <Image source={require("./../../../assets/images/phone-icon.png")} />
            </View>
            <TextInput style={styles.inputText}
                placeholder={profile.phone}
                value={phone}
                onChangeText={text=>setPhone(text)}
            />
          </View>
          
          {/* Update detail */}
          <Text style={styles.titleText}>Email</Text>
          <View style={styles.detailForm}>
            <View style={styles.inputIcon}>
              <Image source={require("./../../../assets/images/a-email-icon.png")} />
            </View>
            <TextInput style={styles.inputText}
                placeholder={profile.email}
                value={email}
                onChangeText={text=>setEmail(text)}
            />
          </View>
        </View>  
        <View style={styles.wrapButton}>      
          <Buttons.BlueButton title="Lưu" />
        </View>
    </View>
  )
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: colors.brightest_green,
    },
    wrapForm: {
      margin: '6%',      
    },
    titleText: {
      color: colors.black_green,
      fontSize: 16,
      fontWeight: "600",
      marginTop: 10,
      marginBottom: 5,
    },    
    detailForm: {
      flexDirection: "row",
      justifyContent: "flex-start",
    },
    inputIcon: {
      height: 40,
      borderWidth: 1,
      borderTopLeftRadius: 16,
      borderBottomLeftRadius: 16,
      borderTopColor: colors.bright_gray_brown,
      borderBottomColor: colors.bright_gray_brown,
      borderLeftColor: colors.bright_gray_brown,
      borderRightColor: colors.white,
      padding: 10,
      backgroundColor: colors.white,
    },
    inputText: {
      height: 40,
      width: '88%',
      borderWidth: 1,
      borderTopRightRadius: 16,
      borderBottomRightRadius: 16,
      borderTopColor: colors.bright_gray_brown,
      borderBottomColor: colors.bright_gray_brown,
      borderLeftColor: colors.white,
      borderRightColor: colors.bright_gray_brown,
      padding: 10,
      backgroundColor: colors.white,
    },
    wrapButton: {
      alignItems: 'center',
      margin: '6%',
    },

  });
