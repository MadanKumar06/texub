import React, { useState, useEffect } from "react";
import "./styles.scss";
import { Stack, Button, Breadcrumbs, Typography } from "@mui/material";
import MyCartTable from "./MyCartTable";
import { Link } from "react-router-dom";
import shopping_image from "../../Assets/MyCart/Group 956.png";
import { useStateValue } from "../../store/state";
import { getAdminToken } from "../../utilities";

import axios from "axios";
import Constant from "../../Constant";
import swal from "sweetalert2";

const Mycart = () => {
  const [{ cart }, dispatch] = useStateValue();

  //API to fetch admin token
  const [adminToken, setAdminToken] = useState("");
  useEffect(() => {
    getAdminToken((res) => {
      setAdminToken(res);
    });
  }, []);

  //Delete cart

  const deleteCartData = async (deleteCart) => {
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
          type: "CART__DATA",
          value: true,
        });
        swal.fire({
          text: `Your Cart is Deleted Successfully!`,
          icon: "success",
          showConfirmButton: false,
          timer: 3000,
        });
      } else {
        swal.fire({
          text: `Your Cart Not Deleted Try Again later`,
          icon: "error",
          showConfirmButton: false,
          timer: 3000,
        });
      }

      // seteventcheck(!eventcheck);
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
            <Link to="/">Home</Link>
            <Typography key="4" color="#002D56">
              Cart
            </Typography>
          </Breadcrumbs>
        </Stack>
      </div>
      <MyCartTable cartDataList={cart?.data} deleteCartData={deleteCartData} />

      <div className="my_cart_footer">
        <Button className="my_cart_bottom_button_shopping">
          <span>Continue Shopping</span>
        </Button>
        <Button className="my_cart_bottom_button_pending_invoice">
          <span>Add To Pending Invoice</span>
        </Button>
      </div>
    </div>
  );
};

export default Mycart;
