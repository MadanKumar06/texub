import React from "react";
import "./App.css";
import Header from "./Components/Header";
import { Home } from "./Pages/Home/Home";
import { Footer } from "./Components/Footer/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Aboutus } from "./Pages/Aboutus/Aboutus";
import { BuyonTexhub } from "./Pages/BuyonTexhub/BuyonTexhub";
import { Products } from "./Pages/Products/Products";
import { SellonTexhub } from "./Pages/SellonTexhub/SellonTexhub";
import { FAQs } from "./Pages/FAQs/FAQs";
import { Contactus } from "./Pages/Contactus/Contactus";
import { Userdetails } from "./Components/Userdetails/Userdetails";
import Registration from "./Pages/Register";
import { ThemeProvider } from "@mui/material/styles";
import { Selleradvantage } from "./Pages/CMS/Services/Selleradvantage/Selleradvantage";
import { Buyeradvantage } from "./Pages/CMS/Services/Buyeradvantage/Buyeradvantage";
import Career from "./Pages/CMS/Services/Career/Career";
import theme from "./theme";
import ThankYouPage from "./Pages/Register/ThankYouPage";
import { Training } from "./Pages/CMS/Services/Training/Training";
import { Termsofuse } from "./Pages/CMS/Company/Termsofuse/Termsofuse";
import  FAQ  from "./Pages/CMS/Resources/FAQ";
import  Blogs  from "./Pages/CMS/Company/Blogs/Blogs";
function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Header />
          <Userdetails />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Home />
                  <Footer />
                </>
              }
              exact
            />
            <Route
              path="/register/:type"
              element={
                <>
                  <Registration />
                  <Footer />
                </>
              }
              exact
            />
            <Route
              path="/Products"
              element={
                <>
                  <Products />
                  <Footer />
                </>
              }
              exact
            />
            <Route path="/Aboutus" element={<Aboutus />} exact />
            <Route path="/Buyontexhub" element={<BuyonTexhub />} exact />
            <Route path="/Sellontexhub" element={<SellonTexhub />} exact />
            <Route path="/Contactus" element={<Contactus />} exact/>
            {/* <Route path="/Faqs" element={<FAQs />} exact /> */}
            <Route path="/Contactus" element={<Contactus />} exact>
              {/* <Route path='/signin' element={<SignIn/>} exact/> */}
            </Route>

            {/* CMS */}

               {/* Company  */}
             <Route path="/termsofuse" element={
             <>  
             <Termsofuse/>
             <Footer/>
             </>
             } exact />
             <Route path="/blogs" element={
             <>
             <Blogs />
             <Footer/>
             </>  
             
             } exact/>
             {/* Services  */}
            <Route path="/training" element={
            <>
            <Training />
            <Footer/>
            </>
            } exact/>
            <Route path="/seller_advantage" element={
              <>
            <Selleradvantage/>
            <Footer/>
            </>
            } exact></Route>
            <Route path="/buyer_advantage" element={
              <>
            <Buyeradvantage/>
            <Footer/>
            </>
            } exact></Route>
            <Route path="/career" element={
            <>
            <Career />
            <Footer/>
            </>
            } exact></Route>

            {/* Resources */}
            <Route path="/faqs" element={ 
            <>  
            <FAQ/>
            <Footer/>
            </>
            } exact />
            
            {/* Company  */}
            <Route
              path="/termsofuse"
              element={
                <>
                  <Termsofuse />
                  <Footer />
                </>
              }
              exact
            />
            {/* Services  */}
            <Route
              path="/training"
              element={
                <>
                  <Training />
                  <Footer />
                </>
              }
              exact
            />
            <Route
              path="/seller_advantage"
              element={
                <>
                  <Selleradvantage />
                  <Footer />
                </>
              }
              exact
            ></Route>
            <Route
              path="/buyer_advantage"
              element={
                <>
                  <Buyeradvantage />
                  <Footer />
                </>
              }
              exact
            ></Route>
            <Route
              path="/career"
              element={
                <>
                  <Career />
                  <Footer />
                </>
              }
              exact
            ></Route>
            <Route
              path="/thankyou/:type"
              element={
                <>
                  <ThankYouPage />
                  <Footer />
                </>
              }
              exact
            ></Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
