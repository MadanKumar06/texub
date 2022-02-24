const styles = (theme) => ({
  mobile_view_accordion_container: {
    "& .MuiAccordion-rounded": {
      background: "#002d56",
      color: "#ffffff",
    },
    "& .MuiAccordionSummary-expandIconWrapper": {
      color: "#ffffff",
    },
    "& .MuiPaper-elevation1": {
      boxShadow: "unset",
    },
    "& .MuiAccordionDetails-root": {
      padding: "0px 16px",
      display: "flex",
      flexDirection: "column",
      gap: "8px",
    },
    "& .MuiTypography-root": {
      fontWeight: "600",
      fontSize: "20px",
      color: "#ffffff",
    },
    "& .MuiCollapse-root ": {
      "& .MuiAccordionDetails-root .MuiTypography-root": {
        fontSize: "18px !important",
        fontWeight: "400",
      },
    },
    "& .MuiButtonBase-root": {
      height: "36px !important",
    },
  },
  heading_accordion: {
    fontSize: "20px",
    fontWeight: "600",
  },
});
export default styles;
