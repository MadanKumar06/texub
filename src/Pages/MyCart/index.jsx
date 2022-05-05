import React, { useState, useEffect } from "react";
import "./styles.scss";
import { Stack, Button, Breadcrumbs, Typography } from "@mui/material";
import MyCartTable from "./MyCartTable";
import { Link, useNavigate } from "react-router-dom";
import shopping_image from "../../Assets/MyCart/Group 956.png";
import { useStateValue } from "../../store/state";
import { getAdminToken } from "../../utilities";

import axios from "axios";
import Constant from "../../Constant";
import swal from "sweetalert2";

const Mycart = () => {
  const [{ cart, geo, customstore, customnostore }, dispatch] = useStateValue();

  //API to fetch admin token
  const [adminToken, setAdminToken] = useState("");
  useEffect(() => {
    getAdminToken((res) => {
      setAdminToken(res);
    });
  }, []);

  //Delete cart
  const [localcart, setlocalcart] = useState(false);

  useEffect(() => {
    dispatch({
      type: "CART__TRIGGER",
      data: !localcart,
    });
    setlocalcart(!localcart);
  }, []);

  const deleteCartData = async (deleteCart) => {
    dispatch({
      type: "SET_IS_LOADING",
      value: true,
    });
    try {
      const rowdelete = await axios({
        method: "delete",
        url: `${Constant.baseUrl2()}/carts/${deleteCart?.cart_id}/items/${
          deleteCart?.item_id
        }`,
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });
      if (rowdelete) {
        dispatch({
          type: "CART__TRIGGER",
        });
        dispatch({
          type: "SET_IS_LOADING",
          value: false,
        });
        swal.fire({
          text: `Your Cart is Deleted Successfully!`,
          icon: "success",
          showConfirmButton: false,
          timer: 3000,
        });
      } else {
        dispatch({
          type: "SET_IS_LOADING",
          value: false,
        });
        swal.fire({
          text: `Your Cart Not Deleted Try Again later`,
          icon: "error",
          showConfirmButton: false,
          timer: 3000,
        });
      }

      // seteventcheck(!eventcheck);
    } catch (e) {
      dispatch({
        type: "SET_IS_LOADING",
        value: false,
      });
      console.log(e);
    }
  };
  const navigate = useNavigate();

  const addpendinginvoice = async () => {
    dispatch({
      type: "SET_IS_LOADING",
      value: true,
    });
    let storedata = JSON.parse(localStorage.getItem("storedata"));
    try {
      const pinvoice = await axios({
        method: "post",
        url: `${Constant.baseUrl()}/cartToPendingInvoice`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: {
          quote_id: cart[0]?.invoice?.Cart_id,
          store_id: storedata?.store_id,
        },
      });
      navigate(
        `/${customnostore ? customnostore : geo?.country_name}/pending-invoice`
      );
      dispatch({
        type: "SET_IS_LOADING",
        value: false,
      });
    } catch (e) {
      dispatch({
        type: "SET_IS_LOADING",
        value: false,
      });
      console.log(e);
    }
  };

  const [permission, setpermission] = useState();

  useEffect(() => {
    setpermission(JSON.parse(localStorage.getItem("permissions")));
  }, []);

  const [userpermission, setuserpermission] = useState(false);
  const [approvepermission, setapprovepermission] = useState(false);

  useEffect(() => {
    let temp = permission?.some(
      (p) =>
        p?.value === "can-merge-own-cart-to-main-cart" &&
        p?.permission_value === 1
    );
    setuserpermission(temp);
    let temp1 = permission?.some(
      (p) => p?.value === "cart-approval-required" && p?.permission_value === 1
    );
    setapprovepermission(temp1);
  }, [permission]);

  console.log(cart);

  const mergecart = async () => {
    let user = JSON.parse(localStorage.getItem("userdata"));
    try {
      const postcart = await axios({
        method: "post",
        url: `${Constant?.baseUrl()}/cartRequest`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: {
          data: {
            type: 2,
            customer_id: user?.id,
            status: 0,
            quote_id: cart[0]?.invoice?.Cart_id,
          },
        },
      });
    } catch (e) {
      console.log(e);
    }
  };
  const approvecart = async () => {
    let user = JSON.parse(localStorage.getItem("userdata"));
    try {
      const postcart = await axios({
        method: "post",
        url: `${Constant?.baseUrl()}/cartRequest`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: {
          data: {
            type: 1,
            customer_id: user?.id,
            status: 0,
            quote_id: cart[0]?.invoice?.Cart_id,
          },
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="my_cart_main">
      <div className="my_cart_image_block">
        <img src={shopping_image} alt="" />
        <p>Shopping Cart</p>
      </div>
      <div className="my_cart_breadcrumbs">
        <Stack spacing={2}>
          <Breadcrumbs separator=">>" aria-label="breadcrumb">
            <Link to={`/${customnostore ? customnostore : geo?.country_name}`}>
              Home
            </Link>
            <Typography key="4" color="#002D56">
              Cart
            </Typography>
          </Breadcrumbs>
        </Stack>
      </div>
      <MyCartTable cartDataList={cart} deleteCartData={deleteCartData} />

      <div className="my_cart_footer">
        <Button className="my_cart_bottom_button_shopping">
          <Link
            style={{ textDecoration: "none", color: "white" }}
            to={`/${
              customnostore ? customnostore : geo?.country_name
            }/products`}
          >
            Continue Shopping
          </Link>
        </Button>
        {userpermission ? (
          <Button
            className="my_cart_bottom_button_pending_invoice"
            onClick={() => mergecart()}
          >
            <span>Merge Cart</span>
          </Button>
        ) : (
          ""
        )}
        {approvepermission ? (
          <Button
            className="my_cart_bottom_button_pending_invoice"
            onClick={() => approvecart()}
          >
            <span>Request for Approval</span>
          </Button>
        ) : (
          ""
        )}
        <Button
          className="my_cart_bottom_button_pending_invoice"
          onClick={() => addpendinginvoice()}
        >
          <span>Add To Pending Invoice</span>
        </Button>
      </div>
    </div>
  );
};

export default Mycart;
