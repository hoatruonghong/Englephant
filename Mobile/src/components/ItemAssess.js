import React from "react";
import { Text, View, StyleSheet } from "react-native";
import colors from './../../assets/colors';

function PronunDetail(props) {
    const { item, color } = props;
    return (
        <View style={styles.container}>
            <View style={styles.sound}>
                <Text style={styles.text}>{item.sound}</Text>
            </View>
            <View style={styles.progress}>
                <View style={{
                    width: item.percentage + "%",
                    backgroundColor: color ? color : colors.blue,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: color ? color : colors.blue,
                    marginTop: '6%',
                    marginBottom: '6%',
                }}>
                </View>
                <View style={{
                    width: (100-item.percentage) + "%",
                }}>                
                </View>
            </View>
            <View style={styles.percentage}>
                <Text style={styles.text}>{item.percentage}%</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    sound: {
        width: '20%',
    },
    progress: {
        width: '50%',
        flexDirection: 'row',
    },
    percentage: {
        paddingLeft: 3,
        width: '30%',
    },
    text: {
        color: colors.black_green,
    },
});

module.exports = {
    PronunDetail
}