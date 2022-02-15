const styles = () => ({
  table_container: {
    padding: "0 29px 0",
  },
  pdp_middle_wapper: {
    width: "85%",
    margin: "auto",
    "@media (max-width:1110px) and (min-width:320px)": {
      width: "100%",
    },
  },
  table_title_container: {
    display: "none",
    "@media (max-width:767px)": {
      display: "block !important",
      borderRadius: "4px",
      backgroundColor: "#CDD5DD !important",
    },
  },
  sub_table_title: {
    "@media (max-width:767px)": {
      padding: "10px",
      letterSpacing: "0.59px",
      color: "#5C6369",
      fontSize: "14px",
      fontWeight: "600",
      textAlign: "center",
    },
  },
  seller_price_title: {
    letterSpacing: "0.6px",
    color: "#DDB363",
    textTransform: "capitalize",
    padding: "10px 0px",
    fontSize: "20px",
    "@media (max-width:1599px) and (min-width:1439px)": {
      fontSize: "16px",
    },
    "@media (max-width:1439px) and (min-width:320px)": {
      fontSize: "14px",
    },
  },
  seller_price_list_view: {
    listStyleType: "none",
    margin: "0",
    paddingLeft: "0",
    height: "63vh",
    overflowX: "auto",
  },
  seller: {
    position: "absolute",
    bottom: "10px",
    right: "31px",
    fontSize: "20px",
    fontFamily: "'source sans pro'",
    fontWeight: "600",
    color: "#5C6369",
    "@media (max-width:1599px) and (min-width:1439px)": {
      fontSize: "16px",
    },
    "@media (max-width:1439px) and (min-width:320px)": {
      fontSize: "14px",
    },
  },
  price_list: {
    position: "inherit",
    display: "table",
    width: "100%",
    textAlign: "center",
    margin: "3px 0px",
    "@media (max-width:767px)": {
      background: "#F5F5F5",
      borderRadius: "3px",
      padding: "5px 0",
      margin: "2px 0px",
      display: "block",
      textAlign: "left",
    },
  },
  title_block: {
    borderRadius: "4px",
    backgroundColor: "#CDD5DD !important",
    "@media (max-width:767px)": {
      display: "none",
    },
  },
  price_list_info: {
    display: "table-row",
    margin: "0px",
    "@media (max-width:767px)": {
      display: "flex",
      margin: "0px",
      flexWrap: "wrap",
    },
  },
  price_list_action: {
    display: "table-cell",
    verticalAlign: "middle",
    width: "4%",
    padding: "10px 5px",
    fontSize: "20px",
    "@media (max-width:1599px) and (min-width:1439px)": {
      fontSize: "16px",
    },
    "@media (max-width:1439px) and (min-width:320px)": {
      fontSize: "14px",
    },
    "@media (max-width:767px)": {
      maxWidth: "100%",
      padding: "0px 10px",
      width: "100%",
    },
  },
  title: {
    padding: "9px 5px !important",
    textAlign: "center",
    fontSize: "20px",
    fontWeight: "600",
    letterSpacing: "0px",
    color: "#333C42 !important",
    textTransform: "capitalize",
    "@media (max-width:1599px) and (min-width:1439px)": {
      fontSize: "16px",
    },
    "@media (max-width:1439px) and (min-width:320px)": {
      fontSize: "14px",
    },
  },
  price_list_seller: {
    display: "table-cell",
    verticalAlign: "middle",
    width: "15%",
    padding: "5px",
    letterSpacing: "0.59px",
    color: "#5C6369",
    fontSize: "20px",
    "@media (max-width:1599px) and (min-width:1439px)": {
      fontSize: "16px",
    },
    "@media (max-width:1439px) and (min-width:320px)": {
      fontSize: "14px",
    },
    "@media (max-width:767px)": {
      maxWidth: "100%",
      wordBreak: "break-all",
      width: "100%",
      "&::before": {
        content: '"seller ID : "',
        fontWeight: "800",
      },
    },
  },
  price_list_eta: {
    display: "table-cell",
    verticalAlign: "middle",
    width: "15%",
    padding: "5px",
    letterSpacing: "0.59px",
    color: "#5C6369",
    fontSize: "20px",
    "@media (max-width:1599px) and (min-width:1439px)": {
      fontSize: "16px",
    },
    "@media (max-width:1439px) and (min-width:320px)": {
      fontSize: "14px",
    },
    "@media (max-width:767px)": {
      maxWidth: "100%",
      wordBreak: "break-all",
      width: "100%",
      "&::before": {
        content: '"ETA : "',
        fontWeight: "800",
      },
    },
  },
  price_list_price: {
    display: "table-cell",
    verticalAlign: "middle",
    width: "15%",
    padding: "5px",
    letterSpacing: "0.59px",
    color: "#5C6369",
    fontSize: "20px",
    "@media (max-width:1599px) and (min-width:1439px)": {
      fontSize: "16px",
    },
    "@media (max-width:1439px) and (min-width:320px)": {
      fontSize: "14px",
    },
    "@media (max-width:767px)": {
      maxWidth: "100%",
      wordBreak: "break-all",
      width: "100%",
      "&::before": {
        content: '"Price/Unit : "',
        fontWeight: "800",
      },
    },
  },
  price_list_stock: {
    display: "table-cell",
    verticalAlign: "middle",
    width: "15%",
    padding: "5px",
    letterSpacing: "0.59px",
    color: "#5C6369",
    fontSize: "20px",
    "@media (max-width:1599px) and (min-width:1439px)": {
      fontSize: "16px",
    },
    "@media (max-width:1439px) and (min-width:320px)": {
      fontSize: "14px",
    },
    "@media (max-width:767px)": {
      maxWidth: "100%",
      wordBreak: "break-all",
      width: "100%",
      "&::before": {
        content: '"InStock : "',
        fontWeight: "800",
      },
    },
  },
  seller_stock_value: {
    fontSize: "24px",
    "@media (max-width:1599px) and (min-width:1439px)": {
      fontSize: "18px",
    },
    "@media (max-width:1439px) and (min-width:320px)": {
      fontSize: "16px",
    },
  },
  seller_eta_value: {
    fontSize: "24px",
    "@media (max-width:1599px) and (min-width:1439px)": {
      fontSize: "18px",
    },
    "@media (max-width:1439px) and (min-width:320px)": {
      fontSize: "16px",
    },
  },
  price_list_hub: {
    display: "table-cell",
    verticalAlign: "middle",
    width: "15%",
    padding: "5px",
    letterSpacing: "0.59px",
    color: "#5C6369",
    fontSize: "20px",
    "@media (max-width:1599px) and (min-width:1439px)": {
      fontSize: "16px",
    },
    "@media (max-width:1439px) and (min-width:320px)": {
      fontSize: "14px",
    },
    "@media (max-width:767px)": {
      maxWidth: "100%",
      alignItems: "center",
      display: "flex",
      width: "100%",
      wordBreak: "break-all",
      "&::before": {
        content: '"Hub : "',
        fontWeight: "800",
        marginRight: "5px",
      },
    },
  },
  price_list_moq: {
    display: "table-cell",
    verticalAlign: "middle",
    width: "15%",
    padding: "5px",
    fontSize: "20px",
    "@media (max-width:1599px) and (min-width:1439px)": {
      fontSize: "16px",
    },
    "@media (max-width:1439px) and (min-width:320px)": {
      fontSize: "14px",
    },
    "@media (max-width:767px)": {
      alignItems: "center",
      display: "flex",
      width: "100%",
      wordBreak: "break-all",
      "&::before": {
        content: '"MOQ : "',
        fontWeight: "800",
        marginRight: "5px",
      },
    },
  },
  price_list_hubblk: {
    border: "1px solid #D6D8D9",
    borderRadius: "25px",
    padding: "4px",
    textAlign: "center",
    cursor: "pointer",

    "@media (max-width:767px)": {
      border: "none",
      textAlign: "left",
      padding: "0px",
    },
  },
  qty_change: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    border: "1px solid #D6D8D9",
    width: "100%",
    padding: "1px 1px",
    borderRadius: "25px",

    "@media (max-width:767px)": {
      maxWidth: "35%",
    },
    "@media (max-width: 425px)": {
      maxWidth: "56%",
    },
  },
  item_decrease: {
    width: "24px",
    height: "25px",
    backgroundColor: "#CDD5DD",
    border: "none",
    fill: "#ffffff !important",
    borderRadius: "50%",
    fontWeight: "bolder",
    fontSize: "0",
    cursor: "pointer",
  },
  item_increase: {
    width: "24px",
    height: "25px",
    backgroundColor: "#002D56",
    border: "none",
    fill: "#ffffff !important",
    borderRadius: "50%",
    fontWeight: "bolder",
    fontSize: "0",
    cursor: "pointer",
  },
  input_text: {
    width: "54px",
    textAlign: "center",
    fontSize: "24px",
    fontWeight: "600",
    "@media (max-width:1599px) and (min-width:1439px)": {
      fontSize: "18px",
    },
    "@media (max-width:1439px) and (min-width:320px)": {
      fontSize: "16px",
    },
    "@media (max-width:1200px) and (min-width:320px)": {
      width: "38px",
    },
  },
  radio_btn_group: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    margin: "0",
  },
  radio_button: {
    color: "#002D56 !important",
  },
  list_action_input: {
    position: "relative",
    "& .MuiFormControlLabel-root": {
      margin: "0",
      "& .MuiRadio-root": {
        padding: "0",
        "@media (max-width:767px)": {
          position: "absolute",
          top: "0",
          right: "0",
          padding: "13px",
        },
      },
    },
  },
  price_indicator: {
    fontSize: "20px",
    marginRight: "5px",
    "@media (max-width:1599px) and (min-width:1439px)": {
      fontSize: "16px",
    },
    "@media (max-width:1439px) and (min-width:320px)": {
      fontSize: "14px",
    },
  },
  price_value: {
    fontSize: "30px",
    "@media (max-width:1599px) and (min-width:1439px)": {
      fontSize: "16px",
    },
    "@media (max-width:1439px) and (min-width:320px)": {
      fontSize: "14px",
    },
  },
});
export default styles;
