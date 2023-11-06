import React, { useContext, useState }  from 'react';
import { Text, View, StyleSheet, ImageBackground, Image, TextInput, SafeAreaView, ScrollView, FlatList, TouchableOpacity } from "react-native";
import colors from './../../../assets/colors';
import PronunciationItem from './../../components/Pronunciation';

const data = [
    {
        id: 1,
        name: "Âm /i:/ - /I/",
        progress: 1,
    },
    {
        id: 2,
        name: "Âm /p/ - /b/",
        progress: 1,
    },
    {
        id: 3,
        name: "Âm /t/ - /d/",
        progress: 1,
    },
    {
        id: 4,
        name: "Âm /u:/ - /u/",
        progress: 1,
    },
    {
        id: 5,
        name: "Âm /p/ - /b/",
        progress: 1,
    },
    {
        id: 6,
        name: "Âm /t/ - /d/",
        progress: 1,
    },
    {
        id: 7,
        name: "Âm /u:/ - /u/",
        progress: 1,
    }
];

export default function Pronunciation({navigation}) {
  return (
    <View style={styles.container}>
        <View style={styles.wrapContent}>
            <FlatList
                showsHorizontalScrollIndicator={false}
                data={data}
                renderItem={PronunciationItem}
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
    wrapContent: {
        paddingTop: '5%',
        paddingLeft: '8%',
        paddingRight: '8%',
    }
});
