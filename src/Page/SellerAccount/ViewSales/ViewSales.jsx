import React from 'react';
import DashboardHead from '../../../components/DashboardHead/DashboardHead';

const ViewSales = () => {
    return (
<section className='w-[99%] relative h-full'>
    <nav className='absolute left-0 right-0 top-0'>
        <DashboardHead title="View Sales"/>
    </nav>

    <div className='my-16 flex w-[90%] items-center justify-between px-3'>
<button className='bg-neutral px-2 py-1 text-white text-xs rounded'>Export Sales Details</button>
<button className='bg-neutral px-2 py-1 text-white text-xs rounded'>Clear all Filters</button>
    </div>


    <div className='border mt-6 py-3 px-2 w-[95%] bg-white'>

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
        <th>Order Date</th>
        <th>Sale Status</th>
        <th>Order ID</th>
        <th>Product Title</th>
        <th>SKU</th>
        <th>TSIN</th>
        <th>Qty</th>
        <th>DC</th>
        <th>Gross Sale</th>
        <th>Total Fees (Incl. VAT)</th>
        <th>Net Sales</th>
        <th>Shipment Details</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      <tr>
        <td>Null</td>
        <td>
          Null
        </td>
        <td>
          Null
        </td>
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
</section>
    );
};

export default ViewSales;