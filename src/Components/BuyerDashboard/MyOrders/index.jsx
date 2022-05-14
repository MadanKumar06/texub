import React, { useState, useEffect } from "react";
import MUITable from '../../../Components/Common/MUITable'
import { ArrowBackIosNew } from "@mui/icons-material";
import { Link } from "react-router-dom";
import Pagination from "../../Pagination";
import "./styles.scss";
import { useStateValue } from "../../../store/state";
import Vieworders from '../../Common/Vieworders'
import OrdersInfo from '../../BuyerDashboard/MyOrders/OrdersInfo'
import axios from "axios";
import Constant from '../../../Constant'
import moment from "moment";
import { IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";


function Index() {
  const [tableData, setTableData] = useState([]);
  const ordertype = [
    { name: "All Orders" },
    { name: "Open Invoice" },
    { name: "On-Going Orders" },
    { name: "Dispatched Orders" },
    { name: "Full-Filled Orders" },
  ];
  function formatToCurrency(price) {
    return price.toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ",");
  }
  const [{geo, customstore, customnostore}, dispatch] = useStateValue();
  const [type, settype] = useState();

  const selectorder = (value) => {
    settype(value);
  };
  
  useEffect(() => {
    selectorder(0)
  }, [])

  const PaginateDataSplit = (event) => {
    if (orderlist?.length === 0) return setTableData([]);
    setTableData(event);
  };

  const [isVieworders, setisVieworders] = useState(false)
  const [currentorder, setcurrentorder] = useState()
  const orders = (value) => {
    setcurrentorder(value ? value : '')
    setisVieworders(true)
    setisOrders(false)
  }
  const [isOrders, setisOrders] = useState(true)

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

  const [orderlist, setorderlist] = useState([])

  useEffect(async() => {
    dispatch({
      type: "SET_IS_LOADING",
      value: true,
    });
    const user = JSON.parse(localStorage.getItem('userdata'))
    try {
      const orderlist = await axios({
        method: 'post',
        data: {
          buyerId: user?.id
        },
        url: `${Constant?.baseUrl()}/getBuyerOrderList`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      setorderlist(orderlist?.data)
      dispatch({
        type: "SET_IS_LOADING",
        value: false,
      });
    } catch(e) {
      console.log(e)
      dispatch({
        type: "SET_IS_LOADING",
        value: false,
      });
    }
  }, [])


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
    { name: "date",
      label: "Date",
      options: {
        customBodyRender: (value) => {
          return (
            <div className="myorders__date">
              <span className="price">{moment(value).format("DD/MM/YYYY")}</span>
            </div>
          );
        },
      }
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
              <span className="price"> {formatToCurrency(parseInt(value))}</span>
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
                    ${value === "pending" && "myorders__pending"}
                    ${value === "confirm" && "myorders__confirm"}
                    ${value === "delivered" && "myorders__delivered"}
                    ${value === "dispatched" && "myorders__dispatched"}
                    `}
            >
              {value}
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
          return <div className="myorders__action" onClick={() => orders(value)}>View Order</div>;
        },
      },
    },
  ];

  return (

    <div className="myorders">

     
      {isOrders &&
        <> <div className="myordersection__search">
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
          <MUITable columns={columns} table={tableData} options={options} className="myorders__table" />
          {orderlist?.length > 0 ?
            <Pagination
            PaginateData={PaginateDataSplit}
            DataList={orderlist?.length ? orderlist : []}
            PagePerRow={10}
          />
          :
          ""
          }
        </>

      }
      {isVieworders && <OrdersInfo currentorder={currentorder} orders={orders} />}
       <div className="my_orders__footer">
        <div className="my_orders__container">
          <Link to={`/${customnostore ? customnostore : geo?.country_name}/buyerdashboard/dashboard`}>
            <ArrowBackIosNew />
            <span>Back</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Index;
