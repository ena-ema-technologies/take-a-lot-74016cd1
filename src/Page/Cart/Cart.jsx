import React from 'react';
import { Link } from 'react-router-dom';
import useCart from '../../hooks/useCart';
import { FaTrash,FaHeart } from "react-icons/fa";
const Cart = () => {
    const [carts, refetch] = useCart();
    console.log(carts)
    return (
       <section className='lg:px-5'>
        
      {
        carts.length==0?  <div className='my-5'>
        <h1 className='text-xl text-[#4d4d4f] font-semibold px-5 lg:px-0'>Shopping Cart</h1>

        <div className='my-5 bg-white rounded shadow py-7 hero flex flex-col items-center gap-5'>

<div className='px-2 py-2 shadow rounded-full bg-white'>
<img src="https://shopfront.takealot.com/b317a38ffe915f6034dfee91ccee142cabe5ca77/static/media/src/images/cart/empty-cart.svg-a3f63604a3d49f7b220a.svg" alt="cart" className='rounded-full'/>
</div>

<p className='text-[#000]'>Your shopping cart is empty</p>

<Link className='py-2 px-5 rounded-3xl lg:rounded bg-primary text-white font-medium'>Continue Shopping</Link>


        </div>
    </div>:<></>
      }
      <div className='mx-10 grid grid-cols-4 mt-5 '>
        <div className='col-span-3 border '>
        <h1 className='font-semibold text-sm ps-10 py-5 bg-white'>Shipped from Takealot Warehouse</h1>
            <div className='w-full p-[1px] bg-black'></div>
        {
            carts.map(carts=>
            <>
            
           <div className='flex justify-between items-center bg-white mt-2'>
           <div className='flex gap-2'>
                <img className='w-60 ' src={carts.productImage} alt="" />
                <div className='mt-7'>
                    <h1>{carts.productName}</h1>
                    <div className='flex items-center gap-2'>
                        <button className='font-bold'>InStock</button>
                    <button className='p-[1px] bg-slate-400 rounded text-xs text-white font-bold'>CPT</button>
                    <button className='p-[1px] bg-slate-400 rounded text-xs text-white font-bold'>JHB</button> 
                    </div>
                   
                </div>
                
            </div>
           
            <div className='mr-5'>
               <h1 className='text-xl font-bold text-right'>R {carts.totalPrice}</h1>
               <div className='flex justify-end items-center'>
                  <label htmlFor="1">Qty:</label>
               <select defaultValue={carts.quantity} name="quantity" id="" className='p-2 border-b-4 mt-2 '>
                <option value={carts.quantity}>{carts.quantity}</option>
                <option value="1">2</option>
                <option value="1">3</option>
                <option value="1">4</option>
               </select>
               </div>
             
               <div className='mt-8 flex gap-4 text-sm text-[#828283]'>
                <button className='px-2 py-[1px] hover:bg-[#F4F4F4] flex gap-2 items-center'><FaTrash></FaTrash> Remove</button>
                <button className='px-2 py-[1px] hover:bg-[#F4F4F4] flex gap-2 items-center'><FaHeart className='hover:text-red-500'/> Move To List</button>
               </div>
            </div>
           </div></>
    
       )
        }
 </div>
         {/* cart summary */}
        <div className='p-3'>

        <h1 className='font-bold text-slate-500'>Cart Summary</h1>
        </div>

    </div>

       </section>
    );
};

export default Cart;