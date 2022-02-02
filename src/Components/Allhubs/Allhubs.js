import React from 'react'
import Departments1 from '../Data'
import './Allhubs.css'


export const Allhubs = () => {
    
    return (
        <div>
            
            {Departments1.map(((item) => (
                        <li href={item.path} className="Products_Menu_list_Content" key={item.id} >{item.display}<i class="fa fa-angle-down  Down"></i></li>

                    )))}

            
        </div>
    )
}
