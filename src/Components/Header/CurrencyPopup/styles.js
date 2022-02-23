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
      "@media (max-width:1300px)": {
        fontSize: "16px !important",
      },
      "@media (max-width:1080px)": {
        fontSize: "14px !important",
      },
      "@media (max-width:768px)": {
        fontSize: "12px !important",
      },
    },
    "& .MuiButton-label": {
      color: "#5C6369",
    },
  },
});
export default styles;
