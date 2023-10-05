import React, {Component, createRef, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Image,
  Text,
  StatusBar,
  ImageBackground,
  UIManager
} from 'react-native';
import axios from 'axios';
import Map from '../../components/Map';
import SideIndicator from '../../components/SideIndicator';
import GoButton from '../../components/GoButton';
import NavigationBar from '../../components/NavigationBar';

//Require images
const topIndicator = require("./../../../assets/images/TopIndicator.png");
const bg = require("./../../../assets/images/forest-landscape.png");



//MapSelecting Screen
class MapSelecting extends Component {
  slider = createRef();
  constructor(props) {
    super(props);
    this.state = {
      index: 2,
      data: this.props.data,
      itemCount: this.props.data.length
    };
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  componentDidMount(){
    this.slider.current.scrollToIndex({index: this.state.index-1})
  }

  componentDidUpdate(prevprops) {
    if (prevprops.data !== this.props.data) 
      this.setState({ data: this.props.data });
  }

  pressSideIndicator = props => {
    if(props.isLeft){
      if (this.state.index>1){
        this.slider.current.scrollToIndex({index: this.state.index-2, viewPosition: 0});
        this.setState({index: this.state.index - 1});
      }
    } else {
      if (this.state.index<this.state.itemCount){
        this.slider.current.scrollToIndex({index: this.state.index, viewPosition: 0});
        this.setState({index: this.state.index + 1});
      }
    }
  }

  viewabilityConfig = {
    viewAreaCoveragePercentThreshold: 100,
  };
  onViewableItemsChanged = ({viewableItems}) => {
    this.setState({index: viewableItems[0].index});
    console.log("Index",this.state.index);
  };
  viewabilityConfigCallbackPairs = createRef([{ viewabilityConfig: this.viewabilityConfig, onViewableItemsChanged: this.onViewableItemsChanged }])

  render(){
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
            onPress = {()=> this.pressSideIndicator({isLeft: true})} 
            style={styles.sideindicator} 
            width={this.props.width*0.12}/>
          <FlatList
            ref = {this.slider}
            horizontal = {true}
            pagingEnabled={false}
            snapToInterval={this.props.width/3}
            decelerationRate="normal"
            bounces={false}
            data={this.state.data}
            renderItem={({item, index}) => 
              <Map 
                title={item.title} 
                bg ={item.bg} 
                mode={item.mode} 
                star={item.star} 
                height={this.props.height} 
                width={this.props.width}
              />
            }
            ItemSeparatorComponent={() => (
              <View style={{width: this.props.width*0.05}} />
            )}
            contentContainerStyle={{alignItems: "stretch"}}
            style= {styles.flatlist}
            showsHorizontalScrollIndicator={true}
            keyExtractor={(item, index) => item.toString() + index}
            getItemLayout={(data, index) => ({
              length: this.props.width*0.27,
              offset: this.props.width *0.27 * index,
              index,
            })}
            extraData={this.state}
            windowSize={1}
            initialNumToRender={3}
            maxToRenderPerBatch={3}
            removeClippedSubviews={false}
            viewabilityConfigCallbackPairs={this.viewabilityConfigCallbackPairs.current}
          />
          <SideIndicator 
            isLeft = {false} 
            onPress = {()=>this.pressSideIndicator({isLeft: false})} 
            style={styles.sideindicator} 
            width={this.props.width*0.12}/>
          </View>
          <View style = {{flex: 0.16}}>
            <GoButton 
              onPress={()=>{}}
              height={this.props.height} 
              width={this.props.width}
              top={this.props.height*0.035}
            />
          </View>
          <View style = {styles.bottom}>
            
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }
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
    flex: 0.24, 
    zIndex: 1, 
    elevation: 1
  },
  center: {
    flex: 0.52,
    width: "100%",
    height: "100%",
    flexDirection: 'row', 
    justifyContent:'center',
    alignItems: "center",
  },
  bottom: {
    flex: 0.08,
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

export default MapSelecting;