import React, { useEffect, useState }  from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import axios from 'axios';

import colors from './../../../assets/colors';
import ListenReadItem from './../../components/ListenRead';
import { useLogin } from '../../context/LoginProvider';

export default function ListenRead({navigation}) {
    
    const {profile} = useLogin();
    const learnerId = profile.id;
    const [data, setData] = useState();
    //get lessons
    useEffect(()=>{
        uri = 'http://10.0.2.2:5000/api/lr/learner/'+learnerId;
        axios.get(uri)
        .then(function (res) {setData(res.data.data);})
        .catch(function (error) {
        console.log(error);
        });
    })
    return (
        <View style={styles.container}>
            <View style={styles.wrapContent}>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    data={data}
                    renderItem={({item, index})=><ListenReadItem item = {item} navigation={navigation}/>}
                    keyExtractor={(item) => item.id+item.name}
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
