import React ,{useEffect, useState}from "react";
import "./styles.scss";
import { Clear } from "@mui/icons-material";
import { Button, Box } from "@mui/material";
import {Modal,Backdrop } from "@mui/material";
const Index = ({ closePOPup, popid, direct }) => {
  const [open, setOpen] = useState(true);
  console.log(popid)
  console.log(direct)
  const [currentdata, setcurrentdata] = useState()

  useEffect(() => {
    let temp = direct.find(d => d?.wtb_id === popid)
    setcurrentdata(temp)
  },[direct])

  console.log(currentdata)

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      className="modal"
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <div className="enquirydetails_main">
        <div className="enquirydetails_box">
          <div className="enquirydetails_heading">
            <p>
              Enquiry No.<span> {currentdata?.enquiry_id}</span>
            </p>
            <Clear onClick={() => closePOPup(false)} />
          </div>
          <p className="p1">12 Sellers are viewing at this enquiry right now.</p>
          <div className="enquirydetails_section">
            <div className="enquirydetails">
              <p className="heading">Buyer Code</p>
              <p className="details">{currentdata?.buyer_code}</p>
            </div>
            <div className="status">
              {currentdata?.wtb_status}
            </div>
            <div className="enquirydetails">
              <p className="heading">Part Number</p>
              <p className="details">{currentdata?.sku}</p>
            </div>

            <div className="enquirydetails">
              <p className="heading">Model Name/Number</p>
              <p className="details">{currentdata?.model_number}</p>
            </div>
            <div className="enquirydetails">
              <p className="heading">Product Description</p>
              <p className="details">
                {currentdata?.description}
              </p>
            </div>
            <div className="enquirydetails">
              <p className="heading">Main Category</p>
              <p className="details">{currentdata?.main_category_id}</p>
            </div>
            <div className="enquirydetails">
              <p className="heading">Quantity</p>
              <p className="details">{currentdata?.quantity}</p>
            </div>
            <div className="enquirydetails">
              <p className="heading">Hub</p>
              <p className="details">{currentdata?.hub_id}</p>
            </div>
            <div className="enquirydetails">
              <p className="heading">Enquiry Date</p>
              <p className="details">12/03/22</p>
            </div>
            <div className="enquirydetails">
              <p className="heading">Notes</p>
              <p className="details">
                {currentdata?.notes}
              </p>
            </div>
            {currentdata?.seller_enquiry_status === "Enquiry Received" ? 
              <Box className="button_box">
                <Button className="button_decline">Decline</Button>
                <Button className="button_accept">Accept</Button>
              </Box>
            :
            <Box style={{color: "#333C42",fontSize: "20px"}} className="button_box">{currentdata?.seller_enquiry_status}</Box>
            }
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default Index;
