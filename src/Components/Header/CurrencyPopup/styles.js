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
      "@media (max-width:1240px)": {
        fontSize: "14px !important",
      },
      "@media (max-width:850px) and (min-width:768px)": {
        fontSize: "12px !important",
      },
    },
    "& .MuiButton-label": {
      color: "#5C6369",
    },
  },
});
export default styles;
