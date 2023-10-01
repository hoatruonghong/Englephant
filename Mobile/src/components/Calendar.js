import React from 'react'
import { Text, View, StyleSheet, Pressable } from "react-native";
import colors from './../../assets/colors';

const months = ["January", "February", "March", "April", 
"May", "June", "July", "August", "September", "October", 
"November", "December"];
const nDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const weekDays = [
    "Sun","Mon","Tue","Wed","Thu","Fri","Sat"
];
var state = {
    activeDate: new Date()
};
function generateMatrix() {
    var matrix = [];
    // The following code creates the header 
    matrix[0] = this.weekDays;
    // The remaining code will go here 
}

export default function MyCalendar() {
    return (
        <View style={styles.container}>
            <Text>Weekly tracking</Text>
        </View>
        
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        elevation: 4, 
    },

});