import React from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';

const ReturnsLayout = () => {

    const location = useLocation();
    const rescheduleLocation = location.pathname.includes("can-i-return-my-product");
    const rescheduledCollection = location.pathname.includes("reschedule-collection");
    const changeAddress = location.pathname.includes("change-delivery-address")
    const deliveryOptions = location.pathname.includes("about-delivery-options-time-frames")
    const nextBusiness = location.pathname.includes("next-business-delivery");
    const deliveryFees = location.pathname.includes("delivery-fees");
    const internationalShipping = location.pathname.includes("international-shipping-delivery");
    const canIChange = location.pathname.includes("can-i-change-my-order-from-delivery-to-collect");
    const itemMissing = location.pathname.includes("item-missing-or-incorrect-in-order-received");


    return (
        <section className='lg:px-4'>

            <div className='hero h-80 rounded-b-lg relative' style={{ backgroundImage: "url(https://shopfront.takealot.com/b317a38ffe915f6034dfee91ccee142cabe5ca77/static/media/src/images/help-centre/Header-Large@2x.png-868cd5e789ded2bf3855.png)", backgroundRepeat: "no-repeat" }}>

                <div className="hidden lg:block text-xs breadcrumbs text-white absolute top-20 left-10">
                    <ul>
                        <li><Link to="/help-centre">Help Centre</Link></li>
                        <li><Link to="/help-centre/delivery">Delivery</Link></li>
                        <li className='font-semibold'>
                            {
                                rescheduleLocation ? "Can I return my product?" : rescheduledCollection ? "Reschedule my return collection" : changeAddress ? "Change your address" : deliveryOptions ? "Delivery options & time frames" : nextBusiness ? "Next business delivery" : deliveryFees ? "Delivery fees" : internationalShipping ? "International shipping" : canIChange ? "Can I change my order from delivery to collect?" : itemMissing ? "Item missing or incorrect in order received" : "Track your Order"

                            }</li>
                    </ul>
                </div>

                <div className='text-white absolute top-40 left-10'>

                    <p className='text-xl lg:text-3xl font-bold text-white'>
                        {
                            rescheduleLocation ? "Can I return my product?" : rescheduledCollection ? "Reschedule my return collection" : changeAddress ? "Change your address" : deliveryOptions ? "Delivery options & time frames" : nextBusiness ? "Next business delivery" : deliveryFees ? "Delivery fees" : internationalShipping ? "International shipping" : canIChange ? "Can I change my order from delivery to collect?" : itemMissing ? "Item missing or incorrect in order received" : "Track your Order"

                        }</p>

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
                            <NavLink to="/help-centre/returnDetails/can-i-return-my-product" className={({ isActive }) => (isActive ? "bg-primary w-[90%] pl-3 py-2  rounded-r-full bg-opacity-10 border-l-4 border-primary text-primary" : "bg-transparent hover:bg-gray-100 w-[90%] pl-3 py-2  rounded-r-full bg-opacity-10 border-l-4 border-primary")}> Can I return my product ? </NavLink>


                            <NavLink to="/help-centre/returnDetails/reschedule-collection" className={({ isActive }) => (isActive ? "bg-primary w-[90%] pl-3 py-2 rounded-r-full bg-opacity-10 border-l-4 border-primary text-primary" : "bg-transparent hover:bg-gray-100 w-[90%] pl-3 py-2  rounded-r-full bg-opacity-10 border-l-4 border-transparent")}> Reschedule my return collection </NavLink>


                            <NavLink to="/help-centre/deliveryDetails/change-delivery-address" className={({ isActive }) => (isActive ? "bg-primary w-[90%] pl-3 py-2 rounded-r-full bg-opacity-10 border-l-4 border-primary text-primary" : "bg-transparent hover:bg-gray-100 w-[90%] pl-3 py-2  rounded-r-full bg-opacity-10 border-l-4 border-transparent")}> Track my return status </NavLink>


                            <NavLink to="/help-centre/deliveryDetails/about-delivery-options-time-frames" className={({ isActive }) => (isActive ? "bg-primary w-[90%] pl-3 py-2 rounded-r-full bg-opacity-10 border-l-4 border-primary text-primary" : "bg-transparent hover:bg-gray-100 w-[90%] pl-3 py-2  rounded-r-full bg-opacity-10 border-l-4 border-transparent")}> How doI return my product ?
                            </NavLink>


                            <NavLink to="/help-centre/deliveryDetails/next-business-delivery" className={({ isActive }) => (isActive ? "bg-primary w-[90%] pl-3 py-2  rounded-r-full bg-opacity-10 border-l-4 border-primary text-primary" : "bg-transparent hover:bg-gray-100 w-[90%] pl-3 py-2  rounded-r-full bg-opacity-10 border-l-4 border-transparent")}> All about return method & fees </NavLink>


                            <NavLink to="/help-centre/deliveryDetails/delivery-fees" className={({ isActive }) => (isActive ? "bg-primary w-[90%] pl-3 py-2  rounded-r-full bg-opacity-10 border-l-4 border-primary text-primary" : "bg-transparent hover:bg-gray-100 w-[90%] pl-3 py-2 rounded-r-full bg-opacity-10 border-l-4 border-transparent")}>  Cancel my return  </NavLink>


                            <NavLink to="/help-centre/deliveryDetails/can-i-change-my-order-from-delivery-to-collect" className={({ isActive }) => (isActive ? "bg-primary w-[90%] pl-3 py-2 rounded-r-full bg-opacity-10 border-l-4 border-primary text-primary" : "bg-transparent hover:bg-gray-100 w-[90%] pl-3 py-2 rounded-r-full bg-opacity-10 border-l-4 border-transparent")}> Can I exchange or replace a product ? </NavLink>


                            <NavLink to="/help-centre/deliveryDetails/split-requests" className={({ isActive }) => (isActive ? "bg-primary w-[90%] pl-3 py-2 rounded-r-full bg-opacity-10 border-l-4 border-primary text-primary" : "bg-transparent hover:bg-gray-100 w-[90%] pl-3 py-2  rounded-r-full bg-opacity-10 border-l-4 border-transparent")}> Can I change my collection address once I have logged a return? </NavLink>

                            <NavLink to="/help-centre/deliveryDetails/item-missing-or-incorrect-in-order-received" className={({ isActive }) => (isActive ? "bg-primary w-[90%] pl-3 py-2 rounded-r-full bg-opacity-10 border-l-4 border-primary text-primary" : "bg-transparent hover:bg-gray-100 w-[90%] pl-3 py-2  rounded-r-full bg-opacity-10 border-l-4 border-transparent")}> Returning a product without accessories or its partner product </NavLink>

                            <NavLink to="/help-centre/deliveryDetails/international-shipping-delivery" className={({ isActive }) => (isActive ? "bg-primary w-[90%] pl-3 py-2 rounded-r-full bg-opacity-10 border-l-4 border-primary text-primary" : "bg-transparent hover:bg-gray-100 w-[90%] pl-3 py-2  rounded-r-full bg-opacity-10 border-l-4 border-transparent")}> How do I return a manufacturer warranty product?
                            </NavLink>


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

export default ReturnsLayout;