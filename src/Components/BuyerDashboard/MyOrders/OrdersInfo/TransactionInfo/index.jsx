import * as React from 'react';
import {Modal,Backdrop } from "@mui/material";
import TextareaAutosize from "@mui/base/TextareaAutosize";

import { Clear  } from "@mui/icons-material";
import { Button } from "@mui/material";
import {
  FormControlLabel,
  TextField,
  InputLabel,
} from "@mui/material";
import "./styles.scss";


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({PopupTransaction}) {
  
  const [open, setOpen] = React.useState(true);
    const [value, setValue] = React.useState(2);
  // const handleOpen = () => setOpen(true);
  const handleClose = () => {
      setOpen(false);
      PopupTransaction(false)
    }

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="transaction_number_popup"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
         <div className="transaction_popup_main">
              <Clear
                    className="clear_btn transaction_popup_clear_btn"
                    onClick={() => handleClose()}
                />
                <div className='transaction_popup'>
                    <div className="transaction_section">
                        <div className="transaction_title_section">
                            <span className="transaction_title">
                            Enter The Transaction Details
                            </span>
                        </div>

                        <div className="transaction_block">
                            <div className="transaction_info_section">
                            <InputLabel>Reference Number</InputLabel>
                            <TextField
                                id="reference_number"
                                placeholder="324518709"
                                className="inputfield-box"
                                name="reference_number"
                                variant="outlined"
                            />
                            </div>
                            <div className="transaction_info_section">
                            <InputLabel>Payment Amount</InputLabel>
                            <TextField
                                id="payment_amount"
                                placeholder="INR 94,05,811"
                                className="inputfield-box"
                                name="payment_amount"
                                variant="outlined"
                            />
                            </div>
                        </div>
                        <div className="transaction_block">
                            <div className="transaction_info_section">
                            <InputLabel>Transaction Date & Time</InputLabel>
                            <TextField
                                id="transaction_date_time"
                                placeholder="00:00:00"
                                className="inputfield-box"
                                name="TextField"
                                variant="outlined"
                            />
                            </div>
                            <div className="transaction_info_section">
                            <InputLabel>Remarks</InputLabel>
                            <TextareaAutosize
                                aria-label="Remarks"
                                minRows={3}
                                placeholder="Remarks"
                                style={{ height: 100 }}
                            />
                            </div>
                        </div>
                    </div>

                    <div className="ordersuccess_btns">
                        <Button className="payment_later_btn btn-primary">
                            Confirm & Update Payment Details Later
                        </Button>
                        <Button className="btn-secondary">Submit</Button>
                    </div>

                </div>
          </div>
      </Modal>
    </div>
  );
}