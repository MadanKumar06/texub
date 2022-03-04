import React, { useState } from 'react'
import './styles.scss'
import {acinfo,acinfo1} from './json'
import { ArrowBackIosNew } from "@mui/icons-material";
import EditIcon from '@mui/icons-material/Edit';
import Accountinfo from './Accountinfo'
import Addressbook from './Addressbook'
import Companyinfo from './Accountinfo/Companyinfo'
import Subusers from './Subusers'
 
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
    console.log(isAddress)
  }
  const [isUser, setisUser] = useState(false)
  const Subuser = () =>{
    setisUser(true)
    setisAddress(false)
    setisAccountinfo(false)
  }

  const [isEdit,setisEdit]= useState(false)
  const Edit = () => {
    setisAccountinfo(false)
    setisEdit(true)  
    setisCompany(false)
    setisUser(false)
    
  }
  const [isCompany,setisCompany]=useState(false)
    const Cedit =()=>{
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
        <button className='My_profile_btn'onClick={Subuser}>Sub-Users</button>
      </div>
      {isAddress && <Addressbook open={Address1} />}
    
      {isUser && <Subusers/>}
      {isAccountinfo && 
        <div className='My_profile_ac' >
          <span className='My_profile_main_heading'> <p >PROFILE INFORMATION</p></span>
          <table className='My_profile_ac_table'>
            <thead>
              {/* <div className='my_profile_edit'>
              <EditIcon/><p>Edit</p>
              </div> */}
              <tr>
                <th className='my_profile_heading'>NAME</th>
                <th className='my_profile_heading'>E-MAIL</th>
                <th className='my_profile_heading'>MOBILE NO.</th>
                <th className='my_profile_heading'>PASSWORD</th>
              <div className='my_profile_edit'>
                 <EditIcon/><p className='profile_edit' onClick={Edit} >Edit</p>
              </div>
              </tr>
            </thead>
            <tbody>
              {acinfo.map((user) => (
                <tr key={user.id}>
                  <td className='my_profile_details'>{user.name}</td>
                  <td className='my_profile_details'>{user.email}</td>
                  <td className='my_profile_details'>{user.mobilen0}</td>
                  <td className='my_profile_details'>{user.password}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className='my_profile_company'>
            <span className='My_profile_main_heading'><p>COMPANY INFORMATION</p></span>
            <table className='My_profile_ac_table'>
              <thead>
                 <tr>
                  <th className='my_profile_heading'>ORGANIZATION NAME</th>
                  <th className='my_profile_heading'>ORGANIZATION TYPE</th>
                  <th className='my_profile_heading'>GST NUMBER</th>
                  <th className='my_profile_heading'>GST CERTIFICATE</th>
                  <th className='my_profile_heading'>SPECIALITY</th>
                  <th className='my_profile_heading'>BRANCHES & DEPARTMENT</th>
                  <th className='my_profile_heading'>AVERAGE REVENUE</th> 
                  <div className='my_profile_edit'>
                     <EditIcon/><p className='profile_edit' onClick={Cedit} >Edit</p>
                  </div>
                  </tr>
              </thead>
              
              <tbody>
                {acinfo1.map((user) => (
                  <tr >
                    <td className='my_profile_details'>{user.organizationname}</td>
                    <td className='my_profile_details'>{user.organizationtype}</td>
                    <td className='my_profile_details'>{user.gstnumber}</td>
                    <td className='my_profile_details'>{user.gstcertificate}</td>
                    <td className='my_profile_details'>{user.speciality}</td>
                    <td className='my_profile_details'>{user.branchesdepartments}</td>
                    <td className='my_profile_details'>{user.averagerevenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      }
       {isEdit && <Accountinfo />}  
       {isCompany && <Companyinfo/>} 
      
      <div className='my_profile_back'>
      <ArrowBackIosNew/><span><p className='back'>Back</p></span>
      </div>
      
    </div>
  )
}

export default Index;