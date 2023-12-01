import React from "react";
import "./../../../styles/dashboard.css";

import avatar from "./../../../assets/images/tutor-avatar.jpg";

const Dashboard = () => {
  return (
    <div className="dashboardContainer">
      <div className="imgWrap">
        <img src={avatar} alt="tutor-img" className="avatarImage" />
      </div>
    </div>
  );
};

export default Dashboard;
