import React from 'react'
import contact from '../../Assets/Career/Group 982.png'
import './styles.scss'
import { TextField, Box } from '@mui/material'
import officeicon from '../../Assets/Contactus/office.png'
import mailicon from '../../Assets/Contactus/mail (2).png'
import telephoneicon from '../../Assets/Contactus/telephone.png'
import fb from '../../Assets/Homepage Assets/facebook.png'
import IN from '../../Assets/Homepage Assets/linkedin.png'
import yt from '../../Assets/Homepage Assets/youtube.png'
import wt from '../../Assets/Homepage Assets/whatsapp.png'



export const Contactus = () => {
    // let {
    //     asterisk
    // }=classes
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
        { id:1, facebook:fb, linkedin:IN, youtube:yt, whatsapp:wt,}
       
    ]
    const working = [
        {id:1, heading: "Call Us", time:"Mon - Fri, 9 Am To 5 Pm GST" }
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
                    <TextField 
                        className='inputfield'
                        label="Your Name"
                        placeholder="Your Name"
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                            required: true,
                            classes: {
                                asterisk: "asterisk",
                              },
                        }}
                        variant="outlined"
                        
                    />
                    <TextField
                        className='inputfield'
                        label="E-mail Address"
                        placeholder="E-mail Address"
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                            required: true,
                            classes: {
                                asterisk: "asterisk",
                              },
                        }}
                        variant="outlined"
                    />
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
                    <TextField
                        className='inputfield1'
                        label="Your Message"
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                            required: true,
                            classes: {
                                asterisk: "asterisk",
                              },
                               
                        }}
                        variant="outlined"
                    />
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
                        <button className='contactus_msg_btn'>Send Your Message</button>
                    </Box>

                </div>
            </div>
            <div className='contactus_map_section'>
                <img src={contact} alt='/' className='contactus_map_img' />
            </div>
        </div>
    )
}
