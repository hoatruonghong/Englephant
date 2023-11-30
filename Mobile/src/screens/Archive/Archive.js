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
import colors from './../../../assets/colors';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import Collection from './../../components/Collection';

const data = [
  {
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
  return (
    <View style={styles.container}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={({item, index}) => (
          <Collection item={item} />
        )}
        keyExtractor={item => item.id + item.name}
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
