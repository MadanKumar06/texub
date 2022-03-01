import React from 'react'
import './styles.scss'
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import ChatBubbleRoundedIcon from '@mui/icons-material/ChatBubbleRounded';

function Index({ data }) {
  return (
    <div className='reviewcard'>
        <div className='reviewcard__header'>
            <FacebookRoundedIcon />
            <div className='reviewcard__rating'>
                <Stack spacing={1}>
                    {/* <Rating name="half-rating" defaultValue={2.5} precision={0.5} /> */}
                    <Rating name="half-rating-read" defaultValue={data?.rating} precision={0.5} readOnly />
                </Stack>
            </div>
            <span>{data?.time}</span>
        </div>
        <div className='reviewcard__body'>
            <h4>{data?.name}</h4>
            <p>{data?.content}</p>
        </div>
        <div className='reviewcard__footer'>
            <p>
                <span className='reviewcard__footerbutton'>Reply</span>
                <span className='reviewcard__replies'>
                    <ChatBubbleRoundedIcon />
                    <span>{data?.replies} replies</span>
                </span>
            </p>
        </div>
    </div>
  )
}

export default Index