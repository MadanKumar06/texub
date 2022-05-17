import React, { useState, useEffect } from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import swal from "sweetalert2";
import axios from "axios";

import "./styles.scss";
import MUITable from "../../../Components/Common/MUITable";
import Constant from "../../../Constant";
import { getAdminToken } from "../../../utilities";
import NodataFound from "../../../Assets/CommonImage/NodataFound.webp.png";

import { useStateValue } from "../../../store/state";
import Wishlist from "../../PDPpopUp/Wishlist";

function formatToCurrency(amount) {
  return amount.toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ",");
}

const MyCartTable = ({ cartDataList, deleteCartData, setrowselect }) => {
  const [is_table_quantity, setIs_table_quantity] = useState([]);
  const [openwishlist, setopenwishlist] = useState({
    open: false,
    dataFromPLP: "",
  });

  const [{}, dispatch] = useStateValue();

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

  const list = (product_id) => {
    let permissions = JSON.parse(localStorage.getItem("permissions"));
    let pendingpermission =
      permissions?.length === 0
        ? false
        : permissions?.some(
            (per) =>
              per?.value === "can-add-to-multiple-wishlist" &&
              per?.permission_value === 0
          );
    if (pendingpermission) {
      return swal.fire({
        text: `Your Account doesn't have access to add products to Wishinglist`,
        icon: "error",
        showConfirmButton: true,
      });
    }
    let temp;
    if (product_id) {
      temp = is_table_quantity?.filter((itm) => itm?.product_id === product_id);
    }
    setopenwishlist({ open: true, dataFromPLP: temp?.[0] });
  };
  const handleOpenClose = (event) => {
    setopenwishlist({ open: event });
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

  const onCLickDetailsLink = (event) => {
    let permissions = JSON.parse(localStorage.getItem("permissions"));
    let isValidUser = JSON.parse(localStorage.getItem("userdata"))?.group_id;
    if (isValidUser === 5) {
      let wishpermission = permissions?.some((per) => {
        if (
          per?.value === "can-add-to-multiple-wishlist" &&
          per?.permission_value === 0
        ) {
          swal.fire({
            text: `Your Account doesn't have access to add products to wishlist`,
            icon: "error",
            showConfirmButton: true,
          });
        }
      });
      if (wishpermission === true) {
        return;
      }
    }
    dispatch({
      type: "SET_IS_LOADING",
      value: true,
    });
    let customer_id = JSON.parse(localStorage.getItem("userdata"));
    let data = {
      data: {
        currency_id: event?.currency_id,
        customer_id: customer_id?.id,
        category_id: JSON.parse(localStorage.getItem("all_category_id")),
        brand_id: "0",
        hub_id: "0",
        condition_id: "0",
        keyword: event?.sku,
        eta: "0",
        min_price: 0,
        max_price: 0,
        seller_id: "0",
        todays_deal: 0,
        price_drop: 0,
        new_product: 0,
        details: event?.product_id,
      },
    };
    axios
      .post(Constant.baseUrl() + "/getProducts", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res?.data[1]?.products?.length) {
          dispatch({
            type: "SET_IS_LOADING",
            value: false,
          });
          dispatch({
            type: "SET_PDP_POPUP_OPEN_CLOSE",
            value: true,
            data: {
              CartData: res.data[1].products,
              product_id: event?.product_id,
            },
          });
        } else {
          dispatch({
            type: "SET_IS_LOADING",
            value: false,
          });
          swal.fire({
            text: `No data found`,
            icon: "error",
            showConfirmButton: false,
            timer: 3000,
          });
        }
      })
      .catch((error) => {
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

  const columns = [
    {
      name: "seller_code",
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
          let product_id = tableMeta?.rowData[14];
          let sku = tableMeta?.rowData[13];
          let currency_id = tableMeta?.rowData[15];
          return (
            <div className="mycart_product_main">
              <div className="mycart_product_sub_block">
                <div className="img_block">
                  <img src={`${Constant.imageBaseUrl()}${value}`} alt="" />
                </div>
                <div className="mycart_right_section">
                  <div className="mycart_right_section_block">
                    <span className="mycart_product_eta">
                      ETA : {eta} <span> Days</span>
                    </span>
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
                        width="40"
                        height="40"
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
                    <span
                      onClick={() =>
                        onCLickDetailsLink({
                          sku: sku,
                          currency_id: currency_id,
                          product_id: product_id,
                        })
                      }
                    >
                      Details
                    </span>
                    <span className="link_2" onClick={() => list(product_id)}>
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
                <span>
                  {" "}
                  {JSON.parse(localStorage.getItem("currency"))?.currency_code}
                </span>
                {formatToCurrency(parseInt(value))}
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
                <span>
                  {" "}
                  {JSON.parse(localStorage.getItem("currency"))?.currency_code}
                </span>
                {formatToCurrency(parseInt(value))}
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
    {
      name: "product_id",
      label: " ",
      options: {
        display: false,
      },
    },
    {
      name: "currency_id",
      label: " ",
      options: {
        display: false,
      },
    },
  ];

  const options = {
    filter: false,
    filterType: "dropdown",
    responsive: "vertical",
    selectableRows: true,
    // selectableRowsOnClick: true,
    onRowsSelect: (rowsSelected, allRows) => {
      setrowselect(allRows);
    },
    download: false,
    print: false,
    sort: false,
    pagination: false,
    viewColumns: false,
    search: false,
    textLabels: {
      body: {
        noMatch: "No data Found...",
        // (
        //   <div className="no_data_found">
        //     <img src={NodataFound} alt="No data Found" />
        //     <p>No data Found...</p>
        //   </div>
        // ),
      },
    },
  };

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
      {openwishlist?.open && (
        <Wishlist
          pdpSellerData={openwishlist?.dataFromPLP}
          handleOpenClose={handleOpenClose}
        />
      )}
    </div>
  );
};

export default MyCartTable;
