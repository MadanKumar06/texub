import React, { useState, useEffect } from "react";
import "./styles.scss";
import MUITable from "../../Common/MUITable";
import { Link } from "react-router-dom";
import Pagination from "../../Pagination";
import { ArrowBackIosNew } from "@mui/icons-material";
import axios from "axios";
import Constant from "../../../Constant";
// import Vieworders from '../../Common/Vieworders'
import { useStateValue } from "../../../store/state";
function Index() {
  const [tableData, setTableData] = useState([]);
  const PaginateDataSplit = (event) => {
    if (apiTableData?.length === 0) return setApiTableData([]);
    setTableData(event);
  };
  const [{}, dispatch] = useStateValue();
  const [apiTableData, setApiTableData] = useState([]);
  useEffect(() => {
    const fetchTableData = async () => {
      dispatch({
        type: "SET_IS_LOADING",
        value: true,
      });
      let sellerCode = JSON.parse(localStorage.getItem("userdata"))
        ?.custom_attributes?.[7]?.value;
      try {
        const tabledata = await axios({
          method: "post",
          url: `${Constant.baseUrl()}/getSellerData`,
          data: {
            sellercode: sellerCode,
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
      name: "product_name",
      label: "Product Name",
      options: {
        customBodyRender: (value) => {
          return <div className="orders__code">{value}</div>;
        },
      },
    },

    {
      name: "price",
      label: "Price",
      options: {
        customBodyRender: (value) => {
          return (
            <div className="orders__ordertotal">
              {/* <span className="label">INR</span> */}
              <span className="value">{value}</span>
            </div>
          );
        },
      },
    },
    {
      name: "lowest_price",
      label: "Lowest Price",
      options: {
        customBodyRender: (value) => {
          return (
            <div className="orders__ordertotal">
              {/* <span className="label">INR</span> */}
              <span className="value">{value}</span>
            </div>
          );
        },
      },
    },
    {
      name: "rank",
      label: "Rank",
      options: {
        customBodyRender: (value) => {
          return <div className="orders__buyercode">{value}</div>;
        },
      },
    },
  ];

  return (
    <div className="orders">
      <div className="orders__back__footer">
        <div className="orders__back__container">
          <Link to="/buyerdashboard/dashboard">
            <ArrowBackIosNew />
            <span>Back</span>
          </Link>
        </div>
      </div>
      <MUITable
        columns={columns}
        table={tableData?.length ? tableData : []}
        options={options}
        className="orders__table"
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
