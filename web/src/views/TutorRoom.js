import React, { Component } from "react";
import io from "socket.io-client";
import "./../styles/tutorPage.css";
import TimeCounter from './../components/tutor/TimeCounter';
import { CamButton, MicButton, EndButton }  from './../components/tutor/RoomButton';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

class TutorRoom extends Component {
  constructor(props) {
    super(props)

    this.localVideoref = React.createRef()
    this.remoteVideoref = React.createRef()

    this.socket = null
    this.candidates = []
    this.disconnected = false
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
      this.textref.value = JSON.stringify(sdp)
      if (sdp.type === "answer") {
        // set sdp as remote description
        this.pc.setRemoteDescription(new RTCSessionDescription(sdp))
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

        this.sendToPeer('offerOrAnswer', sdp)
      })
  }

  renderTime = () => {
    console.log("checcc", this.remoteVideoref);
    if(this.remoteVideoref != null) {
      return <div className="timeWrap"><TimeCounter time={1200}/></div> 
    }
    
  }
  handleEndCall = () => {
    console.log("disconnect");
    this.disconnected = true;
  }

  render() {

    if (this.disconnected) {
      this.socket.close()
      this.localVideoref.getTracks().forEach(track => track.stop())
      return (<div>You have successfully Disconnected</div>)
    }

    return (
      <div className="talkroom">
        <div className="videoWrap">
          <video className="remoteVideo"
            ref={this.remoteVideoref}
            autoPlay
          ></video>
          <video className="localVideo"
            ref={this.localVideoref}
            autoPlay
          ></video>         
          {this.renderTime()}
          <Container className="buttonWrap">
            <Row>
            <Col className="buttonArea"><CamButton /></Col>
            <Col className="buttonArea"><EndButton onClick={this.handleEndCall}/></Col>
            <Col className="buttonArea"><MicButton /></Col>
            </Row>
          </Container>
        </div>        
        <div className="otherWrap">      
          <br />
          <button onClick={this.createOffer}>Offer</button>
          <button onClick={this.createAnswer}>Answer</button>
          <br />
          <textarea
            ref={ref => { this.textref = ref }}
          />
          
        </div>
        {/* <button onClick={this.setRemoteDescription}>Set Remote Desc</button>
          <button onClick={this.addCandidate}>Add Candidate</button> */}
      </div>
    );
  }
}

export default TutorRoom;
