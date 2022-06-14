import React from "react";
import "./styles.scss";
import { Link } from "react-router-dom";
import {
  AccordionSummary,
  AccordionDetails,
  Accordion,
  Typography,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { useStateValue } from "../../../store/state";

const MobileFooterAccordions = () => {
  const [expanded, setExpanded] = React.useState(false);
  const [{ geo, currencyData, customnostore }, dispatch] = useStateValue();

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className="mobile_view_accordion_container">
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography
            sx={{ width: "33%", flexShrink: 0 }}
            className="heading_accordion"
          >
            Company
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Link
            to={`/${customnostore ? customnostore : geo?.country_name}/aboutus`}
            className="link"
          >
            <Typography>About Us</Typography>
          </Link>
            <Link
                to={`/${
                  customnostore ? customnostore : geo?.country_name
                }/sell-on-texub`}
                className="link"
              >
                <Typography>Sell On TEXUB</Typography>
              </Link>
              <Link
                to={`/${
                  customnostore ? customnostore : geo?.country_name
                }/buy-on-texub`}
                className="link"
              >
                <Typography>Buy On TEXUB</Typography>
              </Link>
               <Link
                to={`/${
                  customnostore ? customnostore : geo?.country_name
                  }/contactus`}
                  className="link"
                >
                <Typography>Contact Us</Typography>
              </Link>
         
         
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography
            sx={{ width: "33%", flexShrink: 0 }}
            className="heading_accordion"
          >
            Legal
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
           <Link
            to={`/${
              customnostore ? customnostore : geo?.country_name
            }/termsofuse/${currencyData?.[2]?.staticPages?.terms}`}
            className="link"
          >
            <Typography>Terms Of Use</Typography>
          </Link>
          <Link
            to={`/${
              customnostore ? customnostore : geo?.country_name
            }/privacypolicy/${currencyData?.[2]?.staticPages?.privacy}`}
            className="link"
          >
            <Typography>Privacy Policy</Typography>
          </Link>
          {/* <Link
            to={`/${
              customnostore ? customnostore : geo?.country_name
            }/rrpolicy`}
            className="link"
          >
            <Typography>Refund Policy</Typography>
          </Link> */}
          <a
           
            className="link"
          >
            <Typography>Refund Policy</Typography>
          </a>
          <Link
            to={`/${
              customnostore ? customnostore : geo?.country_name
            }/productlistingpolicy/${
              currencyData?.[2]?.staticPages?.product_listing
            }`}
            className="link"
          >
            <Typography>Product Listing Policy</Typography>
          </Link>
          {/* <Link
            to={`/${customnostore ? customnostore : geo?.country_name}/legal`}
            className="link"
          >
            <Typography>Legal </Typography>
          </Link> */}
          {/* <Typography>Cookies Permission </Typography> */}
           <a
           
            className="link"
          >
            <Typography>Cookies Permission</Typography>
          </a>
           <a
           
            className="link"
          >
            <Typography>GDPR</Typography>
          </a>
          
          {/* <Link
            to={`/${customnostore ? customnostore : geo?.country_name}/gdpr`}
            className="link"
          >
            <Typography>GDPR </Typography>
          </Link> */}
         
          {/* <Link to={`/${customnostore ? customnostore : geo?.country_name}/seller_advantage`} className="link">
            <Typography>Seller Advantage</Typography>
          </Link>
          <Link to={`/${customnostore ? customnostore : geo?.country_name}/buyer_advantage`} className="link">
            <Typography>Buyer Advantage</Typography>
          </Link> */}
         
          {/* <Link
            to={`/${customnostore ? customnostore : geo?.country_name}`}
            className="link"
          >
            <Typography>How Its Works</Typography>
          </Link> */}
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography
            sx={{ width: "33%", flexShrink: 0 }}
            className="heading_accordion"
          >
            Resources
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          
          <Link
            to={`/${customnostore ? customnostore : geo?.country_name}/Faqs`}
            className="link"
          >
            <Typography>FAQs </Typography>
          </Link>
          <a
           
            className="link"
          >
            <Typography>Blogs</Typography>
          </a>
           <Link
            to={`/${customnostore ? customnostore : geo?.country_name}/career`}
            className="link"
          >
            <Typography>Career</Typography>
          </Link>
           <a
            // to={`/${
            //   customnostore ? customnostore : geo?.country_name
            // }/training`}
            className="link"
          >
            <Typography className="footer_resource_training">Training</Typography>
          </a>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default MobileFooterAccordions;
