import React, { useState } from 'react'
import './styles.scss'
import Newsubaccount from './Newsubaccount'
import { ArrowBackIosNew } from "@mui/icons-material";
import Allowedpermissions from '../Subusers/Popups/Allowedpermissions'
import Forbidden from '../Subusers/Popups/Forbidden'
import  MUITable  from '../../../MUITable'
const Index = () => {
  const [isSub, setisSub] = useState(false)
  const Newsubacc = () => {
    setisSub(!isSub)
    setisSubusers(false)
  }
  const [isPermissions, setisPermissions] = useState(false)
  const permission = () => {
    setisPermissions(true)
    setisForbidden(false)
  }
  const [isForbidden, setisForbidden] = useState(false)
  const forbidden = () => {
    setisForbidden(true)
    setisPermissions(false)
  }
  const [isSubusers, setisSubusers] = useState(true)
  const options = {
    filter: false,
    filterType: "dropdown",
    responsive: "vertical",
    selectableRows: "none",
    download: false,
    print: false,
    sort: false,
    viewColumns: false,
    search: false,
  };

  const table = [
    {
      username: "Ayush Raj",
      status: "Active",
      orderid: "00000006",
      hub: "Mumbai",
      date: "11/09/21",
      permissions:"View",
      forbidden:"View",
      action:{
       name:"Login",
       edit:"Edit",
       delete:"Delete",
      } 
      
    },
    {
      username: "Tanvi Gupta",
      status: "Active",
      orderid: "000000021",
      hub: "Mumbai",
      date: "09/05/21",
      permissions:"View",
      forbidden:"View",
      action: {
        name:"Login",
        edit:"Edit",
        delete:"Delete",
      }
    },
    
  ];
  const columns = [
    {
      name: "username",
      label: "User Name",
      options: {
        customBodyRender: (value) => {
          return <div className="directenquiries__order_id">{value}</div>;
        },
      },
    },
    {
      name: "status", label: "Status",
      options: {
        customBodyRender: (value) => {
          return (
            <div className="users_status">
              <span className="value">{value}</span>
            </div>
          );
        },
      },
    },
    { name: "orderid", label: "Order ID",
    options: {
      customBodyRender: (value) => {
        return (
          <div className="users_orderid">
            <span className="value">{value}</span>
          </div>
        );
      },
    },
  
    },
    {
      name: "hub",
      label: "Hub",
    },
    {
      name: "date",
      label: "Date",
      options: {
        customBodyRender: (value) => {
          return (
            <div className="users_date">
              <span className="value">{value}</span>
            </div>
          );
        },
      },
    },
    {
      name: "permissions",
      label: "Permissions",
      options: {
        customBodyRender: (value) => {
          return (
            <div className="users_permissions">
              <span className="value" onClick={permission}>{value}</span>
            </div>
          );
        },
      },
    },
    {
      name: "forbidden",
      label: "Forbidden",
      options: {
        customBodyRender: (value) => {
          return (
            <div className="users_permissions">
              <span className="value" onClick={forbidden} >{value}</span>
            </div>
          );
        },
      },
    },
    {
      name: "action",
      label: "Action",
      options: {
        customBodyRender: (value) => {
          return (
            <div className="users_action">
              <div className="users_action_name">{value?.name}</div>
              <div className="users_action_name">{value?.edit}</div>
              <div className="users_action_name">{value?.delete}</div>
            </div>
          );
        },
      },
    },    
  ];

  const Users = [
    {
      id: 1,
      username: "Ayush Raj",
      status: "Active",
      orderid: "00006",
      hub: "Mumbai",
      date: "11/09/21",
      Permissions: "View",
      forbidden: "View",
      auction: "Login ",
      auction2: "Edit",
      auction3: "Delete",
    },
    {
      id: 2,
      username: "Tanvi Gupta",
      status: "Active",
      orderid: "00021",
      hub: "Mumbai",
      date: "09/05/21",
      Permissions: "View",
      forbidden: "View",
      auction: "Login ",
      auction2: "Edit",
      auction3: "Delete",
    }
  ]
  return (
    <>
      {isSubusers &&
        <div className='users_main'>
        <MUITable columns={columns} table={table} options={options} className="subusers__table" />
          {/* <div className='users_table_section'>
            <hr></hr>
            <table className='users_table'>
              <thead>
                <tr className='trh'>
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
                  <tr key={user.id} className="tr">
                    <td className='users_username'>{user.username}</td>
                    <span><td className='users_status'>{user.status}</td></span>
                    <td className='users_id'>{user.orderid}</td>
                    <td className='users_hub'>{user.hub}</td>
                    <td className='users_date'>{user.date}</td>
                    <td className='users_permission' onClick={permission}>{user.Permissions}</td>
                    <td className='users_forbidden' onClick={forbidden}>{user.forbidden}</td>
                    <div className='user_auctions'>
                      <td className='users_auction'>{user.auction}</td>
                      <td className='users_auction'>{user.auction2}</td>
                      <td className='users_auction'>{user.auction3}</td>
                    </div>
                  </tr>
                ))}

              </tbody>
            </table>
          </div> */}
          <div className='my_profile_btns'>
            <div className='my_profile_back'>
              <ArrowBackIosNew /><span><p className='back'>Back</p></span>
            </div>
            <div className='user_sub-account'>
              <button onClick={Newsubacc}>Add New Sub-Account</button>
            </div>
          </div>
        </div>
      }
      {isSub && <Newsubaccount />}
      {isPermissions && <Allowedpermissions closePOPup={setisPermissions} />}
      {isForbidden && <Forbidden closePOPup={setisForbidden} />}
    </>
  )
}
export default Index;
