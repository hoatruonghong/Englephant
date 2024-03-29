import React from 'react';
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
  registerGlobals,
} from 'react-native-webrtc';
import Buttons from './../../components/Buttons';

import io from 'socket.io-client';
import colors from './../../../assets/colors';

class TutorRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      localStream: null,
      remoteStream: null,
    };

    this.props.navigation;
    this.socket = null;
    this.candidates = [];
    this.inRoom = false;
  }

  componentDidMount = () => {
    this.socket = io.connect(
      // "http://10.0.2.2:5000/webrtcPeer",
      'https://englephant-server.adaptable.app/webrtcPeer',
    {
      path: "/io/webrtc",
      query: {},
    });

    this.socket.on('connection-success', success => {
      console.log(success);
    });

    this.socket.on('offerOrAnswer', (sdp) => {
      // this.sdp = JSON.stringify(sdp)
      console.log("socket listen", this.inRoom);
      if(sdp.type === "answer") {
        // set sdp as remote description
        this.inRoom = true;
        
        this.pc.setRemoteDescription(new RTCSessionDescription(sdp))
      }
    })

    this.socket.on('candidate', (candidate) => {
      // this.candidates = [...this.candidates, candidate]
      this.pc.addIceCandidate(new RTCIceCandidate(candidate));
    });
    this.socket.on('disconnected', () => {
      console.log('disconnected')
      this.pc.delete(this.socket)
    });
    const pc_config = {
      iceServers: [
        // {
        //   urls: 'stun:[STUN_IP]:[PORT]',
        //   'credentials': '[YOR CREDENTIALS]',
        //   'username': '[USERNAME]'
        // },
        {
          urls: 'stun:stun.l.google.com:19302'
        },
      ],
    };

    this.pc = new RTCPeerConnection(pc_config);

    this.pc.onicecandidate = (e) => {
      // send the candidates to the remote peer
      // see addCandidate below to be triggered on the remote peer
      if (e.candidate) {
        // console.log(JSON.stringify(e.candidate))
        this.sendToPeer('candidate', e.candidate);
      }
    };

    // triggered when there is a change in connection state
    this.pc.oniceconnectionstatechange = e => {
      console.log(e);
    };
    
    this.pc.ontrack = (e) => {
      // this.remoteVideoref.current.srcObject = e.streams[0]
      this.setState({
        remoteStream: e.streams[0]
      })      
    }

    const success = (stream)=> {
      console.log("success", stream.toURL());
      this.setState({
        localStream: stream,
      });
      stream.getTracks().forEach( (track) => this.pc.addTrack( track, stream ) );
    };

    const failure = (e) => {
      console.log('getUserMedia Error: ', e);
    };

    let isFront = true;
    mediaDevices.enumerateDevices().then(sourceInfos => {
      console.log("sourceInfos", sourceInfos);
      let videoSourceId;
      for (let i = 0; i < sourceInfos.length; i++) {
        const sourceInfo = sourceInfos[i];
        if (
          sourceInfo.kind == 'videoinput' &&
          sourceInfo.facing == (isFront ? 'front' : 'environment')
        ) {
          videoSourceId = sourceInfo.deviceId;
        }
      }

      const constraints = {
        audio: true,
        video: {
          mandatory: {
            minWidth: 500,
            minHeight: 300,
            minFrameRate: 30,
          },
          facingMode: isFront ? 'user' : 'environment',
          optional: videoSourceId ? [{sourceId: videoSourceId}] : [],
        },
      };

      mediaDevices.getUserMedia(constraints).then(success).catch(failure);
    });
  };

  sendToPeer = (messageType, payload) => {
    this.socket.emit(messageType, {
      socketID: this.socket.id,
      payload,
    });
  };

  createOffer = () => {
    console.log('Offer');

    // initiates the creation of SDP
    this.pc.createOffer({offerToReceiveVideo: 1}).then(sdp => {

      // set offer sdp as local description
      this.pc.setLocalDescription(sdp);
      
      this.sendToPeer('offerOrAnswer', sdp);
    });
  };

  createAnswer = () => {
    console.log('Answer');
    this.pc.createAnswer({offerToReceiveVideo: 1}).then(sdp => {
      // console.log(JSON.stringify(sdp))
      
      // set answer sdp as local description
      this.pc.setLocalDescription(sdp);

      this.sendToPeer('offerOrAnswer', sdp);
    });
  };

  /** HANDLE CAM & MIC */
  toggleCamera = () => {
    localWebcamOn ? setlocalWebcamOn(false) : setlocalWebcamOn(true);
    localStream.getVideoTracks().forEach((track) => {
      localWebcamOn ? (track.enabled = false) : (track.enabled = true);
    });
  }
  toggleMic = () => {
    localMicOn ? setlocalMicOn(false) : setlocalMicOn(true);
    localStream.getAudioTracks().forEach((track) => {
      localMicOn ? (track.enabled = false) : (track.enabled = true);
    });
  }
  endCall = () => {
    this.socket.close()
    this.pc.close()
    console.log("close");
    this.props.navigation.goBack();
  }
  
  render() {
    const {localStream, remoteStream} = this.state;
    console.log("==============");
    console.log("local stream ", localStream);
    console.log("remote stream", remoteStream);
    const remoteVideo = remoteStream ? (
      <RTCView
        key={2}
        mirror={true}
        style={{...styles.rtcViewRemote}}
        objectFit="contain"
        streamURL={remoteStream && remoteStream.toURL()}
      />      
    ) : (
      <View style={{padding: 15}}>
        <Text style={{fontSize: 22, textAlign: 'center', color: 'white'}}>
          Waiting for peer connection ...
        </Text>
      </View>
    );

    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={{...styles.videosContainer}}>
          <ScrollView style={{...styles.scrollView}}>
            <View
              style={{
                flex: 1,
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {remoteVideo}
            </View>
          </ScrollView>
          <View
            style={{
              position: 'absolute',
              zIndex: 1,
              bottom: 10,
              right: 10,
              width: "30%",
              height: "32%",
              backgroundColor: 'black',
            }}>
            <View style={{flex: 1}}>
              <TouchableOpacity
                onPress={() => localStream._tracks[1]._switchCamera()}>
                <View>
                  <RTCView
                    key={1}
                    zOrder={0}
                    objectFit="cover"
                    style={{...styles.rtcView}}
                    streamURL={localStream && localStream.toURL()}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{...styles.buttonsContainer}}>
          {
            this.inRoom ? <View></View> 
            : <View style={{flex: 1}}>
            <TouchableOpacity onPress={this.createOffer}>
              <View style={styles.button}>
                <Text style={{...styles.textContent}}>Call</Text>
              </View>
            </TouchableOpacity>
          </View>
          }
          
          {/* <View style={{flex: 1}}>
            <TouchableOpacity onPress={this.createAnswer}>
              <View style={styles.button}>
                <Text style={{...styles.textContent}}>Answer</Text>
              </View>
            </TouchableOpacity>
          </View> */}
        </View>
        <View style={styles.btnWrap}>
          <Buttons.MicroButton />
          <Buttons.EndCallButton onPress={this.endCall} />
          <Buttons.CamButton />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
  },
  button: {
    margin: 5,
    paddingVertical: 10,
    backgroundColor: 'lightgrey',
    borderRadius: 5,
  },
  textContent: {
    fontFamily: 'Avenir',
    fontSize: 20,
    textAlign: 'center',
  },
  videosContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  rtcView: {
    width: "100%", 
    height: "100%",
    backgroundColor: 'black',
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'teal',
    padding: 15,
  },
  rtcViewRemote: {
    // width: "80%",
    // height: "80%",
    width: 500, //dimensions.width,
    height: 400, //dimensions.height / 2,
    backgroundColor: colors.blue,
  },
  btnWrap: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: colors.bright_gray_brown,
    padding: 10,
  },
});

export default TutorRoom;
