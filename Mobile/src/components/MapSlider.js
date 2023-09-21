import React, {Component, createRef} from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
  Dimensions,
} from 'react-native';
import Indicator from './Indicator';
import Map from './Map1';

class FlatListSlider extends Component {
  slider = createRef();

  static defaultProps = {
    data: [],
    imageKey: 'image',
    local: false,
    width: Math.round(Dimensions.get('window').width),
    height: 230,
    separatorWidth: 15,
    loop: true,
    indicator: true,
    indicatorStyle: {},
    indicatorContainerStyle: {},
    indicatorActiveColor: '#3498db',
    indicatorInActiveColor: '#bdc3c7',
    indicatorActiveWidth: 6,
    animation: true,
    onPress: {},
    contentContainerStyle: {},
    component: <Map/>,
  };

  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      data: this.props.data,
    };
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  /*componentDidUpdate(prevprops) {
    if (prevprops.data !== this.props.data) this.setState({ data: this.props.data });
  }*/


  render() {
    return (
      <View style={{backgroundColor: "#555555"}}>
        <FlatList
          ref={this.slider}
          horizontal
          pagingEnabled={true}
          snapToInterval={75}
          decelerationRate="fast"
          bounces={false}
          contentContainerStyle={this.props.contentContainerStyle}
          data={this.state.data}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => <Map title={item.title} bg ={item.bg} mode={item.mode} star={item.star}/>}
          ItemSeparatorComponent={() => (
            <View style={{width: this.props.separatorWidth}} />
          )}
          keyExtractor={(item, index) => item.toString() + index}
          onViewableItemsChanged={this.onViewableItemsChanged}
          viewabilityConfig={this.viewabilityConfig}
          getItemLayout={(data, index) => ({
            length: 75,
            offset: 75 * index,
            index,
          })}
          windowSize={1}
          initialNumToRender={1}
          maxToRenderPerBatch={1}
          removeClippedSubviews={true}
        />
        {this.props.indicator && (
          <Indicator
            itemCount={this.props.data.length}
            currentIndex={this.state.index % this.props.data.length}
            indicatorStyle={this.props.indicatorStyle}
            indicatorContainerStyle={[
              styles.indicatorContainerStyle,
              this.props.indicatorContainerStyle,
            ]}
            indicatorActiveColor={this.props.indicatorActiveColor}
            indicatorInActiveColor={this.props.indicatorInActiveColor}
            indicatorActiveWidth={this.props.indicatorActiveWidth}
            style={{...styles.indicator, ...this.props.indicatorStyle}}
          />
        )}
      </View>
    );
  };

  onViewableItemsChanged = ({viewableItems, changed}) => {
    if (viewableItems.length > 0) {
      let currentIndex = viewableItems[0].index;
      if (
        currentIndex % this.props.data.length === this.props.data.length - 1 &&
        this.props.loop
      ) {
        this.setState({
          index: currentIndex,
          data: [...this.state.data, ...this.props.data],
        });
      } else {
        this.setState({index: currentIndex});
      }

      if (this.props.currentIndexCallback) {
        this.props.currentIndexCallback(currentIndex);
      }
    }
  };

  viewabilityConfig = {
    viewAreaCoveragePercentThreshold: 50,
  };

  changeSliderListIndex = () => {
    if (this.props.animation) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeIn);
    }
    this.setState({index: this.state.index + 1});
    this.slider.current.scrollToIndex({
      index: this.state.index,
      animated: true,
    });
  };

}

const styles = StyleSheet.create({
  image: {
    height: 230,
    resizeMode: 'stretch',
  },
  indicatorContainerStyle: {
    marginTop: 18,
  },
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: {width: 3, height: 3},
        shadowOpacity: 0.4,
        shadowRadius: 10,
      },
      android: {
        elevation: 5,
      },
    }),
  },
});

export default FlatListSlider;