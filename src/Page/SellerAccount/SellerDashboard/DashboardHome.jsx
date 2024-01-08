import React, { useEffect } from 'react';
import { useState } from 'react';
import { FaBuilding, FaDownload, FaTasks } from 'react-icons/fa';
import { HiMiniBell, HiMiniCog, HiMiniCog8Tooth, HiOutlineChevronRight, HiOutlineClipboardDocumentList } from 'react-icons/hi2';
import { IoIosCard, IoIosSend, IoMdBusiness } from 'react-icons/io';
import { IoPeopleCircleOutline, IoPersonCircleOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import useSeller from '../../../hooks/useSeller';
import DashboardHead from '../../../components/DashboardHead/DashboardHead';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const DashboardHome = () => {
    const [axiosSecure] = useAxiosSecure();
    const [totalProd, setTotalProducts] = useState(0);
    const [totalShipment, setTotalShipment] = useState(0);
    const [sellerInfo, refetch] = useSeller();

    useEffect(() => {
        fetchTotalOrders();
        fetchTotalShipments();
    }, [])


    const fetchTotalOrders = async () => {
        const result = await axiosSecure.get("/total-orders")
        setTotalProducts(result.data.totalProduct)
    }

    const fetchTotalShipments = async () => {
        const result = await axiosSecure.get("/total-confirmed-shipment")
        setTotalShipment(result.data.totalProduct)
    }
    return (
        <section className='w-[99%] relative h-full'>
            <nav className='absolute left-0 right-0 top-0'>
                <DashboardHead title="Dashboard" />
            </nav>

            <div className='flex items-center justify-between mt-16'>
                <div>
                    <h1 className='text-2xl font-semibold'>Welcome, <span className='text-primary'>{sellerInfo?.companyName}</span></h1>
                </div>

                <div>
                    <p className='text-xs font-semibold'>Your Seller ID: <span>{sellerInfo?._id}</span></p>
                </div>
            </div>

            <div className='mt-7 flex gap-5 flex-col lg:flex-row'>

                <div className='w-full'>
                    <div className='w-full h-[85px] bg-black bg-opacity-80 flex items-center justify-between px-2'>
                        <div>
                            <p className='text-white text-sm font-semibold'>Boost your with Promotions & Daily Deals</p>
                        </div>

                        <div>
                            <button className='bg-primary text-sm px-4 py-[2px] rounded text-white'>Apply Now</button>
                        </div>
                    </div>

                    <div className='mt-3 w-full bg-white shadow px-2 py-3'>

                        <p className='text-sm font-bold'>Leadtime Orders</p>
                        <div className="border-t mt-1"></div>

                        <div className='mt-2 space-y-2 w-full text-sm'>
                            <div className='w-full flex items-center justify-between'>
                                <p>New</p>
                                <p className='inline-flex items-center gap-2'> {totalProd} <HiOutlineChevronRight className='h-4 w-4' /></p>
                            </div>

                            <div className='w-full flex items-center justify-between'>
                                <p>Draft Shipment</p>
                                <p className='inline-flex items-center gap-2'> 0 <HiOutlineChevronRight className='h-4 w-4' /></p>
                            </div>

                            <div className='w-full flex items-center justify-between'>
                                <p>Confirmed Shipment</p>
                                <p className='inline-flex items-center gap-2'> {totalShipment}  <HiOutlineChevronRight className='h-4 w-4' /></p>
                            </div>

                            <div className='w-full flex items-center justify-between'>
                                <p>Shipped Shipment</p>
                                <p className='inline-flex items-center gap-2'> 0 <HiOutlineChevronRight className='h-4 w-4' /></p>
                            </div>
                        </div>

                    </div>

                    <div className='mt-3 w-full bg-white shadow px-2 py-3'>

                        <p className='text-sm font-bold'>Recent Communication</p>
                        <div className="border-t mt-1"></div>

                        <div className='mt-2 space-y-2 w-full text-sm'>
                            <p>No communication content here!</p>
                        </div>

                    </div>
                </div>


                <div className='w-full'>
                    <div className='w-full h-[85px] bg-black bg-opacity-80 flex items-center justify-between px-2'>
                        <div>
                            <p className='text-white text-sm font-semibold'>Increase Sales with Sponsored Product Ads</p>
                            <p className='text-white text-xs'>Quickly and easily create ads based on customer searchers</p>
                        </div>

                        <div>
                            <button className='bg-primary text-sm px-4 py-[2px] rounded text-white'>Apply Now</button>
                        </div>
                    </div>

                    <div className='mt-3 w-full bg-white shadow px-2 py-3'>

                        <p className='text-sm font-bold'>Removal Orders</p>
                        <div className="border-t mt-1"></div>

                        <div className='mt-2 space-y-2 w-full text-sm'>

                            <div className='w-full flex items-center justify-between'>
                                <p>Submitted</p>
                                <p className='inline-flex items-center gap-2'> 0 <HiOutlineChevronRight className='h-4 w-4' /></p>
                            </div>

                            <div className='w-full flex items-center justify-between'>
                                <p>Ready for Pickup</p>
                                <p className='inline-flex items-center gap-2'> 0 <HiOutlineChevronRight className='h-4 w-4' /></p>
                            </div>

                            <div className='w-full flex items-center justify-between'>
                                <p>Closed</p>
                                <p className='inline-flex items-center gap-2'> 0 <HiOutlineChevronRight className='h-4 w-4' /></p>
                            </div>
                        </div>

                    </div>


                    <div className='mt-3 w-full bg-white shadow px-2 py-3'>

                        <p className='text-sm font-bold'>Customer Invoice Request</p>
                        <div className="border-t mt-1"></div>

                        <div className='mt-2 space-y-2 w-full text-sm'>
                            <p>No invoice content here!</p>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default DashboardHome;