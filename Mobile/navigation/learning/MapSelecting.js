import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import * as Progress from 'react-native-progress';

import colors from '../../assets/colors';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);

class MapSelecting extends Component {

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
  
  export default MapSelecting;