import React, { useState, useEffect } from "react";
import "./styles.scss";
import { Clear } from "@mui/icons-material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {
  FormControlLabel,
  Checkbox,
  TextField,
  FormGroup,
  Modal,
  Button,
  Backdrop,
} from "@mui/material";
import axios from "axios";
import Constant from "../../../Constant";
import swal from "sweetalert2";

const Index = ({ pdpSellerData, handleOpenClose }) => {
  const [create1, setcreate1] = useState(false);
  const create = () => {
    setcreate1(!create1);
  };
  const [fname, setfname] = useState([]);
  const [newwishdata, setnewwishdata] = useState("");
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
    handleOpenClose(false);
  };

  const [wishcheck, setwishcheck] = useState();
  const wishlistselect = (data, value) => {
    setwishcheck(data);
    //   let temp = []
    //   if(value) {
    //     setwishcheck(prevState => [
    //         ...prevState,
    //         data?.id
    //     ])
    //   }
    //   if(!value) {
    //     let temp = wishcheck.find(wc => wc !== data?.id)
    //     setwishcheck(temp)
    //   }
  };

  useEffect(async () => {
    let user = JSON.parse(localStorage.getItem("userdata"));
    try {
      const foldernames = await axios({
        method: "post",
        url: `${Constant.baseUrl()}/wishlist/getNames`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: {
          requestParams: {
            customer_id: user.id,
          },
        },
      });
      if (foldernames?.data) {
        setfname(foldernames?.data);
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  const newwishlist = async () => {
    let user = JSON.parse(localStorage.getItem("userdata"));
    try {
      let temp = fname?.find((fd) => fd.wishlist_name === newwishdata);
      const wishdata = await axios({
        method: "post",
        url: `${Constant.baseUrl()}/wishlist`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: {
          requestParams: {
            customer_id: user?.id,
            product_id: parseInt(pdpSellerData?.product_id),
            wk_id: wishcheck?.id === undefined ? "" : wishcheck?.id,
            wk_name: temp !== undefined ? "" : newwishdata,
          },
        },
      });
      if (wishdata?.data?.[0]?.status) {
        handleOpenClose(false);
        setTimeout(() => {
          swal.fire({
            text: wishdata?.data?.[0]?.message,
            icon: "success",
            showConfirmButton: false,
            timer: 3000,
          });
        }, 1000 / 2);
      } else {
        swal.fire({
          text: wishdata?.data?.[0]?.message,
          icon: "error",
          showConfirmButton: false,
          timer: 3000,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className="wishlist_modal"
      open={open}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <>
        <div className="wishlist_main">
          <div className="wishlist_main_block">
            <Clear
              className="clear_btn wishlist_clear_btn"
              onClick={() => handleClose()}
            />
            <div className="wishlist_product">
              <span>
                <img
                  className="wishlist_img"
                  src={`${Constant?.imageBaseUrl()}${pdpSellerData?.brand}`}
                  alt=""
                />
              </span>
              <span className="description">{pdpSellerData?.description}</span>
            </div>
            <div className="wishlist_product_section">
              <p>Add to the existing Wishlist</p>
              <FormGroup>
                {fname?.map((f, i) => (
                  <FormControlLabel
                    className={"pdpwishlist_label"}
                    control={
                      <Checkbox
                        className={"pdpwishlisthceckbox"}
                        onChange={(e) => wishlistselect(f, e.target.checked)}
                      />
                    }
                    label={f?.wishlist_name}
                  />
                ))}
              </FormGroup>
            </div>
            <div className="wishlist_bts">
              <Button className="wishlist_create_btn" onClick={create}>
                Create New Wishlist
              </Button>
              <Button className="wishlist_add_btn" onClick={newwishlist}>
                Add
              </Button>
            </div>
            {create1 && (
              <div className="inputplace">
                <span className="inputfield">
                  <TextField
                    id="outlined-required"
                    name="save"
                    placeholder="Name"
                    className="wishlistsave_input"
                    onChange={(e) => setnewwishdata(e.target.value)}
                  />
                  <button
                    className="wishlist_save_btn"
                    onClick={() => newwishlist()}
                  >
                    Save
                  </button>
                </span>
                <p style={{ cursor: "pointer" }} onClick={() => create()}>
                  Cancel
                </p>
              </div>
            )}
            <div className="back_to_pdp">
              <ArrowBackIosIcon />
              <p
                style={{ cursor: "pointer" }}
                onClick={() => handleClose()}
                 className="back"
              >
                Back to {pdpSellerData?.model_number}
                {pdpSellerData?.product_name}
              </p>
            </div>
          </div>
        </div>
      </>
    </Modal>
  );
};
export default Index;
