import React from 'react'
import gdpr from '../../../../Assets/Career/folder.png'
import './styles.scss'

const index = () => {
    const GDPR = [
        {
            id: 1,
            image: gdpr,
            heading: "GENERAL DATA PROTECTION REGULATOR (GDPR)",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam maecenas ultricies mi eget mauris pharetra et. Vel eros donec ac odio tempor orci dapibus. Purus sit amet luctus venenatis lectus magna fringilla urna. Enim nunc faucibus a pellentesque sit amet. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Natoque penatibus et magnis dis parturient. Vestibulum morbi blandit cursus risus at ultrices mi tempus. Tellus at urna condimentum mattis pellentesque id nibh. Cursus turpis massa tincidunt dui ut ornare lectus. Libero justo laoreet sit amet cursus sit amet dictum. Diam vel quam elementum pulvinar etiam non quam. Consequat id porta nibh venenatis cras sed. Facilisi cras fermentum odio eu feugiat pretium nibh ipsum consequat. Justo laoreet sit amet cursus sit amet",
        }
    ]
    return (
        <div className='gdpr_main'>
            <div className='gdpr_heading'>
                <div>
                {GDPR.map((item) =>
                    <li key={item.id} className='gdpr_heading_list'>
                        <img src={item.image} alt="/" className='gdpr_img' /> <span className='heading'>{item.heading}</span>
                    </li>
                )
                }
                </div>
                <div className='gdpr_description'>
                    {GDPR.map((item) =>
                        <li key={item.id} className='gdpr_heading_list'>
                            <span className='description'>{item.description}</span>
                        </li>
                    )
                    }
                </div>
                <div className='gdpr_description'>
                    {GDPR.map((item) =>
                        <li key={item.id} className='gdpr_heading_list'>
                            <span className='description1'>{item.description}</span>
                        </li>
                    )
                    }
                </div>
                <div className='gdpr_description'>
                    {GDPR.map((item) =>
                        <li key={item.id} className='gdpr_heading_list'>
                            <span className='description1'>{item.description}</span>
                        </li>
                    )
                    }
                </div>
            </div>
        </div>
    )
}
export default index; 
