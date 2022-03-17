import React from "react";
import "./styles.scss";
import { Clear } from "@mui/icons-material";
import { Button, Box } from "@mui/material";
const Index = ({ closePOPup }) => {
  return (
    <div className="enquirydetails_main">
      <div className="enquirydetails_box">
        <div className="enquirydetails_heading">
          <p>
            Enquiry No.<span> 0000000006</span>
          </p>
          <Clear onClick={() => closePOPup(false)} />
        </div>
        <p className="p1">12 Sellers are viewing at this enquiry right now.</p>
        <div className="enquirydetails_section">
          <div className="enquirydetails">
            <p className="heading">Buyer Code</p>
            <p className="details">BU201201</p>
          </div>
          <div className="enquirydetails">
            <p className="heading">Part Number</p>
            <p className="details">RT-5700U</p>
          </div>

          <div className="enquirydetails">
            <p className="heading">Mobile Name/Number</p>
            <p className="details">Lenovo Dpin Yoga..</p>
          </div>
          <div className="enquirydetails">
            <p className="heading">Product Description</p>
            <p className="details">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam.
            </p>
          </div>
          <div className="enquirydetails">
            <p className="heading">Main Category</p>
            <p className="details">Laptop</p>
          </div>
          <div className="enquirydetails">
            <p className="heading">Quantity</p>
            <p className="details">50</p>
          </div>
          <div className="enquirydetails">
            <p className="heading">Hub</p>
            <p className="details">Mumbai</p>
          </div>
          <div className="enquirydetails">
            <p className="heading">Enquiry Date</p>
            <p className="details">12/03/22</p>
          </div>
          <div className="enquirydetails">
            <p className="heading">Closing Date</p>
            <p className="details">23/03/22</p>
          </div>
          <div className="enquirydetails">
            <p className="heading">Notes</p>
            <p className="details">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam.
            </p>
          </div>
          <Box className="button_box">
            <Button className="button_decline">Decline</Button>
            <Button className="button_accept">Accept</Button>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Index;
