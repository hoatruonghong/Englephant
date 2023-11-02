import React, { useContext, useState }  from 'react';
import { Text, View, StyleSheet, ImageBackground, Image, TextInput, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import Buttons from "./../../components/Buttons";
import { VocabularyChart, PronunciationChart, PercentChart} from './../../components/Charts';
import colors from './../../../assets/colors';
import { useLogin } from './../../context/LoginProvider';
import IconWrap from './../../components/IconWrap';
import { FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

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
                      <IconWrap name="heart" num={10}/>
                    </View>
                    <View style={styles.iconPeanut}>
                      <IconWrap name="peanut" num={100} hasPlus={true}/>
                    </View>
                  </View>
                </View>
              </View>

              <View style={styles.moreWrap}>
                <TouchableOpacity style={styles.iconLink} onPress={() => navigation.navigate('Notification')}>
                  <FontAwesomeIcon icon="fa-solid fa-bell" color={colors.shadow_gray_brown} size={24}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconLink} onPress={() => navigation.navigate('Setting')}>
                  <FontAwesomeIcon icon="fa-solid fa-gear" color={colors.shadow_gray_brown} size={24}/>
                </TouchableOpacity>
              </View>
            </View>
          <View>
          {/* Weekly tracking */}
          <View style={styles.wrapWeeklyTracking}>
            <View style={styles.trackingHeader}>
              <Text style={styles.trackingTitle}>Theo dõi hàng tuần</Text>
              <View style={styles.iconFire}>
                <IconWrap name="fire" num={3}/>
              </View>
            </View>
            <View style={styles.trackingCalendar}>
              <Text>Calendar</Text>
            </View>
            {/* <MyCalendar /> */}
          </View>
          {/* Learning Detail */}
          <View style={styles.wrapLearningDetail}>
            <View style={styles.wrapVocalDetail}>
              <Text>Từ vựng</Text>
              <VocabularyChart />
            </View>

            <View style={styles.wrapPronunDetail}>
              <View style={styles.wrapPronunHeaderDetail}>
                <Text>Phát âm</Text>
                <PercentChart />
              </View>
              
              <Text>Các âm tốt</Text>
              <Text>Các âm cần cải thiện</Text>
              
            </View>

          </View>
          {/* Learning History */}
          <View style={styles.wrapLearningHistory}>
            <Text>History</Text>

          </View>
          {/* Game */}
          <TouchableOpacity style={styles.wrapGame}>
            <Image style={styles.bannerImage} source={require("./../../../assets/images/game-banner-collect.png")} />
          </TouchableOpacity>
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
    margin: '8.33%',
    marginTop: '4.17%',
  },
  wrapUserInfo: {
    flexDirection: 'row',
  },
  infoWrap: {
    backgroundColor: colors.white,
    flexDirection: "row",
    justifyContent: 'space-between',
    borderWidth: 2,
    borderRadius: 20,
    borderColor: colors.bright_gray_brown,
    marginRight: 10,
    padding: 10,
    width: '81.17%',
  },
  avatar: {
    flex: 1,
  },
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
    width: '40%',
  },
  iconPeanut: {
    width: '60%',
    paddingLeft: '5%',
  },  
  moreWrap: {
    width: '14%',
    justifyContent: 'space-between',
  },
  iconLink: {
    backgroundColor: colors.white,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: colors.bright_gray_brown,
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
  },
  
  wrapWeeklyTracking: {
    backgroundColor: colors.bright_gray_brown,
    borderWidth: 2,
    borderRadius: 16,
    borderColor: colors.bright_gray_brown,
    marginTop: '2.08%',
  },
  trackingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '4.5%',
    paddingTop: '2%',
    paddingBottom: '2%',
  },
  trackingTitle: {
    color: colors.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  iconFire: {
    width: '22.7%',
  },
  trackingCalendar: {
    backgroundColor: colors.white,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    padding: 5,
  },
  
  wrapLearningDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '2.08%',
  },
  wrapVocalDetail: {
    flex: 1,
    backgroundColor: colors.white,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: colors.bright_gray_brown,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapPronunDetail: {
    flex: 1,
    backgroundColor: colors.white,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: colors.bright_gray_brown,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  wrapPronunHeaderDetail: {
    flexDirection: 'row',

  },

  wrapLearningHistory: {
    backgroundColor: colors.white,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: colors.bright_gray_brown,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '2.08%',
  },
  
  wrapGame: {
    backgroundColor: colors.white,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: colors.bright_gray_brown,
    marginTop: '2.08%',
  },
  bannerImage: {
    resizeMode: 'contain',
    width: '100%',
  },
});
