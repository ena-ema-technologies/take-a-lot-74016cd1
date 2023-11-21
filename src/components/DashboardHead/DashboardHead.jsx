import React from 'react';
import useSeller from '../../hooks/useSeller';
import { FaDownload, FaTasks } from 'react-icons/fa';
import { HiHome, HiMiniBell, HiMiniCog8Tooth } from 'react-icons/hi2';
import { Link } from 'react-router-dom';

const DashboardHead = ({title}) => {
    const [sellerInfo, refetch] = useSeller();
    
    return (
<div className='flex flex-col lg:flex-row w-full items-center justify-between bg-white text-sm lg:w-[99%] mx-auto px-2 py-4'>

<div className='w-full flex items-center gap-3'>
<span><FaTasks /> </span> 
<span className='inline-flex items-center gap-1 font-semibold'><HiHome /> {title}</span> 
<span> For {sellerInfo?.companyName} ({sellerInfo?._id})</span>
</div>

<div className='w-full flex items-center gap-4 justify-end'>
<p><HiMiniBell className='h-5 w-4'/></p>
<p><FaDownload className='h-5 w-4'/></p>
<Link to="/" className='bg-primary text-white rounded-full p-1 text-xs'>TK</Link>
</div>

</div>   
    );
};

export default DashboardHead;