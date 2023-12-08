import React from 'react';
import DashboardHead from '../../../components/DashboardHead/DashboardHead';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Swal from 'sweetalert2';

const AddProductPage = () => {
    const navigate = useNavigate();
    const { user, loading } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const { register, formState: { errors, isSubmitSuccessful }, formState, handleSubmit, reset } = useForm();
    // console.log(id);

    // console.log(selectedProd);

    const [categoriesArray, setCategoriesArray] = useState(["Add Category"]);
    // console.log(categoriesArray);

    const [imageArray, setImageArray] = useState(["Add Image"]);

    const handleChange = (index, value) => {
        const newArray = [...categoriesArray];
        newArray[index] = value;
        setCategoriesArray(newArray);
    };
    const handleAddCategory = () => {
        setCategoriesArray([...categoriesArray, "Add Category"]);
        // Add a new empty category
    };

    const handleAddImage = () => {
        setImageArray([...imageArray, "Add Image"]);
        // Add a new empty category
    };


    const handleImageChange = (index, value) => {
        const newImageArray = [...imageArray];
        newImageArray[index] = value;
        setImageArray(newImageArray);
    };



    const onSubmit = async (data) => {
        const updatedData = {
            Availabilities: data?.Availabilities,
            Available_Deal: data?.Available_Deal,
            Brand_Name: data?.Brand_Name,
            Categories: categoriesArray.filter(cat => cat !== ""),
            Comments: data?.Comments,
            Description: data?.Description,
            Discount_price: parseFloat(data?.Discount_price),
            Image_URL: imageArray.filter(img => img !== ""),
            Packaged_Height: parseFloat(data?.Packaged_Height),
            Packaged_Length: parseFloat(data?.Packaged_Length),
            Packaged_Weight: parseFloat(data?.Packaged_Weight),
            Packaged_Width: parseFloat(data?.Packaged_Width),
            Product_Name: data?.Product_Name,
            Product_Price: parseFloat(data?.Product_Price),
            Product_SKU_for_Variant: data?.Product_SKU_for_Variant,
            Product_or_Variant: data?.Product_or_Variant,
            Rating: data?.Rating,
            Short_Description: data?.Short_Description,
            Stock_Qty: parseInt(data?.Stock_Qty),
            Video_Link_URL: data?.Video_Link_URL,
            Warranty_Period: parseFloat(data?.Warranty_Period),
            Warranty_Type: data?.Warranty_Type,
            Whats_in_the_Box: data?.Whats_in_the_Box,
            your_own_SKU: data?.your_own_SKU
        }
        console.log(updatedData);

        if (updatedData) {
            const response = await axiosSecure.post("/add-new-product/from-seller", updatedData)
            if (response?.data?.insertedId) {
                console.log(response.data.insertedId);
                reset();
                Swal.fire({
                    title: 'Success!',
                    text: 'Product Added successfully!',
                    icon: 'success',
                    confirmButtonText: 'Cool'
                })
            }
        }

    }

    React.useEffect(() => {
        if (formState.isSubmitSuccessful) {
            reset({ something: "" })
        }
    }, [formState, reset])
    return (
        <section className='w-[99%] relative h-full'>
            <nav className='absolute left-0 right-0 top-0'>
                <DashboardHead title="Add New Products" />
            </nav>


            <div className='mt-20'>
                <form onSubmit={handleSubmit(onSubmit)} className='space-y-5 w-full'>
                    <div className='w-full lg:w-3/4 mx-auto flex flex-col lg:flex-row justify-between gap-6 my-5'>
                        <div className='w-full flex flex-col space-y-1'>
                            <label className='font-semibold'>Name <span className='text-error'>*</span></label>
                            <input type='text' placeholder='Product Name'
                                {...register("Product_Name", { required: true })}
                                aria-invalid={errors.Product_Name ? "true" : "false"}
                                className='inputField2' />
                            {errors.Product_Name?.type === 'required' && <p role="alert" className='text-error font-medium'>Product name is required</p>}
                        </div>

                        <div className='flex flex-col space-y-1 w-full'>
                            <label className='font-semibold'>Price<span className='text-error'>*</span></label>
                            <input type='number' placeholder='Product Price'
                                {...register("Product_Price", { required: true })}
                                aria-invalid={errors.Product_Price ? "true" : "false"}
                                className='inputField2' />
                            {errors.Product_Price?.type === 'required' && <p role="alert" className='text-error font-medium'>Product Price is required</p>}
                        </div>

                        <div className='flex flex-col space-y-1 w-full'>
                            <label className='font-semibold'>Discount price <span className='text-error'></span></label>
                            <input type='text' placeholder='Discount price (If is it)'
                                {...register("Discount_price")}
                                aria-invalid={errors.Discount_price ? "true" : "false"}
                                className='inputField2' />
                            {errors.Discount_price?.type === 'required' && <p role="alert" className='text-error font-medium'>Product popularity is required</p>}
                        </div>

                    </div>

                    <div className='w-full lg:w-3/4 mx-auto flex flex-col lg:flex-row justify-between gap-6 my-5'>
                        <div className='w-full flex flex-col space-y-1'>
                            <label className='font-semibold'>Packaged Height <span className='text-error'>*</span></label>
                            <input type='number' placeholder='Packaged Height'
                                {...register("Packaged_Height", { required: true })}
                                aria-invalid={errors.Packaged_Height ? "true" : "false"}
                                className='inputField2' />
                            {errors.Packaged_Height?.type === 'required' && <p role="alert" className='text-error font-medium'>Packaged Height is required</p>}
                        </div>

                        <div className='w-full flex flex-col space-y-1'>
                            <label className='font-semibold'>Packaged Length<span className='text-error'>*</span></label>
                            <input type='number' placeholder='Packaged Length'
                                {...register("Packaged_Length", { required: true })}
                                aria-invalid={errors.Packaged_Length ? "true" : "false"}
                                className='inputField2' />
                            {errors.Packaged_Length?.type === 'required' && <p role="alert" className='text-error font-medium'>Packaged Length is required</p>}
                        </div>

                        <div className='w-full flex flex-col space-y-1'>
                            <label className='font-semibold'>Packaged Weight<span className='text-error'>*</span></label>
                            <input type='number' placeholder='Packaged Weight'
                                {...register("Packaged_Weight", { required: true })}
                                aria-invalid={errors.Packaged_Weight ? "true" : "false"}
                                className='inputField2' />
                            {errors.Packaged_Weight?.type === 'required' && <p role="alert" className='text-error font-medium'>Packaged Weight is required</p>}
                        </div>



                        <div className='w-full flex flex-col space-y-1'>
                            <label className='font-semibold'>Packaged Width<span className='text-error'>*</span></label>
                            <input type='number' placeholder='Packaged Width'
                                {...register("Packaged_Width", { required: true })}
                                aria-invalid={errors.Packaged_Width ? "true" : "false"}
                                className='inputField2' />
                            {errors.Packaged_Width?.type === 'required' && <p role="alert" className='text-error font-medium'>Packaged Width is required</p>}
                        </div>

                    </div>

                    <div className='w-full lg:w-3/4 mx-auto flex flex-col lg:flex-row justify-between gap-6 my-5'>
                        <div className='w-full flex flex-col space-y-1'>
                            <label className='font-semibold'>Availabilities<span className='text-error'>*</span></label>
                            <input type='text' placeholder='Availabilities'
                                {...register("Availabilities", { required: true })}
                                aria-invalid={errors.Availabilities ? "true" : "false"}
                                className='inputField2' />
                            {errors.Availabilities?.type === 'required' && <p role="alert" className='text-error font-medium'>Availabilities is required</p>}
                        </div>

                        <div className='w-full flex flex-col space-y-1'>
                            <label className='font-semibold'>Available Deal</label>
                            <input type='text' placeholder='Available Deal'
                                {...register("Available_Deal")}
                                aria-invalid={errors.Available_Deal ? "true" : "false"}
                                className='inputField2' />
                            {errors.Available_Deal?.type === 'required' && <p role="alert" className='text-error font-medium'>Available Deal is required</p>}
                        </div>

                        <div className='w-full flex flex-col space-y-1'>
                            <label className='font-semibold'>Brand Name<span className='text-error'>*</span></label>
                            <input type='text' placeholder='Brand Name'
                                {...register("Brand_Name", { required: true })}
                                aria-invalid={errors.Brand_Name ? "true" : "false"}
                                className='inputField2' />
                            {errors.Brand_Name?.type === 'required' && <p role="alert" className='text-error font-medium'>Brand Name is required</p>}
                        </div>


                    </div>

                    <div className='w-full lg:w-3/4 mx-auto flex flex-col lg:flex-row justify-between gap-6 my-5'>
                        <div className='w-full flex flex-col space-y-1'>
                            <label className='font-semibold'>Stock Qty<span className='text-error'>*</span></label>
                            <input type='number' placeholder='Stock Qty'
                                {...register("Stock_Qty", { required: true })}
                                aria-invalid={errors.Stock_Qty ? "true" : "false"}
                                className='inputField2' />
                            {errors.Stock_Qty?.type === 'required' && <p role="alert" className='text-error font-medium'>Stock Qty is required</p>}
                        </div>

                        <div className='w-full flex flex-col space-y-1'>
                            <label className='font-semibold'>Warranty Period<span className='text-error'>*</span></label>
                            <input type='number' placeholder='Warranty Period'
                                {...register("Warranty_Period", { required: true })}
                                aria-invalid={errors.Warranty_Period ? "true" : "false"}
                                className='inputField2' />
                            {errors.Warranty_Period?.type === 'required' && <p role="alert" className='text-error font-medium'>Warranty Period is required</p>}
                        </div>

                        <div className='w-full flex flex-col space-y-1'>
                            <label className='font-semibold'>Warranty Type<span className='text-error'>*</span></label>
                            <input type='text' placeholder='Brand Name'
                                {...register("Warranty_Type", { required: true })}
                                aria-invalid={errors.Warranty_Type ? "true" : "false"}
                                className='inputField2' />
                            {errors.Warranty_Type?.type === 'required' && <p role="alert" className='text-error font-medium'>Warranty Type is required</p>}
                        </div>


                    </div>

                    <div className='w-full lg:w-3/4 mx-auto flex flex-col lg:flex-row justify-between gap-6 my-5'>
                        <div className='w-full flex flex-col space-y-1'>
                            <label className='font-semibold'>Your Own SKU<span className='text-error'>*</span></label>
                            <input type='text' placeholder='Your own SKU'
                                {...register("your_own_SKU", { required: true })}
                                aria-invalid={errors.your_own_SKU ? "true" : "false"}
                                className='inputField2' />
                            {errors.your_own_SKU?.type === 'required' && <p role="alert" className='text-error font-medium'>YourOwn SKU is required</p>}
                        </div>

                        <div className='w-full flex flex-col space-y-1'>
                            <label className='font-semibold'>Product SKU for Variant</label>
                            <input type='text' placeholder='Product SKU for Variant'
                                {...register("Product_SKU_for_Variant")}
                                aria-invalid={errors.Product_SKU_for_Variant ? "true" : "false"}
                                className='inputField2' />
                            {errors.Product_SKU_for_Variant?.type === 'required' && <p role="alert" className='text-error font-medium'>Product SKU for Variant is required</p>}
                        </div>
                    </div>

                    <div className='w-full lg:w-3/4 mx-auto flex flex-col lg:flex-row justify-between gap-6 my-5'>
                        <div className='w-full flex flex-col space-y-1'>
                            <label className='font-semibold'>Product or Variant</label>
                            <input type='text' placeholder='Product or Variant'
                                {...register("Product_or_Variant")}
                                aria-invalid={errors.Product_or_Variant ? "true" : "false"}
                                className='inputField2' />
                            {errors.Product_or_Variant?.type === 'required' && <p role="alert" className='text-error font-medium'>Product or Variant is required</p>}
                        </div>

                        <div className='w-full flex flex-col space-y-1'>
                            <label className='font-semibold'>Video Link URL</label>
                            <input type='url' placeholder='Video Link URL'
                                {...register("Video_Link_URL")}
                                aria-invalid={errors.Video_Link_URL ? "true" : "false"}
                                className='inputField2' />
                            {errors.Video_Link_URL?.type === 'required' && <p role="alert" className='text-error font-medium'>Video Link URL is required</p>}
                        </div>
                    </div>

                    <div className='w-full lg:w-3/4 mx-auto flex flex-col lg:flex-row justify-between gap-6 my-5'>
                        <div className='w-full flex flex-col space-y-1'>
                            <label className='font-semibold'>Short Description<span className='text-error'>*</span></label>
                            <input type='text' placeholder='Short Description'
                                {...register("Short_Description", { required: true })}
                                aria-invalid={errors.Short_Description ? "true" : "false"}
                                className='inputField2' />
                            {errors.Short_Description?.type === 'required' && <p role="alert" className='text-error font-medium'>Short Description is required</p>}
                        </div>

                        <div className='w-full flex flex-col space-y-1'>
                            <label className='font-semibold'>Whats in the Box<span className='text-error'>*</span></label>
                            <input type='text' placeholder='Whats in the Box'
                                {...register("Whats_in_the_Box", { required: true })}
                                aria-invalid={errors.Whats_in_the_Box ? "true" : "false"}
                                className='inputField2' />
                            {errors.Whats_in_the_Box?.type === 'required' && <p role="alert" className='text-error font-medium'>Whats in the Box is required</p>}
                        </div>
                    </div>

                    <div className='w-full lg:w-3/4 mx-auto flex flex-col lg:flex-row justify-between gap-6 my-5'>
                        <div className='w-full flex flex-col space-y-1'>
                            <label className='font-semibold'>Comments</label>
                            <input type='text' placeholder='Product or Variant'
                                {...register("Comments")}
                                aria-invalid={errors.Comments ? "true" : "false"}
                                className='inputField2' />
                            {errors.Comments?.type === 'required' && <p role="alert" className='text-error font-medium'>Comments</p>}
                        </div>

                        <div className='w-full flex flex-col space-y-1'>
                            <label className='font-semibold'>Rating</label>
                            <input type='text' placeholder='Rating'
                                {...register("Rating")}
                                aria-invalid={errors.Rating ? "true" : "false"}
                                className='inputField2' />
                            {errors.Rating?.type === 'required' && <p role="alert" className='text-error font-medium'>Rating is required</p>}
                        </div>
                    </div>

                    <div className='w-full lg:w-3/4 mx-auto flex flex-col lg:flex-row justify-between gap-6 my-5'>
                        <div className='w-full flex flex-col space-y-1'>
                            <label className='font-semibold'>Categories<span className='text-error'>*</span></label>

                            {categoriesArray?.map((category, index) => category === "" ? "" : (
                                <div key={index} className='flex space-x-2'>
                                    <input
                                        key={index}
                                        type="text"
                                        required={true}
                                        value={category}
                                        onChange={(e) => handleChange(index, e.target.value)}
                                        placeholder={`Category ${index + 1}`}
                                        className='inputField2'
                                    />
                                </div>
                            ))}
                            <button type="button" onClick={handleAddCategory} className=" text-xl border w-10 py-1 border-primary text-primary rounded-full mx-auto hover:bg-primary hover:text-white">
                                +
                            </button>

                        </div>
                    </div>

                    <div className='w-full lg:w-3/4 mx-auto flex flex-col lg:flex-row justify-between gap-6 my-5'>
                        <div className='w-full flex flex-col space-y-1'>
                            <label className='font-semibold'>Image URL<span className='text-error'>*</span></label>
                            {imageArray?.map((image, index) => image === "" ? "" : (
                                <div key={index} className='flex space-x-2'>
                                    <input
                                        key={index}
                                        type="text"
                                        required={true}
                                        value={image}
                                        onChange={(e) => handleImageChange(index, e.target.value)}
                                        placeholder={`Image ${index + 1}`}
                                        className='inputField2'
                                    />
                                </div>
                            ))}
                            <button type="button" onClick={handleAddImage} className=" text-xl border w-10 py-1 border-primary text-primary rounded-full mx-auto hover:bg-primary hover:text-white">
                                +
                            </button>
                        </div>
                    </div>



                    <div className='my-5  w-full flex items-center justify-center'>
                        <div className='flex flex-col space-y-1 w-full lg:w-3/4'>
                            <label className='font-semibold'>Description <span className='text-error'>*</span></label>
                            <textarea rows={10} cols={5} placeholder='Product Description'
                                {...register("Description", { required: true })}
                                aria-invalid={errors.Description ? "true" : "false"}
                                className='inputField2 w-full' />
                            {errors.description?.type === 'required' && <p role="alert" className='text-error font-medium'>Product description is required</p>}
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

export default AddProductPage;