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
    right: "10%",
    top: "4%",
    width: "3%"
},
container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
},
bg: {
    flex: 1,
    justifyContent: 'space-between',
},
});

export default styles;