import React ,{ useState, useEffect } from 'react'
import { Clear } from "@mui/icons-material";
import './styles.scss'
import {Modal,Backdrop } from "@mui/material";
// import Modal from '@mui/material/Modal';

const Index = ({ closePOPup, sublist, cid }) => {
    const [open, setOpen] = useState(true);
    const [listt, setlistt] = useState([])
    useEffect(() => {
        debugger
        console.log(sublist)
        console.log(cid)
        sublist?.map(sl => {
            if(sl?.entity_id === cid) {
                setlistt(sl?.available_permissions)
            }
        })
    }, [])
    console.log(listt)

    const list = [
        { id: 1, list: "Cart Approval Required" },
        { id: 2, list: "Can Merge Own Cart To Main Cart" },
        { id: 3, list: "Can Approve Carts" },
        { id: 4, list: "Can Place Orders" },
        { id: 5, list: "Force Usage Main Account Address" },
        { id: 6, list: "Can View Main Wishlist" },
        { id: 7, list: "Can Add To Main Wishlist" },
        { id: 8, list: "Can Remove From Main Wishlist" },
        { id: 9, list: "Can View Main Account Order List" },
        { id: 10, list: "Can View Main Account Order Details" },
        { id: 11, list: "Can View Sub Account Order List" },
        { id: 12, list: "Can View Sub Account Order Details" },
        { id: 13, list: "Will Get Notified On Order Place By Main Account" },
        { id: 14, list: "Will Get Notified On Order Place By Sub Account" },
        { id: 15, list: "Can Create Sub Accounts" },
        { id: 16, list: "Can Delete Sub Accounts" },
        { id: 17, list: "Can Login To Sub Accounts" },
        { id: 18, list: "Can Review Products" },

    ]
    console.log(listt)
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
      >
        <div  className="permissions_main">
            <div className='permissions_popup'>
                <div className='permissions_block'>
                    <Clear className='clear' onClick={() => closePOPup(false)} />
                    <p className='heading'>Allowed Permission</p>
                </div>
                <div className='permissions_list'>
                    {listt?.map((item, i) => (
                        <li href={i} className='permissions_list_content'>
                            <span>{item}</span>
                        </li>
                    ))}
                </div>
            </div>
            </div>
         </Modal >
    )
}
export default Index;
