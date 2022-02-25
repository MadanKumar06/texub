import React, { useState } from 'react'
import './styles.scss'

import MUIDataTable from "mui-datatables";
import { MenuItem, Select } from '@mui/material';

function Index({setuserform, userform}) {

    const edituser = () => {
        setuserform(true)
    }

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
            username: 'Ayush Raj',
            email: 'ayush@ymail.com',
            status: 'Active',
            permissions: 'View',
            forbidden: 'View',
            parentaccount: 'Ayush Raj',
            mainaccount: 'Ayush Raj',
            action: ''
        },
        {
        username: 'Tanvi Gupta',
        email: 'tanvi@ymail.com',
        status: 'Active',
        permissions: 'View',
        forbidden: 'View',
        parentaccount: 'Ayush Raj',
        mainaccount: 'Ayush Raj',
        action: ''
    },
    ]

    const columns = [
        { name: 'username', label: 'User Name' },
        { name: 'email', label: 'Email' },
        { name: 'status', label: 'Status', options: {
        customBodyRender: (value) => {
            return (
                <div className='usermgmt__status'>
                    {value}
                </div>
            )}
        }
        },
        { name: 'permissions', label: 'Permissions', options: {
        customBodyRender: (value) => {
            return (
                <div className='usermgmt__permissions'>
                    {value}
                </div>
            )}
        }
        },
        { name: 'forbidden', label: 'Forbidden', options: {
        customBodyRender: (value) => {
            return (
                <div className='usermgmt__forbidden'>
                    {value}
                </div>
            )}
        }
        },
        { name: 'parentaccount', label: 'Parent Account' },
        { name: 'mainaccount', label: 'Main Account' },
        { name: 'action', label: 'Action', options: {
        customBodyRender: (value) => {
            return (
                <div className='usermgmt__action'>
                    <p>Login</p>
                    <p onClick={edituser}>Edit</p>
                    <p>Delete</p>
                </div>
            )}
        }
        },
    ]

    const [maincat,setmaincat] = useState()
    const handleChange = () => {
        console.log(maincat)
    }

  return (
    <div className='usermgmt'>
        {userform ? 
            <div className='usermgmt__subaccount'>
                <h1>Add New Sub-Account</h1>
                <div className='usermgmt__form'>
                    <p className='usermgmt__firstname'>
                        <h5>First Name</h5>
                        <input />
                    </p>
                    <p className='usermgmt__lastname'>
                        <h5>Last Name</h5>
                        <input />
                    </p>
                    <p>
                        <h5>Email Address</h5>
                        <input />
                    </p>
                    <p>
                        <h5>Allowed Permission</h5>
                        <input />
                    </p>
                    <p>
                        <h5>Forbidden Access</h5>
                        <textarea rows="5" />
                    </p>
                    <p>
                        <h5>Active</h5>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={maincat}
                        label="Age"
                        onChange={handleChange}
                    >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                    </p>
                </div>

                <div className='usermgmt__back'>
                    <span onClick={() => setuserform(false)}>Back</span>
                    <p className='usermgmt__button'>Save Sub-Account</p>
                </div>
            </div>
        :
        <MUIDataTable
            title={""}
            data={table}
            columns={columns}
            options={options}
            className="usermgmt__table"
        />}
        
    </div>
  )
}

export default Index