import React, { useContext } from 'react';
import useCart from '../../../hooks/useCart';
import { HiShoppingCart } from 'react-icons/hi2';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosLock } from 'react-icons/io';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { UserAuth } from '../../../Auth/Auth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useProfile from '../../../hooks/useProfile';

const DeliveryAddress = () => {
  const [axiosSecure] = useAxiosSecure();
  const [userInfo, refetch] = useProfile();
  const { register, formState: { errors }, handleSubmit } = useForm();
  const [labelShow3, setLabelShow3] = useState(false);
  const [addressBanner , setAddressBanner] = useState(true);
  const [disabledBtn,setDisabledBtn]=useState(false)
  const navigate =useNavigate()
  const onSubmit = async (data) => {

    setDisabledBtn(true)
      const newData ={
          complexOrBuilding: data?.Complex_Building,
          mobile_Number: data?.Mobile_Number,
          postal_Code: data?.Postal_Code,
          province: data?.Province,
recipient_Name: data?.Recipient_Name,
street_Address: data?.Street_Address,
suburb: data?.Suburb,
address_type: data?.address_type_business ? data?.address_type_business : data?.address_type_residential,
city_town: data?.city_town
      }
          const res = await axiosSecure.patch(`/user-address-book/${userInfo?._id}`, newData)
              if(res.data.modifiedCount > 0){
                  Swal.fire({
                      title: 'Success!',
                      text: 'Address book updated!',
                      icon: 'success',
                      confirmButtonText: 'Cool'
                    })
                    refetch();
              }


      // console.log(newData);
  }
    
    
    const [carts] = useCart();
    
    const totalPrice =carts.map(cart=>cart.totalPrice);
    // console.log(totalPrice)
    const total=totalPrice.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    // console.log(total)

   const continueHandler=()=>{
    navigate("/buy/review")
   }
    return (
        <section className=''>
        <div className='w-full flex items-center mx-2 justify-between'>

            <div className='flex gap-2 font-medium text-xl'>
            <p className='font-medium text-xl text-[#4d4d4f]'>Delivery</p>
            <p className='text-[#c0bdbd] font-medium text-xl'>/</p>
            <p className='text-[#c0bdbd]'>Payment</p>
            <p className='text-[#c0bdbd]'>/</p>
            <p className='text-[#c0bdbd]'>Confimation</p>
            </div>

            <p className='inline-flex items-center gap-1'><HiShoppingCart className='text-[#ababaf]' /> <Link to="/cart" className='text-xs font-normal text-primary'>Back to Cart</Link></p>

        </div>
       <div className='md:flex md:justify-between mt-5'>



{/* form */}
<div className=' w-full bg-white md:mx-10 p-5 relative '>
<div className='my-6 bg-white rounded shadow px-6 pt-6 pb-20 relative'>
<p className='text-[#000] text-base font-semibold mb-4'>Add New Address</p>

<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col space-y-10 w-full'>


<div className='w-full items-center gap-5 flex flex-col lg:flex-row'>

<label className='w-full px-6 flex items-center bg-gray-100 py-4 shadow'>
<input type="radio" name="radio-2" defaultChecked={userInfo?.address_type === "residential" ? true : false} {...register("address_type_residential")} value="residential" className="radio radio-primary" />
<span className='text-sm'>Residential</span>
</label>

<label className='w-full px-6 flex items-center bg-gray-100 py-4 shadow'>
<input type="radio" name="radio-2" defaultChecked={userInfo?.address_type === "business" ? true : false} {...register("address_type_business")} value="business" className="radio radio-primary" />
<span className='text-sm'>Business</span>
</label>




</div>

<div className="inputGroup">  


      <input type="text" required className='inputField' defaultValue={userInfo?.recipient_Name ? userInfo?.recipient_Name : ""} {...register("Recipient_Name", { required: true })}
aria-invalid={errors.Recipient_Name ? "true" : "false"}/>
      <span className="highlight"></span>
      <span className="bar"></span>
      <label className='inputLabel'>Recipient Name</label>

      {errors.Recipient_Name?.type === 'required' && <p role="alert" className='text-error font-medium text-xs'>Please enter the recipient's name</p>}
    </div>

    <div className="inputGroup">  


<input type="text" required className='inputField' defaultValue={userInfo?.mobile_Number ? userInfo?.mobile_Number : ""} {...register("Mobile_Number", { required: true })}
aria-invalid={errors.Mobile_Number ? "true" : "false"}/>
<span className="highlight"></span>
<span className="bar"></span>
<label className='inputLabel'>Recipient Mobile Number</label>

{errors.Mobile_Number?.type === 'required' && <p role="alert" className='text-error font-medium text-xs'>Please enter a valid mobile number</p>}
</div>


<div className="inputGroup">  


<input type="text" required className='inputField' defaultValue={userInfo?.street_Address ? userInfo?.street_Address : ""} {...register("Street_Address", { required: true })}
aria-invalid={errors.Street_Address ? "true" : "false"}/>
<span className="highlight"></span>
<span className="bar"></span>
<label className='inputLabel'>Street Address
</label>

{errors.Street_Address?.type === 'required' && <p role="alert" className='text-error font-medium text-xs'>Please enter the street address</p>}
<p className="label-text  text-xs font-medium text-gray-500 mt-1">Eg. 12 Ridge Street</p>
</div>


<div className="inputGroup">  


<input type="text" required className='inputField' defaultValue={userInfo?.complexOrBuilding ? userInfo?.complexOrBuilding : ""} {...register("Complex_Building", { required: true })}
aria-invalid={errors.Complex_Building ? "true" : "false"}/>
<span className="highlight"></span>
<span className="bar"></span>
<label className='inputLabel'>Complex / Building <small>(Optional)</small>
</label>

{errors.Complex_Building?.type === 'required' && <p role="alert" className='text-error font-medium text-xs'>Please enter the Complex / Building</p>}
<p className="label-text text-xs font-medium text-gray-500 mt-1">Complex or Building Name, unit number or floor</p>
</div>


<div className="inputGroup">  


<input type="text" required className='inputField' defaultValue={userInfo?.suburb ? userInfo?.suburb : ""} {...register("Suburb", { required: true })}
aria-invalid={errors.Suburb ? "true" : "false"}/>
<span className="highlight"></span>
<span className="bar"></span>
<label className='inputLabel'>Suburb
</label>

{errors.Suburb?.type === 'required' && <p role="alert" className='text-error font-medium text-xs'>Please enter the suburb</p>}

</div>

<div className="inputGroup">  


<input type="text" required className='inputField' defaultValue={userInfo?.city_town ? userInfo?.city_town : ""} {...register("city_town", { required: true })}
aria-invalid={errors.city_town ? "true" : "false"}/>
<span className="highlight"></span>
<span className="bar"></span>
<label className='inputLabel'>City / Town
</label>

{errors.city_town?.type === 'required' && <p role="alert" className='text-error font-medium text-xs'>Please enter the city</p>}

</div>



<div className='flex flex-col lg:flex-row items-start lg:items-center gap-10'>

<div className="inputGroup">  


<input type="text" required className='inputField' defaultValue={userInfo?.postal_Code ? userInfo?.postal_Code : ""} {...register("Postal_Code", { required: true })}
aria-invalid={errors.Postal_Code ? "true" : "false"}/>
<span className="highlight"></span>
<span className="bar"></span>
<label className='inputLabel'>Postal Code
</label>

{errors.Postal_Code?.type === 'required' && <p role="alert" className='text-error font-medium text-xs'>Please enter a postal code</p>}

</div>

<div className="inputGroup">
{
    !labelShow3&& <label className='inputLabel'>Please select a province
    </label>
}
<select {...register("Province", { required: true })} className='inputField text-xs' onClick={()=>setLabelShow3(true)}>
<option defaultValue={userInfo?.province ? userInfo?.province : ""}>{userInfo?.province ? userInfo?.province : ""}</option>
<option value="Eastern Cape">Eastern Cape</option>
<option value="Free State">Free State</option>
<option value="Gauteng">Gauteng</option>
<option value="KwaZulu-Natal">KwaZulu-Natal</option>
<option value="Limpopo">Limpopo</option>
<option value="Mpumalanga">Mpumalanga</option>
<option value="Northern Cape">Northern Cape</option>
<option value="North West">North West</option>
<option value="Western Cape">Western Cape</option>
</select>


{
    labelShow3&& <label className='inputLabel'>Please select a province
    </label>
}
<span className="highlight"></span>
<span className="bar"></span>


{errors.Province?.type === 'required' && <p role="alert" className='text-error font-medium text-xs'>Please select a province
</p>}
</div>
</div>

<div className='flex justify-end w-full my-3 gap-3 flex-col lg:flex-row'>
<input type="submit" className='px-10 py-2 rounded text-sm font-medium border border-primary text-white bg-primary cursor-pointer' value="Save Address"/>
</div>
</form>

<div className='absolute flex items-center justify-end lg:bottom-20 lg:right-56 bottom-6 w-[345px] lg:w-auto text-center' onClick={()=>setAddressBanner(true)}> 
<p className='px-10 py-2 border rounded text-sm font-medium border-[#4d4d4f] hover:bg-[#4d4d4f] hover:text-white cursor-pointer w-full'>Cancel</p>
</div>



</div>
     
     </div>

        
{/* form finished */}


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
        <button disabled={disabledBtn==true?false:true} onClick={continueHandler} className={`${disabledBtn==false?"bg-[#8DC2A1]":"bg-[#1C8644]"} w-full px-2 py-2  text-white rounded`}>Continue</button>
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