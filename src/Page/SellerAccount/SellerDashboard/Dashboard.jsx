import React, { useState } from 'react';
import { HiBars3BottomLeft, HiHome, HiMiniAdjustmentsHorizontal, HiMiniCreditCard, HiMiniListBullet, HiMiniTag, HiOutlineChevronDown, HiOutlineChevronUp, HiOutlineScale, HiOutlineTruck, HiPresentationChartBar } from 'react-icons/hi2';
import { IoIosPricetags } from 'react-icons/io';
import { Link, NavLink, Outlet } from 'react-router-dom';

const Dashboard = () => {
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [isOpen4, setIsOpen4] = useState(false);
  const [isOpen5, setIsOpen5] = useState(false);

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center relative">
        <Outlet />
        <label htmlFor="my-drawer-2" className="drawer-button lg:hidden absolute left-16 -top-12 z-50"><HiBars3BottomLeft className='w-10 h-10 text-primary' /></label>

      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu py-4 pl-4 pr-0 w-60 min-h-screen bg-[#525659] text-base-content">
          <Link to="/" className="inline-flex items-start justify-start gap-2 mt-2 mb-10">
            <img src="https://i.ibb.co/wB0jzwR/Electro-DEMO-4.png" alt="Logo" className='' />
          </Link>

          <NavLink to="/seller-dashboard/dashboard-home" className={({ isActive }) => (isActive ? "dash-active" : "dash-default")}><HiHome className='inline-flex items-center h-5 w-5' /> Dashboard</NavLink>

          <p className='dash-default w-full flex items-center justify-between' onMouseEnter={() => setIsOpen1(true)} onClick={() => setIsOpen1(false)}> <span><HiMiniTag className='inline-flex items-center h-5 w-5' /> My Existing Offers</span> {isOpen1 ? <HiOutlineChevronUp className='inline-flex items-center h-5 w-5' /> : <HiOutlineChevronDown className='inline-flex items-center h-5 w-5' />}</p>

          <div className={`${isOpen1 ? 'flex flex-col' : 'hidden'}  z-50`} onMouseEnter={() => setIsOpen1(true)} onMouseLeave={() => setIsOpen1(false)}>

            <NavLink to="/seller-dashboard/manage-my-offer" className={({ isActive }) => (isActive ? "dash-active" : "dash-default")}> Manage My Offers</NavLink>

            <NavLink to="/seller-dashboard/view-bulk-result" className={({ isActive }) => (isActive ? "dash-active" : "dash-default")}> View Bulk Result</NavLink>

            <NavLink to="/seller-dashboard/request-product-edit" className={({ isActive }) => (isActive ? "dash-active" : "dash-default")}> Request Product Edit</NavLink>

            {/* <NavLink to="/seller-dashboard/view-product-edit-submission" className={({ isActive }) => (isActive ? "dash-active" : "dash-default")}> View Product Edit Submission</NavLink> */}

          </div>

          <p className='dash-default w-full flex items-center justify-between' onMouseEnter={() => setIsOpen2(true)} onClick={() => setIsOpen2(false)}> <span><HiMiniListBullet className='inline-flex items-center h-5 w-5' /> New Offers</span> {isOpen2 ? <HiOutlineChevronUp className='inline-flex items-center h-5 w-5' /> : <HiOutlineChevronDown className='inline-flex items-center h-5 w-5' />}</p>

          <div className={`${isOpen2 ? 'flex flex-col' : 'hidden'}  z-50`} onMouseEnter={() => setIsOpen2(true)} onMouseLeave={() => setIsOpen2(false)}>

            <NavLink to="/seller-dashboard/search-takealot-catalogue" className={({ isActive }) => (isActive ? "dash-active" : "dash-default")}> Search Takealot's Catalogue</NavLink>

            <NavLink to="/seller-dashboard/add-takealot-catalogue" className={({ isActive }) => (isActive ? "dash-active" : "dash-default")}> Add to Takealot's Catalogue</NavLink>

          </div>


          <p className='dash-default w-full flex items-center justify-between' onMouseEnter={() => setIsOpen3(true)} onClick={() => setIsOpen3(false)}> <span><HiOutlineTruck className='inline-flex items-center h-5 w-5' /> Shipments</span> {isOpen3 ? <HiOutlineChevronUp className='inline-flex items-center h-5 w-5' /> : <HiOutlineChevronDown className='inline-flex items-center h-5 w-5' />}</p>

          <div className={`${isOpen3 ? 'flex flex-col' : 'hidden'}  z-50`} onMouseEnter={() => setIsOpen3(true)} onMouseLeave={() => setIsOpen3(false)}>

            <NavLink to="/seller-dashboard/leadtime-orders" className={({ isActive }) => (isActive ? "dash-active" : "dash-default")}> Leadtime Orders</NavLink>

            <NavLink to="/seller-dashboard/confirmed-shipment" className={({ isActive }) => (isActive ? "dash-active" : "dash-default")}> Confirmed Shipments</NavLink>

            {/* <NavLink to="/seller-dashboard/draft-shipment" className={({ isActive }) => (isActive ? "dash-active" : "dash-default")}> Draft Shipment</NavLink>

            <NavLink to="/seller-dashboard/confirmed-shipment" className={({ isActive }) => (isActive ? "dash-active" : "dash-default")}> Confirmed Shipments</NavLink>

            <NavLink to="/seller-dashboard/shipped-shipment" className={({ isActive }) => (isActive ? "dash-active" : "dash-default")}> Shipped Shipments</NavLink>

            <NavLink to="/seller-dashboard/manage-removal-order" className={({ isActive }) => (isActive ? "dash-active" : "dash-default")}> Manage Removal Orders</NavLink>

            <NavLink to="/seller-dashboard/replenishment-shipment" className={({ isActive }) => (isActive ? "dash-active" : "dash-default")}> New Replenishment Shipments</NavLink> */}

          </div>


          <p className='dash-default w-full flex items-center justify-between' onMouseEnter={() => setIsOpen4(true)} onClick={() => setIsOpen4(false)}> <span><HiMiniCreditCard className='inline-flex items-center h-5 w-5' /> Sales</span> {isOpen4 ? <HiOutlineChevronUp className='inline-flex items-center h-5 w-5' /> : <HiOutlineChevronDown className='inline-flex items-center h-5 w-5' />}</p>

          <div className={`${isOpen4 ? 'flex flex-col' : 'hidden'}  z-50`} onMouseEnter={() => setIsOpen4(true)} onMouseLeave={() => setIsOpen4(false)}>

            <NavLink to="/seller-dashboard/view-sales" className={({ isActive }) => (isActive ? "dash-active" : "dash-default")}> View Sales</NavLink>

            <NavLink to="/seller-dashboard/view-return" className={({ isActive }) => (isActive ? "dash-active" : "dash-default")}> View Return</NavLink>

            <NavLink to="/seller-dashboard/customer-invoice-request" className={({ isActive }) => (isActive ? "dash-active" : "dash-default")}> Customer Invoice Request</NavLink>

          </div>


          <p className='dash-default w-full flex items-center justify-between' onMouseEnter={() => setIsOpen5(true)} onClick={() => setIsOpen5(false)}><span><HiOutlineScale className='inline-flex items-center h-5 w-5' /> Accounting </span>{isOpen5 ? <HiOutlineChevronUp className='inline-flex items-center h-5 w-5' /> : <HiOutlineChevronDown className='inline-flex items-center h-5 w-5' />}</p>

          <div className={`${isOpen5 ? 'flex flex-col' : 'hidden'}  z-50`} onMouseEnter={() => setIsOpen5(true)} onMouseLeave={() => setIsOpen5(false)}>

            <NavLink to="/seller-dashboard/account-seller-transaction" className={({ isActive }) => (isActive ? "dash-active" : "dash-default")}> Transaction</NavLink>

            {/* <NavLink to="/seller-dashboard/account-seller-invoice" className={({ isActive }) => (isActive ? "dash-active" : "dash-default")}>Invoice</NavLink>

            <NavLink to="/seller-dashboard/account-seller-statements" className={({ isActive }) => (isActive ? "dash-active" : "dash-default")}>Statements</NavLink> */}

          </div>

          {/* <NavLink to="/seller-dashboard/seller-reports" className={({ isActive }) => (isActive ? "dash-active" : "dash-default")}><HiPresentationChartBar className='inline-flex items-center h-5 w-5' /> Reports</NavLink> */}


        </ul>

      </div>
    </div>
  );
};

export default Dashboard;