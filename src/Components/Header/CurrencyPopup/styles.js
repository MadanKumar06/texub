const styles = (theme) => ({
  header_dropdown: {
    marginLeft: "auto",
    marginRight: "0",
    "& .MuiButton-text": {
      textTransform: "capitalize",
    },
    "& .MuiButton-root": {
      fontWeight: "600",
      fontSize: "18px",
      "@media (max-width:1184px) and (min-width:320px)": {
        fontSize: "14px !important",
      },
      
    },
    "& .MuiButton-label": {
      color: "#5C6369",
    },
  },
});
export default styles;
