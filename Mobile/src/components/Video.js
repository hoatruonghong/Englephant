import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import {
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCView,
  MediaStream,
  MediaStreamTrack,
  mediaDevices,
  registerGlobals
} from 'react-native-webrtc';
import colors from '../../assets/colors';

class Video extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rendered : false,
    }
  }

  render() {
    const {
      keyValue,
      zOrder,
      objectFit,
      style,
      streamURL,
      type
    } = this.props

    const _streamURL = streamURL && streamURL.toURL()
    console.log("logStreamURL ", streamURL, type); 
    // let mediaStream = new MediaStream();

    // // const video = document.querySelector("video");
    // let tracks = streamURL._tracks;
    
    // for (const track of tracks) {
    //   mediaStream.addTrack(track)
    // }
    
    // video.srcObject = mediaStream;
    
    // if (!this.state.rendered) this.setState({rendered: true})
    return (
      <View style={{backgroundColor: colors.blue}}>
        <RTCView
          key={keyValue}
          zOrder={zOrder}
          objectFit={objectFit}
          style={{ ...style }}
          streamURL={_streamURL}
        />
      </View>
    )
  }
}

export default Video