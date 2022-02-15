const styles = (theme) => ({
  pdp_top_header_container: {
    width: "calc(100% - 105px)",
    marginLeft: "105px",
    display: "flex",
    "@media (max-width:767px)": {
      width: "100%",
      marginLeft: "0",
      flexDirection: "column",
    },
  },
  pdp_page_brands_images_container: {
    "@media (max-width:767px)": {
      display: "flex",
      width: "100%",
      justifyContent: "center",
    },
  },
  pdp_top_header_sub_container: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    "@media (max-width:1439px)": {
      flexDirection: "column",
    },
  },
  pdp_page_brands_images: {
    width: "128px",
    height: "128px",
    display: "flex",
    position: "relative",
    alignItems: "end",
    "@media (max-width:767px)": {
      width: "unset",
      height: "unset",
      margin: "15px 0",
    },
  },
  pdp_brand_icon_1: {
    width: "80px",
  },
  pdp_brand_icon_2: {
    width: "63px",
    position: "absolute",
    bottom: "51px",
    left: "37px",
  },
  pdp_toggle_switch_container: {
    width: "30%",
    display: "flex",
    flexDirection: "column",
    "@media (max-width:1439px)": {
      width: "100%",
      padding: "0px 22px",
    },
  },
  pdp_top_header_product_details: {
    padding: "0px 22px",
  },
  pdp_top_header_seller_id: {
    background: "#F8F0E0",
    padding: "4px 19px",
    width: "fit-content",
    color: "#002D56",
    margin: "0",
    fontSize: "18px",
    "@media (max-width:1600px) and (min-width:1439px)": {
      fontSize: "16px",
    },
    "@media (max-width:1439px) and (min-width:320px)": {
      fontSize: "14px",
    },
  },
  pdp_top_header_products: {
    display: "flex",
    width: "80%",
    justifyContent: "space-between",
    flexDirection: "row",
    "@media (max-width:1439px)": {
      flexDirection: "column",
    },
    "@media (max-width:767px)": {
      width: "100%",
    },
  },
  pdp_top_header_product_name: {
    fontSize: "26px",
    margin: "0",
    padding: "11px 0px",
    letterSpacing: "1px",
    "@media (max-width:1599px) and (min-width:1439px)": {
      fontSize: "24px",
    },
    "@media (max-width:1439px) and (min-width:320px)": {
      fontSize: "20px",
    },
  },
  pdp_top_header_rating_reviews_container: {
    display: "flex",
    gap: "10px",
  },
  ratings: {
    alignItems: "center",
    "& label": {
      color: "#DDB363",
    },
  },
  reviews: {
    fontSize: "18px",
    color: "#DDB363",
    margin: "auto !important",
    textDecoration: "underline",
    "@media (max-width:1439px)": {
      margin: "0 !important",
      padding: "5px",
    },
  },
  pdp_top_header_model_details: {
    margin: "0",
    padding: "2px 0",
    color: "#333C42",
    width: "80%",
    fontWeight: "600",
    letterSpacing: "1px",
    fontSize: "20px",
    "@media (max-width:1439px)": {
      width: "100%",
    },
    "@media (max-width:1599px) and (min-width:1439px)": {
      fontSize: "16px",
    },
    "@media (max-width:1439px) and (min-width:320px)": {
      fontSize: "14px",
    },
  },
  toggle_switch_sub_one: {
    alignItems: "center",
    display: "flex",
    width: "100%",
    "@media (max-width:1439px)": {
      gap: "10px",
      "& .MuiSwitch-root": {
        margin: "10px 0 !important",
      },
    },
  },
  toggle_notification: {
    fontSize: "18px",
    fontWeight: "600",
    "@media (max-width:1439px) and (min-width:320px)": {
      fontSize: "14px",
    },
  },
  toggle_switch_sub_two: {
    fontSize: "12px",
    color: "#858A8E",
    "& p": {
      "@media (max-width:1439px)": {
        margin: "0 !important",
      },
    },
  },
});
export default styles;
