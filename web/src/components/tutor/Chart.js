import React from "react";
import "./../../styles/tutorPage.css";

function Chart(props) {
  const halfCircle = props.radius * 2;
  const circleCircumference = 2 * Math.PI * props.radius;
  const maxPercent = (100 * props.percentage) / 100;
  const strokeDashoffset =
    circleCircumference - (circleCircumference * maxPercent) / 100;
  const strokeOffset = props.strokeWidth / 2;
  const svgSize = halfCircle + strokeOffset*2;

  return (
    <svg
      width={halfCircle}
      height={halfCircle}
      viewBox={`${-strokeOffset} ${-strokeOffset} ${svgSize} ${svgSize}`}
    >
      <g rotation="-90" origin={`${svgSize}, ${svgSize}`}>
        <circle
          cx={props.radius}
          cy={props.radius}
          r={props.radius}
          stroke="green"
          strokeWidth={props.strokeWidth}
          fill="transparent"
          strokeOpacity="0.2"
        />
        <circle
          cx={props.radius}
          cy={props.radius}
          r={props.radius}
          stroke="rgba(159, 197, 90, 1)"
          strokeWidth={props.strokeWidth}
          fill="transparent"
          strokeDasharray={circleCircumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </g>
      <text x="25%" y={props.radius+strokeOffset} fontSize={50} fontWeight={800} fill="rgba(16, 64, 27, 1)" >{props.percentage} %</text>
    </svg>
  );
};

export default Chart;
