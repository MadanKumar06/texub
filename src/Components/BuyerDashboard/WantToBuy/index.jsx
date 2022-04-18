import React, { useState, useEffect } from "react";
import MUITable from "../../../Components/Common/MUITable";
import { Button } from "@mui/material";
import { ArrowBackIosNew } from "@mui/icons-material";
import { Link } from "react-router-dom";
import Pagination from "../../Pagination";
import "./styles.scss";
import axios from "axios";
import Constant from "../../../Constant";
// import Vieworders from '../../Common/Vieworders'
import { useStateValue } from "../../../store/state";
import WantToBuy from "./wantToBuyForm";

function Index() {
  const [tableData, setTableData] = useState([]);
  const [apiTableData, setApiTableData] = useState([]);
  const [{}, dispatch] = useStateValue();
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
  useEffect(() => {
    const fetchTableData = async () => {
      dispatch({
        type: "SET_IS_LOADING",
        value: true,
      });
      let customerId = JSON.parse(localStorage.getItem("userdata"));
      try {
        const tabledata = await axios({
          method: "post",
          url: `${Constant.baseUrl()}/wtbBuyerList`,
          data: {
            buyer_id: customerId?.id,
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
  const PaginateDataSplit = (event) => {
    if (apiTableData?.length === 0) return setApiTableData([]);
    setTableData(event);
  };
  const columns = [
    {
      name: "buyer_code",
      label: "WTB REFERENCE NO.",
      options: {
        customBodyRender: (value) => {
          return <div className="want_tobuy__orderid">{value}</div>;
        },
      },
    },
    { name: "sku", label: "PART NUMBER" },
    {
      name: "main_category_id",
      label: "CATEGORY",
      options: {
        customBodyRender: (value) => {
          return <div className="want_tobuy__sellercode">{value}</div>;
        },
      },
    },
    {
      name: "quantity",
      label: "QUANTITY",
      options: {
        customBodyRender: (value) => {
          return <div className="want_tobuy__sellercode">{value}</div>;
        },
      },
    },
    {
      name: "wtb_status",
      label: "STATUS",
      options: {
        customBodyRender: (value) => {
          return (
            <div
              className={`
                    ${value === "Pending" && "want_tobuy__pending"}
                    ${value === "Confirm" && "want_tobuy__confirm"}
                    ${value === "Delivered" && "want_tobuy__delivered"}
                    ${value === "Dispatched" && "want_tobuy__dispatched"}
                    `}
            >
              {value}
            </div>
          );
        },
      },
    },
    {
      name: "status",
      label: "ACTIVE SELERS",
      options: {
        customBodyRender: (value) => {
          return (
            <div
              className={`
                    ${value === "Pending" && "want_tobuy__pending"}
                    ${value === "Confirm" && "want_tobuy__confirm"}
                    ${value === "Delivered" && "want_tobuy__delivered"}
                    ${value === "Dispatched" && "want_tobuy__dispatched"}
                    `}
            >
              {value}
            </div>
          );
        },
      },
    },
    {
      name: "QUOTE RECEIVED",
      label: "QUOTE RECEIVED",
      options: {
        customBodyRender: (value) => {
          return (
            <div className="want_tobuy__action" onClick={orders}>
              {value}
            </div>
          );
        },
      },
    },
  ];

  return (
    <div className="want_tobuy">
      <div className="want_tobuy__footer">
        <div className="want_tobuy__container">
          <Link to="/buyerdashboard/dashboard">
            <ArrowBackIosNew />
            <span>Back</span>
          </Link>
          <Button
            className="button-text btn-secondary"
            onClick={() => orders()}
          >
            Want To Buy
          </Button>
        </div>
      </div>
      {isOrders && (
        <>
          <MUITable
            columns={columns}
            table={tableData}
            options={options}
            className="want_tobuy__table"
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
        </>
      )}
      {isVieworders && <WantToBuy />}
    </div>
  );
}

export default Index;
