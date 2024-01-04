import React, { Component } from 'react';
import Video from './../components/tutor/Video';
import Videos from './../components/tutor/Videos';
import Chat from './../components/tutor/Chat';
import Draggable from './../components/tutor/Draggable';

import { io } from 'socket.io-client'
import connectIOSocket from '../utils/connectIO';

class Room extends Component {
  constructor(props) {
    super(props)

    this.state = {
      localStream: null,    // used to hold local stream object to avoid recreating the stream everytime a new offer comes
      remoteStream: null,    // used to hold remote stream object that is displayed in the main screen

      remoteStreams: [],    // holds all Video Streams (all remote streams)
      peerConnections: {},  // holds all Peer Connections
      selectedVideo: null,

      status: 'Please wait...',

      pc_config: {
        "iceServers": [
          {
            urls : 'stun:stun.l.google.com:19302'
          }
        ]
      },

      sdpConstraints: {
        'mandatory': {
            'OfferToReceiveAudio': true,
            'OfferToReceiveVideo': true
        }
      },

      messages: [],
      sendChannels: [],
      disconnected: false,
      rendered : false,
    }

    // DONT FORGET TO CHANGE TO YOUR URL
    this.serviceIP = 'https://englephant-server.adaptable.app/webrtcPeer'

    // this.localVideoref = React.createRef()
    // this.remoteVideoref = React.createRef()

    this.socket = null
    this.sender = null
    // this.candidates = []
  }

  getLocalStream = () => {
    // called when getUserMedia() successfully returns - see below
    // getUserMedia() returns a MediaStream object
    const success = (stream) => {
      console.log('localStream...', stream);
      window.localStream = stream
      // this.localVideoref.current.srcObject = stream
      // this.pc.addStream(stream);
      this.setState({
        localStream: stream
      })

      this.whoisOnline()
    }

    // called when getUserMedia() fails - see below
    const failure = (e) => {
      console.log('getUserMedia Error: ', e)
    }

    // see the above link for more constraint options
    const constraints = {
      audio: true,
      video: true,
      options: {
        mirror: true,
      }
    }

    navigator.mediaDevices.getUserMedia(constraints)
      .then(success)
      .catch(failure)
  }

  whoisOnline = () => {
    // let all peers know I am joining
    this.sendToPeer('onlinePeers', null, {local: this.socket.id})
  }

  sendToPeer = (messageType, payload, socketID) => {
    this.socket.emit(messageType, {
      socketID,
      payload
    })
  }

  createPeerConnection = (socketID, callback) => {
    console.log("socketID", socketID);

    try {
      let pc = new RTCPeerConnection(this.state.pc_config)
      console.log("check pc", pc);

      // add pc to peerConnections object
      const peerConnections = { ...this.state.peerConnections, [socketID]: pc }
      this.setState({
        peerConnections
      })

      pc.onicecandidate = (e) => {
        if (e.candidate) {
          console.log("onicecandidate", e.candidate);
          this.sendToPeer('candidate', e.candidate, {
            local: this.socket.id,
            remote: socketID
          })
        }
      }

      pc.oniceconnectionstatechange = (e) => {
        console.log("on ice connection", e, pc.iceConnectionState);
        // if (pc.iceConnectionState === 'disconnected') {
        //   const remoteStreams = this.state.remoteStreams.filter(stream => stream.id !== socketID)

        //   this.setState({
        //     remoteStream: remoteStreams.length > 0 && remoteStreams[0].stream || null,
        //   })
        // }

      }

      pc.ontrack = (e) => {
        console.log("on track");

        let _remoteStream = null
        let remoteStreams = this.state.remoteStreams
        let remoteVideo = {}


        // 1. check if stream already exists in remoteStreams
        const rVideos = this.state.remoteStreams.filter(stream => stream.id === socketID)

        // 2. if it does exist then add track
        if (rVideos.length) {
          _remoteStream = rVideos[0].stream
          _remoteStream.addTrack(e.track, _remoteStream)

          remoteVideo = {
            ...rVideos[0],
            stream: _remoteStream,
          }
          remoteStreams = this.state.remoteStreams.map(_remoteVideo => {
            return _remoteVideo.id === remoteVideo.id ? remoteVideo : _remoteVideo
          })
        } else {
          // 3. if not, then create new stream and add track
          _remoteStream = new MediaStream()
          _remoteStream.addTrack(e.track, _remoteStream)
          if (this.state.remoteStream === null) 
          {
            console.log("remoteee", _remoteStream);
            this.setState({remoteStream: _remoteStream})
          }

          remoteVideo = {
            id: socketID,
            name: socketID,
            stream: _remoteStream,
          }
          remoteStreams = [...this.state.remoteStreams, remoteVideo]
        }

        // const remoteVideo = {
        //   id: socketID,
        //   name: socketID,
        //   stream: e.streams[0]
        // }

        this.setState(prevState => {

          // If we already have a stream in display let it stay the same, otherwise use the latest stream
          // const remoteStream = prevState.remoteStreams.length > 0 ? {} : { remoteStream: e.streams[0] }
          const remoteStream = prevState.remoteStreams.length > 0 ? {} : { remoteStream: _remoteStream }

          // get currently selected video
          let selectedVideo = prevState.remoteStreams.filter(stream => stream.id === prevState.selectedVideo.id)
          // if the video is still in the list, then do nothing, otherwise set to new video stream
          selectedVideo = selectedVideo.length ? {} : { selectedVideo: remoteVideo }

          return {
            // selectedVideo: remoteVideo,
            ...selectedVideo,
            // remoteStream: e.streams[0],
            ...remoteStream,
            remoteStreams, //: [...prevState.remoteStreams, remoteVideo]
          }
        })
      }

      pc.close = () => {
        // alert('GONE')
        const senders = pc.getSenders();
        senders.forEach((sender) => pc.removeTrack(sender));
        console.log("pc closed");
      }
      
      if (this.state.localStream){
        this.state.localStream.getTracks().forEach(track => {
          pc.addTrack(track, this.state.localStream)
        })
        console.log("getTrack", this.state.localStream.getTracks());

      }
      // return pc
      callback(pc)

    } catch(e) {
      console.log('Something went wrong! pc not created!!', e)
      // return;
      callback(null)
    }
  }

  componentDidMount = () => {
    // if (this.state.rendered) {
    

    if (this.socket === null)
      this.socket = connectIOSocket
    // this.socket = io.connect(
    //   this.serviceIP,
    //   {
    //     path: '/io/webrtc',
    //     query: {
    //       room: window.location.pathname,
    //     }
    //   }
    // )

    this.socket.on('connection-success', data => {

      this.getLocalStream()

      console.log("connect success",data.success)
      const status = data.peerCount > 1 ? `Total Connected Peers to room ${window.location.pathname}: ${data.peerCount}` : 'Waiting for other peers to connect'

      this.setState({
        status: status,
        messages: data.messages
      })
    })

    this.socket.on('joined-peers', data => {
      console.log("joined", data);

      this.setState({
        status: data.peerCount > 1 ? `Total Connected Peers to room ${window.location.pathname}: ${data.peerCount}` : 'Waiting for other peers to connect'
      })
    })

    // ************************************* //
    // ************************************* //
    this.socket.on('peer-disconnected', data => {

      // close peer-connection with this peer
      console.log("peer-disconnect", this.state.peerConnections[data.socketID]);
      if (typeof this.state.peerConnections[data.socketID] == typeof undefined) return
      this.state.peerConnections[data.socketID].close()

      // get and stop remote audio and video tracks of the disconnected peer
      const rVideo = this.state.remoteStreams.filter(stream => stream.id === data.socketID)
      rVideo && this.stopTracks(rVideo[0].stream)

      // filter out the disconnected peer stream
      const remoteStreams = this.state.remoteStreams.filter(stream => stream.id !== data.socketID)

      this.setState(prevState => {
        // check if disconnected peer is the selected video and if there still connected peers, then select the first
        const selectedVideo = prevState.selectedVideo.id === data.socketID && remoteStreams.length ? { selectedVideo: remoteStreams[0] } : null

        return {
          // remoteStream: remoteStreams.length > 0 && remoteStreams[0].stream || null,
          remoteStreams,
          ...selectedVideo,
          status: data.peerCount > 1 ? `Total Connected Peers to room ${window.location.pathname}: ${data.peerCount}` : 'Waiting for other peers to connect'
        }
        }
      )
    })

    this.socket.on('online-peer', socketID => {
      console.log('online-peer ...', socketID)

      // create and send offer to the peer (data.socketID)
      // 1. Create new pc
      // this.createPeerConnection(socketID, pc => {

      //   // 2. Create Offer
      //   if (pc) {
      
      //     // Send Channel
      //     const handleSendChannelStatusChange = (event) => {
      //       console.log('send channel status: ' + this.state.sendChannels[0].readyState)
      //     }

      //     const sendChannel = pc.createDataChannel('sendChannel')
      //     sendChannel.onopen = handleSendChannelStatusChange
      //     sendChannel.onclose = handleSendChannelStatusChange
        
      //     this.setState(prevState => {
      //       return {
      //         sendChannels: [...prevState.sendChannels, sendChannel]
      //       }
      //     })


      //     // Receive Channels
      //     const handleReceiveMessage = (event) => {
      //       const message = JSON.parse(event.data)
      //       // console.log(message)
      //       this.setState(prevState => {
      //         return {
      //           messages: [...prevState.messages, message]
      //         }
      //       })
      //     }

      //     const handleReceiveChannelStatusChange = (event) => {
      //       if (this.receiveChannel) {
      //         console.log("receive channel's status has changed to " + this.receiveChannel.readyState);
      //       }
      //     }

      //     const receiveChannelCallback = (event) => {
      //       const receiveChannel = event.channel
      //       receiveChannel.onmessage = handleReceiveMessage
      //       receiveChannel.onopen = handleReceiveChannelStatusChange
      //       receiveChannel.onclose = handleReceiveChannelStatusChange
      //     }

      //     pc.ondatachannel = receiveChannelCallback


      //     pc.createOffer(this.state.sdpConstraints)
      //       .then(sdp => {
      //         console.log("sdpp", sdp);
      //         pc.setLocalDescription(sdp)

      //         this.sendToPeer('offer', sdp, {
      //           local: this.socket.id,
      //           remote: socketID
      //         })
      //       })
      //       .catch(e=>console.log("sdppp",e))
      //   }
      // })
    })

    this.socket.on('offer', data => {
      this.createPeerConnection(data.socketID, pc => {
        console.log("in offer", this.state, pc, typeof pc, data);
        if(pc === null) {
          console.log("checkk");
          return 
        }
        
        // if (this.state.localStream)
        // this.state.localStream.getTracks().forEach(track => {
        //   pc.addTrack(track, this.state.localStream)
        // })

        // Send Channel
        const handleSendChannelStatusChange = (event) => {
          console.log('send channel status: ' + this.state.sendChannels[0].readyState)
        }

        const sendChannel = pc.createDataChannel('sendChannel')
        sendChannel.onopen = handleSendChannelStatusChange
        sendChannel.onclose = handleSendChannelStatusChange
        
        this.setState(prevState => {
          return {
            sendChannels: [...prevState.sendChannels, sendChannel]
          }
        })

        // Receive Channels
        const handleReceiveMessage = (event) => {
          const message = JSON.parse(event.data)
          // console.log(message)
          this.setState(prevState => {
            return {
              messages: [...prevState.messages, message]
            }
          })
        }

        const handleReceiveChannelStatusChange = (event) => {
          if (this.receiveChannel) {
            console.log("receive channel's status has changed to " + this.receiveChannel.readyState);
          }
        }

        const receiveChannelCallback = (event) => {
          const receiveChannel = event.channel
          receiveChannel.onmessage = handleReceiveMessage
          receiveChannel.onopen = handleReceiveChannelStatusChange
          receiveChannel.onclose = handleReceiveChannelStatusChange
        }

        pc.ondatachannel = receiveChannelCallback

        console.log("in offer set remote");
        pc.setRemoteDescription(new RTCSessionDescription(data.sdp)).then(() => {
          // 2. Create Answer
          pc.createAnswer(this.state.sdpConstraints)
            .then(sdp => {
              console.log("answer sdp",sdp);
              pc.setLocalDescription(sdp)

              this.sendToPeer('answer', sdp, {
                local: this.socket.id,
                remote: data.socketID
              })
            })
            .catch(e=>console.log("a",e))
        }).catch(e=>{console.log("check remote", e);})
      })
    })

    // this.socket.on('answer', data => {
    //   // get remote's peerConnection
    //   const pc = this.state.peerConnections[data.socketID]
    //   console.log("answer",data.sdp)
    //   // if (pc.signalingState !== "stable")
    //   pc.setRemoteDescription(new RTCSessionDescription(data.sdp)).then(()=>{}).catch((e)=>{console.log("remote",e);})
    // })

    this.socket.on('candidate', (data) => {
      // get remote's peerConnection
      console.log("candidate", data);
      const pc = this.state.peerConnections[data.socketID]
      console.log("this pc", pc);

      if (pc){
        pc.addIceCandidate(new RTCIceCandidate(data.candidate))
        .then(()=>console.log("addCandidate", data.candidate))
        .catch((e)=>console.log("fail", e))

        pc.addEventListener("icegatheringstatechange", (ev) => {
          switch (pc.iceGatheringState) {
            case "new":
              /* gathering is either just starting or has been reset */
              console.log("new");
              break;
            case "gathering":
              /* gathering has begun or is ongoing */
              console.log("gathering");
              break;
            case "complete":
              /* gathering has ended */
              console.log('complete', pc.iceConnectionState);
              break;
          }
        });
      }
    })
  // }

  }

  // ************************************* //
  // NOT REQUIRED
  // ************************************* //
  disconnectSocket = (socketToDisconnect) => {
    this.sendToPeer('socket-to-disconnect', null, {
      local: this.socket.id,
      remote: socketToDisconnect
    })
  }

  switchVideo = (_video) => {
    // console.log(_video)
    this.setState({
      selectedVideo: _video
    })
  }

  // ************************************* //
  // ************************************* //
  stopTracks = (stream) => {
    stream.getTracks().forEach(track => track.stop())
  }

  render() {
   
    // if (this.socket !== null) {
    console.log("state", this.state, this.socket);

    const {
      status,
      messages,
      disconnected,
      localStream,
      peerConnections,
      remoteStreams,
    } = this.state

    if (disconnected) {
      // disconnect socket
      this.socket.close()
      // stop local audio & video tracks
      this.stopTracks(localStream)
      

      // stop all remote audio & video tracks
      remoteStreams.forEach(rVideo => this.stopTracks(rVideo.stream))

      console.log("disconnect", peerConnections);
      // stop all remote peerconnections
      peerConnections && Object.values(peerConnections).forEach(pc => {
        
        pc.close()
      })

      return (<div>You have successfully Disconnected</div>)
    }

    const statusText = <div style={{ color: 'yellow', padding: 5 }}>{status}</div>
    const width = window.innerWidth
    const height = window.innerHeight
    const remoteVideo = document.getElementById('remoteVideo');
    
    return (
      <div>
      {/* {renderRemoteVideo()} */}
      { remoteStreams && remoteStreams.length > 0
      &&
       <Video
        videoType="remoteVideo"
          frameStyle={{
            zIndex: 2,
            position: 'fixed',
            bottom: 0,
            width: width, height: height,
            backgroundColor: 'yellow'
          }}
        videoStyles={{
          zOrder: 0,
          zIndex: 2,
          // position: 'fixed',
          // bottom: 0,
          width: width,
          height: height,
          backgroundColor: 'red'
        }}
        // ref={ this.remoteVideoref }
        videoStream={remoteStreams[0].stream}
        // videoStream={this.state.selectedVideo && this.state.selectedVideo.stream}
        autoPlay
      ></Video>
      }
      <Draggable style={{
        zIndex: 101,
        position: 'absolute',
        right: 0,
        cursor: 'move'
      }}>
        <Video
          videoType='localVideo'
          videoStyles={{
            zIndex:2,
            // position: 'absolute',
            // right:0,
            width: 200,
            // height: 200,
            // margin: 5,
            // backgroundColor: 'black'
          }}
          frameStyle={{
            width: 200,
            margin: 5,
            borderRadius: 5,
            backgroundColor: 'black',
          }}
          showMuteControls={true}
          // ref={this.localVideoref}
          videoStream={localStream}
          autoPlay muted>
        </Video>
      </Draggable>
      
      <br />
        <div style={{
          zIndex: 3,
          position: 'absolute',
        }}>
          <i onClick={(e) => {this.setState({disconnected: true})}} style={{ cursor: 'pointer', paddingLeft: 15, color: 'red' }} className='material-icons'>highlight_off</i>
          <div style={{
            margin: 10,
            backgroundColor: '#cdc4ff4f',
            padding: 10,
            borderRadius: 5,
          }}>{ statusText }</div>
        </div>
        {/* <div>
          <Videos
            switchVideo={this.switchVideo}
            remoteStreams={remoteStreams}
            // videoStream={this.state.selectedVideo && this.state.selectedVideo.stream}
          ></Videos>
        </div>
        <br /> */}
      </div>
    )
  // }
}

}

export default Room;