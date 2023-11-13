import * as React from "react";
import { Text, View, Image, StyleSheet } from "react-native";

import colors from './../../assets/colors';

export default function Notice({ item }) {
  return (
    <View style={styles.NoticeIteamWrapper}>
        <View style={styles.topItem}>
            <Image source={require("./../../assets/images/ellipse-pot.png")} />
        </View>
        <View style={styles.contentItem}>
            <View style={styles.leftItem}>
                <Image source={item.image} style={styles.profileImage}/>
            </View>
            <View style={styles.rightItem}>
                <View style={styles.topRightItem}>
                <Text style={styles.title}>{item.title}</Text>
                <View style={styles.row}>
                    <Text style={styles.date}>{item.date}</Text>
                </View>
                </View>
                <Text style={styles.content}>{item.content}</Text>
            </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  NoticeIteamWrapper: {
    backgroundColor: colors.white,
    borderWidth: 2,        
    borderRadius: 16,
    borderColor: colors.bright_gray_brown,
    paddingTop: 5,
    paddingHorizontal: 8,
    paddingBottom: 10,
    elevation: 10,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shawdowColor: colors.shadow_gray_brown,
    flexDirection: "column",
    marginBottom: 10,
  },
  topItem: {
    alignItems: "center",
    justifyContent: "center",
  },
  contentItem: {
    flexDirection: "row",
  },
  leftItem: {
    alignItems: "center",
    justifyContent: "center",
    width: '20%',
  },
  profileImage: {
    borderRadius: 50,
    width: 65,
    height: 65,
    resizeMode: 'contain',
  },
  rightItem: {
    flexDirection: "column",
    width: '80%',
    alignSelf: 'center'
  },
  row: {
    flexDirection: "row",
  },
  topRightItem: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.black_green,
  },
  date: {
    fontSize: 16,
    fontWeight: "regular",
    color: colors.shadow_gray_brown,
  },
  content: {
    fontSize: 16,
    fontWeight: "regular",
    color: colors.black_green,
  },
});