import * as React from 'react';
import { Rating, Button, Menu, MenuItem } from "@mui/material";
import Typography from '@mui/material/Typography';
import {Modal,Backdrop } from "@mui/material";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import {
  FormControlLabel,
  TextField,
  InputLabel,
} from "@mui/material";
import { Clear  } from "@mui/icons-material";
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

export default function BasicModal({Popup}) {
  
  const [open, setOpen] = React.useState(true);
    const [value, setValue] = React.useState(2);
  // const handleOpen = () => setOpen(true);
  const handleClose = () => {
      setOpen(false);
      Popup(false)
    }

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="rating_number_popup"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
         <div className="rating_popup_main">
              <Clear
                    className="clear_btn rating_popup_clear_btn"
                    onClick={() => handleClose()}
                />
                <div className="rating_popup_block">
                  <div className='title'>Rate !</div>
                  <div className="rating">
                      <Rating
                        className="ratings"
                        name="simple-controlled"
                        value={2}
                        onChange={(event, newValue) => {
                          //   setValue(newValue);
                        }}
                      />
                    </div>
                    <div className="rating_comments_block">
                      <InputLabel>Comments</InputLabel>
                      <TextareaAutosize
                        aria-label="comments"
                        minRows={3}
                        className= "rating_comment"
                        style={{ height: 100 }}
                      />
                      <div className='rating-btns'>
                          <Button className="rating_comments_cancel">
                          Cancel
                        </Button>
                        <Button className="btn-secondary rating_comments_submit">Submit</Button>
                      </div>  
                    </div>  
                </div>
          </div>
      </Modal>
    </div>
  );
}