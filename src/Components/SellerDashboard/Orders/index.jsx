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
import NodataFound from "../../../Assets/CommonImage/NodataFound.webp.png";
import { useNavigate } from "react-router-dom";

import { IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

var moment = require("moment");

function Index({ handleSearchBar, searchdata, searchupdate, setSearch }) {
  const [{ geo, customnostore }, dispatch] = useStateValue();
  const [tableData, setTableData] = useState([]);
  const [apiTableData, setApiTableData] = useState([]);
  const [viewDetail, setViewDetail] = useState({});
  const [direct, setdirect] = useState([]);
  const [filtereddirect, setfiltereddirect] = useState([]);
  const [orderTypeColor, setorderTypeColor] = useState(0);
  const [isNotMatched,setisNotMatched] = useState(false);
  const [seller_order_status,setseller_order_status] = useState(0)
  const ordertype = [
    { name: "All Orders" },
    { name: "On-Going Orders" },
    { name: "Delivered Orders" },
    { name: "Cancelled Orders" },
  ];
  const Navigate = useNavigate();

  const [type, settype] = useState(0);

  const selectorder = (value) => {
    settype(value);
  };
  useEffect(() => {
    settype(0);
  }, []);
useEffect(() => {
    if (type === 0) {
      setorderTypeColor(0)
      setfiltereddirect(apiTableData);
    }
    if (type === 1) {
      setorderTypeColor(0)
      const po_received = apiTableData?.filter((d) => d?.po_status === "0");
      if(po_received?.length) {
        setfiltereddirect(po_received)
      } else {
        setdirect([])
        setfiltereddirect([])
      }
    }
    if (type === 1) {
      setorderTypeColor(0)
      const confirm = apiTableData?.filter((d) => d?.po_status === "1");
      if(confirm?.length) {
        setfiltereddirect(confirm)
      } else {
        setdirect([])
        setfiltereddirect([])
      }
    }
    if (type === 1) {
      setorderTypeColor(0)
      const dispatched = apiTableData?.filter((d) => d?.po_status === "2");
      if(dispatched?.length) {
        setfiltereddirect(dispatched)
      } else {
        setdirect([])
        setfiltereddirect([])
      }
    }
    if (type === 2) {
      setorderTypeColor(0)
      const delivered = apiTableData?.filter((d) => d?.po_status === "3");
      if(delivered?.length) {
        setfiltereddirect(delivered)
      } else {
        setdirect([])
        setfiltereddirect([])
      }
    }
    if (type === 3) {
      setorderTypeColor(0)
      const cancel = apiTableData?.filter((d) => d?.po_status === "4");
      if(cancel?.length) {
        setfiltereddirect(cancel)
      } else {
        setdirect([])
        setfiltereddirect([])
      }
    }
  }, [type, apiTableData]);
  // useEffect(() => {
  //   if (type === 0) {
  //     setTableData(apiTableData);
  //   }
  //   if (type === 1) {
  //     const confirm = apiTableData?.filter((d) => d?.quote_status === "1");
  //     setTableData(confirm);
  //   }
  //   if (type === 1) {
  //     const dispatch = apiTableData?.filter((d) => d?.quote_status === "2");
  //     setTableData(dispatch);
  //   }
  //   if (type === 2) {
  //     const delivered = apiTableData?.filter((d) => d?.quote_status === "3");
  //     setTableData(delivered);
  //   }
  //   if (type === 3) {
  //     const cancel = apiTableData?.filter((d) => d?.quote_status === "4");
  //     setTableData(cancel);
  //   }
  // }, [type, apiTableData]);

  // useEffect(() => {
  //   if (apiTableData?.length === 0) return;
  //   if (searchdata === "") {
  //     setTableData(apiTableData);
  //   } else {
  //     let temp = apiTableData?.filter((td) =>
  //       td?.po_number?.toLowerCase()?.includes(searchdata?.toLowerCase())
  //     );
  //     setTableData(temp);
  //   }
  // }, [searchupdate, apiTableData]);
  useEffect(() => {
    if (apiTableData?.length === 0) return;
    if (searchdata === "") {
      setfiltereddirect(apiTableData);
    } else {
      let temp = apiTableData?.filter((td) =>
        td?.po_number?.toLowerCase()?.includes(searchdata?.toLowerCase())
      );
      setfiltereddirect(temp);
    }
    setorderTypeColor(1)
    settype(null)
    setSearch("")
    setisNotMatched(!isNotMatched)
  }, [searchupdate, apiTableData]);

  function formatToCurrency(price) {
    return price.toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ",");
  }

  const PaginateDataSplit = (event) => {
    if (apiTableData?.length === 0) return setdirect([]);
      setdirect(event);
  };
   useEffect(()=>{
    if(filtereddirect.length===0){
      setdirect([])
    }
  },[isNotMatched])
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
          url: `${Constant.baseUrl()}/getSellerPos`,
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

  /* const handleViewOrder = (id) => {
    handleSearchBar(false);
    let temp = apiTableData?.filter((itm) => itm?.po_id === id);
    setViewDetail(temp);
    setvieworder(true);
  }; */
  const handleViewOrder = (id) => {
    let temp = apiTableData?.filter((itm) => itm?.po_id === id);
    Navigate(
      `/${
        customnostore ? customnostore : geo?.country_name
      }/sellerdashboard/vieworder`,
      {
        state: temp,
      }
    );
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

  const columns = [
    {
      name: "po_number",
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
      name: "total",
      label: "Order Total",
      options: {
        customBodyRender: (value, tablemeta) => {
          let currency = tablemeta?.rowData?.[8];
          return (
            <div className="orders__ordertotal">
              <span className="label">{currency}</span>
              <span className="value">{formatToCurrency(parseInt(value))}</span>
            </div>
          );
        },
      },
    },
    {
      name: "po_status",
      label: "Status",
      options: {
        customBodyRender: (value) => {
          return (
            <div
              className={`
              ${value === "4" && "orders__canceled"}
              ${value === "1" && "orders__confirmed"}
              ${value === "2" && "orders__dispatched"}
              ${value === "3" && "orders__delivered"}
              ${value === "0" && "orders__received"}
              `}
            >
              {value === "4" ? "Canceled" : ""}
              {value === "1" ? "Confirm" : ""}
              {value === "2" ? "Dispatched" : ""}
              {value === "3" ? "Delivered" : ""}
              {value === "0" ? "Po Received" : ""}
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
          let orderstatus_id = tablemeta?.rowData?.[5];
          return (
            <div
              className="orders__action"
              onClick={() =>{
                handleViewOrder(item_id)
                setseller_order_status(orderstatus_id)
              }}
            >
              View Order
            </div>
          );
        },
      },
    },
    {
      name: "po_id",
      label: " ",
      options: {
        display: false,
      },
    },
    {
      name: "currency",
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
          {/* <div className="sellerdashboard__search">
              <Paper
                className="sellerdashboard__searchinput"
                component="form"
                sx={{ p: "2px 4px", display: "flex", alignItems: "center" }}
              >
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Search..."
                  inputProps={{ "aria-label": "search google maps" }}
                  className="sellerdashboard__input"
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
             
            </div> */}
          <div className="orders__buttons">
            {ordertype.map((data, i) => (
              <p
                // className={`ordertypes ${type === i && "ordertype__selected"}`}
                className={`ordertypes ${type === i && "ordertype__selected"} 
                ${orderTypeColor === 1 && data.name==="All Orders"? "ordertype__selected":null}
                `}
                key={i}
                onClick={() =>{
                  selectorder(i)
                  setSearch("")
                }}
              >
                {data.name}
              </p>
            ))}
          </div>

          <MUITable
            columns={columns}
            table={direct?.length ? direct : []}
            options={options}
            className="orders__table"
          />

       
          {filtereddirect?.length > 0 ? (
            <Pagination
              PaginateData={PaginateDataSplit}
              DataList={filtereddirect}
              PagePerRow={10}
            />
          ) : (
            ""
          )}
          <div className="orders__back__footer">
            <div className="orders__back__container">
              <div
                className="back_button"
                onClick={() => window.history.back()}
              >
                <ArrowBackIosNew />
                <span>Back</span>
              </div>
              {/* <Link
                to={`/${
                  customnostore ? customnostore : geo?.country_name
                }/buyerdashboard/dashboard`}
              >
                <ArrowBackIosNew />
                <span>Back</span>
              </Link> */}
            </div>
          </div>
        </>
      ) : (
        <ViewOrder
          viewDetail={viewDetail}
          setvieworder={setvieworder}
          handleSearchBar={handleSearchBar}
          seller_order_status={seller_order_status}
        />
      )}
    </div>
  );
}

export default Index;
