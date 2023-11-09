import React, { useContext, useState }  from 'react';
import { Text, View, StyleSheet, ImageBackground, Image, TextInput, SafeAreaView, ScrollView, FlatList, TouchableOpacity } from "react-native";
import Buttons from "./../../components/Buttons";
import colors from './../../../assets/colors';
import { FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import Learner from './../../api/Learner';
import { useLogin } from './../../context/LoginProvider';

export default function UserInfo({navigation}) {
  const {setIsLoggedIn, profile } = useLogin();
  const [dataUser, setDataUser] = React.useState(profile);
  const [name, setName] = useState(profile.fullname);
  const [phone, setPhone] = useState(profile.phone);
  const [email, setEmail] = useState(profile.email);
  const handleSave = async () => {
    try {
      const res = await Learner.update({fullname: name, phone: phone, email:email, id: profile._id});
      console.log(res.data);
      
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
        <View style={styles.wrapForm}>
          {/* Update detail */}
          <Text style={styles.titleText}>Tên người dùng</Text>
          <View style={styles.detailForm}>
            <FontAwesomeIcon icon="fa-solid fa-user" size={20} color={colors.bright_gray_brown} style={styles.inputIcon} />
            <TextInput style={styles.inputText}
                placeholder={profile.username}
                value={name}
                onChangeText={text=>setName(text)}
            />
          </View>
          {/* Update detail */}
          <Text style={styles.titleText}>Số điện thoại</Text>
          <View style={styles.detailForm}>
            <FontAwesomeIcon icon="fa-solid fa-phone" size={20} color={colors.bright_gray_brown} style={styles.inputIcon} />
            <TextInput style={styles.inputText}
                placeholder={profile.phone}
                value={phone}
                onChangeText={text=>setPhone(text)}
            />
          </View>          
          {/* Update detail */}
          <Text style={styles.titleText}>Email</Text>
          <View style={styles.detailForm}>
            <FontAwesomeIcon icon="fa-solid fa-at" size={20} color={colors.bright_gray_brown} style={styles.inputIcon} />
            <TextInput style={styles.inputText}
              placeholder={profile.email}
              value={email}
              onChangeText={text=>setEmail(text)}
            />
          </View>
        </View>  
        <View style={styles.wrapButton}>      
          <Buttons.BlueButton title="Lưu" onPress={handleSave}/>
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
      width: '100%',
      height: 45,
      borderWidth: 1.5,
      borderRadius: 16,
      borderColor: colors.bright_gray_brown,
      backgroundColor: colors.white,
      alignItems: 'center',
    },
    inputIcon: {
      marginLeft: '3%',
      marginRight: '2%',
    },
    inputText: {
      width: '90%',
      height: 45,
      fontSize: 16,
      fontWeight: 'regular',
    },
    wrapButton: {
      alignItems: 'center',
      margin: '6%',
    },

  });
