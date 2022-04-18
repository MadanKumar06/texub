import React, { useState, useEffect } from "react";
import "./styles.scss";

import { Link, useNavigate } from "react-router-dom";
import { Clear } from "@mui/icons-material";

import { Button } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import brand_logo from "../../../Assets/Productlist/Brand_icon.png";
import { Rating } from "@mui/material";
import { useStateValue } from "../../../store/state";
import { getAdminToken } from "../../../utilities";
import Constant from "../../../Constant";
import axios from "axios";
import swal from "sweetalert2";
import SimpleLoader from "../../../Components/SimpleLoader";

const MiniCartList = ({ handleSideBarClose }) => {
  const [{ cart, isSimpleLoading }, dispatch] = useStateValue();
  const [value, setValue] = React.useState(4);
  const [isCartData, setIsCartData] = useState(0);
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

  const navigate = useNavigate();
  const onCLickDetailsLink = () => {
    handleSideBarClose("right", false);
    setTimeout(() => {
      dispatch({
        type: "SET_PDP_POPUP_OPEN_CLOSE",
        value: true,
      });
    }, 1000 / 2);
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
  console.log(cart[0].invoice)

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
                  <div className="section_left">
                    <img src={brand_logo} alt="" />
                  </div>
                  <div className="section_right">
                    <p className="seller_id">
                      Seller ID : <span>{itm?.seller_id} </span>
                    </p>
                    <div className="modal__hub">
                      <p className="modal_name">{itm?.product_name}</p>
                      <p className="hub">
                        <span>Hub</span>
                        {itm?.hub}
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
                      onClick={() => onCLickDetailsLink()}
                    >
                      Details
                    </p>
                    <div className="price_block">
                      <p className="price">
                        <span>INR</span>
                        {/* {itm?.price} */}
                        {parseInt(itm?.price).toFixed(2)}
                        <span> /Unit</span>
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
                        {parseInt(itm?.price * itm?.qty).toFixed(2)}
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
                {cart[0].invoice?.subtotal}
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
