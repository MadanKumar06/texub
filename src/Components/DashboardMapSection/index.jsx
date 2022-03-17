import React, { useState } from "react";
import "./styles.scss";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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

const DashboardMapSection = () => {
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
    padding: "10px",
  };

  const linestyle = {
    backgroundColor: "white",
    width: "80%",
    textAlign: "right",
    marginBottom: "2em",
    height: "100%",
  };

  const tablebody = [
    { label: "March", value: 25 },
    { label: "April", value: 25 },
    { label: "May", value: 10 },
    { label: "June", value: 18 },
    { label: "July", value: 10 },
    { label: "August", value: 13 },
  ];
  return (
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
        <p className="line__received">Order Received</p>
        <p className="line__placed">Order Placed</p>

        <Line options={options} data={data} style={{ ...linestyle }} />
      </div>
    </div>
  );
};

export default DashboardMapSection;
