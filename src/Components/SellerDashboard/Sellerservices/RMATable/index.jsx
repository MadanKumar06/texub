import React, { useState } from 'react'
import './styles.scss'
import MUITable from '../../../MUITable'
import { useNavigate } from "react-router-dom";
import Pagination from "../../../Pagination";

function Index() {
  const history = useNavigate();

  const back = () => {
    history("/");
  };
  const [tableData, setTableData] = useState([]);
  const PaginateDataSplit = (event) => {
    setTableData(event);
  };
  const options = {
    filter: false,
    filterType: "dropdown",
    responsive: "vertical",
    selectableRows: "none",
    download: false,
    print: false,
    sort: false,
    viewColumns: false,
    search: false,
  };

  const table = [
    {
      orderid: "00006",
      orderdate: "11/09/21",
      returnreqdate: "23/09/21",
      pdetails: "HP Business Laptop",
      warranty: "25 Days Left",
      buyercode: "BU201200",
      returnqty: "56",
      action: "",
    },
    {
      orderid: "00007",
      orderdate: "09/05/21",
      returnreqdate: "25/05/21",
      pdetails: "Apple Macbook Pro",
      warranty: "8 Days Left",
      buyercode: "BU201201",
      returnqty: "60",
      action: "",
    },
  ];

  const columns = [
    {
      name: "orderid",
      label: "Order ID",
      options: {
        customBodyRender: (value) => {
          return <div className="rmatable__orderid">{value}</div>;
        },
      },
    },
    { name: "orderdate", label: "Order Date" },
    { name: "returnreqdate", label: "Return Req. Date" },
    {
      name: "pdetails",
      label: "Product Details",
      options: {
        customBodyRender: (value) => {
          return (
            <div className="rmatable__pdetails">
              <span className="label">Warranty: 22 Days Left</span>
              <span className="value">{value}</span>
            </div>
          );
        },
      },
    },
    {
      name: "buyercode",
      label: "Buyer Code",
      options: {
        customBodyRender: (value) => {
          return <div className="rmatable__buyercode">{value}</div>;
        },
      },
    },
    {
      name: "returnqty",
      label: "Return Qty",
      options: {
        customBodyRender: (value) => {
          return <div className="rmatable__returnqty">{value}</div>;
        },
      },
    },
    {
      name: "action",
      label: "Action",
      options: {
        customBodyRender: (value) => {
          return (
            <div className="rmatable__action">
              <span className="accept">Accept</span>
              <span className="reject">Reject</span>
            </div>
          );
        },
      },
    },
  ];

  return (
    <div className="rmatable">

      <MUITable columns={columns} table={tableData} options={options}  />
      <Pagination
        PaginateData={PaginateDataSplit}
        DataList={table}
        PagePerRow={10}
      />
      {/* <div className='rmatable__submit'>
            <span className='rmatable__back' onClick={back}>Back</span>
        </div> */}
    </div>
  );
}

export default Index;
