import React, { useState, useEffect } from "react";
import MUITable from "../../../Components/Common/MUITable";
import { ArrowBackIosNew } from "@mui/icons-material";
import { Link } from "react-router-dom";
import Pagination from "../../Pagination";
import "./styles.scss";
import { useStateValue } from "../../../store/state";
import Vieworders from "../../Common/Vieworders";
import OrdersInfo from "../../BuyerDashboard/MyOrders/OrdersInfo";
import axios from "axios";
import Constant from "../../../Constant";
import moment from "moment";
import { IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NodataFound from "../../../Assets/CommonImage/NodataFound.webp.png";

function Index() {
  const [tableData, setTableData] = useState([]);
  const ordertype = [
    { name: "All Orders" },
    { name: "Pending Orders" },
    { name: "Confirmed Orders" },
    { name: "Dispatched Orders" },
    { name: "Delivered Orders" },
  ];
  function formatToCurrency(price) {
    return price.toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ",");
  }
  const [{}, dispatch] = useStateValue();
  const [type, settype] = useState();

  const selectorder = (value) => {
    settype(value);
  };

  useEffect(() => {
    selectorder(0);
  }, []);

  const PaginateDataSplit = (event) => {
    if (orderlist?.length === 0) return setTableData([]);
    setTableData(event);
  };

  const [isVieworders, setisVieworders] = useState(false);
  const [currentorder, setcurrentorder] = useState();
  const orders = (value) => {
    setcurrentorder(value ? value : "");
    setisVieworders(true);
    setisOrders(false);
  };
  const [isOrders, setisOrders] = useState(true);

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

  const [orderlist, setorderlist] = useState([]);

  useEffect(async () => {
    dispatch({
      type: "SET_IS_LOADING",
      value: true,
    });
    const user = JSON.parse(localStorage.getItem("userdata"));
    try {
      const orderlist = await axios({
        method: "post",
        data: {
          buyerId: user?.id,
        },
        url: `${Constant?.baseUrl()}/getBuyerOrderList`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setorderlist(orderlist?.data);
      dispatch({
        type: "SET_IS_LOADING",
        value: false,
      });
    } catch (e) {
      console.log(e);
      dispatch({
        type: "SET_IS_LOADING",
        value: false,
      });
    }
  }, []);

  const columns = [
    {
      name: "order_id",
      label: "Order ID",
      options: {
        customBodyRender: (value) => {
          return <div className="myorders__orderid">{value}</div>;
        },
      },
    },
    {
      name: "date",
      label: "Date",
      options: {
        customBodyRender: (value) => {
          return (
            <div className="myorders__date">
              <span className="price">
                {moment(value).format("DD/MM/YYYY")}
              </span>
            </div>
          );
        },
      },
    },
    { name: "hub", label: "HUB" },
    {
      name: "order_total",
      label: "Order Total",
      options: {
        customBodyRender: (value) => {
          return (
            <div className="myorders__ordertotal">
              <span className="currency">INR </span>
              <span className="price">
                {" "}
                {formatToCurrency(parseInt(value))}
              </span>
            </div>
          );
        },
      },
    },
    {
      name: "order_status",
      label: "Order Status",
      options: {
        customBodyRender: (value) => {
          return (
            <div
              className={`
                    ${value === "1" && "myorders__pending"}
                    ${value === "2" && "myorders__confirm"}
                    ${value === "4" && "myorders__delivered"}
                    ${value === "3" && "myorders__dispatched"}
                    `}
            >
              {value === "1" ? "Pending" : ""}
              {value === "2" ? "Confirm" : ""}
              {value === "3" ? "Dispatched" : ""}
              {value === "4" ? "Delivered" : ""}
            </div>
          );
        },
      },
    },
    {
      name: "payment_status",
      label: "Payment Status",
      options: {
        customBodyRender: (value) => {
          return (
            <div
              className={`
            ${value === "1" && "myorders__pending"}
            ${value === "2" && "myorders__delivered"}
            ${value === "3" && "myorders__failed"}
            `}
            >
              {value === "1" ? "Pending" : ""}
              {value === "2" ? "Completed" : ""}
              {value === "3" ? "Failed" : ""}
            </div>
          );
        },
      },
    },
    {
      name: "order_id",
      label: "Action",
      options: {
        customBodyRender: (value) => {
          return (
            <div className="myorders__action" onClick={() => orders(value)}>
              View Order
            </div>
          );
        },
      },
    },
  ];

  return (
    <div className="myorders">
      {isOrders && (
        <>
          {" "}
          <div className="myordersection__search">
            <Paper
              className="myordersection__searchinput"
              component="form"
              sx={{ p: "2px 4px", display: "flex", alignItems: "center" }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search..."
                inputProps={{ "aria-label": "search google maps" }}
                className="myordersection_input"
              />
              <IconButton
                type="submit"
                sx={{ p: "10px" }}
                aria-label="search"
                onClick={(event) => event.preventDefault()}
              >
                <SearchIcon />
              </IconButton>
            </Paper>
            {/* <div className="sellerdashboard__notiIcon">
                <img src={notification} alt="" />
              </div>
              <span>Notification</span> */}
          </div>
          <div className="myorders__buttons">
            {ordertype.map((data, i) => (
              <p
                className={`ordertypes ${type === i && "ordertype__selected"}`}
                key={i}
                onClick={() => selectorder(i)}
              >
                {data.name}
              </p>
            ))}
          </div>
          <MUITable
            columns={columns}
            table={tableData}
            options={options}
            className="myorders__table"
          />
          {orderlist?.length > 0 ? (
            <Pagination
              PaginateData={PaginateDataSplit}
              DataList={orderlist?.length ? orderlist : []}
              PagePerRow={10}
            />
          ) : (
            ""
          )}
        </>
      )}
      {isVieworders && (
        <OrdersInfo currentorder={currentorder} orders={orders} />
      )}
      <div className="my_orders__footer">
        <div className="my_orders__container">
          <div
            className="back_button"
            onClick={() => {
              setisVieworders(false);
              setisOrders(true);
            }}
            style={{ cursor: "pointer" }}
          >
            <ArrowBackIosNew />
            <span className="back">Back</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
