import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./styles.scss";
import MUITable from "../../../Components/Common/MUITable";
import Constant from "../../../Constant";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { getAdminToken } from "../../../utilities";
import { useStateValue } from "../../../store/state";
import swal from "sweetalert2";
import Wishlist from '../../PDPpopUp/Wishlist'

import axios from "axios";

const MyCartTable = ({ cartDataList, deleteCartData }) => {
  const [is_table_quantity, setIs_table_quantity] = useState([]);
  const [is_table_quantity_test, setis_table_quantity_test] = useState([]);
  console.log(cartDataList[0]?.invoice_items?.length)

  const [{ pdpPopUpOpenClose }, dispatch] = useStateValue();
  useEffect(() => {
    let temp =
      cartDataList?.[0]?.invoice_items?.length &&
      cartDataList?.[0]?.invoice_items?.map((itm) => ({
        ...itm,
        is_qty: itm?.qty,
      }));
    setIs_table_quantity(temp);
  }, [cartDataList]);
  //API to fetch admin token
  const [adminToken, setAdminToken] = useState("");
  useEffect(() => {
    getAdminToken((res) => {
      setAdminToken(res);
    });
  }, []);

  const [openwishlist, setopenwishlist] = useState(false);
  const list = () => {
    setopenwishlist(!openwishlist);
  };

  const handleUpdate = (quantity, sku, cart_id, item_id) => {
    let data = {
      cartItem: {
        sku: sku,
        qty: quantity,
        quoteId: cart_id,
      },
    };
    dispatch({
      type: "SET_IS_LOADING",
      value: true,
    });
    axios
      .put(Constant.baseUrl2() + `/carts/${cart_id}/items/${item_id}`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
      })
      .then((res) => {
        swal.fire({
          text: `Cart Updated Succesfully!`,
          icon: "success",
          showConfirmButton: false,
          timer: 2000,
        });
        dispatch({
          type: "CART__TRIGGER",
        });
        dispatch({
          type: "SET_IS_LOADING",
          value: false,
        });
      })
      .catch((error) => {
        dispatch({
          type: "SET_IS_LOADING",
          value: false,
        });
        dispatch({
          type: "SET_IS_LOADING",
          value: false,
        });
        swal.fire({
          text: `${error?.response?.data?.message || error.message}`,
          icon: "error",
          showConfirmButton: false,
          timer: 3000,
        });
      });
  };
  const handleChangeValueTable = (event, index) => {
    setIs_table_quantity(
      is_table_quantity?.length &&
        is_table_quantity?.map((item, ind) => {
          if (index === ind) {
            return {
              ...item,
              qty: event,
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
      name: "brand",
      label: "PRODUCTS",
      options: {
        customBodyRender: (value, tableMeta) => {
          let eta = tableMeta?.rowData[8];
          let description = tableMeta?.rowData[7];
          let productname = tableMeta?.rowData[6];
          return (
            <div className="mycart_product_main">
              <div className="mycart_product_sub_block">
                <div className="img_block">
                  <img src={`${Constant.imageBaseUrl()}${value}`} alt="" />
                </div>
                <div className="mycart_right_section">
                  <div className="mycart_right_section_block">
                    <span className="mycart_product_eta">ETA: {eta}</span>
                    <span
                      className="mycart_product_delete_icon"
                      onClick={() =>
                        deleteCartData({
                          cart_id: cartDataList?.[0]?.invoice?.Cart_id,
                          item_id: tableMeta?.rowData?.[9],
                        })
                      }
                    >
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
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                              />
                              <path
                                id="Path-2"
                                data-name="Path"
                                d="M23.264,7.123v19.1a2.727,2.727,0,0,1-2.727,2.727H6.894a2.727,2.727,0,0,1-2.727-2.727V7.123m4.092,0V4.394a2.727,2.727,0,0,1,2.727-2.727h5.458a2.727,2.727,0,0,1,2.727,2.727V7.123"
                                transform="translate(-1.438 -1.667)"
                                fill="none"
                                stroke="#002d56"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                              />
                              <line
                                id="Line"
                                y2="8.185"
                                transform="translate(9.549 12.277)"
                                fill="none"
                                stroke="#002d56"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                              />
                              <line
                                id="Line-2"
                                data-name="Line"
                                y2="8.185"
                                transform="translate(15.005 12.277)"
                                fill="none"
                                stroke="#002d56"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                              />
                            </g>
                          </g>
                        </g>
                      </svg>
                    </span>
                  </div>

                  <p className="my_cart_product_name">{productname}</p>
                  <p className="my_cart_product_description">{description}</p>
                  <div className="my_cart_link">
                    <Link to="/">Details</Link>
                    <span className="link_2"  onClick={list}>
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
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.2"
                            />
                          </g>
                        </g>
                      </svg>
                      Add to Wishlist
                    </span>
                    {openwishlist && (
                      <Wishlist
                        dataFromPLP={pdpPopUpOpenClose?.data}
                        // pdpSellerData={pdpSellerData}
                      />
                    )}
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
      label: "PRICE / UNIT",
      options: {
        customBodyRender: (value) => {
          return (
            <div className="mycart_table_price_block">
              <div className="mycart_table_price">
                <span>INR</span>
                {value}
                {/* <span>/unit</span> */}
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
          debugger;
          let moq = tablemeta?.rowData?.[10];
          let in_stock = tablemeta?.rowData?.[11];
          let is_qty = tablemeta?.rowData?.[12];
          return (
            <div className="mycart_table_quantity">
              {parseInt(value) !== parseInt(is_qty) && (
                <p
                  className="update"
                  onClick={() =>
                    handleUpdate(
                      value,
                      tablemeta?.rowData?.[13],
                      cartDataList?.[0]?.invoice?.Cart_id,
                      tablemeta?.rowData?.[9]
                    )
                  }
                >
                  Update
                </p>
              )}
              <div className="mycart_quantity_subblock">
                <RemoveIcon
                  className={`${
                    parseInt(moq) < parseInt(value)
                      ? "item_increase"
                      : "item_decrease"
                  }`}
                  onClick={() =>
                    handleChangeValueTable(
                      parseInt(moq) >= parseInt(value)
                        ? parseInt(value)
                        : parseInt(value) - 1,
                      tablemeta?.rowIndex
                    )
                  }
                />
                <span className="input_text">{value}</span>
                <AddIcon
                  className={`${
                    parseInt(value) < parseInt(in_stock)
                      ? "item_increase"
                      : "item_decrease"
                  }`}
                  onClick={() =>
                    handleChangeValueTable(
                      parseInt(in_stock) > parseInt(value)
                        ? parseInt(value) + 1
                        : parseInt(value),
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
      name: "row_total",
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
      name: "item_id",
      label: " ",
      options: {
        display: false,
      },
    },
    {
      name: "moq",
      label: " ",
      options: {
        display: false,
      },
    },
    {
      name: "in_stock",
      label: " ",
      options: {
        display: false,
      },
    },
    {
      name: "is_qty",
      label: " ",
      options: {
        display: false,
      },
    },
    {
      name: "sku",
      label: " ",
      options: {
        display: false,
      },
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
    textLabels: {
      body: {
        noMatch:
          is_table_quantity?.length > 0
            ? "Loading data ..."
            : "Sorry, No data found",
      },
    },
  };
  console.log(is_table_quantity)
  return (
    <div className="mycart_table_main_container">
      <MUITable
          columns={columns}
          table={is_table_quantity?.length ? is_table_quantity : []}
          options={options}
          className="mycart_table_mui_datatable_main"
        />
      {/* {is_table_quantity?.[0]?.invoice_items?.length && ( */}
      {/* {cartDataList[0]?.invoice_items?.length === 0 ? (
        <MUITable
          columns={columns}
          table={is_table_quantity}
          options={options}
          className="mycart_table_mui_datatable_main"
        />
      ) : (
        <MUITable
          columns={columns}
          table={is_table_quantity}
          options={options}
          className="mycart_table_mui_datatable_main"
        />
      )} */}
    </div>
  );
};

export default MyCartTable;
