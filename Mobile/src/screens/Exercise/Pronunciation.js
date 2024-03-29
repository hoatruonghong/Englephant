import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Image,
  TextInput,
  SafeAreaView,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import colors from './../../../assets/colors';
import PronunciationItem from './../../components/Pronunciation';
import {useLogin} from '../../context/LoginProvider';

export default function Pronunciation({navigation}) {
  //get answers

  const {profile} = useLogin();
  const learnerId = profile._id;
  const [data, setData] = useState([]);

  //get all pronunciation lessons
  useEffect(() => {
    const uri = 'https://englephant.vercel.app/api/pronunciation/learner/' + learnerId;
    axios
      .get(uri)
      .then(function (res) {
        setData(res.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  });

  return (
    <View style={styles.container}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={({item, index}) => (
          <PronunciationItem
            item={item}
            navigation={navigation}
            learnerId={learnerId}
          />
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
    flexDirection: 'column',
    backgroundColor: colors.brightest_green,
  },
  cardContainer: {
    padding: '8%',
    paddingTop: '5%',
    paddingBottom: '5%',
  },
});
