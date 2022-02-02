import React from "react";
import "./App.css";
import Header from "./Components/Header/Header";
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
import { Register } from "./Components/Register/Sellerregister";
//import Currency from './Components/Currency/Currency'
import { Gratitude } from "./Components/Register/Gratitude/Gratitude";
// import KYCform from './Components/Register/KYCform/KYCform';
import { AfterGratitude } from "./Components/Register/AfterGratitude/AfterGratitude";
import { BuyerGratitude } from "./Components/Register/BuyerGratitude/BuyerGratitude";
import { BuyerKYCGratitude } from "./Components/Register/BuyerKYCGratitude/BuyerKYCGratitude";
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";
function App() {
  return (
    <div className="App">
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <Header className="second" />
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
            <Route
              path="/register"
              element={
                <>
                  {/* <Header/>
              <div className='Trail'>
              <Userdetails/> `
              </div> */}

                  <Register />
                  <Footer />
                </>
              }
              exact
            />
            <Route
              path="/Gratitude"
              element={
                <>
                  {/* <Header/>
          <div className='Trail'>
          <Userdetails/> 
          </div>  */}
                  <Gratitude />
                  <Footer />
                </>
              }
              exact
            />
            <Route
              path="/BuyerGratitude"
              element={
                <>
                  <BuyerGratitude />
                  <Footer />
                </>
              }
              exact
            />
            <Route
              path="/Submit"
              element={
                <>
                  <AfterGratitude />
                  <Footer />
                </>
              }
              exact
            />
            <Route
              path="/BuyerKYCgratitude"
              element={<BuyerKYCGratitude />}
              exact
            />
            <Route path="/Faqs" element={<FAQs />} exact />
            <Route path="/Contactus" element={<Contactus />} exact>
              {/* <Route path='/signin' element={<SignIn/>} exact/> */}
            </Route>
          </Routes>
        </BrowserRouter>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
