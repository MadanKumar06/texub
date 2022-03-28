//seller Inactive image
import dashboard_Inactive from "../../Assets/sellerdashboard/InactiveDashboardPng/inactivedashboard.png";
import inventory_Inactive from "../../Assets/sellerdashboard/InactiveDashboardPng/inventory.png";
import orders_Inactive from "../../Assets/sellerdashboard/InactiveDashboardPng/orders.png";
import direct_Inactive from "../../Assets/sellerdashboard/InactiveDashboardPng/direct.png";
import payment_Inactive from "../../Assets/sellerdashboard/InactiveDashboardPng/payment.png";
import seller_Inactive from "../../Assets/sellerdashboard/InactiveDashboardPng/seller.png";
import report_Inactive from "../../Assets/sellerdashboard/InactiveDashboardPng/report.png";
import user_Inactive from "../../Assets/sellerdashboard/InactiveDashboardPng/user.png";
import training_Inactive from "../../Assets/sellerdashboard/InactiveDashboardPng/training.png";

//seller active image
import dashboard_active from "../../Assets/sellerdashboard/ActiveDashboardPng/dashboard.png";
import inventory_active from "../../Assets/sellerdashboard/ActiveDashboardPng/warehouse.png";
import orders_active from "../../Assets/sellerdashboard/ActiveDashboardPng/shopping-bag.png";
import direct_active from "../../Assets/sellerdashboard/ActiveDashboardPng/call.png";
import seller_active from "../../Assets/sellerdashboard/ActiveDashboardPng/repair.png";
import user_active from "../../Assets/sellerdashboard/ActiveDashboardPng/add-group.png";

//buyer inactive image
import order_Inactive from "../../Assets/buyerdashboard/InActiveDashboardPng/shopping-bag.png";
import invoices_Inactive from "../../Assets/buyerdashboard/InActiveDashboardPng/bill (1).png";
import auction_Inactive from "../../Assets/buyerdashboard/InActiveDashboardPng/auction .png";
import wantToBuy_Inactive from "../../Assets/buyerdashboard/InActiveDashboardPng/shopping.png";
import payment_method_Inactive from "../../Assets/buyerdashboard/InActiveDashboardPng/credit-card.png";
import my_profile_Inactive from "../../Assets/buyerdashboard/InActiveDashboardPng/user.png";
import wishlist_Inactive from "../../Assets/buyerdashboard/InActiveDashboardPng/files.png";
import rma_Inactive from "../../Assets/buyerdashboard/InActiveDashboardPng/purchase.png";
import approve_cart_Inactive from "../../Assets/buyerdashboard/InActiveDashboardPng/shopping-cart.png";
import merge_cart_Inactive from "../../Assets/buyerdashboard/InActiveDashboardPng/merge.png";
import sub_account_Inactive from "../../Assets/buyerdashboard/InActiveDashboardPng/order-delivery.png";

const SellerList = [
  {
    image_Inactive: dashboard_Inactive,
    image_Active: dashboard_active,
    name: "Dashboard",
    url: "dashboard",
  },
  {
    image_Inactive: inventory_Inactive,
    image_Active: inventory_active,
    name: "Inventory",
    url: "inventory",
  },
  {
    image_Inactive: orders_Inactive,
    image_Active: orders_active,
    name: "Orders",
    url: "orders",
  },
  {
    image_Inactive: direct_Inactive,
    image_Active: direct_active,
    name: "Direct Enquiries",
    url: "directenquiries",
  },
  {
    image_Inactive: payment_Inactive,
    image_Active: "",
    name: "Payment Methods",
    url: "paymentmethods",
  },
  {
    image_Inactive: seller_Inactive,
    image_Active: seller_active,
    name: "Seller Services",
    url: "sellerservices",
  },
  {
    image_Inactive: report_Inactive,
    image_Active: "",
    name: "Reports",
    url: "reports",
  },
  {
    image_Inactive: user_Inactive,
    image_Active: user_active,
    name: "User Management",
    url: "usermgmt",
  },
  {
    image_Inactive: training_Inactive,
    image_Active: "",
    name: "Training",
    url: "training",
  },
];
const BuyerList = [
  {
    image_Inactive: dashboard_Inactive,
    image_Active: "",
    name: "Dashboard",
    url: "dashboard",
  },
  {
    image_Inactive: order_Inactive,
    image_Active: "",
    name: "My Orders",
    url: "myorder",
  },
  {
    image_Inactive: invoices_Inactive,
    image_Active: "",
    name: "Invoices List",
    url: "invoiceslist",
  },
  {
    image_Inactive: auction_Inactive,
    image_Active: "",
    name: "Auctions",
    url: "auctions",
  },
  {
    image_Inactive: wantToBuy_Inactive,
    image_Active: "",
    name: "Want to Buy",
    url: "wanttobuy",
  },
  {
    image_Inactive: payment_method_Inactive,
    image_Active: "",
    name: "Payment",
    url: "payment",
  },
  {
    image_Inactive: my_profile_Inactive,
    image_Active: "",
    name: "My Profile",
    url: "myprofile",
  },
  {
    image_Inactive: wishlist_Inactive,
    image_Active: "",
    name: "Wishlist",
    url: "wishlist",
  },
  { image_Inactive: rma_Inactive, image_Active: "", name: "RMA", url: "rma" },
  {
    image_Inactive: approve_cart_Inactive,
    image_Active: "",
    name: "Approve Carts",
    url: "approvecarts",
  },
  {
    image_Inactive: merge_cart_Inactive,
    image_Active: "",
    name: "Merge Carts",
    url: "mergecarts",
  },
  {
    image_Inactive: sub_account_Inactive,
    image_Active: "",
    name: "Sub-Account Orders",
    url: "subaccountorders",
  },
];

export { SellerList, BuyerList };
