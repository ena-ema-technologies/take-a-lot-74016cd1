import React, { useEffect } from 'react';
import { useState } from 'react';
import { FaBuilding, FaCheck, FaDownload, FaInfo, FaTasks } from 'react-icons/fa';
import { HiMiniBell, HiMiniCog, HiMiniCog8Tooth, HiOutlineClipboardDocumentList, HiXMark } from 'react-icons/hi2';
import { IoIosCard, IoIosSend, IoMdBusiness, IoMdCloudUpload } from 'react-icons/io';
import { IoPeopleCircleOutline, IoPersonCircleOutline } from 'react-icons/io5';
import useSeller from '../../hooks/useSeller';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useProfile from '../../hooks/useProfile';
import moment from 'moment';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
const token = import.meta.env.VITE_IMAGE_TOKEN;

const AccountOverview = () => {
    const [axiosSecure] = useAxiosSecure();
    const [seller, setSeller] = useState({});
    const [userInfo] = useProfile();
    console.log(seller);
    console.log(userInfo);
    const hosting_url = `https://api.imgbb.com/1/upload?key=${token}`
    const { register, formState: { errors }, handleSubmit, reset, formState, watch } = useForm();

    const [tabName, setTabName] = useState("overview")

    useEffect(() => {
        fetchSeller();
    }, [])

    const fetchSeller = async () => {
        const response = await axiosSecure.get(`/get-unauthorized-seller?email=${userInfo?.email}`);
        setSeller(response?.data)
    }


    const onSubmit = async (data) => {
        const image = data?.photo;
        const formData = new FormData();
        formData.append("image", image[0]);
        fetch(hosting_url, {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(async (ResData) => {

                if (ResData) {
                    const newData = {
                        logo: ResData?.data.display_url
                    }

                    const response = await axiosSecure.patch(`/update-seller-logo/${seller?._id}`, newData)
                    if (response?.data?.modifiedCount > 0) {
                        Swal.fire({
                            title: 'Success!',
                            text: 'Logo updated!',
                            icon: 'success',
                            confirmButtonText: 'Cool'
                        })
                    }
                    let modalCheckbox = document.getElementById("my_modal_6");
                    modalCheckbox.checked = false;
                    fetchSeller();

                }
            })

    }

    const handleStopSelling = async (id) => {
        console.log(id);
        const newData = {
            status: "Pending"
        }

        const response = await axiosSecure.patch(`/stop-sell-seller/${id}`, newData)
        if (response?.data?.modifiedCount > 0) {
            Swal.fire({
                title: 'Success!',
                text: 'Your account is hold!',
                icon: 'success',
                confirmButtonText: 'Cool'
            })
        }
    }

    React.useEffect(() => {
        if (formState.isSubmitSuccessful) {
            reset({ something: "" })
        }
    }, [formState, reset])



    return (
        <section className='flex flex-col justify-center w-full'>

            <div className='flex flex-col lg:flex-row w-full items-center justify-between bg-white text-sm lg:w-[91%] mx-auto p-2'>

                <div className='w-full flex items-center gap-3'>
                    <span><FaTasks /> </span>
                    <span className='inline-flex items-center gap-1 font-semibold'><HiMiniCog8Tooth /> Account Overview</span>
                    <span> For {seller?.companyName} ({seller?._id})</span>
                </div>

                <div className='w-full flex items-center gap-4 justify-end'>
                    <p><HiMiniBell className='h-5 w-4' /></p>
                    <p><FaDownload className='h-5 w-4' /></p>
                    <Link to="/" className='bg-primary text-white rounded-full p-1 text-xs'>TK</Link>
                </div>

            </div>

            <div className='flex overflow-auto lg:overflow-hidden w-full lg:w-[91%] mx-auto items-center justify-between text-sm text-neutral border-t border-l border-r'>

                <div onClick={() => setTabName("overview")} className={`px-10 py-3 cursor-pointer inline-flex items-center gap-1 ${tabName === "overview" ? "bg-white border-t-2 border-t-primary text-primary" : ""}`}><HiOutlineClipboardDocumentList className='h-5 w-5' /> Overview</div>

                {/* <div onClick={() => setTabName("settings")} className={`px-10 py-3 cursor-pointer inline-flex items-center gap-1 ${tabName === "settings" ? "bg-white border-t-2 border-t-primary text-primary" : ""}`}><HiMiniCog className='h-5 w-5' /> Settings</div> */}

                <div onClick={() => setTabName("business")} className={`px-10 py-3 cursor-pointer inline-flex items-center gap-1 ${tabName === "business" ? "bg-white border-t-2 border-t-primary text-primary" : ""}`}><IoMdBusiness className='h-5 w-5' /> Business</div>

                <div onClick={() => setTabName("address")} className={`px-10 py-3 cursor-pointer inline-flex items-center gap-1 ${tabName === "address" ? "bg-white border-t-2 border-t-primary text-primary" : ""}`}><IoIosSend className='h-5 w-5' /> Address</div>

                <div onClick={() => setTabName("bankDetails")} className={`px-10 py-3 cursor-pointer inline-flex items-center gap-1 whitespace-nowrap ${tabName === "bankDetails" ? "bg-white border-t-2 border-t-primary text-primary" : ""}`}><IoIosCard className='h-5 w-5' /> Banking Details</div>

                {/* <div onClick={() => setTabName("users")} className={`px-10 py-3 cursor-pointer inline-flex items-center gap-1 whitespace-nowrap ${tabName === "users" ? "bg-white border-t-2 border-t-primary text-primary" : ""}`}><IoPeopleCircleOutline className='h-5 w-5' /> Users</div> */}

                {/* <div onClick={() => setTabName("profile")} className={`px-10 py-3 cursor-pointer inline-flex items-center gap-1 whitespace-nowrap ${tabName === "profile" ? "bg-white border-t-2 border-t-primary text-primary" : ""}`}><IoPersonCircleOutline className='h-5 w-5' /> Profile</div> */}
            </div>



            <div className='w-full lg:w-[91%] mx-auto min-h-screen bg-white'>

                {
                    tabName === "overview" ?
                        // todo:need todo this part dynamic 
                        <div className='mx-5 my-6'>
                            <div className='flex gap-2 items-center'>
                                <img className='w-28' src={seller?.logo} alt="Logo" />
                                <h2 className='text-[#575758] '>{seller?.companyName}</h2>
                            </div>
                            <div className='w-[440px] bg-[#b6e1fb] p-2  rounded-lg flex gap-2 items-center mt-3'>

                                <FaInfo className='text-white  bg-[#1d8ad2] rounded-full text-xl' />
                                <p className='text-sm'>This Account Will Be Charged a Monthly Subscription Fee.</p>
                            </div>
                            <h1 className='text-blue-500 mt-4'>Registration Information</h1>
                            <h2 className='font-bold flex gap-7 items-center mt-2'>Saller Id: <span className='font-normal text-[#4d4d4f]'>{seller?._id}</span></h2>
                            <h2 className='font-bold flex gap-7 items-center mt-2'>Registered: <span className='font-normal text-[#4d4d4f]'>{moment(seller?.date).format("LLL")}</span></h2>
                            <h2 className='font-bold flex gap-7 items-center mt-2'>Status: {seller?.status === "approved" ? <span className='font-bold text-xs flex items-center gap-1 px-2 bg-green-600 text-white rounded'><FaCheck className='bg-white rounded-full text-green-600 font-mono' /> Account Active</span> : <span className='font-bold text-xs flex items-center gap-1 px-2 bg-red-600 text-white rounded'><FaInfo className='bg-white rounded-full text-green-600 font-mono' /> Account Pending</span>}</h2>
                            <div className='flex gap-2 items-center'>

                                <label htmlFor="my_modal_6" className='p-2 bg-blue-600 text-white rounded text-base mt-7'>Change Logo</label>

                                <button className='p-2 bg-red-600 text-white rounded text-base mt-7' onClick={() => handleStopSelling(seller?._id)}>Stop Selling On TakeALot</button>
                            </div>

                            <input type="checkbox" id="my_modal_6" className="modal-toggle" />
                            <div className="modal" role="dialog">
                                <div className="modal-box relative">
                                    <div className="mb-3">
                                        <label
                                            htmlFor="my_modal_6"
                                            className="absolute top-3 right-3 cursor-pointer hover:text-error"
                                        >
                                            <HiXMark className="w-7 h-7" />
                                        </label>
                                    </div>
                                    <h3 className="font-bold text-lg mb-4">Upload your logo!</h3>
                                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col space-y-4 w-full'>
                                        <div className="upload-files-container bg-secondary bg-opacity-20 p-8 rounded-lg flex items-center justify-center flex-col space-y-5  w-[350px] lg:w-full">
                                            <div className="border-2 border-dashed border-primary rounded-lg p-8 w-full text-center flex flex-col items-center">
                                                <label className="text-xl w-full text-center flex flex-col items-center cursor-pointer">
                                                    <IoMdCloudUpload className="w-10 h-10 text-success" />
                                                    <span className="text-primary brandFont">
                                                        <input
                                                            type="file"
                                                            {...register("photo", { required: true })}
                                                            aria-invalid={errors.photo ? "true" : "false"}
                                                            className="default-file-input opacity-0"
                                                            multiple
                                                        />
                                                        <span className="browse-files-text">browse file</span>
                                                        <span> from device</span>
                                                    </span>
                                                </label>
                                            </div>
                                        </div>
                                        {errors.photo?.type === 'required' && <p role="alert" className='text-error font-medium'>Photo is required</p>}

                                        <button type='submit' className='px-4 py-1 border mt-3 rounded text-sm font-semibold border-primary text-primary cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed'>Upload</button>
                                    </form>

                                </div>
                            </div>
                        </div> :
                        tabName === "business" ?
                            <div className='mx-5 my-6 space-y-3'>
                                <p className='font-semibold'>Company Name: <span className='text-primary'>{seller?.companyName}</span></p>

                                <p className='font-semibold'>Category
                                    : <span className='text-primary'>{seller?.category
                                    }</span></p>
                                <p className='font-semibold'>Physical Store

                                    : <span className='text-primary'>{seller?.havePhysicalStore
                                    }</span></p>
                                <p className='font-semibold'>Is VAT Registered
                                    : <span className='text-primary'>{seller?.isVATRegistered
                                    }</span></p>
                                <p className='font-semibold'>Monthly Revenue: <span className='text-primary'>{seller?.monthlyRevenue
                                }</span></p>
                                <p className='font-semibold'>Number of unique products
                                    : <span className='text-primary'>{seller?.uniqueProducts
                                    }</span></p>
                                <p className='font-semibold'>Business Registration Number Or Individual Id
                                    : <span className='text-primary'>{seller?.businessRegNumberOrIndividualId
                                    }</span></p>
                            </div>
                            : tabName === "address" ?
                                <div className='mx-5 my-6 space-y-3'>
                                    <p className='font-semibold'>Address Type
                                        : <span className='text-primary'>{userInfo?.address_type
                                        }</span></p>

                                    <p className='font-semibold'>City & Town
                                        : <span className='text-primary'>{userInfo?.city_town
                                        }</span></p>
                                    <p className='font-semibold'>Complex Or Building
                                        : <span className='text-primary'>{userInfo?.complexOrBuilding
                                        }</span></p>
                                    <p className='font-semibold'>Postal Code
                                        : <span className='text-primary'>{userInfo?.postal_Code
                                        }</span></p>
                                    <p className='font-semibold'>Province: <span className='text-primary'>{userInfo?.province
                                    }</span></p>
                                    <p className='font-semibold'>Street Address
                                        : <span className='text-primary'>{userInfo?.street_Address
                                        }</span></p>
                                    <p className='font-semibold'>suburb: <span className='text-primary'>{userInfo?.suburb
                                    }</span></p>
                                </div> : <div className='mx-5 my-6'>
                                    <p className='font-semibold text-primary'>No Information!</p>
                                </div>
                }

            </div>
        </section>
    );
};

export default AccountOverview;