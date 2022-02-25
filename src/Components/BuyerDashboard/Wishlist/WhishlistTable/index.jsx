import React from "react";
import "./styles.scss";

import MUIDataTable from "mui-datatables";

const WhislistTable = ({ tableData }) => {
  debugger;

  const columns = [
    {
      name: "order",
      label: "Order ID",
      options: {
        customBodyRender: (value) => {
          return <div className="rma__order_id">{value}</div>;
        },
      },
    },
    { name: "date", label: "Order Date" },
    { name: "date", label: "Return Req. Date" },
    {
      name: "product_details",
      label: "Product Details",
      options: {
        customBodyRender: (value) => {
          return (
            <div className="rma_products">
              <div className="rma_product_warranty">
                Warranty : {value?.warranty}
              </div>
              <div className="rma_product_name">{value?.name}</div>
            </div>
          );
        },
      },
    },
    {
      name: "seller_id",
      label: "Seller ID",
    },
    {
      name: "return_quantity",
      label: "Return Qty",
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
      name: "status",
      label: "Status",
      options: {
        customBodyRender: (value) => {
          return (
            <div
              className={`${
                value === "Completed"
                  ? "rma__completed"
                  : value === "Accepted"
                  ? "rma__accepted"
                  : value === "Rejected"
                  ? "rma__rejected"
                  : value === "Pending" && "rma__pending"
              } `}
            >
              {value}
            </div>
          );
        },
      },
    },
  ];
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
  return (
    <div className="wishlist_table_container">
      <MUIDataTable
        title={""}
        data={tableData}
        columns={columns}
        options={options}
        className="wishlist__table"
      />
    </div>
  );
};

export default WhislistTable;
