import React from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  useWindowDimensions,
  ImageBackground,
  UIManager
} from 'react-native';
import Map from '../../components/Map';

const DATA = [
  {
    id: '1',
    title: 'Fruit',
    bg: require("C:/Users/Tran/Englephant/Mobile/assets/images/fruit.png"),
    mode: 'Unlocked',
    star: 3
  },
  {
    id: '2',
    title: 'Family',
    bg: require("C:/Users/Tran/Englephant/Mobile/assets/images/family.png"),
    mode: 'Unlocked',
    star: 1
  },
  {
    id: '3',
    title: 'School',
    bg: require("C:/Users/Tran/Englephant/Mobile/assets/images/Locked.png"),
    mode: 'Locked',
    star: 0
  },
  {
    id: '4',
    title: 'S',
    bg: require("C:/Users/Tran/Englephant/Mobile/assets/images/Locked.png"),
    mode: 'Locked',
    star: 0
  }
];

const MapSelecting = () => {
  const {height, width} = useWindowDimensions();
  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require("C:/Users/Tran/Englephant/Mobile/assets/images/forest-landscape.png")} style={{flex:1}}>
        <FlatList
          horizontal
          pagingEnabled={true}
          snapToInterval={width/3}
          decelerationRate="normal"
          bounces={false}
          data={DATA}
          renderItem={({item}) => <Map title={item.title} bg ={item.bg} mode={item.mode} star={item.star}/>}
          contentContainerStyle={{alignItems: "stretch"}}
          style= {styles.flatlist}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => item.toString() + index}
          getItemLayout={(data, index) => ({
            length: width,
            offset: width * index,
            index,
          })}
          windowSize={1}
          initialNumToRender={3}
          maxToRenderPerBatch={3}
          removeClippedSubviews={false}
        />
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatlist: {
    width: "76%",
    height: "52%",
    alignSelf: "center",
    top: "46%"
  },
  title: {
    fontSize: 32,
  },
});

export default MapSelecting;