
import React, {Component} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
  Modal
} from 'react-native';
import FormData from 'form-data';


import {Buffer} from 'buffer';
import Sound from 'react-native-sound';
import AudioRecord from 'react-native-audio-record';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {PronunciationChart} from '../../components/Charts';
import style from '../styles';
import qstyles from "../Quiz/QuizStyle";
import MascotCry from '../../../assets/svg/mascot_cry.svg';

import colors from '../../../assets/colors';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);

import jsSHA from 'jssha';
import fs from 'react-native-fs';

const appKey = "168680959400017a";
const secretKey = "961c8c2d962373638835274c64f1782b";
const userId = "uid";

const baseHOST = "https://api.speechsuper.com";

const coreType = "word.eval"; // Change the coreType according to your needs.
const audioType = "wav"; // Change the audio type corresponding to the audio file.
const audioSampleRate = "16000";

async function doEval(userId, audioType, sampleRate, requestParams, audioPath) {
    const coreType = requestParams['coreType'];

    let getConnectSig = function () {
      var timestamp = new Date().getTime().toString();
      var sig = new jsSHA(appKey + timestamp + secretKey, 'TEXT').getHash("SHA-1", "HEX");
      console.log(sig);
      return { sig: sig, timestamp: timestamp };
    }
    let getStartSig = function () {
      var timestamp = new Date().getTime().toString();
      var sig = new jsSHA(appKey + timestamp + userId + secretKey, 'TEXT').getHash("SHA-1", "HEX");
      console.log(sig);
      return { sig: sig, timestamp: timestamp, userId: userId };
    }
    let createUUID = (function (uuidRegEx, uuidReplacer) {
      return function () {
        return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(uuidRegEx, uuidReplacer).toUpperCase();
      };
    })(/[xy]/g, function (c) {
      let r = Math.random() * 16 | 0,
        v = c == "x" ? r : (r & 3 | 8);
      return v.toString(16);
    });
    let connectSig = getConnectSig();
    let startSig = getStartSig();
      requestParams['tokenId'] = requestParams['tokenId'] || createUUID()
    let params = {
      connect: {
        cmd: "connect",
        param: {
          sdk: {
            version: 16777472,
            source: 9,
            protocol: 2
          },
          app: {
            applicationId: appKey,
            sig: connectSig.sig,
            timestamp: connectSig.timestamp
          }
        }
      },
      start: {
        cmd: "start",
        param: {
          app: {
            applicationId: appKey,
            sig: startSig.sig,
            userId: startSig.userId,
            timestamp: startSig.timestamp
          },
          audio: {
            audioType: audioType,
            sampleRate: sampleRate,
            channel: 1,
            sampleBytes: 2
          },
          request: requestParams
        }
      }
    };
    return new Promise((resolve, reject) => {
      console.log('send path', audioPath)
      fs.readFile(audioPath, 'base64')
      .then(audioData=> {
          let fd = new FormData();
          audioData = Buffer.from(audioData, 'base64')
          fd.append("text", JSON.stringify(params));
          fd.append("audio", {
            uri: 'file://'+audioPath,
            type: 'audio/wav',
            name: 'test.wav'
          });
          var xhr = new XMLHttpRequest();
          var url = baseHOST + "/"+coreType;
          try {
            xhr.open("post", url);
            xhr.setRequestHeader("Request-Index", "0");
            xhr.send(fd);
            console.log('send');
            console.log(xhr);
            var t1, t2;
            t1 = Math.round(new Date().getTime() / 1000);
            xhr.onreadystatechange = function () {
              if (xhr.readyState == 4 && xhr.status == 200) {
                t2 = Math.round(new Date().getTime() / 1000);
                console.log(xhr.responseText)
                resolve(xhr.responseText);
                return xhr.responseText;
              }
            };
            return xhr.responseText;
          }catch(e){
            console.log('e on send');  
            reject(e);
          };
        }).catch(e=> {
          console.log('e on create fd');
            reject(e);
        })
    });
}

class PronunciationAssess extends Component {
  constructor(props){
    super(props);
    this.coreType = coreType;
    this.refText = props.refText;
  }
  
  state = {
    audioFile: '',
    recording: false,
    loaded: false,
    paused: true,
    showResult: false,
    result: 0,
    rerecord: false
  };
  async componentDidMount() {
    await this.checkPermission();
    const options = {
      sampleRate: 16000,
      channels: 1,
      bitsPerSample: 16,
      audioSource: 6,
      wavFile: 'test.wav'
    };

    AudioRecord.init(options);

    AudioRecord.on('data', data => {
      const chunk = Buffer.from(data, 'base64');
      console.log('chunk size', chunk.byteLength);
      // do something with audio chunk
    });
  }

  checkPermission = async() => {
    const p0 = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO);
    const p1 = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO);
    if (p0 && p1) return;
    return PermissionsAndroid.requestMultiple([PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO]);
  };

  start = () => {
    console.log('Start record');
    this.setState({ audioFile: '', recording: true, loaded: false });
    AudioRecord.start();
  };

  stop = async() => {
    try{
      let audioFilePath = await AudioRecord.stop();
      console.log('Stop record');
      console.log('audioFile', audioFilePath);
      this.setState({ audioFile: audioFilePath, recording: false });
      console.log(this.state)
      this.play();
      doEval(userId, audioType, audioSampleRate, {coreType: coreType, refText: this.refText}, audioFilePath)
      .then(data=>{
        const jsondata = JSON.parse(data); 
        jsondata.error || jsondata.result.overall==0? this.setState({rerecord: true}): this.setState({result: jsondata.result.overall})})
      .then(()=>this.setState({showResult: true}))
      .catch(e=>{console.log(e)});
    } catch(error){
      console.log(error);
    }
  };

  load = async(url) => {
    return new Promise((resolve, reject) => {
      console.log(this.state.audioFile);
      if (this.state.audioFile === '') {
        return reject('File path is empty');
      }
      
      let path = this.state.audioFile;

      this.sound = new Sound(path, '', error => {
        if (error) {
          console.log('Failed to load the file', error);
          return reject(error);
        }
        this.setState({ loaded: true });
        return resolve('File loading success');
      });
    });
  };

  play = async() => {
    try {
      await this.load('');
      console.log(this.sound)
      console.log('duration in seconds: ' + this.sound.getDuration() + 'number of channels: ' + this.sound.getNumberOfChannels());
      this.setState({ paused: false });
      Sound.setCategory('Playback');

      this.sound.play(success => {
        if (success) {
          console.log('Successfully finished playing');
        } else {
          console.log('Playback failed due to audio decoding errors');
        }
        this.setState({ paused: true });
        this.sound.release();
      });
    } catch (error) {
      console.log(error);
    }
  };

  pause = () => {
    this.sound.pause();
    this.setState({ paused: true });
    console.log('pause');
  };

  changeRecordEvent = async() => {
    if(!this.state.recording){
      this.start();
      this.setState({showResult: false, result: 0})
    } else {
      await this.stop();      
    }
  }

  changePlayEvent = () => {
    try{
      if(this.state.paused){
        this.play();
      }
      else {
        this.pause();
      }
    }  catch(err){
      console.error(err);
    } 
  }

  render(){
    return (
        <View style={styles.view}>
          <View style={{top:"20%", width: "100%", height: 200}}>
          <Modal 
            transparent={true}
            visible={this.state.rerecord}
            onRequestClose={() => {
              this.setState({rerecord: false});
            }}
          >  
            <View style={qstyles.wrapper}>
              <View style={qstyles.modalView}>
                <View style={{flexDirection:'row', width: "100%"}}>
                  <TouchableOpacity style={[style.close, {right: "4%"}]} onPress={()=>this.setState({rerecord: false})}>
                    <FontAwesomeIcon icon="xmark"  color={colors.black_green} size={30}/>
                  </TouchableOpacity>
                  <Text style={qstyles.titleStyle}>Englephant chưa nghe được</Text>
                </View>
                <View style={{width: 90, height: 68, marginTop: "5%"}}>
                  <MascotCry viewBox='0 0 68 90'/>
                </View>
                <Text style={[qstyles.textStyle, {textAlign: 'center'}]}>Bạn có thể phát âm lại được không?</Text>
               </View>
            </View>
          </Modal>
          {this.state.showResult &&
          <PronunciationChart size={150} color={colors.blue} textSize={32} percentage={this.state.result}/>}
          </View>
          <TouchableOpacity style={styles.touchOpContainer} onPress={this.changeRecordEvent}>
            <FontAwesomeIcon icon="microphone"  color={colors.main_green} size={50}/>
          </TouchableOpacity>
        </View>
    );
  }
}


const styles = StyleSheet.create({
  view: {
    height: "40%",
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  touchOpContainer: {
    alignItems: 'center',
    top: "20%"
  },
  word: {
    color: colors.black,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 32
  },
});

export default PronunciationAssess;