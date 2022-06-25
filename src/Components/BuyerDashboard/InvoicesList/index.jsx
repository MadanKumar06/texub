import React, { useState, useEffect } from "react";
import MUITable from "../../../Components/Common/MUITable";
import { ArrowBackIosNew, Search } from "@mui/icons-material";
import { Paper, InputBase, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import Pagination from "../../Pagination";
import "./styles.scss";
import Vieworders from "../../Common/Vieworders";
import transaction_type from "../../../Assets/buyerdashboard/InvoicesList/paypal (1).png";
import transaction_type1 from "../../../Assets/buyerdashboard/InvoicesList/braintree-logo-black.png";
import { useStateValue } from "../../../store/state";
import { SessionExpiredLogout } from "../../../utilities";

import axios from "axios";
import Constant from "../../../Constant";
import moment from "moment";
function Index() {
  const [tableData, setTableData] = useState([]);
  const [searchdata, setsearchdata] = useState("");
  const [invoicelist, setinvoicelist] = useState();
  const [direct, setdirect] = useState([]);
  const [orderTypeColor, setorderTypeColor] = useState(0);
  const [isNotMatched, setisNotMatched] = useState(false);
  const ordertype = [
    { name: "All Invoices" },
    { name: "Pending Invoices" },
    { name: "Paid Invoices" },
  ];
  const [{ geo, customstore, customnostore }, dispatch] = useStateValue();
  const [type, settype] = useState();

  const selectorder = (value) => {
    settype(value);
  };

  useEffect(() => {
    settype(0);
  }, []);

  // useEffect(() => {
  //   if (type === 0) {
  //     setTableData(invoicelist)
  //   }
  //   if (type === 1) {
  //     const pending_invoice = invoicelist?.filter(d => d?.pending_invoice_status === "Pending")
  //     if(pending_invoice) {
  //       setTableData(pending_invoice)
  //     } else {
  //       setTableData([])
  //     }
  //   }
  //   if (type === 2) {
  //     const paid_invoice = invoicelist?.filter(d => d?.pending_invoice_status === "Paid")
  //     if(paid_invoice) {
  //       setTableData(paid_invoice)
  //     } else {
  //       setTableData([])
  //     }
  //   }
  // }, [type])
  useEffect(() => {
    if (type === 0) {
      setorderTypeColor(0);
      setTableData(invoicelist);
    }
    if (type === 1) {
      setorderTypeColor(0);
      const pending_invoice = invoicelist?.filter(
        (d) => d?.pending_invoice_status === "Pending"
      );
      if (pending_invoice?.length) {
        setTableData(pending_invoice);
      } else {
        setdirect([]);
        setTableData([]);
      }
    }
    if (type === 2) {
      setorderTypeColor(0);
      const paid_invoice = invoicelist?.filter(
        (d) => d?.pending_invoice_status === "Paid"
      );
      if (paid_invoice?.length) {
        setTableData(paid_invoice);
      } else {
        setdirect([]);
        setTableData([]);
      }
    }
  }, [type, invoicelist]);

  const PaginateDataSplit = (event) => {
    if (invoicelist?.length === 0) return setdirect([]);
    setdirect(event);
  };
  function formatToCurrency(price) {
    return price.toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ",");
  }

  const searchHandler = (e) => {
    e.preventDefault();
    setorderTypeColor(1);
    settype(null);
    setsearchdata("");
    if (invoicelist?.length === 0) return;
    if (searchdata === "") {
      setTableData(invoicelist);
    } else {
      let temp = invoicelist?.filter((td) =>
        td?.pending_invoice_id
          ?.toLowerCase()
          ?.includes(searchdata?.toLowerCase())
      );
      setTableData(temp);
    }
    setisNotMatched(!isNotMatched);
  };
  useEffect(() => {
    if (tableData.length === 0) {
      setdirect([]);
    }
  }, [isNotMatched]);
  const [isVieworders, setisVieworders] = useState(false);
  const orders = () => {
    setisVieworders(true);
    setisOrders(false);
  };
  const [isOrders, setisOrders] = useState(true);

  const options = {
    filter: false,
    filterType: "dropdown",
    pagination: false,
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

  useEffect(async () => {
    dispatch({
      type: "SET_IS_LOADING",
      value: true,
    });
    const user = JSON.parse(localStorage.getItem("userdata"));
    try {
      const invoice = await axios({
        method: "post",
        url: `${Constant?.baseUrl()}/listPendingInvoices`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: {
          customer_id: user?.id,
        },
      });
      setinvoicelist(invoice?.data);
      dispatch({
        type: "SET_IS_LOADING",
        value: false,
      });
    } catch (e) {
      dispatch({
        type: "SET_IS_LOADING",
        value: false,
      });
      if (e.response.status === 401) {
        SessionExpiredLogout();
      }
    }
  }, []);

  const columns = [
    {
      name: "pending_invoice_id",
      label: "Invoice No",
      options: {
        customBodyRender: (value) => {
          return <div className="invoices__invoicesno">{value}</div>;
        },
      },
    },
    {
      name: "created_at",
      label: "Date",
      options: {
        customBodyRender: (value) => {
          return (
            <div className="invoices__date">
              {moment(value).format("DD/MM/YYYY")}
            </div>
          );
        },
      },
    },
    {
      name: "quote_currency",
      label: " ",
      options: {
        display: false,
      },
    },
    // {
    //   name: "seller_id",
    //   label: "Seller ID",
    //   options: {
    //     customBodyRender: (value) => {
    //       return <div className="invoices__sellerid">{value}</div>;
    //     },
    //   },
    // },
    {
      name: "grand_total",
      label: "Amount",
      options: {
        customBodyRender: (value, tableMeta) => {
          let currency_id = tableMeta?.rowData[2];

          return (
            <div className="invoices__amount">
              <span className="currency">{currency_id} </span>
              <span className="price">{formatToCurrency(parseInt(value))}</span>
            </div>
          );
        },
      },
    },
    // {
    //   name: "hub",
    //   label: "HUB",
    //   options: {
    //     customBodyRender: (value) => {
    //       return <div className="invoices__hub">{value}</div>;
    //     },
    //   },
    // },
    {
      name: "transactionmode",
      label: "Transaction Mode",
      options: {
        customBodyRender: (value) => {
          return (
            <div>
              <img src={value} alt="" className="" />
            </div>
          );
        },
      },
    },
    {
      name: "pending_invoice_status",
      label: "Status",
      options: {
        customBodyRender: (value) => {
          return (
            <div
              className={`
                    ${value === "Pending" && "invoices__pending"}
                    ${value === "Paid" && "invoices__paid"}
                    ${value === "Cancelled" && "invoices__cancelled"}
                    `}
            >
              {value}
            </div>
          );
        },
      },
    },
    {
      name: "quote_id",
      label: "Action",
      options: {
        customBodyRender: (value) => {
          return (
            <Link
              to={`/${
                customnostore ? customnostore : geo?.country_name
              }/pendinginvoice/${value}`}
            >
              <div className="invoices__action">View Details</div>
            </Link>
          );
        },
      },
    },
  ];

  return (
    <div className="invoices_main">
      <div className="invoices__search">
        <Paper
          className="invoices__searchinput"
          component="form"
          sx={{ p: "2px 4px", display: "flex", alignItems: "center" }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search..."
            inputProps={{ "aria-label": "" }}
            className="invoices__input"
            value={searchdata}
            onChange={(e) => setsearchdata(e.target.value)}
          />
          <IconButton
            type="submit"
            sx={{ p: "10px" }}
            aria-label="search"
            onClick={(e) => searchHandler(e)}
          >
            <Search />
          </IconButton>
        </Paper>
      </div>
      {isOrders && (
        <>
          <div className="invoices__buttons">
            {ordertype.map((data, i) => (
              <p
                className={`ordertypes ${type === i && "ordertype__selected"} 
                  ${
                    orderTypeColor === 1 && data.name === "All Invoices"
                      ? "ordertype__selected"
                      : null
                  }
                  `}
                key={i}
                onClick={() => {
                  selectorder(i);
                  setsearchdata("");
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
            className="invoices__table"
          />
          {tableData?.length > 0 ? (
            <Pagination
              PaginateData={PaginateDataSplit}
              DataList={tableData}
              PagePerRow={50}
            />
          ) : (
            ""
          )}
          <div className="invoices__footer">
            <div className="invoices__container">
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
      )}
      {isVieworders && (
        <Vieworders
          setisVieworders={setisVieworders}
          setisOrders={setisOrders}
        />
      )}
    </div>
  );
}

export default Index;
