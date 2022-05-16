import React, { useState, useEffect } from "react";
import "./styles.scss";
import red from "../../../Assets/sellerdashboard/dashboard/red.png";
import blue from "../../../Assets/sellerdashboard/dashboard/blue.png";
import skyblue from "../../../Assets/sellerdashboard/dashboard/skyblue.png";
import purple from "../../../Assets/sellerdashboard/dashboard/purple.png";
import orange from "../../../Assets/sellerdashboard/dashboard/orange.png";
import green from "../../../Assets/sellerdashboard/dashboard/green.png";
import exchangeoffer from "../../../Assets/sellerdashboard/dashboard/exchangeoffer.png";

import DashboardChartSection from "../../DashboardChartSection";
import axios from "axios";
import Constant from "../../../Constant";

function Dashboard() {
  const dashboarddata = [
    { image: red, text: "New Orders", count: 25 },
    { image: blue, text: "Completed Orders", count: 320 },
    { image: skyblue, text: "Payments", count: 55 },
    { image: purple, text: "My Reviews", count: 220 },
    { image: orange, text: "Best Sellers", count: 18 },
    { image: green, text: "Low Inventory Products", count: 55 },
  ];

  const [sellerdashboard, setsellerdashboard] = useState([])
  useEffect(async() => {
    let user = JSON.parse(localStorage.getItem('userdata'))
    try {
      const dashdata = await axios({
        method: 'post',
        url: `${Constant?.baseUrl()}/sellerDashboard`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        data: {
          "sellerId" : user?.id
        }        
      })
      setsellerdashboard(dashdata?.data)
    } catch(e) {
      console.log(e)
    }
  }, [])
  return (
    <div className="seller_dashboard">
      <div className="dashboard__data">
        {dashboarddata.map((data, i) => (
          <div className="dasboard__dataiamge" key={i}>
            <img src={data.image} alt="" />
            {/* <span className="overview_info">{data?.text}</span>
            <span className="overview_count">{data?.count}</span> */}
          </div>
        ))}
      </div>
      <div className="dashboard__status">
        <div className="dashboard__statusoffer">
          <img src={exchangeoffer} alt="" />
        </div>
        <div className="dashboard__status1">
          <h2>12th</h2>
          <p>Product Positioning</p>
        </div>
        <div className="dashboard__status1">
          <h2>98</h2>
          <p>My KPI</p>
        </div>
      </div>
      <DashboardChartSection />
    </div>
  );
}

export default Dashboard;
