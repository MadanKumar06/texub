import React from "react";
import "./styles.scss";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Mar", value: 500, color: "#F2E4FF", month: "March" },
  { name: "Apr", value: 850, color: "#D8F5FF", month: "April" },
  { name: "May", value: 500, color: "#D0FFA2", month: "May" },
  { name: "Jun", value: 400, color: "#A3EEFF", month: "June" },
  { name: "Jul", value: 500, color: "#ADDCFF", month: "July" },
  { name: "Aug", value: 850, color: "#FFD6AD", month: "August" },
];

const COLORS = [
  "#F2E4FF",
  "#D8F5FF",
  "#D0FFA2",
  "#A3EEFF",
  "#ADDCFF",
  "#FFD6AD",
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const Charts = () => {
  return (
    <div className="piechart_container">
      <p className="title">Order Chart</p>
      <div className="month">
        {data?.length &&
          data?.map((itm) => {
            return (
              <>
                <span style={{ backgroundColor: `${itm?.color}` }}></span>
                <p>{itm.name}</p>
              </>
            );
          })}
      </div>
      <div className="chart_table_container">
        <div className="pie">
        <ResponsiveContainer width="100%" height="100%" aspect={1}>
          <PieChart width={320} height={320} className="piechart">
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
            >
              {data?.length &&
                data?.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS?.length]}
                  />
                ))}
            </Pie>
          </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="chart_info">
          <p className="table__header">
            <span>Months</span>
            <span>Total Orders</span>
          </p>
          {data?.length &&
            data?.map((data, i) => (
              <p className="table__cell" key={i}>
                <span>{data.month}</span>
                <span>{data.value}</span>
              </p>
            ))}
        </div>
      </div>
    </div>
  );
};
export default Charts;
