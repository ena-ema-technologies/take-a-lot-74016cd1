import React from 'react';
import { useState } from 'react';
import { FaBuilding, FaDownload, FaTasks } from 'react-icons/fa';
import { HiMiniBell, HiMiniCog, HiMiniCog8Tooth, HiOutlineClipboardDocumentList } from 'react-icons/hi2';
import { IoIosCard, IoIosSend, IoMdBusiness } from 'react-icons/io';
import { IoPeopleCircleOutline, IoPersonCircleOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import useSeller from '../../../hooks/useSeller';
import DashboardHead from '../../../components/DashboardHead/DashboardHead';

const DashboardHome = () => {
    const [sellerInfo, refetch] = useSeller();
    return (
<section className='w-[99%] relative h-full'>
    <nav className='absolute left-0 right-0 top-0'>
        <DashboardHead title="Dashboard"/>
    </nav>

    <div className='flex items-center justify-between mt-16'>
<div>
    <h1 className='text-2xl font-semibold'>Welcome, <span className='text-primary'>{sellerInfo?.companyName}</span></h1>
</div>

<div>
    <p className='text-xs font-semibold'>Your Seller ID: <span>{sellerInfo?._id}</span></p>
</div>
    </div>

    <div className='mt-7 flex items-center gap-5'>
<div className='w-full h-[85px] bg-black bg-opacity-80 flex items-center justify-between px-2'>
<div> 
    <p className='text-white text-sm font-semibold'>Boost your with Promotions & Daily Deals</p>
</div>

<div>
    <button className='bg-primary text-sm px-4 py-[2px] rounded text-white'>Apply Now</button>
</div>
</div>

<div className='w-full h-[85px] bg-black bg-opacity-80 flex items-center justify-between px-2'>
<div> 
    <p className='text-white text-sm font-semibold'>Increase Sales with Sponsored Product Ads</p>
    <p className='text-white text-xs'>Quickly and easily create ads based on customer searchers</p>
</div>

<div>
    <button className='bg-primary text-sm px-4 py-[2px] rounded text-white'>Apply Now</button>
</div>
</div>
    </div>
</section>
    );
};

export default DashboardHome;