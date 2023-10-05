import React, { useContext, useState }  from 'react';
import { Text, View, StyleSheet, ImageBackground, Image, TextInput, SafeAreaView, ScrollView, FlatList, TouchableOpacity } from "react-native";
import colors from './../../../assets/colors';

var dataUser = {
    hearts: 1,
    peanuts: 10,
};
pronunciateImage = require("./../../../assets/images/pronunciate.png");
listen_readImage = require("./../../../assets/images/listen-read.png");

export default function ExerciseMain({navigation}) {
  return (
    <ScrollView>
    <View style={styles.container}>
        <View style={styles.wrapHeader}>
            <View style={styles.iconHeart}>
                <Image
                    style={styles.smallIcon}
                    source={require("./../../../assets/images/heart-icon.png")}
                />
                <Text style={styles.smallText}>{dataUser.hearts}</Text>
            </View>
            <View style={styles.iconPeanut}>
                <Image
                    style={styles.smallIcon}
                    source={require("./../../../assets/images/peanut-icon.png")}
                />
                <Text style={styles.smallText}>{dataUser.peanuts}</Text>
                <Image
                    style={styles.smallIcon}
                    source={require("./../../../assets/images/add-icon.png")}
                />
            </View>
        </View>
        <View style={styles.wrapFeatures}>
            {/* Idioms */}
            <View style={styles.wrapIdioms}>
                <View style={styles.idiomsHeader}>
                    <Image source={require("./../../../assets/images/ellipse-pot.png")} />
                    <Text style={styles.titleText}>Thành ngữ ngẫu nhiên</Text>
                    <Image source={require("./../../../assets/images/ellipse-pot.png")} />

                </View>
                <View style={styles.idiomsContent}>
                    <View style={styles.idiomsSentences}>
                        <Text style={styles.smallText}>Cut someone some slack</Text>
                        <Text style={[styles.smallText, styles.brownColor]}>Đừng quá khắc khe</Text>
                    </View>
                    <View style={styles.idiomsImage}>
                        <Image source={require("./../../../assets/images/elephant-happy.png")} />
                    </View>
                </View>
                <TouchableOpacity style={styles.idiomsRandom}>
                    <Image source={require("./../../../assets/images/random-icon.png")} />
                </TouchableOpacity>
            </View>

            {/* Practice */}
            <View style={styles.wrapPractices}>
                <View style={styles.practicesHeader}>
                    <Image source={require("./../../../assets/images/ellipse-white-pot.png")} />
                        <Text style={[styles.titleText, styles.whiteColor]}>Học nền tảng</Text>
                    <Image source={require("./../../../assets/images/ellipse-white-pot.png")} />

                </View>
                <View style={styles.practicesContent}>
                    <TouchableOpacity style={styles.practicesItem}>
                        <Image style={styles.practicesItemImage} source={require("./../../../assets/images/pronunciation.png")} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.practicesItem}>
                        <Image style={styles.practicesItemImage} source={require("./../../../assets/images/listening-reading.png")} />
                    </TouchableOpacity>

                </View>

            </View>

            {/* Skills */}
            <View style={styles.wrapSkills}>
                <View style={styles.skillsHeader}>
                    <Image source={require("./../../../assets/images/ellipse-pot.png")} />
                    <Text style={styles.titleText}>Phòng giao tiếp</Text>
                    <Image source={require("./../../../assets/images/ellipse-pot.png")} />

                </View>
                <View style={styles.skillsContent}>
                    <View style={styles.skillsTitle}>
                        <Text style={[styles.skillText, styles.whiteColor]}>Phòng giao tiếp</Text>
                    </View>
                    <View style={styles.skillsImage}>
                        <Image source={require("./../../../assets/images/chitchat.png")} />
                    </View>
                </View>
            </View>
        </View>
    </View>
    </ScrollView>
  )
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: colors.brightest_green,
    },
    wrapHeader: {
        height: '10%',
        backgroundColor: colors.dark_green,
        borderWidth: 1.5,        
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderColor: colors.bright_gray_brown,
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconHeart:{
        backgroundColor: colors.white,
        flex: 1,
        height: '60%',  
        borderWidth: 1.5,        
        borderRadius: 20,
        borderColor: colors.bright_gray_brown,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginRight: '4%',
        marginLeft: '8%',
        paddingLeft: 10,
        paddingRight: 10,

    },
    iconPeanut: {
        backgroundColor: colors.white,
        flex: 1,
        height: '60%',  
        borderWidth: 1.5,        
        borderRadius: 20,
        borderColor: colors.bright_gray_brown,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginRight: '8%',
        marginLeft: '4%',
        paddingLeft: 10,
        paddingRight: 10,
    },  
    smallIcon: {
    },
    smallText: {
        color: colors.black_green,
        fontSize: 18,
        fontWeight: "500",
    },
    titleText: {
        color: colors.black_green,
        fontSize: 24,
        fontWeight: "500",
    },
    wrapFeatures: {
        margin: '10%',
        marginTop: '5%',
        marginBottom: '15%',
    },
    wrapIdioms: {
        backgroundColor: colors.white,
        borderWidth: 3,        
        borderRadius: 16,
        borderColor: colors.bright_gray_brown,
        padding: '3%',
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
    idiomsRandom: {
        alignSelf: 'center',
    },
    wrapPractices: {
        backgroundColor: colors.bright_gray_brown,
        borderRadius: 16,
        padding: '3%',
        marginTop: 15,
    },
    practicesHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    practicesContent: {
        flexDirection: 'row',
        marginTop: 6,
    },
    practicesItem: {
        flex: 1,
        // backgroundColor: colors.white,
        // height: 130,
        // borderWidth: 2,        
        // borderRadius: 16,
        // borderColor: colors.bright_gray_brown,
        // margin: 2,
        // marginBottom: 0,
        // elevation: 10,
        // shadowOffset: { width: 1, height: 1 },
        // shadowOpacity:  0.25,
        // shadowRadius: 4,
        // shawdowColor: colors.shadow_gray_brown,        
    },
    practicesItemImage: {
        flex: 1,
    },
    practicesImage: {
        height: '100%',        
        borderRadius: 16,
    },
    wrapSkills: {
        backgroundColor: colors.white,
        borderWidth: 3,        
        borderRadius: 16,
        borderColor: colors.bright_gray_brown,
        padding: '3%',
        marginTop: 15,
    },
    skillsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
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
    },

    // colorText
    brownColor: {
        color: colors.shadow_gray_brown,
    },
    whiteColor: {
        color: colors.white,
    },

  });
