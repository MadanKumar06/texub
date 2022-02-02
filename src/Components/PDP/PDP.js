import React from 'react'
import './PDP.css'
import './PDP_Media.css'
import HP from '../../Assets/Productlist/Brand_icon.png'
import Tag from '../../Assets/Productlist/Tag.png'
import Warranty from '../../Assets/Productlist/warranty.png'
import Deliver from '../../Assets/Productlist/Delivery.png'
import Retail from '../../Assets/Productlist/Retail.png'
import Deals from '../../Assets/Productlist/Deals_Icon.png'
import Discount from '../../Assets/Productlist/Discount.png'
//import Decrease from '../../Assets/Productlist/Product_reduce.png'
//import Increase from '../../Assets/Productlist/Product_increase.png'


export const PDP = ({isClick}) => {

    const PDP = [
        {
            id: 1,
            selected: false,
            SellerID: 220012,
            SellerScore: 4.5 / 5,
            PriceUnit: "INR 66,789",
            InStock: 100,
            HUB: "Mumbai",
            MOQ: 50
        },
        {
            id: 2,
            selected: true,
            SellerID: 220012,
            SellerScore: 4.5 / 5,
            PriceUnit: "INR 66,789",
            InStock: 150,
            HUB: "Mumbai",
            MOQ: 50
        },
        {
            id: 3,
            selected: true,
            SellerID: 220012,
            SellerScore: 4.5 / 5,
            PriceUnit: "INR 66,789",
            InStock: 180,
            HUB: "Mumbai",
            MOQ: 50
        },
        // {
        //     id:1,
        //     SellerID:220012,
        //     SellerScore:4.5/5, 
        //     PriceUnit:"INR 66,789", 
        //     InStock:100,
        //     HUB:"Mumbai",
        //     MOQ:50
        // },
        // {
        //     id:1,
        //     SellerID:220012,
        //     SellerScore:4.5/5, 
        //     PriceUnit:"INR 66,789", 
        //     InStock:100,
        //     HUB:"Mumbai",
        //     MOQ:50
        // }
    ]
    const PDP2 = [
        {
            id: 1,
            selected: false,
            SellerID: 220012,
            SellerScore: 4.5 / 5,
            PriceUnit: "INR 66,789",
            InStock: 100,
            HUB: "US",
            MOQ: 50
        },
        {
            id: 2,
            selected: false,
            SellerID: 220012,
            SellerScore: 4.5 / 5,
            PriceUnit: "INR 66,789",
            InStock: 100,
            HUB: "Singapore",
            MOQ: 50
        },
        {
            id: 3,
            selected: false,
            SellerID: 220012,
            SellerScore: 4.5 / 5,
            PriceUnit: "INR 66,789",
            InStock: 100,
            HUB: "US",
            MOQ: 50
        }

    ]
    return (
        <div className='PDP_page'>
            <div className='PDP_close'>
                <p  onClick={()=> isClick(false)} className='PDP_close_Symbol'>X</p>
            </div>
            <div className='Pdp_header'>
                <div className="PDP_page_Group_icon" >
                    <img className="PDP_Brand_Deals" src={Deals} alt="" />
                </div >
                <div className="PDP_page_brand_header">
                    <img className="PDP_Brand_Icon" src={HP} alt="" />
                    <img className="PDP_Brand_Icon_tag" src={Tag} alt="" />

                </div>
                <div className='PDP_Product_details'>
                    <p className='Product_Seller_id'>Seller ID : 220012</p>
                    <p className='Product_Seller_model'>PAVILION MODEL14-DV0054TU</p>
                    <p className='Product_Seller_model_details'>HP Pavilion Laptop 14-ec0036AU,AMD Ryzen™ 5 <br></br>
                        Hp 14-Dv0054Tu Pavilion Laptop (11Th Gen Intel Core <br></br>
                        processorWindows</p>
                </div>
                <div className='Product_rating_star_icons' >
                    <div>
                        <i class="fa fa-star Product_rating_icons" aria-hidden="true"></i>
                        <i class="fa fa-star Product_rating_icons" aria-hidden="true"></i>
                        <i class="fa fa-star Product_rating_icons" aria-hidden="true"></i>
                        <i class="fa fa-star Product_rating_icons" aria-hidden="true"></i>
                        <i class="fa fa-star Product_rating_icons1" aria-hidden="true"></i>
                    </div>
                    <div>
                        <u><p className='Product_rating'> 543 Reviews</p></u>
                    </div>

                </div>
                <div className='Product_Toggle_switch'>
                    <label class="switch">
                        <input type="checkbox" checked />
                        <span class="slider round"></span>
                    </label>
                    <div>
                        <p className='Product_Toggle_notification'>Notification</p>
                    </div>


                </div>
                <p className='PDP_notification_tag'>Get notified about the product's<br></br>
                 offer & availability</p>
                {/* <p>*Get Notified abut the Product's<br></br>
               offer & availability
               
               </p>  */}
            </div>

            <div className='PDP_Warranty_Deliver_Retail'>
                <div className='PDP_Warranty_Deliver_Retail_Section'>
                    <img className="PDP_Warranty_Deliver_Retail_icons" src={Warranty} alt="" />
                    <p className="PDP_Warranty_Deliver_Retail_icons_tag">Vendor Warranty For 90 Days</p>
                </div>
                <div className='PDP_Warranty_Deliver_Retail_Section'>
                    <img className="PDP_Warranty_Deliver_Retail_icons" src={Deliver} alt="" />
                    <p className="PDP_Warranty_Deliver_Retail_icons_tag">Delivers in 5-7 Bussiness Days</p>
                </div >
                <div className='PDP_Warranty_Deliver_Retail_Section'>
                    <img className="PDP_Warranty_Deliver_Retail_icons" src={Retail} alt="" />
                    <p className="PDP_Warranty_Deliver_Retail_icons_tag">Retail Box Packing</p>
                </div>
            </div>
            <div className='PDP_horizentel'>
                <hr />
            </div>
            <div className='PDP_Price_list'>
                <p className='PDP_Price_list_heading'>Best Price List From Seller</p>
            </div>
            <div className='PDP_table'>
                <table className='PDP_table_Header'>
                    <thead className='PDP_table_Header_heading'>

                        <tr>
                            <th className='PDP_table_data'>Seller ID</th>
                            <th className='PDP_table_data'>Seller Score</th>
                            <th className='PDP_table_data'>Price/Unit</th>
                            <th className='PDP_table_data'>In Stock</th>
                            <th className='PDP_table_data'>HUB</th>
                            <th className='PDP_table_data'>MOQ</th>
                        </tr>

                    </thead>
                    <tbody>
                        {PDP.map((user) => (
                            <tr>
                                <td className='PDP_table_data'>
                                    <div className='PDP_check_box'>
                                        <div className='Product_Check'>
                                            <input type="checkbox" className='Product_Check-box'></input>
                                        </div>
                                        <div className="Product_Sellerid">
                                            {user.SellerID}
                                        </div>
                                    </div>
                                </td>
                                <td className='PDP_table_data'>{user.SellerScore}</td>
                                <td className='PDP_table_data'>{user.PriceUnit}</td>
                                <td className='PDP_table_data'>{user.InStock}</td>
                                <td className='PDP_table_data_HUB'>
                                    <div className="PDP_productHUB_title">
                                        {user.HUB}
                                    </div>
                                </td>
                                <td className='PDP_productMOQ'>
                                    <div className='Product_count'>
                                        {/* <div className='Product_count_decrease'> */}
                                             <i class="fa fa-minus-circle PDP_decrease" aria-hidden="true"></i> 
                                               {/* <img src={Decrease}  className='PDP_decrease' alt=''/> */}
                                            {user.MOQ}
                                               {/* <img src={Increase} className='PDP_increase' alt=''/> */}
                                             <i class="fa fa-plus-circle  PDP_increase" aria-hidden="true"></i> 
                                        {/* </div> */}
                                    </div>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
                <div className='Products_NearestHUB'>
                    From The Nearest HUB
                </div>
                </div>
            <div className='PDP_table2'>
                    <table className='PDP_table_Header'>
                        <thead className='PDP_table2_Header_heading'>

                            <tr>
                                <th className='PDP_table2_data'>Seller ID</th>
                                <th className='PDP_table2_data'>Seller Score</th>
                                <th className='PDP_table2_data'>Price/Unit</th>
                                <th className='PDP_table2_data'>In Stock</th>
                                <th className='PDP_table2_data'>HUB</th>
                                <th className='PDP_table2_data'>MOQ</th>
                            </tr>

                        </thead>
                        <tbody>
                            {PDP2.map((user) => (
                                <tr>
                                    <td className='PDP_table_data'>
                                        <div className='PDP_check_box'>
                                            <div className='Product_Check'>
                                                <input type="checkbox" className='Product_Check-box'></input>
                                            </div>
                                            <div className="Product_Sellerid">
                                                {user.SellerID}
                                            </div>
                                        </div>
                                    </td>
                                    <td className='PDP_table_data'>{user.SellerScore}</td>
                                    <td className='PDP_table_data'>{user.PriceUnit}</td>
                                    <td className='PDP_table_data'>{user.InStock}</td>
                                    <td className='PDP_table_data_HUB'>
                                        <div className="PDP_productHUB_title">
                                            {user.HUB}
                                        </div>
                                    </td>
                                    <td className='PDP_productMOQ'>
                                        <div className='Product_count'>
                                            
                                                <i class="fa fa-minus-circle PDP_decrease" ></i> 
                                                {/* <img src={Decrease}  className='PDP_decrease' alt=''/> */}
                                                 {user.MOQ}
                                                {/* <img src={Increase} className='PDP_increase' alt=''/> */}
                                                 <i class="fa fa-plus-circle PDP_increase" ></i>
                                            
                                        </div>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>    
            <div className='PDP_btns'>
                <div className="PDP_Offers_Section" >
                    <div className="PDP_Offers">
                        <div>
                    <img className="PDP_Offers_img" src={Discount} alt="" />
                    </div>
                    <u><p className="PDP_Offers_tag">More Offers</p></u>
                    </div>
                    <div className='PDP_add2wishlist'>
                     <i class="fa fa-heart PDP_wishlist"></i>
                    {/* <i class="fa fa-heart "></i> */}
                    <u><p className='PDP_add_to_wishlist'>Add to Wishlist</p></u>
                    </div>
                </div>
                <button type="button" className="PDP_btns_wishlist"  >
                    <i class="fa fa-shopping-cart  PDP_Producttable_Wishlist"></i> Add to cart</button>
                <button type="button" className="Producttable_Addtocart_btn"  >
                    <i class="fas fa-file-invoice fa-lg  Producttable_shopping_cart"></i> Add to Pending Invoice</button>
            </div>
            <div className='Product_footer'>
                <div className='Product_footer_Modelname'>
                    <p1 className="Product_footer_heading">MODEL NAME</p1>
                    <br></br>
                    <br></br>
                    <br></br>
                    <p2>Pavilion Model14-Dv0054Tu</p2>
                </div>
                <div>
                    <p1 className="Product_footer_heading">PART NUMBER</p1>
                    <br></br>
                    <br></br>
                    <br></br>
                    <p2 className="Product_footer_heading_tag">1135G7</p2>
                </div>
                <div>
                    <p1 className="Product_footer_heading">CONDITION</p1>
                    <br></br>
                    <br></br>
                    <br></br>
                    <p2 className="Product_footer_heading_tag">New</p2>
                </div>
                <div>
                    <p1 className="Product_footer_heading">OTHER INFO</p1>
                    <br></br>
                    <br></br>
                    <br></br>
                    <p2 className="Product_footer_heading_tag">Not Available</p2>
                </div>
            </div>

        </div>
    )
}
export default PDP;
