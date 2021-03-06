import React, { useState, useEffect } from "react";
import MUITable from "../../../Components/Common/MUITable";
import { Button, Paper, InputBase, IconButton } from "@mui/material";
import { ArrowBackIosNew, Search } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Pagination from "../../Pagination";
import "./styles.scss";
import axios from "axios";
import Constant from "../../../Constant";
import { useStateValue } from "../../../store/state";
import WantToBuy from "./wantToBuyForm";
import QuoteReceivedGrid from "./QuoteRecievedGrid";
import { SessionExpiredLogout } from "../../../utilities";

function Index() {
  // const [tableData, setTableData] = useState([]);
  const [apiTableData, setApiTableData] = useState([]);
  const [direct, setdirect] = useState([]);
  const [filtereddirect, setfiltereddirect] = useState([]);
  const [searchdata, setsearchdata] = useState("");
  const [isNotMatched, setisNotMatched] = useState(false);
  const [{ geo, customnostore, generalTrigger }, dispatch] = useStateValue();
  const [isVieworders, setisVieworders] = useState(false);
  const Navigate = useNavigate();
  const [isViewQuoteReceived, setIsViewQuoteReceived] = useState({
    id: "",
    activeState: false,
  });
  const orders = () => {
    setisVieworders(true);
    setisOrders(false);
  };
  useEffect(() => {
    setfiltereddirect(apiTableData);
  }, [apiTableData]);

  const searchHandler = (e) => {
    e.preventDefault();
    setsearchdata("");

    if (apiTableData?.length === 0) return;
    if (searchdata === "") {
      setfiltereddirect(apiTableData);
    } else {
      let temp = apiTableData?.filter((td) =>
        td?.texub_wtb_id?.toLowerCase()?.includes(searchdata?.toLowerCase())
      );
      setfiltereddirect(temp);
    }
    setisNotMatched(!isNotMatched);
  };
  useEffect(() => {
    if (filtereddirect.length === 0) {
      setdirect([]);
    }
  }, [isNotMatched]);

  const quoteReceived = (value) => {
    setIsViewQuoteReceived((prev) => ({
      ...prev,
      id: value,
      activeState: true,
    }));
    setisVieworders(false);
    setisOrders(false);
  };
  const [isOrders, setisOrders] = useState(true);

  const options = {
    filter: false,
    filterType: "dropdown",
    responsive: "vertical",
    pagination: false,
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
  useEffect(() => {
    const fetchTableData = async () => {
      setApiTableData([]);
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
        dispatch({
          type: "SET_IS_LOADING",
          value: false,
        });
        if (e.response.status === 401) {
          SessionExpiredLogout();
        }
      }
    };
    fetchTableData();
  }, [generalTrigger]);
  const PaginateDataSplit = (event) => {
    if (apiTableData?.length === 0) return setdirect([]);
    setdirect(event);
  };
  const columns = [
    {
      name: "texub_wtb_id",
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
          return <div className="want_tobuy__category">{value}</div>;
        },
      },
    },
    {
      name: "quantity",
      label: "QUANTITY",
      options: {
        customBodyRender: (value) => {
          return <div className="want_tobuy__quantity">{value}</div>;
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
                    ${value === "Assigned" && "want_tobuy__confirm"}
                    ${value === "Accepted" && "want_tobuy__delivered"}
                    ${value === "Approved" && "want_tobuy__approved"}
                    ${value === "Rejected" && "want_tobuy__dispatched"}
                    `}
            >
              {value}
            </div>
          );
        },
      },
    },
    {
      name: "active_sellers",
      label: "ACTIVE SELERS",
      options: {
        customBodyRender: (value) => {
          return <div className="want_tobuy__quantity">{value}</div>;
        },
      },
    },
    {
      name: "quote_submitted",
      label: "QUOTE RECEIVED",
      options: {
        customBodyRender: (value, tablemeta) => {
          return (
            <div
              className="want_tobuy__action"
              onClick={() => quoteReceived(tablemeta?.rowData[7])}
            >
              {value}
            </div>
          );
        },
      },
    },
    {
      name: "wtb_id",
      label: " ",
      options: {
        display: false,
      },
    },
  ];
  const handleNavigate = () => {
    Navigate(
      `/${
        customnostore ? customnostore : geo?.country_name
      }/buyerdashboard/dashboard`
    );
  };
  return (
    <div className="want_tobuy">
      {isViewQuoteReceived?.activeState || isVieworders ? (
        ""
      ) : (
        <div className="want_tobuy__search">
          <Paper
            className="want_tobuy__searchinput"
            component="form"
            sx={{ p: "2px 4px", display: "flex", alignItems: "center" }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search..."
              inputProps={{ "aria-label": "" }}
              className="want_tobuy__input"
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

          <Button
            className="button-text btn-secondary"
            onClick={() => orders()}
          >
            Want To Buy
          </Button>
        </div>
      )}
      {isOrders && (
        <>
          <MUITable
            columns={columns}
            table={direct?.length ? direct : []}
            options={options}
            className="want_tobuy__table"
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
          <div className="want_tobuy__footer">
            <div className="want_tobuy__container">
              <p onClick={() => handleNavigate()}>
                <ArrowBackIosNew />
                <span>Back</span>
              </p>
            </div>
          </div>
        </>
      )}

      {isVieworders && (
        <WantToBuy
          setisVieworders={setisVieworders}
          setisOrders={setisOrders}
        />
      )}
      {isViewQuoteReceived?.activeState && (
        <>
          <QuoteReceivedGrid id={isViewQuoteReceived?.id} />
          <div className="want_tobuy__footer">
            <div className="want_tobuy__container">
              <p
                onClick={() => {
                  setIsViewQuoteReceived({ activeState: false });
                  setisOrders(true);
                }}
              >
                <ArrowBackIosNew />
                <span>Back</span>
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Index;
