import React, { useContext, useState }  from 'react';
import { Text, View, StyleSheet, ImageBackground, Image, TextInput, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import Buttons from "./../../components/Buttons";
// import MyCalendar from './../../components/Calendar';
import colors from './../../../assets/colors';
import { useLogin } from './../../context/LoginProvider';

const image = require("./../../../assets/images/forest-landscape.png");

var dataUser = {
  avatar: "./../../../assets/images/avatar-default.png",
  name: "Hong Hoa",
  hearts: 1,
  peanuts: 10,
}

export default function Account({navigation}) {
  const { setIsLoggedIn, profile } = useLogin();

  return (
    
    <ImageBackground source={image} style={styles.imageBgContainer}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        // refreshControl={
        //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        // }
      >
        <SafeAreaView style={styles.container}>
          {/* User info */}
          <View style={styles.wrapUserInfo}>
              <View style={styles.infoWrap}>
                <TouchableOpacity style={styles.avatar}>
                  <Image
                    style={styles.avatarImage}
                    source={require("./../../../assets/images/avatar-default.png")}
                  />
                </TouchableOpacity>
                <View style={styles.info}>
                  <Text style={styles.infoUserName}>{profile.username}</Text>
                  <View style={styles.iconWrap}>
                    <View style={styles.iconHeart}>
                      <Image
                      style={styles.smallIcon}
                      source={require("./../../../assets/images/heart-icon.png")}
                      />
                      <Text style={styles.smallText}>{dataUser.hearts}</Text>
                    </View>
                    <View style={styles.iconPeanut}>
                      <Image
                        style={styles.smallIcon}
                        source={require("./../../../assets/images/peanut-icon.png")}
                      />
                      <Text style={styles.smallText}>{dataUser.peanuts}</Text>
                      <Image
                        style={styles.smallIcon}
                        source={require("./../../../assets/images/add-icon.png")}
                      />
                    </View>
                  </View>
                </View>
              </View>

              <View style={styles.moreWrap}>
                <TouchableOpacity style={styles.iconLink} onPress={() => navigation.navigate('Notification')}>
                  <Image source={require("./../../../assets/images/notification-icon.png")} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconLink} onPress={() => navigation.navigate('Setting')}>
                  <Image source={require("./../../../assets/images/setting-icon.png")} />
                </TouchableOpacity>
              </View>
            </View>
          <View>
          {/* Weekly tracking */}
          <View style={styles.wrapWeeklyTracking}>
            <Text>Weekly tracking</Text>
            {/* <MyCalendar /> */}
          </View>
          {/* Learning Detail */}
          <View style={styles.wrapLearningDetail}>
          <Text>detail</Text>

          </View>
          {/* Learning History */}
          <View style={styles.wrapLearningHistory}>
          <Text>History</Text>

          </View>
          {/* Game */}
          <View style={styles.wrapGame}>
          <Text>Game</Text>

          </View>
        </View>
        </SafeAreaView>
      </ScrollView>
    </ImageBackground>

  );
}

const styles = StyleSheet.create({
  imageBgContainer: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
  },
  container:{
    position: 'relative',
    backgroundColor: colors.yellow,
    margin: '8%',
    marginTop: '4%',

  },
  wrapUserInfo: {
    flexDirection: 'row',
  },
  infoWrap: {
    flex: 6,
    backgroundColor: colors.white,
    flexDirection: "row",
    borderWidth: 2,
    borderRadius: 20,
    borderColor: colors.bright_gray_brown,
    marginRight: 10,
    padding: 10,
  },
  avatar: {
    flex: 1,
  },
  // avatarImage: {
  //   width:
  // },
  info: {
    flex: 2,
  },
  infoUserName: {
    textAlign: 'left',
    color: colors.black_green,
    fontSize: 24,
    fontWeight: "500",
  },
  iconWrap:{
    flexDirection: "row",
    marginTop: 12,
  },
  iconHeart:{
    flex: 2,
    borderWidth: 2,
    borderRadius: 16,
    borderColor: colors.bright_gray_brown,
    marginRight: 5,
    flexDirection: "row",
    padding: 5,
  },
  iconPeanut: {
    flex: 3,
    borderWidth: 2,
    borderRadius: 16,
    borderColor: colors.bright_gray_brown,
    flexDirection: "row",
    padding:5,
  },  
  smallIcon: {
    flex: 1,
    width: 8,
  },
  smallText: {
    textAlign: "right",
    marginRight: 5,
    flex: 2,
  },
  moreWrap: {
    flex: 1,
    justifyContent: 'space-between',
  },
  iconLink: {
    backgroundColor: colors.white,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: colors.bright_gray_brown,
    alignItems: 'center',
    justifyContent: 'center',
    height: 42,
  },
  
  wrapWeeklyTracking: {
    backgroundColor: colors.blue,

  },
  
  wrapLearningDetail: {

  },
  
  wrapLearningHistory: {

  },
  
  wrapGame: {

  },
});
