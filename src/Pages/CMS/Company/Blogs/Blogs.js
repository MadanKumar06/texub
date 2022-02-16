import React from 'react'
import { Blogjson,Popularblog,Queue } from './Blogjson'
import './Blogs.scss'
import { Link } from 'react-router-dom'

const Blogs = () => {
  return (
    <div className='Blogs_main'>
      {Blogjson.map((id=1) =>
        <div key={id.id} className="Blogs_list">
          <div className='Blogs_details'>
            <div className='Blogs_date'>
              {id.date}
            </div>
            <div className='Blogs_heading'>
              {id.heading}
            </div>
            <div className='Blogs_img_section'>
              <div className='blogs_arial'>
                <img src={id.arial} alt='' className='blogs_arial_img' />
              </div>
              <div className='Blogs_social_imgs'>
                <img src={id.fb} alt='' className='Blogs_socialm' />
                <img src={id.utube} alt='' className='Blogs_socialm' />
                <img src={id.in} alt='' className='Blogs_socialm' />
                <img src={id.whatsapp} alt='' className='Blogs_socialm' />
              </div>
            </div>
            <div className='Blogs_description'>
              <span className='description'>{id.description}</span>
            </div>
            <div className='blogs_meet'>
              <img src={id.meet} alt='' />
              <span className='description'>{id.description}</span>
            </div>
          </div>
        </div>
      )}
      {Queue.map((id) =>
        <div key={id.id} className='blogs_queue_section'>
          <span className='mainheading'>{id.mainheading}</span>
          <div className='blogs_q_img_section'>
               <img src={id.image} alt='' className='blogs_q' />
            <div className='blogs_queue_text'>
             <span className='blogs_date'>{id.date}</span> 
             <span className='blogs_queue_heading'>{id.heading}</span> 
             <span className='blogs_q_text'>{id.details}</span>
             <Link to='/'> 
             <span className='blogs_readblog'>{id.blog}</span> 
             </Link>       
              </div>
            </div>
          </div>
      )}
      <div className='blogs_popular_main'>
      <p className='mainheading'>Popular Blog</p>
      <div className='blogs_popular'>
      {Popularblog.map((id) =>
      
        <div key={id.id} className='blogs_queue_section'>
          <div className='blogs_q_img_section'>
               <img src={id.image} alt='' className='blogs_q' />
            <div className='blogs_queue_text'>
             <span className='blogs_date'>{id.date}</span> 
             <span className='blogs_queue_heading'>{id.heading}</span> 
             <span className='blogs_q_text'>{id.details}</span>
             <Link to='/'> 
             <span className='blogs_readblog'>{id.blog}</span> 
             </Link>       
              </div>
            </div>
          </div>
      )}
      </div>
      </div>
    </div>
  )
}
export default Blogs;
