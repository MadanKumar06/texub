import React from 'react';
import { Grid, Box, FormControlLabel, Checkbox, Typography } from '@mui/material';
import './Career.scss'
import './Styles'
import { withStyles } from "@material-ui/styles";
import Rightarrow from '../../../../Assets/Career/Group 773.svg'
import Mask from '../../../../Assets/Career/Mask Group 2.png'
import Key from '../../../../Assets/Career/Group 1034@2x.png'
import c1 from '../../../../Assets/Career/c1.png'
import c2 from '../../../../Assets/Career/c2.png'
import c3 from '../../../../Assets/Career/c3.png'
import c4 from '../../../../Assets/Career/c4.png'
import c5 from '../../../../Assets/Career/c5.png'
import c6 from '../../../../Assets/Career/c6.png'
import Styles from './Styles';

const Career = ({ classes }) => {
    return (
        <div className='career_main'>
            <div className='career_team_section'>
                <p className='career_team_ready'>Ready To Make An Impact</p>
                <p className='career_team_join'>Join The Team</p>
                <button type="button" className="career_team_join_btn">View Openings</button>
                <img src={Key} alt="" className='career_team_img' />
            </div>
            <div className='career_joinus_section'>
                <h1 className='career_joinus_heading'>Why Join Us</h1>
                <div className='career_joinus_Check'>
                    {/* <div className='career_joinus_Check1'>
               <input type="checkbox"/>
               <label for=""> I have a bike</label><br/>
               <input type="checkbox"/>
               <label for=""> I have a bike</label><br/>
               <input type="checkbox"/>
               <label for=""> I have a bike</label><br/>
               <input type="checkbox"/>
               <label for=""> I have a bike</label><br/>
               </div>
               <div className='career_joinus_Check1'>
               <input type="checkbox"/>
               <label for=""> I have a bike</label><br/>
               <input type="checkbox"/>
               <label for=""> I have a bike</label><br/>
               <input type="checkbox"/>
               <label for=""> I have a bike</label><br/>
               <input type="checkbox"/>
               <label for=""> I have a bike</label><br/>
               </div> */}

                    <div className={classes.career_joinus_Check1}>
                        <FormControlLabel control={<Checkbox defaultChecked />}
                            label={<Typography className={classes.checkbox_label}>Fast Growing Company</Typography>} />
                        <FormControlLabel control={<Checkbox defaultChecked />}
                            label={<Typography className={classes.checkbox_label}>Latest Technology Stack</Typography>} />
                        <FormControlLabel control={<Checkbox defaultChecked />}
                            label={<Typography className={classes.checkbox_label}>Great Colleagues</Typography>} />
                        <FormControlLabel control={<Checkbox defaultChecked />}
                            label={<Typography className={classes.checkbox_label}>Cross Domain Exposure</Typography>} />
                    </div>
                    <div className={classes.career_joinus_Check1}>
                        <FormControlLabel control={<Checkbox defaultChecked />}
                            label={<Typography className={classes.checkbox_label}>Competitive Salary</Typography>} />
                        <FormControlLabel control={<Checkbox defaultChecked />}
                            label={<Typography className={classes.checkbox_label}>Targeted Bonus</Typography>} />
                        <FormControlLabel control={<Checkbox defaultChecked />}
                            label={<Typography className={classes.checkbox_label}>Learning Scopes</Typography>} />
                        <FormControlLabel control={<Checkbox defaultChecked />}
                            label={<Typography className={classes.checkbox_label}>Cross Domain Exposure</Typography>} />
                    </div>

                    <img src={Mask} alt="" className='career_joinus_img' />

                </div>
            </div>
            <div className='career_to_texub'>
                <h2 className='career_to_texub_heading'>Want to Join Texub ?</h2>
                <p className='career_to_texub_heading_tag'>Check out the open positions available and click on it fill<br></br>
                    the application form and apply</p>
                <div className='career_to_texub_developers'>
                    <h1 className='career_to_texub_developers_designation'>Front End Developer</h1>
                    <h1 className='career_to_texub_developers_location'>Banglore, Full Time</h1>
                    <span className='career_to_texub_developers_arrow' >
                    <img src={Rightarrow} alt="" />
                    </span>
                </div>
                <div className='career_to_texub_developers2'>
                    <h1 className='career_to_texub_developers_designation'>Android Developer</h1>
                    <h1 className='career_to_texub_developers_location'>Bangalore, Remote</h1>
                    <span className='career_to_texub_developers_arrow' >
                    <img src={Rightarrow} alt=""/>
                    </span>
                </div>
                <div className='career_to_texub_developers'>
                    <h1 className='career_to_texub_developers_designation'>Full Stack Developer</h1>
                    <h1 className='career_to_texub_developers_location'>Dubai, Full Time</h1>  
                    <span className='career_to_texub_developers_arrow' >               
                     <img src={Rightarrow} alt=""/>
                     </span>
                </div>
                <div className='career_to_texub_developers2'>
                    <h1 className='career_to_texub_developers_designation'>UX Designer</h1>
                    
                    <h1 className='career_to_texub_developers_location'>Bangalore, Full Time</h1>
                    <span className='career_to_texub_developers_arrow' >
                    <img src={Rightarrow} alt=""/>
                    </span>
                </div>

            </div>
            <div className='career_CultureValues'>
                <p className='career_CultureValues_Click'>Want To Know More About The Company ?   <a href=''>CLICK HERE</a></p>
                <h2 className='career_CultureValues_heading'>Our Culture & Values</h2>
                <p className='career_CultureValues_tag'>Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr, Sed Diam Nonumy Eirmod Tempor Invidunt Ut Labore Et Dolore Magna Aliquyam Erat,
                   Sed Diam Voluptua. At Vero Eos Et Accusam Et Justo Duo Dolores Et Ea Rebum.Stet Clita Kasd Gubergren, No Sea Takimata Sanctus Est Lorem Ipsum Dolor Sit 
                   Amet. Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr,Sed Diam Nonumy Eirmod Tempor Invidunt Ut Labore Et Dolore Magna Aliquyam Erat, Sed Diam Voluptua. At Vero Eos Et 
                    Et Justo Duo</p>
                <Box sx={{ flexGrow: 1 }} className={classes.img_box}>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        <Grid item xs={2} sm={4} md={4}>
                            <div className='career_CultureValues_imgs1'>
                                <img src={c1} alt="" className='career_to_texub_developers_arrow' />
                                <img src={c2} alt="" className='career_to_texub_developers_arrow' />
                                <img src={c3} alt="" className='career_to_texub_developers_arrow' />
                            </div>
                            <div className='career_CultureValues_imgs2'>
                                <img src={c4} alt="" className='career_to_texub_developers_arrow' />
                                <img src={c5} alt="" className='career_to_texub_developers_arrow' />
                                <img src={c6} alt="" className='career_to_texub_developers_arrow' />
                            </div>
                        </Grid>
                    </Grid>
                </Box>
            </div>
        </div>
    )
};
export default withStyles(Styles)(Career);
