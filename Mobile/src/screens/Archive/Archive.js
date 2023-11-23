import React, { useState, useEffect }  from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, SafeAreaView, ScrollView, SafeAreaView } from "react-native";
import colors from './../../../assets/colors';

export default function Archive({navigation}) {

    return (
    <SafeAreaView>
        <ScrollView style={styles.container}>

        </ScrollView>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: colors.brightest_green,
    },
    smallText: {
        color: colors.black_green,
        fontSize: 18,
        fontWeight: "500",
    },
    titleText: {
        color: colors.black_green,
        fontSize: 22,
        fontWeight: "500",
    },
    wrapFeatures: {
        margin: '9%',
        marginTop: '3%',
        marginBottom: '3%',
        flex: 1,
    },
    wrapIdioms: {
        backgroundColor: colors.white,
        borderWidth: 3,        
        borderRadius: 16,
        borderColor: colors.bright_gray_brown,
        padding: '3%',
        flex: 5,
    },
    idiomsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    idiomsContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    idiomsSentences: {
        flex: 3,
    },
    idiomsImage: {
        flex: 2,
    },
    imgIdiom: {
    },
    idiomsRandom: {
        alignSelf: 'center',
    },
    wrapPractices: {
        backgroundColor: colors.bright_gray_brown,
        borderRadius: 16,
        padding: '3%',
        marginTop: 15,
        flex: 4,
    },
    practicesHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
    },
    practicesContent: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 6,
        flex: 4,
    },
    practicesWrap: {
        flex: 1,
    },
    practicesItem: {
        margin: '1%',
        flex: 1,  
        elevation: 10,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity:  0.25,
        shadowRadius: 4,
        shawdowColor: colors.shadow_gray_brown,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imgPractice: {
        height: '100%',
        resizeMode: 'contain',  
        borderRadius: 16,
        borderWidth: 2, 
        borderColor: colors.bright_gray_brown,
    },
    practicesItemText: {
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.black_green,
    },
    pronuciationText: {
        position: 'absolute',
        // alignSelf: 'flex-end',
        bottom: 50,
    },
    wrapSkills: {
        backgroundColor: colors.white,
        borderWidth: 3,        
        borderRadius: 16,
        borderColor: colors.bright_gray_brown,
        padding: '3%',
        paddingTop: '1%',
        marginTop: 15,
        flex: 4,
    },
    skillsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
    },
    skillsContent: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.bright_gray_brown,
        borderRadius: 16,
        elevation: 10,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity:  0.25,
        shadowRadius: 4,
        shawdowColor: colors.shadow_gray_brown,
        marginTop: 5,
        paddingLeft: '5%',
        paddingTop: 5,
        flex: 4,
    },
    skillsTitle: {
        flex: 1,
    },
    skillText: {
        fontSize: 20,
        fontWeight: "800",
    },
    skillsImage: {
        flex: 2,
        width: '80%',
        resizeMode: 'contain',
    },

    // colorText
    brownColor: {
        color: colors.shadow_gray_brown,
    },
    whiteColor: {
        color: colors.white,
    },

  });
