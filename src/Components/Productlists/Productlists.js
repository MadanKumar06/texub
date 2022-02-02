import React, { useState } from 'react'
import './Productlists.css'
import './Productlists_Media.css'
//import { Allhubs } from '../Allhubs/Allhubs'
import Products1 from '../../Components/Filters'
import Icon1 from '../../Assets/Productlist/Slide_icon.png'
import Icon2 from '../../Assets/Productlist/Deals_Icon.png'
import Icon3 from '../../Assets/Productlist/Downloader.png'
import Icon4 from '../../Assets/Productlist/Up_arrow.png'
import Icon5 from '../../Assets/Productlist/Download_icon.png'


const Productlists = () => {
  const [isClick, setisClick] = useState(true)
  const List = () => {
    setisClick(!isClick)
  }
  return (
    <div className="Productslists">
      {/* <div className="Product_List_Icons"> */}

      <div className="Productslist_Head_Icon">
        <img className="Product_Head_Icons1" src={Icon1} alt="" />
        <i class="fa fa-angle-down  Products_Downloadangle" onClick={List}></i>
      </div>

      {isClick &&
        <div className='Product_icon_Section'>
          <div className='Products_icon_Section'>
            <div className='Products_icon_Section_1'>
              <img className="Product_Icon2" src={Icon2} alt="" />
              <h5 className="Products_Icon_Heading"> Today's Deal</h5>
            </div>
            <div className='Productlist_icon2_section'>
              <img className="Product_Head_Icons" src={Icon3} alt="" />
              <img className="Product_Head_Icons" src={Icon4} alt="" />
            </div>
          </div>
          <div className="Products_Search">
            <form action="">
              <div className="Product_Search_Icon">
                <a href='some'><i class="fa fa-search Product_fa_Icon"></i></a>
                <input type="text" placeholder="Search Products here.." className='Products_Search_bar' />
              </div>

            </form>

          </div >
          <div className='Productslists_HubsConditions'>
            <div className='Productslists_HubsConditions_1st'>
              <p className='Productslists_HubsConditions_text'>All Hubs <i class="fa fa-angle-down  Product_Download_icon"></i></p>
            </div>
            <div className='Productslists_HubsConditions_1st'>
              <p className='Productslists_HubsConditions_text'>All Conditions <i class="fa fa-angle-down  Product_Download_icon"></i></p>
            </div>
          </div>

          {/* <div className="Products_Menu">

              <ul className="Products_Menu_list" >
                {Products1.map(((item) => (
                  <li href={item.path}
                    className="Products_Menu_list_Content"
                    key={item.id}>
                    {item.display}<i class="fa fa-angle-down  Product_Download_icon"></i></li>

                )))}
              </ul>
            </div> */}
          <div className='Productlists_Pricesdownload'>
            <div className='Productslists_HubsConditions_1st'>
              <p className='Productslists_HubsConditions_text'>Prices<i class="fa fa-angle-down  Product_Download_icon"></i></p>
            </div>
            <div className="Product_Download_img">
              <img src={Icon5} alt="" className='Productlists_download' />
            </div>
          </div>
        </div>

      }
    </div>

  )
}

export default Productlists;