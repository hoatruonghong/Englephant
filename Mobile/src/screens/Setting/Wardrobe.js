import React, { useContext, useState }  from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, useWindowDimensions } from "react-native";
import Buttons from "./../../components/Buttons";
import colors from './../../../assets/colors';
import MascotAvatar from '../../../assets/svg/mascot_wardrobe.svg';

export default function Wardrobe({navigation}) {
    const {height, width} = useWindowDimensions();

    return (
        <View style={styles.container}>
            <View style={styles.avatarWrap}>
                <MascotAvatar style={styles.avatarBase}
                    width={0.76*width}
                    height={0.3*height}
                    viewBox={`0 -10 ${0.76*width} ${0.36*height}`} 
                />
            </View>
            <View style={styles.wardrobeWrap}>
            
            </View>
        </View>
    )
};


const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: colors.brightest_green,
    },
    avatarWrap: {   
        height: '36%',     
        marginLeft: '8%',
        marginRight: '8%',
        borderRadius: 16,
        borderWidth: 3,
        borderColor: colors.bright_gray_brown,
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarBase: {
        alignSelf: "center",

    },
    wardrobeWrap: {
        height: '58%',
        marginLeft: '5%',
        marginRight: '5%',
        borderRadius: 20,
        backgroundColor: colors.shadow_gray_brown

    }
  });
