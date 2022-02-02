const styles = (theme) => ({
  header_dropdown: {
    marginLeft: "auto",
    marginRight: "0",
    "@media (max-width:768px)": {
      position: "absolute",
      right: "0",
      top: "10px",
    },
    "& .MuiButton-text": {
      textTransform: "capitalize",
    },
    "& .MuiButton-root": {
      fontWeight: "400",
      fontSize: "18px",
      "@media (max-width:1060px) and (min-width:768px)": {
        fontSize: "15px",
      },
      "@media (max-width:1148px) and (min-width:1059px)": {
        fontSize: "16px",
      },
      "@media (max-width:360px)": {
        fontSize: "14px",
        fontWeight: "600",
      },
    },
    "& .MuiButton-label": {
      color: "#5C6369",
    },
  },
});
export default styles;
