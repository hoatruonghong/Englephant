import React, {useRef, useState} from 'react';
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
import SideIndicator from '../../components/SideIndicator';

const DATA = [
  {
    id: '1',
    title: 'Fruit',
    bg: require("./../../../assets/images/fruit.png"),
    mode: 'Unlocked',
    star: 3
  },
  {
    id: '2',
    title: 'Family',
    bg: require("./../../../assets/images/family.png"),
    mode: 'Unlocked',
    star: 1
  },
  {
    id: '3',
    title: 'School',
    bg: require("./../../../assets/images/Locked.png"),
    mode: 'Locked',
    star: 0
  },
  {
    id: '4',
    title: 'S',
    bg: require("./../../../assets/images/Locked.png"),
    mode: 'Locked',
    star: 0
  },
  {
    id: '5',
    title: 'S',
    bg: require("./../../../assets/images/Locked.png"),
    mode: 'Locked',
    star: 0
  },
];



const MapSelecting = () => {
  const data = DATA;
  const viewabilityConfig = {
    viewAreaCoveragePercentThreshold: 100,
  };
  const viewabilityConfigCallbackPairs = useRef([{ viewabilityConfig, onViewableItemsChanged }])
  const itemCount = data.length;
  const [index, setindex] = useState(0);
  const slider = useRef(null);
  const {height, width} = useWindowDimensions();
  const onViewableItemsChanged = ({viewableItems}) => {
    setindex(viewableItems[0].index);
    console.log("Index",index);
  };
  const pressSideIndicator = props => {
    if(props.isLeft){
      if (index>0){
        console.log(index);
        slider.current.scrollToIndex({index: index-1, viewPosition: 0});
        setindex(index-1);
      }
    } else {
      if (index<itemCount){
        console.log(index);
        slider.current.scrollToIndex({index: index+1, viewPosition: 0});
        setindex(index+1);
      }
    }
  }
  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require("./../../../assets/images/forest-landscape.png")} style={styles.bg}>
        <SideIndicator 
          isLeft = {true} 
          onPress = {()=> pressSideIndicator({isLeft: true})} 
          style={styles.sideindicator} 
          width={width*0.12}/>
        <FlatList
          ref = {slider}
          horizontal = {true}
          pagingEnabled={true}
          snapToInterval={width/3}
          decelerationRate="normal"
          bounces={false}
          data={data}
          renderItem={({item}) => 
            <Map 
              title={item.title} 
              bg ={item.bg} 
              mode={item.mode} 
              star={item.star} 
              height={height} 
              width={width}
            />
          }
          ItemSeparatorComponent={() => (
            <View style={{width: width*0.05}} />
          )}
          contentContainerStyle={{alignItems: "stretch"}}
          style= {styles.flatlist}
          showsHorizontalScrollIndicator={true}
          keyExtractor={(item, index) => item.toString() + index}
          getItemLayout={(data, index) => ({
            length: width,
            offset: width * index,
            index,
          })}
          windowSize={1}
          initialNumToRender={3}
          maxToRenderPerBatch={3}
          extraData={index}
          removeClippedSubviews={false}
          viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        />
        <SideIndicator 
          isLeft = {false} 
          onPress = {()=>pressSideIndicator({isLeft: false})} 
          style={styles.sideindicator} 
          width={width*0.12}/>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bg: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row', 
    justifyContent:'center',
    alignItems: "center"
  },
  flatlist: {
    width: "76%",
    height: "52%",
  },
  sideindicator: {
    alignItems: "center"
  },
  title: {
    fontSize: 32,
  },
});

export default MapSelecting;