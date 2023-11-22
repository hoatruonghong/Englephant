import React from "react";
import { Text, StyleSheet, TouchableOpacity, ImageBackground} from "react-native";
import colors from "../../assets/colors";
import { FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';

library.add(faQuestion);


export default function Box(props) {
    const { name, image, lock, star, height, width, index, navigation, learnerId, onPressLockedMap, onPressUnlockedMap } = props;
    let star1 = farStar;
    let star2 = farStar;
    let star3 = farStar;
    if (star == 3) {
        star1 = faStar;
        star2 = faStar;
        star3 = faStar;
    } else if (star == 2) {
        star1 = faStar;
        star2 = faStar;    
    } else if (star == 1) star1 = faStar;
    return (
        <View style={[{width: width*0.8, aspectRatio: 1.15},styles.box]}>
            <FlatList style={styles.wrapOptions}
            numColumns={3}
            data={answers}
            columnWrapperStyle={{justifyContent: 'space-between'}}
            renderItem={({item, index}) =>(   
                    <TouchableOpacity 
                        onPress={()=>{chooseAnswer(item)}}
                        disabled={isDisabled}
                        key={item._id}
                        style={[styles.wrapOption,
                        {
                            backgroundColor: 
                                item==currentOptionSelected?
                                colors.bright_gray_brown :
                                colors.white
                        }]}
                    >
                        {renderContent(type, item)}
                    </TouchableOpacity>
                )
            }
            contentContainerStyle={{width: "100%", height: "100%"}}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    box: {
        borderRadius: 20,
        overflow: 'hidden',
        backgroundColor: colors.dark_brown
    },
    item:{
        borderRadius: 10,
        borderColor: colors.dark_brown,
        borderWidth: 2,
        width: 0.28,
        aspectRatio: 1,
    },
    text: {
        width: 80,
        fontSize: 18,
        lineHeight: 22,
        left: 5,
        bottom: 35,
        fontWeight: "700",
        letterSpacing: 0.25,
        color: colors.black,
        position: "absolute",
        transform: [{ rotate: '-52deg'}]
    },
    star: {
        color: "#FFFFFF",
        size: 32,
        position: "absolute",
        transform: [{ rotate: '-52deg'}]
    },
});