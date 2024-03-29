import * as React from "react";
import { Text, View, Image, StyleSheet } from "react-native";

import colors from './../../assets/colors';

export default function TalkRoomItem({ item }) {
  return (
    <View style={styles.TalkRoomIteamWrapper}>
        <View style={styles.topItem}>
            <Image source={require("./../../assets/images/ellipse-white-pot.png")} />
        </View>
        <View style={styles.contentItem}>
            <View style={styles.leftItem}>
                <Image source={item.avatar} style={styles.profileImage} />
            </View>
            <View style={styles.rightItem}>
                <Text style={styles.title}>{item.fullname}</Text>
                <View style={styles.row}>
                    <Text style={styles.title}>{item.age}</Text>
                    <Image source={item.nationality} />
                    <Text style={styles.title}>{item.session}</Text>
                </View>
                <Text style={styles.content}>{item.introduction}</Text>
            </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  TalkRoomIteamWrapper: {
    backgroundColor: colors.bright_gray_brown,
    borderWidth: 2,        
    borderRadius: 20,
    borderColor: colors.bright_gray_brown,
    paddingTop: 5,
    elevation: 10,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity:  0.25,
    shadowRadius: 4,
    shawdowColor: colors.shadow_gray_brown,
    flex: 1,
    flexDirection: "column",
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  topItem: {
    alignItems: "center",
    justifyContent: "center",
  },
  contentItem: {
    flexDirection: "row",
    backgroundColor: colors.white,
    borderWidth: 2,        
    borderRadius: 16,
    borderColor: colors.bright_gray_brown,
    paddingTop: 5,
    paddingBottom: 10,
  },
  leftItem: {
    width: "27.5%",
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
  },
  rightItem: {
    width: "72.5%",
    flexDirection: "column",
  },
  row: {
    flexDirection: "row",
  },
  profileImage: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
    overflow: "hidden",
    borderRadius: 50,
    borderWidth: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.black_green,
  },
  date: {
    fontSize: 16,
    fontWeight: "400",
    color: colors.shadow_gray_brown,
  },
  content: {
    fontSize: 16,
    fontWeight: "400",
    color: colors.black_green,
  },
});