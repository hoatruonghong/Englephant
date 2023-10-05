import React, { useContext, useState }  from 'react';
import { Text, View, StyleSheet, ImageBackground, Image, TextInput, SafeAreaView, ScrollView, FlatList, TouchableOpacity } from "react-native";
import Buttons from "./../../components/Buttons";
import colors from './../../../assets/colors';

const userData = {
  id: "1",
  name: "Hong Hoa",
  phone: "0123456789",
  email: ""
};

export default function UserInfo({navigation}) {
  const [dataUser, setDataUser] = React.useState(userData);
  const [name, setName] = useState(dataUser.name);
  const [phone, setPhone] = useState(dataUser.phone);
  const [email, setEmail] = useState(dataUser.email);
  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity style={styles.headerIcon} onPress={() => navigation.goBack()}>
                <Image source={require("./../../../assets/images/back-icon-white.png")} />
            </TouchableOpacity>
            <Text style={styles.headerText}>Cập nhật thông tin</Text>
        </View>
        <View style={styles.wrapForm}>
          {/* Update detail */}
          <Text style={styles.titleText}>Tên người dùng</Text>
          <View style={styles.detailForm}>
            <View style={styles.inputIcon}>
              <Image source={require("./../../../assets/images/user-icon.png")} />
            </View>
            <TextInput style={styles.inputText}
                placeholder={userData.name}
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
                placeholder={userData.phone}
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
                placeholder={userData.email}
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
    header: {
      height: '7.%',
      backgroundColor: colors.dark_green,
      borderWidth: 1.5,
      borderColor: colors.bright_gray_brown,
      flexDirection: 'row',
    },
    headerIcon: {
        alignSelf: 'center',
        flex: 1,
        marginLeft: '3%', 
    },
    headerText: {
        alignSelf: 'center',
        color: colors.white,
        fontSize: 24,
        fontWeight: "600",
        // textAlign: 'center',
        marginLeft: '15%',
        flex: 8,
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
