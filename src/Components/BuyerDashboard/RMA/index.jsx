import React, { useState } from "react";
import "./styles.scss";
import MUITable from "../../Common/MUITable";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { ArrowBackIosNew } from "@mui/icons-material";
import Pagination from "../../Pagination";
import { useStateValue } from "../../../store/state";
import NodataFound from "../../../Assets/CommonImage/NodataFound.webp.png";

function RMA() {
  const [{ geo, customstore, customnostore }, dispatch] = useStateValue();
  const [tableData, setTableData] = useState([]);
  const ordertype = [
    { name: "All RMA" },
    { name: "Open RMA" },
    { name: "Rejected RMA" },
    { name: "Closed RMA" },
  ];

  const [type, settype] = useState(0);

  const selectorder = (value) => {
    settype(value);
  };

  const options = {
    filter: false,
    filterType: "dropdown",
    responsive: "vertical",
    selectableRows: "none",
    pagination: false,
    download: false,
    print: false,
    sort: false,
    viewColumns: false,
    search: false,
    textLabels: {
      body: {
        noMatch: (
          <div className="no_data_found">
            {/* <img src={NodataFound} alt="No data Found" /> */}
            <p>No data Found...</p>
          </div>
        ),
      },
    },
  };

  const table = [
    {
      order: "000000006",
      date: "02/04/2022",
      seller_id: 220120,
      product_details: {
        name: "Lenovo Dpin Yoga",
        warranty: "12 Days Left",
      },
      return_quantity: 0,
      status: "Completed",
    },
    {
      order: "000000006",
      date: "02/04/2022",
      seller_id: 229120,
      product_details: {
        name: "Acer Sf314-42 Swift 3",
        warranty: "15 Days Left",
      },
      return_quantity: 20,
      status: "Rejected",
    },
    {
      order: "000000006",
      date: "02/04/2022",
      seller_id: 120120,
      product_details: {
        name: "Apple Macbook Pro",
        warranty: "19 Days Left",
      },
      return_quantity: 4,
      status: "Pending",
    },
    {
      order: "000000006",
      date: "02/04/2022",
      seller_id: 280120,
      product_details: {
        name: "Hp Business Laptop",
        warranty: "2 Days Left",
      },
      return_quantity: 50,
      status: "Accepted",
    },
  ];

  const columns = [
    {
      name: "order",
      label: "Order ID",
      options: {
        customBodyRender: (value) => {
          return <div className="rma__order_id">{value}</div>;
        },
      },
    },
    { name: "date", label: "Order Date" },
    { name: "date", label: "Return Req. Date" },
    {
      name: "product_details",
      label: "Product Details",
      options: {
        customBodyRender: (value) => {
          return (
            <div className="rma_products">
              <div className="rma_product_warranty">
                Warranty : {value?.warranty}
              </div>
              <div className="rma_product_name">{value?.name}</div>
            </div>
          );
        },
      },
    },
    {
      name: "seller_id",
      label: "Seller ID",
    },
    {
      name: "return_quantity",
      label: "Return Qty",
      options: {
        customBodyRender: (value) => {
          return (
            <div className="return_quantity">
              <span className="value">{value}</span>
            </div>
          );
        },
      },
    },
    {
      name: "status",
      label: "Status",
      options: {
        customBodyRender: (value) => {
          return (
            <div
              className={`${
                value === "Completed"
                  ? "rma__completed"
                  : value === "Accepted"
                  ? "rma__accepted"
                  : value === "Rejected"
                  ? "rma__rejected"
                  : value === "Pending" && "rma__pending"
              } `}
            >
              {value}
            </div>
          );
        },
      },
    },
  ];
  const PaginateDataSplit = (event) => {
    setTableData(event);
  };
  return (
    <div className="rma_container">
      <div className="rma__footer">
        <div className="rma__container">
          <Link
            to={`/${
              customnostore ? customnostore : geo?.country_name
            }/buyerdashboard/dashboard`}
          >
            <ArrowBackIosNew />
            <span>Back</span>
          </Link>
          <Button className="rma_btn">Request RMA</Button>
        </div>
      </div>

      <div className="rma__buttons">
        {ordertype.map((data, i) => (
          <div className="rma__btton_content">
            <p
              className={`rmatypes ${type === i && "rmatype__selected"}`}
              key={i}
              onClick={() => selectorder(i)}
            >
              {data.name}
            </p>
          </div>
        ))}
      </div>
      <MUITable
        columns={columns}
        table={tableData}
        options={options}
        className="rma__table"
      />
      <Pagination
        PaginateData={PaginateDataSplit}
        DataList={table}
        PagePerRow={10}
      />
    </div>
  );
}

export default RMA;
