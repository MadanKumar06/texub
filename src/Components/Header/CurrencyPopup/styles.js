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
      "@media (max-width:1600px)": {
        fontSize: "18px !important",
      },
      "@media (max-width:1300px)": {
        fontSize: "16px !important",
      },
      "@media (max-width:1080px)": {
        fontSize: "14px !important",
      },
      "@media (max-width:768px)": {
        fontSize: "14px !important",
      },
      "@media (max-width:380px)": {
        fontSize: "12px  !important",
      },
    },
    "& .MuiButton-label": {
      color: "#5C6369",
    },
  },
  menulist_item: {
    "& .MuiList-root ": {
      "& .MuiMenuItem-root ": {
        padding: "15px",
        borderBottom: "1px solid #e6e6e6",
        color: "#5c6369",
        fontSize: "22px",
        letterSpacing: "0.66px",
        "@media (max-width:1600px)": {
          fontSize: "20px !important",
        },
        "@media (max-width:1300px)": {
          fontSize: "18px !important",
        },
        "@media (max-width:1080px)": {
          fontSize: "16px !important",
        },
      },
    },
  },
});
export default styles;
