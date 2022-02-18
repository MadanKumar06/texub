import React, {useState, useEffect} from 'react'
import "./styles.scss";
import bg from '../../Assets/sellerdashboard/bg.png'
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
import notification from '../../Assets/sellerdashboard/notification.png'
import { IconButton, InputBase, Paper } from '@material-ui/core';
import SearchIcon from '@mui/icons-material/Search';
import Dashboard from '../../Components/SellerDashboard/Dashboard';
import Inventory from '../../Components/SellerDashboard/Inventory';

function SellerDashboard() {

    useEffect(() => {
        setcurrentmenu(list[0].name)
    }, [])

    const list =[
        { image: inactivedashboard, image1: dashboard, name: 'Dashboard' },
        { image: inventory, name: 'Inventory' },
        { image: orders, name: 'Orders' },
        { image: direct, name: 'Direct Enquiries' },
        { image: payment, name: 'Payment Methods' },
        { image: seller, name: 'Seller Services' },
        { image: report, name: 'Reports' },
        { image: user, name: 'User Management' },
        { image: training, name: 'Training' },
        { image: logout, name: 'Logout' },
    ]

    const [currentmenu, setcurrentmenu] = useState()

    const selectmenu = (value) => {
        setcurrentmenu(value)
    }

  return (
    <div className='sellerdashboard'>
        <img src={bg} alt="" />
        <div className='sellerboard__bg'>
            <div className='sellerdashboard__sidebar'>
                <p>
                    <span className='sellerlabel'>Seller ID</span>
                    <span className='sellervalue'>10013</span>
                </p>
                <ul>
                {list.map((data, i) => <li className={`${currentmenu === data.name && "sellerdashboard__currentselection"}`} key={i} onClick={() => selectmenu(data.name)}>
                    <img src={currentmenu === data.name ? data.image1 ? data.image1 : data.image : data.image} alt="" />
                    {data.name}
                    </li>)}
                </ul>
            </div>
            <div className='sellerdashboard__maintab'>
                <div className='sellerdashboard__search'>
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
                </div>
                {currentmenu === 'Dashboard' && <Dashboard />}
                {/* {currentmenu === 'Inventory' && <Inventory />} */}
            </div>
        </div>
    </div>
  )
}

export default SellerDashboard