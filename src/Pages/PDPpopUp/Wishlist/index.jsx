import React, { useState, useEffect } from 'react'
import './styles.scss'
import { Modal, Button, Backdrop } from "@mui/material";
import { Clear } from "@mui/icons-material";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import hp from '../../../Assets/PDP/hp@2x.png'
import TextField from '@mui/material/TextField';
const Index = ({ dataFromPLP }) => {
    const [open, setOpen] = useState(true);
    const [create1, setcreate1] = useState(false)
    const create = () => {
        setcreate1(true)
    }
    const handleClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        console.log(dataFromPLP)

        return () => {

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
                                src={dataFromPLP?.row?.[0]?.props?.children?.props?.src}
                                alt=""
                            /></span>
                        <span className="description">
                            {dataFromPLP?.row?.[1]?.props?.children}
                        </span>
                        {/* {product.map((item) => (
                    <span key={item.id} className="wishlist_product_content">
                        <span></span> <img src={item.image} alt="/" />
                        <span className='description'>{item.description}</span>
                    </span>
                ))} */}
                    </div>
                    <div className='wishlist_product_section'>
                        <p>Add to the existing Wishlist</p>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox defaultChecked />} label="Printers" />
                            <FormControlLabel disabled control={<Checkbox />} label="Mobiles" />
                        </FormGroup>
                    </div>
                    <div className='wishlist_bts'>
                        <Button className='wishlist_create_btn' onClick={create}>Create New Wishlist</Button>
                        <Button className='wishlist_add_btn'>Add</Button>
                    </div>
                    {create1 &&
                        <div className='inputplace'>
                            <span className='inputfield'>
                                <TextField
                                    id="outlined-required"
                                    name='save'
                                    placeholder="Name"
                                />
                                <button className='wishlist_save_btn'>Save</button>

                            </span>
                            <p>Cancel</p>
                        </div>
                    }
                    <div className='back_to_pdp'>
                        <ArrowBackIosIcon /><p className='back'>Back to Hp 14-Dv0054Tu Pavilion Laptop</p>
                    </div>
                </div>
            </>
        </Modal>
    )
}
export default Index;