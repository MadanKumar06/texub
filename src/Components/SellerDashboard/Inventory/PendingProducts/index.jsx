import React, { useState, useEffect } from "react";
import "./styles.scss";
import MUITable from "../../../Common/MUITable";
import hp from "../../../../Assets/sellerdashboard/inventory/hp.png";
import Pagination from "../../../Pagination";
import axios from "axios";
import Constant from "../../../../Constant";

function Index({ registerproduct }) {
  const [tableData, setTableData] = useState([]);
  const [apiTableData, setApiTableData] = useState([]);
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
      } catch (e) {
        console.log(e);
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
          return <img src={value} alt="" />;
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
    <div className="productGrid_inventory">
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
    </div>
  );
}

export default Index;
