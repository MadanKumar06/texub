const styles = (theme) => ({
  mobile_view_accordion_container: {
    "& .MuiAccordion-rounded": {
      background: "#002d56",
      color: "#ffffff",
    },
    "& .MuiAccordionSummary-expandIcon": {
      color: "#ffffff",
    },
    "& .MuiAccordionDetails-root": {
      padding: "0px 16px",
      flexDirection: "column",
    },
  },
  heading_accordion: {
    fontSize: "1.2rem",
    fontWeight: "600",
  },
});
export default styles;
