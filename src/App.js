import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { useStateValue } from "./store/state";
import "./App.scss";

//Header section
import Header from "./Components/Header";
import { Home } from "./Pages/Home";
import { Footer } from "./Components/Footer";
import Aboutus from "./Pages/Aboutus";
import { Products } from "./Pages/Products";
import Contactus from "./Pages/CMS/Company/Contactus";
import Registration from "./Pages/Register";
import FAQ from "./Pages/CMS/Resources/FAQ's/FAQ";
import ThankYouPage from "./Pages/Register/ThankYouPage";
import ScrollToTop from "./Components/ScrollToTop";

//User Route
import Mycart from "./Pages/MyCart";
import { Userdetails } from "./Components/Userdetails";
import SellerDashboard from "./Pages/SellerDashboard";
import BuyerDashboard from "./Pages/BuyerDashboard";
import SellerProfile from "./Pages/SellerProfile";
import PendingInvoice from "./Pages/PendingInvoice";
import Checkout from "./Pages/Checkout";
import KYCDetails from "./Pages/KYCDetails";

//Footer section page
import Selleradvantage from "./Pages/CMS/Services/Selleradvantage";
import Buyeradvantage from "./Pages/CMS/Services/Buyeradvantage";
import Career from "./Pages/CMS/Services/Career";
import { Training } from "./Pages/CMS/Services/Training";
import { Termsofuse } from "./Pages/CMS/Company/Termsofuse/Termsofuse";
import { ProductListingPolicy } from "./Pages/CMS/Company/ProductListingPolicy/ProductListingPolicy";
import Blogsmain from "./Pages/CMS/Company/Blogs/Blogsmain/Blogsmain";
import Blogs from "./Pages/CMS/Company/Blogs/Blogs";
import Legal from "./Pages/CMS/Resources/Legal";
import GDPR from "./Pages/CMS/Resources/GDPR";
import Privacypolicy from "./Pages/CMS/Company/Privacypolicy";
import RRpolicy from "./Pages/CMS/Company/RRpolicy";
import Accountinfo from "./Components/BuyerDashboard/MyProfile/Accountinfo";

//coming soon page
import ComingSoon from "./Pages/ComingSoon";
//popup component
import KYCformSectionLeft from "./Pages/Register/KYCform/SectionLeft";
import PDPpopUp from "./Pages/PDPpopUp";
import SignIn from "./Pages/SignIn/SiginPopUp/SectionLeft";
import RegisterPopup from "./Pages/Register/RegisterPopup/SectionLeft";
import MiniCartList from "./Pages/MiniCart/MiniCartList";
import SimpleBackdrop from "./Components/LoaderBackDrop";
import { getSigninedUserData } from "./utilities";

const App = () => {
  useEffect(() => {
    getSigninedUserData((res) => {
      console.log(res);
    });
  }, []);

  const [
    {
      kycOpenClose,
      pdpPopUpOpenClose,
      registerOpenClose,
      miniCartOpenClose,
      isLoading,
      signInOpenClose,
    },
    dispatch,
  ] = useStateValue();
  let isKYCSubmitted = JSON.parse(localStorage.getItem("userdata"));
  useEffect(() => {
    if (isKYCSubmitted) {
      isKYCSubmitted?.custom_attributes?.[3]?.value === "0" &&
        dispatch({
          type: "SET_KYC_OPEN_CLOSE",
          value: true,
        });
    }
  }, []);
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
          <ScrollToTop />
          <Header />
          <Userdetails />
          <Routes>
            {/* header section */}
            <Route
              path="/"
              element={
                <>
                  {" "}
                  <Home /> <ScrollToTop /> <Footer />{" "}
                </>
              }
              exact
            />
            <Route
              path="/register/:type"
              element={
                <>
                  {" "}
                  <Registration /> <ScrollToTop /> <Footer />{" "}
                </>
              }
              exact
            />
            <Route
              path="/products"
              element={
                <>
                  {" "}
                  <Products /> <ScrollToTop /> <Footer />{" "}
                </>
              }
              exact
            />
            <Route
              path="/Aboutus"
              element={
                <>
                  {" "}
                  <Aboutus /> <ScrollToTop /> <Footer />{" "}
                </>
              }
              exact
            />
            <Route
              path="/coming-soon"
              element={
                <>
                  {" "}
                  <ComingSoon /> <ScrollToTop /> <Footer />{" "}
                </>
              }
              exact
            />

            {/* Footer section */}
            <Route
              path="/legal"
              element={
                <>
                  {" "}
                  <Legal /> <ScrollToTop /> <Footer />{" "}
                </>
              }
              exact
            />
            <Route
              path="/gdpr"
              element={
                <>
                  {" "}
                  <GDPR /> <ScrollToTop /> <Footer />{" "}
                </>
              }
              exact
            />
            <Route
              path="/Faqs"
              element={
                <>
                  {" "}
                  <FAQ /> <ScrollToTop /> <Footer />{" "}
                </>
              }
              exact
            />
            <Route
              path="/Contactus"
              element={
                <>
                  {" "}
                  <Contactus /> <ScrollToTop /> <Footer />{" "}
                </>
              }
              exact
            />
            <Route
              path="/privacypolicy"
              element={
                <>
                  {" "}
                  <Privacypolicy /> <ScrollToTop /> <Footer />{" "}
                </>
              }
              exact
            />
            <Route
              path="/termsofuse"
              element={
                <>
                  {" "}
                  <Termsofuse /> <ScrollToTop /> <Footer />{" "}
                </>
              }
              exact
            />
            <Route
              path="/productlistingpolicy"
              element={
                <>
                  {" "}
                  <ProductListingPolicy /> <ScrollToTop /> <Footer />{" "}
                </>
              }
              exact
            />
            <Route
              path="/rrpolicy"
              element={
                <>
                  {" "}
                  <RRpolicy /> <ScrollToTop /> <Footer />{" "}
                </>
              }
              exact
            />
            <Route
              path="/training"
              element={
                <>
                  {" "}
                  <Training /> <ScrollToTop /> <Footer />{" "}
                </>
              }
              exact
            />
            <Route
              path="/seller_advantage"
              element={
                <>
                  {" "}
                  <Selleradvantage /> <ScrollToTop /> <Footer />{" "}
                </>
              }
              exact
            />
            <Route
              path="/buyer_advantage"
              element={
                <>
                  {" "}
                  <Buyeradvantage /> <ScrollToTop /> <Footer />{" "}
                </>
              }
              exact
            ></Route>
            <Route
              path="/career"
              element={
                <>
                  {" "}
                  <Career /> <ScrollToTop /> <Footer />{" "}
                </>
              }
              exact
            ></Route>
            <Route
              path="/blogsmain"
              element={
                <>
                  {" "}
                  <Blogsmain /> <ScrollToTop /> <Footer />{" "}
                </>
              }
              exact
            />
            <Route
              path="/blogsdetails/:id"
              element={
                <>
                  {" "}
                  <Blogs /> <ScrollToTop /> <Footer />{" "}
                </>
              }
              exact
            />
            <Route
              path="/faqs"
              element={
                <>
                  {" "}
                  <FAQ /> <ScrollToTop /> <Footer />{" "}
                </>
              }
              exact
            />

            {/* user section */}
            <Route
              path="/sellerdashboard/:currenttab"
              element={
                <>
                  {" "}
                  <SellerDashboard /> <ScrollToTop /> <Footer />{" "}
                </>
              }
              exact
            />
            <Route
              path="/sellerdashboard/:currenttab/:id"
              element={
                <>
                  {" "}
                  <SellerDashboard /> <ScrollToTop /> <Footer />{" "}
                </>
              }
              exact
            />
            <Route
              path="/buyerdashboard/:currenttab"
              element={
                <>
                  {" "}
                  <BuyerDashboard /> <ScrollToTop /> <Footer />{" "}
                </>
              }
              exact
            />
            <Route
              path="/sellerprofile/:id"
              element={
                <>
                  {" "}
                  <SellerProfile /> <ScrollToTop /> <Footer />{" "}
                </>
              }
              exact
            />
            <Route
              path="/pending-invoice"
              element={
                <>
                  {" "}
                  <PendingInvoice /> <ScrollToTop /> <Footer />{" "}
                </>
              }
              exact
            />
            <Route
              path="/checkout"
              element={
                <>
                  {" "}
                  <Checkout /> <ScrollToTop /> <Footer />{" "}
                </>
              }
              exact
            />
            <Route
              path="/mycart"
              element={
                <>
                  {" "}
                  <Mycart /> <ScrollToTop /> <Footer />{" "}
                </>
              }
              exact
            />
            <Route
              path="/thankyou/:type"
              element={
                <>
                  {" "}
                  <ThankYouPage /> <ScrollToTop /> <Footer />{" "}
                </>
              }
              exact
            ></Route>
            <Route
              path="/edit"
              element={
                <>
                  {" "}
                  <Accountinfo /> <ScrollToTop /> <Footer />{" "}
                </>
              }
              exact
            />
            <Route
              path="/kycdetails"
              element={
                <>
                  {" "}
                  <KYCDetails /> <ScrollToTop /> <Footer />{" "}
                </>
              }
              exact
            />
          </Routes>

          {/* Popup component using context api */}
          {kycOpenClose && <KYCformSectionLeft />}
          {pdpPopUpOpenClose?.openClose && <PDPpopUp />}
          {signInOpenClose && <SignIn />}
          {registerOpenClose && <RegisterPopup />}
          {miniCartOpenClose?.openClose && <MiniCartList />}
          {isLoading && <SimpleBackdrop />}
        </Router>
      </ThemeProvider>
    </div>
  );
};

export default App;
