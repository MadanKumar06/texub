import React from 'react';
import './Termsofuse.scss'
import Terms from '../../../Assets/Career/Terms.png'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';


 const Termstext = [
     {
         id:1,
         description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam maecenas ultricies mi eget mauris pharetra et. Vel eros donec ac odio tempor orci dapibus. Purus sit amet luctus venenatis lectus magna fringilla urna. Enim nunc faucibus a pellentesque sit amet. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Natoque penatibus et magnis dis parturient. Vestibulum morbi blandit cursus risus at ultrices mi tempus. Tellus at urna condimentum mattis pellentesque id nibh. Cursus turpis massa tincidunt dui ut ornare lectus. Libero justo laoreet sit amet cursus sit amet dictum. Diam vel quam elementum pulvinar etiam non quam. Consequat id porta nibh venenatis cras sed. Facilisi cras fermentum odio eu feugiat pretium nibh ipsum consequat. Justo laoreet sit amet cursus sit amet",
     }
 ]

 
export const Termsofuse = () => {
  return (
      <div className='Termsofuse_main'>
         <div className='Termsofuse_Description_section'> 
          <div className='Termsofuse_heading_section'>
               <img src={Terms} alt="" className='Termsofuse_terms'/>
               <h2 className='Termsofuse_heading'>Terms Of Use</h2>
          </div>
          <div className='Termsofuse_description'>  
          {Termstext.map((item) =>  
          <li key={item.id} className='Termsofuse_text'>
                {item.description}
          </li>
          )   
          }
          </div>
          <div className='Termsofuse_btn_section'>
           <FileDownloadOutlinedIcon className='Termsofuse_download'/>
          <button className='Termsofuse_decline'>Decline</button> 
          <button className='Termsofuse_accept'>Accept</button>
          </div>
          </div>
      </div>
  )};
