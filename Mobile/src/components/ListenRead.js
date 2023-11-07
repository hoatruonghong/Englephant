import * as React from "react";
import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";

import colors from './../../assets/colors';

export default function ListenReadItem({ item }) {
  return (
    <TouchableOpacity style={styles.ListenReadIteamWrapper}>
      <View style={styles.topItem}>
        <View style={styles.leftSide}>
          <Image source={require("./../../assets/images/ellipse-pot.png")} />
          <Text style={styles.titleText}>{item.name}</Text>
        </View>
        <Image style={styles.rightSide} source={require("./../../assets/images/ellipse-pot.png")} />
      </View>
      <View style={styles.contentItem}>
        <View style={styles.imageItem}>
          <Image source={require("./../../assets/images/learning.png")} 
           style={styles.image}
          />
        </View>
        <View style={styles.progressItem}>
          <Text style={styles.contentText}>{item.quizDone}/{item.quizTotal}</Text>
          <Text style={styles.contentText}>{item.progress}</Text>
        </View>
        <View style={styles.iconItem}>
          <Image source={require("./../../assets/images/check-icon.png")} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  ListenReadIteamWrapper: {
    backgroundColor: colors.white,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: colors.bright_gray_brown,
    flexDirection: 'column',
    paddingLeft: '5%',
    paddingRight: '5%',
    marginBottom: '3%',
  },
  topItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftSide: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightSide: {
  },
  contentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
  },
  imageItem: {
    width: '33%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 50,
    resizeMode: 'contain',
  },
  progressItem: {
    width: '53.7%',
  },
  iconItem: {
    width: '13.3%',
  },

  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.black_green,
  },
  contentText: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.black_green,
  },
});