import React, { useEffect, useState } from "react";
import "./styles.scss";
import { Clear } from "@mui/icons-material";
import { Button, Box } from "@mui/material";
import { Modal, Backdrop } from "@mui/material";
import Constant from "../../../../Constant";
import eye_icon from "../../../../Assets/sellerdashboard/enquiry/eye_icon.png";
import axios from "axios";
import swal from "sweetalert2";

const Index = ({ closePOPup, popid, direct, setrefreshdata, refreshdata }) => {
  const [open, setOpen] = useState(true);
  const [currentdata, setcurrentdata] = useState();

  useEffect(() => {
    let temp = direct.find((d) => d?.wtb_id === popid);
    setcurrentdata(temp);
  }, [direct]);

  const updatestatus = async (value) => {
    let storedata = JSON.parse(localStorage.getItem("storedata"));
    try {
      const statusid = await axios({
        method: "get",
        url: `${Constant.baseUrl()}/wtbEnquiryStatusList`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      let status = statusid.data?.find((sid) => sid?.label === value);
      const update = await axios({
        method: "post",
        url: `${Constant.baseUrl()}/wtbStatusBySeller`,
        data: {
          data: {
            enquiry_id: currentdata?.enquiry_id,
            status: status?.value,
            store_id: storedata?.store_id,
          },
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (update?.data[0]?.status) {
        swal.fire({
          text: `Submitted Successfully`,
          icon: "success",
          showConfirmButton: false,
          timer: 3000,
        });
        setrefreshdata(!refreshdata);
      } else {
        swal.fire({
          text: `Unable to Submit`,
          icon: "error",
          showConfirmButton: true,
          timer: 3000,
        });
      }
      closePOPup(false);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    document.addEventListener("keyup", (e) => {
      if (e.keyCode === 27) {
        closePOPup(false);
      }
    });
  }, []);
  console.log(currentdata)
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      className="modal"
      closeAfterTransition
      disableRestoreFocus={true}
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <div className="enquirydetails_main">
        <div className="enquirydetails_box">
          <div className="enquirydetails_heading">
            <p>
              Enquiry No.<span> {currentdata?.texub_wtb_id}</span>
            </p>
            <Clear onClick={() => closePOPup(false)} />
          </div>
          <p className="p1">
            <img className="eye_icon" src={eye_icon} alt="" />
            12 Sellers are viewing at this enquiry right now.
          </p>
          <div className="enquirydetails_section">
            <div className="enquirydetails">
              <p className="heading">Buyer Code</p>
              <p className="details">{currentdata?.buyer_code}</p>
            </div>
            <div
              className={`status ${
                currentdata?.seller_enquiry_status === "Open"
                  ? "directenquiries__open"
                  : currentdata?.seller_enquiry_status === "Accepted"
                  ? "directenquiries__accepted"
                  : currentdata?.seller_enquiry_status === "Closed"
                  ? "directenquiries__closed"
                  : currentdata?.seller_enquiry_status === "Pending" &&
                    "directenquiries__pending"
                  ? "directenquiries__decline"
                  : currentdata?.seller_enquiry_status === "Declined" &&
                    "directenquiries__decline"
              } `}
            >
              {currentdata?.seller_enquiry_status}
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
              <p className="details">{currentdata?.description}</p>
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
              <p className="details">{currentdata?.notes}</p>
            </div>
            {currentdata?.seller_enquiry_status === "Open" && (
              <Box className="button_box">
                <Button
                  className="button_decline"
                  onClick={() => updatestatus("Declined")}
                >
                  Decline
                </Button>
                <Button
                  className="button_accept"
                  onClick={() => updatestatus("Accepted")}
                >
                  Accept
                </Button>
              </Box>
            )}
            {currentdata?.seller_enquiry_status === "Accepted" && (
              <Box className="button_box">
                <Button
                  className="button_Submit"
                  onClick={() => updatestatus("Closed")}
                >
                  Submit
                </Button>
              </Box>
            )}
            {currentdata?.seller_enquiry_status === "Closed" && (
              <Box className="button_box">
                <Button className="button_closed">Quote Submitted</Button>
              </Box>
            )}
            {currentdata?.seller_enquiry_status === "Declined" && (
              <Box className="button_box">
                <Button className="button_declined">Declined</Button>
              </Box>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default Index;
