import React, { useState, useEffect } from "react";
import "./styles.scss";
import MUITable from "../../Common/MUITable";
import { Link } from "react-router-dom";
import { ArrowBackIosNew } from "@mui/icons-material";
import Enquirydetails from "../../SellerDashboard/Directenqueries/Enquirydetails";
import axios from "axios";
import Constant from "../../../Constant";
import { useStateValue } from "../../../store/state";

const Index = () => {
  const [isUopup, setisUopup] = useState(false);
  const [direct, setdirect] = useState([]);
  const [refreshdata, setrefreshdata] = useState(false)
  const [{geo, customstore, customnostore}, dispatch] = useStateValue();

  useEffect(async () => {
    let user = JSON.parse(localStorage.getItem("userdata"));
    try {
      dispatch({
        type: "SET_IS_LOADING",
        value: true,
      });
      const ddlist = await axios({
        method: "post",
        url: `${Constant.baseUrl()}/wtbSellerList`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: {
          seller_id: user?.id,
        },
      });
      setdirect(ddlist?.data);
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
  }, [refreshdata]);

  const [popid, setpopid] = useState();
  const Popup = (value) => {
    setisUopup(true);
    setpopid(value);
  };

  const ordertype = [
    { name: "All Enquiries" },
    { name: "Pending Enquiries" },
    { name: "Accepted Enquiries" },
    { name: "Declined Enquiries" },
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

  const columns = [
    {
      name: "texub_wtb_id",
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
    {
      name: "sku",
      label: "Part No.",
      options: {
        customBodyRender: (value) => {
          return <div className="directenquiries__order_id">{value}</div>;
        },
      },
    },
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
      name: "hub_id",
      label: "Hub",
    },
    {
      name: "seller_enquiry_status",
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
                  : value === "Declined" && "directenquiries__pending"
              } `}
            >
              {value}
            </div>
          );
        },
      },
    },
    {
      name: "wtb_id",
      label: "Action",
      options: {
        customBodyRender: (value, tablemeta) => {
          let status = tablemeta?.rowData?.[6]
          return (
            <div className="actions" onClick={() => Popup(value)}>
              {status === 'Accepted' ? <span className="value">Update</span> : <span className="value">View Details</span>}
            </div>
          );
        },
      },
    },
  ];

  return (
    <div className="directenquiries_container">
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
      {isUopup && (
        <Enquirydetails closePOPup={setisUopup} popid={popid} direct={direct} setrefreshdata={setrefreshdata} refreshdata={refreshdata} />
      )}
      <div className="directenquiries__footer">
        <div className="directenquiries__container">
          <Link to={`/${customnostore ? customnostore : geo?.country_name}/sellerdashboard/dashboard`}>
            <ArrowBackIosNew />
            <span>Back</span>
          </Link>
          {/* <Button className="rma_btn">Request RMA</Button> */}
        </div>
      </div>
    </div>
  );
};

export default Index;
