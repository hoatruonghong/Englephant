import React, {useState} from 'react';
import {Calendar, CalendarProvider, WeekCalendar} from 'react-native-calendars';
import {Text, View, StyleSheet, Pressable, Dimensions} from 'react-native';
import colors from './../../assets/colors';

export default function MyCalendar() {
//   const [selected, setSelected] = useState('');
  return (
    <View style={styles.container}>
      {/* <Calendar
        onDayPress={day => {
          setSelected(day.dateString);
        }}
        markedDates={{
            '2023-11-29': {selected: true, selectedColor: colors.main_green},
            '2023-12-01': {selected: true, selectedColor: colors.main_green}
        }}
        initialDate="2023-10-01"
        minDate="2023-10-01"
        maxDate="2023-12-31"
      /> */}

      <CalendarProvider 
        date={new Date().toISOString()}
        showTodayButton
        >
        <WeekCalendar
          style={styles.dateList}
          onDayPress={day => console.log(day)}
          firstDay={1}
          allowShadow={false}
          markedDates={{
            '2023-11-29': {selected: true, selectedColor: colors.main_green},
            '2023-12-01': {selected: true, selectedColor: colors.main_green},
          }}
        />
      </CalendarProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
  calendarWrap: {
    width: '100%',
  },
  dateList: {
  },
});
