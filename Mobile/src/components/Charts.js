import React from "react";
import { Text, View, StyleSheet, Pressable, Animated, TextInput } from "react-native";
import colors from './../../assets/colors';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart,
} from 'react-native-chart-kit';
import Svg, {G, Circle} from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

function DonutChart({
  percentage = 75,
  radius = 40,
  strokeWidth = 15,
  duration = 500,
  color = colors.blue,
  delay = 0,
  textColor,
  textSize,
  max = 100,
}) {
  const animatedValue = React.useRef(new Animated.Value(0)).current;
  const circleRef = React.useRef();
  const halfCircle = radius*2;
  const circleCircumference = 2*Math.PI*radius;
  const maxPercent = (100*percentage)/max;
  const strokeDashoffset = circleCircumference - (circleCircumference*maxPercent)/100;

  const animation = (toValue) => {
    return Animated.timing(animatedValue, {
      toValue, duration, delay, useNativeDriver: true,
    }).start();
  };

  React.useEffect(() => {
    animation(percentage);

    animatedValue.addListener((v) => {
      if (circleRef?.current){
        circleRef.current.setNativeProps({
          strokeDashoffset
        });
      }  
    })
  })
  return (
    <View>
      <Svg style={styles.container}
        width={radius*2}
        height={radius*2} 
        viewBox={`0 0 ${halfCircle*2} ${halfCircle*2}`}
      >
        <G rotation='-90' origin={`${halfCircle}, ${halfCircle}`}>
          <Circle 
            cx='50%'
            cy='50%'
            stroke={color}
            strokeWidth={strokeWidth}
            r={radius}
            fill="transparent"
            strokeOpacity={0.2}
          />
          <Circle
            cx='50%'
            cy='50%'
            stroke={color}
            strokeWidth={strokeWidth}
            r={radius}
            fill="transparent"
            strokeDasharray={circleCircumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap='round'
          />
        </G>
      </Svg>
      <TextInput
        underlineColorAndroid="transparent"
        editable={false}
        defaultValue={percentage.toString()}
        style={[StyleSheet.absoluteFillObject, 
        {
          fontSize: textSize? textSize : 16,
          fontWeight: 'bold',
          textAlign: 'center',
          color: textColor? textColor : colors.blue,
        }]}
      />
    </View>
  );
};

function VocalChart({
  strokeWidth = 20,
  size = 100,
  data
}) {
  const [startAngles, setStartAngles] = React.useState([]);
  const center = size/2;
  const radius = (size - strokeWidth)/2;
  const circleCircumference = 2*Math.PI*radius;

  let angle = 0;
  const angles: number[] = [];

  return (
    <View>
      <Svg style={styles.container}
      width={size}
      height={size} 
      viewBox={`0 0 ${size} ${size}`}
      >
        <Circle
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
          stroke={'blue'}
          strokeDashoffset={circleCircumference * (1 - 0.75)}
          strokeDasharray={circleCircumference}
        />
        {/* {data.map((item, index) => (
          <Circle
            key={`${item.color}-${index}`}
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
            stroke={item.color}
            strokeDashoffset={circleCircumference * (100 - item.percent)/100}
            strokeDasharray={circleCircumference}
            // originX={center}
            // originY={center}
            // rotation={startAngles[index]}
          />
        ))} */}
      </Svg>
    </View>
  );
}

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
      alignSelf: 'center',
      backgroundColor:colors.yellow,
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
    VocabularyChart, PronunciationChart, PercentChart, HistoryChart, DonutChart, VocalChart
}