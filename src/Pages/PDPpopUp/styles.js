const styles = (theme) => ({
  section_main_container: {
    background: "#ffffff",
    zIndex: "1",
    display: "flex",
    width: "100%",
    flexDirection: "column",
    position: "relative",
    height: "80vh",
  },
  section_main_sub: {
    height: "80vh",
    overflowX: "auto",
  },
  section_main_sub_container: {
    backgroundImage: "url('Images/Group 87.png')",
    backgroundRepeat: "no-repeat",
    padding: "29px 29px 0",
    "@media (max-width:767px)": {
      backgroundImage: "none",
      padding: "29px 18px 0",
    },
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "8%",
  },
  clear_btn: {
    position: "absolute",
    top: "-37px",
    right: "-42px",
    cursor: "pointer",
    background: "#ffffff",
    color: "#002D56",
    borderRadius: "3px",
    width: "1.5em !important",
    height: "1.5em !important",
    "@media (max-width:1441px)": {
      top: "-28px",
      right: "-33px",
      width: "1em !important",
      height: "1em !important",
    },
    "@media (max-width:480px)": {
      top: "-26px",
      right: "-22px",
    },
  },
  pdp_header_bottom_container: {
    display: "flex",
    gap: "20px",
    justifyContent: "center",
    padding: "30px 0px",
    borderBottom: "1px solid #cccccc",
    "& span": {
      fontSize: "16px",
    },
    "@media (max-width: 767px)": {
      gap: "15px",
      flexWrap: "wrap",
    },
  },
  header_bottom_image_container: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    "& span": {
      color: "#333C42",
      letterSpacing: "0.48px",
    },
  },
  modal_bottom_container: {
    display: "flex",
    justifyContent: "end",
    gap: "32px",
    padding: "29px",
    width: "85%",
    margin: "auto",
    "& span": {
      cursor: "pointer",
    },
    "@media(max-width:1300px)": {
      width: "100%",
    },
    "@media(max-width:1080px)": {
      gap: "20px",
    },
    "@media(max-width:965px)": {
      flexDirection: "column",
      alignItems: "center",
    },
    "@media (max-width: 767px)": {
      justifyContent: "center",
      flexWrap: "wrap",
      gap: "16px",
      width: "100%",
    },
    "@media(max-width:425px)": {
      padding: "10px",
    },
  },
  modal_bottom_image_container: {
    textDecoration: "underline",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "18px",
    color: "#002D56",
    fontWeight: "600",
    "@media(max-width:926px)": {
      fontSize: "16px",
    },
  },
  modal_bottom_button_main: {
    display: "flex",
    gap: "32px",
    "& a": {
      textDecoration: "none",
    },
    "@media(max-width:1080px)": {
      gap: "20px",
    },
    "@media (max-width:767px)": {
      flexDirection: "column",
      width: "100%",
    },
  },
  modal_bottom_button_pending_invoice: {
    minWidth: "245px !important",
    borderRadius: "45px !important",
    border: "none !important",
    background: "linear-gradient(180deg, #20639B 0%, #002D56 100%)",
    color: "#ffffff !important",
    cursor: "pointer",
    boxShadow: "0px 3px 6px #00000029",
    fontWeight: "600 !important",
    letterSpacing: "1px",
    gap: "5px",
    textTransform: "capitalize !important",
    padding: "8px 68px !important",
    "& span": {
      fontSize: "18px",
      "@media(max-width:1440px)": {
        fontSize: "16px",
      },
      "@media(max-width:425px)": {
        fontSize: "14px",
      },
    },
    "@media(max-width:1440px)": {
      padding: "6px 40px !important",
      fontSize: "16px !important",
    },
    "@media(max-width:1300px)": {
      padding: "4px 23px !important",
    },
    "@media (max-width:1140px)": {
      minWidth: "195px !important",
    },
    "@media(max-width:425px)": {
      minWidth: "min-content !important",
      width: "100%",
      marginRight: "0 !important",
    },
  },
  modal_bottom_button_add_to_cart: {
    minWidth: "173px !important",
    borderRadius: "45px !important",
    border: "none !important",
    background: "linear-gradient(180deg, #ffd788 0%, #ad7c20 100%)",
    color: "#ffffff !important",
    cursor: "pointer",
    boxShadow: "0px 3px 6px #00000029 !important",
    fontWeight: "600 !important",
    letterSpacing: "1px !important",
    textTransform: "capitalize !important",
    gap: "5px",
    padding: "8px 68px !important",
    "@media (max-width:425)": {
      width: "100%",
      marginLeft: "0 !important",
    },
    "& span": {
      fontSize: "18px",
      "@media(max-width:1440px)": {
        fontSize: "16px",
      },
      "@media(max-width:425px)": {
        fontSize: "14px",
      },
    },
    "@media(max-width:1440px)": {
      padding: "6px 40px !important",
    },
    "@media(max-width:1300px)": {
      padding: "4px 23px !important",
    },
    "@media (max-width:1140px)": {
      minWidth: "126px !important",
    },
    "@media(max-width:425px)": {
      minWidth: "min-content !important",
      width: "100%",
      marginRight: "0 !important",
    },
  },
  pdp_modal_footer: {
    gap: "30px",
    width: "100%",
    display: "flex",
    padding: "14px 29px 14px",
    justifyContent: "space-around",
    background: "#CDD5DD",
    "@media (max-width: 767px)": {
      flexWrap: "wrap",
      justifyContent: "initial",
    },
  },
  pdp_footer_model_details: {
    display: "flex",
    flexDirection: "column",
  },
  pdp_footer_model_info: {
    fontSize: "20px",
    color: "#20639B",
    letterSpacing: "0.6px",
    "@media (max-width:767px)": {
      fontSize: "18px",
    },
  },
  pdp_footer_model_info_detail: {
    color: "#002D56",
    fontSize: "24px",
    fontWeight: "600",
    letterSpacing: "0.72px",
    "@media (max-width:767px)": {
      fontSize: "20px",
    },
  },
});
export default styles;
