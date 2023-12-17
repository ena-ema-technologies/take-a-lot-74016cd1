import React from 'react';
import { HiOutlinePlusSmall, HiShoppingCart, HiStar } from 'react-icons/hi2';
import { IoIosArrowDown, IoMdHeartEmpty } from 'react-icons/io';
import { Link } from 'react-router-dom';

const Product = ({ prod, view }) => {



  // console.log(prod);


  // TODO
  // const handleWishList = async(id)=>{
  //   // if(!user){
  //   //   Swal.fire({
  //   //     title: 'Error!',
  //   //     text: 'You have to login first!',
  //   //     icon: 'warning',
  //   //     confirmButtonText: 'Ok'
  //   //   })
  //   // }else{
  //   //   const data = {
  //   //     productImage: selectedProducts?.Image_URL,
  //   //     totalPrice: priceAfterDiscount,
  //   //     quantity: quantity,
  //   //     barcode : selectedProducts?.Barcode,
  //   //     brandName: selectedProducts?.Brand_Name,
  //   //     productName: selectedProducts?.Product_Name,
  //   //     basedPrice: selectedProducts?.Product_Price,
  //   //     productSKU: selectedProducts?.your_own_SKU ? selectedProducts?.your_own_SKU : "",
  //   //     productId: selectedProducts?._id,
  //   //     buyerInformation : {
  //   //       firstName: userInfo?.firstName,
  //   //       lastName: userInfo?.lastName,
  //   //       mobileNumber: userInfo?.mobile_Number ? userInfo?.mobile_Number : "",
  //   //       phone: userInfo?.phone ? userInfo?.phone : "",
  //   //       postalCode: userInfo?.postal_Code ? userInfo?.postal_Code : "",
  //   //       countryCode: userInfo?.countryCode,
  //   //       email: userInfo?.email,
  //   //       province: userInfo?.province ? userInfo?.province : "",
  //   //       streetAddress: userInfo?.street_Address ? userInfo?.street_Address : "",
  //   //     }

  //   //   }
  //   //   const response = await axiosSecure.post("add-product-wishList", data);
  //   //   if(response.data.insertedId){
  //   //     Swal.fire({
  //   //       title: 'Success!',
  //   //       text: 'Product add to wishlist!',
  //   //       icon: 'success',
  //   //       confirmButtonText: 'Ok'
  //   //     })
  //   //     console.log(data);
  //   //   }
  //   // }
  //  }

  return (
    <Link to={`/product-details/${prod?.Product_Name}/${prod?._id}/${prod?.Categories}`} className={`${view === "list" ? "card card-side h-fit lg:h-64 flex justify-center" : "card lg:w-[200px] h-[375px]"}  shadow hover:shadow-lg rounded-none relative`}>

      <div className={`${view === "list" ? "h-36 lg:h-64 w-40 lg:w-60 my-auto relative" : "h-[135px] w-full relative"}`}>
        <img src={prod?.Image_URL} alt="Product" className={`${view === "list" ? "h-36 lg:h-64 w-40 lg:w-60 my-auto" : "h-[135px] w-full"}`} />
        <button className={`${view === "list" ? "hidden" : "flex absolute top-2 right-2 bg-gray-100 px-1 py-1 rounded-full hover:text-red-400"}`}><IoMdHeartEmpty className='w-5 h-5' /></button>
      </div>

      <div className={`${view === "grid" ? "px-3" : "px-6 py-3 space-y-10"} items-center w-full`}>
        <div className={`${view === "grid" ? "h-14 my-1" : "h-0 my-3"} `}>
          <p className='text-[13px] font-medium h-9'>{prod?.Product_Name.slice(0, 20)}{prod?.Product_Name.length > 20 ? "...." : ""}</p>

          {
            view === "list" ? <div>
              <Link to={`/all/brand/${prod?.Brand_Name}`} className='text-[13px] text-primary'>{prod?.Brand_Name}</Link>
            </div> : ""
          }
        </div>
        <div className='hidden lg:flex'>
          {
            view === "list" ? <div className='mt-5'>{prod?.Short_Description ? prod?.Short_Description : prod?.Description.slice(0, 50)}</div> : ""
          }
        </div>



        <div className='text-left flex flex-col space-y-2'>
          {
            view === "grid" ? <div>
              <Link to={`/all/brand/${prod?.Brand_Name}`} className='text-[13px] text-primary'>{prod?.Brand_Name}</Link>
            </div> : ""
          }
          {
            view === "grid" ? <p className='font-semibold'>R {prod?.Product_Price}</p> : <div className='lg:hidden'>
              {
                view === "list" ? <div className='mt-8'>{prod?.Short_Description ? prod?.Short_Description.slice(0, 50) : prod?.Description.slice(0, 50)}...</div> : ""
              }
            </div>
          }
          <div className='inline-flex items-center gap-2'>
            <p className='text-[13px] font-medium text-gray-500'>In Stock</p>
            <p className="tooltip text-[10px] font-semibold bg-gray-200 px-1 " data-tip="This item is in stock in our Johannesburg warehouse and can be shipped from there. You can also collect it unless the item does not comply with our collection rules. Items that cannot be collected are whitegoods, liquor and digital items.">JHB</p>
          </div>
          <div>
            <p className=" inline-flex items-center gap-1 text-sm"><HiStar className='h-4 w-4 text-yellow-400' /> <span>4.3</span><span className='font-medium text-gray-600'>(120)</span> <span><IoIosArrowDown className='h-5 w-5 text-gray-500' /></span> </p>
          </div>
        </div>

        {/* <div className='absolute'>
sd
    </div> */}
      </div>


      <div className={` ${view === "list" ? "w-1/4" : ""}`}>
        {
          view === "grid" ? <div className="absolute mx-auto text-center bottom-2 lg:bottom-4 left-0 right-0 px-2 lg:px-4">
            <button className="inline-flex items-center justify-center text-green-700 w-full border-green-700 hover:bg-green-700 hover:text-white transition-all duration-500 border py-2 lg:px-3 lg:py-2 gap-1 font-medium"><HiOutlinePlusSmall className='w-5 h-5' /> <HiShoppingCart className='w-5 h-5' /> Add to Cart</button>
          </div> : <div className="">
            <button className='bg-gray-100 px-1 py-1 rounded-full hover:text-red-400 lg:hidden'><IoMdHeartEmpty className='w-5 h-5' /></button>
            <p className='font-semibold text-base text-right p-3 hidden lg:flex'>R 50</p>
            <div className='absolute mx-auto text-center bottom-4 right-0 px-4 lg:flex flex-col gap-3 hidden '>
              <button className="inline-flex items-center justify-center text-green-700 border-green-700 hover:bg-green-700 hover:text-white transition-all duration-500 border px-3 py-2 gap-1 font-medium"><HiOutlinePlusSmall className='w-5 h-5' /> <HiShoppingCart className='w-5 h-5' /> Add to Cart</button>

              <button className="inline-flex items-center justify-center   bg-gray-200 transition-all duration-500 border px-3 py-2 gap-1 font-medium text-xs rounded hover:text-red-500"><IoMdHeartEmpty className='w-5 h-5' /> Add to Wishlist</button>
            </div>
          </div>
        }
      </div>
    </Link>
  );
};

export default Product;