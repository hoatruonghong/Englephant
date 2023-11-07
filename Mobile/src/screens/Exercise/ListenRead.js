import React, { useContext, useState }  from 'react';
import { Text, View, StyleSheet, ImageBackground, Image, TextInput, SafeAreaView, ScrollView, FlatList, TouchableOpacity } from "react-native";
import colors from './../../../assets/colors';
import ListenReadItem from './../../components/ListenRead';

const data = [
    {
        id: 1,
        name: "My lovely cat",
        image: '',
        description: '',
        audio: '',
        price: 20,
        quizDone: 6,
        quizTotal: 6,
        progress: "100%"
    },
    {
        id: 2,
        name: "Special birthday",
        image: '',
        description: '',
        audio: '',
        price: 20,
        quizDone: 4,
        quizTotal: 5,
        progress: "80%"
    },
    {
        id: 3,
        name: "My lovely cat",
        image: '',
        description: '',
        audio: '',
        price: 20,
        quizDone: 6,
        quizTotal: 6,
        progress: "100%"
    },
    {
        id: 4,
        name: "Special birthday",
        image: '',
        description: '',
        audio: '',
        price: 20,
        quizDone: 4,
        quizTotal: 5,
        progress: "80%"
    },
    {
        id: 5,
        name: "My lovely cat",
        image: '',
        description: '',
        audio: '',
        price: 20,
        quizDone: 6,
        quizTotal: 6,
        progress: "100%"
    },
    {
        id: 6,
        name: "Special birthday",
        image: '',
        description: '',
        audio: '',
        price: 20,
        quizDone: 4,
        quizTotal: 5,
        progress: "80%"
    },
];

export default function ListenRead({navigation}) {
  return (
    <View style={styles.container}>
        <View style={styles.wrapContent}>
            <FlatList
                showsHorizontalScrollIndicator={false}
                data={data}
                renderItem={ListenReadItem}
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
        height: '7.%',
        backgroundColor: colors.dark_green,
        borderWidth: 1.5,
        borderColor: colors.bright_gray_brown,
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
        marginLeft: '25%',
        flex: 8,
    },
    wrapContent: {
        paddingTop: '5%',
        paddingLeft: '8%',
        paddingRight: '8%',
        paddingBottom: '5%',
        flex: 1,
    }
});
