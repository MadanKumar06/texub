const styles = (theme) => ({
  tab_conatainer: {
    "& .MuiButtonBase-root ": {
      width: "50%",
      backgroundColor: "#ddb363",
      color: "#002d56",
    },
    "& .Mui-selected": {
      background: "#002d56",
      color: "#ffffff !important",
    },
  },
  link_in_tab: {
    textDecoration: "none",
    color: "#5C6369",
  },
  sub_tab_conatainer: {
    "& .MuiListItem-button": {
      gap: "12px",
    },
  },
});
export default styles;
