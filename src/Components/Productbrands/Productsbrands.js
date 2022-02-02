import React,{useState,url} from 'react'
import './Productsbrands.css'
import './Productbrands_Media.css'


import left from '../../Assets/Productlist/left_icon.png'
import hpcolor from '../../Assets/Productlist/hp_color.png'
import hp from '../../Assets/Productlist/hp_icon.png'
import dell from '../../Assets/Productlist/dell_icon.png'
import apple from '../../Assets/Productlist/apple_icon.png'
import acer from '../../Assets/Productlist/acer_icon.png'
import xiaomi from '../../Assets/Productlist/xiomi_icon.png'
import windows from '../../Assets/Productlist/windows_icon.png'
import samsung from '../../Assets/Productlist/samsung_icon.png'
import right from '../../Assets/Productlist/right_icon.png'
//import Productlists1 from '../../Components/Plplist'
import Laptops from '../Laptops'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";


 const Slides = () =>
   [
     {   id:1,
         Image:hp,
     },    
     {   id:2,
        Image:dell,
     },
     {   id:3,
        Image:apple,
    },
    {   id:4,
        Image:acer,
    },
    {   id:5,
        Image:samsung,
    },
    {   id:6,
        Image:hpcolor,
    },    
    {   id:7,
        Image:dell,
    },     
    {   id:8,
        Image:windows,
    },     
    {   id:9,
        Image:hpcolor,
    } ,     
    ].map(num => (
        
       <div key={num.id} className='ProductBrand_first_Slider'>
         <img  src={num.Image}  alt=" " className='Slider_icons'/> 
       </div>     ));
// export function SampleNextArrow(props) {
//         const { className, style, onClick } = props;
//         return (
//           <div
//             className={className}
//             style={{ ...style, display: "block", background: "red" }}
//             onClick={onClick}
//           />
//         );
//       }
//  export function SamplePrevArrow(props) {
//     const { className, style, onClick } = props;
//     return (
//       <div
//         className={className}
//         style={{ ...style, display: "block", background: "green" }}
//         onClick={onClick}
//       />
//     );
//   }
// const {onClick } = props;

export const Productsbrands = () => {
    const [isLaptops,setisLaptops] = useState(true)
    // let Settings ={
    //     dots:false,
    //     infinite:true,
    //       slidesToShow:4,
    //       slidesToScroll:1,
    //     //    autoplay:false,
    //     //   autoplaySpeed:500
    //     cssEase:"linear"
    // }
    function Arrow(props) {
        let className =
          props.type === "next" ? "Carosal_nextArrow" : "Carosal_prevArrow";
        className += " arrow";
        const char =
          props.type === "next"
            ? "fas fa-chevron-circle-right text-success fa-2x"
            : "fas fa-chevron-circle-left text-success fa-2x";
        return (
          <span className={className} onClick={props.onClick}>
            <i className={char} />
          </span>
        );
      } 
    const Productsicon = {
        dots: false,
        infinite: true,
         nextArrow: <Arrow type="next" />,
         prevArrow: <Arrow type="prev" />,
        responsive: [
          {
            breakpoint: 1921,
            settings: {
              slidesToShow: 8,
              slidesToScroll: 2,
              initialSlide: 8,
            },
          },
          {
            breakpoint: 1600,
            settings: {
              slidesToShow: 7,
              slidesToScroll: 2,
              initialSlide: 7,
            },
          },
          {
            breakpoint: 1440,
            settings: {
              slidesToShow: 6,
              slidesToScroll: 2,
              initialSlide: 6,
            },
          },
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 6,
              slidesToScroll: 2,
              initialSlide: 4,
            },
          },
          {
            breakpoint: 769,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 2,
              initialSlide: 3,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
            initialSlide: 2,
            },
          },
          {
            breakpoint: 320,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            initialSlide: 2,
            },
          },
        ],
      };
    const Productsbtns = {
        dots: false,
        infinite: true,
         nextArrow: <Arrow type="next" />,
         prevArrow: <Arrow type="prev" />,
        responsive: [
          {
            breakpoint: 1921,
            settings: {
              slidesToShow: 8,
              slidesToScroll: 2,
              initialSlide: 8,
            },
          },
          {
            breakpoint: 1600,
            settings: {
              slidesToShow: 7,
              slidesToScroll: 2,
              initialSlide: 7,
            },
          },
          {
            breakpoint: 1440,
            settings: {
              slidesToShow: 6,
              slidesToScroll: 2,
              initialSlide: 6,
            },
          },
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 6,
              slidesToScroll: 2,
              initialSlide: 4,
            },
          },
          {
            breakpoint: 769,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 2,
              initialSlide: 3,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
            initialSlide: 2,
            },
          },
          {
            breakpoint: 320,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            initialSlide: 1,
            },
          },
          
        ],
      };      

    
    return (
        <div className='Productsbrands'> 
        
          {/* <div className="Productbrands_Icon">
                <img className="Brand_Icons" src={left} alt="" /> 
                </div>  */}
                {/* <Arrow/> */}
                <div className='Slider_Section'>
                    <Slider {...Productsicon} className='slide_Test' >                        
                      {Slides()}
                    </Slider>
                
             {/* <Slider
           dots={false}
        //    infinite={true}
          slidesToShow={4}
          slidesToScroll={1}
           autoplay={false}
          autoplaySpeed={500}
         >           
        {renderSlides()}
                          </Slider> */}
      
             </div>
             {/* <div>
             <img className="Brand_Icons1" src={right} alt="" />
             </div> */}
             
             
             
                {/* <Slider {...Settings}>
                 <img className="Brand_Icons" src={apple} alt="" />
                <img className="Brand_Icons" src={hpcolor} alt="" />
                <img className="Brand_Icons" src={dell} alt="" />
                <img className="Brand_Icons" src={acer} alt="" />
                <img className="Brand_Icons" src={samsung} alt="" />
                <img className="Brand_Icons" src={windows} alt="" />
                <img className="Brand_Icons" src={xiaomi} alt="" />
                <img className="Brand_Icons" src={hp} alt="" />
                <img className="Brand_Icons" src={apple} alt="" />
                <img className="Brand_Icons" src={acer} alt="" />
                <img className="Brand_Icons" src={dell} alt="" />
                <img className="Brand_Icons" src={samsung} alt="" />
                <img className="Brand_Icons" src={windows} alt="" />
                <img className="Brand_Icons" src={acer} alt="" />
                <img className="Brand_Icons" src={dell} alt="" />
                <img className="Brand_Icons" src={xiaomi} alt="" /> 
                </Slider> */}
                {/* <img className="Brand_Icons" src={right} alt="" /> */}
            
            {/* <div className="Productbrands_btn">
                <div>
                  <img className="Productbrands_Icons_left" src={left} alt="" />
            </div>*/}
               <Slider {...Productsbtns} className='slide_Test'>   
                <div className='Productbrands_Laptops_btn'>
                <button className="Productbrands_btn_content_list" 
                onClick={(e) => 
                    setisLaptops(!isLaptops)}
                //     onMouseLeave={(e) => 
                //         setisLaptops(isLaptops) 
                // }
                
                     type="button">Laptops</button>
                    {isLaptops &&
                
                          <ul className='Productbrands_btn_Laptops_Dropdown'>
                                  {Laptops.map(((item) => (
                                         
                                   <li href={item.path} className='Productbrands_btn_Laptops_Dropdown_Content'>
                                       {item.display}    ({item.count})</li>
                                     
                                   )))}
                           </ul>
                          }
                          
                </div>
        
                 <div  className='Productbrands_Laptops_btn'><button  className="Productbrands_btn_content_list"type="button">Notebook</button></div>
                 <div className='Productbrands_Laptops_btn'><button  className="Productbrands_btn_content_list"type="button">Desktop</button></div>
                 <div className='Productbrands_Laptops_btn'><button  className="Productbrands_btn_content_list"type="button">Tablets</button></div>
                 <div className='Productbrands_Laptops_btn'><button  className="Productbrands_btn_content_list"type="button">Printers</button></div>
                 <div className='Productbrands_Laptops_btn'><button  className="Productbrands_btn_content_list"type="button">Scanners</button></div>
                 <div className='Productbrands_Laptops_btn'><button  className="Productbrands_btn_content_list"type="button">Mobiles</button></div>
                 <div className='Productbrands_Laptops_btn'><button  className="Productbrands_btn_content_list"type="button">Monitors</button></div>
                 <div className='Productbrands_Laptops_btn'><button className="Productbrands_btn_content_list"type="button">Convertibles</button></div>
                 <div className='Productbrands_Laptops_btn'><button className="Productbrands_btn_content_list"type="button">Chromebook</button></div>
                 
                 </Slider>
                    {/* <ul className="Productbrands_btn_content" >
                        {
                        Productlists1.map(((item) => (
                            <li href={item.path} className="Productbrands_btn_content_list" 
                            key={item.id}
                            >{item.Display}
                            </li>
                        )))}
                    </ul> 
                    <div>
                {/* <img className="Productbrands_Icons_right" src={right} alt="" /> 
                <img className="Brand_Icons1" src={right} alt="" />
                </div> */}
            
            </div>
            
        
    )
}
