import React, { useContext, useState }  from 'react';
import { Text, View, StyleSheet, ImageBackground, Image, TextInput, SafeAreaView, ScrollView, FlatList, TouchableOpacity } from "react-native";
import Buttons from "./../../components/Buttons";
import colors from './../../../assets/colors';
import Notice from './../../components/Notice';
const notificationData = [
    {
      id: "1",
      image: require("./../../../assets/images/mascot.png"),
      title: "Vượt qua chặng đầu",
      date: "Hôm nay",
      content: "Bạn đã vượt qua chặng đầu tiên. Tiếp tục với những bài học thú vị cùng Elephant nha!",
    },  
    {
      id: "2",
      image: require("./../../../assets/images/mascot.png"),
      title: "Mục tiêu tuần này",
      date: "20/12/2021",
      content:
        "Thật tiếc rằng tuần vừa rồi chúng ta chưa hoàn thành được mục tiêu. Nhưng đừng nản lòng nhé! Tiếp tục cố gắng nào!",
    },
    {
      id: "3",
      image: require("./../../../assets/images/mascot.png"),
      title: "Mua đậu thành công",
      date: "20/11/2021",
      content:
        "Bạn vừa được cộng 20 đậu từ giao dịch #A12C23.",
    },
    {
        id: "4",
        image: require("./../../../assets/images/mascot.png"),
        title: "Vượt qua chặng đầu",
        date: "Hôm nay",
        content: "Bạn đã vượt qua chặng đầu tiên. Tiếp tục với những bài học thú vị cùng Elephant nha!",
      },
    
      {
        id: "5",
        image: require("./../../../assets/images/mascot.png"),
        title: "Mục tiêu tuần này",
        date: "20/12/2021",
        content:
          "Thật tiếc rằng tuần vừa rồi chúng ta chưa hoàn thành được mục tiêu. Nhưng đừng nản lòng nhé! Tiếp tục cố gắng nào!",
      },
      {
        id: "6",
        image: require("./../../../assets/images/mascot.png"),
        title: "Vượt qua chặng đầu",
        date: "Hôm nay",
        content: "Bạn đã vượt qua chặng đầu tiên. Tiếp tục với những bài học thú vị cùng Elephant nha!",
      },
    
      {
        id: "7",
        image: require("./../../../assets/images/mascot.png"),
        title: "Mục tiêu tuần này",
        date: "20/12/2021",
        content:
          "Thật tiếc rằng tuần vừa rồi chúng ta chưa hoàn thành được mục tiêu. Nhưng đừng nản lòng nhé! Tiếp tục cố gắng nào!Thật tiếc rằng tuần vừa rồi chúng ta chưa hoàn thành được mục tiêu. Nhưng đừng nản lòng nhé! Tiếp tục cố gắng nào!Thật tiếc rằng tuần vừa rồi chúng ta chưa hoàn thành được mục tiêu. Nhưng đừng nản lòng nhé! Tiếp tục cố gắng nào!",
      },
];

export default function Notification({navigation}) {
  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity style={styles.headerIcon} onPress={() => navigation.goBack()}>
                <Image source={require("./../../../assets/images/back-icon-white.png")} />
            </TouchableOpacity>
            <Text style={styles.headerText}>Thông báo</Text>
        </View>
        <View style={styles.wrapNotification}>
            <FlatList
                showsHorizontalScrollIndicator={false}
                data={notificationData}
                renderItem={Notice}
                keyExtractor={(item) => item.id}
            />
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
        height: '10%',
        backgroundColor: colors.dark_green,
        borderWidth: 1.5,        
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderColor: colors.bright_gray_brown,
        // alignItems: 'flex-start',
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
        marginLeft: '20%',
        flex: 8,
    },
    wrapNotification: {
        marginTop: '5%',
        marginLeft: '3%',
        marginRight: '3%',
        marginBottom: '20%',
    }

  });
