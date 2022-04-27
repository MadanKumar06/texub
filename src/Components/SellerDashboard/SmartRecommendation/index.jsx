import React, { useState, useEffect } from "react";
import "./styles.scss";
import MUITable from "../../Common/MUITable";
import { Link } from "react-router-dom";
import Pagination from "../../Pagination";
import { ArrowBackIosNew } from "@mui/icons-material";
import axios from "axios";
import Constant, { imageBaseUrl } from "../../../Constant";
// import Vieworders from '../../Common/Vieworders'
import { useStateValue } from "../../../store/state";
import { IconButton } from "@mui/material";
import { Search } from "@mui/icons-material";
import { TextField, InputAdornment } from "@mui/material";
function Index() {
  const [tableData, setTableData] = useState([]);
  const PaginateDataSplit = (event) => {
    if (apiTableData?.length === 0) return setApiTableData([]);
    setTableData(event);
  };
  const [{ geo, customstore, customnostore }, dispatch] = useStateValue();
  const [apiTableData, setApiTableData] = useState([]);
  useEffect(() => {
    const fetchTableData = async () => {
      dispatch({
        type: "SET_IS_LOADING",
        value: true,
      });

      let sellerCode = JSON.parse(
        localStorage.getItem("userdata")
      )?.custom_attributes?.filter(
        (itm) => itm?.attribute_code === "customer_code"
      );
      try {
        const tabledata = await axios({
          method: "post",
          url: `${Constant.baseUrl()}/getSellerData`,
          data: {
            sellercode: sellerCode?.[0]?.value,
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
      name: "product_brand_image",
      label: " ",
      options: {
        customBodyRender: (value) => {
          return (
            <div className="smart_icon">
              <img src={value} alt="" className="icon" />
            </div>
          );
        },
      },
    },
    {
      name: "product_name",
      label: "PRODUCT NAME",
      options: {
        customBodyRender: (value) => {
          return <div className="smart__productname">{value}</div>;
        },
      },
    },
    {
      name: "product_description",
      label: "PRODUCT DESCRIPTION",
      options: {
        customBodyRender: (value) => {
          return <div className="smart__productname">{value}</div>;
        },
      },
    },
    {
      name: "price",
      label: "MY PRICE",
      options: {
        customBodyRender: (value, tablemeta) => {
          let currency = tablemeta?.rowData[6];
          return (
            <div className="smart_price">
              <span className="label">{currency}</span>
              <span className="value">{value}</span>
            </div>
          );
        },
      },
    },
    {
      name: "seller_rank",
      label: "RANK",
      options: {
        customBodyRender: (value) => {
          return (
            <div className="smart_rank">
              {value}
              <span className="smart_rank_th">th</span>
            </div>
          );
        },
      },
    },
    {
      name: "lowest_price",
      label: "LOWEST PRICE",
      options: {
        customBodyRender: (value, tablemeta) => {
          let currency = tablemeta?.rowData[6];
          return (
            <div className="smart_price">
              <span className="label">{currency}</span>
              <span className="value">{value}</span>
            </div>
          );
        },
      },
    },
    {
      name: "product_currency",
      label: "",
      options: {
        display: false,
      },
    },
  ];
  return (
    <div className="smart_main">
      <div className="smart__back__footer">
        <div className="smart__back__container">
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
      <div className="smart__search">
        <TextField
          placeholder="Search…"
          variant="outlined"
          name="search_product"
          className="search_input"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton
                  type="submit"
                  className="smart_searchicon"
                  sx={{ p: "10px" }}
                  aria-label="search"
                >
                  <Search className="search_icon"></Search>
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>
      <MUITable
        columns={columns}
        table={tableData?.length ? tableData : []}
        options={options}
        className="smart__table"
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
    </div>
  );
}

export default Index;
