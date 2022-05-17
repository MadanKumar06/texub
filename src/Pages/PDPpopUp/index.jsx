import React, { useEffect, useRef, useState } from "react";
import { Modal, Button, Backdrop } from "@mui/material";
import "./styles.scss";
import { Clear } from "@mui/icons-material";
import PDPTopHeader from "./PDPTopHeader";
import PDPTable from "./PDPTable";
import { table_two_data } from "./PDPTable/TableData";
import { useStateValue } from "../../store/state";
import Constant from "../../Constant";
import axios from "axios";
import swal from "sweetalert2";
import Wishlist from "./Wishlist";
import AllertMessage from "../../Components/PendingInvoiceAlertPopup";

import header_bottom_image_1 from "../../Assets/Productlist/warranty.png";
import header_bottom_image_2 from "../../Assets/Productlist/Delivery.png";
import header_bottom_image_3 from "../../Assets/Productlist/Retail.png";
import more_offer_image from "../../Assets/Productlist/Discount.png";
import add_whishlist from "../../Assets/CommonImage/add_wishlist.png";
import shopping_cart from "../../Assets/CommonImage/shopping-cart.png";
import invoice_image from "../../Assets/CommonImage/invoice.png";

const PdpPopup = () => {
  const [open, setOpen] = useState(true);
  let detailsData = useRef();
  const [{ pdpPopUpOpenClose }, dispatch] = useStateValue();
  const [moreOffers, setMoreOffers] = useState({ tableone: 3, tabletwo: 0 });
  const [tableData, setTableData] = useState({
    tableone: "",
    tabletwo: "",
  });
  const [pdpSellerData, setPdpSellerData] = useState({});
  const handleClose = (event, reason) => {
    if (reason && reason === "backdropClick") return;
    else {
      setOpen(false);
      dispatch({
        type: "SET_PDP_POPUP_OPEN_CLOSE",
        value: false,
      });
    }
  };

  useEffect(() => {
    if (pdpPopUpOpenClose?.data?.CartData?.length) {
      let temp = pdpPopUpOpenClose?.data?.CartData?.[0]?.sub_products?.filter(
        (itm) => itm?.product_id === pdpPopUpOpenClose?.data?.product_id
      );
      setPdpSellerData((prev) => ({
        ...prev,
        ...pdpPopUpOpenClose?.data?.CartData?.[0]?.main_product,
      }));
      setTableData({ tableone: temp, tabletwo: "" });
    }
    if (pdpPopUpOpenClose?.data?.tableData?.length) {
      detailsData.current = pdpPopUpOpenClose?.data?.tableData?.filter(
        (itm) =>
          itm?.main_product?.main_product_id === pdpPopUpOpenClose?.data?.event
      );
      setPdpSellerData((prev) => ({
        ...prev,
        ...detailsData?.current?.[0]?.main_product,
      }));
      let sortData = detailsData?.current?.[0]?.sub_products.sort((a, b) =>
        a.price > b.price ? 1 : -1
      );
      let tempTable_one = sortData?.slice(0, moreOffers?.tableone);
      // let tempTable_two = table_two_data?.slice(0, moreOffers?.tabletwo);
      setTableData({ tableone: tempTable_one, tabletwo: "" });
    }
  }, [moreOffers]);

  const MoreOfferChange = () => {
    // let table_one =
    //   pdpPopUpOpenClose?.data?.tableData?.[0]?.sub_products?.length;
    // let table_two = table_two_data?.length;
    debugger;
    setMoreOffers({
      tableone: detailsData?.current?.[0]?.sub_products?.length,
      tabletwo: "",
      show_scroll: "show_scroll",
    });
  };

  const handleIsValidUser = async (event) => {
    //pending invoice acknowledgement useState
    let isDataValid = user?.custom_attributes?.filter(
      (itm) => itm?.attribute_code === "kyc_status"
    );
    let isValidUser = JSON.parse(localStorage.getItem("userdata"))?.group_id;
    if (isValidUser === 5) {
      if (isDataValid[0]?.value === "2") {
        let temp =
          event === "add_to_cart"
            ? AddToCartAndPendingInvoice("add_to_cart")
            : event === "pending_invoice"
            ? setallert(true)
            : event === "add_to_wishlist"
            ? list("add_to_wishlist")
            : "";
      } else {
        swal.fire({
          text: `Your account is not yet activated, so kindly visit again once you receive
          the account activation email.`,
          icon: "error",
          showConfirmButton: true,
        });
      }
    } else {
      swal.fire({
        text: `${
          event === "add_to_cart"
            ? "Login as a buyer to add cart"
            : event === "add_to_wishlist"
            ? "Login as a buyer to add wishlist"
            : "Login as a buyer to add pending invoice"
        }`,
        icon: "error",
        showConfirmButton: false,
        timer: 3000,
      });
    }
  };

  const list = (event) => {
    let permissions = JSON.parse(localStorage.getItem("permissions"));
    let isValidUser = JSON.parse(localStorage.getItem("userdata"))?.group_id;
    if (isValidUser === 5) {
      let wishpermission =
        permissions?.length === 0
          ? false
          : permissions?.some(
              (per) =>
                per?.value === "can-add-to-multiple-wishlist" &&
                per?.permission_value === 0
            );
      if (wishpermission) {
        swal.fire({
          text: `Your Account doesn't have access to add products to wishlist`,
          icon: "error",
          showConfirmButton: true,
        });
      } else {
        setopenwishlist({ open: true });
      }
    }
  };
  //APi call to addtocart
  const user = JSON.parse(localStorage.getItem("userdata"));
  const AddToCartAndPendingInvoice = (info) => {
    setallert(false);
    let permissions = JSON.parse(localStorage.getItem("permissions"));
    let isValidUser = JSON.parse(localStorage.getItem("userdata"))?.group_id;
    if (isValidUser === 5) {
      if (info === "add_to_cart") {
        let cartpermission =
          permissions?.length === 0
            ? false
            : permissions?.some(
                (per) =>
                  per?.value === "can-add-to-cart" &&
                  per?.permission_value === 0
              );
        if (cartpermission) {
          swal.fire({
            text: `Your Account doesn't have access to add products to the cart`,
            icon: "error",
            showConfirmButton: true,
          });
        } else {
          handleApiCall("add_to_cart");
        }
      }
      if (info?.info === "pending_invoice" || info === "pending_invoice") {
        let pendingpermission =
          permissions?.length === 0
            ? false
            : permissions?.some(
                (per) =>
                  per?.value === "can-add-to-pending-invoice" &&
                  per?.permission_value === 0
              );
        if (pendingpermission) {
          swal.fire({
            text: `Your Account doesn't have access to add products to Pending Invoice`,
            icon: "error",
            showConfirmButton: true,
          });
        } else {
          handleApiCall("pending_invoice");
        }
      }
    }
  };
  const handleApiCall = (info) => {
    let storedata = JSON.parse(localStorage.getItem("storedata"));
    let isUserAddData = pdpSellerData?.is_table_one?.filter(
      (itm) => itm?.product_id === pdpSellerData?.product_id
    );

    dispatch({
      type: "SET_IS_LOADING",
      value: true,
    });
    let data = {
      pendingProducts: {
        store_id: storedata?.store_id,
        item_id: "0",
        customer_id: user?.id,
        productId: isUserAddData?.[0]?.product_id,
        price: isUserAddData?.[0]?.price,
        qty: isUserAddData?.[0]?.moq,
        hub: isUserAddData?.[0]?.hub_id,
        currency: isUserAddData?.[0]?.currency_id,
        sellerId: isUserAddData?.[0]?.seller_id,
      },
    };
    axios
      .post(
        `${Constant.baseUrl()}${
          info === "add_to_cart" ? `/addToCart` : `/addToPendingInvoice`
        }`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        dispatch({
          type: "SET_IS_LOADING",
          value: false,
        });
        if (res?.data?.[0]?.status) {
          swal.fire({
            text: `${res.data?.[0]?.message}`,
            icon: "success",
            showConfirmButton: false,
            timer: 3000,
          });
          // dispatch({
          //   type: "SET_PDP_POPUP_OPEN_CLOSE",
          //   value: false,
          // });
          dispatch({
            type: "CART__TRIGGER",
          });
        } else {
          swal.fire({
            text: `${res.data?.[0]?.message}`,
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
  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }
  const [allert, setallert] = useState(false);

  const [openwishlist, setopenwishlist] = useState({ open: false });

  const handleOpenClose = (event) => {
    setopenwishlist({ open: event });
  };

  const AddpendingInvoiceAlert = (event) => {
    setallert(event);
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className="pdp_modal"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      disableRestoreFocus={true}
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <div className="section_main_container">
        <Clear className="clear_btn" onClick={() => handleClose()} />

        <div className="section_main_sub">
          <div className="section_main_sub_container">
            <PDPTopHeader
              setPdpSellerData={setPdpSellerData}
              pdpSellerData={pdpSellerData}
              dataFromPLP={pdpPopUpOpenClose?.data}
            />
            <div className="pdp_header_bottom_container">
              <div className="header_bottom_image_container">
                <img src={header_bottom_image_1} alt="" />
                <span>
                  Vendor Warranty For {pdpSellerData?.warranty_days} Days
                </span>
              </div>
              <div className="header_bottom_image_container">
                <img src={header_bottom_image_2} alt="" />
                <p>
                  <span>4.5/</span>
                  <small>5</small>
                </p>
                <span>Seller Score</span>
              </div>
              <div className="header_bottom_image_container">
                <img src={header_bottom_image_3} alt="" />
                <span> {pdpSellerData?.packing_details}</span>:{" "}
                <span> {pdpSellerData?.no_of_pieces} No of pieces</span>
              </div>
            </div>
          </div>
          <div className="pdp_table_container">
            {tableData && (
              <PDPTable
                tableData={tableData}
                setPdpSellerData={setPdpSellerData}
              />
            )}
          </div>
          <div className="modal_bottom_container">
            {detailsData?.current?.[0]?.sub_products?.length > 3 ? (
              <div
                className="modal_bottom_image_container"
                onClick={() => MoreOfferChange()}
              >
                <img src={more_offer_image} alt="" />
                <span>More Offers</span>
              </div>
            ) : (
              ""
            )}

            <div
              className="modal_bottom_image_container"
              onClick={() => handleIsValidUser("add_to_wishlist")}
            >
              <img src={add_whishlist} alt="" />
              <span>Add to Wishlist</span>
            </div>
            {openwishlist?.open && (
              <Wishlist
                dataFromPLP={pdpPopUpOpenClose?.data}
                pdpSellerData={pdpSellerData}
                handleOpenClose={handleOpenClose}
              />
            )}
            <div className="modal_bottom_button_main">
              <Button
                className="modal_bottom_button_add_to_cart"
                // onClick={() => handleRouteOnButtonClick("add_to_cart")}
                onClick={() => handleIsValidUser("add_to_cart")}
              >
                <img src={shopping_cart} alt="" />
                <span>Add to Cart</span>
              </Button>
              <Button
                className="modal_bottom_button_pending_invoice"
                onClick={() => handleIsValidUser("pending_invoice")}
              >
                <img width="21px" src={invoice_image} alt="" />
                <span> Add to Pending Invoice</span>
              </Button>
            </div>
          </div>
          <div className="pdp_modal_footer">
            <div className="pdp_footer_model_details">
              <span className="pdp_footer_model_info">MODEL NAME</span>
              <span className="pdp_footer_model_info_detail">
                {pdpSellerData?.model_number}
              </span>
            </div>
            <div className="pdp_footer_model_details">
              <span className="pdp_footer_model_info">PART NUMBER</span>
              <span className="pdp_footer_model_info_detail">
                {" "}
                {pdpSellerData?.part_number}
              </span>
            </div>
            {/* <div className="pdp_footer_model_details">
              <span className="pdp_footer_model_info">HUB</span>
              <span className="pdp_footer_model_info_detail">
                {" "}
                {pdpSellerData?.hub}
              </span>
            </div> */}
            <div className="pdp_footer_model_details">
              <span className="pdp_footer_model_info">CONDITION</span>
              <span className="pdp_footer_model_info_detail">
                {" "}
                {pdpSellerData?.condition}
              </span>
            </div>
            <div className="pdp_footer_model_details">
              <span className="pdp_footer_model_info">OTHER INFO</span>
              <span className="pdp_footer_model_info_detail">
                {truncate(pdpSellerData.other_info, 30)}
              </span>
            </div>
          </div>
        </div>
        {allert && (
          <AllertMessage
            AddpendingInvoiceAlert={AddpendingInvoiceAlert}
            handleIsValidUser={AddToCartAndPendingInvoice}
          />
        )}
      </div>
    </Modal>
  );
};
export default PdpPopup;
