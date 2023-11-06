import React from "react";
import { Text, View, StyleSheet, Pressable, Image, TouchableOpacity } from "react-native";
import colors from './../../assets/colors';
import { FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

const fontawesomeIcon = (name) => {
    switch (name) {
        case 'heart':
          return <FontAwesomeIcon icon="fa-solid fa-heart" size={20} color={colors.red} />
        case 'peanut':
          return <Image style={styles.peanutIcon} source={require("./../../assets/images/peanut-icon.png")} />
        case 'bud':
          return <FontAwesomeIcon icon="fa-solid fa-seedling" size={20} color={colors.main_green}/>
        case 'card':
          return <Image source={require("./../../assets/images/card-icon.png")} />
        case 'time':
          return <FontAwesomeIcon icon="fa-solid fa-clock" size={20} color={colors.shadow_gray_brown} />
        case 'fire':
          return <FontAwesomeIcon icon="fa-solid fa-fire-flame-curved" size={20} color={colors.red} />
      }
}
function plusIcon(plus) {
    if (plus) {
        return (
            <TouchableOpacity>
                <FontAwesomeIcon icon="fa-solid fa-circle-plus" size={20} color={colors.shadow_gray_brown} />
            </TouchableOpacity>
        );
    }
}
function cardTotal(name, total) {
    if (name=="card" && total) {
        return (
            <Text style={styles.smallText}>/{total}</Text>
        );
    }
}
export default function IconWrap(props) {
    const { onPress, name, hasPlus, num, total } = props;
    return (
        <View style={styles.container}>
            {fontawesomeIcon(name)}            
            <View style={styles.rightSide}>
                <Text style={styles.smallText}>{num}</Text>
                {cardTotal(name, total)}
                {plusIcon(hasPlus)}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        borderWidth: 2,        
        borderRadius: 20,
        borderColor: colors.bright_gray_brown,
        padding: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    rightSide: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    smallText: {
        color: colors.black_green,
        fontSize: 18,
        fontWeight: "400",
        marginRight: 5,
    },
});