const styles = () => ({
  producttable: {
    margin: "15px 3% 4.5%",
  },
  mui_datatable_main: {
    boxShadow: "unset !important",
    "& .MuiTableCell-root ": {
      zIndex: "1",
    },
    "& .MuiToolbar-root": {
      minHeight: "0px",
      height: "0px",
    },
    "& .MuiButtonBase-root": {
      color: "#ffffff",
      position: "absolute",
      right: "0",
      top: "7px",
      zIndex: "2",
      background: "#002d56",
      borderRadius: "unset",
      "@media (max-width:900px)": {
        color: "#002d56",
        background: "#f5f5f5",
      },
    },
    "& .MuiTable-root": {
      zIndex: "1",
    },
    "& .MuiTableHead-root": {
      "@media (max-width:900px)": {
        display: "none !important",
      },
      "& .MuiTableCell-root": {
        background: "#002D56",
        color: "#FFFFFF",
        fontWeight: "600",
        textAlign: "center",
        whiteSpace: "nowrap",
        fontSize: "18px",
        "@media (max-width:1399px)": {
          fontSize: "16px",
        },
      },
    },
    "& .MuiTableBody-root": {
      cursor: "pointer",
      "& .MuiTableRow-root:nth-child(odd)": {
        background: "#F5F5F5",
      },

      "& .MuiTableRow-root:nth-child(even)": {
        background: "#EAEAEA",
      },
      "& .MuiTableCell-root ": {
        textAlign: "center",
        fontSize: "18px",
        fontWeight: "600",
        padding: "7px 10px",
        "@media (max-width:1680px)": {
          fontSize: "16px",
        },
        "@media (max-width:1399px)": {
          fontSize: "14px",
        },
        "& a": {
          textDecoration: "none",
        },
        "@media (max-width:900px)": {
          display: "flex !important",
          justifyContent: "center",
          alignItems: "center",
        },
         "& div ": {
            "@media (max-width:900px)": {
              fontSize:"14px",
            },
         },
           
      },
    },
  },
  guest_login: {
    margin: "0",
    fontSize: "12px",
    textDecoration: "underline",
    color: "#002D56",
  },
  check_price: {
    margin: "0",
    fontSize: "10px",
    color: "#333C42",
  },
  productable_image: {
    display: "flex",
    justifyContent: "center",
  },
  producttable_description: {
    maxWidth: "300px",
   display: "flex",
   justifyContent: "flex-start",
   alignItems : "center",
   textAlign: "left",
  },
  producttable_price: {
    width: "110px",
    padding: "3px 0px",
    background: "#ffffff",
    borderRadius: "22px",
    "& span": {
      fontSize: "12px",
      paddingRight: "4px",
    },
  },
  producttable_price_block: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  producttable_heading_icon: {
    gap: "1em",
    display: "flex",
    justifyContent: "flex-end",
    "@media (max-width:900px)": {
      justifyContent: "center",
    },
    "& img": {
      width: "40px",
      height: "40px",
      cursor: "pointer",
    },
  },
  producttable_add_to_cart: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: "10px 0",
    gap: "5px",

    // button styles
    textDecoration: "none !important",
    minWidth: "144px !important",
    padding: "8px 15px !important",
    borderRadius: "45px !important",
    border: "none !important",
    background: "linear-gradient(180deg, #20639B 0%, #002D56 100%)",
    color: "#ffffff !important",
    cursor: "pointer",
    boxShadow: "0px 3px 6px #00000029",
    fontWeight: "600 !important",
    letterSpacing: "1px",
  },
});
export default styles;
