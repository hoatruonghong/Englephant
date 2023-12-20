import React, { Component } from "react";
import io from "socket.io-client";
import "./../styles/tutorPage.css";
import TimeCounter from './../components/tutor/TimeCounter';
import { CamButton, MicButton, EndButton }  from './../components/tutor/RoomButton';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

class TalkRoom extends Component {
  constructor(props) {
    super(props);

    this.localVideoref = React.createRef();
    this.remoteVideoref = React.createRef();

    this.localSdp=null;
    this.remoteSdp=null;
    this.typ=null;
    this.socket = null;
    this.candidates = [];
  }

  componentDidMount = () => {
    this.socket = io.connect("http://localhost:5000/webrtcPeer", {
      path: "/io/webrtc",
      query: {},
    });

    this.socket.on("connection-success", (success) => {
      console.log(success);
    });

    this.socket.on("offerOrAnswer", (sdp) => {      
      // this.textref.value = JSON.stringify(sdp)
      console.log('tessst', this.typ);
      if (this.localSdp == null) {
        // set sdp as remote description
        this.pc.setRemoteDescription(new RTCSessionDescription(sdp))
        this.remoteSdp = sdp
      }

    });

    this.socket.on("candidate", (candidate) => {
      // this.candidates = [...this.candidates, candidate]
      this.pc.addIceCandidate(new RTCIceCandidate(candidate));
    });

    // const pc_config = null;

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
    this.pc = new RTCPeerConnection(pc_config);

    // triggered when a new candidate is returned
    this.pc.onicecandidate = (e) => {
      // send the candidates to the remote peer
      // see addCandidate below to be triggered on the remote peer
      if (e.candidate)
        // console.log(JSON.stringify(e.candidate))
        this.sendToPeer("candidate", e.candidate);
    };

    // triggered when there is a change in connection state
    this.pc.oniceconnectionstatechange = (e) => {
      console.log(e);
    };

    // triggered when a stream is added to pc, see below - this.pc.addStream(stream)
    // this.pc.onaddstream = (e) => {
    //   this.remoteVideoref.current.srcObject = e.stream
    // }

    this.pc.ontrack = (e) => {
      this.remoteVideoref.current.srcObject = e.streams[0];
    };

    // called when getUserMedia() successfully returns - see below
    const success = (stream) => {
      window.localStream = stream;
      this.localVideoref.current.srcObject = stream;
      stream.getTracks().forEach( (track) => this.pc.addTrack( track, stream ) );
      // this.pc.addTrack(stream);
    };

    // called when getUserMedia() fails - see below
    const failure = (e) => {
      console.log("getUserMedia Error: ", e);
    };

    const constraints = {
      audio: true,
      video: true,
    };

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(success)
      .catch(failure);
  };

  sendToPeer = (messageType, payload) => {
    this.socket.emit(messageType, {
      socketID: this.socket.id,
      payload,
    });
  };

  /* ACTION METHODS FROM THE BUTTONS ON SCREEN */

  createOffer = () => {
    console.log('Offer')

    // initiates the creation of SDP
    this.pc.createOffer({ offerToReceiveVideo: 1 })
      .then(sdp => {
        // set offer sdp as local description
        this.pc.setLocalDescription(sdp)
        this.localSdp = sdp
        this.typ = "offer"
        console.log("offer:", this.localSdp, this.typ)

        this.sendToPeer('offerOrAnswer', sdp)
    })
  };

  // creates an SDP answer to an offer received from remote peer
  createAnswer = () => {
    console.log('Answer')
    this.pc.createAnswer({ offerToReceiveVideo: 1 })
      .then(sdp => {
        console.log("answer",JSON.stringify(sdp))

        // set answer sdp as local description
        this.pc.setLocalDescription(sdp)
        this.localSdp = JSON.stringify(sdp)
        this.typ = "answer"

        this.sendToPeer('offerOrAnswer', sdp)
    })
  };

  render() {
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
          <div className="timeWrap"><TimeCounter time={900}/></div> 
          <Container className="buttonWrap">
            <Row>
            <Col className="buttonArea"><CamButton/></Col>
            <Col className="buttonArea"><EndButton /></Col>
            <Col className="buttonArea"><MicButton /></Col>
            </Row>
          </Container>
        </div>        
        <div className="otherWrap">      
          <br />
          <button onClick={this.createOffer}>Offer</button>
          <button onClick={this.createAnswer}>Answer</button>
          <br />
          {/* <textarea
            ref={ref => { this.textref = ref }}
          /> */}
          <textarea>{this.sdp}</textarea>
          
        </div>
        {/* <button onClick={this.setRemoteDescription}>Set Remote Desc</button>
          <button onClick={this.addCandidate}>Add Candidate</button> */}
      </div>
    );
  }
}

export default TalkRoom;
