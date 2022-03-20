import React from "react";
import "./styles.scss";
import {
  LineChart,
  ResponsiveContainer,
  Legend,
  Tooltip,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

// Sample chart data
const pdata = [
  {
    name: "Mar",
    value: 11,
    fees: 120,
  },
  {
    name: "Apr",
    value: 15,
    fees: 12,
  },
  {
    name: "May",
    value: 5,
    fees: 10,
  },
  {
    name: "Jun",
    value: 10,
    fees: 5,
  },
  {
    name: "Jul",
    value: 9,
    fees: 4,
  },
  {
    name: "Aug",
    value: 10,
    fees: 8,
  },
];

function LineCharts() {
  return (
    <div className="linechart">
      <p className="order_volume">ORDER VOLUME</p>
      <div className="order_info">
        <p className="order_received">
          <span></span>Order Received
        </p>
        <p className="order_placed">
          <span></span>Order Placed
        </p>
      </div>
      <ResponsiveContainer width="100%" aspect={1.5}>
        <LineChart data={pdata} margin={{ right: 50 }}>
          <CartesianGrid />
          <XAxis dataKey="name" interval={"preserveStartEnd"} />
          <YAxis></YAxis>
          <Legend />
          <Tooltip />
          <Line
            dataKey="value"
            stroke="#CC9B3E"
            activeDot={{ r: 8 }}
            className="firstData"
          />
          <Line
            dataKey="fees"
            stroke="#20639B"
            activeDot={{ r: 8 }}
            className="secondData"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default LineCharts;
