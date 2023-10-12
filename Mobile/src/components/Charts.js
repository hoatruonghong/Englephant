import React from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import colors from './../../assets/colors';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart,
} from 'react-native-chart-kit';
  
function VocabularyChart(props) {
  const { onPress } = props;
  return (
    <View style={styles.container}>
        <PieChart
          data={[
            {
              name: 'Seoul',
              population: 21500000,
              color: 'red',
              legendFontColor: '#7F7F7F',
              legendFontSize: 15,
            },
            {
              name: 'Toronto',
              population: 2800000,
              color: 'yellow',
              legendFontColor: '#7F7F7F',
              legendFontSize: 15,
            },
            {
              name: 'New York',
              population: 8538000,
              color: 'green',
              legendFontColor: '#7F7F7F',
              legendFontSize: 15,
            },
            {
              name: 'Moscow',
              population: 11920000,
              color: 'blue',
              legendFontColor: '#7F7F7F',
              legendFontSize: 15,
            },
          ]}
          // width={Dimensions.get('window').width - 16}
          width={100}
          height={100}
          chartConfig={{
            backgroundColor: '#1cc910',
            backgroundGradientFrom: '#eff3ff',
            backgroundGradientTo: '#efefef',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute //for the absolute number remove if you want percentage
        />
    </View>
  );
};

function PronunciationChart(props) {
    const { data } = props;
    return (
      <View style={styles.container}>
          
      </View>
    );
};
  
function PercentChart(props) {
    const { data1 } = props;
    const data = {
        // labels: ["Swim"], // optional
        data: [0.8]
      };
    return (
      <View style={styles.container}>
          <ProgressChart
            data={data}
            width={50}
            height={50}
            strokeWidth={8}
            radius={16}
            chartConfig={{
                backgroundColor: "white",
                backgroundGradientFrom: "white",
                backgroundGradientTo: "white",
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
                style: {
                  borderRadius: 16
                },
                propsForDots: {
                  r: "6",
                  strokeWidth: "2",
                  stroke: "#ffa726"
                }
            }}
            hideLegend={true}
            />
      </View>
    );
};

function HistoryChart(props) {
    const { data } = props;
    return (
      <View style={styles.container}>
          
      </View>
    );
};

const styles = StyleSheet.create({
    container: {

    },
    text: {
      fontSize: 16,
      lineHeight: 22,
      fontWeight: "700",
      letterSpacing: 0.25,
      color: colors.white,
    },
  });

module.exports = {
    VocabularyChart, PronunciationChart, PercentChart, HistoryChart
}