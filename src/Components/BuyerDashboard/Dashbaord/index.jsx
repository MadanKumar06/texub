import React, { useState, useEffect } from "react";
import "./styles.scss";

import red from "../../../Assets/buyerdashboard/dashboard/red.png";
import blue from "../../../Assets/buyerdashboard/dashboard/blue.png";
import green from "../../../Assets/buyerdashboard/dashboard/green.png";
import exchangeoffer from "../../../Assets/sellerdashboard/dashboard/exchangeoffer.png";
import wanttobuy from "../../../Assets/buyerdashboard/dashboard/wanttobuy.png";
import apple from "../../../Assets/buyerdashboard/dashboard/apple.png";
import acer from "../../../Assets/buyerdashboard/dashboard/acer.png";
import hp from "../../../Assets/buyerdashboard/dashboard/hp.png";

import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const BuyerDashboard = () => {
  const [pievalue, setpievalue] = useState([25, 25, 10, 18, 10, 13]);
  const [piebgcolor, setpiebgcolor] = useState([
    {
      name: "Mar",
      color: "#D8F5FF",
    },
    {
      name: "Apr",
      color: "#F2E4FF",
    },
    {
      name: "May",
      color: "#FFD6AD",
    },
    {
      name: "Jun",
      color: "#ADDCFF",
    },
    {
      name: "Jul",
      color: "#A3EEFF",
    },
    {
      name: "Aug",
      color: "#D0FEA2",
    },
  ]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  };

  const labels = ["March", "April", "May", "June", "July", "August"];

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: [600, 500, 150, 800, 500, 400],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Dataset 2",
        data: [1100, 300, 50, 200, 500, 600],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const piedata = {
    // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        // label: '# of Votes',
        data: pievalue,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const piestyle = {
    borderRadius: "100%",
    padding: "8px",
  };

  const linestyle = {
    backgroundColor: "white",
    width: "80%",
    textAlign: "right",
    height: "75% !important",
    marginBottom: "2em",
  };

  const tablebody = [
    { label: "March", value: 25 },
    { label: "April", value: 25 },
    { label: "May", value: 10 },
    { label: "June", value: 18 },
    { label: "July", value: 10 },
    { label: "August", value: 13 },
  ];

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

      <div className="dashboard__chart">
        <div className="chart__pie">
          <div className="pie__graph">
            <p className="pie_chart_title">ORDER CHART</p>
            <div className="graph__header">
              {piebgcolor.map((data, i) => (
                <p className="month_items">
                  <p
                    key={i}
                    style={{ ...piestyle, backgroundColor: `${data?.color}` }}
                  ></p>
                  <span>{data?.name}</span>
                </p>
              ))}
            </div>
          </div>
          <div className="pie__table">
            <div className="pie__chart">
              <Pie data={piedata} style={{ height: "100%" }} />
            </div>
            <div className="chart_info">
              <p className="table__header">
                <span>Months</span>
                <span>Total Orders</span>
              </p>
              {tablebody.map((data, i) => (
                <p className="table__cell" key={i}>
                  <span>{data.label}</span>
                  <span>{data.value}</span>
                </p>
              ))}
            </div>
          </div>
        </div>
        <div className="chart__line">
          <Line options={options} data={data} style={{ ...linestyle }} />
        </div>
      </div>
    </div>
  );
};

export default BuyerDashboard;
