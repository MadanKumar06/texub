import React from 'react'
import './Blogsmain.scss'
import { Popularblog } from '../Blogjson'
import { Link } from 'react-router-dom'
import { Blogsmainjson, Blogsmainjson2 } from './Blogsmainjson'

const Blogsmain = () => {
    return (
        <div className='Blogsmain_main'>
            <div className='Blogsmain_1st_section'>
                {Blogsmainjson.map((id = 1) =>
                    <div key={id.id} className="Blogs_list">
                        <div className='Blogs_details'>
                            <div className='Blogs_img_section'>
                                <div className='blogs_arial'>
                                    <img src={id.image} alt='' className='blogs_arial_img' />
                                </div>
                            </div>
                            <div className='Blogs_heading'>
                               <span className='Blogs_heading1'> {id.heading}</span>
                               <span className='Blogs_date'> {id.date} </span>
                            </div>
                            <div className='Blogs_description'>
                                <span className='description'>{id.description}</span>
                            </div>
                            <div className='Blogs_description'>
                            <Link to='/blogsdetails'>
                                <span className='Blogs_blog'>{id.blog}</span>
                            </Link>    
                            </div>
                        </div>
                    </div>
                )}

                <div className='blogs_popular'>
                    {Blogsmainjson2.map((id) =>
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
                                    <Link to='/blogsdetails'>
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
export default Blogsmain;
