import React, { useState, useEffect } from "react";
import "./styles.scss";
import MUITable from "../../Common/MUITable";
import { Link } from "react-router-dom";
import Pagination from "../../Pagination";
import { ArrowBackIosNew, Search } from "@mui/icons-material";
import axios from "axios";
import Constant from "../../../Constant";
import { useStateValue } from "../../../store/state";
import { TextField, InputAdornment, IconButton } from "@mui/material";

const Index = ({ searchdata, searchupdate }) => {
  const [tableData, setTableData] = useState([]);
  const [{ geo, customnostore }, dispatch] = useStateValue();
  const [apiTableData, setApiTableData] = useState([]);
  const [filteredata, setfiltereddata] = useState([])

  useEffect(() => {
    if(apiTableData?.length === 0) return
    if(searchdata === '') {
      setfiltereddata(apiTableData)
    } else {
      let temp = apiTableData?.filter(td => td?.product_name?.toLowerCase()?.includes(searchdata?.toLowerCase()))
      setfiltereddata(temp)
    }
  }, [searchupdate, apiTableData])
  console.log(filteredata)

  const PaginateDataSplit = (event) => {
    debugger
    if (filteredata?.length === 0) return setfiltereddata([]);
    setTableData(event);
  };
  console.log(tableData)

  function formatToCurrency(price) {
    return price.toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ",");
  }

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
            <div className="brand_image">
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
         return <div className="smart__productname">
                  <span className="smart_description">{value}</span>
                </div>
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
              <span className="value">{formatToCurrency(parseInt(value))}</span>
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
              <p>th</p>
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
              <span className="value">{formatToCurrency(parseInt(value))}</span>
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
      {tableData?.length ? 
        <MUITable
          columns={columns}
          table={tableData?.length ? tableData : []}
          options={options}
          className="smart__table"
        />
        : ""
      }
      {filteredata?.length > 0 ? (
        <Pagination
          PaginateData={PaginateDataSplit}
          DataList={filteredata?.length ? filteredata : []}
          PagePerRow={10}
        />
      ) : (
        ""
      )}
      <div className="smart__back__footer">
        <div className="smart__back__container">
          <Link
            to={`/${
              customnostore ? customnostore : geo?.country_name
            }/sellerdashboard/dashboard`}
          >
            <ArrowBackIosNew />
            <span>Back</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
