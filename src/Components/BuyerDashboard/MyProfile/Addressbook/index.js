import React, { useState } from "react";
import "./styles.scss";
import Billingaddress from "./Billingaddress";
import Shippingadress from "./Shippingaddress";
import Edit_image from "../../../../Assets/CheckoutPage/Group 913.png";
import { ArrowBackIosNew } from "@mui/icons-material";
import { Link } from "react-router-dom";


const Index = () => {
    const [isBilling, setisBilling] = useState(false)
    const Billaddress = () => {
        setisBilling(true)
        setisShipping(false)
        setisAddress(false)

    }
    const [isShipping, setisShipping] = useState(false)
    const Shipadress = () => {
        setisShipping(!isShipping)
        setisBilling(false)
        setisAddress(false)
    }
    const [isAddress, setisAddress] = useState(true)

    // const [isClose, setisClose]=useState(false)
    // const Addressclose=()=>{
    //     setisClose(!isClose)
    // }
    const BillingAdderess = [
        {
            id: 1,
            heading: "Default Billing Adress",
            name: "Ayush Raj",
            no: "302/1160,Tech World",
            block: "B-Block, HSR Layout",
            location: "Bangalore-Karnataka",
            pin: "560102",
        },


    ]
    const ShippingAddress = [
        {
            id: 1,
            heading: "Default Shipping Adress",
            name: "Ayush Raj",
            no: "302/1160,Tech World",
            block: "B-Block, HSR Layout",
            location: "Bangalore-Karnataka",
            pin: "560102",
        }
    ]


    return (
        <>
            {isAddress &&
                <div className='Address_main'>
                    <span className='heading'><p className='heading'>OFFICE ADDRESS</p></span>
                    <div className='Address_map'>
                        <div className='Address_Billing' >
                            {BillingAdderess.map((user) => (
                                <ul key={user.id}>
                                    <li className='address_type'>{user.heading}</li>
                                    <li className='address_name' >{user.name}</li>
                                    <div>
                                        <li className='address_block'>{user.no}</li>
                                        <li className='address_block'>{user.block}</li>
                                        <li className='address_block'>{user.location}</li>
                                        <li className='address_block'>{user.pin}</li>
                                    </div>

                                </ul>
                            )
                            )}
                            <div className='edit_section'>
                                <img src={Edit_image} alt="" style={{ height: "34px" }} /><p className='profile_edit' onClick={() => Billaddress()} >Edit</p>
                            </div>
                        </div>
                        <div class="vl"></div>
                        <div className='Address_Shipping'>
                            {ShippingAddress.map((user) => (
                                <ul key={user.id}>
                                    <li className='address_type'>{user.heading}</li>
                                    <li className='address_name' >{user.name}</li>
                                    <div>
                                        <li className='address_block'>{user.no}</li>
                                        <li className='address_block'>{user.block}</li>
                                        <li className='address_block'>{user.location}</li>
                                        <li className='address_block'>{user.pin}</li>
                                    </div>

                                </ul>
                            )
                            )}
                            <div className='edit_section'>
                                <img src={Edit_image} alt="" style={{ height: "34px" }} /><p className='profile_edit' onClick={() => Shipadress()} >Edit</p>
                            </div>

                        </div>

                    </div>
                    <div className='my_profile_back'>
                        <Link to="/buyerdashboard/dashboard" className="link">
                            <ArrowBackIosNew /><span><p className='back'>Back</p></span>
                        </Link>
                    </div>
                </div>
            }
            {isBilling && <Billingaddress />}
            {isShipping && <Shippingadress />}

        </>
    )
}
export default Index;
