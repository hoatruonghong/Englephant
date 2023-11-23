import React from 'react'
import DonutChart from 'react-donut-chart';
import "./../../styles/tutorPage.css"

const Chart = () => {
  return (
    <DonutChart className="worktimeChart"
        data={[
            {
            label: 'Finished',
            value: 6,
            },
            {
            label: 'Left',
            value: 2,
            },
        ]}
        width="400"
    />
  )
}

export default Chart