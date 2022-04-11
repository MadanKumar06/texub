import React from "react";
import { CircularProgress, Backdrop } from "@mui/material";
import "./styles.scss";
export default function SimpleBackdrop() {
  return (
    <div className="backdrop">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        {/* <CircularProgress color="inherit" /> */}
        <div class="container">
          <div class="item item-1"></div>
          <div class="item item-2"></div>
          <div class="item item-3"></div>
          <div class="item item-4"></div>
        </div>
      </Backdrop>
    </div>
  );
}
