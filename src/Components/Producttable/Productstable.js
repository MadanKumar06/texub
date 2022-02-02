import React, {useState} from 'react'
import './Productstable.css'
import './Producttable_Media.css'
import HP from './../../Assets/Productlist/hp_td_icon.png'
import Acer from '../../Assets/Productlist/acer_icon_td.png'
import Apple from '../../Assets/Productlist/apple_icon_td.png'
import Lenovo from '../../Assets/Productlist/lenovo_icon_td.png'
import Samsung from '../../Assets/Productlist/samsung_icon.png'
import PDP from '../PDP/PDP'






export const Productstable = () => {
    const [isClick, setisClick] = useState(false)
    const [onClick, setonClick] = useState(false)
    const SortBy=()=>{
      setonClick(!onClick)
    }
  const Productstablelist =[
    {
        id:1,
        BRANDNAME: HP ,
        MODELNAME:"Pavilion Model14",
        PARTNUMBER:"1135G7",
        DESCRIPTION:"HP Pavilion Laptop 14-ec0036AU,AMD",
        HUB:"Dubai",
        MOQ:"50",
        PRICE:"INR 66,999 ",
        INSTOCK:"100",
        CONDITION:"New"

    },
    {
        id:2,
        BRANDNAME:Acer,
        MODELNAME:"Acer Model14",
        PARTNUMBER:"1135G7",
        DESCRIPTION:"Acer Laptop 14-ec0036AU,AMD",
        HUB:"Dubai",
        MOQ:"50",
        PRICE:"INR 66,999",
        INSTOCK:"80",
        CONDITION:"New"

    },
    {
        id:3,
        BRANDNAME:Apple,
        MODELNAME:"Apple Model14",
        PARTNUMBER:"1135G7",
        DESCRIPTION:"Apple Macbook 14-ec0036AU,AMD",
        HUB:"Dubai",
        MOQ:"50",
        PRICE:"INR 1,10,999",
        INSTOCK:"100",
        CONDITION:"New"

    },
    {
        id:4,
        BRANDNAME:Lenovo,
        MODELNAME:" Lenovo Model14",
        PARTNUMBER:"1135G7",
        DESCRIPTION:"Lenovo Laptop 14-ec0036AU,AMD",
        HUB:"Dubai",
        MOQ:"50",
        PRICE:"INR 66,999",
        INSTOCK:"70",
        CONDITION:"New"

    },

    {
        id:5,
        BRANDNAME: Samsung,
        MODELNAME:"Samsung Model14",
        PARTNUMBER:"1135G7",
        DESCRIPTION:"samsung Laptop 14-ec0036AU,AMD",
        HUB:"Dubai",
        MOQ:"50",
        PRICE:"INR 66,999",
        INSTOCK:"100",
        CONDITION:"New"

    },
    {
        id:6,
        BRANDNAME: HP,
        MODELNAME:"HP Model14",
        PARTNUMBER:"1135G7",
        DESCRIPTION:"Xiaomi Laptop 14-ec0036AU,AMD",
        HUB:"Dubai",
        MOQ:"50",
        PRICE:"INR 66,999",
        INSTOCK:"90",
        CONDITION:"New"

    },
    {
        id:7,
        BRANDNAME:Apple,
        MODELNAME:"Apple Model14",
        PARTNUMBER:"1135G7",
        DESCRIPTION:"HP Pavilion Laptop 14-ec0036AU,AMD",
        HUB:"Dubai",
        MOQ:"50",
        PRICE:"INR 66,999",
        INSTOCK:"100",
        CONDITION:"New"

    },
     {
        id:8,
        BRANDNAME: Acer,
        MODELNAME:"Acer Model14",
        PARTNUMBER:"1135G7",
        DESCRIPTION:"HP Pavilion Laptop 14-ec0036AU,AMD",
        HUB:"Dubai",
        MOQ:"50",
        PRICE:"INR 66,999",
        INSTOCK:"100",
        CONDITION:"New"

    },
    {
        id:9,
        BRANDNAME: Lenovo,
        MODELNAME:"Lenovo Model14",
        PARTNUMBER:"1135G7",
        DESCRIPTION:"HP Pavilion Laptop 14-ec0036AU,AMD",
        HUB:"Dubai",
        MOQ:"50",
        PRICE:"INR 66,999",
        INSTOCK:"100",
        CONDITION:"New"

    },
    {
        id:10,
        BRANDNAME:HP,
        MODELNAME:"HP Model14",
        PARTNUMBER:"1135G7",
        DESCRIPTION:"HP Pavilion Laptop 14-ec0036AU,AMD",
        HUB:"Dubai",
        MOQ:"50",
        PRICE:"INR 66,999",
        INSTOCK:"100",
        CONDITION:"New"

    }
]
    return (
      <div>
        <div className="Productstable">
            <table className="Productstable_table">
              <thead className="Productstable_Header">
                <tr>
                  <th scope="col" className="Productstable_Header_Text">BRAND NAME</th>
                  <th scope="col" className="Productstable_Header_Text">MODEL NAME</th>
                  <th scope="col" className="Productstable_Header_Text">PART NUMBER</th>
                  <th scope="col" className="Productstable_Header_Text">DESCRIPTION</th>
                  <th scope="col" className="Productstable_Header_Text">HUB</th>
                  <th scope="col" className="Productstable_Header_Text">MOQ</th>
                  <th scope="col" className="Productstable_Header_Text">PRICE</th>
                  <th scope="col" className="Productstable_Header_Text">IN STOCK</th>
                  <th scope="col" className="Productstable_Header_Text">CONDITION</th>
                  <div className="Producttable_heading_icon">
                  <i class="material-icons Material_list">format_list_bulleted</i>
                  <i class='fas fa-expand-arrows-alt  Product_Fullscreen_icon'></i> {/*Glyphycon */}
                  </div>

                   {/* <th scope="col" className="Productstable_Header_Text">CONDITION</th> */}


                </tr>
             </thead>
                <tbody>
                { Productstablelist.map((user) => (
                  <tr  
                    onClick={(e) =>
                      setisClick(!isClick)}
                      key={user.id} className='Productstable_row_style'>
                    
                     
                     <td className='Productstable_list_details'>
                        <img  src={user.BRANDNAME} width="40px" alt=" "/>
                       </td>
                     <td className='Productstable_list_details'>{user.MODELNAME}</td>
                     <td className='Productstable_list_details'>{user.PARTNUMBER}</td>
                     <td className='Productstable_list_details_description'>{user.DESCRIPTION}</td>
                     <td className='Productstable_list_details'>{user.HUB}</td>
                     <td className='Productstable_list_details'>{user.MOQ}</td>

                     <td className='Productstable_list_details_price' >
                     <div className='Price_btn'>
                       {user.PRICE}
                       </div>
                       </td>

                     <td className='Productstable_list_details'>{user.INSTOCK}</td>
                     <td className='Productstable_list_details'>{user.CONDITION}</td>
                    
                     <button type="button" className="Producttable_Addtocart_btn"  > <i class="fa fa-shopping-cart  Producttable_shopping_cart"></i> Add to cart</button>
                     
                     {isClick && (<PDP isClick={setisClick}/>
                         
                     )

                       } 
                     </tr>
                ))}
              </tbody>
              </table>
              
        </div>
      <div className='Mobile_View'>
        {/* <div className='Mobile_View_Buttons'>
        <button type='botton' className='Mobile_buttons_sortby'
         onClick={SortBy}
        >Sort by Position <i class="fa fa-angle-down  Product_Download_icon"></i></button> 
        <button type='botton' className='Mobile_Arrow_Up'><span>&#8593;</span></button> 
         {onClick&&
        <div className='Mobile_buttons_sortby_Onclick'>
          <p className='Mobile_buttons_sortby_Onclick_option'>Sort by Position</p>
          <p className='Mobile_buttons_sortby_Onclick_option'>Sort by Product Name</p>
          <p className='Mobile_buttons_sortby_Onclick_option'>Sort by Price</p>
        </div>
        }
        
        </div> */}
       
      <div className='Mobile_View_Table'>
        <div className='Mobile_View_Table_Header'>
           <h2 className='Mobile_View_Table_Header_Heading'>PRODUCT LIST</h2>
        </div>
        <div className='Mobile_View_Table_details'>
           <div className='Mobile_View_Table_details_1'>
             <p className='Mobile_View_Brand'>BRAND NAME :</p>
             <p className='Mobile_View_Brand_details'>DELL</p>
           </div>
           <div className='Mobile_View_Table_details_1'>
             <p className='Mobile_View_Brand'>MODEL NAME :</p>
             <p className='Mobile_View_Brand_details'>Dell Inspiron Ryzen 5 Hexa Core 4600H</p>
           </div>
           <div className='Mobile_View_Table_details_1'>
             <p className='Mobile_View_Brand'>PART NUMBER :</p>
             <p className='Mobile_View_Brand_details'>DELL000001</p>
           </div>
           <div className='Mobile_View_Table_details_1'>
             <p className='Mobile_View_Brand'>HUB :</p>
             <p className='Mobile_View_Brand_details'>hub</p>
           </div>
           <div className='Mobile_View_Table_details_1'>
             <p className='Mobile_View_Brand'>MOQ :</p>
             <p className='Mobile_View_Brand_details'>1</p>
           </div>
           <div className='Mobile_View_Table_details_1'>
             <p className='Mobile_View_Brand'>PRICE :</p>
             <p className='Mobile_View_Brand_details'>76,00.000</p>
           </div>
           <div className='Mobile_View_Table_details_1'>
             <p className='Mobile_View_Brand'>INSTOCK :</p>
             <p className='Mobile_View_Brand_details'>10</p>
           </div>
           <div className='Mobile_View_Table_details_1'>
             <p className='Mobile_View_Brand'>CONDITION :</p>
             <p className='Mobile_View_Brand_details'>condition</p>
           </div>
        </div>

      </div>
      </div>
      </div>
      
    )
}
