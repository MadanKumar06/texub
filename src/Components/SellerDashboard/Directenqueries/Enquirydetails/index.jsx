import React, { useEffect, useState } from "react";
import "./styles.scss";
import { Clear } from "@mui/icons-material";
import { Button, Box } from "@mui/material";
import { Modal, Backdrop } from "@mui/material";
import eye from '../../../../Assets/sellerdashboard/directenquires/Eye.png'
const Index = ({ closePOPup, popid, direct }) => {
  const [open, setOpen] = useState(true);
  console.log(popid)
  console.log(direct)
  const [currentdata, setcurrentdata] = useState()

  useEffect(() => {
    let temp = direct.find(d => d?.wtb_id === popid)
    setcurrentdata(temp)
  }, [direct])

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
          <div className="image_content_section">
            <span className="image_content">
              <img src={eye} alt="" className="eye_image" />
              <p className="p1">12 Sellers are viewing at this enquiry right now.</p>
            </span>
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
          </div>
        </div>
      </div>
      </div>
    </Modal>
  );
};

export default Index;
