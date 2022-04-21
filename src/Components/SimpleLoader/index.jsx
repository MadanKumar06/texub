import React from "react";
import { CircularProgress, Box } from "@mui/material";
import "./styles.scss";

export default function CircularIndeterminate() {
  return (
    <Box className="simple_loader">
      {/* <CircularProgress /> */}
      {/* <div className="cssloader">
        <div className="sh1"></div>
        <div className="sh2"></div>
      </div> */}

      <div className="simple-loader-container">
        <div className="items items-1"></div>
        <div className="items items-2"></div>
        <div className="items items-3"></div>
        <div className="items items-4"></div>
      </div>
    </Box>
  );
}
