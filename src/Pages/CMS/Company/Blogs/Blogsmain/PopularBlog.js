import React, { useState, useEffect } from "react";
import "./Blogsmain.scss";
import { Button, Box } from "@mui/material";
import { Popularblog } from "../Blogjson";
import { Link } from "react-router-dom";
import { Blogsmainjson, Blogsmainjson2 } from "./Blogsmainjson";
import axios from "axios";
import Constant from "../../../../../Constant";
import { useStateValue } from "../../../../../store/state";

const Blogsmain = () => {
    const [blogmain, setblogmain] = useState([]);
    const [bloglist, setbloglist] = useState([]);
    const [popularcontent, setpopularcontent] = useState([]);
    const [{ geo, customnostore }, dispatch] = useStateValue();
    useEffect(async () => {
        try {
            const blogsdata = await axios({
                method: "get",
                url: `${Constant.baseUrl()}/blogList`,
            });
            let popular = [];
            let notpopular = [];
            blogsdata?.data?.filter((bd) => {
                if (bd.isPopular === "1") {
                    popular.push(bd);
                }
            });
            setpopularcontent(popular);
            setblogmain(blogsdata.data[0]);
            let temp = blogsdata?.data?.slice(1);
            setbloglist(temp);
        } catch (e) {
            console.log(e);
        }
    }, []);

    return (
        <div className="Blogsmain_main">
            
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
                                        to={`/${customnostore ? customnostore : geo?.country_name
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
export default Blogsmain;
