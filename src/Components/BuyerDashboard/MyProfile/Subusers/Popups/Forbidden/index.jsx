import React from 'react'
import { Clear } from "@mui/icons-material";
import './styles.scss'

const Index = ({ closePOPup }) => {
    const text =[
        {id:1, text:"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.",}
    ]
    return (
        <div className='forbidden_main'>
            <div className='forbidden_popup'>
                <div className='forbidden_block'>
                    <Clear onClick={() => closePOPup(false)} className='clear'/>
                    <p className='heading'>Forbidden Access</p>
                </div>
                <div className='forbidden_list'>
                    {text.map((item) => (
                        <li href={item.id} className='forbidden_list_content'>
                            <span>{item.text}</span>
                        </li>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Index;
