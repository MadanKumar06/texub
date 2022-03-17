import React, { useState,Link } from 'react'
import './styles.scss'
import { acinfo, acinfo1 } from './json'
import { ArrowBackIosNew } from "@mui/icons-material";
import EditIcon from '@mui/icons-material/Edit';
import Accountinfo from './Accountinfo'
import Addressbook from './Addressbook'
import Companyinfo from './Accountinfo/Companyinfo'
import Subusers from './Subusers'
import Edit_image from "../../../Assets/CheckoutPage/Group 913.png";

const Index = () => {
  const [isAccountinfo, setisAccountinfo] = useState(true)
  const Acinfo = () => {
    setisAccountinfo(!(isAccountinfo))
    setisEdit(false)
    setisCompany(false)
    setisAddress(false)
    setisUser(false)

  }
  const [isAddress, setisAddress] = useState(false)
  const Address1 = () => {

    setisAddress(true)
    setisAccountinfo(false)
    setisEdit(false)
    setisCompany(false)
    setisUser(false)
  }
  const [isUser, setisUser] = useState(false)
  const Subuser = () => {
    setisUser(true)
    setisAddress(false)
    setisAccountinfo(false)
  }

  const [isEdit, setisEdit] = useState(false)
  const Edit = () => {
    setisAccountinfo(false)
    setisEdit(true)
    setisCompany(false)
    setisUser(false)

  }
  const [isCompany, setisCompany] = useState(false)
  const Cedit = () => {
    setisCompany(true)
    setisAccountinfo(false)
    setisEdit(false)
    setisUser(false)
  }

  return (
    <div className='My_profile_main'>
      <div className='My_profile_btn_section'>
        <button className='My_profile_btn' onClick={Acinfo}>Account Information</button>
        <button className='My_profile_btn' onClick={Address1}>Address Book</button>
        <button className='My_profile_btn' onClick={Subuser}>Sub-Users</button>
      </div>
      {isAddress && <Addressbook open={Address1} />}

      {isUser && <Subusers />}
      {isAccountinfo &&
        <div className='My_profile_ac' >
          <span className='My_profile_main_heading'> <p >PROFILE INFORMATION</p></span>

          <div className='My_profile_ac_table'>
            <div className='my_profile_edit'>
              <img src={Edit_image} alt="" style={{height:"34px"}}/><p className='profile_edit' onClick={Edit} >Edit</p>
            </div>
            <div className='my_profile_data'>
              <div className='my_profile_data_section'>
                <p className='my_profile_data_section_heading'>NAME</p>
                <p className='my_profile_data_section_tag'>Ayush Raj</p>
              </div>
              <div className='my_profile_data_section'>
                <p className='my_profile_data_section_heading'>E-Mail</p>
                <p className='my_profile_data_section_tag'>ayush@ymail.com</p>
              </div>
              <div className='my_profile_data_section'>
                <p className='my_profile_data_section_heading'>MOBILE NUMBER</p>
                <p className='my_profile_data_section_tag'>+91-8684692367</p>
              </div>
              <div className='my_profile_data_section'>
                <p className='my_profile_data_section_heading'>PASSWORD</p>
                <p className='my_profile_data_section_tag'>***********</p>
              </div>
            </div>
          </div>

          <div className='my_profile_company'>
            <span className='My_profile_main_heading'><p>COMPANY INFORMATION</p></span>
            <div className='My_profile_ac_table'>
              <div className='my_profile_edit'>
                <img src={Edit_image} alt="" style={{height:"34px"}}/><p className='profile_edit' onClick={Cedit} >Edit</p>
              </div>
              <div className='my_profile_table'>
                <div className='my_profile_data'>
                  <div className='my_profile_data_section'>
                    <p className='my_profile_data_section_heading'>ORGANIZATION NAME</p>
                    <p className='my_profile_data_section_tag'>Tech World</p>
                  </div>
                  <div className='my_profile_data_section'>
                    <p className='my_profile_data_section_heading'>ORGANIZATION TYPE</p>
                    <p className='my_profile_data_section_tag'>Printers & copiers</p>
                  </div>
                  <div className='my_profile_data_section'>
                    <p className='my_profile_data_section_heading'>GST NUMBER</p>
                    <p className='my_profile_data_section_tag'>29Aabcu8v03</p>
                  </div>
                  <div className='my_profile_data_section'>
                    <p className='my_profile_data_section_heading'>GST CERTIFICATE</p>
                    <p className='my_profile_data_section_tag'>Certificate_Gst20456.Jpg</p>
                  </div>
                </div>
                <div className='my_profile_data1'>
                  <div className='my_profile_data_section'>
                    <p className='my_profile_data_section_heading'>SPECIALITY</p>
                    <p className='my_profile_data_section_tag'>Printers & copiers</p>
                  </div>
                  <div className='my_profile_data_section'>
                    <p className='my_profile_data_section_heading'>BRANCHES & DEPARTMENT</p>
                    <p className='my_profile_data_section_tag'>00</p>
                  </div>
                  <div className='my_profile_data_section'>
                    <p className='my_profile_data_section_heading'>AVERAGE REVENUE</p>
                    <p className='my_profile_data_section_tag'>0123456789</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='my_profile_back'>
        <ArrowBackIosNew /><span><p className='back'>Back</p></span>
      </div>
        </div>   
      }
      {isEdit && <Accountinfo />}
      {isCompany && <Companyinfo />}
    </div>
  )
}

export default Index;