import * as React from "react";
import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";

import colors from './../../assets/colors';

function LessonItem(props) {
    const { onPress, title, isLearned, type } = props;
    var image_source = "";
    switch (type) {
        case 1:
            image_source = require("./../../assets/images/instruct.png");
            break;
        case 2:
            image_source = require("./../../assets/images/distinguish.png");
            break;
        case 3:
            image_source = require("./../../assets/images/practice.png");
            break;
    }
    return (
        <TouchableOpacity style={styles.lessonItem}>
            <Image source={image_source} />
            <Text style={styles.contentText}>{title}</Text>
        </TouchableOpacity>
    );
};

export default function PronunciationItem({ item }) {
  return (
    <View style={styles.PronunciationItemWrapper}>
      <View style={styles.topItem}>
        <Image source={require("./../../assets/images/ellipse-white-pot.png")} />
        <Text style={styles.titleText}>{item.name}</Text>
        <Image source={require("./../../assets/images/ellipse-white-pot.png")} />
      </View>
      <View style={styles.contentItem}>
        {/* <View style={styles.lessonItem}>
            <Text>Hướng dẫn</Text>
        </View>
        <View style={styles.lessonItem}>
            <Text>Phân biệt</Text>
        </View>
        <View style={styles.lessonItem}>
            <Text>Luyện tập</Text>
        </View> */}
        <LessonItem title={"Hướng dẫn"} type={1}/>
        <LessonItem title={"Phân biệt"} type={2}/>
        <LessonItem title={"Luyện tập"} type={3}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  PronunciationItemWrapper: {
    backgroundColor: colors.bright_gray_brown,
    borderRadius: 20,
    flexDirection: 'column',
    padding: '2%',
    marginBottom: '3%',
  },
  topItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contentItem: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  lessonItem: {
    backgroundColor: colors.white,
    width: '30%',
    padding: '3%',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 20,
    borderColor: colors.bright_gray_brown,
    elevation: 10,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity:  0.25,
    shadowRadius: 4,
    shawdowColor: colors.shadow_gray_brown, 
  },

  titleText: {
    fontSize: 24,
    fontWeight: "500",
    color: colors.white,
  },
  contentText: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.black_green,
  },
});