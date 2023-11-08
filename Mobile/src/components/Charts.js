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
  color = colors.black_green,
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
          color: textColor? textColor : colors.main_green,
        }]}
      />
    </View>
  );
};

function PronunciationChart({
  percentage = 75,
  strokeWidth = 10,
  size = 60,
  color = colors.main_green,
  textColor,
  textSize
}) {
  const center = size/2;
  const radius = (size - strokeWidth)/2;
  const circleCircumference = 2*Math.PI*radius;
  const strokeDashoffset = circleCircumference*(100-percentage)/100;

  return (
    <View>
      <Svg style={styles.container}
        width={size}
        height={size} 
        viewBox={`0 0 ${size} ${size}`}
      >
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
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
          stroke={color}
          strokeDashoffset={strokeDashoffset}
          strokeDasharray={circleCircumference}
          strokeLinecap='round'
          fill="transparent"
        />        
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
          color: textColor? textColor : colors.black_green,
        }]}
      />
    </View>
  );
}

function VocabularyChart({
  totalNum = 0,
  data,
  strokeWidth = 10,
  size = 60,
  textColor,
  textSize
}) {
  const center = size/2;
  const radius = (size - strokeWidth)/2;
  const circleCircumference = 2*Math.PI*radius;

  let angle = -90;
  let angles = [];
  let strokeDashoffsets = [];
  data.forEach(item => {
    strokeDashoffsets.push(circleCircumference*(100-item.percentage)/100);
    angles.push(angle);
    angle += item.percentage/100*360;
  });
  
  return (
    <View>
      <Svg style={styles.container}
        width={size}
        height={size} 
        viewBox={`0 0 ${size} ${size}`}
      >
        {data.map((item, id) => {
          return (
            <Circle
              cx={center}
              cy={center}
              r={radius}
              strokeWidth={strokeWidth}
              stroke={item.color}
              strokeDashoffset={strokeDashoffsets[id]}
              strokeDasharray={circleCircumference}
              strokeLinecap='round'
              fill="transparent"
              originX={center}
              originY={center}
              rotation={angles[id]}
            />
          );
        })}
      </Svg>
      <TextInput
        underlineColorAndroid="transparent"
        editable={false}
        defaultValue={totalNum.toString()+" từ"}
        style={[StyleSheet.absoluteFillObject, 
        {
          fontSize: textSize? textSize : 16,
          fontWeight: 'bold',
          textAlign: 'center',
          color: textColor? textColor : colors.black_green,
        }]}
      />
    </View>
  );
}

function DescriptItem({data}) {
  return (
    <View style={styles.descriptContainer}>
      <View style={[styles.descriptColor,
      { backgroundColor: data.color }]}>        
      </View>
      <Text style={styles.descriptText}>{data.type}</Text>
    </View>
  );
}

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
    },
    text: {
      fontSize: 16,
      lineHeight: 22,
      fontWeight: "700",
      letterSpacing: 0.25,
      color: colors.white,
    },
    descriptContainer: {
      width: '100%',
      flexDirection: 'row',
    },
    descriptColor: {
      width: 15,
      height: 15,
      borderRadius: 50,
    },
    descriptText: {
      color: colors.black_green,
      fontSize: 13,
      fontWeight: 'regular',
      paddingLeft: 5,
      alignSelf: 'center'
    }
  });

module.exports = {
    VocabularyChart, PronunciationChart, PercentChart, HistoryChart, DonutChart, DescriptItem
}