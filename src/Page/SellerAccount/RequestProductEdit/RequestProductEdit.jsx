import React from 'react';
import { FaCloudDownloadAlt } from 'react-icons/fa';
import { HiPencilSquare } from 'react-icons/hi2';
import { IoIosSave } from 'react-icons/io';
import { IoDocumentText } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const RequestProductEdit = () => {
    return (
<section className='absolute top-0 left-0 p-6'>
<h1 className='text-lg font-bold'>Request Product Edit</h1>
<p className='text-sm font-medium'>If you have existing product listing you would like to edit, you may send through a request for review.</p>


<div className='my-12'>
<p className='text-sm font-bold'>Single Product Edit</p>

<div className='px-5 py-5 bg-white shadow rounded w-full mt-2 flex items-center gap-8'>
<p><HiPencilSquare className='h-10 w-10'/></p>
<p className='text-sm'>You can submitted single product Edits from the <Link className='text-primary underline'>Manage My Offers page</Link> found in the Action menu</p>
</div>
</div>

<div className='my-12'>
<p className='text-sm font-bold'>Bulk Product Edit</p>

<div className='px-5 py-5 bg-white shadow rounded w-full mt-2 flex items-center gap-8 mb-4'>
<p><IoDocumentText className='h-10 w-10'/></p>

<div>
<p className='text-xs font-semibold mb-1'>1. Download and complete the product edit request template</p>
<p className='text-xs mb-1'>Click the Download Template button to download a blank product edit request template.</p>
<p className='text-xs'>Ensure you have read the instruction within the template avoid submission rejection.</p>
</div>
</div>

<div className='px-5 py-5 bg-white shadow rounded w-full mt-2 flex items-center gap-8 mb-4'>
<p><IoIosSave className='h-10 w-10'/></p>
<div>
<p className='text-xs font-semibold mb-1'>2. Save the complete file in .xlsx formate </p>
<p className='text-xs mb-1'>Use the following naming conversion: Your Seller-Your Seller ID - Edit Request - Request Date</p>
<p className='text-xs'>Ensure you have read the instruction within the template avoid submission rejection.</p>
</div>
</div>

<div className='px-5 py-5 bg-white shadow rounded w-full mt-2 flex items-center gap-8'>
<p><FaCloudDownloadAlt  className='h-10 w-10'/></p>
<div>
<p className='text-xs font-semibold mb-1'>3. Complete the upload form </p>
<p className='text-xs mb-1'>Click the Fill out form button to complete your product request.</p>
<p className='text-xs'>This will take you to an external form where you will need to upload your complete template.</p>
</div>
</div>
</div>
</section>
    );
};

export default RequestProductEdit;