const styles = () => ({
  producttable: {
    margin: "15px 3% 20px",
  },
  mui_datatable_main: {
    "& .MuiTableHead-root": {
      "& .MuiTableCell-root": {
        background: "#002D56",
        color: "#FFFFFF",
        fontWeight: "600",
        textAlign: "center",
        fontSize: "18px",
      },
    },
    "& .MuiTableBody-root": {
      "& .MuiTableRow-root:nth-child(odd)": {
        background: "#F5F5F5",
      },

      "& .MuiTableRow-root:nth-child(even)": {
        background: "#EAEAEA",
      },
      "& .MuiTableCell-root ": {
        textAlign: "center",
        fontSize: "18px",
      },
    },
  },
  productable_image: {
    display: "flex",
    justifyContent: "center",
  },
  producttable_description: {
    maxWidth: "300px",
  },
  producttable_price: {
    width:"110px",
    padding: "10px 0",
    background: "#ffffff",
    borderRadius: "22px",
  },
  producttable_add_to_cart: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: "5px",

    // button styles
    textDecoration: "none !important",
    minWidth: "144px !important",
    padding: "8px 0 !important",
    borderRadius: "45px !important",
    border: "none !important",
    background: "linear-gradient(80deg, #20639B 0%, #002D56 100%)",
    color: "#ffffff !important",
    cursor: "pointer",
    boxShadow: "0px 3px 6px #00000029",
    marginRight: "8px !important",
    fontWeight: "600 !important",
    letterSpacing: "1px",
  },
});
export default styles;
