import React from 'react';
import DashboardHead from '../../../components/DashboardHead/DashboardHead';
import { useState } from 'react';
import { HiMiniArrowTopRightOnSquare } from 'react-icons/hi2';
import { HiOutlineDownload } from 'react-icons/hi';
import { IoSearchOutline } from 'react-icons/io5';

const CustomerInvoiceRequest = () => {
    const [tabName, setTabName] = useState("Open");
    return (
<section className='w-[99%] relative h-full'>
    <nav className='absolute left-0 right-0 top-0'>
        <DashboardHead title="Customer Invoice Request"/>
    </nav>


    <div className='flex overflow-auto lg:overflow-hidden w-full lg:w-[99%] mx-auto items-center justify-start text-sm text-neutral border-t border-l border-r mt-16'>

<div onClick={()=>setTabName("Open")} className={`px-10 py-3 cursor-pointer inline-flex items-center gap-1 ${tabName === "Open" ? "bg-white border-t-2 border-t-primary text-primary" : ""}`}>Open</div>

<div onClick={()=>setTabName("Close")} className={`px-10 py-3 cursor-pointer inline-flex items-center gap-1 ${tabName === "Close" ? "bg-white border-t-2 border-t-primary text-primary" : ""}`}>Close</div>
</div>

{
    tabName === "Open" 
    ?
    <div className='w-full lg:w-[99%] mx-auto h-full bg-white'>


<div className='w-full flex items-center justify-between'>


</div>

<div className='border mt-6 py-3 px-2 w-full'>

<div className='w-full items-center justify-between'>
<div className='w-full inline-flex items-center gap-2 text-xs font-medium'>
<label>Show</label>
<select id="selectOption" name="selectOption" className='px-2 py-1 text-sm border rounded'>
        <option value="10">10</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
    </select>
    <span>per page</span>
</div>
</div>

<div className="overflow-x-auto mt-5 w-[99%] mx-auto">
  <table className="table text-xs">
    {/* head */}
    <thead>
      <tr>
        <th>Request Number</th>
        <th>Request Date</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      <tr>
        <td>Null</td>
        <td>Null</td>
        <td>Null</td>
      </tr>
    </tbody>
    
  </table>
</div>
</div>
</div> : 
    <div className='w-full lg:w-[99%] mx-auto h-full bg-white'>


    <div className='w-full flex items-center justify-between'>
    
    
    </div>
    
    <div className='border mt-6 py-3 px-2 w-full'>
    
    <div className='w-full items-center justify-between'>
    <div className='w-full inline-flex items-center gap-2 text-xs font-medium'>
    <label>Show</label>
    <select id="selectOption" name="selectOption" className='px-2 py-1 text-sm border rounded'>
            <option value="10">10</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
        </select>
        <span>per page</span>
    </div>
    </div>
    
    <div className="overflow-x-auto mt-5 w-[99%] mx-auto">
      <table className="table text-xs">
        {/* head */}
        <thead>
          <tr>
            <th>Request Number</th>
            <th>Request Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          <tr>
            <td>Null</td>
            <td>Null</td>
            <td>Null</td>
          </tr>
        </tbody>
        
      </table>
    </div>
    </div>
    </div>
}

</section>
    );
};

export default CustomerInvoiceRequest;