const styles = (theme) => ({
  header_dropdown: {
    marginLeft: "auto",
    marginRight: "0",
    "& .MuiButton-text": {
      textTransform: "capitalize",
    },
    "& .MuiButton-root": {
      fontWeight: "600",
      fontSize: "20px",
      padding: "0",
      letterSpacing: "0.6px !important",
      color: "#5C6369 !important",
      display: "flex",
      alignItems: "center",
      gap: "6px",
      "& img": {
        width: "30px",
        height: "30px",
      },
      "@media (max-width:1660px)": {
        fontSize: "16px !important",
      },
    },
    "& .MuiButton-label": {
      color: "#5C6369",
    },
  },
  curreny_image: {
    margin: "0",
    background: "#c19643",
    color: "#ffffff",
    padding: "0px 10px",
    borderRadius: "50%",
  },
  menulist_item: {
    "& .MuiList-root ": {
      padding: "15px",
      "& .MuiMenuItem-root ": {
        padding: "15px",
        borderBottom: "1px solid #e6e6e6",
        color: "#5c6369",
        fontSize: "20px",
        letterSpacing: "0.66px",
        display: "flex",
        alignItems: "center",
        gap: "6px",
        "& img": {
          width: "30px",
          height: "30px",
        },
        "@media (max-width:1660px)": {
          fontSize: "16px !important",
        },
      },
    },
  },
});
export default styles;
