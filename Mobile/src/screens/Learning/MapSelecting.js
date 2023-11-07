import React, {createRef, useState, useEffect, useReducer} from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Image,
  Text,
  Modal,
  ImageBackground,
  TouchableOpacity,
  useWindowDimensions,
  UIManager
} from 'react-native';
import axios from 'axios';

//import components
import Map from '../../components/Map';
import SideIndicator from '../../components/SideIndicator';
import GoButton from '../../components/GoButton';
import SmallButton from '../../components/SmallButton';

import { useLogin } from '../../context/LoginProvider';

//import assets
import colors from '../../../assets/colors';
import MascotDef from '../../../assets/svg/mascot_default.svg';
import MascotCry from '../../../assets/svg/mascot_cry.svg';
import style from '../styles';

//Require images
const topIndicator = require("./../../../assets/images/TopIndicator.png");
const bg = require("./../../../assets/images/learningbg.png");
const avatar = require("./../../../assets/images/elephant-happy.png")

//import icons
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faList } from '@fortawesome/free-solid-svg-icons/faList';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons/faCircleInfo';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

library.add(faList, faCircleInfo, faXmark);


function reducer(id, action){
  if(action.type === '+'){
    action.ref.current.scrollToIndex({index: id+1, viewPosition: 0, animated: false});
    return id+1;
  }
  if(action.type === '-'){
    action.ref.current.scrollToIndex({index: id-1, viewPosition: 0, animated: false});
    return id-1;
  }
  throw Error("Reducer problem.");
}
//MapSelecting Screen
export default function MapSelecting({navigation}) {
  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  const {profile} = useLogin();
  const learnerId = profile.id;
  const {height, width} = useWindowDimensions();
  const slider = createRef();
  const [data, setData] = useState([]);
  const [id, dispatch] = useReducer(reducer,1);
  const [itemCount, setItemCount] = useState(0);
  const [notiModalVisible, setNotiModalVisible] = useState(false);
  const [exchangeModalVisible, setExchangeModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState('');

  //get maps
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

  //onPress functions
  const onPressLockedMap = ({index})=>{
    uri = 'http://10.0.2.2:5000/api/map/lock/'+learnerId+'/'+index;
    axios.get(uri)
    .then(function (res) {
      if (res.action === "Mở map")
        axios.post('http://10.0.2.2:5000/api/map/unlock/'+learnerId+'/'+index)
        .then(
          navigation.navigate(index.toString)
        )
        .catch(function (error) {
          console.log(error);
        });
      else if (res.data.isFree){ 
        setNotiModalVisible(true);
        setModalContent(res.data.condition);
      }
      else {
        setExchangeModalVisible(true);
        setModalContent(res.data.condition);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  const onPressUnlockedMap = ({index})=>{
    uri = 'http://10.0.2.2:5000/api/map/learn/'+learnerId+'/'+index;
    axios.get(uri)
    .then(function (res) {
      setData(res.data.data);
      console.log(res.data.data);
      navigation.navigate(index.toString());
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  const onPressGoButton = ()=>{
    index = id+1;
    if (data[index].active) onPressUnlockedMap({index: index})
    else onPressLockedMap({index: index})
  }

  const pressSideIndicator = ({isLeft}) =>{
    if(isLeft){
      if (id>0)
        dispatch({type: '-', ref: slider});
    } else {
      if (id<itemCount-3)
        dispatch({type: '+', ref: slider});
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={bg} style={styles.bg}>
        <View style = {styles.top}>
          <View style = {styles.subtop}>
            <View style={styles.avatar}>
              <Image
                style={{
                  top: "10%",
                  height: "80%",
                  aspectRatio: 1.05,
                  resizeMode: 'cover',
                  alignSelf: "center",
                }}
                source={avatar}
              />
            </View>
            <View style={styles.chat}>
              <Text style={styles.text}>Have a nice day!!!</Text>
            </View>
            <SmallButton onPress={()=>{}} width={width} icon={faList}/>
            <SmallButton onPress={()=>{}} width={width} icon={faCircleInfo}/>
          </View>
          <Image
            style={{
              top: "10%",
              height: height*0.05,
              width: width*0.14,
              resizeMode: 'stretch',
              alignSelf: 'center',
            }}
            source={topIndicator}
          />
        </View>
        <View style={styles.center}>
        <Modal 
          transparent={true}
          visible={notiModalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
      >
        <View style={styles.wrapper}>
        <View style={styles.modalView}>
          <View style={{flexDirection:'row', width: "100%"}}>
          <TouchableOpacity style={[style.close, {right: "4%"}]} onPress={()=>setNotiModalVisible(false)}>
                <FontAwesomeIcon icon="xmark"  color={colors.black_green} size={30}/>
            </TouchableOpacity>
            <Text style={styles.titleStyle}>Map chưa mở</Text>
          </View>
          <View style={{width: 90, height: 68, marginTop: "5%"}}>
          <MascotCry 
              viewBox='0 0 68 90'/>
          </View>
          <Text style={[styles.textStyle, {textAlign: 'center'}]}>{modalContent}</Text>
        </View>
        </View>
            
      </Modal>
        <SideIndicator 
          isLeft = {true} 
          onPress = {()=>pressSideIndicator({isLeft: true})} 
          style={styles.sideindicator} 
          width={width*0.12}
          height={height*0.07}/>
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
              index={index}
              navigation={navigation}
              learnerId={profile.id}
              onPressLockedMap={()=>onPressLockedMap({index: index})}
              onPressUnlockedMap={()=>onPressUnlockedMap({index: index})}
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
          extraData={id}
          windowSize={1}
          initialNumToRender={3}
          initialScrollIndex={0}
          maxToRenderPerBatch={3}
          removeClippedSubviews={false}
        />
        <SideIndicator 
          isLeft = {false} 
          onPress = {()=>pressSideIndicator({isLeft: false})} 
          style={styles.sideindicator} 
          width={width*0.12}
          height={height*0.07}/>
        </View>
        <View style = {styles.bottom}>
          <GoButton 
            onPress={()=>onPressGoButton()}
            height={height} 
            width={width}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
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
  titleStyle: {
    color: colors.black_green,
    fontSize: 24,
    fontWeight: "bold",
    left: "10%"
  },
  container: {
    flex: 1,
  },
  bg: {
    flex: 1,
    justifyContent: 'space-between',
  },
  top: {
    flex: 0.15, 
    zIndex: 1, 
    elevation: 1,
  },
  subtop: {
    top: '4%',
    flexDirection: 'row',
    alignSelf: "center"
  },
  center: {
    flex: 0.62,
    width: "100%",
    height: "100%",
    flexDirection: 'row', 
    justifyContent:'center',
    alignItems: "center",
  },
  bottom: {
    flex: 0.14
  },
  avatar: {
    top: "-1%",
    height: "90%",
    aspectRatio: 1,
    borderRadius: 50,
    backgroundColor: "#9FC55A",
    alignItems: "center",
    marginRight:"2%"
  },
  chat: {
    height: "80%",
    aspectRatio: 2,
    backgroundColor: colors.white,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.bright_gray_brown,
    justifyContent: "center"
  },
  flatlist: {
    width: "76%",
    height: "100%",
  },
  sideindicator: {
    alignItems: "center"
  },
  text: {
    color: colors.black_green,
    fontSize: 16,
  },
});