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
];

export default function Pronunciation({navigation}) {
  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity style={styles.headerIcon} onPress={() => navigation.goBack()}>
                <Image source={require("./../../../assets/images/back-icon-white.png")} />
            </TouchableOpacity>
            <Text style={styles.headerText}>Phát âm</Text>
        </View>
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
        paddingBottom: '15%',
    }
});
