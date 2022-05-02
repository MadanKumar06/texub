import React, { useState, useEffect } from "react";
import MUITable from "../../../Components/Common/MUITable";
import { ArrowBackIosNew } from "@mui/icons-material";
import { Link } from "react-router-dom";
import Pagination from "../../Pagination";
import "./styles.scss";
import Vieworders from "../../Common/Vieworders";
import transaction_type from "../../../Assets/buyerdashboard/InvoicesList/paypal (1).png";
import transaction_type1 from "../../../Assets/buyerdashboard/InvoicesList/braintree-logo-black.png";
import { useStateValue } from "../../../store/state";
import axios from "axios";
import Constant from "../../../Constant";
import moment from 'moment'
function Index() {
  const [tableData, setTableData] = useState([]);
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
    selectorder(0);
  }, []);

  const PaginateDataSplit = (event) => {
    if (invoicelist?.length === 0) return setTableData([]);
    setTableData(event);
  };

  const [isVieworders, setisVieworders] = useState(false);
  const orders = () => {
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
  };

  const [invoicelist, setinvoicelist] = useState()

  useEffect(async() => {
    const user = JSON.parse(localStorage.getItem('userdata'))
    try {
      const invoice = await axios({
        method: 'post',
        url: `${Constant?.baseUrl()}/listPendingInvoices`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        data: {
          customer_id: user?.id
        }
      })
      setinvoicelist(invoice?.data)
    } catch(e) {
      console.log(e)
    }
  }, [])

  const table = [
    {
      invoiceno: "00000022",
      date: "08/05/21",
      sellerid: "INDS2013",
      hub: "Mumbai",
      amount: "30,427,563",
      transactionmode: transaction_type,
      status: "Pending",
      action: "View Details",
    },
    {
      invoiceno: "00000034",
      date: "28/09/21",
      sellerid: "INDS2019",
      hub: "New Delhi",
      amount: "42,427,563",
      transactionmode: transaction_type1,
      status: "Pending",
      action: "View Details",
    },
    {
      invoiceno: "00000045",
      date: "26/02/21",
      sellerid: "SINS20537",
      hub: "Singapore",
      amount: "23,427,563",
      transactionmode: transaction_type,
      status: "Paid",
      action: "View Details",
    },
    {
      invoiceno: "00000065",
      date: "26/04/21",
      sellerid: "UAES2517",
      hub: "Dubai",
      amount: "3,427,563",
      transactionmode: transaction_type1,
      status: "Paid",
      action: "View Details",
    },
  ];

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
    { name: "created_at", label: "Date",
    options: {
      customBodyRender: (value) => {
        return (
          <div className="invoices__amount">
            {moment(value).format("DD/MM/YYYY")}
          </div>
        );
      },
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
        customBodyRender: (value) => {
          return (
            <div className="invoices__amount">
              <span className="currency">INR </span>
              <span className="price">{parseFloat(value).toFixed(2)}</span>
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
            <Link to={`/${customnostore ? customnostore : geo?.country_name}/pendinginvoice/${value}`}>
              <div className="invoices__action">
                View Details
              </div>
            </Link>
          );
        },
      },
    },
  ];

  return (
    <div className="invoices_main">
      {isOrders && (
        <>
          <div className="invoices__buttons">
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
            className="invoices__table"
          />
          {invoicelist?.length > 0 ?
          <Pagination
            PaginateData={PaginateDataSplit}
            DataList={invoicelist?.length ? invoicelist : []}
            PagePerRow={10}
          />
          :
            ""
          }
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
