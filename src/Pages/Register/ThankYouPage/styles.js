const styles = () => ({
  thankyou_container_buyer: {
    padding: "3% 12% 3%",
    width: "100%",
    backgroundImage: "url('/Images/user_selection_bg.png')",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    display:"flex",
    justifyContent:"center",
    alignItems: "center",
    "@media (max-width:780px)": {     
       padding: "3% 5% 3%",
      },
  },
  thankyou_container_seller: {
    padding: "3% 12% 3%",
    width: "100%",
    backgroundImage: "url('/Images/buyer_regirtration_bg.png')",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
     display:"flex",
    justifyContent:"center",
    alignItems: "center",
     "@media (max-width:780px)": {     
       padding: "3% 5% 3%",
      },
  },
  thankyou_sub_container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    fontStyle: "italic",
    width: "70%",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: "5px",
    padding: "30px",
      "@media (max-width:991px)": {     
       width: "100%",
      },
     "@media (max-width:780px)": {     
       padding: "10px",
      },
  },
  thankyou_title: {
    fontSize: "35px",
    fontWeight: "600",
    margin: "0",
    color: "#5C6369",
    "@media (max-width:780px)": {     
       fontSize: "30px",
      },
       "@media (max-width:567px)": {     
       fontSize: "26px",
      },
  },
  thankyou_user: {
    fontSize: "24px",
    margin: "0",
    color: "#5C6369",
    marginTop: "17px",
    fontWeight: "600",
    fontStyle: "italic",
    "@media (max-width:780px)": {     
       fontSize: "20px",
      },
  },
  thankyou_for_register: {
    color: "#333C42",
    fontSize: "18px",
    padding: "0px 14%",
    textAlign: "center",
     "@media (max-width:780px)": {     
       fontSize: "16px",
      },
    "& p": {
      margin: "0",
      letterSpacing: "1.3px",
      fontStyle: "normal",
    },
  },
  thankyou_button_signin: {
    textDecoration: "none",
    minWidth: "164px !important",
    borderRadius: "45px !important",
    border: "none !important",
    background: "linear-gradient(180deg, #ffd788 0%, #ad7c20 100%)",
    color: "#ffffff !important",
    cursor: "pointer",
    boxShadow: "0px 3px 6px #00000029 !important",
    fontWeight: "600 !important",
    letterSpacing: "1px !important",
    textTransform: "capitalize !important",
  },
  thankyou_backto_home: {
    color: "#002D56",
    textDecoration: "underline",
    fontWeight: "600",
    letterSpacing: "0.66px",
  },
});
export default styles;
