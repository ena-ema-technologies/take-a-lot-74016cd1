import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useOrders from '../../hooks/useOrders';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const SubmitReturnLog = () => {
    const [allOrders] = useOrders();
    const { orderId, prodId } = useParams();
    const [product, setProduct] = useState({});
    const [orderArr, setOrderArr] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [axiosSecure] = useAxiosSecure();
    const { register, formState: { errors, isSubmitSuccessful }, formState, handleSubmit, reset } = useForm();

    useEffect(() => {
        setLoading(true)
        const order = allOrders?.find(prod => prod?._id === orderId);
        if (order) {
            setOrderArr(order)
            const returnProd = order?.orderedProducts?.find(pd => pd?._id === prodId);
            setProduct(returnProd);
            setLoading(false)
        }
    }, [allOrders, orderId, prodId])

    // console.log(orderArr);
    // console.log(product);

    const onSubmit = async (data) => {

        const returnData = {
            productName: data?.productName,
            totalPrice: data?.totalPrice,
            quantity: product?.quantity,
            productSKU: data?.productSKU,
            PackagedWeight: data?.Packaged_Weight,
            PackagedWidth: data?.PackagedWidth,
            PackagedLength: data?.PackagedLength,
            PackagedHeight: data?.PackagedHeight,
            buyerInformation: product?.buyerInformation,
            orderId: orderArr?._id,
            orderedProductId: product?._id,
            returnIssue: data?.returnIssue,
            status: "In-process",
            date: new Date(),
        }
        const response = await axiosSecure.post("/create-return-request", returnData)
        if (response.data.insertedId) {
            Swal.fire({
                title: 'Success!',
                text: 'Your request submitted successfully!',
                icon: 'success',
                confirmButtonText: 'Cool'
            })
            navigate("/account/create-returns")
        }

    }


    React.useEffect(() => {
        if (formState.isSubmitSuccessful) {
            reset({ something: "" })
        }
    }, [formState, reset])

    return (
        <section>
            <div className="w-full flex justify-between mb-5 text-sm">
                <div className="text-lg font-semibold text-[#4d4d4f]">Submit Return</div>
                <div>
                    <Link to="/account/create-returns" className="bg-primary text-white font-semibold border border-primary px-4 py-2 rounded">Return Page</Link>
                </div>
            </div>



            <div className='mt-20'>
                <form onSubmit={handleSubmit(onSubmit)} className='space-y-5 w-full'>
                    <div className='w-full lg:w-3/4 mx-auto flex flex-col lg:flex-row justify-between gap-6 my-5'>
                        <div className='w-full flex flex-col space-y-1'>
                            <label className='font-semibold'>Name <span className='text-error'>*</span></label>
                            <input type='text' defaultValue={product?.productName} placeholder='Product Name'
                                {...register("productName", { required: true })}
                                aria-invalid={errors.productName ? "true" : "false"}
                                className='inputField2' />
                            {errors.productName?.type === 'required' && <p role="alert" className='text-error font-medium'>Product name is required</p>}
                        </div>

                    </div>
                    <div className='w-full lg:w-3/4 mx-auto flex flex-col lg:flex-row justify-between gap-6 my-5'>
                        <div className='flex flex-col space-y-1 w-full'>
                            <label className='font-semibold'>Price<span className='text-error'>*</span></label>
                            <input type='number' defaultValue={product?.totalPrice} placeholder='Product Price'
                                {...register("totalPrice", { required: true })}
                                aria-invalid={errors.totalPrice ? "true" : "false"}
                                className='inputField2' />
                            {errors.totalPrice?.type === 'required' && <p role="alert" className='text-error font-medium'>Product Price is required</p>}
                        </div>

                        <div className='flex flex-col space-y-1 w-full'>
                            <label className='font-semibold'>SKU <span className='text-error'></span> <span className='text-error'>*</span></label>
                            <input type='text' defaultValue={product?.productSKU} placeholder='Product SKU'
                                {...register("productSKU", { required: true })}
                                aria-invalid={errors.productSKU ? "true" : "false"}
                                className='inputField2' />
                            {errors.productSKU?.type === 'required' && <p role="alert" className='text-error font-medium'>Product SKU is required</p>}
                        </div>

                    </div>

                    <div className='w-full lg:w-3/4 mx-auto flex flex-col lg:flex-row justify-between gap-6 my-5'>
                        <div className='w-full flex flex-col space-y-1'>
                            <label className='font-semibold'>Packaged Height <span className='text-error'>*</span></label>
                            <input type='number' defaultValue={product?.PackagedHeight} placeholder='Packaged Height'
                                {...register("PackagedHeight", { required: true })}
                                aria-invalid={errors.PackagedHeight ? "true" : "false"}
                                className='inputField2' />
                            {errors.PackagedHeight?.type === 'required' && <p role="alert" className='text-error font-medium'>Packaged Height is required</p>}
                        </div>

                        <div className='w-full flex flex-col space-y-1'>
                            <label className='font-semibold'>Packaged Length<span className='text-error'>*</span></label>
                            <input type='number' defaultValue={product?.PackagedLength} placeholder='Packaged Length'
                                {...register("PackagedLength", { required: true })}
                                aria-invalid={errors.PackagedLength ? "true" : "false"}
                                className='inputField2' />
                            {errors.PackagedLength?.type === 'required' && <p role="alert" className='text-error font-medium'>Packaged Length is required</p>}
                        </div>

                        <div className='w-full flex flex-col space-y-1'>
                            <label className='font-semibold'>Packaged Width<span className='text-error'>*</span></label>
                            <input type='number' defaultValue={product?.PackagedWidth} placeholder='Packaged Weight'
                                {...register("PackagedWidth", { required: true })}
                                aria-invalid={errors.PackagedWidth ? "true" : "false"}
                                className='inputField2' />
                            {errors.PackagedWidth?.type === 'required' && <p role="alert" className='text-error font-medium'>Packaged Width is required</p>}
                        </div>



                        <div className='w-full flex flex-col space-y-1'>
                            <label className='font-semibold'>Packaged Weight<span className='text-error'>*</span></label>
                            <input type='number' defaultValue={product?.Packaged_Weight} placeholder='Packaged Width'
                                {...register("Packaged_Weight", { required: true })}
                                aria-invalid={errors.Packaged_Weight ? "true" : "false"}
                                className='inputField2' />
                            {errors.Packaged_Weight?.type === 'required' && <p role="alert" className='text-error font-medium'>Packaged Weight is required</p>}
                        </div>

                    </div>

                    <div className='my-5  w-full flex items-center justify-center'>
                        <div className='flex flex-col space-y-1 w-full lg:w-3/4'>
                            <label className='font-semibold'>Describe your issue <span className='text-error'>*</span></label>
                            <textarea rows={10} cols={5} placeholder='Product Description'
                                {...register("returnIssue", { required: true })}
                                aria-invalid={errors.returnIssue ? "true" : "false"}
                                className='inputField2 w-full' />
                            {errors.returnIssue?.type === 'required' && <p role="alert" className='text-error font-medium'>Product issue is required</p>}
                        </div>

                    </div>

                    <div className='flex items-center justify-center w-full'>
                        <input type="submit" value="Add Product" className='myBtnSec w-full cursor-pointer' />
                    </div>
                </form>
            </div>
        </section>
    );
};

export default SubmitReturnLog;