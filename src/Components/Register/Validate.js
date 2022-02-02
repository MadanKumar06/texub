

export default function Validate  (values) {
    let errors ={}

    if (!values.Firstname.trim()) {
        errors.Firstname = 'Firstname required';
      }
    if (!values.Lastname.trim()) {
        errors.Firstname = 'Lastname required';
      }  
    if (!values.Mobilenumber.trim()) {
        errors.Mobilenumber = 'Mobilenumber required';
      } 
    if (!values.Password.trim()) {
        errors.Password = 'Password required';
      }       
    if (!values.confirmpassword.trim()) {
        errors.confirmpassword = 'confirmpassword required';
      }  
    if (!values.Companyname.trim()) {
        errors.Companyname = 'Companyname required';
      } 
    if (!values.Designation.trim()) {
        errors.Designation = 'Designation required';
      }   
    if (!values.Role.trim()) {
        errors.Role = 'Role required';
      } 
    if (!values.Country.trim()) {
        errors.Country = 'Country required';
      }     
    if (!values.Region.trim()) {
        errors.Region = 'Region required';
      }     
          

    if (!values.EmailAddress) {
        errors.EmailAddress = 'Email required';
      } else if (!/\S+@\S+\.\S+/.test(values.EmailAddress)) {
        errors.email = 'Email address is invalid';
      }
   return errors;   

}


