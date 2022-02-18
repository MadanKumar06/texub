import React from 'react';
import './styles.scss'
import certificate from '../../../../Assets/Career/certification@2x.png'
const Termstext = [
    {
        id: 1,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam maecenas ultricies mi eget mauris pharetra et. Vel eros donec ac odio tempor orci dapibus. Purus sit amet luctus venenatis lectus magna fringilla urna. Enim nunc faucibus a pellentesque sit amet. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Natoque penatibus et magnis dis parturient. Vestibulum morbi blandit cursus risus at ultrices mi tempus. Tellus at urna condimentum mattis pellentesque id nibh. Cursus turpis massa tincidunt dui ut ornare lectus. Libero justo laoreet sit amet cursus sit amet dictum. Diam vel quam elementum pulvinar etiam non quam. Consequat id porta nibh venenatis cras sed. Facilisi cras fermentum odio eu feugiat pretium nibh ipsum consequat. Justo laoreet sit amet cursus sit amet",
    }
]
export const Training = () => {
    return (
        <div className='training_main'>
            <div className='training_description_section'>
                <div className='training_Heading_section'>
                    <img src={certificate} alt="" className='training_certificate' />
                    <h2 className='training_Heading'>Training</h2>
                </div>
                <div className='training_description'>
                    {Termstext.map((item) =>
                        <li key={item.id} className='training_text'>
                            {item.description}
                        </li>
                    )
                    }
                </div>
                <div className='training_description'>
                    {Termstext.map((item) =>
                        <li key={item.id} className='training_text'>
                            {item.description}
                        </li>
                    )
                    }
                </div>
                <div className='training_description'>
                    {Termstext.map((item) =>
                        <li key={item.id} className='training_text'>
                            {item.description}
                        </li>
                    )
                    }
                </div>
            </div>

        </div>
    )
};
