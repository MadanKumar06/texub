import React, { useState, useEffect } from "react";
import "./styles.scss";
import monitor from "../../Assets/texub_buysell/monitor.png";
import red from "../../Assets/texub_buysell/red.png";
import blue from "../../Assets/texub_buysell/blue.png";
import green from "../../Assets/texub_buysell/green.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Index() {
  const [container, setcontainer] = useState([
    { color: green },
    { color: red },
    { color: blue },
  ]);
  const [content, setcontent] = useState([]);
  // const NextArrow = ({ onClick }) => {
  //     return (
  //       <div className="nextArrow" onClick={onClick}>
  //         <i className="fa fa-angle-right"></i>
  //       </div>
  //     );
  //   };
  //   const PrevArrow = ({ onClick }) => {
  //     return (
  //       <div className="prevArrow" onClick={onClick}>
  //         <i className="fa fa-angle-left"></i>
  //       </div>
  //     );
  //   };
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const setting1 = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    // nextArrow: <NextArrow onClick />,
    // prevArrow: <PrevArrow onClick />,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
    ],
  };

  const testimonialsdata = [
    {
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed ipsum dolor sit amet, consectetur adipiscing elit, sed dolor sit amet, consectetur adipiscing elit, sed",
      name: "Tom Gordon",
    },
    {
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed ipsum dolor sit amet, consectetur adipiscing elit, sed dolor sit amet, consectetur adipiscing elit, sed",
      name: "Christine Hawkins",
    },
    {
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed ipsum dolor sit amet, consectetur adipiscing elit, sed dolor sit amet, consectetur adipiscing elit, sed",
      name: "Jonathan Estrada",
    },
    {
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed ipsum dolor sit amet, consectetur adipiscing elit, sed dolor sit amet, consectetur adipiscing elit, sed",
      name: "Christine Hawkins",
    },
    {
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed ipsum dolor sit amet, consectetur adipiscing elit, sed dolor sit amet, consectetur adipiscing elit, sed",
      name: "Tom Gordon",
    },
    {
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed ipsum dolor sit amet, consectetur adipiscing elit, sed dolor sit amet, consectetur adipiscing elit, sed",
      name: "Jonathan Estrada",
    },
  ];

  useEffect(() => {
    let count = 0;
    testimonialsdata?.map((td) => {
      setcontent((prevState) => [
        ...prevState,
        {
          name: td?.name,
          content: td?.content,
          bg: container[1]?.color,
        },
      ]);
      count++;
    });
  }, []);

  return (
    <div className="sellontexub_slider">
      <div className="sellontexub__monitordata">
        <div className="sellontexub_monitortop"></div>
        <div className="sellontexub_monitorbottom"></div>
        <div className="sellontexub__monitor__carousel">
          <Slider {...settings}>
            {/* <div><img src={monitor} /></div> */}
            <div>
              <img src="http://placekitten.com/g/400/200" />
            </div>
            <div>
              <img src="http://placekitten.com/g/400/200" />
            </div>
            <div>
              <img src="http://placekitten.com/g/400/200" />
            </div>
          </Slider>
        </div>
        <img src={monitor} className="sellontexub__monitor" alt="" />
      </div>
      <div className="sellontexub__testimonials">
        <h2>Testimonials</h2>
        <ul>
          <Slider {...setting1}>
            {content?.length &&
              content?.map((c, i) => (
                <li key={i}>
                  <img src={c?.bg} alt="" />
                  <h3>{c?.name}</h3>
                  <p>{c?.content}</p>
                </li>
              ))}
          </Slider>
        </ul>
      </div>
    </div>
  );
}

export default Index;
