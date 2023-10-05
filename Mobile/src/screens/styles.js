import {StyleSheet} from 'react-native';
import colors from '../../assets/colors';
  
const styles = StyleSheet.create({
heading: {
    color: colors.black,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 32,
    position: 'absolute'
},
text: {
    color: colors.black,
    textAlign: 'center',
    fontWeight: '400',
    fontSize: 16,
    position: 'absolute',
    lineHeight: 25
},
close: {
    alignItems: 'center',
    position: "absolute",
    left: "90%",
    top: "1%",
    width: "3%"
}
});

export default styles;