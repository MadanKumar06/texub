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

function Index() {
  const [tableData, setTableData] = useState([]);
  const ordertype = [
    { name: "All Orders" },
    { name: "Open Invoice" },
    { name: "On-Going Orders" },
    { name: "Dispatched Orders" },
    { name: "Full-Filled Orders" },
  ];
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
  const orders = () => {
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
    } catch(e) {
      console.log(e)
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
              <span className="price">{parseFloat(value).toFixed(2)}</span>
            </div>
          );
        },
      },
    },
    {
      name: "order_status",
      label: "Status",
      options: {
        customBodyRender: (value) => {
          return (
            <div
              className={`
                    ${value === "Pending" && "myorders__pending"}
                    ${value === "Confirm" && "myorders__confirm"}
                    ${value === "Delivered" && "myorders__delivered"}
                    ${value === "Dispatched" && "myorders__dispatched"}
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
          return <div className="myorders__action" onClick={orders}>{value}</div>;
        },
      },
    },
  ];

  return (

    <div className="myorders">
      <div className="my_orders__footer">
        <div className="my_orders__container">
          <Link to={`/${customnostore ? customnostore : geo?.country_name}/buyerdashboard/dashboard`}>
            <ArrowBackIosNew />
            <span>Back</span>
          </Link>
        </div>
      </div>
      {isOrders &&
        <>
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
      {isVieworders && <OrdersInfo />}
    </div>
  );
}

export default Index;
