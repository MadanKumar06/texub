import React from "react";
import "./styles.scss";
import PieChart from "./PieChart";
import LineChart from "./LineChart";

function index() {
  return (
    <div className="dashboard_charts">
      <PieChart />
      <LineChart />
    </div>
  );
}

export default index;
