const styles = (theme) => ({
  mobile_view_accordion_container: {
    "& .MuiAccordion-rounded": {
      background: "#002d56",
      color: "#cdd5dd",
    },
    "& .MuiAccordionSummary-expandIconWrapper": {
      color: "#cdd5dd",
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
      fontSize: "1.1em",
    },
    "& .MuiCollapse-root ": {
      fontSize: "0.8em",
    },
    "& .MuiButtonBase-root": {
      height: "36px !important",
    },
  },
  heading_accordion: {
    fontSize: "1.2rem",
    fontWeight: "600",
  },
});
export default styles;
