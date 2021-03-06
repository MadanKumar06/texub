import React, { useState, useEffect } from "react";
import "./styles.scss";
import MUITable from "../../../Components/Common/MUITable";

import NodataFound from "../../../Assets/CommonImage/NodataFound.webp.png";

const PendingInvoiceTable = ({ pendingInvoiceList }) => {
  const [is_table_quantity, setIs_table_quantity] = useState([]);
  useEffect(() => {
    setIs_table_quantity(pendingInvoiceList);
  }, [pendingInvoiceList]);
  const columns = [
    {
      name: "seller_id",
      label: "SELLER ID",
      options: {
        customBodyRender: (value) => {
          return (
            <div className="pending_invoice_table_seller_id">
              <span>{value}</span>
            </div>
          );
        },
      },
    },
    {
      name: "brand",
      label: "PRODUCTS",
      options: {
        customBodyRender: (value, tablemeta) => {
          let eta = tablemeta?.rowData[8];
          let description = tablemeta?.rowData[7];
          let productname = tablemeta?.rowData[6];
          let brandName = tablemeta?.rowData[8];
          return (
            <div className="pending_invoice_product_main">
              <div className="pending_invoice_product_sub_block">
                <div className="img_block">
                  <div className="brand_image">
                    {value ? (
                      <img src={value} alt="" />
                    ) : (
                      <span>{brandName}</span>
                    )}
                  </div>
                </div>
                <div className="pending_invoice_right_section">
                  <div className="pending_invoice_right_section_block">
                    <p className="pending_invoice_product_name">
                      {productname}
                    </p>
                    <span className="pending_invoice_product_eta">
                      ETA: {eta}
                    </span>
                  </div>

                  <p className="pending_invoice_product_description">
                    {description}
                  </p>
                </div>
              </div>
            </div>
          );
        },
      },
    },
    {
      name: "hub",
      label: "HUB",
      options: {
        customBodyRender: (value) => {
          return (
            <div className="pending_invoice_table_hub_block">
              <span>{value}</span>
            </div>
          );
        },
      },
    },
    {
      name: "price",
      label: "PRICE",
      options: {
        customBodyRender: (value) => {
          return (
            <div className="pending_invoice_table_price_block">
              <div className="pending_invoice_table_price">
                <span>
                  {" "}
                  {JSON.parse(localStorage.getItem("currency"))?.currency_code}
                </span>
                {value}
                <span>/unit</span>
              </div>
            </div>
          );
        },
      },
    },
    {
      name: "qty",
      label: "QUANTITY",
      options: {
        customBodyRender: (value, tablemeta) => {
          return (
            <div className="pending_invoice_table_quantity">
              <span className="pending_invoice_quantity_subblock">{value}</span>
            </div>
          );
        },
      },
    },
    {
      name: "row_total",
      label: "SUBTOTAL",
      options: {
        customBodyRender: (value) => {
          return (
            <div className="pending_invoice_table_subtotal_block">
              <div className="pending_invoice_table_subtotal">
                <span>
                  {" "}
                  {JSON.parse(localStorage.getItem("currency"))?.currency_code}
                </span>
                {value}
              </div>
            </div>
          );
        },
      },
    },
    {
      name: "product_name",
      label: " ",
      options: {
        display: false,
        customBodyRender: (value) => {
          return value;
        },
      },
    },
    {
      name: "description",
      label: "",
      options: {
        display: false,
        customBodyRender: (value) => {
          return value;
        },
      },
    },
    {
      name: "eta",
      label: " ",
      options: {
        display: false,
        customBodyRender: (value) => {
          return value;
        },
      },
    },
    {
      name: "brand_name",
      label: " ",
      options: {
        display: false,
        customBodyRender: (value) => {
          return value;
        },
      },
    },
  ];
  const options = {
    filter: true,
    filterType: "dropdown",
    responsive: "vertical",
    selectableRows: "none",
    download: false,
    pagination: false,
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

  return (
    <div className="pending_invoice_table_main_container">
      {is_table_quantity?.length &&
        is_table_quantity?.map((itm) => (
          <MUITable
            columns={columns}
            table={itm?.invoice_items}
            options={options}
            className="pending_invoice_table_mui_datatable_main"
          />
        ))}
    </div>
  );
};

export default PendingInvoiceTable;
