import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { useStateValue } from "./store/state";
import "./App.css";

//Header section
import Header from "./Components/Header";
import { Home } from "./Pages/Home";
import { Footer } from "./Components/Footer";
import Aboutus from "./Pages/Aboutus";
import { Products } from "./Pages/Products";
import { BuyonTexhub } from "./Pages/BuyonTexhub";
import { SellonTexhub } from "./Pages/SellonTexhub";
import { Contactus } from "./Pages/Contactus";
import Registration from "./Pages/Register";
import FAQ from "./Pages/CMS/Resources/FAQ's/FAQ";
import ThankYouPage from "./Pages/Register/ThankYouPage";

//User Route
import Mycart from "./Pages/MyCart";
import { Userdetails } from "./Components/Userdetails";
import SellerDashboard from "./Pages/SellerDashboard";
import BuyerDashboard from "./Pages/BuyerDashboard";
import SellerProfile from "./Pages/SellerProfile";
import PendingInvoice from "./Pages/PendingInvoice";
import Checkout from "./Pages/Checkout";

//Footer section page
import { Selleradvantage } from "./Pages/CMS/Services/Selleradvantage";
import { Buyeradvantage } from "./Pages/CMS/Services/Buyeradvantage";
import Career from "./Pages/CMS/Services/Career";
import { Training } from "./Pages/CMS/Services/Training";
import { Termsofuse } from "./Pages/CMS/Company/Termsofuse/Termsofuse";
import Blogsmain from "./Pages/CMS/Company/Blogs/Blogsmain/Blogsmain";
import Blogs from "./Pages/CMS/Company/Blogs/Blogs";
import Legal from "./Pages/CMS/Resources/Legal";
import GDPR from "./Pages/CMS/Resources/GDPR";
import Privacypolicy from "./Pages/CMS/Company/Privacypolicy";
import RRpolicy from "./Pages/CMS/Company/RRpolicy";
import Accountinfo from './Components/BuyerDashboard/MyProfile/Accountinfo'

//popup component
import KYCformSectionLeft from './Pages/Register/KYCform/SectionLeft'

const App = () => {
  const [{kycOpenClose}, dispatch] = useStateValue();
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Header />
          <Userdetails />
          <Routes>

            {/* header section */}
            <Route path="/" element={ <> <Home /> <Footer /> </> } exact />
            <Route path="/register/:type" element={ <> <Registration /> <Footer /></> } exact />
            <Route path="/Products" element={ <> <Products /> <Footer /> </> } exact />
            <Route path="/Aboutus" element={ <> <Aboutus /> <Footer /></> } exact />
            <Route path="/Buyontexhub" element={<BuyonTexhub />} exact />
            <Route path="/Sellontexhub" element={<SellonTexhub />} exact />
         


            {/* Footer section */}
            <Route path="/legal" element={ <> <Legal /> <Footer /></> } exact />
            <Route path="/gdpr" element={ <> <GDPR /> <Footer /></> } exact />
            <Route path="/Faqs" element={ <> <FAQ /> <Footer /></> } exact />
            <Route path="/Contactus" element={ <> <Contactus /> <Footer /> </> } exact />
            <Route path="/privacypolicy" element={ <> <Privacypolicy /> <Footer /> </> } exact />
            <Route path="/termsofuse" element={ <>  <Termsofuse /> <Footer /> </> } exact />
            <Route path="/rrpolicy" element={ <> <RRpolicy /> <Footer /> </> } exact />
            <Route path="/training" element={ <> <Training /> <Footer /> </> } exact />
            <Route path="/seller_advantage" element={ <> <Selleradvantage /> <Footer /></> } exact />
            <Route path="/buyer_advantage" element={ <> <Buyeradvantage /> <Footer /></> } exact ></Route>
            <Route path="/career" element={ <> <Career /> <Footer /> </> } exact ></Route>
            <Route path="/blogsmain" element={ <> <Blogsmain /> <Footer /></> } exact />
            <Route path="/blogsdetails" element={ <> <Blogs /> <Footer /> </> } exact />
            <Route path="/faqs" element={ <>  <FAQ /> <Footer /> </> } exact />
           

            {/* user section */}
            <Route path="/sellerdashboard/:currenttab" element={ <> <SellerDashboard /> <Footer /></> } exact />
            <Route path="/buyerdashboard/:currenttab" element={ <> <BuyerDashboard /> <Footer /> </> } exact />
            <Route path="/sellerprofile" element={ <> <SellerProfile /> <Footer /></> } exact />
            <Route path="/pending-invoice" element={ <> <PendingInvoice /> <Footer /> </> } exact />
            <Route path="/checkout" element={ <> <Checkout /> <Footer /> </> } exact />
            <Route path="/mycart" element={ <> <Mycart /> <Footer /> </> } exact />
            <Route path="/thankyou/:type" element={ <> <ThankYouPage /> <Footer /> </> } exact ></Route>
            <Route path="/edit" element={ <> <Accountinfo /> <Footer /> </> } exact />
            
          </Routes>

           {/* Popup component using context api */}
          {kycOpenClose && <KYCformSectionLeft/>} 

      
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
};

export default App;
