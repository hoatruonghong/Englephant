import React from 'react'
import { View, Text, StyleSheet } from 'react-native';

export default function LandingScreen() {
  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <Text> Header </Text>
        </View>
        <View style={styles.body}>    
            <Text> Body  </Text>
        </View>
        <View style={styles.navigation} >
            <Text> navi </Text>
        </View>

    </View>
  )
}

const styles = StyleSheet.create({
    containter: {
        flex: 1,
        backgroundColor: "rgba(242,242,242,1)",
    },
    header: {
        backgroundColor: "rgba(50,50,50,1)",

    },
    body: {
        backgroundColor: "rgba(100,100,100,1)",

    }, 
    navigation: {
        backgroundColor: "rgba(200,200,200,1)",

    }
})