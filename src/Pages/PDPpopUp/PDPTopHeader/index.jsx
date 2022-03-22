import React from "react";
import { Rating } from "@mui/material";
import { withStyles } from "@mui/styles";
import styles from "./styles";
import brand_logo from "../../../Assets/Productlist/Brand_icon.png";
import brand_tag from "../../../Assets/Productlist/Tag.png";
import SwitchUnstyled, {
  switchUnstyledClasses,
} from "@mui/base/SwitchUnstyled";
import { styled } from "@mui/system";

const PdpHeader = ({ classes, setPdpSellerData, pdpSellerData }) => {
  const label = { componentsProps: { input: { "aria-label": "Demo switch" } } };
  const [value, setValue] = React.useState(2);
  let {
    pdp_top_header_container,
    pdp_top_header_sub_container,
    pdp_page_brands_images_container,
    pdp_page_brands_images,
    pdp_brand_icon_1,
    pdp_brand_icon_2,
    pdp_toggle_switch_container,
    pdp_top_header_product_details,
    pdp_top_header_seller_id,
    pdp_top_header_products,
    pdp_top_header_product_name,
    pdp_top_header_rating_reviews_container,
    pdp_top_header_model_details,
    toggle_switch_sub_one,
    ratings,
    reviews,
    toggle_notification,
    toggle_switch_sub_two,
  } = classes;

  const grey = {
    400: "#BFC7CF",
    500: "#AAB4BE",
  };
  const Root = styled("span")`
    font-size: 0;
    position: relative;
    display: inline-block;
    width: 40px;
    height: 20px;
    margin: 10px;
    cursor: pointer;

    &.${switchUnstyledClasses.disabled} {
      opacity: 0.4;
      cursor: not-allowed;
    }

    & .${switchUnstyledClasses.track} {
      background: ${grey[400]};
      border-radius: 10px;
      display: block;
      height: 100%;
      width: 100%;
      position: absolute;
    }

    & .${switchUnstyledClasses.thumb} {
      display: block;
      width: 14px;
      height: 14px;
      top: 3px;
      left: 3px;
      border-radius: 16px;
      background-color: #fff;
      position: relative;
      transition: all 200ms ease;
    }

    &.${switchUnstyledClasses.focusVisible} .${switchUnstyledClasses.thumb} {
      background-color: ${grey[500]};
      box-shadow: 0 0 1px 8px rgba(0, 0, 0, 0.25);
    }

    &.${switchUnstyledClasses.checked} {
      .${switchUnstyledClasses.thumb} {
        left: 22px;
        top: 3px;
        background: linear-gradient(180deg, #20639b, #002d56);
      }

      .${switchUnstyledClasses.track} {
        background-color: ${grey[500]};
      }
    }

    & .${switchUnstyledClasses.input} {
      cursor: inherit;
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      opacity: 0;
      z-index: 1;
      margin: 0;
    }
  `;
  return (
    <div className={pdp_top_header_container}>
      <div className={pdp_page_brands_images_container}>
        <div className={pdp_page_brands_images}>
          <img className={pdp_brand_icon_1} src={brand_logo} alt="" />
          <img className={pdp_brand_icon_2} src={brand_tag} alt="" />
        </div>
      </div>
      <div className={pdp_top_header_sub_container}>
        <div className={pdp_top_header_product_details}>
          {pdpSellerData?.seller_id && (
            <p className={pdp_top_header_seller_id}>
              Seller ID :<span>{pdpSellerData?.seller_id} </span>
            </p>
          )}
          <div className={pdp_top_header_products}>
            <p className={pdp_top_header_product_name}>
              PAVILION MODEL14-DV0054TU
            </p>
            <div className={pdp_top_header_rating_reviews_container}>
              <Rating
                className={ratings}
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              />
              <p className={reviews}> 543 Reviews</p>
            </div>
          </div>

          <p className={pdp_top_header_model_details}>
            Hp 14-Dv0054Tu Pavilion Laptop (11Th Gen Intel Core I5-1135G7/…512Gb
            Sdd/Intel Iris Xe Graphics/Windows 10/Mso/Fhd), 35.56 Cm (14 Inch)
          </p>
        </div>
        <div className={pdp_toggle_switch_container}>
          <div className={toggle_switch_sub_one}>
            <SwitchUnstyled component={Root} {...label} defaultChecked />
            <span className={toggle_notification}>Notification</span>
          </div>

          <div className={toggle_switch_sub_two}>
            <p>*Get notified about the product’s offer & availability</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default withStyles(styles)(PdpHeader);
