import React, { useState, useEffect } from "react";
import HP from "./../../../Assets/Productlist/hp_td_icon.png";
import Acer from "../../../Assets/Productlist/acer_icon_td.png";
import "./styles.scss";
import MUITable from '../../../Components/MUITable'

const PendingInvoiceTable = () => {
  const [is_table_quantity, setIs_table_quantity] = useState(0);
  useEffect(() => {
    setIs_table_quantity(Productstablelist);
  }, []);
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
      name: "products",
      label: "PRODUCTS",
      options: {
        customBodyRender: (value) => {
          return (
            <div className="pending_invoice_product_main">
              <div className="pending_invoice_product_sub_block">
                <div className="img_block">
                  <img src={value?.product_img} alt="" />
                </div>
                <div className="pending_invoice_right_section">
                  <div className="pending_invoice_right_section_block">
                    <p className="pending_invoice_product_name">
                      {value?.model_name}
                    </p>
                    <span className="pending_invoice_product_eta">
                      ETA: {value?.eta}
                    </span>
                  </div>

                  <p className="pending_invoice_product_description">
                    {value?.model_desc}
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
                <span>INR</span>
                {value}
                <span>/unit</span>
              </div>
            </div>
          );
        },
      },
    },
    {
      name: "quantity",
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
      name: "sub_total",
      label: "SUBTOTAL",
      options: {
        customBodyRender: (value) => {
          return (
            <div className="pending_invoice_table_subtotal_block">
              <div className="pending_invoice_table_subtotal">
                <span>INR</span>
                {value}
              </div>
            </div>
          );
        },
      },
    },
  ];

  const Productstablelist = [
    {
      id: 1,
      seller_id: "1135G7",
      products: {
        id: 11,
        eta: "3 days",
        model_name: "PAVILION MODEL14-DV0054TU",
        model_desc:
          "Hp 14-Dv0054Tu Pavilion Laptop (11Th Gen Intel Core I5-1135G7/…512Gb Sdd/Intel Iris Xe Graphics/Windows 10/Mso/Fhd), 35.56 Cm (14 Inch)",
        product_img: HP,
      },
      hub: "Dubai",
      price: "66,999 ",
      quantity: "100",
      sub_total: "4,019,943",
    },
    {
      id: 2,
      seller_id: "1235G7",
      products: {
        id: 22,
        eta: "5 days",
        model_name: "PAVILION MODEL14-DV0054TU",
        model_desc:
          "Hp 14-Dv0054Tu Pavilion Laptop (11Th Gen Intel Core I5-1135G7/…512Gb Sdd/Intel Iris Xe Graphics/Windows 10/Mso/Fhd), 35.56 Cm (14 Inch)",
        product_img: Acer,
      },
      hub: "Mumbai",
      price: "66,399 ",
      quantity: "120",
      sub_total: "4,019,940",
    },
  ];
  const options = {
    filter: true,
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
    <div className="pending_invoice_table_main_container">
      {is_table_quantity?.length && (
        <MUITable columns={columns} table={is_table_quantity} options={options} className="pending_invoice_table_mui_datatable_main" />
      )}
    </div>
  );
};

export default PendingInvoiceTable;
