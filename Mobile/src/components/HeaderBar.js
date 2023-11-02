import React from "react";
import { Text, View, StyleSheet, Pressable, TouchableOpacity } from "react-native";
import colors from './../../assets/colors';
import IconWrap from './IconWrap';

const iconWrap = (item) => {
  return <IconWrap name={item.name} num={item.num} hasPlus={item.hasPlus} total={item.total} />
};

function HeaderBar(props) {
  const {items} = props;
  return (
    <View style={styles.container}>
      <View style={styles.leftSide}>
        {iconWrap(items[0])}
      </View>
      <View style={styles.rightSide}>
        {iconWrap(items[1])}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      width: '90%',
      justifyContent: 'space-around',
    },
    leftSide: {
      width: '45%',
    },
    rightSide: {
      width: '45%',
    }
  });

module.exports = {
  HeaderBar
}