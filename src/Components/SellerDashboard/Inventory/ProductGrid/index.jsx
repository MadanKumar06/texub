import React, { useState } from "react";
import "./styles.scss";
import MUITable from "../../../Common/MUITable";
import Pagination from "../../../Pagination";
import NodataFound from "../../../../Assets/CommonImage/NodataFound.webp.png";

function Index({ registerproduct, gridData }) {
  const [tableData, setTableData] = useState([]);
  const options = {
    filter: false,
    filterType: "dropdown",
    responsive: "vertical",
    selectableRows: "none",
    download: false,
    print: false,
    pagination: false,
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
  const columns = [
    {
      name: "brand_image_url",
      label: " ",
      options: {
        customBodyRender: (value, tablemeta) => {
          let brandName = tablemeta?.rowData[7];
          return (
            <div className="brand_image">
               {value ? (
                <img
                  src={value}
                  className="brand_img_section"
                  alt="No Brands"
                  style={{ height: "50px" }}
                />
              ) : (
                <span>{brandName}</span>
              )}
            </div>
          );
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
      name: "category",
      label: "CATEGORY",
    },
    {
      name: "sku",
      label: "SKU",
    },
    {
      name: "product_id",
      label: "ACTION",
      options: {
        customBodyRender: (value, tablemeta) => {
          var already_assigned = tablemeta?.rowData[5];
          var product_id = tablemeta?.rowData[6];
          return (
            <>
              {already_assigned == 1 ? (
                <div
                  className="productGrid__action"
                  onClick={() => registerproduct("updateproduct", product_id)}
                >
                  Update
                </div>
              ) : (
                <div
                  className="productGrid__action"
                  onClick={() => registerproduct("addproduct", value, "addNew")}
                >
                  Sell Yours
                </div>
              )}
            </>
          );
        },
      },
    },
    {
      name: "already_assigned",
      label: " ",
      options: {
        display: false,
      },
    },
    {
      name: "product_id",
      label: " ",
      options: {
        display: false,
      },
    },
    {
      name: "brand_name",
      label: " ",
      options: {
        display: false,
      },
    },
  ];
  const PaginateDataSplit = (event) => {
    if (event?.length === 0) return setTableData([]);
    setTableData(event);
  };

  return (
    <div className="productGrid_inventory">
      <MUITable
        columns={columns}
        table={tableData?.length ? tableData : []}
        options={options}
        className="productGrid__table"
      />

      {gridData?.length > 0 ? (
        <Pagination
          PaginateData={PaginateDataSplit}
          DataList={gridData?.length ? gridData : []}
          PagePerRow={10}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default Index;
