import React, { useState, useEffect } from "react";
import "./Blogsmain.scss";
import { Button, Box } from "@mui/material";
import { Popularblog } from "../Blogjson";
import { Link } from "react-router-dom";
import { Blogsmainjson, Blogsmainjson2 } from "./Blogsmainjson";
import axios from "axios";
import Constant from "../../../../../Constant";

const Blogsmain = () => {
  const [blogmain, setblogmain] = useState([]);
  const [bloglist, setbloglist] = useState([]);
  const [popularcontent, setpopularcontent] = useState([]);
  useEffect(async () => {
    try {
      const blogsdata = await axios({
        method: "get",
        url: `${Constant.baseUrl()}/blogList`,
      });
      let popular = [];
      let notpopular = [];
      blogsdata?.data?.filter((bd) => {
        if (bd.isPopular === 0) {
          popular.push(bd);
        } else {
          notpopular.push(bd);
        }
      });
      setpopularcontent(popular);
      setblogmain(notpopular);
      let temp = notpopular?.slice(1);
      setbloglist(temp);
    } catch (e) {
      console.log(e);
    }
  }, []);
  console.log(popularcontent);
  return (
    <div className="Blogsmain_main">
      <div className="Blogsmain_1st_section">
        {/* {Blogsmainjson.map((id = 1) => ( */}
        <div className="Blogs_list">
          <div className="Blogs_details">
            <div className="Blogs_img_section">
              <div className="blogs_arial">
                <img
                  src={blogmain[0]?.image}
                  alt=""
                  className="blogs_arial_img"
                />
              </div>
            </div>
            <div className="Blogs_heading">
              <span
                className="Blogs_heading1"
                dangerouslySetInnerHTML={{ __html: bloglist[0]?.title }}
              ></span>
              <span className="Blogs_date">
                <span className="date_heading">Date :</span>{" "}
                <span
                  dangerouslySetInnerHTML={{ __html: bloglist[0]?.createdAt }}
                ></span>
              </span>
            </div>
            <div className="Blogs_description">
              <span
                className="description"
                dangerouslySetInnerHTML={{
                  __html: bloglist[0]?.shortDescription,
                }}
              ></span>
            </div>
            <div className="Blogs_description">
              <Box>
                <Link
                  to={`/blogsdetails/${blogmain[0]?.postId}`}
                  className="Blogs_blog"
                >
                  <Button className="button-text btn-secondary ">
                    Read Blog
                  </Button>
                </Link>
              </Box>
            </div>
          </div>
        </div>
        {/* ))} */}

        <div className="blogs_popular">
          {bloglist?.length > 0
            ? bloglist?.map((id, i) => (
                <div key={i} className="blogs_queue_section">
                  <div className="blogs_q_img_section">
                    <div className="blog__imageholder">
                      <img src={id.image} alt="" className="blogs_q" />
                    </div>
                    <div className="blogs_queue_text">
                      <span className="blogs_date">
                        <span className="date_heading"> Date :</span>{" "}
                        <span
                          dangerouslySetInnerHTML={{
                            __html: id?.createdAt,
                          }}
                        ></span>
                      </span>
                      <span
                        className="blogs_queue_heading"
                        dangerouslySetInnerHTML={{ __html: id?.title }}
                      ></span>
                      <span
                        className="blogs_q_text"
                        dangerouslySetInnerHTML={{
                          __html: id?.shortDescription,
                        }}
                      ></span>
                      <Link to={`/blogsdetails/${id.postId}`}>
                        <span className="blogs_readblog">Read Blog</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            : ""}
        </div>
      </div>
      <div className="blogs_popular_main">
        <p className="mainheading">Popular Blog</p>
        <div className="blogs_popular">
          {popularcontent?.map((id, i) => (
            <div key={i} className="blogs_queue_section">
              <div className="blogs_q_img_section">
                <img src={id.image} alt="" className="blogs_q" />
                <div className="blogs_queue_text">
                  <span className="blogs_date">
                    <span className="date_heading">Date :</span>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: id?.createdAt,
                      }}
                    ></span>
                  </span>
                  <span
                    className="blogs_queue_heading"
                    dangerouslySetInnerHTML={{ __html: id?.title }}
                  ></span>
                  <span
                    className="blogs_q_text"
                    dangerouslySetInnerHTML={{
                      __html: id?.shortDescription,
                    }}
                  ></span>
                  <Link to={`/blogsdetails/${id.postId}`}>
                    <span className="blogs_readblog">Read Blog</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Blogsmain;
