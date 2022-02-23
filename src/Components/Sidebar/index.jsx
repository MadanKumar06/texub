import React, { useState, useEffect } from 'react'
import './styles.scss'

import dashboard from '../../Assets/sellerdashboard/dashboard.png'
import inventory from '../../Assets/sellerdashboard/inventory.png'
import orders from '../../Assets/sellerdashboard/orders.png'
import direct from '../../Assets/sellerdashboard/direct.png'
import payment from '../../Assets/sellerdashboard/payment.png'
import seller from '../../Assets/sellerdashboard/seller.png'
import report from '../../Assets/sellerdashboard/report.png'
import user from '../../Assets/sellerdashboard/user.png'
import training from '../../Assets/sellerdashboard/training.png'
import logout from '../../Assets/sellerdashboard/logout.png'

function Index({ selectmenu, setcurrentmenu, currentmenu, currenttab, color }) {
    
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
    const list1 =[
        { image: dashboard,  name: 'Dashboard', url: 'dashboard' },
        { image: inventory, name: 'My Orders', url: 'myorder' },
        { image: orders, name: 'Auctions', url: 'auctions' },
        { image: direct, name: 'Wishlist', url: 'wishlist' },
        { image: payment, name: 'Address Book', url: 'addressbook' },
        { image: seller, name: 'Account Information', url: 'accountinfo' },
        { image: report, name: 'Payment Methods', url: 'paymentmethods' },
        { image: user, name: 'Newsletter Subscription', url: 'newsletter' },
        { image: training, name: 'Returns / Replacement', url: 'returns' },
        { image: training, name: 'Sub-Accounts', url: 'subaccounts' },
        { image: training, name: 'Approve Carts', url: 'approvecarts' },
        { image: training, name: 'Merge Carts', url: 'mergecarts' },
        { image: training, name: 'Sub-Account Orders', url: 'subaccountorders' },
    ]
  return (
    <div className='sellerdashboard__sidebar'>
         <p>
            <span className='sellerlabel'>
                {color === 'yellow' && "Seller ID"}
                {color === 'blue' && "Buyer ID"}
            </span>
            <span className='sellervalue'>10013</span>
        </p>
        <ul>
            {color === "yellow" && <>
            {list.map((data, i) => <li className={`${currenttab === data.url && "sellerdashboard__currentselection" && color === 'yellow' && 'sellerbg' 
            || currenttab === data.url && "sellerdashboard__currentselection" && color === 'blue' && 'buyerbg'} `} key={i} onClick={() => selectmenu(data.url)}>
                <img src={currentmenu === data.name ? data.image1  : data.image} alt="" />
                {data.name}
                </li>)}
                <li>
                    <img src={logout} alt='' />
                    Logout
                </li>
            </>}
            {color === "blue" && <>
            {list1.map((data, i) => <li className={`${currenttab === data.url && "sellerdashboard__currentselection" && color === 'yellow' && 'sellerbg' 
            || currenttab === data.url && "sellerdashboard__currentselection" && color === 'blue' && 'buyerbg'} `} key={i} onClick={() => selectmenu(data.url)}>
                <img src={currentmenu === data.name ? data.image1  : data.image} alt="" />
                {data.name}
                </li>)}
                <li>
                    <img src={logout} alt='' />
                    Logout
                </li>
            </>}
        </ul>
    </div>
  )
}

export default Index