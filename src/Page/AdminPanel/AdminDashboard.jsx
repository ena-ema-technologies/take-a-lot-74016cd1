import React from 'react';
import { HiBars3BottomLeft, HiHome } from 'react-icons/hi2';
import { Link, NavLink, Outlet } from 'react-router-dom';

const AdminDashboard = () => {
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
                    <p className='dash-default w-full flex items-center justify-between text-2xl'> <span> Admin Panel</span></p>

                    <NavLink to="/admin-dashboard/admin-home" className={({ isActive }) => (isActive ? "dash-active" : "dash-default")}><HiHome className='inline-flex items-center h-5 w-5' /> Seller Request</NavLink>

                </ul>

            </div>
        </div>
    );
};

export default AdminDashboard;