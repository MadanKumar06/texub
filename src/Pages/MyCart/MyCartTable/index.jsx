import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./styles.scss";
import MUITable from "../../../Components/Common/MUITable";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

import HP from "./../../../Assets/Productlist/hp_td_icon.png";
import Acer from "../../../Assets/Productlist/acer_icon_td.png";

const MyCartTable = () => {
  const [is_table_quantity, setIs_table_quantity] = useState(0);

  useEffect(() => {
    setIs_table_quantity(Productstablelist);
  }, []);

  const handleChangeValueTable = (event, index) => {
    setIs_table_quantity(
      is_table_quantity?.map((item, ind) => {
        if (index === ind) {
          return {
            ...item,
            quantity: event,
          };
        } else {
          return item;
        }
      })
    );
  };
  const columns = [
    {
      name: "seller_id",
      label: "SELLER ID",
      options: {
        customBodyRender: (value) => {
          return (
            <div className="mycart_table_seller_id">
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
            <div className="mycart_product_main">
              <div className="mycart_product_sub_block">
                <div className="img_block">
                  <img src={value?.product_img} alt="" />
                </div>
                <div className="mycart_right_section">
                  <div className="mycart_right_section_block">
                    <span className="mycart_product_eta">
                      ETA: {value?.eta}
                    </span>
                    <span className="mycart_product_delete_icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        viewBox="0 0 52 52"
                      >
                        <g
                          id="Group_1047"
                          data-name="Group 1047"
                          transform="translate(-644 -660)"
                        >
                          <circle
                            id="Ellipse_55"
                            data-name="Ellipse 55"
                            cx="26"
                            cy="26"
                            r="26"
                            transform="translate(644 660)"
                            fill="#f5f5f5"
                          />
                          <g id="Icon" transform="translate(655.5 670.333)">
                            <g
                              id="Icon-2"
                              data-name="Icon"
                              transform="translate(2.5 1.667)"
                            >
                              <path
                                id="Path"
                                d="M2.5,5H27.054"
                                transform="translate(-2.5 0.456)"
                                fill="none"
                                stroke="#002d56"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                              />
                              <path
                                id="Path-2"
                                data-name="Path"
                                d="M23.264,7.123v19.1a2.727,2.727,0,0,1-2.727,2.727H6.894a2.727,2.727,0,0,1-2.727-2.727V7.123m4.092,0V4.394a2.727,2.727,0,0,1,2.727-2.727h5.458a2.727,2.727,0,0,1,2.727,2.727V7.123"
                                transform="translate(-1.438 -1.667)"
                                fill="none"
                                stroke="#002d56"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                              />
                              <line
                                id="Line"
                                y2="8.185"
                                transform="translate(9.549 12.277)"
                                fill="none"
                                stroke="#002d56"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                              />
                              <line
                                id="Line-2"
                                data-name="Line"
                                y2="8.185"
                                transform="translate(15.005 12.277)"
                                fill="none"
                                stroke="#002d56"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                              />
                            </g>
                          </g>
                        </g>
                      </svg>
                    </span>
                  </div>

                  <p className="my_cart_product_name">{value?.model_name}</p>
                  <p className="my_cart_product_description">
                    {value?.model_desc}
                  </p>
                  <div className="my_cart_link">
                    <Link to="/">Details</Link>
                    <Link to="/" className="link_2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18.123"
                        height="18"
                        viewBox="0 0 21.123 21"
                      >
                        <g id="Icon" transform="translate(-0.305 -0.431)">
                          <rect
                            id="Area"
                            width="25"
                            height="25"
                            transform="translate(0.341 0.431)"
                            fill="#fcfcfc"
                            opacity="0"
                          />
                          <g
                            id="Icon-2"
                            data-name="Icon"
                            transform="translate(0.905 1.484)"
                          >
                            <path
                              id="Path"
                              d="M19.678,4.161a4.966,4.966,0,0,0-7.416,0l-1.01,1.093-1.01-1.093a4.966,4.966,0,0,0-7.416,0,6.01,6.01,0,0,0,0,8.025l1.011,1.093,7.415,8.026,7.415-8.026,1.011-1.093A6.008,6.008,0,0,0,19.678,4.161Z"
                              transform="translate(-1.291 -2.499)"
                              fill="none"
                              stroke="#002d56"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="1.2"
                            />
                          </g>
                        </g>
                      </svg>
                      Add to Wishlist
                    </Link>
                  </div>
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
            <div className="mycart_table_hub_block">
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
            <div className="mycart_table_price_block">
              <div className="mycart_table_price">
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
            <div className="mycart_table_quantity">
              <div className="mycart_quantity_subblock">
                <RemoveIcon
                  className="item_decrease"
                  onClick={() =>
                    handleChangeValueTable(
                      parseInt(value) >= 2 ? parseInt(value) - 1 : 1,
                      tablemeta?.rowIndex
                    )
                  }
                />
                <span className="input_text">{value}</span>
                <AddIcon
                  className="item_increase"
                  onClick={() =>
                    handleChangeValueTable(
                      parseInt(value) + 1,
                      tablemeta?.rowIndex
                    )
                  }
                />
              </div>
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
            <div className="mycart_table_subtotal_block">
              <div className="mycart_table_subtotal">
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
    <div className="mycart_table_main_container">
      {is_table_quantity?.length && (
        <MUITable
          columns={columns}
          table={is_table_quantity}
          options={options}
          className="mycart_table_mui_datatable_main"
        />
      )}
    </div>
  );
};

export default MyCartTable;
