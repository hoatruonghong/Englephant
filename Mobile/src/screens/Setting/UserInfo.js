import React, {useContext, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
} from 'react-native';
import Buttons from './../../components/Buttons';
import colors from './../../../assets/colors';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import SelectDropdown from 'react-native-select-dropdown';
import Learner from './../../api/Learner';
import {useLogin} from './../../context/LoginProvider';
import axios from 'axios';

export default function UserInfo({navigation}) {
  const genders = ['Nam', 'Nữ', 'Khác'];
  const date = new Date;
  const currentYear = date.getFullYear();

  const {setIsLoggedIn, setProfile, profile, learnerId} = useLogin();
  const [dataUser, setDataUser] = React.useState(profile);
  const [name, setName] = useState(profile.fullname);
  const [phone, setPhone] = useState(profile.phone);
  const [email, setEmail] = useState(profile.email);
  const [gender, setGender] = useState(profile.gender);
  const [age, setAge] = useState((currentYear - profile.bornYear).toString());

  const handleSave = async () => {
    try {
      const res = await Learner.update({
        fullname: name,
        phone: phone,
        email: email,
        gender: gender,
        bornYear: currentYear - parseInt(age),
        id: learnerId,
      });
      await setDataUser(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapForm}>
        {/* Update detail */}
        <Text style={styles.titleText}>Tên người dùng</Text>
        <View style={styles.detailForm}>
          <FontAwesomeIcon
            icon="fa-solid fa-user"
            size={20}
            color={colors.bright_gray_brown}
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.inputText}
            placeholder={dataUser.fullname}
            value={name}
            onChangeText={text => setName(text)}
          />
        </View>
        {/* Update detail */}
        <View style={styles.wrapRow}>
          {/* Age */}
          <View style={styles.areaLeft}>
            <Text style={styles.titleText}>Tuổi</Text>
            <View style={styles.detailForm}>
              <TextInput
                style={[styles.inputText, {textAlign: 'center'}]}
                placeholder={dataUser.age}
                value={age}
                onChangeText={text => setAge(text)}
              />
            </View>
          </View>          
          {/* Gender */}
          <View style={[styles.dropdownArea, styles.areaRight]}>
            <Text style={styles.titleText}>Giới tính</Text>
            <SelectDropdown
              data={genders}
              onSelect={(selectedItem, index) => {
                setGender(selectedItem);
                // console.log(selectedItem, index);
              }}
              defaultButtonText={dataUser.gender}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
              buttonStyle={styles.dropdownBtn}
              buttonTextStyle={styles.dropdownBtnText}
              dropdownStyle={styles.dropdownDropdownStyle}
              rowStyle={styles.dropdownRowStyle}
              rowTextStyle={styles.dropdownRowTxtStyle}
            />
          </View>
        </View>
        {/* Update detail */}
        <Text style={styles.titleText}>Số điện thoại</Text>
        <View style={styles.detailForm}>
          <FontAwesomeIcon
            icon="fa-solid fa-phone"
            size={20}
            color={colors.bright_gray_brown}
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.inputText}
            placeholder={dataUser.phone}
            value={phone}
            onChangeText={text => setPhone(text)}
          />
        </View>
        {/* Update detail */}
        <Text style={styles.titleText}>Email</Text>
        <View style={styles.detailForm}>
          <FontAwesomeIcon
            icon="fa-solid fa-at"
            size={20}
            color={colors.bright_gray_brown}
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.inputText}
            placeholder={dataUser.email}
            value={email}
            onChangeText={text => setEmail(text)}
          />
        </View>
      </View>
      <View style={styles.wrapButton}>
        <Buttons.BlueButton title="Lưu" onPress={handleSave} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 5,
  },
  detailForm: {
    flexDirection: 'row',
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
  wrapRow: {
    flexDirection: 'row',
  },
  dropdownArea: {
    width: '48%',
  },
  areaLeft: {
    flex: 1,
    marginRight: 5,
  },
  areaRight: {
    flex: 1,
    marginLeft: 5,
  },
  dropdownBtn: {
    width: '100%',
    height: 40,
    backgroundColor: '#FFF',
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: colors.main_green,
    height: 45,
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
    borderBottomColor: colors.main_green,
  },
  dropdownRowTxtStyle: {
    color: colors.black_green,
    textAlign: 'left',
    fontSize: 16,
    fontWeight: 'regular',
  },
});
