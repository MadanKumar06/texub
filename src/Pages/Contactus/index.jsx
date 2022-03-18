import React, { useState } from 'react'
import contact from '../../Assets/Career/Group 982.png'
import './styles.scss'
import { TextField, Box  } from '@mui/material'
import {InputLabel  } from '@mui/material'
import {isEmailValid} from "./Utilities";
import officeicon from '../../Assets/Contactus/office.png'
import mailicon from '../../Assets/Contactus/mail (2).png'
import telephoneicon from '../../Assets/Contactus/telephone.png'
import fb from '../../Assets/Homepage Assets/facebook.png'
import IN from '../../Assets/Homepage Assets/linkedin.png'
import yt from '../../Assets/Homepage Assets/youtube.png'
import wt from '../../Assets/Homepage Assets/whatsapp.png'
import contact1 from '../../Assets/Contactus/76825.png'
import location from '../../Assets/Contactus/placeholder (2).png'




export const Contactus = () => {
    const [contactusData, setcontactusData] = useState({
        your_name: "",
        e_mail: "",
        your_message: "",
    });
    const [inputValidation, setInputValidation] = useState({
        your_name: "",
        e_mail: "",
        your_message: "",
    });
    const handleFormvalue = (event) => {
        setcontactusData((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }));
        setInputValidation("");
        handleSwitchCase([event.target.name], event.target.value);
    };
    const handleSwitchCase = (fieldName, value) => {
        switch (fieldName[0]) {
            case "your_name":
                if (!value) {
                    setInputValidation((prevState) => ({
                        ...prevState,
                        your_name: "Please enter your name.",
                    }));
                }
                break;
            case "e_mail":
                if (!value) {
                    setInputValidation((prevState) => ({
                        ...prevState,
                        e_mail: "Please enter your e-mail",
                    }));
                } else if (!isEmailValid(value)) {
                    setInputValidation((prevState) => ({
                        ...prevState,
                        e_mail: "Please enter the valid e-mail.",
                    }));
                }
                break;

            case "your_message":
                if (!value) {
                    setInputValidation((prevState) => ({
                        ...prevState,
                        your_message: "Please enter the message.",
                    }));
                }
                break;
            default:
                break;
        }
    };
    const handleClickValidation = (event) => {
        var errorHandle = false;
        if (!contactusData?.your_name) {
            document.getElementById("your_name")?.focus();
            setInputValidation((prevState) => ({
                ...prevState,
                your_name: "Please enter your name.",
            }));
            errorHandle = true;
        }
        if (!contactusData?.e_mail) {
            document.getElementById("e_mail")?.focus();
            setInputValidation((prevState) => ({
                ...prevState,
                e_mail: "Please enter your e-mail",
            }));
            errorHandle = true;
        }
        if (!contactusData?.your_message) {
            document.getElementById("your_message")?.focus();
            setInputValidation((prevState) => ({
                ...prevState,
                your_message: "Please enter your message.",
            }));
            errorHandle = true;
        }
    };
    const office = [
        {
            id: 1, icon: officeicon, heading: "Office Address", number: "23/1160,G Block,",
            landmark: "Jabel Ali Industrial Area, Dubai"
        },
    ]
    const mail = [
        { id: 1, icon: mailicon, heading: "E-Mail Address", mail: "abc@texub.com", },
    ]
    const telephone = [
        {
            id: 1, icon: telephoneicon, heading: "Call Us", number: "+9714-343 4089",
            number2: "+9714-127 5572"
        },
    ]
    const social = [
        { id: 1, facebook: fb, linkedin: IN, youtube: yt, whatsapp: wt, }

    ]
    const working = [
        { id: 1, heading: "Call Us", time: "Mon - Fri, 9 Am To 5 Pm GST" }
    ]
    const location1 = [
        {
            id: 1, image: location, address: "16 Timber Ridge Road, Sacramento, California United States", contact: "+1 917-334-7841",
        }
    ]
    const location2 = [
        {
            id: 1, image: location, address: "#427, 3rd cross, 18th main, Electronic City Bangalore, Karnataka India", contact: "+91 917-334-7841",
        }
    ]
    const location3 = [
        {
            id: 1, image: location, address: "84 Redhill Lane, West Venue, Singapore", contact: "65-91072453",
        }
    ]
    const location4 = [
        {
            id: 1, image: location, address: "Willibrorduslaan 31, Waalre, Noord-Brabant Netherlands", contact: "06-77400897",
        }
    ]
    const location5 = [
        {
            id: 1, image: location, address: "Blk 16 Rabiatu Thompson Street, Lagos Nigeria", contact: "234-8082705564",
        }
    ]
    return (
        <div className='contactus_main'>
            <div className='contactus_img_section'>
                <img src={contact} alt='/' className='contactus_img' />
            </div>

            <div className='contactus_form_section'>
                <div className='contactus_details_section'>
                    <div>
                        <span className='contactus_tag'><p>Want To Hear From Us ?</p></span>
                        <span className='contactus_heading' ><h3>Contact Us</h3></span>
                    </div>
                    <div className='contactus_details'>
                        {office.map((item) =>
                            <li key={item.id} className="contactus_office_list">
                                <div className='contactus_office'>
                                    <img src={item.icon} alt="" className='' />
                                </div>
                                <div className='contactus_office_address'>
                                    <span className='contactus_office_heading'> {item.heading}</span>
                                    <span className='contactus_office_number'>{item.number}</span>
                                    <span className='contactus_office_number'>{item.landmark}</span>

                                </div>
                            </li>
                        )
                        }
                    </div>
                    <div className='contactus_details'>
                        {mail.map((item) =>
                            <li key={item.id} className="contactus_office_list">
                                <div className='contactus_office'>
                                    <img src={item.icon} alt="" className='' />
                                </div>
                                <div className='contactus_office_address'>
                                    <span className='contactus_office_heading'> {item.heading}</span>
                                    <span className='contactus_office_number'>{item.mail}</span>
                                </div>
                            </li>
                        )
                        }
                    </div>
                    <div className='contactus_details'>
                        {telephone.map((item) =>
                            <li key={item.id} className="contactus_office_list">
                                <div className='contactus_office'>
                                    <img src={item.icon} alt="" className='' />
                                </div>
                                <div className='contactus_office_address'>
                                    <span className='contactus_office_heading'> {item.heading}</span>
                                    <span className='contactus_office_number'>{item.number}</span>
                                    <span className='contactus_office_number'>{item.number2}</span>
                                </div>
                            </li>
                        )
                        }
                    </div>
                    <div className='contactus_social'>
                        {social.map((item) =>
                            <li key={item.id} className="contactus_office_list">
                                <div className='contactus_social_media'>
                                    <span><img src={item.facebook} alt="" className='' /></span>
                                    <span><img src={item.youtube} alt="" className='' /></span>
                                    <span><img src={item.linkedin} alt="" className='' /></span>
                                    <span><img src={item.whatsapp} alt="" className='' /></span>
                                </div>

                            </li>
                        )
                        }
                    </div>
                    <div className='contactus_details'>
                        {working.map((item) =>
                            <li key={item.id} className="contactus_office_list">
                                <div className='contactus_office_address'>
                                    <span className='contactus_office_heading'>{item.heading}</span>
                                    <span className='contactus_office_number'> {item.time}</span>
                                </div>

                            </li>
                        )
                        }
                    </div>

                </div>
                <div className='contactus_form'>
                    <div>
                    <TextField
                        className='inputfield'
                        label="Your Name"
                        placeholder="Your Name"
                        name="your_name"
                        id="your_name"
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                            required: true,
                            classes: {
                                asterisk: "asterisk",
                            },
                        }}
                        onChange={handleFormvalue}
                        value={contactusData?.your_name}
                        variant="outlined"

                    />
                    <InputLabel className="validation_error">
                        {inputValidation?.your_name}
                    </InputLabel>
                    </div>
                    <div>
                    <TextField
                        className='inputfield'
                        label="E-mail Address"
                        placeholder="E-mail Address"
                        fullWidth
                        name="e_mail"
                        id="e_mail"
                        InputLabelProps={{
                            shrink: true,
                            required: true,
                            classes: {
                                asterisk: "asterisk",
                            },
                        }}
                        onChange={handleFormvalue}
                        value={contactusData?.e_mail}
                        variant="outlined"
                    />
                    <InputLabel className="validation_error">
                        {inputValidation?.e_mail}
                    </InputLabel>
                    </div>
                    <div>
                    <TextField
                        className='inputfield'
                        label="Subject"
                        placeholder="Subject"
                        fullWidth
                        InputLabelProps={{
                            shrink: true,

                        }}
                        variant="outlined"
                    />
                    </div>
                    <div>
                    <TextField
                        className='inputfield1'
                        label="Your Message"
                        fullWidth
                        placeholder="Type your message"
                        name="your_message"
                        id="your_message"
                        multiline
                        rows={3}
                        maxRows={10}
                        InputLabelProps={{
                            shrink: true,
                            required: true,
                            classes: {
                                asterisk: "asterisk",
                            },
                        }}
                        onChange={handleFormvalue}
                        value={contactusData?.your_message}
                        variant="outlined"
                    />
                   
                    <InputLabel className="validation_error">
                        {inputValidation?.your_message}
                    </InputLabel>
                    </div>
                    {/* <TextareaAutosize 
                       label="Your Message"
                       placeholder="Your Message"
                       InputLabelProps={{
                        shrink: true,
                        required: true,
                        classes: {
                            asterisk: "asterisk",
                          },
                    }}
                     minRows={6} /> */}
                    <Box textAlign="right">
                        <button className='contactus_msg_btn' onClick={() => handleClickValidation()}>Send Your Message</button>
                    </Box>

                </div>
            </div>
            <div className='contactus_map_section'>
                <p className='contactus_map_heading'>Our Other Locations</p>
                <div className="contactus_locations">

                    <div className='contactus_location1'>
                        {location1.map((item) =>
                            <li key={item.id} className="contactus_location_list">
                                <div className='contactus_locations_1'>
                                    <img src={item.image} className="location_image"></img>
                                    <span> {item.address}</span>
                                    <span>{item.contact}</span>
                                </div>
                            </li>
                        )
                        }
                    </div>
                    <div className='contactus_location1'>
                        {location2.map((item) =>
                            <li key={item.id} className="contactus_location_list">
                                <div className='contactus_locations_1'>
                                    <img src={item.image} className="location_image"></img>
                                    <span> {item.address}</span>
                                    <span>{item.contact}</span>
                                </div>
                            </li>
                        )
                        }
                    </div>
                    <div className='contactus_location1'>
                        {location3.map((item) =>
                            <li key={item.id} className="contactus_location_list">
                                <div className='contactus_locations_1'>
                                    <img src={item.image} className="location_image"></img>
                                    <span> {item.address}</span>
                                    <span>{item.contact}</span>
                                </div>
                            </li>
                        )
                        }
                    </div>


                    <div className='contactus_location1'>
                        {location4.map((item) =>
                            <li key={item.id} className="contactus_location_list">
                                <div className='contactus_locations_1'>
                                    <img src={item.image} className="location_image"></img>
                                    <span> {item.address}</span>
                                    <span>{item.contact}</span>
                                </div>
                            </li>
                        )
                        }
                    </div>
                    <div className='contactus_location1'>
                        {location5.map((item) =>
                            <li key={item.id} className="contactus_location_list">
                                <div className='contactus_locations_1'>
                                    <img src={item.image} className="location_image"></img>
                                    <span> {item.address}</span>
                                    <span>{item.contact}</span>
                                </div>
                            </li>
                        )
                        }
                    </div>


                </div>
            </div>
        </div>
    )
}
