import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Page/Home/Home/Home";
import AllProducts from "../Page/AllProducts/AllProducts";
import ProductDetails from "../Page/ProductDetails/ProductDetails";
import SellOn from "../Page/SellOn/SellOn";
import ApplyPage from "../Page/ApplyPage/ApplyPage";
import MyAccountPage from "../Page/MyAccountPage/MyAccountPage";
import HelpCenter from "../Page/HelpCenter/HelpCenter";
import HelpCenterLayout from "../Layout/HelpCenterLayout";
import RegisterPage from "../Page/Register/RegisterPage";
import LoginPage from "../Page/Login/LoginPage";
import DeliveryHelpHome from "../Page/HelpCenter/DeliveryHelp/DeliveryHelpHome";
import ReturnHelp from "../Page/HelpCenter/ReturnHelp/ReturnHelp";
import OrderCancellationHelp from "../Page/HelpCenter/OrderCancellationHelp/OrderCancellationHelp";
import CollectionHelp from "../Page/HelpCenter/CollectionHelp/CollectionHelp";
import RefundsHelp from "../Page/HelpCenter/RefundsHelp/RefundsHelp";
import PaymentsPromosGiftVouchersHelp from "../Page/HelpCenter/PaymentsPromosGiftVouchersHelp/PaymentsPromosGiftVouchersHelp";
import ProductStockHelp from "../Page/HelpCenter/ProductStockHelp/ProductStockHelp";
import DataPrivacyHelp from "../Page/HelpCenter/DataPrivacyHelp/DataPrivacyHelp";
import Orders from "../Page/Orders/Orders";
import Wishlist from "../Page/Wishlist/Wishlist";
import Cart from "../Page/Cart/Cart";
import Account from "../Page/Account/Account";
import Returns from "../Page/Returns/Returns";
import CreditRefunds from "../Page/CreditRefunds/CreditRefunds";
import ProductReview from "../Page/ProductReview/ProductReview";
import Invoices from "../Page/Invoices/Invoices";
import PersonalInfo from "../Page/PersonalInfo/PersonalInfo";
import ApplyVoucher from "../Page/ApplyVoucher/ApplyVoucher";
import AddressBook from "../Page/AddressBook/AddressBook";
import Newsletter from "../Page/Newsletter/Newsletter";
import ReviewsHistory from "../Page/ReviewsHistory/ReviewsHistory";
import RefundsHistory from "../Page/RefundsHistory/RefundsHistory";
import FeeEstimator from "../Page/FeeEstimator/FeeEstimator";
import PickupPoints from "../Page/PickupPoints/PickupPoints";
import ReturnPolicy from "../Page/ReturnPolicy/ReturnPolicy";
import About from "../Page/About/About";
import WhoWeAre from "../Page/About/WhoWeAre";
import OurJourney from "../Page/About/OurJourney";
import OurValue from "../Page/About/OurValue";
import OurEnv from "../Page/About/OurEnv";
import OurCareers from "../Page/About/OurCareers";
import Extraordinary from "../Page/About/Extraordinary";
import CompanyNews from "../Page/About/CompanyNews";
import Charity from "../Page/About/Charity";
import DeliveryTeam from "../Page/About/DeliveryTeam";
import TermsAndCs from "../Page/ReturnPolicy/T&Cs/TermsAndCs";
import ReturnPolicyAndHelp from "../Page/ReturnPolicy/ReturnPolicyAndHelp";
import DailyDeals from "../Page/ReturnPolicy/DailyDeals/DailyDeals";
import VouchersAndCouponsConditions from "../Page/ReturnPolicy/VouchersAndCouponsConditions/VouchersAndCouponsConditions";
import ResponsibleDisclosure from "../Page/ReturnPolicy/ResponsibleDisclosure/ResponsibleDisclosure";
import PrivacyPolicy from "../Page/ReturnPolicy/PrivacyPolicy/PrivacyPolicy";
import ContactUs from "../Page/ContactUs/ContactUs";
import Competitions from "../Page/Competitions/Competitions";
import ErrorPage from "../Page/ErrorPage/ErrorPage";
import DeleverForTakealot from "../Page/DeleverForTakealot/DeleverForTakealot";
import DriverPrivacyPolicy from "../Page/DriverPrivacyPolicy/DriverPrivacyPolicy";
import PrivateRoute from "./PrivateRoute";
import DeliveryLayout from "../Layout/DeliveryLayout";
import TrackOrder from "../Page/HelpCenter/TrackOrder/TrackOrder";
import RescheduleDelivery from "../Page/HelpCenter/RescheduleDelivery/RescheduleDelivery";
import SplitDelivery from "../Page/HelpCenter/SplitDelivery/SplitDelivery";
import NextBusiness from "../Page/HelpCenter/NextBusiness/NextBusiness";
import ChangeAddress from "../Page/HelpCenter/ChangeAddress/ChangeAddress";
import InternationalShipping from "../Page/HelpCenter/InternationalShipping/InternationalShipping";
import DeliveryFees from "../Page/HelpCenter/DeliveryFees/DeliveryFees";
import DeliveryTimeFrames from "../Page/HelpCenter/DeliveryTimeFrames/DeliveryTimeFrames";
import ChangeOrderToDelivery from "../Page/HelpCenter/ChangeOrderToDelivery/ChangeOrderToDelivery";
import ItemMissing from "../Page/HelpCenter/ItemMissing/ItemMissing";
import ReturnsLayout from "../Layout/ReturnsLayout";
import ReturnProducts from "../Page/HelpCenter/ReturnProducts/ReturnProducts";
import RescheduleCollection from "../Page/HelpCenter/RescheduleCollection/RescheduleCollection";
import TrackReturnStatus from "../Page/HelpCenter/TrackReturnStatus/TrackReturnStatus";
import ReturnProduct from "../Page/ReturnProduct/ReturnProduct";
import ReturnMethodFees from "../Page/HelpCenter/ReturnMethodFees/ReturnMethodFees";
import ReturnCancel from "../Page/HelpCenter/ReturnCancel/ReturnCancel";
import ReplaceProduct from "../Page/HelpCenter/ReplaceProduct/ReplaceProduct";
import ChangeReturnAddress from "../Page/HelpCenter/ChangeReturnAddress/ChangeReturnAddress";
import ReturningProductAccessories from "../Page/HelpCenter/ReturningProductAccessories/ReturningProductAccessories";
import WarrantyProduct from "../Page/HelpCenter/WarrantyProduct/WarrantyProduct";
import WrongProduct from "../Page/HelpCenter/WrongProduct/WrongProduct";
import ReturnRefund from "../Page/HelpCenter/ReturnRefund/ReturnRefund";
import FindReturnPolicy from "../Page/HelpCenter/FindReturnPolicy/FindReturnPolicy";
import AccountOverview from "../Page/SellerAccount/AccountOverview";
import SellerRouter from "./SellerRouter";
import Dashboard from "../Page/SellerAccount/SellerDashboard/Dashboard";
import DashboardHome from "../Page/SellerAccount/SellerDashboard/DashboardHome";
import OrderCancelLayout from "../Layout/OrderCancelLayout";
import CancelOrder from "../Page/HelpCenter/OrderDetails/CancelOrder/CancelOrder";
import ChangesOrder from "../Page/HelpCenter/OrderDetails/ChangesOrder/ChangesOrder";
import WhyCancelOrder from "../Page/HelpCenter/OrderDetails/WhyCancelOrder/WhyCancelOrder";
import RequestInvoice from "../Page/HelpCenter/OrderDetails/RequestInvoice/RequestInvoice";
import PlacingOrder from "../Page/HelpCenter/OrderDetails/PlacingOrder/PlacingOrder";
import CheckoutOutlet from "../Page/CheckoutReview/CheckoutOutlet";
import CheckReview from "../Page/CheckoutReview/CheckReview";
import CollectionLayout from "../Layout/CollectionLayout";
import AboutCollectionTimeFrames from "../Page/HelpCenter/CollectionDetails/AboutCollectionTimeFrames/AboutCollectionTimeFrames";
import AboutCollectionFees from "../Page/HelpCenter/CollectionDetails/AboutCollectionFees/AboutCollectionFees";
import TrackMyCollection from "../Page/HelpCenter/CollectionDetails/TrackMyCollection/TrackMyCollection";
import ChangingDeliveryMethod from "../Page/HelpCenter/CollectionDetails/ChangingDeliveryMethod/ChangingDeliveryMethod";
import CollectingOrder from "../Page/HelpCenter/CollectionDetails/CollectingOrder/CollectingOrder";
import RefundLayout from "../Layout/RefundLayout";
import GetRefund from "../Page/HelpCenter/RefundDetails/GetRefund/GetRefund";
import RefundTime from "../Page/HelpCenter/RefundDetails/RefundTime/RefundTime";





export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/fee-estimator',
        element: <FeeEstimator />
      },
      {
        path: "/all",
        element: <AllProducts />
      },
      {
        path: "/product-details/:name/:id",
        element: <ProductDetails />
      },
      {
        path: "/sell-on-takealot",
        element: <SellOn />
      },
      {
        path: "/sell/apply",
        element: <ApplyPage />
      },
      {
        path: "/my-account",
        element: <PrivateRoute><MyAccountPage /></PrivateRoute>
      },
      {
        path: '/contact-us',
        element: <ContactUs />
      },
      {
        path: 'competitions',
        element: <Competitions />
      },
      {
        path: 'takealot-deliver',
        element: <DeleverForTakealot />
      },
      {
        path: 'driver-privacy-policy',
        element: <DriverPrivacyPolicy />
      },
      {
        path: "/help-centre",
        element: <HelpCenterLayout />,
        children: [
          {
            path: "/help-centre",
            element: <HelpCenter />,
          },
          {
            path: "delivery",
            element: <DeliveryHelpHome />
          },
          {
            path: "deliveryDetails",
            element: <DeliveryLayout></DeliveryLayout>,
            children: [
              {
                path: "track-order",
                element: <TrackOrder></TrackOrder>
              },
              {
                path: "reschedule-delivery",
                element: <RescheduleDelivery></RescheduleDelivery>
              },
              {
                path: "split-requests",
                element: <SplitDelivery></SplitDelivery>
              },
              {
                path: "next-business-delivery",
                element: <NextBusiness></NextBusiness>
              },
              {
                path: 'change-delivery-address',
                element: <ChangeAddress></ChangeAddress>
              },
              {
                path: 'international-shipping-delivery',
                element: <InternationalShipping></InternationalShipping>
              },
              {
                path: "about-delivery-options-time-frames",
                element: <DeliveryTimeFrames></DeliveryTimeFrames>
              },
              {
                path: "delivery-fees",
                element: <DeliveryFees></DeliveryFees>
              },
              {
                path: "can-i-change-my-order-from-delivery-to-collect",
                element: <ChangeOrderToDelivery></ChangeOrderToDelivery>
              },
              {
                path: "item-missing-or-incorrect-in-order-received",
                element: <ItemMissing></ItemMissing>
              },
            ]
          },

          {
            path: "returns",
            element: <ReturnHelp />
          },
          {
            path: "returnDetails",
            element: <ReturnsLayout></ReturnsLayout>,
            children: [
              {
                path: "can-i-return-my-product",
                element: <ReturnProducts></ReturnProducts>
              },
              {
                path: "reschedule-collection",
                element: <RescheduleCollection></RescheduleCollection>
              },
              {
                path: "track-my-return-status",
                element: <TrackReturnStatus></TrackReturnStatus>
              },
              {
                path: "return-my-product",
                element: <ReturnProduct></ReturnProduct>
              },
              {
                path: "return-method-fees",
                element: <ReturnMethodFees></ReturnMethodFees>
              },
              {
                path: "cancel-my-return",
                element: <ReturnCancel></ReturnCancel>
              },
              {
                path: "can-i-change-my-collection-address-once-i-have-logged-a-return",
                element: <ChangeReturnAddress></ChangeReturnAddress>
              },
              {
                path: "exchange-or-replace-product",
                element: <ReplaceProduct></ReplaceProduct>
              },
              {
                path: "returning-a-product-without-accessories-or-its-partner-product",
                element: <ReturningProductAccessories></ReturningProductAccessories>
              },
              {
                path: "how-do-i-return-a-manufacturer-warranty-product",
                element: <WarrantyProduct></WarrantyProduct>
              },
              {
                path: "the-product-i-received-is-not-what-i-ordered",
                element: <WrongProduct></WrongProduct>
              },
              {
                path: "how-soon-will-i-get-a-refund-or-credit-on-my-return",
                element: <ReturnRefund></ReturnRefund>
              },
              {
                path: "the-product-i-received-is-not-what-i-ordered",
                element: <WrongProduct></WrongProduct>
              },
              {
                path: "find-return-policy",
                element: <FindReturnPolicy></FindReturnPolicy>
              },
            ]
          },
          {
            path: "orders-cancellations",
            element: <OrderCancellationHelp />
          },
          {
            path: "orderCancelDetails",
            element: <OrderCancelLayout></OrderCancelLayout>,
            children: [
              {
                path: "how-do-i-cancel-an-order",
                element: <CancelOrder></CancelOrder>
              },
              {
                path: "can-i-make-changes-to-my-order-after-it-has-been-placed",
                element: <ChangesOrder></ChangesOrder>
              },
              {
                path: "why-have-you-cancelled-my-order",
                element: <WhyCancelOrder></WhyCancelOrder>
              },
              {
                path: "request-invoice",
                element: <RequestInvoice></RequestInvoice>
              },
              {
                path: "placing-order",
                element: <PlacingOrder></PlacingOrder>
              },
            ]
          },
          {
            path: "collection",
            element: <CollectionHelp />
          },
          {
            path: "collectionDetails",
            element: <CollectionLayout></CollectionLayout>,
            children: [
              {
                path: "about-collection-options-time-frames",
                element: <AboutCollectionTimeFrames></AboutCollectionTimeFrames>
              },
              {
                path: "about-collection-fees",
                element: <AboutCollectionFees></AboutCollectionFees>
              },
              {
                path: "change-delivery-method",
                element: <ChangingDeliveryMethod></ChangingDeliveryMethod>
              },
              {
                path: "track-my-collection-order",
                element: <TrackMyCollection></TrackMyCollection>
              },
              {
                path: "collecting-order",
                element: <CollectingOrder></CollectingOrder>
              },
              {
                path: "why-collection-not-available",
                element: <CollectingOrder></CollectingOrder>
              },
            ]
          },
          {
            path: "refunds",
            element: <RefundsHelp />
          },
          {
            path: "refundDetails",
            element: <RefundLayout></RefundLayout>,
            children: [
              {
                path: "how-do-i-get-a-refund-instead-of-a-credit",
                element: <GetRefund></GetRefund>
              },
              {
                path: "why-is-my-refund-taking-so-long",
                element: <RefundTime></RefundTime>
              },
            ]
          },
          {
            path: "payments-promos-gift-vouchers",
            element: <PaymentsPromosGiftVouchersHelp />
          },
          {
            path: "product-stock",
            element: <ProductStockHelp />
          },
          {
            path: "data-privacy",
            element: <DataPrivacyHelp />
          },
        ]
      },
      {
        path: "/account/register",
        element: <RegisterPage />
      },
      {
        path: "/account/login",
        element: <LoginPage />
      },

      {
        path: "/account",
        element: <PrivateRoute><Account /></PrivateRoute>,
        children: [

          {
            path: "orders",
            element: <PrivateRoute><Orders /></PrivateRoute>
          },
          {
            path: "returns",
            element: <PrivateRoute><Returns /></PrivateRoute>
          },
          {
            path: "credits",
            element: <PrivateRoute><CreditRefunds /></PrivateRoute>
          },
          {
            path: "reviews",
            element: <PrivateRoute><ProductReview /></PrivateRoute>
          },
          {
            path: "invoices",
            element: <PrivateRoute><Invoices /></PrivateRoute>
          },
          {
            path: "personal-details",
            element: <PrivateRoute><PersonalInfo /></PrivateRoute>
          },
          {
            path: "voucher",
            element: <PrivateRoute><ApplyVoucher /></PrivateRoute>
          },
          {
            path: "address-book",
            element: <PrivateRoute><AddressBook /></PrivateRoute>
          },
          {
            path: "newsletter",
            element: <PrivateRoute><Newsletter /></PrivateRoute>
          },
          {
            path: "reviewshistory",
            element: <PrivateRoute><ReviewsHistory /></PrivateRoute>
          },
          {
            path: "refundshistory",
            element: <PrivateRoute><RefundsHistory /></PrivateRoute>
          },
        ]
      },
      {
        path: "wishlist",
        element: <PrivateRoute><Wishlist /></PrivateRoute>
      },
      {
        path: "/cart",
        element: <PrivateRoute><Cart /></PrivateRoute>
      },
      {
        path: "/takealot-pickup-points",
        element: <PickupPoints />
      },
      {
        path: "/return-policy-help/",
        element: <ReturnPolicyAndHelp />,
        children: [
          {
            path: "/return-policy-help/",
            element: <ReturnPolicy />
          },
          {
            path: "terms-and-conditions",
            element: <TermsAndCs />
          },
          {
            path: "savealot-daily-deals",
            element: <DailyDeals />
          },
          {
            path: "promotional-codes-tcs",
            element: <VouchersAndCouponsConditions />
          },
          {
            path: "responsible-disclosure-policy",
            element: <ResponsibleDisclosure />
          },
          {
            path: "privacy-policy",
            element: <PrivacyPolicy />
          }

        ]
      },
      {
        path: "/about",
        element: <About />,
        children: [
          {
            path: "who-we-are",
            element: <WhoWeAre />
          },
          {
            path: "our-journey",
            element: <OurJourney />
          },
          {
            path: "our-values",
            element: <OurValue />
          },
          {
            path: "our-environment",
            element: <OurEnv />
          },
          {
            path: "careers",
            element: <OurCareers />
          },
          {
            path: "extraordinary-minds",
            element: <Extraordinary />
          },
          {
            path: "company-news",
            element: <CompanyNews />
          },
          {
            path: "our-charity",
            element: <Charity />
          },
          {
            path: "delivery-team",
            element: <DeliveryTeam />
          }
        ]
      },
      {
        path: "/seller-account-overview",
        element: <SellerRouter><AccountOverview /></SellerRouter>
      },
      {
        path: "/seller-dashboard",
        element: <SellerRouter><Dashboard /></SellerRouter>,
        children: [
          {
            path: "dashboard-home",
            element: <SellerRouter><DashboardHome /></SellerRouter>
          },
        ]
      }
    ]
  },
  {
    path: "/buy",
    errorElement: <ErrorPage />,
    element: <PrivateRoute><CheckoutOutlet /></PrivateRoute>,
    children: [
      {
        path: "review",
        element: <PrivateRoute><CheckReview /></PrivateRoute>
      }
    ]
  }
]);
