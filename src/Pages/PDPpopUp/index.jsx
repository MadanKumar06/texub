import React, { useEffect, useState } from "react";
import { Modal, Button, Backdrop } from "@mui/material";
import "./styles.scss";
import { Clear } from "@mui/icons-material";
import PDPTopHeader from "./PDPTopHeader";
import PDPTable from "./PDPTable";
import { useNavigate } from "react-router-dom";
import { table_two_data } from "./PDPTable/TableData";
import { useStateValue } from "../../store/state";
import Constant from "../../Constant";
import axios from "axios";

import header_bottom_image_1 from "../../Assets/Productlist/warranty.png";
import header_bottom_image_2 from "../../Assets/Productlist/Delivery.png";
import header_bottom_image_3 from "../../Assets/Productlist/Retail.png";
import more_offer_image from "../../Assets/Productlist/Discount.png";
import add_whishlist from "../../Assets/CommonImage/add_wishlist.png";
import shopping_cart from "../../Assets/CommonImage/shopping-cart.png";
import invoice_image from "../../Assets/CommonImage/invoice.png";

const PdpPopup = () => {
  const [open, setOpen] = useState(true);
  const history = useNavigate();
  const [{ pdpPopUpOpenClose }, dispatch] = useStateValue();
  const [moreOffers, setMoreOffers] = useState({ tableone: 3, tabletwo: 3 });
  const [tableData, setTableData] = useState({
    tableone: "",
    tabletwo: "",
  });
  const [pdpSellerData, setPdpSellerData] = useState({});
  const handleClose = () => {
    setOpen(false);
    dispatch({
      type: "SET_PDP_POPUP_OPEN_CLOSE",
      value: false,
    });
  };
  const handleRouteOnButtonClick = (event) => {
    dispatch({
      type: "SET_PDP_POPUP_OPEN_CLOSE",
      value: false,
    });
    if (event === "add_to_cart") {
      setTimeout(() => {
        history("/mycart");
      }, 1000 / 2);
    } else {
      setTimeout(() => {
        history("/pending-invoice");
      }, 1000 / 2);
    }
  };
  useEffect(() => {
    if (pdpPopUpOpenClose?.data?.tableData?.[0]?.sub_products?.length) {
      let sortData = pdpPopUpOpenClose?.data?.tableData?.[0]?.sub_products.sort(
        (a, b) => (a.price > b.price ? 1 : -1)
      );
      console.log(sortData);
      let tempTable_one = sortData?.slice(0, moreOffers?.tableone);
      let tempTable_two = table_two_data?.slice(0, moreOffers?.tabletwo);
      setTableData({ tableone: tempTable_one, tabletwo: tempTable_two });
    }
  }, [moreOffers]);
  const MoreOfferChange = () => {
    let table_one =
      pdpPopUpOpenClose?.data?.tableData?.[0]?.sub_products?.length;
    let table_two = table_two_data?.length;
    setMoreOffers({
      tableone: table_one,
      tabletwo: table_two,
      show_scroll: "show_scroll",
    });
  };

  //APi call to addtocart
  const AddToCart = () => {
    debugger;
    console.log(pdpSellerData);
    const data = async () => {
      const user = JSON.parse(localStorage.getItem("userdata"));
      try {
        const formdata = await axios({
          method: "post",
          url: `${Constant.baseUrl()}/addToCart`,
          data: {
            pendingProducts: {
              customer_id: user?.id,
              productId: pdpSellerData?.event?.main_product_id,
              price: pdpSellerData?.event?.price,
              qty: pdpSellerData?.event?.moq,
              hub: pdpSellerData?.event?.hub_id,
              currency: pdpSellerData?.event?.currency_id,
              sellerId: user?.id,
            },
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
      } catch (e) {
        console.log(e);
      }
    };
    data();
  };
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className="pdp_modal"
      open={open}
      closeAfterTransition
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
                <span>Delivers In 5-7 Business Days</span>
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
                pdpSellerData={pdpSellerData}
                setPdpSellerData={setPdpSellerData}
                dataFromPLP={pdpPopUpOpenClose?.data}
              />
            )}
          </div>
          <div className="modal_bottom_container">
            {(pdpPopUpOpenClose?.data?.tableData?.length > 3 ||
              table_two_data?.length > 3) && (
              <div
                className="modal_bottom_image_container"
                onClick={() => MoreOfferChange()}
              >
                <img src={more_offer_image} alt="" />
                <span>More Offers</span>
              </div>
            )}

            <div className="modal_bottom_image_container">
              <img src={add_whishlist} alt="" />
              <span>Add to Wishlist</span>
            </div>
            <div className="modal_bottom_button_main">
              <Button
                className="modal_bottom_button_add_to_cart"
                // onClick={() => handleRouteOnButtonClick("add_to_cart")}
                onClick={() => AddToCart()}
              >
                <img src={shopping_cart} alt="" />
                <span>Add to Cart</span>
              </Button>
              <Button
                className="modal_bottom_button_pending_invoice"
                onClick={() => handleRouteOnButtonClick("pending_invoice")}
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
                Pavilion Model14-Dv0054Tu
              </span>
            </div>
            <div className="pdp_footer_model_details">
              <span className="pdp_footer_model_info">PART NUMBER</span>
              <span className="pdp_footer_model_info_detail">1135G7</span>
            </div>
            <div className="pdp_footer_model_details">
              <span className="pdp_footer_model_info">CONDITION</span>
              <span className="pdp_footer_model_info_detail">New</span>
            </div>
            <div className="pdp_footer_model_details">
              <span className="pdp_footer_model_info">OTHER INFO</span>
              <span className="pdp_footer_model_info_detail">
                Not Available
              </span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default PdpPopup;
