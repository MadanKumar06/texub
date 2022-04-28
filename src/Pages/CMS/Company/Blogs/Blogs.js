import React, { useEffect, useState } from "react";
import { Blogjson, Popularblog, Queue } from "./Blogjson";
import "./Blogs.scss";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Constant from "../../../../Constant";
import { useStateValue } from "../../../../store/state";

const Blogs = () => {
  const { id } = useParams();
  const [currentblog, setcurrentblog] = useState([]);
  const [{ geo, customnostore }, dispatch] = useStateValue();

  useEffect(async () => {
    try {
      const blogpost = await axios({
        method: "post",
        url: `${Constant.baseUrl()}/getBlog`,
        data: {
          postId: id,
        },
      });
      setcurrentblog(blogpost?.data);
    } catch (e) {
      console.log(e);
    }
  }, [id]);

  const [popularcontent, setpopularcontent] = useState([]);
  useEffect(async () => {
    try {
      const blogsdata = await axios({
        method: "get",
        url: `${Constant.baseUrl()}/blogList`,
      });
      let popular = [];
      blogsdata?.data?.filter((bd) => {
        if (bd.isPopular === "1") {
          popular.push(bd);
        }
      });
      setpopularcontent(popular);
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <div className="Blogs_main">
      {/* {Blogjson.map((id = 1) => ( */}
      <div className="Blogs_list">
        <div className="Blogs_details">
          <div className="Blogs_date">
            <span className="date">
              <span className="date_heading">Date : </span>
              <span
                dangerouslySetInnerHTML={{ __html: currentblog[0]?.createdAt }}
              ></span>
            </span>
          </div>
          <div
            className="Blogs_heading"
            dangerouslySetInnerHTML={{ __html: currentblog[0]?.title }}
          ></div>
          <div className="Blogs_img_section">
            <div className="blogs_arial">
              <img
                src={currentblog[0]?.image}
                alt=""
                className="blogs_arial_img"
              />
            </div>
            <div className="Blogs_social_imgs">
              <img src={id.fb} alt="" className="Blogs_socialm" />
              <img src={id.utube} alt="" className="Blogs_socialm" />
              <img src={id.in} alt="" className="Blogs_socialm" />
              <img src={id.whatsapp} alt="" className="Blogs_socialm" />
            </div>
          </div>
          <div className="Blogs_description">
            <span
              className="description"
              dangerouslySetInnerHTML={{ __html: currentblog[0]?.description }}
            ></span>
          </div>
          {/* <div className="blogs_meet">
              <img src={id.meet} alt="" />
              <span className="description">{id.description}</span>
              <span className="description1">{id.description}</span>
            </div> */}
        </div>
      </div>
      {/* ))} */}
      {/* {Queue.map((id) => ( */}
      <div className="blogs_queue_section">
        <span
          className="mainheading"
          // dangerouslySetInnerHTML={{ __html: currentblog[0]?.title }}
        >
          Next in the Queue
        </span>
        <div className="blogs_q_img_section">
          <img src={currentblog[1]?.image} alt="" className="blogs_q" />
          <div className="blogs_queue_text">
            <span className="blogs_date">
              <span className="date_heading">Date :</span>
              <span
                dangerouslySetInnerHTML={{ __html: currentblog[1]?.createdAt }}
              ></span>
            </span>
            <span
              className="blogs_queue_heading"
              dangerouslySetInnerHTML={{ __html: currentblog[1]?.title }}
            ></span>
            <span
              className="blogs_q_text"
              dangerouslySetInnerHTML={{ __html: currentblog[1]?.description }}
            ></span>
            <Link
              to={`/${
                customnostore ? customnostore : geo?.country_name
              }/blogsdetails/${currentblog[1]?.postId}`}
            >
              <span className="blogs_readblog">Read Blog</span>
            </Link>
          </div>
        </div>
      </div>
      {/* ))} */}
      <div className="blogs_popular_main">
        <p className="mainheading">Popular Blog</p>
        <div className="blogs_popular">
          {popularcontent?.map((id, i) => (
            <div key={i} className="blogs_queue_section">
              <div className="blogs_q_img_section">
                <div className="blog__imageholder">
                  <img src={id.image} alt="" className="blogs_q" />
                </div>
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
                  <Link
                    to={`/${
                      customnostore ? customnostore : geo?.country_name
                    }/blogsdetails/${id.postId}`}
                  >
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
export default Blogs;
