import React from 'react';
import { HiMiniQuestionMarkCircle, HiShoppingCart } from 'react-icons/hi2';
import { IoIosLock } from 'react-icons/io';
import { Link } from 'react-router-dom';
import deliveryIcon from "../../assets/icons/icon-delivery.svg"
import collectIcon from "../../assets/icons/icon-collect.svg"
import useCart from '../../hooks/useCart';
const DeliveryMethod = () => {
    const [carts, refetch] = useCart();

    const totalPrice =carts.map(cart=>cart.totalPrice);
    console.log(totalPrice)
    const total=totalPrice.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    console.log(total)
    return (
        <section className=''>
            <div className='w-full flex items-center justify-between'>

                <p className='font-medium text-xl text-[#4d4d4f]'>Delivery</p>

                <p className='inline-flex items-center gap-1'><HiShoppingCart className='text-[#ababaf]' /> <Link to="/cart" className='text-xs font-normal text-primary'>Back to Cart</Link></p>

            </div>
           <div className='flex justify-between mt-5'>
          <div className='w-full flex flex-col gap-4 mx-10 '>
          <div className='w-full bg-white px-6 py-4 flex items-center justify-between shadow rounded'>
              <div className='flex gap-4 items-center'>
              <div className=' space-y-1 bg-[#25CD66]  py-3 pr-1 rounded-full'>
                   <img src={deliveryIcon} alt="" className='' />
                </div>
                <div>
                    <h1 className='text-xl font-bold'>Delivery</h1>
                    <p className='text-[#9B9B9B]'>Courier delivery to your door</p>
                </div>
              </div>
                <div className='text-sm font-medium text-primary cursor-pointer'>
                    <Link to="" className='px-10 py-3 border border-blue-500'>Delivery My Order</Link>
                </div>
            </div>
          <div className='w-full bg-white px-6 py-4 flex items-center justify-between shadow rounded'>
              <div className='flex gap-4 items-center'>
              <div className=' space-y-1 bg-[#25CD66]  py-3 pr-1 rounded-full'>
                   <img src={collectIcon} alt="" className='' />
                </div>
                <div>
                    <h1 className='text-xl font-bold'>Collect</h1>
                    <p className='text-[#9B9B9B]'>100+ Takealot Pickup Points nationwide. Open 7 days a week <br />for your convenience.</p>
                </div>
              </div>
                <div className='text-sm font-medium text-primary cursor-pointer'>
                    <Link to="" className='px-10 py-3 border border-blue-500'>Collect My Order</Link>
                </div>
            </div>
          <p></p>
          </div>

            



            <div className='w-[40%] flex flex-col gap-5'>

<div className='bg-white px-4 py-6 rounded shadow'>

    <p className='text-[#4d4d4f] font-medium text-base'>Order Summary</p>

    <div className='w-full pb-3 border-b border-dashed border-[#4d4d4f] mt-3 space-y-1'>
        <div className='w-full flex items-center justify-between'>
            <p className='text-[#4d4d4f] text-xs font-normal'><span>{carts.length}</span> Items</p>

            <p className='text-[#4d4d4f] text-xs font-semibold'>R {total}</p>
        </div>

        <div className='w-full flex items-center justify-between'>
            <p className='text-[#4d4d4f] text-xs font-normal'>Delivery</p>

            <p className='text-[#4d4d4f] text-xs font-semibold'>Free</p>
        </div>
    </div>

    <div className='flex w-full items-center justify-between mt-2 mb-4'>
        <p className='text-[13px] text-[#4d4d4f] font-medium'>TO PAY:</p>

        <p className='font-semibold text-xl text-[#1c8644]'>R {total}</p>
    </div>

    


    <div className='flex flex-col items-center w-full mt-6 text-center'>
       

        <p className='text-sm mt-3 font-semibold inline-flex items-center gap-2'><span><IoIosLock className='h-5 w-5' /></span> <span>Secure Checkout</span></p>
    </div>





</div>



</div>
           </div>




           
        </section>
    );
};

export default DeliveryMethod;