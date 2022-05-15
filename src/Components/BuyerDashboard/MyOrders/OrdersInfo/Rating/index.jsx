import React, { useState } from "react";
import { Modal, Backdrop, InputLabel, Rating, Button } from "@mui/material";
import { TextField } from "@mui/material";

import { Clear } from "@mui/icons-material";
import "./styles.scss";
import axios from "axios";
import Constant from "../../../../../Constant";
import { useStateValue } from "../../../../../store/state";
import swal from "sweetalert2";

export default function BasicModal({ Popup, currentorder }) {
  // const [{}, dispatch] = useStateValue();

  const [{}, dispatch] = useStateValue();
  const [rating, setrating] = useState({
    star: 0,
    comment: "",
  });
  const [open, setOpen] = React.useState(true);

  const handleClose = (event, reason) => {
    if (reason && reason === "backdropClick") return;
    else {
      setOpen(false);
      dispatch({
        type: "SET_PDP_POPUP_OPEN_CLOSE",
        value: false,
      });
      Popup(false);
    }
  };

  const reviewsubmit = async () => {
    let user = JSON.parse(localStorage.getItem("userdata"));
    dispatch({
      type: "SET_IS_LOADING",
      value: true,
    });
    try {
      const submit = await axios({
        method: "post",
        url: `${Constant?.baseUrl()}/saveReview`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: {
          data: {
            buyer_id: user?.id,
            order_id: 13,
            order_number: currentorder,
            rating: rating?.star,
            review_details: rating?.comment,
          },
        },
      });
      dispatch({
        type: "SET_IS_LOADING",
        value: false,
      });
      swal.fire({
        text: `Review successfully submited`,
        icon: "success",
        showConfirmButton: false,
        timer: 3000,
      });
      handleClose();
    } catch (e) {
      dispatch({
        type: "SET_IS_LOADING",
        value: false,
      });
      swal.fire({
        text: "Submiting review failed",
        icon: "error",
        showConfirmButton: false,
        timer: 3000,
      });
      console.log(e);
    }
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="rating_number_popup"
        closeAfterTransition
        disableRestoreFocus={true}
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <div className="rating_popup_main" style={{ outline: "none" }}>
          <Clear
            className="clear_btn rating_popup_clear_btn"
            onClick={() => handleClose()}
          />
          <div className="rating_popup_block">
            <div className="title">Rate !</div>
            <div className="rating">
              <Rating
                className="ratings"
                name="simple-controlled"
                value={rating?.star}
                onChange={(event, newValue) => {
                  setrating((rating) => ({
                    ...rating,
                    star: newValue,
                  }));
                }}
              />
            </div>
            <div className="rating_comments_block">
              <InputLabel>Comments</InputLabel>

              <TextField
                className="inputfield-box contact-form-inputfieldbox"
                fullWidth
                aria-label="comments"
                placeholder="Type your message"
                name="your_message"
                id="your_message"
                multiline
                rows={3}
                style={{ height: 100 }}
                value={rating?.comment}
                onChange={(e) =>
                  setrating((rating) => ({
                    ...rating,
                    comment: e.target.value,
                  }))
                }
                InputLabelProps={{
                  shrink: true,
                  required: true,
                  classes: {
                    asterisk: "asterisk",
                  },
                }}
                variant="outlined"
              />
              <div className="rating-btns">
                <Button
                  className="rating_comments_cancel"
                  onClick={() => handleClose()}
                >
                  Cancel
                </Button>
                <Button
                  className="btn-secondary rating_comments_submit"
                  onClick={reviewsubmit}
                >
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
