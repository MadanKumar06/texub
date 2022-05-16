import React, { useState, useEffect } from "react";
import "./styles.scss";
import MUITable from "../../Common/MUITable";
import { Link } from "react-router-dom";
import { ArrowBackIosNew, ClosedCaptionDisabledOutlined } from "@mui/icons-material";
import Enquirydetails from "../../SellerDashboard/Directenqueries/Enquirydetails";
import NodataFound from "../../../Assets/CommonImage/NodataFound.webp.png";

import axios from "axios";
import Constant from "../../../Constant";
import { useStateValue } from "../../../store/state";
import Pagination from "../../Pagination";

const Index = ({ searchdata, searchupdate }) => {
  const [isUopup, setisUopup] = useState(false);
  const [direct, setdirect] = useState([]);
  const [filtereddirect, setfiltereddirect] = useState([])
 // const [tableData, setTableData] = useState([]);
  const [refreshdata, setrefreshdata] = useState(false)
  const [{geo, customstore, customnostore}, dispatch] = useStateValue();
  const PaginateDataSplit = (event) => {
    if (directList?.length === 0) return setdirect([]);
      setdirect(event);
    };
  // const PaginateDataSplit = (event) => {
  //   setTableData(event);
  // };
  const [directList, setdirectList] = useState([])

    useEffect(() => {
    if(directList?.length === 0) return
    if(searchdata === '') {
      setfiltereddirect(directList)
    } else {
      let temp = directList?.filter(td => td?.texub_wtb_id?.toLowerCase()?.includes(searchdata?.toLowerCase()))
      setfiltereddirect(temp)
    }
  }, [searchupdate, directList])


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
      setdirectList(ddlist?.data);
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

  useEffect(() => {
    settype(0)
  }, [])

  useEffect(() => {
    localStorage.setItem("enquirypage", JSON.stringify(1));
    if (type === 0) {
      setfiltereddirect(directList)
    }
    if (type === 1) {
      const pending = directList?.filter(d => d?.seller_enquiry_status === "Open")      
      if(pending) {
        setfiltereddirect(pending)
      } else {
        setdirect([])
      }
    }
    if (type === 2) {
      const accepted = directList?.filter(d => d?.seller_enquiry_status === "Accepted")
      if(accepted) {
        setfiltereddirect(accepted)
      } else {
        setdirect([])
      }
    }
    if (type === 3) {
      debugger
      const declined = directList?.filter(d => d?.seller_enquiry_status === "Declined")
      if(declined?.length) {
        setfiltereddirect(declined)
      } else {
        setdirect([])
      }
    }
  }, [type])

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
            <img src={NodataFound} alt="No data Found" />
            <p>No data Found...</p>
          </div>
        ),
      },
    },
  };

  const columns = [
    {
      name: "texub_wtb_id",
      label: "Enq. No.",
      options: {
        customBodyRender: (value) => {
          return <div className="directenquiries__order_id enq_id">{value}</div>;
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

  console.log(direct?.length)

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
          table={direct?.length ? direct : []}
          options={options}
          className="directenquiries__table"
        />
      
      {filtereddirect?.length &&
        <Pagination
          PaginateData={PaginateDataSplit}
          DataList={filtereddirect}
          PagePerRow={10}
        />
      }
      {isUopup && (
        <Enquirydetails closePOPup={setisUopup} popid={popid} direct={directList} setrefreshdata={setrefreshdata} refreshdata={refreshdata} />
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
