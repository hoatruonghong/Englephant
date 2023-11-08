import {StyleSheet} from 'react-native';
import colors from '../../../assets/colors';
  
const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        padding: "5%",
        flex: 1,
    },
    wrapProgressBar: {
        width: '86%',
        height: 10,
        top: "3%",
        borderRadius: 5,
        backgroundColor: colors.main_green,
    },
    wrapQuestions: {
        height: "50%",
    },
    questionText: {
        fontSize: 16,
        fontWeight: '500',
        color: colors.black_green,
        textAlign: "center",
        marginTop: 10
    },
    wrapOptions: {
        height: "40%",
    },
    wrapOption: {
        width: "47.5%",
        height: 120,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: colors.bright_gray_brown,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20
    },
    optionText: {
        fontSize: 20,
        fontWeight: '500',
        color: colors.black_green,
    },
    input: {
        width: "93%",
        margin: 12,
        borderWidth: 2,
        borderColor: colors.bright_gray_brown,
        borderRadius: 16,
        padding: 10,
        backgroundColor: "white"
    },
    wrapper: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        width: "80%",
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        borderWidth: 2,
        borderColor: colors.bright_gray_brown,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        elevation: 5,
        zIndex: 5,
    },
    titleStyle: {
        fontSize: 20,
        fontWeight: "bold",
        color: colors.black_green,
    }
});

export default styles;