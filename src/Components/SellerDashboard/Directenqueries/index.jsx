import React, { useState, useEffect } from "react";
import "./styles.scss";
import MUITable from "../../Common/MUITable";
import { Link } from "react-router-dom";
import { ArrowBackIosNew } from "@mui/icons-material";
import Enquirydetails from "../../SellerDashboard/Directenqueries/Enquirydetails";
import axios from 'axios'
import Constant from '../../../Constant'
import { useStateValue } from "../../../store/state";

const Index = () => {
  const [isUopup, setisUopup] = useState(false);
  const [direct, setdirect] = useState([])
  const [{}, dispatch] = useStateValue()

  useEffect(async() => {
    let user = JSON.parse(localStorage.getItem('userdata'))
    try {
      dispatch({
        type: "SET_IS_LOADING",
        value: true,
      });
      const ddlist = await axios({
        method: 'post',
        url: `${Constant.baseUrl()}/wtbSellerList`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        data: {
          seller_id: user?.id
        }
      })
      setdirect(ddlist?.data)
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

  const Popup = () => {
    setisUopup(true);
  };
  const ordertype = [
    { name: "All Enquiries" },
    { name: "Open Enquiries " },
    { name: "Accepted Enquiries " },
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
    download: false,
    print: false,
    sort: false,
    viewColumns: false,
    search: false,
  };

  const table = [
    {
      enqno: "000000006",
      buyercode: "BU201201",
      partno: "RT-5700U",
      modelname: {
        name: "Lenovo Dpin Yoga..",
      },
      qty: "50",
      hub: "Mumbai",
      status: "Open",
      action: "View Details",
    },
    {
      enqno: "0000000021",
      buyercode: "BU201201",
      partno: "RT-5700U",
      modelname: {
        name: "Acer Sf314-42 Swift 3...",
      },
      qty: "34",
      hub: "Mumbai",
      status: "Accepted",
      action: "View Details",
    },
    {
      enqno: "0000000022",
      buyercode: "BU201201",
      partno: "RT-5700U",
      modelname: {
        name: "Apple Macbook Pro...",
      },
      qty: "25",
      hub: "Mumbai",
      status: "Closed",
      action: "View Details",
    },
    {
      enqno: "0000000023",
      buyercode: "BU201201",
      partno: "RT-5700U",
      modelname: {
        name: "Hp Business Laptop...",
      },
      qty: "20",
      hub: "Mumbai",
      status: "Accepted",
      action: "View Details",
    },
  ];

  const columns = [
    {
      name: "enquiry_id",
      label: "Enq. No.",
      options: {
        customBodyRender: (value) => {
          return <div className="directenquiries__order_id">{value}</div>;
        },
      },
    },
    {
      name: "buyer_code",
      label: "Buyer Code",
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
    { name: "partno", label: "Part No." },
    {
      name: "model_number",
      label: "Model Name/No.",
      options: {
        customBodyRender: (value) => {
          return (
            <div className="directenquiries_products">
              <div className="directenquiries_product_name">{value}</div>
            </div>
          );
        },
      },
    },
    {
      name: "quantity",
      label: "Qty.",
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
      name: "hub",
      label: "Hub",
    },
    {
      name: "wtb_status",
      label: "Status",
      options: {
        customBodyRender: (value) => {
          return (
            <div
              className={`${
                value === "Open"
                  ? "directenquiries__open"
                  : value === "Accepted"
                  ? "directenquiries__accepted"
                  : value === "Closed"
                  ? "directenquiries__closed"
                  : value === "Pending" && "directenquiries__pending"
              } `}
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
        customBodyRender: (value) => {
          return (
            <div className="actions" onClick={() => Popup()}>
              <span className="value">{value}</span>
            </div>
          );
        },
      },
    },
  ];

  return (
    <div className="directenquiries_container">
      <div className="directenquiries__footer">
        <div className="directenquiries__container">
          <Link to="/sellerdashboard/dashboard">
            <ArrowBackIosNew />
            <span>Back</span>
          </Link>
          {/* <Button className="rma_btn">Request RMA</Button> */}
        </div>
      </div>
      
      <div className="directenquiries__buttons">
        {ordertype.map((data, i) => (
          <div className="directenquiries__btton_content">
            <p
              className={`directenquiriestypes ${
                type === i && "directenquiries__selected"
              }`}
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
        table={direct}
        options={options}
        className="directenquiries__table"
      />
      {isUopup && <Enquirydetails closePOPup={setisUopup} />}
    </div>
  );
};

export default Index;
