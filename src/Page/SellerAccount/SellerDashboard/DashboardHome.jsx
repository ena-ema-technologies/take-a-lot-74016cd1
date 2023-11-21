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

    return (
<section className='w-full relative h-full'>
    <nav className='absolute left-0 right-0 top-4'>
        <DashboardHead title="Dashboard"/>
    </nav>
</section>
    );
};

export default DashboardHome;