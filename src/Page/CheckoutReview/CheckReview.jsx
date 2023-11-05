import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { HiInformationCircle, HiMiniQuestionMarkCircle, HiMiniXMark, HiShoppingCart } from 'react-icons/hi2';
import { IoIosLock } from 'react-icons/io';
import { Link } from 'react-router-dom';

const CheckReview = () => {

    const [bucksMethod,setBucksMethod] = useState("sa_id");
    const [bucksNumber, setBucksNumber] = useState("")
    const [couponCode, setCouponCode] = useState("");
    const [donate, setDonate] = useState(false)
    const { register, formState: { errors }, handleSubmit } = useForm();

    
      const onSubmit = (data) => {
        // Handle the form submission here
      };
    return (
       <section className='flex flex-col items-center justify-center px-5 lg:px-16'>
<div className='w-full flex items-center justify-between'>

<p className='font-medium text-xl text-[#4d4d4f]'>Review your order</p>

<p className='inline-flex items-center gap-1'><HiShoppingCart className='text-[#ababaf]'/> <Link to="/cart" className='text-xs font-normal text-primary'>Back to Cart</Link></p>

</div>

<div className='w-full flex flex-col lg:flex-row items-start gap-10 mt-8'>

<div className='w-full space-y-4'>

<div className='w-full bg-white p-6 flex items-start justify-between shadow rounded'>
<div className='w-full space-y-1'>
<p className='text-[#4d4d4f] font-medium text-[12px]'>Delivery Method</p>
<p className='text-[#0a0a0a] font-bold text-lg'>Collect</p>
</div>
<div className='text-sm font-medium text-primary cursor-pointer'>
    <Link to="/buy/delivery/method">Change</Link>
</div>
</div>

<div className='w-full bg-white p-6 flex items-start justify-between shadow rounded'>
<div className='w-full space-y-1'>
<p className='text-[#4d4d4f] font-medium text-[12px]'>Pickup Point</p>
<p className='text-[#0a0a0a] font-bold text-lg'>Chiselhurst Pickup Point</p>
<p className='text-[#4d4d4f] font-medium text-[12px]'>28 Manchester Road</p>
<p className='text-[#4d4d4f] font-medium text-[12px]'>Chiselhurst, East London, 5247</p>
</div>

<div className='text-sm font-medium text-primary cursor-pointer'>
    <p>Change</p>
</div>
</div>


<div className='w-full bg-white p-6 flex items-start justify-between shadow rounded'>
<div className='w-full space-y-1'>
<p className='text-[#4d4d4f] font-medium text-[12px]'>Collect from</p>
<p className='text-[#0a0a0a] font-bold text-lg'>Wednesday, 08 November 2023</p>
<p className='text-[#4d4d4f] font-medium text-[12px]'>Standard Collect (First Collect Free) : Free</p>

</div>
</div>


<div className='w-full bg-white p-6 flex items-start justify-between shadow rounded'>
<div className='w-full space-y-1'>
<p className='text-[#4d4d4f] font-medium text-[12px]'>Payment Method</p>
<p className='text-[#0a0a0a] font-bold text-lg inline-flex items-center gap-2'>Credit & Debit Card<label htmlFor="my_modal_6"><span className='text-[#939396]'><HiInformationCircle /></span></label>
 </p>
<p className='text-[#4d4d4f] font-medium text-[12px]'>28 Manchester Road</p>
<p className='text-[#4d4d4f] font-medium text-[12px]'>Chiselhurst, East London, 5247</p>
</div>

<div className='text-sm font-medium text-primary cursor-pointer'>
    <p>Change</p>
</div>
</div>


<div className='w-full bg-white p-6 flex flex-col items-start justify-between shadow rounded'>

<div tabIndex={0} className="collapse collapse-arrow  w-full border-b gray-500 rounded-none">
<input type="checkbox" />
<div className="collapse-title font-medium text-sm text-primary">
Add Gift Voucher or Coupon Code
</div>
<div className="collapse-content bg-white text-sm w-full">
  <div className='p-3 w-full'>
  <form onSubmit={handleSubmit(onSubmit)} className='flex w-full items-start gap-4'>
  <div className="inputGroup w-full">  


<input onKeyUp={(e)=>setCouponCode(e.target.value)} type="text" required className='inputField' {...register("couponCode", { required: true })}
aria-invalid={errors.couponCode ? "true" : "false"}/>
<span className="highlight"></span>
<span className="bar"></span>
<label className='inputLabel'>Enter Code

</label>

{errors.couponCode?.type === 'required' && <p role="alert" className='text-error font-medium text-xs'>Please enter a voucher or coupon code</p>}
</div>

<div className={`w-[20%]`}>
    <button className='px-10 py-2 rounded  text-center text-white font-semibold bg-primary disabled:opacity-30 disabled:cursor-not-allowed' disabled={couponCode === "" ? true : false}>Apply</button>
</div>
    </form>
  </div>

</div>
</div>

<div tabIndex={0} className="collapse collapse-arrow  w-full">
<input type="checkbox" />
<div className="collapse-title font-semibold text-sm text-primary inline-flex items-center gap-4">
<p>Earn eBucks</p>
<img src="https://static.takealot.com/images/checkout/payment/Ebucks.svg" alt="" />
</div>
<div className="collapse-content bg-white text-sm">
  <div className=''>
  <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col space-y-10 w-full'>

  <div className='w-full items-center gap-5 flex flex-col lg:flex-row'>

<label className='w-full px-6 flex items-center bg-gray-100 py-4 shadow'>
<input onClick={()=>setBucksMethod("sa_id")} type="radio" name="radio-2" defaultChecked={bucksMethod === "sa_id" ? true : false} {...register("sa_id")} value="SA Id" className="radio radio-primary" />
<span className='text-sm'>SA ID</span>
</label>

<label className='w-full px-6 flex items-center bg-gray-100 py-4 shadow'>
<input onClick={()=>setBucksMethod("passport")} type="radio" name="radio-2" defaultChecked={ bucksMethod === "passport" ? true : false} {...register("passport")} value="passport" className="radio radio-primary" />
<span className='text-sm'>Passport</span>
</label>




</div>

<div className='w-full flex items-start gap-4'>
<div className="inputGroup w-full">  


<input onKeyUp={(e)=>setBucksNumber(e.target.value)} type="text" required className='inputField' {...register(`${bucksMethod === "sa_id" ? "Sa_Id" : "passport"}`, { required: true })}
aria-invalid={errors.bucksMethod ? "true" : "false"}/>
<span className="highlight"></span>
<span className="bar"></span>
<label className='inputLabel'>{bucksMethod === "sa_id" ? "SA ID Number" : "Passport"}

</label>

{errors.couponCode?.type === 'required' && <p role="alert" className='text-error font-medium text-xs'>Please enter a voucher or coupon code</p>}
</div>

<div className={`w-[30%]`}>
    <button className='px-10 py-2 rounded  text-center text-white font-semibold bg-primary disabled:opacity-30 disabled:cursor-not-allowed whitespace-nowrap' disabled={bucksNumber === "" ? true : false}>Earn eBucks</button>
</div>
</div>

  </form>
  </div>

</div>
</div>

</div>



</div>

<div className='w-[40%] flex flex-col gap-5'>

<div className='bg-white px-4 py-6 rounded shadow'>

<p className='text-[#4d4d4f] font-medium text-base'>Order Summary</p>

<div className='w-full pb-3 border-b border-dashed border-[#4d4d4f] mt-3 space-y-1'>
<div className='w-full flex items-center justify-between'>
<p className='text-[#4d4d4f] text-xs font-normal'><span>0</span> Items</p>

<p className='text-[#4d4d4f] text-xs font-semibold'>R 000</p>
</div>

<div className='w-full flex items-center justify-between'>
<p className='text-[#4d4d4f] text-xs font-normal'>Delivery</p>

<p className='text-[#4d4d4f] text-xs font-semibold'>Free</p>
</div>
</div>

<div className='flex w-full items-center justify-between mt-2 mb-4'>
<p className='text-[13px] text-[#4d4d4f] font-medium'>TO PAY:</p>

<p className='font-semibold text-xl text-[#1c8644]'>R 000</p>
</div>

<label className='w-full px-6 flex items-center bg-gray-100 py-4 shadow mt-6'>
<input onClick={()=>setDonate(true)} type="radio" name="radio-2" defaultChecked={donate && true} {...register("donate")} value="donate" className="radio radio-primary" />
<span className='text-[13px]'>Donate R 5 to Beautiful Gate Children's Charity</span>
<p className="tooltip" data-tip="Beautiful Gate South Africa is a registered non-profit organisation providing care and support to vulnerable children and families."><HiMiniQuestionMarkCircle className='text-green-600'/></p>

</label>


<div className='flex flex-col items-center w-full mt-6 text-center'>
<Link className='w-full bg-green-700 text-sm py-3 font-semibold text-white'>PAY WITH CARD</Link>

<p className='text-sm mt-3 font-semibold inline-flex items-center gap-2'><span><IoIosLock className='h-5 w-5'/></span> <span>Secure Checkout</span></p>
</div>





</div>

<div className='bg-white px-4 py-6 rounded shadow'>
<div className='flex items-center w-full justify-between'>
<p className='text-[#000] text-sm font-semibold'>Items for collection</p>

<p className='text-sm text-primary'>Show Details</p>
</div>
</div>

</div>


</div>


<input type="checkbox" id="my_modal_6" className="modal-toggle" />
<div className="modal">
  <div className="modal-box overflow-hidden rounded-md text-center w-96">
    <h3 className="font-bold text-lg text-[#0a0a0a]">Credit & Debit Card</h3>
    <p className="py-4 text-sm">We accept all major credit cards including VISA, MasterCard, Diners Club and American Express. VISA and MasterCard debit and cheque cards are also supported. We don’t currently accept Maestro or VISA Electron cards.</p>
    <div className="modal-action cursor-pointer ">
      <label htmlFor="my_modal_6" className="cursor-pointer"><HiMiniXMark className='h-7 w-7 absolute top-2 right-2' /></label>
    </div>

    <div className="modal-action items-center justify-center">
      <label htmlFor="my_modal_6" className="cursor-pointer px-14 py-2 text-white text-sm font-semibold bg-primary rounded">Got it, thanks!</label>
    </div>
  </div>
</div>


       </section>
    );
};

export default CheckReview;