import React, { useEffect, useState } from "react";
import { Modal, Button } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import { withStyles } from "@material-ui/styles";
import styles from "./styles";
import { Clear } from "@material-ui/icons";
import header_bottom_image_1 from "../../Assets/Productlist/warranty.png";
import header_bottom_image_2 from "../../Assets/Productlist/Delivery.png";
import header_bottom_image_3 from "../../Assets/Productlist/Retail.png";
import more_offer_image from "../../Assets/Productlist/Discount.png";
import add_whishlist from "../../Assets/CommonImage/add_wishlist.png";
import shopping_cart from "../../Assets/CommonImage/shopping-cart.png";
import PDPTopHeader from "./PDPTopHeader";
import invoice_image from "../../Assets/CommonImage/invoice.png";
import PDPTable from "./PDPTable";
import { table_one_data, table_two_data } from "./PDPTable/TableData";

const PdpPopup = ({ classes, PDPPopUP }) => {
  const [open, setOpen] = useState(true);
  const [moreOffers, setMoreOffers] = useState({ tableone: 3, tabletwo: 3 });
  const [tableData, setTableData] = useState({
    tableone: "",
    tabletwo: "",
  });
  let {
    section_main_container,
    section_main_sub_container,
    modal,
    clear_btn,
    pdp_header_bottom_container,
    header_bottom_image_container,
    modal_bottom_container,
    modal_bottom_image_container,
    modal_bottom_button_main,
    modal_bottom_button_add_to_cart,
    modal_bottom_button_pending_invoice,
    pdp_modal_footer,
    pdp_footer_model_details,
    pdp_footer_model_info,
    pdp_footer_model_info_detail,
    pdp_table_container,
    section_main_sub,
  } = classes;

  const handleClose = () => {
    setOpen(false);
    PDPPopUP(false);
  };
  useEffect(() => {
    let tempTable_one = table_one_data?.slice(0, moreOffers?.tableone);
    let tempTable_two = table_two_data?.slice(0, moreOffers?.tabletwo);
    setTableData({ tableone: tempTable_one, tabletwo: tempTable_two });
  }, [moreOffers]);
  const MoreOfferChange = () => {
    let table_one = table_one_data?.length;
    let table_two = table_two_data?.length;
    setMoreOffers({
      tableone: table_one,
      tabletwo: table_two,
      show_scroll: "show_scroll",
    });
  };
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={modal}
      open={open}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <div className={section_main_container}>
        <Clear className={clear_btn} onClick={() => handleClose()} />

        <div className={section_main_sub}>
          <div className={section_main_sub_container}>
            <PDPTopHeader />
            <div className={pdp_header_bottom_container}>
              <div className={header_bottom_image_container}>
                <img src={header_bottom_image_1} alt="" />
                <span>Vendor Warranty For 30 Days</span>
              </div>
              <div className={header_bottom_image_container}>
                <img src={header_bottom_image_2} alt="" />
                <span>Delivers In 5-7 Business Days</span>
              </div>
              <div className={header_bottom_image_container}>
                <img src={header_bottom_image_3} alt="" />
                <span>Retail Box Packaging</span>
              </div>
            </div>
          </div>
          <div className={pdp_table_container}>
            {tableData && <PDPTable tableData={tableData} />}
          </div>
          <div className={modal_bottom_container}>
            {(table_one_data?.length > 3 || table_two_data?.length > 3) && (
              <div
                className={modal_bottom_image_container}
                onClick={() => MoreOfferChange()}
              >
                <img src={more_offer_image} alt="" />
                <span>More Offers</span>
              </div>
            )}

            <div className={modal_bottom_image_container}>
              <img src={add_whishlist} alt="" />
              <span>Add to Wishlist</span>
            </div>
            <div className={modal_bottom_button_main}>
              <Button className={modal_bottom_button_add_to_cart}>
                <img src={shopping_cart} alt="" />
                <span>Add to Cart</span>
              </Button>
              <Button className={modal_bottom_button_pending_invoice}>
                <img width="21px" src={invoice_image} alt="" />
                <span> Add to Pending Invoice</span>
              </Button>
            </div>
          </div>
          <div className={pdp_modal_footer}>
            <div className={pdp_footer_model_details}>
              <span className={pdp_footer_model_info}>MODEL NAME</span>
              <span className={pdp_footer_model_info_detail}>
                Pavilion Model14-Dv0054Tu
              </span>
            </div>
            <div className={pdp_footer_model_details}>
              <span className={pdp_footer_model_info}>PART NUMBER</span>
              <span className={pdp_footer_model_info_detail}>1135G7</span>
            </div>
            <div className={pdp_footer_model_details}>
              <span className={pdp_footer_model_info}>CONDITION</span>
              <span className={pdp_footer_model_info_detail}>New</span>
            </div>
            <div className={pdp_footer_model_details}>
              <span className={pdp_footer_model_info}>OTHER INFO</span>
              <span className={pdp_footer_model_info_detail}>
                Not Available
              </span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default withStyles(styles)(PdpPopup);
