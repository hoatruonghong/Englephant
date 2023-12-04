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

const data = [
  {
    _id: "1",
    name: 'Family',
    flashcards: [
      {
        image: './../../assets/images/archive-flashcard.png',
        _id: '1',
        archived: true,
      },
      {
        image: './../../assets/images/archive-flashcard.png',
        _id: '2',
        archived: true,
      },
      {
        image: './../../assets/images/archive-flashcard.png',
        _id: '3',
        archived: false,
      },
      {
        image: './../../assets/images/archive-flashcard.png',
        _id: '4',
        archived: false,
      },
      {
        image: './../../assets/images/archive-flashcard.png',
        _id: '5',
        archived: true,
      },
      {
        image: './../../assets/images/archive-flashcard.png',
        _id: '6',
        archived: true,
      },
      {
        image: './../../assets/images/archive-flashcard.png',
        _id: '7',
        archived: true,
      },
    ],
  },
  {
    name: 'Fruit',
    _id: "2",
    flashcards: [
      {
        image: './../../assets/images/archive-flashcard.png',
        _id: '652e32f2695ef1cfb71fc33c',
        archived: true,
      },
      {
        image: './../../assets/images/archive-flashcard.png',
        _id: '652e32f2695ef1cfb71fc33d',
        archived: true,
      },
      {
        image: './../../assets/images/archive-flashcard.png',
        _id: '652e32f2695ef1cfb71fc33b',
        archived: false,
      },
      {
        image: './../../assets/images/archive-flashcard.png',
        _id: '652e32f2695ef1cfb71fc33e',
        archived: true,
      },
      {
        image: './../../assets/images/archive-flashcard.png',
        _id: '652e32f2695ef1cfb71fc33d',
        archived: true,
      },
      {
        image: './../../assets/images/archive-flashcard.png',
        _id: '652e32f2695ef1cfb71fc33b',
        archived: true,
      }
    ],
  },
];

export default function Archive({navigation}) {
    const {profile} = useLogin();
    const learnerId = profile.id;
    const [data, setData] = useState();
    const [loadData, setLoadData] = useState(true);
    //get archive
    useEffect(()=>{
        if (loadData){
            uri = 'http://10.0.2.2:5000/api/card/archive/'+learnerId;
            console.log(uri);
            axios.get(uri)
            .then(function (res) {
                console.log(res.data.data);
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
