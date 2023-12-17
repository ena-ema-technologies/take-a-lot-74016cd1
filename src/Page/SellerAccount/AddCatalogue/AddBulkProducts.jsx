import React from 'react';
import DashboardHead from '../../../components/DashboardHead/DashboardHead';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const AddBulkProducts = () => {
    const [axiosSecure] = useAxiosSecure();
    const { register, formState: { errors, isSubmitSuccessful }, formState, handleSubmit, reset } = useForm();


    const onSubmit = async (data) => {
        const csvFile = data.csvData[0];
        console.log(csvFile);

        const formData = new FormData();
        formData.append("csvData", csvFile);

        try {
            const response = await axiosSecure.post('/bulk/upload', formData);
            if (response?.data?.success) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Bulk Uploaded successfully',
                    icon: 'success',
                    confirmButtonText: 'Cool'
                })
            }
        } catch (error) {
            console.error('Error uploading data:', error);
        }
    }
    return (
        <section className='w-[99%] relative h-full'>
            <nav className='absolute left-0 right-0 top-0'>
                <DashboardHead title="Add Bulk Products" />
            </nav>


            <div className='flex items-center justify-center min-h-screen'>
                <form onSubmit={handleSubmit(onSubmit)} className='space-y-5 w-full' encType="multipart/form-data">
                    <div className='w-3/4 mx-auto flex flex-col space-y-1'>
                        <label className='font-semibold'>Upload Your CSV file <span className='text-error'>*</span></label>
                        <input
                            type='file'
                            placeholder='CSV File'
                            {...register("csvData", { required: true })}
                            aria-invalid={errors.csvData ? "true" : "false"}
                            name="csvData"
                            className='inputField2'
                        />
                        {errors.csvData?.type === 'required' && <p role="alert" className='text-error font-medium'>CSV data is required</p>}
                    </div>
                    <div className='flex items-center justify-center w-full'>
                        <input type="submit" value="Upload" className='myBtnSec w-full cursor-pointer' />
                    </div>
                </form>
            </div>
        </section>
    );
};

export default AddBulkProducts;