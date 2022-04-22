import React, { useState, useEffect } from "react";
import "./styles.scss";

import { Link, useNavigate } from "react-router-dom";
import { Clear } from "@mui/icons-material";

import { Button } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import brand_logo from "../../../Assets/Productlist/Brand_icon.png";
import minicart_icon from "../../../Assets/Minicart/minicart_icon.png";
import minicart_new from "../../../Assets/Minicart/minicart_new.png";
import { Rating } from "@mui/material";
import { useStateValue } from "../../../store/state";
import { getAdminToken } from "../../../utilities";
import Constant from "../../../Constant";
import axios from "axios";
import swal from "sweetalert2";
import SimpleLoader from "../../../Components/SimpleLoader";

function formatToCurrency(amount) {
  return amount.toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ",");

  // return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const MiniCartList = ({ handleSideBarClose }) => {
  const [{ cart, currency, isSimpleLoading }, dispatch] = useStateValue();
  const [value, setValue] = React.useState(4);
  const navigate = useNavigate();
  const [isCartData, setIsCartData] = useState([]);
  useEffect(() => {
    let temp = cart?.[0]?.invoice_items?.map((itm) => ({
      ...itm,
      is_qty: itm?.qty,
    }));
    setIsCartData(temp);
  }, [cart?.data]);
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

  const [getCategories, setGetCategories] = useState("");
  useEffect(() => {
    const fetchCategoryData = () => {
      let data = {
        currency_id: parseInt(currency?.currency_id),
      };
      axios
        .post(Constant.baseUrl() + "/getCategoriesList", data, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          if (res?.data?.length) {
            setGetCategories(res?.data[0]?.category.id);
          }
        })
        .catch((err) => {});
    };
    fetchCategoryData();
  }, []);

  const onCLickDetailsLink = (event) => {
    if (getCategories !== "") {
      handleSideBarClose("right", false);
      let customer_id = JSON.parse(localStorage.getItem("userdata"));
      let data = {
        data: {
          currency_id: event?.currency_id,
          customer_id: customer_id?.id,
          category_id: getCategories?.toString(),
          brand_id: "0",
          hub_id: "0",
          condition_id: "0",
          keyword: event?.sku,
          eta: "0",
          min_price: 0,
          max_price: 0,
        },
      };
      axios
        .post(Constant.baseUrl() + "/getProducts", data, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          dispatch({
            type: "SET_PDP_POPUP_OPEN_CLOSE",
            value: true,
            data: {
              CartData: res.data[1].products,
              product_id: event?.product_id,
            },
          });
        })
        .catch((err) => {});
    }
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
        swal.fire({
          text: `${error?.response?.data?.message || error.message}`,
          icon: "error",
          showConfirmButton: false,
          timer: 3000,
        });
      });
  };
  const addpendinginvoice = async () => {
    handleSideBarClose("right", false);
    try {
      const pinvoice = await axios({
        method: "post",
        url: `${Constant.baseUrl()}/cartToPendingInvoice`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: {
          quote_id: cart?.[0]?.invoice?.Cart_id,
          store_id: 1,
        },
      });
      navigate("/pending-invoice");
    } catch (e) {
      console.log(e);
    }
  };
  console.log(cart[0].invoice);

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
            {isCartData?.length &&
              isCartData?.map((itm, index) => (
                <div className="minicart_section_container">
                  <div className="minicart_icon">
                    <img src={minicart_icon} alt="" />
                  </div>
                  <div className="section_left">
                    <img src={brand_logo} alt="" />
                    <span className="minicart_new">
                      <img src={minicart_new} alt="" />
                    </span>
                  </div>
                  <div className="section_right">
                    <p className="seller_id">
                      Seller ID : <span>{itm?.seller_id} </span>
                    </p>
                    <div className="modal__hub">
                      <p className="modal_name">{itm?.product_name}</p>
                      <p className="hub">
                        <span>Hub</span>
                        <div className="hub_name">{itm?.hub}</div>
                      </p>
                    </div>
                    <div className="rating_main">
                      <Rating
                        className="ratings"
                        name="simple-controlled"
                        value={value}
                        onChange={(event, newValue) => {
                          setValue(newValue);
                        }}
                      />
                      <p className="reviews"> 543 Reviews</p>
                    </div>
                    <p
                      className="detail_link"
                      onClick={() =>
                        onCLickDetailsLink({
                          sku: itm?.sku,
                          currency_id: itm?.currency_id,
                          product_id: itm?.product_id,
                        })
                      }
                    >
                      Details
                    </p>
                    <div className="price_block">
                      <p className="price">
                        <span>INR</span>
                        {/* {itm?.price} */}
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
                        <span>INR</span>{" "}
                        {formatToCurrency(parseInt(itm?.price * itm?.qty))}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <footer className="minicart_footer">
            <div className="minicart_total">
              <p className="title_total">TOTAL</p>
              <p className="total_price">
                <span>INR </span>
                {/* {cart?.data?.[0]?.invoice?.grand_total} */}
                {formatToCurrency(cart[0]?.invoice?.subtotal)}
              </p>
            </div>
            <div className="minicart_btn">
              <Link
                to="/mycart"
                onClick={() => handleSideBarClose("right", false)}
              >
                <Button className="minicart_bottom_button_cart">
                  <span>Go To Cart</span>
                </Button>
              </Link>
              {/* <Link
                to="/pending-invoice"
                onClick={() => handleSideBarClose("right", false)}
              > */}
              <Button
                className="minicart_bottom_button_pending_invoice"
                onClick={() => addpendinginvoice()}
              >
                <span>Add To Pending Invoice</span>
              </Button>
              {/* </Link> */}
            </div>
          </footer>
        </>
      )}
    </div>
  );
};

export default MiniCartList;
