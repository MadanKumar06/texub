import React, { useState, useEffect } from "react";
import "./styles.scss";
import { Stack, Button, Breadcrumbs, Typography } from "@mui/material";
import MyCartTable from "./MyCartTable";
import { Link, useNavigate } from "react-router-dom";
import shopping_image from "../../Assets/MyCart/Group 956.png";
import { useStateValue } from "../../store/state";

import axios from "axios";
import Constant from "../../Constant";

const Mycart = () => {
  const [{cart}] = useStateValue()
  const navigate = useNavigate()

  const addpendinginvoice = async() => {
    try {
      const pinvoice = await axios({
        method: 'post',
        url: `${Constant.baseUrl()}/cartToPendingInvoice`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        data: {
            "quote_id":cart[0]?.invoice?.Cart_id,
            "store_id":1
        }
      })
      navigate('/pending-invoice')
    } catch(e) {
      console.log(e)
    }
  }

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
      <MyCartTable cartDataList={cart} />

      <div className="my_cart_footer">
        <Button className="my_cart_bottom_button_shopping">
          <span>Continue Shopping</span>
        </Button>
        <Button className="my_cart_bottom_button_pending_invoice" onCLick={addpendinginvoice}>
          <span>Add To Pending Invoice</span>
        </Button>
      </div>
    </div>
  );
};

export default Mycart;
