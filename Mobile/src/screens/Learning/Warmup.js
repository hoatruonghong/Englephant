import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import Svg from 'react-native-svg';
import BG from '../../../assets/svg/bg.svg';
import MascotHappy from '../../../assets/svg/mascot_happy.svg';
import colors from '../../../assets/colors';
import styles from '../styles';
import GoButton from '../../components/GoButton';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);

class Warmup extends Component {
  render(){
      return (
        <View>
          <Svg>
            <BG width={this.props.width}
                height={this.props.height}
                viewBox="0 0 360 720"/>
            <MascotHappy width={this.props.width}
                height={this.props.height}
                viewBox='-30 -132 390 780'/>
            <TouchableOpacity style={styles.close} onPress={() => {}}>
              <FontAwesomeIcon icon="xmark"  color={colors.black} size={32}/>
            </TouchableOpacity>
            <Text style={[{top: this.props.height*0.6, width: this.props.width},styles.heading]}>Khởi động nào!!!</Text>
            <Text style={[{top: this.props.height*0.66, left: this.props.width*0.1, width: this.props.width*0.8},styles.text]}>Bài tập khởi động hàng ngày của Englephant đã đến rồi!</Text>
            <GoButton 
              onPress={() => {}}
              height={this.props.height} 
              width={this.props.width}
              top={this.props.height*0.75}
            />
          </Svg>
        </View>
      );
    }
}

  
export default Warmup;