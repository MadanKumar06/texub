const styles = (theme) => ({
  header_dropdown: {
    "& .MuiButton-text": {
      textTransform: "capitalize",
    },
    "& .MuiButton-root": {
      fontWeight: "600",
      display: "flex",
      gap: "8px",
      fontSize: "20px",
      padding: "0",
    },
    "& .MuiButton-label": {
      color: "#5C6369",
    },
  },
  menulist_items: {
    "& .MuiList-root": {
      margin: "0 30px",
      "& .MuiMenuItem-root": {
        gap: "24px",
        padding: "13px 50px 13px 0px",
        borderBottom: "1px solid #e6e6e6",
      },
      "& .MuiMenuItem-root:last-child": {
        border: "none",
      },
    },
  },
});
export default styles;
