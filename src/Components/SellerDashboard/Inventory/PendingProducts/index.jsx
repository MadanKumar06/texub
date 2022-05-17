import React, { useState, useEffect } from "react";
import "./styles.scss";
import MUITable from "../../../Common/MUITable";
import hp from "../../../../Assets/sellerdashboard/inventory/hp.png";
import Pagination from "../../../Pagination";
import axios from "axios";
import { useStateValue } from "../../../../store/state";
import Constant from "../../../../Constant";
import NodataFound from "../../../../Assets/CommonImage/NodataFound.webp.png";


import { ArrowBackIosNew } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function Index({ registerproduct }) {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState([]);
  const [apiTableData, setApiTableData] = useState([]);
  const [{}, dispatch] = useStateValue();
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
            {/* <img src={NodataFound} alt="No data Found" /> */}
            <p>No data Found...</p>
          </div>
        ),
      },
    },
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
          url: `${Constant.baseUrl()}/getSellerProduct`,
          data: {
            sellerData: {
              customer_id: customerId?.id,
            },
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setApiTableData(tabledata.data);
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
    };
    fetchTableData();
  }, []);

  const columns = [
    {
      name: "brand",
      label: " ",
      options: {
        customBodyRender: (value) => {
          return <img src={value} className="brand_img_section" alt="No Brands" style={{ height: "50px" }} />;
        },
      },
    },
    {
      name: "name",
      label: "PRODUCT NAME",
      options: {
        customBodyRender: (value) => {
          return <div className="product">{value} </div>;
        },
      },
    },
    {
      name: "category_name",
      label: "CATEGORY",
      options: {
        customBodyRender: (value) => {
          return <div className="product">{`${value}`} </div>;
        },
      },
    },
    {
      name: "sku",
      label: "SKU",
    },
    {
      name: "status",
      label: "Status",
      options: {
        customBodyRender: (value) => {
          return (
            <div className="productGrid__status">
              {value === "1" ? "Approved" : "Disapproved"}
            </div>
          );
        },
      },
    },
    {
      name: "action",
      label: "ACTION",
      options: {
        customBodyRender: (value, tablemeta) => {
          var data = tablemeta?.rowData[4];
          var product_id = tablemeta?.rowData[6];
          return (
            <div
              className="productGrid__action"
              onClick={() => registerproduct("updateproduct", product_id)}
            >
              {data === "1" ? "Update" : ""}
            </div>
          );
        },
      },
    },
    {
      name: "product_id",
      label: "SKU",
      options: {
        display: false,
      },
    },
  ];

  const PaginateDataSplit = (event) => {
    setTableData(event);
  };
  return (
    <div className="productGrid_inventory pending_product_grid">
      <MUITable
        columns={columns}
        table={tableData}
        options={options}
        className="productGrid__table"
      />

      {apiTableData?.length > 0 && (
        <Pagination
          PaginateData={PaginateDataSplit}
          DataList={apiTableData}
          PagePerRow={8}
        />
      )}
      <p className="pending_product_back" onClick={() => navigate(-1)}>
        <ArrowBackIosNew />
        <span>Back</span>
      </p>
    </div>
  );
}

export default Index;
