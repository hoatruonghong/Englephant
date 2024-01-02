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

class Video extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      keyValue,
      zOrder,
      objectFit,
      style,
      streamURL
    } = this.props

    const _streamURL = streamURL && streamURL.toURL()

    return (
      <View>
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