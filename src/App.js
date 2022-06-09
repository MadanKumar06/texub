import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { useStateValue } from "./store/state";
import "./App.scss";

//Header section
import Header from "./Components/Header";
import { Home } from "./Pages/Home";
import { Footer } from "./Components/Footer";

//import Aboutus from "./Pages/Aboutus";
import Aboutus from "./Pages/CMS/About";
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

//sellontexub
import SellonTexubNew from "./Pages/SellonTexub";
import SellOnTexub from "./Pages/CMS/SellOnTexub";
import BuyOnTexub from "./Pages/CMS/BuyOnTexub";
//popup component
import KYCformSectionLeft from "./Pages/Register/KYCform/SectionLeft";
import PDPpopUp from "./Pages/PDPpopUp";
import SignIn from "./Pages/SignIn/SiginPopUp/SectionLeft";
import RegisterPopup from "./Pages/Register/RegisterPopup/SectionLeft";
import MiniCartList from "./Pages/MiniCart/MiniCartList";
import SimpleBackdrop from "./Components/LoaderBackDrop";
import {
  GetHomeAPi,
  GetCategoriesList,
} from "./utilities";
import axios from "axios";

// invoice download
import MyOrderInvoice from "./Components/BuyerDashboard/MyOrders/OrdersInfo/MyOrderInvoice";
import PendingInvoiceDownload from './Pages/PendingInvoice/PendingInvoiceDownload'
// import CheckoutInvoice from "./Pages/Checkout/CheckoutInvoice";

const App = () => {
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

  useEffect(() => {
    async function fetchData() {
      if (customstore) {
        dispatch({
          type: "GEO__LOCATION",
          data: customstore,
        });
      } else {
        const res = await axios.get("https://geolocation-db.com/json/");
        dispatch({
          type: "GEO__LOCATION",
          data: res.data,
        });
        dispatch({
          type: "GEO__CUSTOM__STORE",
          data: "",
        });
      }
    }
    fetchData();
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
  let SubmittedKYC = JSON.parse(localStorage.getItem("kycSubmitted"));
  useEffect(() => {
    if (isKYCSubmitted) {
      let kycValue = isKYCSubmitted?.custom_attributes?.filter(
        (itm) => itm?.attribute_code === "kyc_status"
      );
      if (SubmittedKYC === true) {
        return;
      } else {
        isKYCSubmitted?.group_id !== 1 &&
          kycValue?.[0]?.value === "0" &&
          dispatch({
            type: "SET_KYC_OPEN_CLOSE",
            value: true,
          });
      }
    }
  }, []);
  useEffect(() => {
    if (currency?.currency_id) {
      GetCategoriesList((res) => {
        // localStorage.setItem("all_category_id", res?.[0]?.category?.id);
        dispatch({
          type: "SET_PLP_CATEGORIES",
          data: res,
        });
      }, currency?.currency_id);
    }
  }, [currency]);

  return (
    <div className="App">
        <ThemeProvider theme={theme}>
          <BrowserRouter>
          <ScrollToTop />
          <Header />
          <Userdetails />
          <Routes>
            {/* header section */} 
            <Route path={"/"} element={ <> {" "} <Home /> <ScrollToTop /> <Footer />{" "} </> } exact />
            <Route path="/:country" element={ <> <Home /> <ScrollToTop /> <Footer /> </> } exact />
            <Route path="/:country/resetpassword/:token" element={ <> <ResetPassword /> <ScrollToTop /> <Footer /> </> } exact />
            <Route path="/:country/register/:type" element={ <> <Registration /> <ScrollToTop /> <Footer /> </> } exact />
            <Route path="/:country/products" element={ <> <Products /> <ScrollToTop /> <Footer /> </> } exact />
            <Route path="/:country/Aboutus" element={ <> <Aboutus /> <ScrollToTop /> <Footer /> </> } exact />
            <Route path="/:country/sell-on-texub" element={ <> <SellOnTexub /> <ScrollToTop /> <Footer /> </> } exact />
            <Route path="/:country/buy-on-texub" element={ <> <BuyOnTexub /> <ScrollToTop /> <Footer /> </> } exact />
            <Route path="/:country/coming-soon" element={ <> <SellonTexubNew /> <ScrollToTop /> <Footer /> </> } exact />

            {/* Footer section */}
            <Route path="/:country/legal" element={ <> <Legal /> <ScrollToTop /> <Footer /> </> } exact />
            <Route path="/:country/gdpr" element={ <> <GDPR /> <ScrollToTop /> <Footer /> </> } exact />
            <Route path="/:country/Faqs" element={ <> <FAQ /> <ScrollToTop /> <Footer /> </> } exact />
            <Route path="/:country/Contactus" element={ <> <Contactus /> <ScrollToTop /> <Footer /> </> } exact />
            <Route path="/:country/privacypolicy/:id" element={ <> <Privacypolicy /> <ScrollToTop /> <Footer /> </> } exact />
            <Route path="/:country/termsofuse/:id" element={ <> <Termsofuse /> <ScrollToTop /> <Footer /> </> } exact />
            <Route path="/:country/productlistingpolicy/:id" element={ <> <ProductListingPolicy /> <ScrollToTop /> <Footer /> </> } exact />
            <Route path="/:country/rrpolicy" element={ <> <RRpolicy /> <ScrollToTop /> <Footer /> </> } exact />
            <Route path="/:country/training" element={ <> <Training /> <ScrollToTop /> <Footer /> </> } exact />
            <Route path="/:country/seller_advantage" element={ <> <Selleradvantage /> <ScrollToTop /> <Footer /> </> } exact />
            <Route path="/:country/buyer_advantage" element={ <> <Buyeradvantage /> <ScrollToTop /> <Footer /> </> } exact ></Route>
            <Route path="/:country/career" element={ <> {" "} <Career /> <ScrollToTop /> <Footer />{" "} </> } exact ></Route>
            <Route path="/:country/blogsmain" element={ <> {" "} <Blogsmain /> <ScrollToTop /> <Footer />{" "} </> } exact />
            <Route path="/:country/blogsdetails/:id" element={ <> {" "} <Blogs /> <ScrollToTop /> <Footer />{" "} </> } exact />
            <Route path="/:country/faqs" element={ <> {" "} <FAQ /> <ScrollToTop /> <Footer />{" "} </> } exact />

            {/* user section */}
            <Route path="/:country/sellerdashboard/:currenttab" element={ <> {" "} <SellerDashboard /> <ScrollToTop /> <Footer />{" "} </> } exact />
            <Route path="/:country/sellerdashboard/:currenttab/:id" element={ <> {" "} <SellerDashboard /> <ScrollToTop /> <Footer />{" "} </> } exact />
            <Route path="/:country/buyerdashboard/:currenttab" element={ <> {" "} <BuyerDashboard /> <ScrollToTop /> <Footer />{" "} </> } exact />
            <Route path="/:country/sellerprofile/:id/:seller_id" element={ <> {" "} <SellerProfile /> <ScrollToTop /> <Footer />{" "} </> } exact />
            <Route path="/:country/pending-invoice" element={ <> {" "} <PendingInvoice /> <ScrollToTop /> <Footer />{" "} </> } exact />
            <Route path="/:country/pendinginvoice/:qid" element={ <> {" "} <PendingInvoice /> <ScrollToTop /> <Footer />{" "} </> } exact />
            <Route path="/:country/checkout/:quoteid" element={ <> {" "} <Checkout /> <ScrollToTop /> <Footer />{" "} </> } exact />
            <Route path="/:country/ordersuccess/:id" element={ <> {" "} <OrderSuccess /> <ScrollToTop /> <Footer />{" "} </> } exact />
            <Route path="/:country/paymentsuccess" element={ <> {" "} <PaymentSuccess /> <ScrollToTop /> <Footer />{" "} </> } exact />
            <Route path="/:country/paymentfail" element={ <> {" "} <PaymentFail /> <ScrollToTop /> <Footer />{" "} </> } exact />
            <Route path="/:country/mycart" element={ <> {" "} <Mycart /> <ScrollToTop /> <Footer />{" "} </> } exact />
            <Route path="/:country/thankyou/:type" element={ <> {" "} <ThankYouPage /> <ScrollToTop /> <Footer />{" "} </> } exact ></Route>
            <Route path="/:country/edit" element={ <> {" "} <Accountinfo /> <ScrollToTop /> <Footer />{" "} </> } exact />
            <Route path="/:country/kycdetails" element={ <> {" "} <KYCDetails /> <ScrollToTop /> <Footer />{" "} </> } exact />

            {/* Invoice download */}
            {/* <Route path="/:country/checkout-invoice/:quoteid" element={ <> <CheckoutInvoice /> <ScrollToTop /> </> } exact /> */}
            <Route path="/:country/buyerdashboard/myorder-invoice/:order_id" element={ <> <MyOrderInvoice /> <ScrollToTop /> </> } exact />
            <Route path="/:country/pendinginvoice-download/:qid" element={ <> <PendingInvoiceDownload /> <ScrollToTop /> </> } exact />
            
            </Routes>

          {/* Popup component using context api */}
          {kycOpenClose && <KYCformSectionLeft />}
          {pdpPopUpOpenClose?.openClose && <PDPpopUp />}
          {signInOpenClose && <SignIn />}
          {registerOpenClose && <RegisterPopup />}
          {miniCartOpenClose?.openClose && <MiniCartList />}
          {isLoading && <SimpleBackdrop />}
       </BrowserRouter>
      </ThemeProvider>
    </div>
  );
};

export default App;
