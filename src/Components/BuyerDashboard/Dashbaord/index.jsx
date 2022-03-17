import React from "react";
import "./styles.scss";

import red from "../../../Assets/buyerdashboard/dashboard/red.png";
import blue from "../../../Assets/buyerdashboard/dashboard/blue.png";
import green from "../../../Assets/buyerdashboard/dashboard/green.png";
import exchangeoffer from "../../../Assets/sellerdashboard/dashboard/exchangeoffer.png";
import wanttobuy from "../../../Assets/buyerdashboard/dashboard/wanttobuy.png";
import apple from "../../../Assets/buyerdashboard/dashboard/apple.png";
import acer from "../../../Assets/buyerdashboard/dashboard/acer.png";
import hp from "../../../Assets/buyerdashboard/dashboard/hp.png";

import DashboardMapSection from "../../DashboardMapSection";

const BuyerDashboard = () => {
  const pricelist = [
    { image: apple, name: "Apple Macbook Pro", price: "1,87,999" },
    { image: hp, name: "Acer Sf314-42 Swift 3", price: "66,999" },
    { image: acer, name: "Pavilion Model14-Dv0054Tu", price: "66,999" },
  ];

  return (
    <div className="buyer_dashboard">
      <div className="dashboard__top">
        <div>
          <img src={red} alt="" />
        </div>
        <div>
          <img src={blue} alt="" />
        </div>
        <div>
          <img src={green} alt="" />
        </div>
      </div>

      <div className="dashboard__middle">
        <div className="dashboard__images">
          <div className="images__offer">
            <img src={exchangeoffer} alt="" />
          </div>
          <div className="images__buy">
            <img src={wanttobuy} alt="" />
            <p>Want to buy</p>
          </div>
        </div>
        <div className="dashboard__pricelist">
          <div className="pricelist__header">
            <div className="pricelist_info">
              <h2>Daily Price List</h2>

              <div className="pricelist__headertime">
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

              <span></span>
            </div>

            <ul>
              {pricelist.map((data, i) => (
                <li key={i}>
                  <span className="image">
                    <img src={data.image} alt="" />
                  </span>
                  <span className="name">{data.name}</span>
                  <span className="price">
                    <span>INR </span>
                    {data.price}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <DashboardMapSection />
    </div>
  );
};

export default BuyerDashboard;
