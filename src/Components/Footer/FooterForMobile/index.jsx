import React from "react";
import {
  AccordionSummary,
  AccordionDetails,
  Accordion,
  Typography,
} from "@material-ui/core";
import { withStyles } from '@material-ui/styles';
import { ExpandMore } from "@material-ui/icons";
import styles from "./style";

const MobileFooterAccordions = ({ classes }) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.mobile_view_accordion_container}>
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
            className={classes.heading_accordion}
          >
            Company
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>About Us</Typography>
          <Typography>Terms Of Use</Typography>
          <Typography>Privacy Policy</Typography>
          <Typography>Contact Us</Typography>
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
            className={classes.heading_accordion}
          >
            Services
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Training</Typography>
          <Typography>Seller Advantage</Typography>
          <Typography>Buyer Advantage</Typography>
          <Typography>Career</Typography>
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
            className={classes.heading_accordion}
          >
            Resources
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Legal </Typography>
          <Typography>Cookies Permission </Typography>
          <Typography>GDPR </Typography>
          <Typography>FAQs </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default withStyles(styles)(MobileFooterAccordions);
