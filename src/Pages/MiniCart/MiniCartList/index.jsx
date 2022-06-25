import React, { useState, useEffect } from "react";
import "./styles.scss";

import { Link, useNavigate } from "react-router-dom";
import { Clear } from "@mui/icons-material";

import { Button } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { Rating } from "@mui/material";
import { useStateValue } from "../../../store/state";
import { getAdminToken, SessionExpiredLogout } from "../../../utilities";
import Constant from "../../../Constant";
import axios from "axios";
import swal from "sweetalert2";
import SimpleLoader from "../../../Components/SimpleLoader";
import minicart_icon from "../../../Assets/Minicart/minicart_icon.png";
import AllertMessage from "../../../Components/PendingInvoiceAlertPopup";

function formatToCurrency(amount) {
  return amount.toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ",");
}

const MiniCartList = ({ handleSideBarClose }) => {
  const [
    { cart, gt, plp_categories, isSimpleLoading, geo, customnostore },
    dispatch,
  ] = useStateValue();
  const [value, setValue] = React.useState(4);
  const navigate = useNavigate();
  const [isCartData, setIsCartData] = useState([]);
  const [allert, setallert] = useState(false);

  const AddpendingInvoiceAlert = (event) => {
    setallert(event);
  };
  useEffect(() => {
    setIsCartData([]);
    let temp = cart?.[0]?.invoice_items?.map((itm) => ({
      ...itm,
      is_qty: itm?.qty,
    }));
    setIsCartData(temp);
  }, [gt, cart?.[0]?.invoice_items]);

  const handleChange = (event, index) => {
    setIsCartData(
      isCartData?.map((item, ind) => {
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
    dispatch({
      type: "SET_IS_LOADING",
      value: true,
    });
    handleSideBarClose("right", false);
    let customer_id = JSON.parse(localStorage.getItem("userdata"));
    let data = {
      data: {
        currency_id: event?.currency_id,
        customer_id: customer_id?.id,
        category_id: plp_categories?.[0]?.category?.id,
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
        page: 0,
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
              CartData: res?.data[1]?.products,
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
        if (error.response.status === 401) {
          SessionExpiredLogout();
        } else {
          swal.fire({
            text: `${error?.response?.data?.message || error.message}`,
            icon: "error",
            showConfirmButton: false,
            timer: 3000,
          });
        }
      });
  };

  //API to fetch admin token
  const [adminToken, setAdminToken] = useState("");
  useEffect(() => {
    getAdminToken((res) => {
      setAdminToken(res);
    });
  }, []);

  const handleUpdate = (quantity, sku, cart_id, item_id) => {
    let data = {
      cartItem: {
        sku: sku,
        qty: quantity,
        quoteId: cart_id,
      },
    };
    dispatch({
      type: "SET_IS_SIMPLE_LOADING",
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
          type: "SET_IS_SIMPLE_LOADING",
          value: false,
        });
      })
      .catch((error) => {
        dispatch({
          type: "SET_IS_LOADING",
          value: false,
        });
        dispatch({
          type: "SET_IS_SIMPLE_LOADING",
          value: false,
        });
        if (error.response.status === 401) {
          SessionExpiredLogout();
        } else {
          swal.fire({
            text: `${error?.response?.data?.message || error.message}`,
            icon: "error",
            showConfirmButton: false,
            timer: 3000,
          });
        }
      });
  };
  const addpendinginvoice = async () => {
    handleSideBarClose("right", false);
    let storedata = JSON.parse(localStorage.getItem("storedata"));
    if (cart?.[0]?.invoice?.Cart_id) {
      dispatch({
        type: "SET_IS_LOADING",
        value: true,
      });
      try {
        const pinvoice = await axios({
          method: "post",
          url: `${Constant.baseUrl()}/cartToPendingInvoice`,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          data: {
            quote_id: cart?.[0]?.invoice?.Cart_id,
            store_id: storedata?.store_id,
          },
        });
        dispatch({
          type: "SET_IS_LOADING",
          value: false,
        });
        dispatch({
          type: "CART__TRIGGER",
        });
        navigate(
          `/${
            customnostore ? customnostore : geo?.country_name
          }/pendinginvoice/${pinvoice?.data?.[0]?.quote_id}`
        );
      } catch (e) {
        dispatch({
          type: "SET_IS_LOADING",
          value: false,
        });
        if (e.response.status === 401) {
          SessionExpiredLogout();
        }
      }
    } else {
      swal.fire({
        text: `Add product to cart to add pending invoice`,
        icon: "error",
        showConfirmButton: false,
        timer: 3000,
      });
    }
  };

  const [review, setreview] = useState();
  useEffect(() => {
    setreview(localStorage.getItem("review_status"));
  }, [localStorage.getItem("review_status")]);

  const handleIsValidPendingInvoice = () => {
    // let permissions = JSON.parse(localStorage.getItem("permissions"));
    // let pendingpermission =
    //   permissions?.length === 0
    //     ? false
    //     : permissions?.some(
    //         (per) =>
    //           per?.value === "can-add-to-multiple-wishlist" &&
    //           per?.permission_value === 0
    //       );
    // if (pendingpermission) {
    //   return swal.fire({
    //     text: `Your Account doesn't have access to add products to Wishlist`,
    //     icon: "error",
    //     showConfirmButton: true,
    //   });
    // }
    if (cart?.[0]?.invoice_items?.length === 0 || cart?.length === 0) {
      return swal.fire({
        text: `No product to add pending invoice`,
        icon: "error",
        showConfirmButton: false,
        timer: 3000,
      });
    } else {
      cart?.length && cart?.[0]?.invoice_items?.length && setallert(true);
    }
  };

  let permissions = JSON.parse(localStorage.getItem("permissions"));
  let PendingInvoice =
    permissions?.length === 0
      ? false
      : permissions?.some(
          (per) =>
            per?.value === "can-add-to-pending-invoice" &&
            per?.permission_value === 0
        );
  let placeorder =
    permissions?.length === 0
      ? false
      : permissions?.some(
          (per) =>
            per?.value === "can-add-to-cart" && per?.permission_value === 0
        );
  return (
    <div className="minicart_list_main">
      <header className="minicart_header">
        <Clear
          className="clear_btn"
          onClick={() => handleSideBarClose("right", false)}
        />
        <h6>Mini Cart</h6>
      </header>
      {isSimpleLoading ? (
        <div
          style={{
            height: "100vh",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <SimpleLoader />
        </div>
      ) : (
        <>
          <div className="minicart_list_content">
            {isCartData?.length
              ? isCartData?.map((itm, index) => (
                  <div className="minicart_section_container" key={index}>
                    <div className="minicart_icon">
                      <img src={minicart_icon} alt="" />
                    </div>
                    <div className="section_left">
                      <img
                        src={Constant.imageBaseUrl() + itm?.brand}
                        alt=""
                        title={itm?.brand_name}
                      />
                      {/* <span className="minicart_new">
                      <img src={minicart_new} alt="" />
                    </span> */}
                    </div>
                    <div className="section_right">
                      <p className="seller_id">
                        Seller ID : <span>{itm?.seller_code} </span>
                      </p>
                      <div className="modal__hub">
                        <p className="modal_name">{itm?.product_name}</p>
                        <p className="hub">
                          <span>Hub</span>
                          <div className="hub_name">{itm?.hub}</div>
                        </p>
                      </div>
                      <div className="rating_main">
                        {review == 0 ? (
                          ""
                        ) : (
                          <>
                            <Rating
                              className="ratings"
                              name="simple-controlled"
                              value={value}
                              onChange={(event, newValue) => {
                                setValue(newValue);
                              }}
                            />
                            <p className="reviews"> 543 Reviews</p>
                          </>
                        )}
                      </div>
                      <p
                        className="detail_link"
                        onClick={() =>
                          onCLickDetailsLink({
                            sku: itm?.product_name,
                            currency_id: itm?.currency_id,
                            product_id: itm?.product_id,
                          })
                        }
                      >
                        Details
                      </p>
                      <div className="price_block">
                        <p className="price">
                          <span>{itm?.currency}</span>
                          {formatToCurrency(parseInt(itm?.price))}
                          <span> / Unit</span>
                        </p>
                        <div className="quantity">
                          {parseInt(itm?.is_qty) !== parseInt(itm?.qty) && (
                            <p
                              className="update"
                              onClick={() =>
                                handleUpdate(
                                  itm?.qty,
                                  itm?.sku,
                                  cart?.[0]?.invoice?.Cart_id,
                                  itm?.item_id
                                )
                              }
                            >
                              Update
                            </p>
                          )}
                          <div className="qty_change">
                            <RemoveIcon
                              className={`${
                                parseInt(itm.moq) < parseInt(itm.qty)
                                  ? "item_increase"
                                  : "item_decrease"
                              }`}
                              onClick={() =>
                                handleChange(
                                  parseInt(itm?.moq) >= parseInt(itm?.qty)
                                    ? parseInt(itm?.qty)
                                    : parseInt(itm?.qty) - 1,
                                  index
                                )
                              }
                            />
                            <span className="input_text">{itm?.qty}</span>
                            <AddIcon
                              className={`${
                                parseInt(itm.qty) < parseInt(itm.in_stock)
                                  ? "item_increase"
                                  : "item_decrease"
                              }`}
                              onClick={() =>
                                handleChange(
                                  parseInt(itm?.in_stock) > parseInt(itm?.qty)
                                    ? parseInt(itm?.qty) + 1
                                    : parseInt(itm?.qty),
                                  index
                                )
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <div className="total_block">
                        <span>TOTAL</span>
                        <p>
                          <span>
                            {
                              JSON.parse(localStorage.getItem("currency"))
                                ?.currency_code
                            }
                          </span>{" "}
                          {formatToCurrency(parseInt(itm?.price * itm?.qty))}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              : ""}
          </div>
          <footer className="minicart_footer">
            <div className="minicart_total">
              <p className="title_total">TOTAL</p>
              <p className="total_price">
                <span>
                  {" "}
                  {
                    JSON.parse(localStorage.getItem("currency"))?.currency_code
                  }{" "}
                </span>
                {formatToCurrency(
                  parseInt(cart?.length && cart[0]?.invoice?.subtotal)
                )}
              </p>
            </div>
            <div className="minicart_btn">
              {!placeorder ? (
                <Link
                  to={`/${
                    customnostore ? customnostore : geo?.country_name
                  }/mycart`}
                  onClick={() => handleSideBarClose("right", false)}
                >
                  <Button className="minicart_bottom_button_cart">
                    <span>Go To Cart</span>
                  </Button>
                </Link>
              ) : (
                ""
              )}
              {!PendingInvoice ? (
                <Button
                  className="minicart_bottom_button_pending_invoice"
                  onClick={() => handleIsValidPendingInvoice()}
                >
                  <span>Add To Pending Invoice</span>
                </Button>
              ) : (
                ""
              )}
            </div>
          </footer>
          {allert && (
            <AllertMessage
              AddpendingInvoiceAlert={AddpendingInvoiceAlert}
              handleIsValidUser={addpendinginvoice}
            />
          )}
        </>
      )}
    </div>
  );
};

export default MiniCartList;
