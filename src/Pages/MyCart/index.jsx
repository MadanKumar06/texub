import React, { useState, useEffect } from "react";
import "./styles.scss";
import { Stack, Button, Breadcrumbs, Typography } from "@mui/material";
import MyCartTable from "./MyCartTable";
import { Link, useNavigate } from "react-router-dom";
import shopping_image from "../../Assets/MyCart/Group 956.png";
import { useStateValue } from "../../store/state";
import { getAdminToken } from "../../utilities";
import AllertMessage from "../../Components/PendingInvoiceAlertPopup";
import axios from "axios";
import Constant from "../../Constant";
import swal from "sweetalert2";

const Mycart = () => {
  const [{ cart, geo, customnostore }, dispatch] = useStateValue();

  //API to fetch admin token
  const [adminToken, setAdminToken] = useState("");
  useEffect(() => {
    getAdminToken((res) => {
      setAdminToken(res);
    });
  }, []);

  const [allert, setallert] = useState(false);

  const AddpendingInvoiceAlert = (event) => {
    setallert(event);
  };
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
  const [rowselect, setrowselect] = useState([]);

  const [selecteddata, setselecteddata] = useState([]);

  useEffect(() => {
    if (rowselect?.length === 0) return;
    let temp = [];
    rowselect?.map((rs) => temp.push(cart[0]?.invoice_items[rs?.index]));
    setselecteddata(temp);
  }, [rowselect]);

  const isDataAdded = () => {
    if (cart?.[0]?.invoice_items?.length === 0 || cart?.length === 0) {
      return swal.fire({
        text: `No product to add pending invoice`,
        icon: "error",
        showConfirmButton: false,
        timer: 3000,
      });
    } else if (rowselect?.length === 0) {
      return swal.fire({
        text: `Select minimum one product to add to pending invoice`,
        icon: "error",
        showConfirmButton: false,
        timer: 3000,
      });
    }
    setallert(true);
  };
  const addpendinginvoice = async () => {
    setallert(false);
    if (
      rowselect?.length > 0 &&
      rowselect?.length !== cart[0]?.invoice_items?.length
    ) {
      dispatch({
        type: "SET_IS_LOADING",
        value: true,
      });
      let storedata = JSON.parse(localStorage.getItem("storedata"));
      let user = JSON.parse(localStorage.getItem("userdata"));
      let requests;
      requests = selecteddata?.map(async (sd) => {
        try {
          const selectedinvoice = await axios({
            method: "post",
            url: `${Constant?.baseUrl()}/addToPendingInvoice`,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            data: {
              pendingProducts: {
                store_id: storedata?.store_id,
                item_id: sd?.item_id,
                customer_id: user?.id,
                productId: sd?.product_id,
                price: sd?.price,
                qty: sd?.qty,
                hub: sd?.hub_id,
                currency: sd?.currency_id,
                sellerId: sd?.seller_id,
              },
            },
          });
          return Promise.resolve(selectedinvoice?.data?.[0]?.quote_id);
        } catch (e) {
          dispatch({
            type: "SET_IS_LOADING",
            value: false,
          });
        }
      });
      await Promise.all(requests).then((results) => {
        navigate(
          `/${
            customnostore ? customnostore : geo?.country_name
          }/pendinginvoice/${results?.[0]}`
        );
        dispatch({
          type: "CART__TRIGGER",
        });
        dispatch({
          type: "SET_IS_LOADING",
          value: false,
        });
      });
    } else {
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
          `/${
            customnostore ? customnostore : geo?.country_name
          }/pendinginvoice/${pinvoice?.data?.[0]?.quote_id}`
        );
        dispatch({
          type: "CART__TRIGGER",
        });
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

  let permissions = JSON.parse(localStorage.getItem("permissions"));
  let PendingInvoice =
    permissions?.length === 0
      ? false
      : permissions?.some(
          (per) =>
            per?.value === "can-add-to-pending-invoice" &&
            per?.permission_value === 0
        );

  const mergecart = async () => {
    let user = JSON.parse(localStorage.getItem("userdata"));
    try {
      dispatch({
        type: "SET_IS_LOADING",
        value: true,
      });
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
      dispatch({
        type: "SET_IS_LOADING",
        value: false,
      });
      if (postcart?.data?.[0].status) {
        swal.fire({
          text: `${postcart?.data?.[0].message}`,
          icon: "success",
          showConfirmButton: false,
          timer: 3000,
        });
      } else {
        swal.fire({
          text: `${postcart?.data?.[0].message}`,
          icon: "error",
          showConfirmButton: false,
          timer: 3000,
        });
      }
    } catch (e) {
      console.log(e);
      dispatch({
        type: "SET_IS_LOADING",
        value: false,
      });
    }
  };
  const approvecart = async () => {
    let user = JSON.parse(localStorage.getItem("userdata"));
    try {
      dispatch({
        type: "SET_IS_LOADING",
        value: true,
      });
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
      dispatch({
        type: "SET_IS_LOADING",
        value: false,
      });
      if (postcart?.data?.[0].status) {
        swal.fire({
          text: `${postcart?.data?.[0].message}`,
          icon: "success",
          showConfirmButton: false,
          timer: 3000,
        });
      } else {
        swal.fire({
          text: `${postcart?.data?.[0].message}`,
          icon: "error",
          showConfirmButton: false,
          timer: 3000,
        });
      }
    } catch (e) {
      console.log(e);
      dispatch({
        type: "SET_IS_LOADING",
        value: false,
      });
    }
  };
  const handleOnNavigate = () => {
    navigate(`/${customnostore ? customnostore : geo?.country_name}/products`);
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
      <MyCartTable
        cartDataList={cart}
        deleteCartData={deleteCartData}
        setrowselect={setrowselect}
      />

      <div className="my_cart_footer">
        <Button
          className="my_cart_bottom_button_shopping"
          onClick={() => handleOnNavigate()}
        >
          Continue Shopping
        </Button>
        {userpermission && cart?.[0]?.invoice_items?.length ? (
          <Button
            className="my_cart_bottom_button_pending_invoice"
            onClick={() => mergecart()}
          >
            <span>Merge Cart</span>
          </Button>
        ) : (
          ""
        )}
        {approvepermission && cart?.[0]?.invoice_items?.length ? (
          <Button
            className="my_cart_bottom_button_pending_invoice"
            onClick={() => approvecart()}
          >
            <span>Request for Approval</span>
          </Button>
        ) : (
          ""
        )}
        {!PendingInvoice ? (
          <Button
            className="my_cart_bottom_button_pending_invoice"
            onClick={() => isDataAdded()}
          >
            <span>Add To Pending Invoice</span>
          </Button>
        ) : (
          ""
        )}
      </div>
      {allert && (
        <AllertMessage
          AddpendingInvoiceAlert={AddpendingInvoiceAlert}
          handleIsValidUser={addpendinginvoice}
        />
      )}
    </div>
  );
};

export default Mycart;
