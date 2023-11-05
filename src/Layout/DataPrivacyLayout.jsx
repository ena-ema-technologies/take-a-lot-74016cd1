import React, { useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';

const DataPrivacyLayout = () => {
    const [viewExpandState, setViewExpandState] = useState(false);

    const location = useLocation();

    const registerAccount = location.pathname.includes("register-to-takealot");
    const resettingPassword = location.pathname.includes("resetting-password");
    const unSubscriber = location.pathname.includes("unsubscribe-email-newsletters")
    const personalInfo = location.pathname.includes("about-personal-information")
    const profileUpdate = location.pathname.includes("profile-update-information");
    const managingPersonal = location.pathname.includes("managing-personal");
    const deleteAccount = location.pathname.includes("delete-account");
    const trackStatus = location.pathname.includes("track-status-deletion");
    const aboutPOPIA = location.pathname.includes("about-POPIA");
    const verifyAccount = location.pathname.includes("verify-identity");
    const difference = location.pathname.includes("between-POPIA-PAIA");
    const security = location.pathname.includes("security-compromise");
    const authorise = location.pathname.includes("authorise-another-person");
    const accessFamilyMember = location.pathname.includes("access-deceased-family");
    const cookies = location.pathname.includes("about-cookies");
    const allowChildren = location.pathname.includes("children-allowed");
    const verifyEmail = location.pathname.includes("verify-email-address");
    const verifyPhone = location.pathname.includes("verify-mobile-number");


    return (
        <section className='lg:px-4'>

            <div className='hero h-80 rounded-b-lg relative' style={{ backgroundImage: "url(https://shopfront.takealot.com/b317a38ffe915f6034dfee91ccee142cabe5ca77/static/media/src/images/help-centre/Header-Large@2x.png-868cd5e789ded2bf3855.png)", backgroundRepeat: "no-repeat" }}>

                <div className="hidden lg:block text-xs breadcrumbs text-white absolute top-20 left-10">
                    <ul>
                        <li><Link to="/help-centre">Help Centre</Link></li>
                        <li><Link to="help-centre/data-privacy">Data & Privacy
                        </Link>
                        </li>
                        <li className='font-semibold'>
                            {
                                availablePayment ? "Available payment options" : priceItem ? "Why does the price of my item change when I try and check out ?" : recievedConfirmation ? "Why haven’t I received my payment confirmation email?" : couponCode ? "All about coupon codes & discounts" : giftVoucher ? "All about gift vouchers" : payFlex ? "All about PayFlex" : card ? "All about Credit / Debit Card Payments" : cod ? "All about Cash on Delivery ( COD )" : eftOzow ? "All about Instant EFT with Ozow" : eftWithPayFast ? "All about Instant EFT with PayFast" : mobiCred ? "All about MobiCred" : eBucks ? "All about eBucks" : masterPass ? "All about MasterPass" : discoveryMiles ? "All about discovery miles" : ""
                            } </li>
                    </ul>
                </div>

                <div className='text-white absolute top-40 left-10'>

                    <p className='text-xl lg:text-3xl font-bold text-white'>

                        {
                            availablePayment ? "Available payment options" : priceItem ? "Why does the price of my item change when I try and check out ?" : recievedConfirmation ? "Why haven’t I received my payment confirmation email ?" : couponCode ? "All about coupon codes & discounts" : giftVoucher ? "All about gift vouchers" : payFlex ? "All about PayFlex" : card ? "All about Credit / Debit Card Payments" : cod ? "All about Cash on Delivery ( COD )" : eftOzow ? "All about Instant EFT with Ozow" : eftWithPayFast ? "All about Instant EFT with PayFast" : mobiCred ? "All about MobiCred" : eBucks ? "All about eBucks" : masterPass ? "All about MasterPass" : discoveryMiles ? "All about discovery miles" : ""
                        } </p>

                </div>
            </div>



            {/* outlet content */}

            <div className='-my-20 w-[98%] mx-auto relative mb-6'>
                <div className='flex items-start justify-between gap-8'>

                    {/* outlet start here */}

                    <Outlet></Outlet>

                    {/* outlet start end */}


                    {/* right side bar start */}
                    <div className='w-[350px] bg-white shadow hidden lg:block text-sm'>
                        <p className='p-3 text-base font-medium text-[#000]'> Delivery Topics </p>
                        <div className='border-b border-[#dadada]'></div>

                        <div className='my-3 flex flex-col gap-2'>
                            <NavLink to="/help-centre/data-privacy-details/register-to-takealot" className={({ isActive }) => (isActive ? "bg-primary w-[90%] pl-3 py-2  rounded-r-full bg-opacity-10 border-l-4 border-primary text-primary" : "bg-transparent hover:bg-gray-100 w-[90%] pl-3 py-2  rounded-r-full bg-opacity-10 border-l-4 border-primary")}> How to register on takealot.com </NavLink>


                            <NavLink to="help-centre/data-privacy-details/register-to-takealot" className={({ isActive }) => (isActive ? "bg-primary w-[90%] pl-3 py-2 rounded-r-full bg-opacity-10 border-l-4 border-primary text-primary" : "bg-transparent hover:bg-gray-100 w-[90%] pl-3 py-2  rounded-r-full bg-opacity-10 border-l-4 border-transparent")}> Why does the price of my item change when I try and check out ? </NavLink>


                            <NavLink to="help-centre/data-privacy-details/register-to-takealot" className={({ isActive }) => (isActive ? "bg-primary w-[90%] pl-3 py-2 rounded-r-full bg-opacity-10 border-l-4 border-primary text-primary" : "bg-transparent hover:bg-gray-100 w-[90%] pl-3 py-2  rounded-r-full bg-opacity-10 border-l-4 border-transparent")}> Why haven’t I received my payment confirmation email ?
                            </NavLink>


                            <NavLink to="help-centre/data-privacy-details/register-to-takealot" className={({ isActive }) => (isActive ? "bg-primary w-[90%] pl-3 py-2 rounded-r-full bg-opacity-10 border-l-4 border-primary text-primary" : "bg-transparent hover:bg-gray-100 w-[90%] pl-3 py-2  rounded-r-full bg-opacity-10 border-l-4 border-transparent")}> All about coupon codes & discounts
                            </NavLink>


                            <NavLink to="help-centre/data-privacy-details/register-to-takealot" className={({ isActive }) => (isActive ? "bg-primary w-[90%] pl-3 py-2  rounded-r-full bg-opacity-10 border-l-4 border-primary text-primary" : "bg-transparent hover:bg-gray-100 w-[90%] pl-3 py-2  rounded-r-full bg-opacity-10 border-l-4 border-transparent")}> All about gift vouchers </NavLink>


                            <NavLink to="help-centre/data-privacy-details/register-to-takealot" className={({ isActive }) => (isActive ? "bg-primary w-[90%] pl-3 py-2  rounded-r-full bg-opacity-10 border-l-4 border-primary text-primary" : "bg-transparent hover:bg-gray-100 w-[90%] pl-3 py-2 rounded-r-full bg-opacity-10 border-l-4 border-transparent")}>  All about PayFlex </NavLink>


                            <NavLink to="help-centre/data-privacy-details/register-to-takealot" className={({ isActive }) => (isActive ? "bg-primary w-[90%] pl-3 py-2 rounded-r-full bg-opacity-10 border-l-4 border-primary text-primary" : "bg-transparent hover:bg-gray-100 w-[90%] pl-3 py-2 rounded-r-full bg-opacity-10 border-l-4 border-transparent")}> All about Credit / Debit Card Payments </NavLink>


                            <NavLink to="help-centre/data-privacy-details/register-to-takealot" className={({ isActive }) => (isActive ? "bg-primary w-[90%] pl-3 py-2 rounded-r-full bg-opacity-10 border-l-4 border-primary text-primary" : "bg-transparent hover:bg-gray-100 w-[90%] pl-3 py-2  rounded-r-full bg-opacity-10 border-l-4 border-transparent")}> All about Cash on Delivery ( COD ) </NavLink>

                            <NavLink to="help-centre/data-privacy-details/register-to-takealot" className={({ isActive }) => (isActive ? "bg-primary w-[90%] pl-3 py-2 rounded-r-full bg-opacity-10 border-l-4 border-primary text-primary" : "bg-transparent hover:bg-gray-100 w-[90%] pl-3 py-2  rounded-r-full bg-opacity-10 border-l-4 border-transparent")}> All about Instant EFT with Ozow </NavLink>

                            <NavLink to="help-centre/data-privacy-details/register-to-takealot" className={({ isActive }) => (isActive ? "bg-primary w-[90%] pl-3 py-2 rounded-r-full bg-opacity-10 border-l-4 border-primary text-primary" : "bg-transparent hover:bg-gray-100 w-[90%] pl-3 py-2  rounded-r-full bg-opacity-10 border-l-4 border-transparent")}> All about Instant EFT with PayFast
                            </NavLink>

                            {/* extra nav */}

                            {
                                viewExpandState ?
                                    <>
                                        <NavLink to="help-centre/data-privacy-details/register-to-takealot" className={({ isActive }) => (isActive ? "bg-primary w-[90%] pl-3 py-2 rounded-r-full bg-opacity-10 border-l-4 border-primary text-primary" : "bg-transparent hover:bg-gray-100 w-[90%] pl-3 py-2  rounded-r-full bg-opacity-10 border-l-4 border-transparent")}> All about Mobicred
                                        </NavLink>

                                        <NavLink to="help-centre/data-privacy-details/register-to-takealot" className={({ isActive }) => (isActive ? "bg-primary w-[90%] pl-3 py-2 rounded-r-full bg-opacity-10 border-l-4 border-primary text-primary" : "bg-transparent hover:bg-gray-100 w-[90%] pl-3 py-2  rounded-r-full bg-opacity-10 border-l-4 border-transparent")}> All about eBucks
                                        </NavLink>

                                        <NavLink to="help-centre/data-privacy-details/register-to-takealot" className={({ isActive }) => (isActive ? "bg-primary w-[90%] pl-3 py-2 rounded-r-full bg-opacity-10 border-l-4 border-primary text-primary" : "bg-transparent hover:bg-gray-100 w-[90%] pl-3 py-2  rounded-r-full bg-opacity-10 border-l-4 border-transparent")}> All about Masterpass
                                        </NavLink>

                                        <NavLink to="help-centre/data-privacy-details/register-to-takealot" className={({ isActive }) => (isActive ? "bg-primary w-[90%] pl-3 py-2 rounded-r-full bg-opacity-10 border-l-4 border-primary text-primary" : "bg-transparent hover:bg-gray-100 w-[90%] pl-3 py-2  rounded-r-full bg-opacity-10 border-l-4 border-transparent")}> All about Discovery Miles
                                        </NavLink>
                                        <NavLink to="help-centre/data-privacy-details/register-to-takealot" className={({ isActive }) => (isActive ? "bg-primary w-[90%] pl-3 py-2 rounded-r-full bg-opacity-10 border-l-4 border-primary text-primary" : "bg-transparent hover:bg-gray-100 w-[90%] pl-3 py-2  rounded-r-full bg-opacity-10 border-l-4 border-transparent")}> All about Discovery Miles
                                        </NavLink>
                                        <NavLink to="help-centre/data-privacy-details/register-to-takealot" className={({ isActive }) => (isActive ? "bg-primary w-[90%] pl-3 py-2 rounded-r-full bg-opacity-10 border-l-4 border-primary text-primary" : "bg-transparent hover:bg-gray-100 w-[90%] pl-3 py-2  rounded-r-full bg-opacity-10 border-l-4 border-transparent")}> All about Discovery Miles
                                        </NavLink>
                                        <NavLink to="help-centre/data-privacy-details/register-to-takealot" className={({ isActive }) => (isActive ? "bg-primary w-[90%] pl-3 py-2 rounded-r-full bg-opacity-10 border-l-4 border-primary text-primary" : "bg-transparent hover:bg-gray-100 w-[90%] pl-3 py-2  rounded-r-full bg-opacity-10 border-l-4 border-transparent")}> All about Discovery Miles
                                        </NavLink>
                                        <NavLink to="help-centre/data-privacy-details/register-to-takealot" className={({ isActive }) => (isActive ? "bg-primary w-[90%] pl-3 py-2 rounded-r-full bg-opacity-10 border-l-4 border-primary text-primary" : "bg-transparent hover:bg-gray-100 w-[90%] pl-3 py-2  rounded-r-full bg-opacity-10 border-l-4 border-transparent")}> All about Discovery Miles
                                        </NavLink>

                                    </>

                                    : ""
                            }

                            <hr />
                            <div className='pl-4 text-primary hover:cursor-pointer hover:underline'
                                onClick={() => setViewExpandState(!viewExpandState)}
                            >
                                {viewExpandState ? "View Less" : "View More"}
                            </div>


                        </div>
                    </div>

                    {/* right side bar end */}
                </div>
            </div>

            {/* contact us start*/}



            {/* contact us end*/}

        </section>
    );
};

export default DataPrivacyLayout;