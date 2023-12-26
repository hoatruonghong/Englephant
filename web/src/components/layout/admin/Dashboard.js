import React from "react";
import "./../../../styles/dashboard.css";

import avatar from "./../../../assets/images/mascot-logo.svg";

const Dashboard = () => {
  return (
    <div className="dashboardContainer">
      <div className="imgWrap">
        <img src={avatar} alt="tutor-img" className="defaultAvatarImage" />
      </div>
      <div className="navWrap">
        <button className="navItem">Quản lý Chuyên viên</button>
        <button className="navItem">Quản lý Chủ đề</button>
        <button className="navItem">Quản lý Luyện tập</button>
        <button className="navItem">Quản lý Câu hỏi</button>
      </div>
    </div>
  );
};

export default Dashboard;
