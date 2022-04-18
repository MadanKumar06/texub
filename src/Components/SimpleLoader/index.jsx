import React from "react";
import { CircularProgress, Box } from "@mui/material";
import "./styles.scss";

export default function CircularIndeterminate() {
  return (
    <Box className="simple_loader">
      {/* <CircularProgress /> */}
      {/* <div class="cssloader">
        <div class="sh1"></div>
        <div class="sh2"></div>
      </div> */}

      <div class="simple-loader-container">
  <div class="items items-1"></div>
  <div class="items items-2"></div>
  <div class="items items-3"></div>
  <div class="items items-4"></div>
</div>
    </Box>
  );
}
