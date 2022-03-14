import React,{useState} from 'react'
import './styles.scss'
import Newsubaccount from './Newsubaccount'
import { ArrowBackIosNew } from "@mui/icons-material";
 const Index = () => {
   const [isSub,setisSub]=useState(false)
   const Newsubacc=()=>{
    setisSub(!isSub)
    setisSubusers(false)
   }
   const [isSubusers,setisSubusers]=useState(true)
   const Users =[
     {
       id:1,
       username:"Ayush Raj",
       status:"Active",
       orderid:"00006",
       hub:"Mumbai",
       date:"11/09/21",
       Permissions:"View",
       forbidden:"View",
       auction:"Login ",
       auction2:"Edit",
       auction3:"Delete",
     },
     {
      id:2,
      username:"Tanvi Gupta",
      status:"Active",
      orderid:"00021",
      hub:"Mumbai",
      date:"09/05/21",
      Permissions:"View",
      forbidden:"View",
      auction:"Login ",
      auction2:"Edit",
      auction3:"Delete",
    }
   ]
  return (
    <>
    {isSubusers &&
    <div className='users_main'>
      <div className='users_table_section'>
      <hr></hr>
      <table className='users_table'>
            <thead>
              <tr>
                <th className='users_heading'>User Name</th>
                <th className='users_heading'>Status</th>
                <th className='users_heading'>Order ID</th>
                <th className='users_heading'>Hub</th>
                <th className='users_heading'>Date</th>
                <th className='users_heading'>Permissions</th>
                <th className='users_heading'>Forbidden</th>
                <th className='users_heading'>Action</th>
              </tr>
            </thead>
            
            <tbody>
              {Users.map((user) => (
                <tr key={user.id}>
                  <td className='users_username'>{user.username}</td>
                  <span><td className='users_status'>{user.status}</td></span>
                  <td className='users_id'>{user.orderid}</td>
                  <td className='users_hub'>{user.hub}</td>
                  <td className='users_date'>{user.date}</td>
                  <td className='users_permission'>{user.Permissions}</td>
                  <td className='users_forbidden'>{user.forbidden}</td>
                  <div className='user_auctions'>
                  <td className='users_auction'>{user.auction}</td>
                  <td className='users_auction'>{user.auction2}</td>
                  <td className='users_auction'>{user.auction3}</td>
                  </div>
                </tr>
              ))}
            
            </tbody>
          </table>
      </div>
      <div className='user_sub-account'>
        <button onClick={Newsubacc}>Add New Sub-Account</button>
      </div>
      <div className='my_profile_back'>
        <ArrowBackIosNew /><span><p className='back'>Back</p></span>
      </div>
    </div>
    }
    {isSub && <Newsubaccount/>}
    </>
  )
}
export default Index;
