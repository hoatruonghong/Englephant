import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
  FlatList,
} from 'react-native';
import axios from 'axios';
import colors from './../../../assets/colors';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import { useLogin } from '../../context/LoginProvider';
import Collection from './../../components/Collection';

export default function Archive({navigation}) {
    const {profile} = useLogin();
    const learnerId = profile._id;
    const [data, setData] = useState();
    const [loadData, setLoadData] = useState(true);
    //get archive
    useEffect(()=>{
        if (loadData){
            uri = 'https://englephant.vercel.app/api/card/archive/'+learnerId;
            axios.get(uri)
            .then(function (res) {
                setData(res.data.data);
                setLoadData(false);
            })
            .catch(function (error) {
            console.log(error);
            });
        }
    })

    return (
        <View style={styles.container}>
        <FlatList
            showsHorizontalScrollIndicator={false}
            data={data}
            renderItem={({item, index}) => (
            <Collection item={item} />
            )}
            keyExtractor={(item, index) => index}
            contentContainerStyle={styles.cardContainer}
        />
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.brightest_green,
  },
  cardContainer: {
    padding: '8%',
    paddingTop: '5%',
    paddingBottom: '5%',
  },
});
