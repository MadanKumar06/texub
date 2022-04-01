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
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
