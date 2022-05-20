import React, { useState, useEffect } from "react";
import "./styles.scss";
import Constant from "../../../Constant";
import red from "../../../Assets/buyerdashboard/dashboard/red.png";
import blue from "../../../Assets/buyerdashboard/dashboard/blue.png";
import green from "../../../Assets/buyerdashboard/dashboard/green.png";
import exchangeoffer from "../../../Assets/sellerdashboard/dashboard/exchangeoffer.png";
import wanttobuy from "../../../Assets/buyerdashboard/dashboard/wanttobuy.png";
import apple from "../../../Assets/buyerdashboard/dashboard/apple.png";
import acer from "../../../Assets/buyerdashboard/dashboard/acer.png";
import hp from "../../../Assets/buyerdashboard/dashboard/hp.png";

import DashboardChart from "../../DashboardChartSection";
import axios from "axios";
import { useStateValue } from "../../../store/state";
import { useNavigate } from "react-router-dom";

const BuyerDashboard = () => {
  const [{ geo, customnostore }, dispatch] = useStateValue();
  let navigate = useNavigate();
  const pricelist = [
    { image: apple, name: "Apple Macbook Pro", price: "1,87,999" },
    { image: hp, name: "Acer Sf314-42 Swift 3", price: "66,999" },
    { image: acer, name: "Pavilion Model14-Dv0054Tu", price: "66,999" },
  ];

  const [dashboarddata, setdashboarddata] = useState([]);
  useEffect(async () => {
    let user = JSON.parse(localStorage.getItem("userdata"));
    try {
      const dashdata = await axios({
        method: "post",
        url: `${Constant?.baseUrl()}/buyerDashboard`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: {
          buyerId: user?.id,
        },
      });
      setdashboarddata(dashdata?.data);
    } catch (e) {
      console.log(e);
    }
  }, []);

  const handleNavigate = () => {
    navigate(
      `/${
        customnostore ? customnostore : geo?.country_name
      }/buyerdashboard/wanttobuy`
    );
  };

  let [permission, setpermission] = useState();
  useEffect(() => {
    let permissions = JSON.parse(localStorage.getItem("permissions"));
    let pendingpermission =
      permissions?.length === 0
        ? false
        : permissions?.some(
            (per) =>
              per?.value === "can-raise-wtb-request" &&
              per?.permission_value === 0
          );
    setpermission(pendingpermission);
  }, []);

  console.log(dashboarddata);
  return (
    <div className="buyer_dashboard">
      <div className="dashboard__top">
        <div className="overview_image">
          <span className="header">Today's Deal</span>
          <img src={red} alt="" />
          <span className="value">{dashboarddata[0]?.todays_deal}</span>
        </div>
        <div className="overview_image">
          <span className="header">What's New</span>
          <img src={blue} alt="" />
          <span className="value">{dashboarddata[0]?.new_product}</span>
        </div>
        <div className="overview_image">
          <span className="header">Price Drop</span>
          <img src={green} alt="" />
          <span className="value">{dashboarddata[0]?.price_drop}</span>
        </div>
      </div>

      <div className="dashboard__middle">
        <div className="dashboard__images">
          <div className="images__offer">
            <img src={exchangeoffer} alt="" />
          </div>
          <div className="images__buy" onClick={() => handleNavigate()}>
            <img src={wanttobuy} alt="" />
            {!permission && <p>Want to buy</p>}
          </div>
        </div>
        <div className="dashboard__pricelist">
          <div className="pricelist__header">
            <div className="pricelist_info">
              <h2>Daily Price List</h2>

              {/* <div className="pricelist__headertime">
                <div className="hour">
                  <span className="label">HOUR</span>
                  <span className="value">07</span>
                </div>
                <div className="minute">
                  <span className="label">MINUTE</span>
                  <span className="value">22</span>
                </div>
                <div className="second">
                  <span className="label">SECOND</span>
                  <span className="value">35</span>
                </div>
              </div>

              <span></span> */}
            </div>

            <ul>
              {dashboarddata?.length &&
                dashboarddata?.[0]?.products?.length &&
                dashboarddata?.[0]?.products?.map((data, i) => {
                  return (
                    <li key={i}>
                      <span className="image">
                        <img
                          src={Constant?.imageBaseUrl() + data?.brand}
                          alt="brand"
                        />
                      </span>
                      <span className="name">{data?.name}</span>
                      <span className="price">
                        <span>{data?.currency} </span>
                        {data?.price}
                      </span>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </div>
      <DashboardChart />
    </div>
  );
};

export default BuyerDashboard;
