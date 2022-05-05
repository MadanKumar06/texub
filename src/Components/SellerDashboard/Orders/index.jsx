import React, { useState, useEffect } from "react";
import "./styles.scss";
import MUITable from "../../Common/MUITable";
import { Link } from "react-router-dom";
import Pagination from "../../Pagination";
import { ArrowBackIosNew } from "@mui/icons-material";
import ViewOrder from "../../Common/Vieworders";
import { useStateValue } from "../../../store/state";
import axios from "axios";
import Constant from "../../../Constant";
var moment = require("moment");

function Index() {
  const [{ geo, customnostore }, dispatch] = useStateValue();
  const [tableData, setTableData] = useState([]);
  const [apiTableData, setApiTableData] = useState([]);
  const [viewDetail, setViewDetail] = useState({});
  const ordertype = [
    { name: "All Orders" },
    { name: "Purchase Orders" },
    { name: "Full-Filled Orders" },
    { name: "Cancelled Orders" },
  ];

  const [type, settype] = useState(0);

  const selectorder = (value) => {
    settype(value);
  };
  function formatToCurrency(price) {
    return price.toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ",");
  }

  const PaginateDataSplit = (event) => {
    if (apiTableData?.length === 0) return setApiTableData([]);
    setTableData(event);
  };
  const [vieworder, setvieworder] = useState(false);

  useEffect(() => {
    const fetchTableData = async () => {
      dispatch({
        type: "SET_IS_LOADING",
        value: true,
      });

      let seller_id = JSON.parse(localStorage.getItem("userdata"));
      try {
        const tabledata = await axios({
          method: "post",
          url: `${Constant.baseUrl()}/getSellerOrder`,
          data: {
            sellerId: seller_id?.id,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        dispatch({
          type: "SET_IS_LOADING",
          value: false,
        });
        setApiTableData(tabledata?.data);
      } catch (e) {
        console.log(e);
        dispatch({
          type: "SET_IS_LOADING",
          value: false,
        });
      }
    };
    fetchTableData();
  }, []);

  const handleViewOrder = (item_id) => {
    let temp = apiTableData?.filter((itm) => itm?.item_id === item_id);
    setViewDetail(temp);
    setvieworder(true);
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

  const columns = [
    {
      name: "quote_id",
      label: "Purchase Order ID",
      options: {
        customBodyRender: (value) => {
          return <div className="orders__code">{value}</div>;
        },
      },
    },
    {
      name: "date",
      label: "Date",
      options: {
        customBodyRender: (value) => {
          return <div className="">{moment(value).format("DD/MM/YY")}</div>;
        },
      },
    },
    {
      name: "buyer_code",
      label: "Buyer Code",
      options: {
        customBodyRender: (value) => {
          return <div className="orders__buyercode">{value}</div>;
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
            <div className="orders__ordertotal">
              <span className="label">
                {JSON.parse(localStorage.getItem("currency"))?.currency_code}
              </span>
              <span className="value">{formatToCurrency(parseInt(value))}</span>
            </div>
          );
        },
      },
    },
    {
      name: "quote_status",
      label: "Status",
      options: {
        customBodyRender: (value) => {
          return (
            <div
              className={`
              ${value === "Pending" && "orders__pending"}
              ${value === "Confirm" && "orders__confirmed"}
              ${value === "Delivered" && "orders__delivered"}
              ${value === "Dispatched" && "orders__dispatched"}
              `}
            >
              {value}
            </div>
          );
        },
      },
    },
    {
      name: "action",
      label: "Action",
      options: {
        customBodyRender: (value, tablemeta) => {
          let item_id = tablemeta?.rowData?.[7];
          return (
            <div
              className="orders__action"
              onClick={() => handleViewOrder(item_id)}
            >
              View Order
            </div>
          );
        },
      },
    },
    {
      name: "item_id",
      label: " ",
      options: {
        display: false,
      },
    },
  ];

  return (
    <div className="orders">
      {!vieworder ? (
        <>
          <div className="orders__buttons">
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
            table={tableData?.length ? tableData : []}
            options={options}
            className="orders__table"
          />

          {apiTableData?.length > 0 ? (
            <Pagination
              PaginateData={PaginateDataSplit}
              DataList={apiTableData?.length ? apiTableData : []}
              PagePerRow={10}
            />
          ) : (
            ""
          )}
          <div className="orders__back__footer">
            <div className="orders__back__container">
              <Link
                to={`/${
                  customnostore ? customnostore : geo?.country_name
                }/buyerdashboard/dashboard`}
              >
                <ArrowBackIosNew />
                <span>Back</span>
              </Link>
            </div>
          </div>
        </>
      ) : (
        <ViewOrder viewDetail={viewDetail} />
      )}
    </div>
  );
}

export default Index;
