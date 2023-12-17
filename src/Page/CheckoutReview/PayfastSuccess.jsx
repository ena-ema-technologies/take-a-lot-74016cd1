import React, { useEffect, useState } from 'react';
import useCart from '../../hooks/useCart';
import { Link } from 'react-router-dom';
import { HiOutlineArrowLeft } from 'react-icons/hi2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import axios from 'axios';

const PayfastSuccess = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [axiosSecure] = useAxiosSecure();
    const [carts, refetch] = useCart();
    console.log(carts);
    const total = carts.reduce((sum, item) => parseInt(item.totalPrice) + sum, 0);

    const newOrders = {
        buyerEmail: carts[0]?.buyerInformation?.email,
        orderedProducts: carts
    }
    console.log(newOrders);

    useEffect(() => {
        handleOrdersAndCartRemove();
    }, [carts])


    const handleOrdersAndCartRemove = async () => {
        try {
            setIsLoading(true);
            if (newOrders?.orderedProducts?.length > 0) {
                const response = await axiosSecure.post("/create-new-confirm-orders", newOrders);
                if (response.data.insertedId) {
                    const deleteRes = await axiosSecure.delete("/delete-user-products-from-cart", {
                        data: { ids: carts.map(product => product._id) },
                        params: { ids: carts.map(product => product._id) }
                    });
                    if (deleteRes.data.deletedCount > 0) {
                        console.log("Deleted!");
                        // refetch();
                    }
                }
                setIsLoading(false);
            }


        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }






    return (
        <div className='w-[80%] mx-auto flex flex-col gap-5'>

            <div className='bg-white px-4 py-6 rounded shadow'>

                <p className='text-[#4d4d4f] text-xl'>Order Summary</p>

                <div className='w-full pb-3 border-b border-dashed border-[#4d4d4f] mt-3 space-y-1'>
                    <div className='w-full flex items-center justify-between'>
                        <p className='text-[#4d4d4f] text-lg font-normal'><span>{carts.length}</span> Items</p>

                        <p className='text-[#4d4d4f] text-lg font-semibold'>R {total}</p>
                    </div>

                    <div className='w-full flex items-center justify-between'>
                        <p className='text-[#4d4d4f] text-lg font-normal'>Delivery</p>

                        <p className='text-[#4d4d4f] text-lg font-semibold'>Free</p>
                    </div>
                </div>

                <div className='flex w-full items-center justify-between mt-2 mb-4'>
                    <p className='text-lg text-[#4d4d4f] font-medium'>TO PAY:</p>

                    <p className='font-semibold text-lg text-[#1c8644]'>R {total}</p>
                </div>


                <div className='flex flex-col items-center w-full mt-6 text-center'>
                    <p className='w-full text-2xl py-3 font-semibold text-green-600'>
                        Payment Successful
                    </p>

                    <Link to="/all" className='text-sm py-3 font-semibold text-white bg-green-700 px-10 inline-flex items-center gap-3'>
                        <HiOutlineArrowLeft className='h-6 w-6' />
                        Back To Shop
                    </Link>
                </div>
            </div>

            <div className='bg-white px-4 py-6 rounded shadow w-full'>
                <div className='flex items-start w-full flex-col'>
                    <p className='text-[#000] text-lg font-semibold'>Items for collection</p>

                    <div className='mt-6'>

                        <div className="overflow-x-auto">
                            <table className="table">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th>Image</th>
                                        <th>Name</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody className='font-medium'>
                                    {carts?.map(item => <tr key={item?._id}>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-16 h-16">
                                                        <img src={item?.productImage} alt="productImage" />
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {item?.productName}
                                        </td>
                                        <td>R {item?.basedPrice} X {item?.quantity}</td>
                                    </tr>)}

                                </tbody>

                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default PayfastSuccess;