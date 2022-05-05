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
import Divider from "@mui/material/Divider";
import "./styles.scss";
import { useStateValue } from "../../../../../store/state";


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

export default function BasicModal({PopupTrack}) {
  const [{  }, dispatch] = useStateValue();

    // serial number popup id here
 const TrackInfo = [
     {
        date:"Saturday, 08/05/21",
        time:"09:10 AM",
        shippping_msg:"Package has left the Texub Facility",
        location:"Mumbai, Maharashtra",
    
    },
     {
        
        date:"Saturday, 08/05/21",
        time:"09:10 AM",
        shippping_msg:"Package has left the Texub Facility",
        location:"Mumbai, Maharashtra",
    },
     {
        date:"Saturday, 08/05/21",
        time:"09:10 AM",
        shippping_msg:"Package has left the Texub Facility",
        location:"Mumbai, Maharashtra",
    
    },
     {
        date:"Saturday, 08/05/21",
        time:"09:10 AM",
        shippping_msg:"Package has left the Texub Facility",
        location:"Mumbai, Maharashtra",
    },
 
  ];


  
  const [open, setOpen] = React.useState(true);
    const [value, setValue] = React.useState(2);
  // const handleOpen = () => setOpen(true);
  const handleClose = (event, reason) => {
    if (reason && reason === "backdropClick") return;
      else {
        setOpen(false);
          dispatch({
          type: "SET_PDP_POPUP_OPEN_CLOSE",
          value: false,
        });
        PopupTrack(false)
      }
    }

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="tracking_order_popup"
        closeAfterTransition
        onClose={handleClose}
        disableRestoreFocus={true}
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
         <div className="order_popup_main">
              <Clear
                    className="clear_btn tracking_popup_clear_btn"
                    onClick={() => handleClose()}
                />
                  
                        <div className="track_popup_block" style={{outline:'none'}}>

                        <div className='title'>Delivery By Aramex</div>
                        <div className='sub-title'><span>Tracking ID : </span>
                             <span className="number">277098176 </span>
                        </div>
                        <div className='tracking_info_block'>
                          {TrackInfo.map((item) => (
                                <div className="tracking_info_section">     
                                    <div className="track_number_block">
                                        <span className="heading">{item.date}</span>
                                    </div> 
                                    <div className='tracking_info'> 
                                        <span className='tracking_time'>{item.time}</span>
                                        <Divider orientation="vertical" />
                                        <div className='tracking_address_info'>
                                                <span className='tracking_time'>{item.shippping_msg}</span>
                                                <span className='tracking_location'>{item.location}</span>
                                        </div>
                                    </div>
                                </div> 
                            ))} 
                         </div>
                        </div>
                    
                
          </div>
      </Modal>
    </div>
  );
}