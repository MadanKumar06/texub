import {useState} from 'react'
import Validate from './Validate';
const useForm =validate => {
    const [values, setvalues] = useState({
        
            Firstname:'',
            Lastname:'',
            EmailAddress:'',
            Mobilenumber:'',
            Password:'',
            confirmpassword:'',
            Companyname:'',
            Designation:'',
            Role:'',
            Country:'',
            Region:'',
    })
    const [errors, seterrors] = useState([])
    const [isSubmitting, setisSubmitting] = useState(false)

    const handleChange = e => {
        const { name, value } = e.target;
        setvalues({
          ...values,
          [name]: value
        });
      };
    const handleSubmit= e => {
    
        
        seterrors(Validate(values));
        setisSubmitting(true);

     } ;
     return {handleChange,values,handleSubmit,errors };  
}
export default useForm;