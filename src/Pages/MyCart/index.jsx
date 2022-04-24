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
  const [{ cart, geo }, dispatch] = useStateValue();

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
    let storedata = JSON.parse(localStorage.getItem('storedata'))
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
      navigate("/pending-invoice");
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

  return (
    <div className="my_cart_main">
      <div className="my_cart_image_block">
        <img src={shopping_image} alt="" />
        <p>Shopping Cart</p>
      </div>
      <div className="my_cart_breadcrumbs">
        <Stack spacing={2}>
          <Breadcrumbs separator=">>" aria-label="breadcrumb">
            <Link to={`/${geo?.country_name}`}>Home</Link>
            <Typography key="4" color="#002D56">
              Cart
            </Typography>
          </Breadcrumbs>
        </Stack>
      </div>
      <MyCartTable cartDataList={cart} deleteCartData={deleteCartData} />

      <div className="my_cart_footer">
        <Button className="my_cart_bottom_button_shopping">
          <span>Continue Shopping</span>
        </Button>
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
