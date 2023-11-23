import React, { useState, useEffect }  from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import colors from './../../../assets/colors';
import MascotExcited from '../../../assets/svg/mascot_more_excited.svg';
import Idiom from './../../api/Idiom';

export default function ExerciseMain({navigation}) {
    const [sentence, setSentence] = useState('');
    const [meaning, setMeaning] = useState('');

    const loadIdiom = async () => {
        const res = await Idiom.loadRandom();
        setSentence(res.data.data.sentence);
        setMeaning(res.data.data.meaning);
    };

    useEffect(()=>{
        if(sentence=='')
            loadIdiom();
    })

    return (
    <View style={styles.container}>
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
                        <Text style={styles.smallText}>{sentence}</Text>
                        <Text style={[styles.smallText, styles.brownColor]}>{meaning}</Text>
                    </View>
                    <View style={styles.idiomsImage}>
                        <MascotExcited style={styles.imgIdiom}/>
                    </View>
                </View>
                <TouchableOpacity style={styles.idiomsRandom} onPress={loadIdiom}>
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
                    <TouchableOpacity style={styles.practicesWrap} onPress={()=>navigation.navigate("Pronunciation")}>
                        <View style={styles.practicesItem}>
                            <Image style={styles.imgPractice} source={require("./../../../assets/images/pronunciate.jpg")} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.practicesWrap} onPress={()=>navigation.navigate("ListenRead")}>
                        <View style={styles.practicesItem}>
                            <Image style={styles.imgPractice} source={require("./../../../assets/images/listen_read.jpg")} />
                        </View>
                    </TouchableOpacity>
                </View>

            </View>

            {/* Skills */}
            <TouchableOpacity style={styles.wrapSkills} onPress={()=>navigation.navigate("TalkRoom")}>
                <View style={styles.skillsHeader}>
                    <Image source={require("./../../../assets/images/ellipse-pot.png")} />
                    <Text style={styles.titleText}>Luyện kĩ năng</Text>
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
            </TouchableOpacity>
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
