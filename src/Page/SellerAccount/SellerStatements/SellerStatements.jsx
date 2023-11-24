import React from 'react';
import DashboardHead from '../../../components/DashboardHead/DashboardHead';
import { useState } from 'react';
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { CiWallet } from "react-icons/ci";
import { PiTimer } from "react-icons/pi";

const SellerStatements = () => {
    const [tabName, setTabName] = useState("Statements");
    return (
<section className='w-[99%] relative h-full'>
    <nav className='absolute left-0 right-0 top-0'>
        <DashboardHead title="Accounting"/>
    </nav>


    <div className='flex overflow-auto lg:overflow-hidden w-full lg:w-[99%] mx-auto items-center justify-start text-sm text-neutral border-t border-l border-r mt-16'>

<div onClick={()=>setTabName("Transaction")} className={`px-10 py-3 cursor-pointer inline-flex items-center gap-1 ${tabName === "Transaction" ? "bg-white border-t-2 border-t-primary text-primary" : ""}`}>Transaction</div>

<div onClick={()=>setTabName("Invoice")} className={`px-10 py-3 cursor-pointer inline-flex items-center gap-1 ${tabName === "Invoice" ? "bg-white border-t-2 border-t-primary text-primary" : ""}`}>Invoice</div>

<div onClick={()=>setTabName("Statements")} className={`px-10 py-3 cursor-pointer inline-flex items-center gap-1 ${tabName === "Statements" ? "bg-white border-t-2 border-t-primary text-primary" : ""}`}>Statements</div>
</div>

{
    tabName === "Transaction" 
    ?
    <div className='w-full lg:w-[99%] mx-auto h-full bg-white'>


<div className='w-full flex items-center justify-between'>


</div>

<div className='mt-6 py-3 px-2 w-full'>

<div className='my-10 grid grid-cols-1 lg:grid-cols-3 gap-6 w-full'>

<div className='border px-4 py-3 rounded shadow w-full flex items-center justify-between'>

<div>
<p className='text-xs font-medium text-gray-400'>Current Balance</p>
<h3 className='mt-2 text-base font-bold'>R 100,000.32</h3>
</div>

<div>
<RiMoneyDollarCircleLine className='w-10 h-10'/>
</div>

</div>

<div className='border px-4 py-3 rounded shadow w-full flex items-center justify-between'>

<div>
<p className='text-xs font-medium text-gray-400'>Pending</p>
<h3 className='mt-2 text-base font-bold'>R 100,000.32</h3>
</div>

<div>
<PiTimer className='w-10 h-10'/>
</div>

</div>

<div className='border px-4 py-3 rounded shadow w-full flex items-center justify-between'>

<div>
<p className='text-xs font-medium text-gray-400'>Available Balance</p>
<h3 className='mt-2 text-base font-bold'>R 100,000.32</h3>
</div>

<div>
<CiWallet className='w-10 h-10'/>
</div>

</div>

</div>

<div className='my-5 w-full flex items-end justify-end'>
<p className='text-sm text-primary'>Download your transaction using the Account Transactions report</p>
</div>

<div className='w-full items-center justify-between border-t pt-4'>
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
        <th>Transaction Date</th>
        <th>Transaction Type</th>
        <th>Transaction ID</th>
        <th>Transaction Description</th>
        <th>Reference</th>
        <th>Amount (Incl VAT)</th>
        <th>VAT</th>
        <th>Balance</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      <tr>
        <td>Null</td>
        <td>Null</td>
        <td>Null</td>
        <td>Null</td>
        <td>Null</td>
        <td>Null</td>
        <td>Null</td>
        <td>Null</td>
      </tr>
    </tbody>
    
  </table>
</div>
</div>
</div> : tabName === "Invoice" ?
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
            <th>Date Created</th>
            <th>Status</th>
            <th>Date From</th>
            <th>Date To</th>
            <th>Download</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          <tr>
            <td>Null</td>
            <td>Null</td>
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
            <th>Date Created</th>
            <th>Status</th>
            <th>Date From</th>
            <th>Date To</th>
            <th>Download</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          <tr>
            <td>Null</td>
            <td>Null</td>
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

export default SellerStatements;