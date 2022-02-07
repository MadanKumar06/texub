const styles = (theme) => ({
  radio_btn_container: {
    height: "100%",
  },
  select_text: {
    color: "#333C42",
    fontSize: "22px !important",
    lineHeight: "31px",
    marginBottom: "4%",
  },
  user_description: {
    fontSize: "18px",
    lineHeight: "30px",
    letterSpacing: "0.42px",
    color: "#333C42",
    textAlign: "justify",
    "@media (max-width:1190px) and (min-width:768px)": {
      fontSize: "14px",
    },
  },
  btn_user: {
    fontSize: "18px !important",
    paddingLeft: "121px !important",
    paddingRight: "121px !important",
    paddingTop: "8px !important",
    paddingBottom: "8px !important",
    borderRadius: "25px !important",
    background: "linear-gradient(180deg, #20639B 0%, #002D56 100%)",
    boxShadow: "0px 3px 6px #00000029 !important",
    borderWidth: "0px",
    color: "#ffffff",
    transition: "transform .2s !important",
    fontWeight: "600 !important",
    maxWidth: "218px",
    textTransform: "capitalize !important",
    margin: "auto auto 0px !important",
  },
  radio_group: {
    display: "flex",
    justifyContent: "space-evenly",
  },
});
export default styles;
