import React, {createRef, useState, useEffect, useRef, useReducer} from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Image,
  Text,
  StatusBar,
  ImageBackground,
  useWindowDimensions,
  UIManager
} from 'react-native';
import axios from 'axios';

//import component
import Map from '../../components/Map';
import SideIndicator from '../../components/SideIndicator';
import GoButton from '../../components/GoButton';

//import API
import { useLogin } from '../../context/LoginProvider';

//Require images
const topIndicator = require("./../../../assets/images/TopIndicator.png");
const bg = require("./../../../assets/images/learningbg.png");

function reducer(index, action){
  if(action.type === '+'){
    action.ref.current.scrollToIndex({index: index+1, viewPosition: 0, animated: false});
    console.log(index+1);
    return index+1;
  }
  if(action.type === '-'){
    action.ref.current.scrollToIndex({index: index-1, viewPosition: 0, animated: false});
    console.log(index-1);
    return index-1;
  }
  /*if(action.type === 'value'){
    console.log("Index",action.param);
    return action.param;
  }*/
  throw Error("Reducer problem.");
}
//MapSelecting Screen
export default function MapSelecting({navigation}) {
  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  const {profile} = useLogin();
  const {height, width} = useWindowDimensions();
  const slider = createRef();
  const [data, setData] = useState([]);
  const [index, dispatch] = useReducer(reducer,1);
  const [itemCount, setItemCount] = useState(0);

  useEffect(()=>{
    uri = 'http://10.0.2.2:5000/api/map/learner/'+profile.id+'/'+profile.mode;
    axios.get(uri)
    .then(function (res) {
      newData = res.data.data.concat({name:"None", image: "", active: true, status:0});
      setData(newData);
      setItemCount(data.length);
    })
    .catch(function (error) {
      console.log(error);
    });
  })

  //Flatlist config
  // const viewabilityConfig = {
  //   viewAreaCoveragePercentThreshold: 100,
  // };
  // const onViewableItemsChanged = ({viewableItems, changed}) => {
  //   //dispatch({type:'value', param: viewableItems[0].index});
  // };
  // const viewabilityConfigCallbackPairs = useRef([{ viewabilityConfig: viewabilityConfig, onViewableItemsChanged: onViewableItemsChanged }]);

  const pressSideIndicator = ({isLeft}) =>{
    if(isLeft){
      if (index>0)
        dispatch({type: '-', ref: slider});
    } else {
      if (index<itemCount-3)
        dispatch({type: '+', ref: slider});
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={bg} style={styles.bg}>
        <View style = {styles.top}>
        <Image
          style={{
            height: 50,
            resizeMode: 'stretch',
            alignSelf: 'center',
            top: "80%",
          }}
          source={topIndicator}
        />
        </View>
        <View style={styles.center}>
        <SideIndicator 
          isLeft = {true} 
          onPress = {()=>pressSideIndicator({isLeft: true})} 
          style={styles.sideindicator} 
          width={width*0.12}/>
        <FlatList
          ref = {slider}
          horizontal = {true}
          pagingEnabled={true}
          snapToInterval={width/3}
          decelerationRate="fast"
          bounces={false}
          data={data}
          renderItem={({item, index}) => 
            <Map 
              name={item.name} 
              image ={item.image} 
              lock={!item.active} 
              star={item.status} 
              height={height} 
              width={width}
              index={index+1}
              navigation={navigation}
              learnerId={profile.id}
            />
          }
          ItemSeparatorComponent={() => (
            <View style={{width: width*0.05}} />
          )}
          contentContainerStyle={{alignItems: "stretch"}}
          style= {styles.flatlist}
          keyExtractor={(item, index) => index}
          getItemLayout={(data, index) => ({
            length: width*0.22,
            offset: width *0.27 * index,
            index,
          })}
          extraData={index}
          windowSize={1}
          initialNumToRender={3}
          initialScrollIndex={1}
          maxToRenderPerBatch={3}
          removeClippedSubviews={false}
        />
        <SideIndicator 
          isLeft = {false} 
          onPress = {()=>pressSideIndicator({isLeft: false})} 
          style={styles.sideindicator} 
          width={width*0.12}/>
        </View>
        <View style = {{flex: 0.17}}>
          <GoButton 
            onPress={()=>{}}
            height={height} 
            width={width}
            top={height*0.025}
          />
        </View>
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
    justifyContent: 'space-between',
  },
  top: {
    flex: 0.26, 
    zIndex: 1, 
    elevation: 1
  },
  center: {
    flex: 0.57,
    width: "100%",
    height: "100%",
    flexDirection: 'row', 
    justifyContent:'center',
    alignItems: "center",
  },
  flatlist: {
    width: "76%",
    height: "100%",
  },
  sideindicator: {
    alignItems: "center"
  },
  title: {
    fontSize: 32,
  },
});