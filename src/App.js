import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import "./App.css";
import Header from "./Components/Header";
import { Home } from "./Pages/Home";
import { Footer } from "./Components/Footer";
import Aboutus from "./Pages/Aboutus";
import { BuyonTexhub } from "./Pages/BuyonTexhub";
import { Products } from "./Pages/Products";
import { SellonTexhub } from "./Pages/SellonTexhub";
import { FAQs } from "./Pages/FAQs";
import { Contactus } from "./Pages/Contactus";
import { Userdetails } from "./Components/Userdetails";
import Registration from "./Pages/Register";

import { Selleradvantage } from "./Pages/CMS/Services/Selleradvantage";
import { Buyeradvantage } from "./Pages/CMS/Services/Buyeradvantage";
import Career from "./Pages/CMS/Services/Career";

import ThankYouPage from "./Pages/Register/ThankYouPage";
import { Training } from "./Pages/CMS/Services/Training";
import { Termsofuse } from "./Pages/CMS/Company/Termsofuse";
function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Header />
          <Userdetails />
          <Routes>
            <Route path="/" element={ <> <Home /> <Footer /> </> } exact />
            <Route path="/register/:type" element={ <> <Registration /> <Footer /> </> } exact />
            <Route path="/Products" element={ <> <Products /> <Footer /> </> } exact />
            <Route path="/Aboutus" element={<Aboutus />} exact />
            <Route path="/Buyontexhub" element={<BuyonTexhub />} exact />
            <Route path="/Sellontexhub" element={<SellonTexhub />} exact />
            <Route path="/Faqs" element={<FAQs />} exact />
            <Route path="/Contactus" element={<Contactus />} exact> </Route>
            <Route path="/termsofuse" element={ <> <Termsofuse /> <Footer /> </> } exact />
            <Route path="/training" element={ <> <Training /> <Footer /> </> } exact /> 
            <Route path="/seller_advantage" element={ <> <Selleradvantage /> <Footer /> </> } exact ></Route> 
            <Route path="/buyer_advantage" element={ <> <Buyeradvantage /> <Footer /> </> } exact ></Route>
             <Route path="/career" element={ <> <Career /> <Footer /> </> } exact ></Route>
              <Route path="/thankyou/:type" element={ <> <ThankYouPage /> <Footer /> </> } exact ></Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
