import React, {useState, useEffect} from 'react'
import "./styles.scss";
import { useNavigate, useParams } from "react-router-dom";

import bg from '../../Assets/sellerdashboard/bg.png'
import notification from '../../Assets/sellerdashboard/notification.png'
import { IconButton, InputBase, Paper } from '@material-ui/core';
import SearchIcon from '@mui/icons-material/Search';
import Dashboard from '../../Components/SellerDashboard/Dashboard';
import Inventory from '../../Components/SellerDashboard/Inventory';
import RegisterProduct from '../../Components/SellerDashboard/Inventory/RegisterProduct';
import SuccessPage from '../../Components/SellerDashboard/Inventory/SuccessPage'
import UpdateProduct from '../../Components/SellerDashboard/Inventory/UpdateProduct'
import Orders from '../../Components/SellerDashboard/Orders'
import UserMgmt from '../../Components/SellerDashboard/UserMgmt/Index'
import Sidebar from '../../Components/Sidebar'

function SellerDashboard() {

    const [currentmenu, setcurrentmenu] = useState()
    let navigate = useNavigate();

    const selectmenu = (value) => {
        setcurrentmenu(value)
        navigate(`/sellerdashboard/${value}`)
        setshowregister(false)
    }

    const {currenttab} = useParams()

    const [userform, setuserform] = useState(false)

    const [showregister, setshowregister] = useState(false)

    const registerproduct = (value) => {
        setshowregister(true)
        navigate(`/sellerdashboard/${value}`)
    }

    useEffect(() => {
        if(currenttab === 'registerproduct' || currenttab === 'success' || currenttab === 'updateproduct' || currentmenu === 'addproduct' || userform === true) {
            setshowregister(true)
        }
    }, [currenttab, userform])

    console.log(showregister)

    const [registersuccess] = useState('You have submitted the product registration form successfully. once your product has been registered, you will receive a mail notification.')
    const [updatesuccess] = useState('You have updated the product details successfully.')
    const [addsuccess] = useState('You have added the product successfully.')

  return (
    <div className='sellerdashboard'>
        <img src={bg} alt="" />
        <div className='sellerboard__bg'>
            <Sidebar selectmenu={selectmenu} setcurrentmenu={setcurrentmenu} currentmenu={setcurrentmenu} currenttab={currenttab} />
            <div className='sellerdashboard__maintab'>
                {showregister === false && <div className='sellerdashboard__search'>
                    <Paper className='sellerdashboard__searchinput'  component="form"
                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}>
                            <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Search..."
                            inputProps={{ 'aria-label': 'search google maps' }}
                            className="sellerdashboard__input"
                        />
                        
                    </Paper>
                    <div className='sellerdashboard__notiIcon'>
                        <img src={notification} alt="" />
                    </div>
                    <span>Notification</span>
                </div>}
                
                {currenttab === 'dashboard' && <Dashboard />}

                {currenttab === 'inventory' && <Inventory registerproduct={registerproduct} />}

                {currenttab === 'registerproduct' && <RegisterProduct />}
                {currenttab === 'registersuccess' && <SuccessPage msg={registersuccess} />}

                {currenttab === 'updateproduct' && <UpdateProduct type="Update New Product Details"/>}
                {currenttab === 'updatesuccess' && <SuccessPage msg={updatesuccess} />}

                {currenttab === 'addproduct' && <UpdateProduct type="Add Product Details" />}
                {currenttab === 'addsuccess' && <SuccessPage msg={addsuccess} />}

                {currenttab === 'orders' && <Orders />}

                {currenttab === 'usermgmt' && <UserMgmt setuserform={setuserform} userform={userform} />}

            </div>
        </div>
    </div>
  )
}

export default SellerDashboard