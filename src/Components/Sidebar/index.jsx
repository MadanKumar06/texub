import React, { useState, useEffect } from 'react'
import './styles.scss'

import dashboard from '../../Assets/sellerdashboard/dashboard.png'
import inactivedashboard from '../../Assets/sellerdashboard/inactivedashboard.png'
import inventory from '../../Assets/sellerdashboard/inventory.png'
import orders from '../../Assets/sellerdashboard/orders.png'
import direct from '../../Assets/sellerdashboard/direct.png'
import payment from '../../Assets/sellerdashboard/payment.png'
import seller from '../../Assets/sellerdashboard/seller.png'
import report from '../../Assets/sellerdashboard/report.png'
import user from '../../Assets/sellerdashboard/user.png'
import training from '../../Assets/sellerdashboard/training.png'
import logout from '../../Assets/sellerdashboard/logout.png'

function Index({ selectmenu, setcurrentmenu, currentmenu, currenttab }) {
    
    useEffect(() => {
        setcurrentmenu(list[0].name)
    }, [])

    const list =[
        { image: dashboard,  name: 'Dashboard', url: 'dashboard' },
        { image: inventory, name: 'Inventory', url: 'inventory' },
        { image: orders, name: 'Orders', url: 'orders' },
        { image: direct, name: 'Direct Enquiries', url: 'directenquiries' },
        { image: payment, name: 'Payment Methods', url: 'paymentmethods' },
        { image: seller, name: 'Seller Services', url: 'sellerservices' },
        { image: report, name: 'Reports', url: 'reports' },
        { image: user, name: 'User Management', url: 'usermgmt' },
        { image: training, name: 'Training', url: 'training' },
    ]
  return (
    <div className='sellerdashboard__sidebar'>
         <p>
            <span className='sellerlabel'>Seller ID</span>
            <span className='sellervalue'>10013</span>
        </p>
        <ul>
        {list.map((data, i) => <li className={`${currenttab === data.url && "sellerdashboard__currentselection"}`} key={i} onClick={() => selectmenu(data.url)}>
            <img src={currentmenu === data.name ? data.image1  : data.image} alt="" />
            {data.name}
            </li>)}
            <li>
                <img src={logout} alt='' />
                Logout
            </li>
        </ul>
    </div>
  )
}

export default Index