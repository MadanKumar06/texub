import React from "react";
import { CircularProgress, Box } from "@mui/material";
import "./styles.scss";

export default function CircularIndeterminate() {
  return (
    <Box className="simple_loader">
      {/* <CircularProgress /> */}
      <div class="cssloader">
        <div class="sh1"></div>
        <div class="sh2"></div>
      </div>
    </Box>
  );
}
