import React, { useState } from 'react';
import './FAQ.scss'
import img from '../../../Assets/Career/Group 765.png'
import { TextareaAutosize } from '@material-ui/core';
import { withStyles } from "@material-ui/styles";
import styles from './styles';
import FAQs from './FAQs';


const FAQ = ({ classes }) => {
  const [description, setdescription] = useState(false)
  console.log(description)
  return (
    <div className='faqs_main'>
      <div className='faqs_heading_section'>
        <img src={img} alt='/' className='faqs_heading_img' />
        <p className='faqs_heading'>Frequently Asked Questions (FAQ's)</p>
      </div>

      <div className="faqs_table_section">
        <h3 className='faqs_table_heading'>Frequently Asked Questions (FAQ's)</h3>
        <hr className='faqs_hr1'></hr>
        {FAQs.map((item) =>
          <li key={item.id} className='faqs_table_adding'>
            <div onClick={() =>
              setdescription(!(description))} className='faqs_qns_section'>
              <img src={item.image}  alt='' className='faqs_plus_img'></img>{item.heading}
              {/* <img src={item.image}  alt='' className='faqs_plus_img'></img> */}
            </div>

            {description &&
              <div className='faqs_description'>
                <div className='v1'></div>
                {item.description}
              </div>}
            <hr className='faqs_horizental'></hr>
          </li>
        )
        }

        <div className={classes.faqs_table}>
          <p className={classes.faqs_text_heading}>Have a Question ? Type here and submit</p>
          <TextareaAutosize className={classes.faqs_textarea} minRows={6} />
          <span>
            <button className={classes.faqs_button}>Submit</button>
          </span>
        </div>
      </div>
    </div >

  )
};
export default withStyles(styles)(FAQ);
