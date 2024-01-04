import React, { Component } from "react";
import io from "socket.io-client";
import "./../styles/tutorPage.css";
import TimeCounter from './../components/tutor/TimeCounter';
import { CamButton, MicButton, EndButton }  from './../components/tutor/RoomButton';

class TalkRoom extends Component {
  constructor(props) {
    super(props)

    this.localVideoref = React.createRef()
    this.remoteVideoref = React.createRef()

    this.socket = null
    this.candidates = []
    this.inRoom = false
    
  }

  componentDidMount = () => {

    this.socket = io.connect(
      // 'http://localhost:5000/webrtcPeer',
      'https://englephant-server.adaptable.app/webrtcPeer',
      // 'https://englephant.vercel.app:5000/webrtcPeer',
      {
        path: '/io/webrtc',
        query: {}
      }
    )

    this.socket.on('connection-success', success => {
      console.log(success)
    })

    //tutor always see notification first, there is an offer
    //they will just answer
    this.socket.on('offerOrAnswer', (sdp) => {
      console.log("socket listen", this.inRoom);
      if (this.inRoom === false && sdp.type === "offer") {
        // set sdp as remote description
        this.renderAnswerButton()
        this.textref.value = "There is an offer"
        this.pc.setRemoteDescription(new RTCSessionDescription(sdp))
      } else if (this.inRoom === false && sdp.type === "answer") {
        this.textref.value = "Answered"
      }
    })

    this.socket.on('candidate', (candidate) => {
      // console.log('From Peer... ', JSON.stringify(candidate))
      // this.candidates = [...this.candidates, candidate]
      this.pc.addIceCandidate(new RTCIceCandidate(candidate))
    })
    
    // const pc_config = null

    const pc_config = {
      "iceServers": [
        // {
        //   urls: 'stun:[STUN_IP]:[PORT]',
        //   'credentials': '[YOR CREDENTIALS]',
        //   'username': '[USERNAME]'
        // },
        {
          urls: 'stun:stun.l.google.com:19302'
        }
      ]
    }

    // create an instance of RTCPeerConnection
    this.pc = new RTCPeerConnection(pc_config)

    // triggered when a new candidate is returned
    this.pc.onicecandidate = (e) => {
      // send the candidates to the remote peer
      // see addCandidate below to be triggered on the remote peer
      if (e.candidate) {
        // console.log(JSON.stringify(e.candidate))
        this.sendToPeer('candidate', e.candidate)
      }
    }

    // triggered when there is a change in connection state
    this.pc.oniceconnectionstatechange = (e) => {
      console.log(e)      
    }


    this.pc.ontrack = (e) => {
      this.remoteVideoref.current.srcObject = e.streams[0]
    }

    // called when getUserMedia() successfully returns - see below
    const success = (stream) => {
        window.localStream = stream
        this.localVideoref.current.srcObject = stream
        this.pc.addStream(stream)
    }

    // called when getUserMedia() fails - see below
    const failure = (e) => {
      console.log('getUserMedia Error: ', e)
    }

    // see the above link for more constraint options
    const constraints = {
      // audio: true,
      video: true,      
      options: {
        mirror: true,
      }
    }

    navigator.mediaDevices.getUserMedia(constraints)
      .then(success)
      .catch(failure)
  }
  
  sendToPeer = (messageType, payload) => {
    this.socket.emit(messageType, {
      socketID: this.socket.id,
      payload
    })
  }

  /* ACTION METHODS FROM THE BUTTONS ON SCREEN */

  createOffer = () => {
    console.log('Offer')

    // initiates the creation of SDP
    this.pc.createOffer({ offerToReceiveVideo: 1 })
      .then(sdp => {

        // set offer sdp as local description
        this.pc.setLocalDescription(sdp)

        this.sendToPeer('offerOrAnswer', sdp)
      })
  }

  // creates an SDP answer to an offer received from remote peer
  createAnswer = () => {
    console.log('Answer')
    this.pc.createAnswer({ offerToReceiveVideo: 1 })
      .then(sdp => {
        // set answer sdp as local description
        this.pc.setLocalDescription(sdp)
        this.textref.value = "Answered"
        this.inRoom = true

        this.sendToPeer('offerOrAnswer', sdp)
      })
  }

  endCall = () => {
    this.socket.close()
    this.pc.close()
  }

  renderAnswerButton = () => {
    console.log("render button");

    return <button className="answerBtn" onClick={this.createAnswer}>Answer</button>
  }

  renderTime = (time) => {
    if(this.remoteVideoref != null) {
      return <div className="timeWrap"><TimeCounter time={time}/></div> 
    }
  }

  render() {

    return (
      <div className="talkroom">
        <div className="videoWrap">
          <div className="otherWrap">
            {/* {this.renderAnswerButton} */}
            <button className="answerBtn" onClick={this.createAnswer}>Answer</button>
            <br/>
            <textarea className="roomNotice"
              ref={ref => { this.textref = ref }}
            />
          </div>
          <video className="remoteVideo"
            ref={this.remoteVideoref}
            autoPlay
          ></video>
          <video className="localVideo"
            ref={this.localVideoref}
            autoPlay
          ></video>         
          {/* {this.renderTime(1200)} */}
          <div className="buttonWrap">
            <div className="row">
            <div className="col-4 buttonArea"><CamButton /></div>
            <div className="col-4 buttonArea"><EndButton onClick={this.endCall}/></div>
            <div className="col-4 buttonArea"><MicButton /></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TalkRoom;
