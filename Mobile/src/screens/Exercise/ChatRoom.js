import React, {useEffect, useState, useRef} from 'react';
import {Text, View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import colors from './../../../assets/colors';
import Buttons from './../../components/Buttons';
import SocketIOClient from 'socket.io-client';
import {
	// ScreenCapturePickerView,
	RTCPeerConnection,
	RTCIceCandidate,
	RTCSessionDescription,
	RTCView,
	// MediaStream,
	// MediaStreamTrack,
	mediaDevices,
	// registerGlobals
} from 'react-native-webrtc';

export default function ChatRoom({navigation}) {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [localMicOn, setLocalMicOn] = useState(true);
  const [localWebcamOn, setLocalWebcamOn] = useState(true);

  const [type, setType] = useState('JOIN');
  const [callerId] = useState(
    Math.floor(100000 + Math.random() * 900000).toString(),
  );
  const otherUserId = useRef(null);

  function switchCamera() {
    localStream.getVideoTracks().forEach((track) => {
      track._switchCamera();
    });
  }
  function toggleCamera() {
    localWebcamOn ? setlocalWebcamOn(false) : setlocalWebcamOn(true);
    localStream.getVideoTracks().forEach((track) => {
      localWebcamOn ? (track.enabled = false) : (track.enabled = true);
    });
  }
  function toggleMic() {
    localMicOn ? setlocalMicOn(false) : setlocalMicOn(true);
    localStream.getAudioTracks().forEach((track) => {
      localMicOn ? (track.enabled = false) : (track.enabled = true);
    });
  }

  const socket = SocketIOClient('http://192.168.1.10:8000', {
    transports: ['websocket'],
    query: {
      callerId,
    },
  });

  const peerConnection = useRef(
    new RTCPeerConnection({
      iceServers: [
        {
          urls: 'stun:stun.l.google.com:19302',
        },
        {
          urls: 'stun:stun1.l.google.com:19302',
        },
        {
          urls: 'stun:stun2.l.google.com:19302',
        },
      ],
    }),
  );
  /** WebRTC call are established between peers */
  let remoteRTCMessage = useRef(null);

  useEffect(() => {
    socket.on('newCall', (data) => {
      /* any peer wishes to establish a call with you */
      remoteRTCMessage.current = data.rtcMessage;
      otherUserId.current = data.callerId;
      setType('INCOMING_CALL');
    });
    socket.on('callAnswered', (data) => {
      /* remote peer accept the call */
      remoteRTCMessage.current = data.rtcMessage;
      peerConnection.current.setRemoteDescription(
        new RTCSessionDescription(remoteRTCMessage.current)
      );
      setType('WEBRTC_ROOM');
    });
    socket.on('ICEcandidate', (data) => {
      /* exchangin candidates */
      let message = data.rtcMessage;

      if (peerConnection.current) {
        peerConnection?.current
        .addIceCandidate(new RTCIceCandidate(message.candidate))
        .then((data) => {
          console.log('SUCCESS');
        })
        .catch((error) => {
          console.log('ERROR', error);
        });
      }
    });

    peerConnection.current.onicecandidate = (event) => {
      if (event.candidate) {
        sendICEcandidate({
          calleeId: otherUserId.current,
          rtcMessage: {
            label: event.candidate.sdpMLineIndex,
            id: event.candidate.sdpMid,
            candidate: event.candidate.candidate,
          },
        });
      } else {
        console.log("End of candidates.");
      }
    };

    let isFront = false;

    /* MediaDevices interface allows us to access connected media input (cameras and mic) */
    mediaDevices.enumerateDevices().then(sourceInfos => {
      let videoSourceId;
      for (let i = 0; i < sourceInfos.length; i++) {
        const sourceInfo = sourceInfos[i];
        if ( sourceInfo.kind == 'videoinput' && sourceInfo.facing == (isFront? 'user':'environment') ) {
          videoSourceId = sourceInfo.deviceId;
        }
      };

      mediaDevices.getUserMedia({
        audio: true,
        video: {
          mandatory: {
            minWidth: 500,
            minHeight: 300,
            minFrameRate: 30,
          },
          facingMode: isFront ? 'user' : 'environment',
          optional: videoSourceId ? [{sourceId: videoSourceId}] : []
        },
      }).then(stream => {
        //get local stream
        setLocalStream(stream);

        //setup stream listening
        peerConnection.current.addStream(stream);
      }).catch(error => {
        console.log(error);
      });
    });

    peerConnection.current.onaddstream = event => {
      setRemoteStream(event.stream);
    };

    peerConnection.current.onicecandidate = event => {
      //
    };

    return () => {
      socket.off('newCall');
      socket.off('callAnswered');
      socket.off('ICEcandidate');
    };

  }, []);

  async function processCall() {
    const sessionDescription = await peerConnection.current.createOffer();
    await peerConnection.current.setLocalDescription(sessionDescription);
    sendCall({
      calleeId: otherUserId.current,
      rtcMessage: sessionDescription,
    });
  }

  async function processAccept() {
    peerConnection.current.setRemoteDescription(
      new RTCSessionDescription(remoteRTCMessage.current)
    );

    const sessionDescription = await peerConnection.current.createAnswer();

    await peerConnection.current.setLocalDescription(sessionDescription);
    answerCall({
      callerId: otherUserId.current,
      rtcMessage: sessionDescription,
    });
  }

  function answerCall(data) {
    socket.emit("answerCall", data);    
  }
  function sendCall(data) {
    socket.emit("call", data);    
  }
  function leave() {
    peerConnection.current.close();
    setLocalStream(null);
    setType("JOIN");
  }

  //UI

  const JoinScreen = () => {
    return (
      <View style={styles.container}>        
        <Text>{callerId}</Text>
        <Text>Enter call id of another user</Text>
        <TextInput
          placeholder={'******'}
          value={otherUserId.current}
          keyboardType={'number-pad'}
          setValue={text => {
            otherUserId.current = text;
          }}
        />
        <TouchableOpacity
          onPress={() => {
            processCall();
            setType('OUTGOING_CALL');
          }}
          style={{
            height: 50,
            backgroundColor: '#5568FE',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 12,
            marginTop: 16,
          }}>
          <Text
            style={{
              fontSize: 16,
              color: '#FFFFFF',
            }}>
            Call Now
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const OutGoingCallScreen = () => {
    return (
      <View style={styles.container}>        
        <Text>Calling to ...</Text>
        <Text>{otherUserId.current}</Text>
        <TouchableOpacity
          onPress={() => {
            setType('JOIN');
            otherUserId.current = null;
          }}
          style={{
            height: 50,
            backgroundColor: '#5568FE',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 12,
            marginTop: 16,
          }}>
          <Text
            style={{
              fontSize: 16,
              color: '#FFFFFF',
            }}>
            Call end
          </Text>
        </TouchableOpacity>
      </View>
    )
  };

  const IncomingCallScreen = () => {
    return (
      <View style={styles.container}>
        <Text>{otherUserId.current} is calling...</Text>
        <TouchableOpacity
          onPress={() => {
            processAccept();
            setType('WEBRTC_ROOM');
          }}
          style={{
            height: 50,
            backgroundColor: '#5568FE',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 12,
            marginTop: 16,
          }}>
          <Text
            style={{
              fontSize: 16,
              color: '#FFFFFF',
            }}>
            Call answer
          </Text>
        </TouchableOpacity>
      </View>
    )
  };

  const WebRTCRoomScreen = () => {
    return (
      <View style={styles.container}>
        {localStream ? (
          <RTCView
            objectFit={'cover'}
            style={{flex: 1, backgroundColor: colors.main_green}}
            streamURL={localStream.toURL()}
          />
        ) : null}
        {remoteStream ? (
          <RTCView
            objectFit={'cover'}
            style={{flex: 1, backgroundColor: colors.blue, marginTop: 5}}
            streamURL={remoteStream.toURL()}
          />
        ) : null}
        <View style={styles.btnWrap}>
          <Buttons.MicroButton />
          <Buttons.EndCallButton />
          <Buttons.CamButton />
        </View>
      </View>
    )
  };

  console.log(type);
  // switch (type) {
  //   case 'JOIN':
  //     return JoinScreen();
  //   case 'INCOMING_CALL':
  //     return IncomingCallScreen();
  //   case 'OUTGOING_CALL':
  //     return OutGoingCallScreen();
  //   case 'WEBRTC_ROOM':
  //     return WebRTCRoomScreen();
  //   default:
  //     return null;
  // }
  return WebRTCRoomScreen();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.brightest_green,
  },
  btnWrap: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: colors.bright_gray_brown
  }
});
