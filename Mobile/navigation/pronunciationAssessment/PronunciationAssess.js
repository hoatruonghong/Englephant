
import React, {Component} from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  PermissionsAndroid
} from 'react-native';


import {Buffer} from 'buffer';
import Sound from 'react-native-sound';
import AudioRecord from 'react-native-audio-record';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import * as Progress from 'react-native-progress';

import colors from '../../assets/colors';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);

import jsSHA from 'jssha';
//import {SHA1, enc} from 'crypto';
import fs from 'react-native-fs';
//import FormData from 'form-data';

const appKey = "168680959400017a";
const secretKey = "961c8c2d962373638835274c64f1782b";
const userId = "uid";

const baseHOST = "https://api.speechsuper.com";

const coreType = "word.eval"; // Change the coreType according to your needs.
const refText = "supermarket"; // Change the reference text according to your needs.
//const audioPath = "supermarket.wav"; // Change the audio path corresponding to the reference text.
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
        fs.readFile(audioPath, 'base64')
        .then(audioData=> {
          let fd = new FormData();
          fd.append("text", JSON.stringify(params));
          fd.append("audio", audioData);
          var xhr = new XMLHttpRequest();
          var url = baseHOST + "/"+coreType;
          try {
            xhr.open("post", url);
            xhr.setRequestHeader("Request-Index", "0");
            xhr.send(fd);
            console.log('send');
            var t1, t2;
            t1 = Math.round(new Date().getTime() / 1000);
            xhr.onreadystatechange = function () {
              if (xhr.readyState == 4 && xhr.status == 200) {
                t2 = Math.round(new Date().getTime() / 1000);
                console.log(xhr.responseText);
              }
            };
            return;
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


const requestParams = {
    coreType: coreType,
    refText: refText
};

class PronunciationAssess extends Component {
  sound = null;
  state = {
    audioFile: '',
    recording: false,
    loaded: false,
    paused: true
  };

  async componentDidMount() {
    await this.checkPermission();
    const options = {
      sampleRate: 16000,
      channels: 1,
      bitsPerSample: 16,
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
      doEval(userId, audioType, audioSampleRate, requestParams, audioFilePath)
      .then(data=>{console.log(data)})
      .catch(e=>{console.log(e)});
    } catch(error){
      console.log(error);
    }
  };

  load = async(url) => {
    return new Promise((resolve, reject) => {
      console.log(this.state.audioFile);
      if (url === '' && this.state.audioFile === '') {
        return reject('File path is empty');
      }
      
      let path = (url === ''? this.state.audioFile : url);

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

  play = async(url) => {
    try {
      console.log(url);
      await this.load('');
    } catch (error) {
      console.log(error);
    }
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
  };

  pause = () => {
    this.sound.pause();
    this.setState({ paused: true });
    console.log('pause');
  };

  changeRecordEvent = async() => {
    if(!this.state.recording){
      this.start();
    } else {
      await this.stop();      
    }
  }

  changePlayEvent = () => {
    try{
      if(this.state.paused){
        this.play('');
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
      <SafeAreaView style = {{flex:1, backgroundColor: 'white'}}>
        <View style={styles.view}>
        <TouchableOpacity style={styles.touchOpContainer} onPress={this.changePlayEvent}>
            <Progress.Bar progress={0.7} width={200} />
            <FontAwesomeIcon icon="xmark"  color={colors.main_green} size={90}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.touchOpContainer} onPress={this.changePlayEvent}>
            <FontAwesomeIcon icon="volume-up"  color={colors.main_green} size={90}/>
          </TouchableOpacity>
        </View>
        <View style={styles.view}>
          <Text style={styles.word}> supermarket
          </Text>
        </View>
        <View style={styles.view}>
          <TouchableOpacity style={styles.touchOpContainer} onPress={this.changeRecordEvent}>
            <FontAwesomeIcon icon="microphone"  color={colors.main_green} size={48}/>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}


const styles = StyleSheet.create({
  view: {
    flex:0.3,
    backgroundColor: 'white',
    justifyContent: 'center'
  },
  touchOpContainer: {
    alignItems: 'center',
  },
  word: {
    color: colors.black,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 32
  },
});

export default PronunciationAssess;