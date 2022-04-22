import React, { useState, useEffect } from 'react'
import './styles.scss'
import { Modal, Button, Backdrop } from "@mui/material";
import { Clear } from "@mui/icons-material";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import Constant from '../../../Constant';
const Index = ({ pdpSellerData }) => {
    debugger
    const [create1, setcreate1] = useState(false)
    const create = () => {
        setcreate1(!create1)
    }
    const [open, setOpen] = useState(true);
    const handleClose = () => {
        setOpen(false);
    };

    const [wishcheck, setwishcheck] = useState()
      const wishlistselect = (data, value) => {
        setwishcheck(data)
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
      }

    const [newwishdata, setnewwishdata] = useState("")
    const newwishlist = async () => {
        let user = JSON.parse(localStorage.getItem("userdata"));

          try {
            const foldername = await axios({
              method: "post",
              url: `${Constant.baseUrl()}/wishlist/getNames`,
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
              data: {
                requestParams: {
                  customer_id: user?.id,
                },
              },
            });
            let temp = foldername.data.find(fd => fd.wishlist_name === newwishdata)
            // return  
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
                  wk_name: temp !== undefined ? "" : newwishdata
                },
              },
            });
          } catch (e) {
            console.log(e);
          }
        
        let isValidUser = JSON.parse(localStorage.getItem("userdata"))?.group_id;
    
        // if (isValidUser === 5) {
        //   let temp =
        //     event === "add_to_cart"
        //       ? AddToCartAndPendingInvoice("add_to_cart")
        //       : event === "pending_invoice"
        //       ? AddToCartAndPendingInvoice("pending_invoice")
        //       : "";
        // } else {
        //   swal.fire({
        //     text: `${
        //       event === "add_to_cart"
        //         ? "Login as a buyer to add cart"
        //         : event === "add_to_wishlist"
        //         ? "Login as a buyer to add wishlist"
        //         : "Login as a buyer to add pending invoice"
        //     }`,
        //     icon: "error",
        //     showConfirmButton: false,
        //     timer: 3000,
        //   });
        // }
      };
      

    const [fname, setfname] = useState([])
    useEffect(async() => {
        let user = JSON.parse(localStorage.getItem('userdata'))
        try {
            const foldernames = await axios({
                method: 'post',
                url: `${Constant.baseUrl()}/wishlist/getNames`,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                data: {
                    requestParams: {
                        customer_id: user.id
                    }
                }
            })
            setfname(foldernames?.data)
        } catch(e) {
            console.log(e)
        }
    }, [])

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
                <div className='wishlist_main'>
                    <Clear className="clear_btn" onClick={() => handleClose()} />
                    <div className='wishlist_product'>
                        <span>
                            <img
                                className="wishlist_img"
                                src={`${Constant?.imageBaseUrl()}${pdpSellerData?.brand}`}
                                alt=""
                            />
                        </span>
                        <span className="description">
                            {pdpSellerData?.description}
                        </span>
                    </div>
                    <div className='wishlist_product_section'>
                        <p>Add to the existing Wishlist</p>
                        <FormGroup>
                            {fname?.map((f,i) => <FormControlLabel control={<Checkbox onChange={(e) => wishlistselect(f, e.target.checked)} />} label={f?.wishlist_name} />)}
                        </FormGroup>
                    </div>
                    <div className='wishlist_bts'>
                        <Button className='wishlist_create_btn' onClick={create}>Create New Wishlist</Button>
                        <Button className='wishlist_add_btn' onClick={newwishlist}>Add</Button>
                    </div>
                    {create1 &&
                        <div className='inputplace'>
                            <span className='inputfield'>
                                <TextField
                                    id="outlined-required"
                                    name='save'
                                    placeholder="Name"
                                    onChange={(e) => setnewwishdata(e.target.value)}
                                />
                                <button className='wishlist_save_btn' onClick={newwishlist}>Save</button>

                            </span>
                            <p>Cancel</p>
                        </div>
                    }
                    <div className='back_to_pdp'>
                        <ArrowBackIosIcon /><p className='back'>Back to{pdpSellerData?.model_number}</p>
                    </div>
                </div>
            </>
        </Modal>
    )
}
export default Index;