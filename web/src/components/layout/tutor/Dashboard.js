import React from 'react'
import './../../../styles/dashboard.css';

const tutorImg = './../../../assets/images/tutor-avatar.jpg';
const Dashboard = () => {
  return (
    <div className='dashboardContainer'>
        <img
			src={tutorImg}
			alt='tutor-img'
		/>
    </div>
  )
}

export default Dashboard