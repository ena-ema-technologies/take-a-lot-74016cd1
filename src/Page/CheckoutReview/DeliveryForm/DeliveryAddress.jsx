import React from 'react';
import useCart from '../../../hooks/useCart';
import { HiShoppingCart } from 'react-icons/hi2';
import { Link } from 'react-router-dom';
import { IoIosLock } from 'react-icons/io';

const DeliveryAddress = () => {

    const [carts, refetch] = useCart();

    const totalPrice =carts.map(cart=>cart.totalPrice);
    console.log(totalPrice)
    const total=totalPrice.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    console.log(total)
    return (
        <section className=''>
        <div className='w-full flex items-center mx-2 justify-between'>

            <p className='font-medium text-xl text-[#4d4d4f]'>Delivery</p>

            <p className='inline-flex items-center gap-1'><HiShoppingCart className='text-[#ababaf]' /> <Link to="/cart" className='text-xs font-normal text-primary'>Back to Cart</Link></p>

        </div>
       <div className='md:flex md:justify-between mt-5'>


      <div className='w-full bg-white md:mx-10 p-5  '>
     {/* todo:Make a form */}
      <h1 className='font-bold'>Add New Address</h1>
      <div className='flex w-full gap-2 mt-8'>
        <div className='flex w-full gap-2 p-4 rounded bg-[#F4F4F4]'>
            <input type="radio" />
            <p>Residential</p>
        </div>
        <div className='flex w-full gap-2 p-4 rounded bg-[#F4F4F4]'>
            <input type="radio" />
            <p>Residential</p>
        </div>
      </div>
      <div>
        <input className='w-full mt-7 pt-3 px-2 border-b-2 hover:bg-[#F4F4F4]' type="text" placeholder='Recipient Name' />
      </div>
      <div>
        <input className='w-full mt-7 pt-3 px-2 border-b-2 hover:bg-[#F4F4F4]' type="text" placeholder='Recipient Mobile Number' />
      </div>
      <div>
        <input className='w-full mt-7 pt-3 px-2 border-b-2 hover:bg-[#F4F4F4]' type="text" placeholder='Street Address' />
      </div>
      <div>
        <input className='w-full mt-7 pt-3 px-2 border-b-2 hover:bg-[#F4F4F4]' type="text" placeholder='Complex / Building (Optional)' />
      </div>
      <div>
        <input className='w-full mt-7 pt-3 px-2 border-b-2 hover:bg-[#F4F4F4]' type="text" placeholder='Suburb' />
      </div>
      <div>
        <input className='w-full mt-7 pt-3 px-2 border-b-2 hover:bg-[#F4F4F4]' type="text" placeholder='City / Town' />
      </div>
      <div>
       <select className='w-[30%] mt-7 pt-3 px-2 border-b-2 hover:bg-[#F4F4F4]' name="" id="">
        <option value="">Province</option>
        <option value="">Province</option>
        <option value="">Province</option>
        <option value="">Province</option>
        <option value="">Province</option>
       </select>
      </div>
      <div>
        <input className=' mt-7 pt-3 px-2 border-b-2 hover:bg-[#F4F4F4]' type="number" placeholder='Postal code' />
      </div>
      <div className='flex justify-end gap-3'>
        <button className='px-10 py-2 border-black border hover:bg-[#4D4D4F] hover:text-white'>Cancel</button>
        <button className='px-10 py-2 bg-[#0967A2] text-white'>Save Address</button>
      </div>
      </div>

        



      <div className='md:w-[40%] w-full flex flex-col gap-5'>

<div className='bg-white  py-6 rounded shadow'>

    <p className='text-[#4d4d4f] px-4 font-medium text-base'>Order Summary</p>

    <div className='w-full pb-3 px-4 border-b border-dashed border-[#4d4d4f] mt-3 space-y-1'>
        <div className='w-full flex items-center justify-between'>
            <p className='text-[#4d4d4f] text-xs font-normal'><span>{carts.length}</span> Items</p>

            <p className='text-[#4d4d4f] text-xs font-semibold'>R {total}</p>
        </div>

        <div className='w-full flex items-center justify-between'>
            <p className='text-[#4d4d4f] text-xs font-normal'>Delivery</p>

            <p className='text-[#4d4d4f] text-xs font-semibold'>Free</p>
        </div>
    </div>

    <div className='flex px-4 w-full items-center justify-between mt-2 mb-4'>
        <p className='text-[13px] text-[#4d4d4f] font-medium'>TO PAY:</p>

        <p className='font-semibold text-xl text-[#1c8644]'>R {total}</p>
    </div>




    <div className='flex px-4 flex-col items-center w-full mt-6 text-center'>


        <p className='text-sm px-4 pb-4 mt-3 font-semibold inline-flex items-center gap-2'><span><IoIosLock className='h-5 w-5' /></span> <span>Secure Checkout</span></p>
    </div>
    <div className='bg-[#F5F5F5] h-4 w-full'></div>
    <div className='bg-white mt-2 px-4 pt-2'>
        <h1 className='text-lg font-semibold text-[#969697]'>Order Review</h1>
        <div className='flex justify-between items-start mt-4'>
            <div className=' '>
                <h1 className='font-bold'>Delivery Method</h1>
                <p className='text-sm text-[#969697]'>Collect</p>
            </div>
            <h1 className='text-sm text-[#5dabdb]'>Change</h1>
        </div>
    </div>





</div>



</div>
       </div>




       
    </section>
    );
};

export default DeliveryAddress;