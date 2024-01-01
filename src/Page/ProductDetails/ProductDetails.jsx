import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { HiMinus, HiOutlinePlusSmall, HiOutlineShare, HiPlus, HiShoppingCart, HiStar, HiXMark } from 'react-icons/hi2';
import { IoIosArrowDown, IoIosHelpCircle, IoIosInformationCircle, IoMdHeartEmpty } from 'react-icons/io';
import { FaThumbsUp } from "react-icons/fa";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import "./home.css"

// import required modules
import { Pagination, Navigation } from 'swiper/modules';
import { BsDot } from 'react-icons/bs';

// import tag image 
import saleTag from "../../assets/tag-icon/sale.webp"
import nextDayTag from "../../assets/tag-icon/nextDay.webp"
import useProfile from '../../hooks/useProfile';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import useCart from '../../hooks/useCart';
import useAuth from '../../hooks/useAuth';
// drwer 
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css'


const ProductDetails = () => {
  const navigate = useNavigate();
  const [allProducts, setAllProducts] = useState([]);
  const { user } = useAuth();
  const [carts, update] = useCart();
  console.log(carts.length);
  const [axiosSecure] = useAxiosSecure();
  const [userInfo] = useProfile();
  const [offerOpen, setOfferOpen] = useState(true);
  const [offerOpen2, setOfferOpen2] = useState(true);
  const [selectedRating, setRating] = useState([]);
  const [selectedSort, setSelectedSort] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const info = useParams();
  console.log(selectedProducts);
  const [isOpen, setIsOpen] = React.useState(false)
  const [quantity, setQuantity] = useState(1)
  const [discount, setDiscount] = useState(0)

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://take-a-lot-server-two.vercel.app/single/products/by/id/${info?.id}`)
      .then(res => res.json())
      .then(data => {
        setSelectedProducts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, [info?.id]);

  useEffect(() => {
    fetch(`https://take-a-lot-server-two.vercel.app/related/products/with/${info?.category}`)
      .then(res => res.json())
      .then(data => setAllProducts(data))
  }, [info?.category])




  const handleQuantity = e => {
    e.preventDefault()
    console.log()

    setQuantity(e.target.value)
    if (quantity > 1 && quantity < 4) {
      setDiscount(2)
    }
    else if (quantity > 4 && quantity < 10) {
      setDiscount(10)
    }
    else if (quantity > 9 && quantity < 20) {
      setDiscount(20)
    }
    else if (quantity >= 30) {
      setDiscount(40)
    }
    else {
      setDiscount(0)
    }


  }
  const price = selectedProducts?.Product_Price;
  let totalPrice = price * quantity
  let discountPrice = totalPrice * discount / 100
  let priceAfterDiscount = totalPrice - discountPrice;
  let accDiscount = totalPrice - priceAfterDiscount;
  let totalDiscount = 0;


  const calculateDiscount = (quantity) => {
    let discountPercentage = 0;

    if (quantity >= 2 && quantity <= 4) {
      discountPercentage = 2;
    } else if (quantity >= 5 && quantity <= 9) {
      discountPercentage = 10;
    } else if (quantity >= 10 && quantity <= 19) {
      discountPercentage = 20;
    } else if (quantity >= 30) {
      discountPercentage = 40;
    }

    const discountedPrice = price - (price * discountPercentage) / 100;
    const earnedDiscount = price - discountedPrice;

    return { discountPercentage, discountedPrice, earnedDiscount };
  };
  const { discountPercentage } = calculateDiscount(quantity);

  const handleCart = async () => {
    if (!user) {
      Swal.fire({
        title: 'Error!',
        text: 'You have to login first!',
        icon: 'warning',
        confirmButtonText: 'Ok'
      })
    } else if (!userInfo?.mobile_Number || !userInfo?.postal_Code || !userInfo?.province || !userInfo?.street_Address) {
      Swal.fire({
        title: 'Warning!',
        text: 'Please add your address!',
        icon: 'warning',
        confirmButtonText: 'Ok'
      })
      navigate("/account/address-book")

    } else {
      const data = {
        CartAddedDate: new Date(),
        productImage: selectedProducts?.Image_URL[0],
        totalPrice: parseInt((price - (price * discountPercentage) / 100) * quantity),
        quantity: quantity,
        barcode: selectedProducts?.Barcode,
        brandName: selectedProducts?.Brand_Name,
        productName: selectedProducts?.Product_Name,
        basedPrice: selectedProducts?.Product_Price,
        productSKU: selectedProducts?.your_own_SKU ? selectedProducts?.your_own_SKU : "",
        productId: selectedProducts?._id,
        PackagedWidth: selectedProducts?.Packaged_Width,
        PackagedLength: selectedProducts?.Packaged_Length,
        PackagedHeight: selectedProducts?.Packaged_Height,
        Packaged_Weight: selectedProducts?.Packaged_Weight,
        buyerInformation: {
          firstName: userInfo?.firstName,
          lastName: userInfo?.lastName,
          mobileNumber: userInfo?.mobile_Number ? userInfo?.mobile_Number : "",
          phone: userInfo?.phone ? userInfo?.phone : "",
          postalCode: userInfo?.postal_Code ? userInfo?.postal_Code : "",
          countryCode: userInfo?.countryCode,
          email: userInfo?.email,
          province: userInfo?.province ? userInfo?.province : "",
          streetAddress: userInfo?.street_Address ? userInfo?.street_Address : "",
        }

      }
      const response = await axiosSecure.post("add-product-cart", data);
      if (response.data.insertedId) {
        setIsOpen((prevState) => !prevState)
        Swal.fire({
          title: 'Success!',
          text: 'Product add to cart!',
          icon: 'success',
          confirmButtonText: 'Ok'
        })
        update();
      }
    }
  }

  const handleWishList = async () => {
    if (!user) {
      Swal.fire({
        title: 'Error!',
        text: 'You have to login first!',
        icon: 'warning',
        confirmButtonText: 'Ok'
      })
    } else if (!userInfo?.mobile_Number || !userInfo?.postal_Code || !userInfo?.province || !userInfo?.street_Address) {
      Swal.fire({
        title: 'Warning!',
        text: 'Please add your address!',
        icon: 'warning',
        confirmButtonText: 'Ok'
      })
      navigate("/account/address-book")

    } else {
      const data = {
        wishListAddedDate: new Date(),
        productImage: selectedProducts?.Image_URL[0],
        totalPrice: parseInt((price - (price * discountPercentage) / 100) * quantity),
        quantity: quantity,
        barcode: selectedProducts?.Barcode,
        brandName: selectedProducts?.Brand_Name,
        productName: selectedProducts?.Product_Name,
        basedPrice: selectedProducts?.Product_Price,
        productSKU: selectedProducts?.your_own_SKU ? selectedProducts?.your_own_SKU : "",
        productId: selectedProducts?._id,
        PackagedWidth: selectedProducts?.Packaged_Width,
        PackagedLength: selectedProducts?.Packaged_Length,
        PackagedHeight: selectedProducts?.Packaged_Height,
        Packaged_Weight: selectedProducts?.Packaged_Weight,
        buyerInformation: {
          firstName: userInfo?.firstName,
          lastName: userInfo?.lastName,
          mobileNumber: userInfo?.mobile_Number ? userInfo?.mobile_Number : "",
          phone: userInfo?.phone ? userInfo?.phone : "",
          postalCode: userInfo?.postal_Code ? userInfo?.postal_Code : "",
          countryCode: userInfo?.countryCode,
          email: userInfo?.email,
          province: userInfo?.province ? userInfo?.province : "",
          streetAddress: userInfo?.street_Address ? userInfo?.street_Address : "",
        }

      }
      const response = await axiosSecure.post("add-product-wishList", data);
      if (response.data.insertedId) {
        Swal.fire({
          title: 'Success!',
          text: 'Product add to wishlist!',
          icon: 'success',
          confirmButtonText: 'Ok'
        })
        console.log(data);
      }
    }
  }

  return (
    <section>
      {
        loading ? <div>
          <h1>Loading</h1>
        </div> :
          <section className='px-5'>

            <div className='my-5 w-full flex items-center justify-between text-xs'>
              {
                selectedProducts?.Categories && <div>
                  <p className='inline-flex gap-2 items-center'>
                    <Link className='hover:underline text-primary'>{selectedProducts?.Categories[0]}</Link>

                    <span>/</span>

                    <Link className='hover:underline text-primary'>{selectedProducts?.Categories[1]}</Link>

                    <span>/</span>

                    <Link className='hover:underline text-primary'>{selectedProducts?.Categories[2]}</Link>

                  </p>
                </div>
              }
              <div>
                <p className='inline-flex gap-1 items-center text-sm'><HiOutlineShare className='h-4 w-4' /> <span className='font-medium'>Share</span></p>
              </div>
            </div>

            <div className='flex flex-col lg:flex-row items-start gap-10 mt-5 mb-10 overflow-hidden relative'>
              <div className='w-full lg:w-[70%]'>
                <div className='prod-image w-full h-fit flex flex-col lg:flex-row gap-5 bg-white shadow rounded p-10'>

                  <div className='border border-gray-400 rounded-sm'>

                    {
                      selectedProducts?.Image_URL && <Zoom>
                        <img
                          alt="That Wanaka Tree, New Zealand by Laura Smetsers"
                          src={selectedProducts?.Image_URL[0]}
                          width="500"
                          className=' py-24 px-3'
                        />
                      </Zoom>
                    }
                    {/* tag image */}
                    <div className='absolute top-10'>
                      <div className='w-12 h-12 py-2 space-x-0 space-y-0 text-xs font-medium flex items-center justify-center bg-[#0b79bf] text-white text-center rounded ms-2 mt-2'>
                        33% <br /> OFF

                      </div>
                      <img className='w-12 rounded-sm ms-2 mt-2' src={saleTag} alt="" />
                    </div>
                  </div>


                  <div className='w-full flex flex-col'>

                    <div className='pb-4 border-b border-b-gray-300 flex flex-col space-y-2'>
                      <p className='text-[#4d4d4f] font-medium text-lg'>{selectedProducts?.Product_Name}</p>
                      <Link to={`/all/brand/${selectedProducts?.Brand_Name}`} className='text-primary'>{selectedProducts?.Brand_Name}</Link>
                      <p className=" inline-flex items-center gap-1 text-sm"><HiStar className='h-4 w-4 text-yellow-400' /> <span>4.3</span><span className='font-medium text-gray-600'>(20)</span> <span><IoIosArrowDown className='h-5 w-5 text-gray-500' /></span> </p>
                    </div>



                    <div className='py-4 border-b border-b-gray-300 flex items-center space-x-3'>
                      <p className='font-bold'>In Stock</p>
                      <p className="tooltip text-[10px] font-semibold bg-gray-200 px-1 " data-tip="This item is in stock in our Johannesburg warehouse and can be shipped from there. You can also collect it unless the item does not comply with our collection rules. Items that cannot be collected are whitegoods, liquor and digital items.">JHB</p>
                      <p className="tooltip text-[10px] font-semibold bg-gray-200 px-1 " data-tip="This item is in stock in our Cape Town warehouse and can be shipped from there. You can also collect it yourself from our warehouse during the week or over weekends.">CPT</p>
                      <label htmlFor="When_I_get_it" className="text-primary text-xs hover:underline hover:cursor-pointer">When do I get it?</label>
                    </div>

                    <div className='py-2 px-4'>
                      <ul className='list-disc text-xs space-y-3'>
                        <li>Eligible for next-day delivery or collection. <label htmlFor="next_day_delivery" className='w-4 h-4 text-green-700 hover:text-green-800 inline-flex items-center'><IoIosInformationCircle className='w-4 h-4' /></label> </li>

                        <li>Eligible for Cash on Delivery.<label htmlFor="COD" className='w-4 h-4 text-green-700 hover:text-green-800 inline-flex items-center'><IoIosInformationCircle className='w-4 h-4' /></label> </li>

                        <li>Hassle-Free Exchanges & Returns for 30 Days.<label htmlFor="Exchanges&Returns" className='w-4 h-4 text-green-700 hover:text-green-800 inline-flex items-center'><IoIosInformationCircle className='w-4 h-4' /></label></li>

                        <li><span>{selectedProducts?.Warranty_Period}-Month Limited Warranty.</span> <p className='tooltip inline-flex items-center text-green-700' data-tip="Limited warranty, with certain exclusions, as defined by the manufacturer. Please consult the manufacturer for further details."><IoIosHelpCircle className='w-4 h-4' /></p> </li>
                      </ul>
                    </div>
                    {/*todo: table need to dynamic */}
                    <div className='w-full text-sm mt-2'>
                      <h1 className='font-bold '>Quantity Based Discount</h1>
                      <table className='bg-slate-100 mt-4 text-xs'>
                        <thead className='border-none'>
                          <tr>
                            <th>Quantity</th>
                            <th>Discount %</th>
                            <th>Discounted Price</th>
                            <th>Earned Discount</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className='text-center'>
                            <td className='px-2 border-white'>2-4</td>
                            <td className='px-2 border-white'>2%</td>
                            <td className='px-2 border-white'>{(price - (price * 2) / 100).toFixed(2)}</td>
                            <td className='px-2 border-white'>{(price - (price - (price * 2) / 100)).toFixed(2)}</td>
                          </tr>
                          <tr className='text-center'>
                            <td className='px-2 border-white'>5-9</td>
                            <td className='px-2 border-white'>10%</td>
                            <td className='px-2 border-white'>{(price - (price * 10) / 100).toFixed(2)}</td>
                            <td className='px-2 border-white'>{(price - (price - (price * 10) / 100)).toFixed(2)}</td>
                          </tr>
                          <tr className='text-center'>
                            <td className='px-2 border-white'>10-19</td>
                            <td className='px-2 border-white'>20%</td>
                            <td className='px-2 border-white'>{(price - (price * 20) / 100).toFixed(2)}</td>
                            <td className='px-2 border-white'>{(price - (price - (price * 20) / 100)).toFixed(2)}</td>
                          </tr>
                          <tr className='text-center'>
                            <td className='px-2 border-white'>30+</td>
                            <td className='px-2 border-white'>40%</td>
                            <td className='px-2 border-white'>{(price - (price * 40) / 100).toFixed(2)}</td>
                            <td className='px-2 border-white'>{(price - (price - (price * 40) / 100)).toFixed(2)}</td>
                          </tr>
                        </tbody>
                      </table>

                    </div>
                  </div>




                </div>

                {/* You Might Also Like */}
                <div className='You_Might_Also_Like my-10 w-full h-full'>
                  <p className='text-[#4d4d4f] font-semibold'>You Might Also Like</p>
                  <div className='hidden lg:block w-full'>
                    {/* lg product swiper */}
                    <div className="product-cards w-full my-4 h-full">

                      <Swiper
                        slidesPerView={4}
                        spaceBetween={20}
                        // loop={true}
                        // pagination={{
                        //   clickable: true,
                        // }}
                        navigation={true}
                        modules={[Pagination, Navigation]}
                        className="mySwiper"
                      >

                        {
                          allProducts.slice(0, 10).map(prod => <SwiperSlide key={prod?._id} className="h-full">

                            <Link to={`/product-details/${prod?.Product_Name}/${prod?._id}/${prod?.Categories[0]}`} className="w-[200px] flex flex-col gap-2 bg-white px-2 py-3 shadow hover:shadow-xl h-full overflow-visible">

                              <div className="w-[150px] h-[120px] mx-auto">
                                <img src={prod?.Image_URL[0]} alt={prod?.Product_Name} className='w-[150px] h-[120px]' />
                              </div>

                              <div className="h-[40px] mt-8">
                                <p className="text-xs font-normal text-[#4d4d4f] overflow-hidden">{prod?.Product_Name.slice(0, 45)}{prod?.Product_Name.length > 50 ? "..." : ""}</p>
                              </div>

                              <div className="mt-3 flex flex-col space-y-2">
                                <p className="font-bold">R 220</p>
                                <p className=" inline-flex items-center gap-1 text-sm"><HiStar className='h-4 w-4 text-yellow-400' /> <span>4.3</span><span className='font-medium text-gray-600'>(20)</span> <span><IoIosArrowDown className='h-5 w-5 text-gray-500' /></span> </p>
                              </div>
                            </Link>

                          </SwiperSlide>)
                        }

                      </Swiper>

                    </div>
                  </div>

                  <div className='block lg:hidden w-full'>
                    {/* mobile product swiper */}
                    <div className="product-cards w-full my-4 h-full">

                      <Swiper
                        slidesPerView={2}
                        spaceBetween={10}
                        // loop={true}
                        // pagination={{
                        //   clickable: true,
                        // }}
                        navigation={true}
                        modules={[Pagination, Navigation]}
                        className="mySwiper"
                      >

                        {
                          allProducts?.slice(0, 10).map(prod => <SwiperSlide key={prod?._id} className="">

                            <Link to={`/product-details/${prod?.Product_Name}/${prod?._id}/${prod?.Categories[0]}`} className="w-[200px] h-[300px] flex flex-col gap-2 bg-white px-2 py-3 shadow hover:shadow-xl">

                              <div className="w-[150px] h-[120px] mx-auto">
                                <img src={prod?.Image_URL[0]} alt={prod?.Product_Name} />
                              </div>

                              <div className="h-[40px] mt-8">
                                <p className="text-xs font-normal text-[#4d4d4f] overflow-hidden">{prod?.Product_Name.slice(0, 45)}{prod?.Product_Name.length > 50 ? "..." : ""}</p>
                              </div>

                              <div className="mt-3 flex flex-col space-y-2">
                                <p className="font-bold">R 220</p>
                                <p className=" inline-flex items-center gap-1 text-sm"><HiStar className='h-4 w-4 text-yellow-400' /> <span>4.3</span><span className='font-medium text-gray-600'>(20)</span> <span><IoIosArrowDown className='h-5 w-5 text-gray-500' /></span> </p>
                              </div>

                            </Link>

                          </SwiperSlide>)
                        }

                      </Swiper>

                    </div>
                  </div>
                </div>

                <div className='Product_Information my-14 w-full h-full px-3 py-4 bg-white rounded shadow'>
                  <p className='text-[#4d4d4f] font-medium text-lg'>Product Information</p>

                  <div className="overflow-x-auto my-5">
                    <table className="table">

                      <tbody className='border rounded'>
                        {/* row 1 */}
                        <tr>
                          <td className='border-r font-semibold text-[#4d4d4f] text-sm'>Categories</td>
                          <td className='text-sm'>
                            <ul>
                              {
                                selectedProducts?.Categories && <li className='inline-flex gap-2 items-center'>
                                  <Link className='hover:underline text-primary' to={`/all/${selectedProducts?.Categories[0]}`}>{selectedProducts?.Categories[0]}</Link>

                                  <span>/</span>

                                  <Link className='hover:underline text-primary' to={`/all/${selectedProducts?.Categories[0]}/${selectedProducts?.Categories[1]}`}>{selectedProducts?.Categories[1]}</Link>
                                </li>
                              }
                            </ul>
                          </td>
                        </tr>

                        <tr>
                          <td className='border-r font-semibold text-[#4d4d4f] text-sm'>Brand</td>
                          <td className='text-sm'>
                            <Link className='hover:underline text-primary' to={`/all/${selectedProducts?.Brand_Name}`}>{selectedProducts?.
                              Brand_Name}</Link>
                          </td>
                        </tr>

                        <tr>
                          <td className='border-r font-semibold text-[#4d4d4f] text-sm'>Warranty</td>
                          <td className='text-sm'>{selectedProducts?.Warranty_Type}
                            ({selectedProducts?.Warranty_Period} Months )
                          </td>
                        </tr>

                        <tr>
                          <td className='border-r font-semibold text-[#4d4d4f] text-sm'>What's in the box</td>
                          <td className='text-sm'>
                            {selectedProducts?.Whats_in_the_Box}
                          </td>
                        </tr>


                        <tr>
                          <td className='border-r font-semibold text-[#4d4d4f] text-sm'>Availabilities</td>
                          <td className='text-sm'>
                            {selectedProducts?.Availabilities}
                          </td>
                        </tr>


                        <tr>
                          <td className='border-r font-semibold text-[#4d4d4f] text-sm'>Barcode</td>
                          <td className='text-sm'>
                            {selectedProducts?.your_own_SKU}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                </div>


                <div className='description my-14 w-full h-full px-3 py-4 bg-white rounded shadow'>
                  <p className='text-[#4d4d4f] font-medium text-lg'>Description</p>
                  <div className='my-2'>
                    <p className='text-sm'>{selectedProducts?.Description}</p>
                  </div>

                  <div className='text-sm my-4 space-y-1'>
                    <p>What's in the box</p>
                    <p>{selectedProducts?.Whats_in_the_Box}</p>
                  </div>

                </div>

                <div className='review my-14 w-full h-full px-3 py-4 bg-white rounded shadow'>
                  <p className='text-[#4d4d4f] font-medium text-lg'>Reviews</p>

                  <div className='w-full flex flex-col lg:flex-row items-start gap-10'>

                    <div className='w-full lg:w-1/3 my-4'>

                      <div className='flex items-center w-full justify-between'>

                        <div>
                          <p className='text-5xl font-black text-[#4d4d4f]'>4.6</p>
                        </div>

                        <div className='flex flex-col items-center'>
                          <Rating
                            style={{ maxWidth: 80 }}
                            value={4.6}
                            readOnly
                          />
                          <p className='text-sm'>32 Reviews</p>
                        </div>

                      </div>

                      <div className='w-full my-4'>
                        <div className={`inline-flex items-center gap-3 w-full py-1 px-1 rounded-xl cursor-pointer hover:bg-primary hover:bg-opacity-5 ${selectedRating?.find(rat => rat === 5) ? "bg-primary bg-opacity-5" : ""}`} onClick={() => setRating([...selectedRating, 5])}>
                          <div className='w-[20%]'><span className="inline-flex items-center gap-1 text-sm font-bold"><span>5</span> <HiStar className=' text-yellow-400' /></span></div>
                          <div className='w-full'><progress className="progress progress-success" value="80" max="100"></progress></div>
                          <div className='w-[10%]'>
                            <span className='text-sm font-bold'>25</span>
                          </div>
                        </div>

                        <div className={`inline-flex items-center gap-3 w-full py-1 px-1 rounded-xl cursor-pointer hover:bg-primary hover:bg-opacity-5 ${selectedRating?.find(rat => rat === 4) ? "bg-primary bg-opacity-5" : ""}`} onClick={() => setRating([...selectedRating, 4])}>
                          <div className='w-[20%]'><span className="inline-flex items-center gap-1 text-sm font-bold"><span>4</span> <HiStar className=' text-yellow-400' /></span></div>
                          <div className='w-full'><progress className="progress progress-accent" value="30" max="100"></progress></div>
                          <div className='w-[10%]'>
                            <span className='text-sm font-bold'>5</span>
                          </div>
                        </div>


                        <div className={`inline-flex items-center gap-3 w-full py-1 px-1 rounded-xl cursor-pointer hover:bg-primary hover:bg-opacity-5 ${selectedRating?.find(rat => rat === 3) ? "bg-primary bg-opacity-5" : ""}`} onClick={() => setRating([...selectedRating, 3])}>
                          <div className='w-[20%]'><span className="inline-flex items-center gap-1 text-sm font-bold"><span>3</span> <HiStar className=' text-yellow-400' /></span></div>
                          <div className='w-full'><progress className="progress progress-warning" value="10" max="100"></progress></div>
                          <div className='w-[10%]'>
                            <span className='text-sm font-bold'>3</span>
                          </div>
                        </div>


                        <div className={`inline-flex items-center gap-3 w-full py-1 px-1 rounded-xl cursor-pointer hover:bg-primary hover:bg-opacity-5 ${selectedRating?.find(rat => rat === 2) ? "bg-primary bg-opacity-5" : ""}`} onClick={() => setRating([...selectedRating, 2])}>
                          <div className='w-[20%]'><span className="inline-flex items-center gap-1 text-sm font-bold"><span>2</span> <HiStar className=' text-yellow-400' /></span></div>
                          <div className='w-full'><progress className="progress progress-warning" value={0} max="100"></progress></div>
                          <div className='w-[10%]'>
                            <span className='text-sm font-bold'>0</span>
                          </div>
                        </div>


                        <div className={`inline-flex items-center gap-3 w-full py-1 px-1 rounded-xl cursor-pointer hover:bg-primary hover:bg-opacity-5 ${selectedRating?.find(rat => rat === 1) ? "bg-primary bg-opacity-5" : ""}`} onClick={() => setRating([...selectedRating, 1])}>
                          <div className='w-[20%]'><span className="inline-flex items-center gap-1 text-sm font-bold"><span>1</span> <HiStar className=' text-yellow-400' /></span></div>
                          <div className='w-full'><progress className="progress progress-warning" value="10" max="100"></progress></div>
                          <div className='w-[10%]'>
                            <span className='text-sm font-bold'>1</span>
                          </div>
                        </div>



                        <div className='write-btn mt-3 mb-5 w-full'>
                          <button className='w-full text-center py-3 bg-primary text-white font-medium text-sm hover'>Write Review</button>
                        </div>
                      </div>

                      <div className='filter-option shadow my-6'>
                        <div className="collapse collapse-plus rounded" >
                          <input type="checkbox" defaultChecked={offerOpen2 ? true : false} onClick={() => setOfferOpen2(!offerOpen2)} />
                          <div className="collapse-title text-sm font-semibold bg-[#f4f4f4] border-b border-b-gray-200 rounded">
                            Filter by Ratings
                          </div>
                          <div className="collapse-content py-2">
                            <label className="cursor-pointer label relative" onClick={() => setRating([...selectedRating, 5])}>
                              <input type="checkbox" className="checkbox checkbox-primary" defaultChecked={selectedRating?.find(rat => rat === 5) ? true : false} />
                              <span className="label-text absolute left-10 inline-flex items-center gap-1 text-sm"><HiStar className='h-5 w-5 text-yellow-400' /> <span>5</span></span>
                            </label>
                            <label className="cursor-pointer label relative" onClick={() => setRating([...selectedRating, 4])}>
                              <input type="checkbox" className="checkbox checkbox-primary" defaultChecked={selectedRating?.find(rat => rat === 4) ? true : false} />
                              <span className="label-text absolute left-10 inline-flex items-center gap-1 text-sm"><HiStar className='h-5 w-5 text-yellow-400' /> <span>4</span></span>
                            </label>
                            <label className="cursor-pointer label relative" onClick={() => setRating([...selectedRating, 3])}>
                              <input type="checkbox" className="checkbox checkbox-primary" defaultChecked={selectedRating?.find(rat => rat === 3) ? true : false} />
                              <span className="label-text absolute left-10 inline-flex items-center gap-1 text-sm"><HiStar className='h-5 w-5 text-yellow-400' /> <span>3</span></span>
                            </label>
                            <label className="cursor-pointer label relative" onClick={() => setRating([...selectedRating, 2])}>
                              <input type="checkbox" className="checkbox checkbox-primary" defaultChecked={selectedRating?.find(rat => rat === 2) ? true : false} />
                              <span className="label-text absolute left-10 inline-flex items-center gap-1 text-sm"><HiStar className='h-5 w-5 text-yellow-400' /> <span>2</span></span>
                            </label>
                            <label className="cursor-pointer label relative" onClick={() => setRating([...selectedRating, 1])}>
                              <input type="checkbox" className="checkbox checkbox-primary" defaultChecked={selectedRating?.find(rat => rat === 1) ? true : false} />
                              <span className="label-text absolute left-10 inline-flex items-center gap-1 text-sm"><HiStar className='h-5 w-5 text-yellow-400' /> <span>1</span></span>
                            </label>
                          </div>
                        </div>
                      </div>


                    </div>

                    <div className='w-full'>
                      <div className='w-full flex items-center justify-between border-b border-b-gray-200 py-4'>
                        <div>
                          <p className='text-sm'>1 to 10 of 32 <span className='font-semibold'>Reviews</span></p>
                        </div>

                        <div className='sort-menu'>
                          <span className=' text-[13px] font-medium'>Sort by:</span>
                          <select className='border px-2 py-2 rounded bg-white text-xs font-semibold'
                            onChange={(e) => setSelectedSort([...selectedSort, e.target.value])}

                          >
                            <option defaultValue="Relevance">Most helpful</option>
                            <option value="Descending">Most Recent</option>

                          </select>

                        </div>
                      </div>

                      <div>

                        <div className='comment-section w-full space-y-3 py-4 border-b border-b-gray-200'>

                          <p className='font-semibold text-[#4d4d4f]'>Great deal</p>

                          <div>
                            <Rating
                              style={{ maxWidth: 80 }}
                              value={5}
                              readOnly
                            />
                          </div>

                          <p className='text-sm'><span className='font-semibold text-[#4d4d4f]'>Subashnee - 31 Jul 2023 </span> <span>(Reviewed 7 days after purchase)</span></p>

                          <p className='text-sm'>Purchased because it was a great deal compared to the prices at other retailers</p>


                          <div className='py-3 w-full flex gap-10 items-center'>

                            <button className='text-sm inline-flex items-center gap-2 px-3 py-2 rounded-2xl border hover:bg-[#4d4d4f] hover:text-white transition-all duration-500'><FaThumbsUp className='w-4 h-4' /> <span>Helpful</span> <span>(7)</span></button>

                            <button className='text-primary text-sm'>Report Review</button>

                          </div>

                        </div>

                        <div className='comment-section w-full space-y-3 py-4 border-b border-b-gray-200'>

                          <p className='font-semibold text-[#4d4d4f]'>Awesome</p>

                          <div>
                            <Rating
                              style={{ maxWidth: 80 }}
                              value={5}
                              readOnly
                            />
                          </div>

                          <p className='text-sm'><span className='font-semibold text-[#4d4d4f]'>Nick - 20 Sep 2023 </span> <span>(Reviewed 7 days after purchase)</span></p>

                          <p className='text-sm'>Purchased because it was a great deal compared to the prices at other retailers</p>


                          <div className='py-3 w-full flex gap-10 items-center'>

                            <button className='text-sm inline-flex items-center gap-2 px-3 py-2 rounded-2xl border hover:bg-[#4d4d4f] hover:text-white transition-all duration-500'><FaThumbsUp className='w-4 h-4' /> <span>Helpful</span> <span>(7)</span></button>

                            <button className='text-primary text-sm'>Report Review</button>

                          </div>

                        </div>


                        <div className='comment-section w-full space-y-3 py-4 border-b border-b-gray-200'>

                          <p className='font-semibold text-[#4d4d4f]'>Good Price</p>

                          <div>
                            <Rating
                              style={{ maxWidth: 80 }}
                              value={5}
                              readOnly
                            />
                          </div>

                          <p className='text-sm'><span className='font-semibold text-[#4d4d4f]'>Ntsieng - 05 Oct 2023 </span> <span>(Reviewed 7 days after purchase)</span></p>

                          <p className='text-sm'>Purchased because it was a great deal compared to the prices at other retailers</p>


                          <div className='py-3 w-full flex gap-10 items-center'>

                            <button className='text-sm inline-flex items-center gap-2 px-3 py-2 rounded-2xl border hover:bg-[#4d4d4f] hover:text-white transition-all duration-500'><FaThumbsUp className='w-4 h-4' /> <span>Helpful</span> <span>(7)</span></button>

                            <button className='text-primary text-sm'>Report Review</button>

                          </div>

                        </div>

                        <div className='comment-section w-full space-y-3 py-4 border-b border-b-gray-200'>

                          <p className='font-semibold text-[#4d4d4f]'>So far so good</p>

                          <div>
                            <Rating
                              style={{ maxWidth: 80 }}
                              value={5}
                              readOnly
                            />
                          </div>

                          <p className='text-sm'><span className='font-semibold text-[#4d4d4f]'>Andiswa - 30 Dec 2022 </span> <span>(Reviewed 7 days after purchase)</span></p>

                          <p className='text-sm'>Been using it for a week. My skin feels like a marshmallow, so soft. Love the glow. Am yet to see a change in the pigment, but I love the softness so much, I've already ordered another one.</p>


                          <div className='py-4 w-full flex gap-10 items-center'>

                            <button className='text-sm inline-flex items-center gap-2 px-3 py-2 rounded-2xl border hover:bg-[#4d4d4f] hover:text-white transition-all duration-500'><FaThumbsUp className='w-4 h-4' /> <span>Helpful</span> <span>(7)</span></button>

                            <button className='text-primary text-sm'>Report Review</button>

                          </div>

                        </div>

                      </div>
                    </div>

                  </div>


                </div>

                <div className='all-modal absolute top-0'>
                  {/* When do I get it? */}
                  <input type="checkbox" id="When_I_get_it" className="modal-toggle" />
                  <div className="modal">
                    <div className="modal-box">
                      <h2 className='text-center text-lg font-bold'>When do I get it?</h2>
                      <div className='text-xs text-left my-5'>
                        <p>Our picking, packing and delivery is linked to what you order, where you want it delivered and how you choose to pay, so delivery times can vary. Estimates are provided below to help you shop, but always check your order’s Estimated Delivery Date during checkout for the most accurate delivery information.</p>

                        <div className='mt-2'>
                          <p className='font-semibold text-[#4d4d4f] text-sm'>Standard Delivery</p>
                          <div className="overflow-x-auto border my-2">
                            <table className="table">
                              {/* head */}
                              <thead>
                                <tr>
                                  <th className='text-sm text-black'>
                                    Delivery destination</th>
                                  <th className='text-sm text-black'>	Delivery time</th>
                                </tr>
                              </thead>
                              <tbody>
                                {/* row 1 */}
                                <tr>
                                  <td>Cape Town, Johannesburg, Pretoria</td>
                                  <td>	2-5 working days</td>
                                </tr>
                                <tr>
                                  <td>Regional Area</td>
                                  <td>2-6 working days</td>
                                </tr>
                                <tr>
                                  <td>Remote Area</td>
                                  <td>3-7 working days</td>
                                </tr>

                              </tbody>
                            </table>
                          </div>
                        </div>


                        <div className='mt-3'>
                          <p className='font-semibold text-[#4d4d4f] text-sm'>Premium Delivery Options</p>
                          <p>Only available in Main Centres (Cape Town, Johannesburg & Pretoria)</p>
                          <div className="overflow-x-auto border my-2">
                            <table className="table">
                              {/* head */}
                              <thead>
                                <tr>
                                  <th className='text-sm text-black'>

                                    Delivery type</th>
                                  <th className='text-sm text-black'>	Delivery time</th>
                                  <th className='text-sm text-black'>	Cut off time</th>

                                </tr>
                              </thead>
                              <tbody>
                                {/* row 1 */}
                                <tr>
                                  <td>Same Day Delivery</td>
                                  <td>	Same Day between 3pm - 7pm</td>
                                  <td>Pay before 10:30am weekdays</td>
                                </tr>
                                <tr>
                                  <td>Next Business Day Delivery</td>
                                  <td>Next Working Day between 7am - 7pm</td>
                                  <td>Pay before 11:59pm previous day</td>
                                </tr>
                                <tr>
                                  <td>Saturday Delivery</td>
                                  <td>Saturday between 11am - 7pm</td>
                                  <td>Pay before 11:59pm Friday</td>
                                </tr>
                                <tr>
                                  <td>Sunday Delivery</td>
                                  <td>Sunday between 11am - 7pm	</td>
                                  <td>Pay before 11am Saturday</td>
                                </tr>


                              </tbody>
                            </table>
                          </div>
                        </div>


                        <div className='mt-2'>
                          <p className='font-semibold text-[#4d4d4f] text-sm'>Standard Collect</p>
                          <div className="overflow-x-auto border my-2">
                            <table className="table">
                              {/* head */}
                              <thead>
                                <tr>
                                  <th className='text-sm text-black'>

                                    Collect location</th>
                                  <th className='text-sm text-black'>		Collect time</th>
                                </tr>
                              </thead>
                              <tbody>
                                {/* row 1 */}
                                <tr>
                                  <td>Pickup Point: Cape Town, Johannesburg, Pretoria</td>
                                  <td>		2-5 working days</td>
                                </tr>
                                <tr>
                                  <td>Pickup Point: Regional Area</td>
                                  <td>2-6 working days</td>
                                </tr>
                                <tr>
                                  <td>Pickup Point: Remote Area</td>
                                  <td>3-7 working days</td>
                                </tr>

                              </tbody>
                            </table>
                          </div>
                        </div>


                        <div className='mt-3'>
                          <p className='font-semibold text-[#4d4d4f] text-sm'>Premium Collect Options</p>
                          <p className='mb-1'>Only available in Main Centres (Cape Town, Johannesburg & Pretoria)</p>
                          <div className="overflow-x-auto border my-2">
                            <table className="table">
                              {/* head */}
                              <thead>
                                <tr>
                                  <th className='text-sm text-black'>

                                    Collect type</th>
                                  <th className='text-sm text-black'>	Collect time</th>
                                  <th className='text-sm text-black'>		Cut off time</th>

                                </tr>
                              </thead>
                              <tbody>
                                {/* row 1 */}
                                <tr>
                                  <td>Same Day Collect</td>
                                  <td>Same Day from 3pm</td>
                                  <td>Pay before 10:30am Mon-Sat</td>
                                </tr>
                                <tr>
                                  <td>Next Day Collect</td>
                                  <td>Next Day from 10am	</td>
                                  <td>Pay before 11:59pm previous day</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>

                        <p>Collection times vary, please wait for your Ready to Collect email before visiting the pickup point.</p>
                      </div>
                      <div>

                      </div>
                      <div className="modal-action">
                        <label htmlFor="When_I_get_it" className="absolute top-3 right-3 cursor-pointer hover:text-error">
                          <HiXMark className='w-7 h-7' />
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* next-day delivery or collection */}
                  <input type="checkbox" id="next_day_delivery" className="modal-toggle" />
                  <div className="modal">
                    <div className="modal-box">
                      <h2 className='text-center text-lg font-bold'>What does this mean?</h2>
                      <div className='text-xs text-left my-5'>
                        <p>If your order is eligible for next business day delivery, it will be displayed as a delivery option during checkout. <span className='font-semibold text-[#4d4d4f]'>A ‘Next Day’ badge seen on the product details page does not guarantee next day delivery.</span></p>

                        <div className='py-3'>
                          <p className='font-semibold mb-2 text-[#4d4d4f] text-sm'>We offer next business day delivery during checkout if all products in the order meet the following criteria:</p>
                          <ul className='list-disc pl-4 space-y-2'>
                            <li>All products in the order must be in-stock
                              <ul className='list-disc pl-5 space-y-1'>
                                <li>For Cape Town Metro customers, all products must be in-stock at the Cape Town distribution centre</li>
                                <li>For Johannesburg, Pretoria and Durban customers, all products must be in-stock at the Johannesburg distribution centre</li>
                                <li>For all other areas, all products must be in-stock at the nearest distribution centre
                                </li>
                              </ul>
                            </li>

                            <li>No products longer than 1.4 meters in length and width</li>

                            <li>No bulky products (35 kg volumetric or more)</li>
                          </ul>
                        </div>

                        <p className='font-semibold text-[#4d4d4f] text-sm'>In addition, please note:</p>

                        <ul className='list-disc pl-4 space-y-2 mt-2'>
                          <li>Eligibility is subject to available courier capacity at the time the order is placed</li>
                          <li>Alcoholic products are limited to delivery only and cannot be collected</li>
                        </ul>
                      </div>
                      <div className="modal-action">
                        <label htmlFor="next_day_delivery" className="absolute top-3 right-3 cursor-pointer hover:text-error">
                          <HiXMark className='w-7 h-7' />
                        </label>
                      </div>
                    </div>
                  </div>
                  {/* Eligible for Cash on Delivery */}
                  <input type="checkbox" id="COD" className="modal-toggle" />
                  <div className="modal">
                    <div className="modal-box">
                      <h2 className='text-center text-lg font-bold'>What does this mean?</h2>
                      <div className='text-xs text-left my-5'>
                        <p>You can pay for this item with cash when your driver delivers your order.</p>

                        <div className='mt-2'>
                          <p className='font-semibold text-[#4d4d4f] text-sm'>How does it work?</p>
                          <p>Select Cash On Delivery (COD) as your payment option when you checkout. Have the exact amount of cash ready for our friendly delivery driver when he arrives.</p>
                        </div>

                        <div className='py-3'>
                          <p className='font-semibold mb-2 text-[#4d4d4f] text-sm'>Is COD available on every order?</p>
                          <p>No. We don’t offer COD for:</p>
                          <ul className='list-disc pl-4 space-y-2'>
                            <li>Digital products (e.g. eBooks, gift vouchers or airtime)
                            </li>


                            <li>Customised products (e.g. a sports shirt printed with a personalised name)</li>

                            <li>Orders totalling R3,000 or more
                            </li>
                            <li>Orders being collected from Takealot pickup points</li>
                            <li>Delivery addresses falling outside of our Takealot Delivery Team area</li>
                          </ul>
                        </div>

                        <p className='font-semibold text-[#4d4d4f] text-sm'>If your order is eligible for COD, it will be displayed as a payment option at checkout.</p>

                      </div>
                      <div className="modal-action">
                        <label htmlFor="COD" className="absolute top-3 right-3 cursor-pointer hover:text-error">
                          <HiXMark className='w-7 h-7' />
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Hassle-Free Exchanges & Returns for 30 Days. */}
                  <input type="checkbox" id="Exchanges&Returns" className="modal-toggle" />
                  <div className="modal">
                    <div className="modal-box">
                      <h2 className='text-center text-lg font-bold'>Hassle-Free Exchanges & Returns for 30 Days</h2>
                      <div className='text-xs text-left my-5'>
                        <p className='font-semibold text-[#4d4d4f] text-sm'>Returns</p>
                        <p>If you are not completely satisfied, simply return the items to us in their original condition and packaging within 30 days of receipt and we will issue a credit which can be used to place a new order.</p>

                        <div className='mt-2'>
                          <p className='font-semibold text-[#4d4d4f] text-sm'>Exchanges (Fashion, sportswear and shoes only)</p>
                          <p>The item must be unworn and unused (other than trials) with the original tags still attached. Packaging should be returned in an undamaged condition with the item./</p>
                        </div>

                        <div className='py-3'>
                          <p className='font-semibold mb-2 text-[#4d4d4f] text-sm'>When does this policy not apply?</p>
                          <p>If the item is:</p>
                          <ul className='list-disc pl-4 space-y-2'>
                            <li>older than 30 days
                            </li>


                            <li>opened, unsealed, used or missing any accessories</li>

                            <li>a digital product such as an eBook, electronic voucher, gaming code or other digital downloads;
                            </li>
                            <li>an audio or video recording or computer software that has been unsealed;</li>
                            <li>a newspaper, periodical or magazine;</li>
                            <li>a foodstuff, beverage, or other product intended for everyday consumption;</li>
                            <li>a nursing or maternity product that has been unsealed, including (but not limited to) breast pumps, bottles, formula, maternity underwear, nappies and wipes;</li>
                            <li>a beauty product or fragrance which has been used;</li>
                            <li>a product which has been personalised or made to your specifications.</li>
                          </ul>
                        </div>

                        <p className='font-medium text-[#4d4d4f] text-xs'>Find out more about <Link to="/help-centre" className='text-primary hover:un'>Exchanges & Returns.</Link>

                        </p>

                      </div>
                      <div className="modal-action">
                        <label htmlFor="Exchanges&Returns" className="absolute top-3 right-3 cursor-pointer hover:text-error">
                          <HiXMark className='w-7 h-7' />
                        </label>
                      </div>
                    </div>
                  </div>



                </div>
              </div>

              <div className='w-full lg:w-[30%] flex flex-col gap-4'>
                <div className='bg-white p-5 shadow'>
                  <p className='pt-2 pb-4 text-2xl flex gap-5 items-center font-extrabold'>R {
                    // price * quantity
                    ((price - (price * discountPercentage) / 100) * quantity).toFixed(2)
                  }</p>
                  <div className='flex flex-col items-center justify-center gap-2'>
                    <div className='flex items-center w-full'>
                      <div className='w-full flex items-center justify-between gap-3'>
                        <div className='w-full flex items-center'>
                          <button className='px-2 py-1 border rounded-l   cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed' onClick={() => setQuantity(quantity - 1)} disabled={quantity === 1 ? true : false}><HiMinus className='w-6 h-6' /></button>

                          <input type="text" className='w-12 border-t border-b px-2 py-1 outline-none font-semibold' value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} />

                          <button className='px-2 py-1 border rounded-r cursor-pointer' onClick={() => setQuantity(quantity + 1)}><HiPlus className='w-6 h-6' /></button>
                        </div>

                        <div>
                          <span className='text-sm'>Units</span>
                        </div>

                        <div className='w-full'>
                          <button onClick={handleCart} className="inline-flex items-center justify-center px-3 py-2 gap-1 font-medium border text-sm whitespace-nowrap rounded border-error bg-error text-white hover:opacity-60 transition-all duration-500"> Add to Cart</button>
                        </div>
                      </div>
                      <Drawer
                        open={isOpen}
                        onClose={handleCart}
                        direction='right'
                        className='w-full mr-96 bg-[#F4F4F4] '
                        size="250px"

                      >
                        <div className='w-[700px] bg-white '>
                          <h1 className='text-black text-center p-5 font-bold '>Added to cart</h1>
                          <hr />

                        </div>
                        <div className='w-[700px] bg-[#F4F4F4] p-5'>
                          <div className='w-full bg-white p-5 text-black flex'>
                            <div className=' px-5'>
                              <img className='w-32 border ' src={selectedProducts?.Image_URL[0]} alt="" />
                            </div>
                            <div className='pt-5 flex flex-col justify-between items-start'>
                              <h1 className='font-semibold'>{selectedProducts?.Product_Name}</h1>
                              <Link className='px-8 bg-[#363638] rounded hover:bg-[#373739] py-2 text-white' to="/cart">Go  To Cart</Link>
                            </div>
                          </div>
                          <div className="product-cards w-full my-4 h-full">
                            <h1 className='py-5 text-black font-bold'>Related Products</h1>

                            <Swiper
                              slidesPerView={4}
                              spaceBetween={20}
                              // loop={true}
                              // pagination={{
                              //   clickable: true,
                              // }}
                              navigation={true}
                              modules={[Pagination, Navigation]}
                              className="mySwiper"
                            >

                              {
                                allProducts?.slice(0, 10).map(prod => <SwiperSlide key={prod?._id} className="h-full">

                                  <Link to={`/product-details/${prod?.Product_Name}/${prod?._id}/${prod?.Categories[0]}`} className="w-[200px] flex flex-col gap-2 bg-white px-2 py-3 shadow hover:shadow-xl h-full overflow-visible">

                                    <div className="w-[150px] h-[120px] mx-auto">
                                      <img src={prod?.Image_URL[0]} alt={prod?.Product_Name} className='w-[150px] h-[120px]' />
                                    </div>

                                    <div className="h-[40px] mt-8">
                                      <p className="text-xs font-normal text-[#4d4d4f] overflow-hidden">{prod?.Product_Name.slice(0, 45)}{prod?.Product_Name.length > 50 ? "..." : ""}</p>
                                    </div>

                                    <div className="mt-3 flex flex-col space-y-2">
                                      <p className="font-bold">R 220</p>
                                      <p className=" inline-flex items-center gap-1 text-sm"><HiStar className='h-4 w-4 text-yellow-400' /> <span>4.3</span><span className='font-medium text-gray-600'>(20)</span> <span><IoIosArrowDown className='h-5 w-5 text-gray-500' /></span> </p>
                                    </div>
                                  </Link>

                                </SwiperSlide>)
                              }

                            </Swiper>

                          </div>
                        </div>

                      </Drawer>
                    </div>

                    <button onClick={handleWishList} className="inline-flex items-center justify-center   bg-gray-200 transition-all duration-500 border px-3 py-2 gap-1 font-medium text-xs rounded hover:text-red-500 w-full"><IoMdHeartEmpty className='w-5 h-5' /> Add to Wishlist</button>

                    <button className='px-5 py-4 bg-[#64a638] text-white text-sm font-medium rounded shadow-transparent mt-4 w-full'>Your culminative credits R{totalDiscount}</button>
                  </div>
                </div>



                {/* <div className='bg-white p-5 shadow'>
                  <div className='flex flex-col items-center gap-2 text-left'>
                    <button className='inline-flex w-full border px-3 py-2 gap-4 rounded-xl text-sm items-center'>Under construction</button>
                    <button className='inline-flex w-full border px-3 py-2 gap-4 rounded-xl text-sm items-center'>Under construction</button>

                  </div>

                </div> */}

                <div className='flex flex-col gap-0'>

                  <div className='bg-white p-5'>
                    <p className='text-sm font-bold'>Buy Now, Pay Later</p>
                    <p className='text-xs font-medium'>Choose the option that best suits you, we will prepare
                      your order once payment is confirmed at check out</p>

                  </div>

                  <div className='my-1 bg-white p-3 flex items-start gap-2'>
                    <div className='w-full'>
                      <img src="https://static.takealot.com/images/payment/payflex_logo@2x.png" alt="Tag" />
                    </div>

                    <div>
                      <p className='text-sm font-bold'>R214 x 4 Instalments</p>
                      <p className='text-xs font-medium'>No interest, no fees. Pay in 4 equal instalments, due every 2 weeks</p>
                      <p className='text-[10px]'>You can apply at checkout: All you need is your ID number to confirm eligibility and your debit or credit card. If you qualify, Payflex will charge your card 25% of the purchase price today, and then again every 2 weeks until paid in full.</p>
                    </div>
                  </div>

                  <div className='my-1 bg-white p-3 flex items-start gap-2'>
                    <div className='w-[150px]'>
                      <img src="https://static.takealot.com/images/payment/mobicred_logo@2x.png" alt="Tag" />
                    </div>

                    <div>
                      <p className='text-sm font-bold'>R81 per month x 12 months</p>
                      <p className='text-[10px]'>Including interest charged at 22.25% per year and excluding Mobicred setup and service fees. Annual interest subject to change.</p>
                      <Link to="" className='smallLink text-primary'>Apply Now</Link>
                    </div>
                  </div>

                </div>

                {/* <p className='font-semibold text-[#4d4d4f]'>Other Offers</p>
                <div className='bg-white shadow'>
                  <div className="collapse collapse-plus rounded" >
                    <input type="checkbox" defaultChecked={offerOpen ? true : false} onClick={() => setOfferOpen(!offerOpen)} />
                    <div className="collapse-title text-sm font-semibold bg-[#f4f4f4] border-b border-b-gray-200 rounded">
                      <p>New</p>
                      <div className='py-2 inline-flex gap-1'>
                        <span className='font-normal'>1 offer from</span>
                        <span>R 289</span>
                      </div>
                    </div>
                    <div className={`collapse-content py-2 overflow-y-auto ${offerOpen ? "h-fit" : ""}`}>
                      <div className='w-full flex justify-between items-center'>
                        <p className='font-bold text-xl'>R 289</p>
                        <button className='px-2 py-2 bg-green-700 text-white hover:bg-green-800 transition-all duration-500 inline-flex gap-1 rounded'><HiOutlinePlusSmall className='w-5 h-5' /> <HiShoppingCart className='w-5 h-5' /></button>
                      </div>

                      <div className='mt-3'>
                        <span className='text-[#4d4d4f] font-light text-sm'>Ships in 5 - 7 work days</span>
                        <div className='inline-flex items-center gap-1'>
                          <Link to="/seller/myhome" className='text-xs text-primary hover:underline'>MyHome</Link>
                          <span className='text-gray-500 text-base'><BsDot /></span>
                          <span className='text-xs text-primary hover:underline'>Fulfilled by Takealot</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>




            </div>
          </section>
      }
    </section>

  );
};

export default ProductDetails;