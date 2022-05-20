import React, { useState, useEffect } from "react";
import "./styles.scss";
import first from "../../../Assets/sellerdashboard/dashboard/Group 1451.png";
import second from "../../../Assets/sellerdashboard/dashboard/Group 1134.png";
import third from "../../../Assets/sellerdashboard/dashboard/Group 987.png";
import fourth from "../../../Assets/sellerdashboard/dashboard/Group 1452.png";
import fivth from "../../../Assets/sellerdashboard/dashboard/Group 1453.png";
import sixth from "../../../Assets/sellerdashboard/dashboard/Group 1037.png";
import exchangeoffer from "../../../Assets/sellerdashboard/dashboard/exchangeoffer.png";

import DashboardChartSection from "../../DashboardChartSection";
import axios from "axios";
import Constant from "../../../Constant";
import { getAdminToken } from "../../../utilities";

function Dashboard() {
  const [sellerdashboard, setsellerdashboard] = useState([]);
  useEffect(() => {
    getAdminToken((res) => {
      handleApiCall(res);
    });
  }, []);
  const handleApiCall = async (res) => {
    let user = JSON.parse(localStorage.getItem("userdata"));
    try {
      const dashdata = await axios({
        method: "post",
        url: `${Constant?.baseUrl()}/sellerDashboard`,
        headers: {
          Authorization: `Bearer ${res}`,
        },
        data: {
          sellerId: user?.id,
        },
      });
      setsellerdashboard(dashdata?.data);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="seller_dashboard">
      <div className="dashboard__data">
        <div className="info_bar">
          <div className="dasboard__dataiamge">
            <span className="header">New Orders</span>
            <img src={first} alt="" />
            <span className="value">{sellerdashboard[0]?.new_orders}</span>
          </div>
          <div className="dasboard__dataiamge">
            <span className="header">Completed Orders</span>
            <img src={second} alt="" />
            <span className="value">
              {sellerdashboard[0]?.completed_orders}
            </span>
          </div>
          <div className="dasboard__dataiamge">
            <span className="header">Payments</span>
            <img src={third} alt="" />
            <span className="value">{sellerdashboard[0]?.payment}</span>
          </div>
        </div>
        <div className="info_bar">
          <div className="dasboard__dataiamge">
            <span className="header">My Reviews</span>
            <img src={fourth} alt="" />
            <span className="value">{sellerdashboard[0]?.reviews}</span>
          </div>
          <div className="dasboard__dataiamge">
            <span className="header">Best Sellers</span>
            <img src={fivth} alt="" />
            <span className="value">{sellerdashboard[0]?.best_sellers}</span>
          </div>
          <div className="dasboard__dataiamge">
            <span className="header">Low Inventory Products</span>
            <img src={sixth} alt="" />
            <span className="value">
              {sellerdashboard[0]?.low_inventory_products}
            </span>
          </div>
        </div>
      </div>

      <div className="dashboard__status">
        <div className="dashboard__statusoffer">
          <img src={exchangeoffer} alt="" />
        </div>
        <div className="dashboard__status1">
          <h2>{sellerdashboard[0]?.product_positiong}th</h2>
          <p>Product Positioning</p>
        </div>
        <div className="dashboard__status1">
          <h2>{sellerdashboard[0]?.kpi}</h2>
          <p>My KPI</p>
        </div>
      </div>
      <DashboardChartSection />
    </div>
  );
}

export default Dashboard;
