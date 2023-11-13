import React from 'react';
import { HiShoppingCart } from 'react-icons/hi2';
import { IoIosLock } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import useCart from '../../hooks/useCart';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { useContext } from 'react';
import { UserAuth } from '../../Auth/Auth';

const PickupPoint = () => {
    const [carts, refetch] = useCart();
    const {setPickPointData}=useContext(UserAuth)
    const navigate =useNavigate()
    const total = carts.reduce((sum , item)=> parseInt(item.totalPrice) + sum , 0)

    const dataHandler =(data)=>{
        setPickPointData(data)
        navigate("/buy/review")
    }
    return (
        <section className='px-5'>
            <div className='w-full flex items-center justify-between'>

                <p className='font-medium text-xl text-[#4d4d4f]'>Collect</p>

                <p className='inline-flex items-center gap-1'><HiShoppingCart className='text-[#ababaf]' /> <Link to="/cart" className='text-xs font-normal text-primary'>Back to Cart</Link></p>

            </div>
            <div className='md:flex md:justify-between mt-5 '>
                <div className='w-full flex flex-col gap-4 md:mx-10  bg-white px-5 py-6'>
                    <div className='flex justify-between'>
                        <h1 className='text-xl font-bold'>Takealot Pickup Points</h1>
                        <div className='border flex items-center p-2 gap-2 bg-[#F4F4F4]'>
                            <FaMapMarkerAlt className='text-blue-400' />
                            <select className='bg-[#F4F4F4] text-sm' name="" id="">
                                <option value="">All Available Prvinses</option>
                                <option value="">Estern Cape</option>
                                <option value="">Free State</option>
                                <option value="">Gauteng</option>
                                <option value="">Limpoop</option>
                                <option value="">North West</option>
                            </select>
                        </div>
                    </div>
                    {/* todo:make dynamic */}
                    <p className='font-semibold text-[#4D4D4F]'>Free State</p>
                    <div onClick={()=>dataHandler({city_name:"Chiselhurst",location:"East London, Eastern Cape",RoadNo:"28 Manchester Road",street:"Chiselhurst, East London, 5247"})} className='bg-[#F4F4F4] px-5 hover:bg-[#F1F7FB] rounded py-4'>
                        <div className='flex justify-between items-center'>
                            <div className='flex items-center py-5 '>
                                <input type="radio" />
                                <div>
                                    <h1 className='text-xl font-medium text-black'>Chiselhurst</h1>
                                    <h1 className='text-xl font-medium text-black'>East London, Eastern Cape</h1>
                                    <p className='text-xs text-[#4D4D4F] mt-2'>28 Manchester Road</p>
                                    <p className='text-xs text-[#4D4D4F]'>Chiselhurst, East London, 5247</p>
                                </div>
                            </div>
                            <p className='text-sm text-blue-600'>Info</p>
                        </div>
                    </div>
                    <div onClick={()=>dataHandler({city_name:"Hunters Retreat",location:"Port Elizabeth, Eastern Cape",RoadNo:"Erf 15, Hunters Retreat Business Park",street:"Hunters Retreat, Port Elizabeth, 6025"})} className='bg-[#F4F4F4] px-5 hover:bg-[#F1F7FB] rounded py-4'>
                        <div className='flex justify-between items-center'>
                            <div className='flex items-center py-5 '>
                                <input type="radio" />
                                <div>
                                    <h1 className='text-xl font-medium text-black'>Hunters Retreat</h1>
                                    <h1 className='text-xl font-medium text-black'>Port Elizabeth, Eastern Cape</h1>
                                    <p className='text-xs text-[#4D4D4F] mt-2'>Erf 15, Hunters Retreat Business Park</p>
                                    <p className='text-xs text-[#4D4D4F]'>Hunters Retreat, Port Elizabeth, 6025</p>
                                </div>
                            </div>
                            <p className='text-sm text-blue-600'>Info</p>
                        </div>
                    </div>
                    <div onClick={()=>dataHandler({city_name:"Kariega",location:"Kariega, Eastern Cape",RoadNo:"6b Peter Searle Drive",street:"Uitenhage Farms, Kariega, 6229"})} className='bg-[#F4F4F4] px-5 hover:bg-[#F1F7FB] rounded py-4'>
                        <div className='flex justify-between items-center'>
                            <div className='flex items-center py-5 '>
                                <input type="radio" />
                                <div>
                                    <h1 className='text-xl font-medium text-black'>Kariega</h1>
                                    <h1 className='text-xl font-medium text-black'>Kariega, Eastern Cape</h1>
                                    <p className='text-xs text-[#4D4D4F] mt-2'>6b Peter Searle Drive</p>
                                    <p className='text-xs text-[#4D4D4F]'>Uitenhage Farms, Kariega, 6229</p>
                                </div>
                            </div>
                            <p className='text-sm text-blue-600'>Info</p>
                        </div>
                    </div>
                    <div onClick={()=>dataHandler({city_name:"Makhanda",location:"Makhanda, Eastern Cape",RoadNo:"Unit 8 The Workshop",street:"Grahamstown, Makhanda, 6139"})} className='bg-[#F4F4F4] px-5 hover:bg-[#F1F7FB] rounded py-4'>
                        <div className='flex justify-between items-center'>
                            <div className='flex items-center py-5 '>
                                <input type="radio" />
                                <div>
                                    <h1 className='text-xl font-medium text-black'>Makhanda</h1>
                                    <h1 className='text-xl font-medium text-black'>Makhanda, Eastern Cape</h1>
                                    <p className='text-xs text-[#4D4D4F] mt-2'>Unit 8 The Workshop</p>
                                    <p className='text-xs text-[#4D4D4F]'>Grahamstown, Makhanda, 6139</p>
                                </div>
                            </div>
                            <p className='text-sm text-blue-600'>Info</p>
                        </div>
                    </div>


                </div>


            {/* order summary */}


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

export default PickupPoint;