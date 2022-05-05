import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from "react-router-dom";
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
import PendingInvoice from "./Pages/PendingInvoice/index";
import Checkout from "./Pages/Checkout";
import OrderSuccess from "./Pages/Checkout/OrderSuccess";
import PaymentSuccess from "./Pages/Checkout/PaymentSuccess";
import PaymentFail from "./Pages/Checkout/PaymentFail";

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

//ResetPassword
import ResetPassword from "./Components/ResetPassword";

//coming soon page
import ComingSoon from "./Pages/ComingSoon";
//popup component
import KYCformSectionLeft from "./Pages/Register/KYCform/SectionLeft";
import PDPpopUp from "./Pages/PDPpopUp";
import SignIn from "./Pages/SignIn/SiginPopUp/SectionLeft";
import RegisterPopup from "./Pages/Register/RegisterPopup/SectionLeft";
import MiniCartList from "./Pages/MiniCart/MiniCartList";
import SimpleBackdrop from "./Components/LoaderBackDrop";
import {
  getSigninedUserData,
  GetHomeAPi,
  GetCategoriesList,
} from "./utilities";
import axios from "axios";

const App = () => {
  const [geo, setgeo] = useState([]);

  const [
    {
      kycOpenClose,
      pdpPopUpOpenClose,
      registerOpenClose,
      miniCartOpenClose,
      isLoading,
      signInOpenClose,
      customstore,
      currency,
    },
    dispatch,
  ] = useStateValue();

  useEffect(async () => {
    if (customstore) {
      dispatch({
        type: "GEO__LOCATION",
        data: customstore,
      });
    } else {
      const res = await axios.get("https://geolocation-db.com/json/");
      setgeo(res.data);
      dispatch({
        type: "GEO__LOCATION",
        data: res.data,
      });
      dispatch({
        type: "GEO__CUSTOM__STORE",
        data: "",
      });
    }
  }, []);

  useEffect(() => {
    getSigninedUserData((res) => {
      console.log(res);
    });
  }, []);
  useEffect(() => {
    dispatch({
      type: "SET_IS_LOADING",
      value: true,
    });
    GetHomeAPi((res) => {
      dispatch({
        type: "SET_HOME_CONTENT",
        data: res,
      });
      dispatch({
        type: "SET_IS_LOADING",
        value: false,
      });
    });
  }, []);

  let isKYCSubmitted = JSON.parse(localStorage.getItem("userdata"));
  useEffect(() => {
    if (isKYCSubmitted) {
      let kycValue = isKYCSubmitted?.custom_attributes?.filter(
        (itm) => itm?.attribute_code === "kyc_status"
      );
      isKYCSubmitted?.group_id !== 1 &&
        kycValue?.[0]?.value === "0" &&
        dispatch({
          type: "SET_KYC_OPEN_CLOSE",
          value: true,
        });
    }
  }, []);
  useEffect(() => {
    GetCategoriesList((res) => {
      localStorage.setItem("all_category_id", res?.[0]?.category?.id);
    }, currency?.currency_id);
  }, [currency]);

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
              path={"/"}
              element={
                <>
                  <Home /> <ScrollToTop /> <Footer />
                </>
              }
              exact
            />
            <Route
              // path={`/${customnostore ? customnostore : geo?.country_name}`}
              path="/:country"
              element={
                <>
                  <Home /> <ScrollToTop /> <Footer />
                </>
              }
              exact
            />
            <Route
              path="/:country/resetpassword/:token"
              // path={`/${customnostore ? customnostore : geo?.country_name}/resetpassword/:token`}
              element={
                <>
                  <ResetPassword /> <ScrollToTop /> <Footer />
                </>
              }
              exact
            />
            <Route
              path="/:country/register/:type"
              // path={`/${customnostore ? customnostore : geo?.country_name}/register/:type`}
              element={
                <>
                  <Registration /> <ScrollToTop /> <Footer />
                </>
              }
              exact
            />
            <Route
              path="/:country/products"
              // path={`/${customnostore ? customnostore : geo?.country_name}/products`}
              element={
                <>
                  <Products /> <ScrollToTop /> <Footer />
                </>
              }
              exact
            />
            <Route
              path="/:country/Aboutus"
              // path={`/${customnostore ? customnostore : geo?.country_name}/Aboutus`}
              element={
                <>
                  <Aboutus /> <ScrollToTop /> <Footer />
                </>
              }
              exact
            />
            <Route
              path="/:country/coming-soon"
              // path={`/${customnostore ? customnostore : geo?.country_name}/coming-soon`}
              element={
                <>
                  <ComingSoon /> <ScrollToTop /> <Footer />
                </>
              }
              exact
            />

            {/* Footer section */}
            <Route
              path="/:country/legal"
              // path={`/${customnostore ? customnostore : geo?.country_name}/legal`}
              element={
                <>
                  <Legal /> <ScrollToTop /> <Footer />
                </>
              }
              exact
            />
            <Route
              path="/:country/gdpr"
              // path={`/${customnostore ? customnostore : geo?.country_name}/gdpr`}
              element={
                <>
                  <GDPR /> <ScrollToTop /> <Footer />
                </>
              }
              exact
            />
            <Route
              path="/:country/Faqs"
              // path={`/${customnostore ? customnostore : geo?.country_name}/Faqs`}
              element={
                <>
                  <FAQ /> <ScrollToTop /> <Footer />
                </>
              }
              exact
            />
            <Route
              path="/:country/Contactus"
              // path={`/${customnostore ? customnostore : geo?.country_name}/Contactus`}
              element={
                <>
                  <Contactus /> <ScrollToTop /> <Footer />
                </>
              }
              exact
            />
            <Route
              path="/:country/privacypolicy"
              // path={`/${customnostore ? customnostore : geo?.country_name}/privacypolicy`}
              element={
                <>
                  <Privacypolicy /> <ScrollToTop /> <Footer />
                </>
              }
              exact
            />
            <Route
              path="/:country/termsofuse"
              // path={`/${customnostore ? customnostore : geo?.country_name}/termsofuse`}
              element={
                <>
                  <Termsofuse /> <ScrollToTop /> <Footer />
                </>
              }
              exact
            />
            <Route
              path="/:country/productlistingpolicy"
              // path={`/${customnostore ? customnostore : geo?.country_name}/productlistingpolicy`}
              element={
                <>
                  <ProductListingPolicy /> <ScrollToTop /> <Footer />
                </>
              }
              exact
            />
            <Route
              path="/:country/rrpolicy"
              // path={`/${customnostore ? customnostore : geo?.country_name}/rrpolicy`}
              element={
                <>
                  <RRpolicy /> <ScrollToTop /> <Footer />
                </>
              }
              exact
            />
            <Route
              path="/:country/training"
              // path={`/${customnostore ? customnostore : geo?.country_name}/training`}
              element={
                <>
                  <Training /> <ScrollToTop /> <Footer />
                </>
              }
              exact
            />
            <Route
              path="/:country/seller_advantage"
              // path={`/${customnostore ? customnostore : geo?.country_name}/seller_advantage`}
              element={
                <>
                  <Selleradvantage /> <ScrollToTop /> <Footer />
                </>
              }
              exact
            />
            <Route
              path="/:country/buyer_advantage"
              // path={`/${customnostore ? customnostore : geo?.country_name}/buyer_advantage`}
              element={
                <>
                  <Buyeradvantage /> <ScrollToTop /> <Footer />
                </>
              }
              exact
            ></Route>
            <Route
              path="/:country/career"
              // path={`/${customnostore ? customnostore : geo?.country_name}/career`}
              element={
                <>
                  {" "}
                  <Career /> <ScrollToTop /> <Footer />{" "}
                </>
              }
              exact
            ></Route>
            <Route
              path="/:country/blogsmain"
              // path={`/${customnostore ? customnostore : geo?.country_name}/blogsmain`}
              element={
                <>
                  {" "}
                  <Blogsmain /> <ScrollToTop /> <Footer />{" "}
                </>
              }
              exact
            />
            <Route
              path="/:country/blogsdetails/:id"
              // path={`/${customnostore ? customnostore : geo?.country_name}/blogsdetails/:id`}
              element={
                <>
                  {" "}
                  <Blogs /> <ScrollToTop /> <Footer />{" "}
                </>
              }
              exact
            />
            <Route
              path="/:country/faqs"
              // path={`/${customnostore ? customnostore : geo?.country_name}/faqs`}
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
              path="/:country/sellerdashboard/:currenttab"
              // path={`/${customnostore ? customnostore : geo?.country_name}/sellerdashboard/:currenttab`}
              element={
                <>
                  {" "}
                  <SellerDashboard /> <ScrollToTop /> <Footer />{" "}
                </>
              }
              exact
            />
            <Route
              path="/:country/sellerdashboard/:currenttab/:id"
              // path={`/${customnostore ? customnostore : geo?.country_name}/sellerdashboard/:currenttab/:id`}
              element={
                <>
                  {" "}
                  <SellerDashboard /> <ScrollToTop /> <Footer />{" "}
                </>
              }
              exact
            />
            <Route
              path="/:country/buyerdashboard/:currenttab"
              // path={`/${customnostore ? customnostore : geo?.country_name}/buyerdashboard/:currenttab`}
              element={
                <>
                  {" "}
                  <BuyerDashboard /> <ScrollToTop /> <Footer />{" "}
                </>
              }
              exact
            />
            <Route
              path="/:country/sellerprofile/:id/:seller_id"
              // path={`/${customnostore ? customnostore : geo?.country_name}/sellerprofile/:id`}
              element={
                <>
                  {" "}
                  <SellerProfile /> <ScrollToTop /> <Footer />{" "}
                </>
              }
              exact
            />
            <Route
              path="/:country/pending-invoice"
              // path={`/${customnostore ? customnostore : geo?.country_name}/pending-invoice`}
              element={
                <>
                  {" "}
                  <PendingInvoice /> <ScrollToTop /> <Footer />{" "}
                </>
              }
              exact
            />
            <Route
              path="/:country/pendinginvoice/:qid"
              // path={`/${customnostore ? customnostore : geo?.country_name}/pending-invoice`}
              element={
                <>
                  {" "}
                  <PendingInvoice /> <ScrollToTop /> <Footer />{" "}
                </>
              }
              exact
            />
            <Route
              path="/:country/checkout/:quoteid"
              // path={`/${customnostore ? customnostore : geo?.country_name}/checkout`}
              element={
                <>
                  {" "}
                  <Checkout /> <ScrollToTop /> <Footer />{" "}
                </>
              }
              exact
            />
            <Route
              path="/:country/ordersuccess"
              // path={`/${customnostore ? customnostore : geo?.country_name}/checkout`}
              element={
                <>
                  {" "}
                  <OrderSuccess /> <ScrollToTop /> <Footer />{" "}
                </>
              }
              exact
            />
            <Route
              path="/:country/paymentsuccess"
              // path={`/${customnostore ? customnostore : geo?.country_name}/checkout`}
              element={
                <>
                  {" "}
                  <PaymentSuccess /> <ScrollToTop /> <Footer />{" "}
                </>
              }
              exact
            />
            <Route
              path="/:country/paymentfail"
              // path={`/${customnostore ? customnostore : geo?.country_name}/checkout`}
              element={
                <>
                  {" "}
                  <PaymentFail /> <ScrollToTop /> <Footer />{" "}
                </>
              }
              exact
            />
            <Route
              path="/:country/mycart"
              // path={`/${customnostore ? customnostore : geo?.country_name}/mycart`}
              element={
                <>
                  {" "}
                  <Mycart /> <ScrollToTop /> <Footer />{" "}
                </>
              }
              exact
            />
            <Route
              path="/:country/thankyou/:type"
              // path={`/${customnostore ? customnostore : geo?.country_name}/thankyou/:type`}
              element={
                <>
                  {" "}
                  <ThankYouPage /> <ScrollToTop /> <Footer />{" "}
                </>
              }
              exact
            ></Route>
            <Route
              path="/:country/edit"
              // path={`/${customnostore ? customnostore : geo?.country_name}/edit`}
              element={
                <>
                  {" "}
                  <Accountinfo /> <ScrollToTop /> <Footer />{" "}
                </>
              }
              exact
            />
            <Route
              path="/:country/kycdetails"
              // path={`/${customnostore ? customnostore : geo?.country_name}/kycdetails`}
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
