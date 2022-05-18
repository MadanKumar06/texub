import React from "react";
import Learn from "../../../Assets/Homepage Assets/Group 73.png";
import "./styles.scss";

export const SubscriptionInfo = ({ data }) => {
    return (
        <div className="subscription_required_block">
            <div >
            <img className="Benfits_img" src={data?.banneimage1} alt="" />
            </div>
            <div >
                <img className="Benfits_img" src={data?.banneimage2} alt="" />
            </div>
            <div className="subscription_content_section">
                <h2 className="subscription_title">{data?.title}</h2>
                <span className="subscription_content">{data?.content}</span>
            </div>
      </div>


       
    );
};
