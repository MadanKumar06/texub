import React, {useState} from 'react'
import '../KYCform/KYCform.css'
import './BuyerKYC.css'
import { Link } from 'react-router-dom'

export const BuyerKYC = ({isBuyerKYC}) => {
    const [isLicense, setisLicense] = useState(false)
    const License = () => {
        setisLicense(true)
        setisTaxCertificate(false)
        setisPassportCopy(false)


    }
    const [isTaxCertificate, setisTaxCertificate] = useState(false)
    const TaxCertificate = () => {
        setisLicense(false)
        setisTaxCertificate(true)
        setisPassportCopy(false)
    }
    const [isPassportCopy, setisPassportCopy] = useState(false)
    const PassportCopy = () => {
        setisLicense(false)
        setisTaxCertificate(false)
        setisPassportCopy(true)
    }
    //  const [isAfterKYC,setisAfterKYC] = useState(false)
    //   const After_KYC_gratitude=()=>{
    //      setisAfterKYC(!isAfterKYC)


    //  }
    return (
        <div className='Buyer_KYCform'>
        <div className='KYCform_Header' >
            <h1 className='KYCform_Header_kycform'>KYC Form</h1>
            <p  onClick={()=> isBuyerKYC(false)}
            
            className='KYCform_Header_kycform_close'>X</p>
        </div>
        <div className='KYCform_body'>
            <div className='KYCform_Bank_Docs'>
                <div className='KYCform_Bank_Docs_block'>
                    <div>
                        <div>
                            <h3 className='KYCform_headings'>1. Required Documents</h3>
                        </div>
                        <div className='KYCform_Bank_Docs_btns'>
                            <div>
                                <button onClick={License}
                                    className='KYCform_btn'>License</button>
                            </div>
                            <div>
                                <button onClick={TaxCertificate}
                                    className='KYCform_btn'>Tax Certificate</button>
                            </div>
                            <div>
                                <button onClick={PassportCopy}
                                    className='KYCform_btn'>Passport Copy</button>
                            </div>
                        </div>
                    </div>
                    <div className='KYCform_Hidden_blocks'>
                        {isLicense ?
                            <div className='KYCform_Licence_Block'>
                                <form className='KYCform_Licence_Block_form'>
                                    <div>
                                        <label className='KYCform_Licence_label'>Business Name</label>
                                        <input className='KYCform_Licence_inputfield' type="text" placeholder='Business Name'></input>
                                    </div>
                                    <div className='KYCform_office_PIN_City'>
                                        <div className='KYCform_PIN_City'>
                                            <label className='KYCform_Lic_label'>Trade LIC Number</label>
                                            <input className='KYCform_Lic_inputfields' type="text"
                                                placeholder='Trade LIC Number'></input>
                                        </div>
                                        <div className='KYCform_PIN_City'>
                                            <label className='KYCform_Expire_label'>Expiration Date</label>
                                            <input className='KYCform_Expire_inputfields' type="text" placeholder='MM/YY'></input>
                                            {/* <i class="fa fa-angle-down City_Angle_down"></i> */}
                                        </div>
                                    </div >
                                    {/* <div className='KYCform_licence'>
                                        <div className='KYCform_licence_file_heading'>
                                            <label className='KYCform_Licence_attach_label'>Attatch License</label>
                                            <p className='KYCform_Licence_format'>(sopported format:.jpg/.png/.pdf)</p>
                                        </div>
                                        <div>
                                            <input className='KYCform_Lice_inputfields' type="file"
                                                placeholder='Attatch Licence'></input>
                                        </div>
                                    </div> */}
                                    <div className='KYCform_Licence_Checkbox'>
                                        <input type="checkbox" className='KYCform_Check_box'></input>
                                        <p className='KYCform_checkbox_tag'>Automated Reminder on Expiry</p>
                                    </div>
                                </form>
                            </div>:("")
                        }
                        {isTaxCertificate?
                            <div className='KYCform_Tax_Block'>
                                <div className='KYCform_office_PIN_City'>
                                    <div className='KYCform_PIN_City'>
                                        <label className='KYCform_Lic_label'>Tax Number</label>
                                        <input className='KYCform_Lic_inputfields' type="text"
                                            placeholder='Tax Number'></input>
                                    </div>
                                    <div className='KYCform_PIN_City'>
                                        <label className='KYCform_Expire_label'>Expiration Date</label>
                                        <input className='KYCform_Expire_inputfields' type="text" placeholder='MM/YY'></input>
                                        {/* <i class="fa fa-angle-down City_Angle_down"></i> */}
                                    </div>
                                </div >
                                {/* <div className='KYCform_licence'>
                                    <div className='KYCform_licence_file_heading'>
                                        <label className='KYCform_Licence_attach_label'>Attatch Licence</label>
                                        <p className='KYCform_Licence_format'>(sopported format:.jpg/.png/.pdf)</p>
                                    </div>
                                    <div>
                                        <input className='KYCform_Lice_inputfields' type="file"
                                            placeholder='Attatch Licence'></input>
                                    </div>
                                </div> */}
                                <div className='KYCform_Licence_Checkbox'>
                                    <input type="checkbox" className='KYCform_Check_box'></input>
                                    <p className='KYCform_checkbox_tag'>Automated Reminder on Expiry</p>
                                </div>

                            </div>:("")
                        }
                        {isPassportCopy?
                            <div className='KYCform_Passport_block'>
                                <div className=' KYCform_office_PIN_City'>
                                <div className='KYCform_bank_Acc'>
                                    <label className='KYCform_Lic_label'>Full Name</label>
                                    <input className='KYCform_Expire_inputfields' type="text" placeholder='Full Name'></input>
                                    <i class="fa fa-angle-down bankname_Angle_down"></i>
                                </div>
                                <div className='KYCform_bank_Acc'>
                                    <label className='KYCform_Expire_label'>Nationality</label>
                                    <input className='KYCform_Expire_inputfields' type="text" placeholder='Nationality'></input>
                                </div>
                                </div>
                             <div className=' KYCform_office_PIN_City'>
                                <div className='KYCform_bank_Acc'>
                                    <label className='KYCform_Lic_label'>Passport Number</label>
                                    <input className='KYCform_Expire_inputfields' type="text" placeholder='Passport Number'></input>
                                    {/* <i class="fa fa-angle-down bankname_Angle_down"></i> */}
                                </div>
                                <div className='KYCform_bank_Acc'>
                                    <label className='KYCform_Expire_label'>Expiration Date</label>
                                    <input className='KYCform_Expire_inputfields' type="text" placeholder='MM/YY'></input>
                                </div>
                            </div>
                            <div className='KYCform_licence'>
                                    <div className='KYCform_licence_file_heading'>
                                        <label className='KYCform_Licence_attach_label'>Attatch Licence</label>
                                        <p className='KYCform_Licence_format'>(sopported format:.jpg/.png/.pdf)</p>
                                    </div>
                                    <div>
                                        <input className='KYCform_Lice_inputfields' type="file"
                                            placeholder='Attatch Licence'></input>
                                    </div>
                                </div>
                                <div className='KYCform_Licence_Checkbox'>
                                        <input type="checkbox" className='KYCform_Check_box'></input>
                                        <p className='KYCform_checkbox_tag'>Automated Reminder on Expiry</p>
                                </div>
                            </div>:("")
                        }
                    </div>
                </div>
                <div className='KYCform_Bankdetails'>
                    <h3 className='KYCform_headings'>2. Bank details</h3>
                    <form action=' ' className='KYCform_block'>
                        <div className='KYCform_bank_Acc'>
                            <label className='KYCform_bank_label'>Account No</label>
                            <input className='KYCform_bank_inputfield' type="text" placeholder='Account No'></input>
                        </div>
                        <div className='KYCform_bank_Acc'>
                            <label className='KYCform_bank_label'>Bank Name</label>
                            <input className='KYCform_bank_inputfield' type="text" placeholder='Bank Name'></input>
                            <i class="fa fa-angle-down bankname_Angle_down"></i>
                        </div>
                        <div className='KYCform_bank_Acc'>
                            <label className='KYCform_bank_label'>Account Holder's Name</label>
                            <input className='KYCform_bank_inputfield' type="text" placeholder='Account Holders Name'></input>
                        </div>
                        <div className='KYCform_bank_Acc'>
                            <label className='KYCform_bank_label'>Additional Info</label>
                            <input className='KYCform_bank_inputfield' type="text" placeholder='Additional Info'></input>
                        </div>

                    </form>
                </div>
            </div>
            <div className='v1'></div>
            <div className='KYCform_office_categories'>
                <div className='KYCform_office'>
                    <h3 className='KYCform_headings'>3. Office Address</h3>
                    <form className='KYCform_for_office'>
                        <div className='KYCform_office_address'>
                            <label className='KYCform_office_label'>Address Line1</label>
                            <input className='KYCform_office_inputfields' type="text" placeholder='Address Line1'></input>
                        </div>
                        <div className='KYCform_office_address'>
                            <label className='KYCform_office_label'>Address Line2</label>
                            <input className='KYCform_office_inputfields' type="text" placeholder='Address Line2'></input>
                        </div>
                        <div className='KYCform_office_PIN_City'>
                            <div className='KYCform_PIN_City'>
                                <label className='KYCform_PIN_label'>PIN/ZIP Code</label>
                                <input className='KYCform_office_inputfields' type="text" placeholder='PIN/ZIP Code'></input>
                            </div>
                            <div className='KYCform_PIN_City'>
                                <label className='KYCform_City_label'>City</label>
                                <input className='KYCform_office_inputfields' type="text" placeholder='City'></input>
                                <i class="fa fa-angle-down City_Angle_down"></i>
                            </div>
                        </div >
                        <di className='KYCform_office_address'>
                            <label className='KYCform_office_label'>Country</label>
                            <input className='KYCform_office_inputfields' type="text" placeholder='Country'></input>
                            <i class="fa fa-angle-down Categories_Angle_down"></i>
                        </di>
                    </form>
                </div>
                <div className='KYCform_Categories_blocks'>
                    <h3 className='KYCform_headings'>4. Categories</h3>
                    <div className='KYCform_Categories'>
                        <div className='KYCform_categories_inputfields_block'>
                            <input className='KYCform_categories_inputfields'
                                type="text" placeholder='Select Categories'></input>
                            <i class="fa fa-angle-down Categories_Angle_down"></i>
                        </div>
                        <div>
                           <Link to='/Submit'> 
                            <button className='KYCform_submit'
                                type="button">Submit</button>
                              </Link>   


                                

                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
    )
}

export default BuyerKYC;