import React, { useState } from 'react'
import './styles.scss'
import { useNavigate, useParams } from 'react-router-dom'
import bg from '../../Assets/buyerdashboard/bg.png'

import Sidebar from '../../Components/Sidebar'

function Index() {

    const [currentmenu, setcurrentmenu] = useState()
    let navigate = useNavigate();

    const selectmenu = (value) => {
        setcurrentmenu(value)
        navigate(`/sellerdashboard/${value}`)
        // setshowregister(false)
    }

    const {currenttab} = useParams()
  return (
    <div className='buyerdashboard'>
        <img src={bg} alt="" />
        <div className='buyerboard__bg'>
            <Sidebar selectmenu={selectmenu} setcurrentmenu={setcurrentmenu} currentmenu={setcurrentmenu} currenttab={currenttab} />
            <div className='buyerdashboard__main'></div>
        </div>
    </div>
  )
}

export default Index