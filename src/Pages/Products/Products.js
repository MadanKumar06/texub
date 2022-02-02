import React from 'react'
import { Productsbrands } from '../../Components/Productbrands/Productsbrands'
import  Productlists from '../../Components/Productlists/Productlists'
//import { Departments } from '../../Components/Departments/Departments'
import { Productstable } from '../../Components/Producttable/Productstable'
import Slider from "react-slick";

export const Products = () => {
    // const renderSlides = () =>
    // [1, 2, 3, 4, 5, 6, 7, 8].map(num => (
    //   <div>
    //     <h3>Slide {num}</h3>
    //   </div>
    // ));
    return (
        <div>
                
        {/* <Slider
        dots={false}
        slidesToShow={5}
        slidesToScroll={5}
        autoplay={true}
        autoplaySpeed={1000}
      >
        {renderSlides()}
      </Slider> */}
             
            <Productlists/> 
            <Productsbrands/>
            <Productstable/> 
        </div>
    )
}




