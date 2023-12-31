import React, { useEffect, useState }  from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Modal, Text } from "react-native";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import colors from './../../../assets/colors';
import MascotCry from '../../../assets/svg/mascot_cry.svg';
import style from '../styles';
import ListenReadItem from './../../components/ListenRead';
import { useLogin } from '../../context/LoginProvider';

export default function ListenRead({navigation}) {
    
    const {profile} = useLogin();
    const learnerId = profile._id;
    const [data, setData] = useState();
    const [notiModalVisible, setNotiModalVisible] = useState(false);
    //get lessons
    useEffect(()=>{
        uri = 'https://englephant.vercel.app/api/lr/learner/'+learnerId;
        axios.get(uri)
        .then(function (res) {setData(res.data.data);})
        .catch(function (error) {
        console.log(error);
        });
    })

    const onPressInactive = ()=>{
        setNotiModalVisible(true)
    }

    return (
        <View style={styles.container}>
            <View style={styles.wrapContent}>
                <Modal 
                    transparent={true}
                    visible={notiModalVisible}
                    onRequestClose={() => {
                        setNotiModalVisible(false);
                    }}
                    >
                    <View style={styles.wrapper}>
                        <View style={styles.modalView}>
                            <View style={{flexDirection:'row', width: "100%"}}>
                            <TouchableOpacity style={[style.close, {right: "4%"}]} onPress={()=>setNotiModalVisible(false)}>
                                <FontAwesomeIcon icon="xmark"  color={colors.black_green} size={30}/>
                            </TouchableOpacity>
                            <Text style={styles.titleStyle}>Bài học chưa mở</Text>
                            </View>
                            <View style={{width: 90, height: 68, marginTop: "5%"}}>
                            <MascotCry 
                                viewBox='0 0 68 90'/>
                            </View>
                            <Text style={[styles.text, {textAlign: 'center'}]}>Hoàn thành bài học trước để mở</Text>
                        </View>
                    </View>
                </Modal>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    data={data}
                    renderItem={({item, index})=><ListenReadItem item = {item} navigation={navigation} onPressInactive= {()=>onPressInactive()}/>}
                    keyExtractor={(item) => item.id+item.name}
                />    
            </View>
        </View>
    )
};


const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        width: "80%",
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        borderWidth: 2,
        borderColor: colors.bright_gray_brown,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        elevation: 5,
        zIndex: 5,
    },
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
    },
    titleStyle: {
        color: colors.black_green,
        fontSize: 24,
        fontWeight: "bold",
        left: "10%"
    },
    text: {
      marginLeft: 10,
      color: colors.black_green,
      fontSize: 16,
    },
});
