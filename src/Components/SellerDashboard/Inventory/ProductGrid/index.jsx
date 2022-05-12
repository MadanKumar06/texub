import React, { useState } from "react";
import "./styles.scss";
import MUITable from "../../../Common/MUITable";
import Pagination from "../../../Pagination";
function Index({ registerproduct, gridData }) {
  const [tableData, setTableData] = useState([]);
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

  console.log(gridData);
  console.log(tableData);
  const columns = [
    {
      name: "brand_image_url",
      label: " ",
      options: {
        customBodyRender: (value) => {
         return <div className="brand_image">
            <img src={value} alt="" />;
          </div>
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
        customBodyRender: (value) => {
          return (
            <div
              className="productGrid__action"
              onClick={() => registerproduct("addproduct", value, "addNew")}
            >
              Sell Yours
            </div>
          );
        },
      },
    },
  ];
  const PaginateDataSplit = (event) => {
    console.log(event);
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
