import React, { useState } from "react";
import { Clear } from "@mui/icons-material";
import "./styles.scss";
import { Modal, Backdrop } from "@mui/material";

const Index = ({ closePOPup, Forbidden_Access }) => {
  const [open, setOpen] = useState(true);

  const text = [
    {
      id: 1,
      text: Forbidden_Access    },
  ];
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      closeAfterTransition
      disableRestoreFocus={true}
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <div className="forbidden_main">
        <div className="forbidden_popup">
          <div className="forbidden_block">
            <Clear onClick={() => closePOPup(false)} className="clear" />
            <p className="heading">Forbidden Access</p>
          </div>
          <div className="forbidden_list">
            {text.map((item) => (
              <li href={item.id} className="forbidden_list_content">
                <span>{item.text}</span>
              </li>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default Index;
