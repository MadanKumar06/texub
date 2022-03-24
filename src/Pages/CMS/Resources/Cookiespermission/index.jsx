import React, { useState } from 'react'
import './styles.scss'
import { Modal, Backdrop } from "@mui/material";
// import bgimage from '../../../../Assets/Career/Rectangle 1277.svg'
import icon from '../../../../Assets/Career/Group 930.png'
import close from '../../../../Assets/Career/Group 55.svg'

const Index = ({ closePOPup }) => {
   const [open, setOpen] = useState(true);
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
      ><div className='cookies_main'>
            <div className='cookies_main1'>
               <div className='cookies_bgimage_section' >
                  {/* <img src={bgimage} alt='/' className='cookies_bgimage' /> */}
                  <img src={icon} alt='/' className='cookies_icon' />

                  <img src={close} alt='/' className='cookies_close' onClick={() => closePOPup(false)} />
                  <p className='cookies_description'>We use cookies to make your experience better on this website</p>
                  <p className='cookies_policies'><a href="/" className='Link'>Cookies Policies</a></p>
                  <button className='cookies_btn'>Accept Cookies</button>

               </div>

            </div>
         </div>
      </Modal>
   )
}

export default Index;
