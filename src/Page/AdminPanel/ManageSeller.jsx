import React from 'react';
import DashboardHead from '../../components/DashboardHead/DashboardHead';
import { FaTasks } from 'react-icons/fa';
import { HiOutlineUserGroup, HiXMark } from 'react-icons/hi2';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const ManageSeller = () => {
    const [axiosSecure] = useAxiosSecure();

    const { data: allSeller = [], refetch } = useQuery({
        queryKey: ["all-products"],
        queryFn: async () => {
            const res = await axiosSecure.get("/all-seller")
            return res.data;
        }
    })

    console.log(allSeller);

    const handleApprove = async (seller) => {
        const newData = {
            sellerEmail: seller?.sellerEmail,
            sellerName: seller?.sellerFirstName + " " + seller?.sellerLastName
        }
        Swal.fire({
            title: "Are you sure?",
            text: "The seller will be access the seller portal!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, make it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await axiosSecure.patch(`/seller/approval-update/${seller?._id}`, newData);
                if (response?.data?.modifiedCount) {
                    Swal.fire({
                        title: "Success!",
                        text: `${newData?.sellerName} is officially a seller of Mustake!`,
                        icon: "success"
                    });

                    const modal = document.getElementById(seller?._id)
                    modal.checked = false;
                }

            }
        });

        // console.log(newData);
    }

    const handleReject = async (seller) => {
        const newData = {
            sellerEmail: seller?.sellerEmail,
            sellerName: seller?.sellerFirstName + " " + seller?.sellerLastName
        }
        Swal.fire({
            title: "Are you sure?",
            text: "The seller won't be access the seller portal!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, make it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await axiosSecure.patch(`/seller/reject-update/${seller?._id}`, newData);
                if (response?.data?.modifiedCount) {
                    Swal.fire({
                        title: "Success!",
                        text: `${newData?.sellerName} is rejected from Mustake!`,
                        icon: "success"
                    });

                    const modal = document.getElementById(seller?._id)
                    modal.checked = false;
                }

            }
        });
    }

    return (
        <section className="w-[99%] relative h-full">
            <nav className="absolute left-0 right-0 top-0">
                <div className='flex w-full items-center justify-between bg-white text-sm lg:w-[99%] mx-auto px-2 py-4'>
                    <span className='inline-flex items-center gap-3 font-semibold'><HiOutlineUserGroup className='h-5 w-5' /> <span>Manage Seller</span></span>

                </div>
            </nav>

            <div className="overflow-x-auto mt-20">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>ID</th>
                            <th>Email</th>
                            <th>Company</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allSeller?.map((seller, indx) => <tr key={seller?._id} className='font-medium'>
                                <th>{indx + 1}</th>
                                <td>{seller?.sellerUniqueId ? seller?.sellerUniqueId : "Null"}</td>
                                <td>{seller?.sellerEmail}</td>
                                <td>{seller?.companyName}</td>
                                <td>
                                    <label htmlFor={seller?._id} className="bg-primary px-4 py-1 rounded text-white">See</label>
                                    <input type="checkbox" id={seller?._id} className="modal-toggle" />
                                    <div className="modal" role="dialog">
                                        <div className="modal-box">
                                            <h3 className="font-bold text-lg">Account Info of {seller?.sellerFirstName} {seller?.sellerLastName}</h3>
                                            <div className='my-4'>
                                                <div className='space-y-1'>
                                                    <p className='font-semibold'>Category
                                                        : <span className='text-primary'>{seller?.category ? seller?.category : "Null"
                                                        }</span></p>
                                                    <p className='font-semibold'>Your Brands
                                                        : <span className='text-primary'>{seller?.allYourBrands ? seller?.allYourBrands : "Null"
                                                        }</span></p>
                                                    <p className='font-semibold'>Seller phone number
                                                        : <span className='text-primary'>{seller?.sellerPhoneNumber ? seller?.sellerPhoneNumber : "Null"
                                                        }</span></p>
                                                    <p className='font-semibold'>Seller mobile number
                                                        : <span className='text-primary'>{seller?.sellerMobileNumber ? seller?.sellerMobileNumber : "Null"
                                                        }</span></p>
                                                    <p className='font-semibold'>Physical Store

                                                        : <span className='text-primary'>{seller?.havePhysicalStore
                                                        }</span></p>
                                                    <p className='font-semibold'>Is VAT Registered
                                                        : <span className='text-primary'>{seller?.isVATRegistered
                                                        }</span></p>
                                                    <p className='font-semibold'>VAT Number
                                                        : <span className='text-primary'>{seller?.VATNumber ? seller?.VATNumber : "Null"
                                                        }</span></p>
                                                    <p className='font-semibold'>Monthly Revenue: <span className='text-primary'>{seller?.monthlyRevenue
                                                    }</span></p>
                                                    <p className='font-semibold'>Number of unique products
                                                        : <span className='text-primary'>{seller?.uniqueProducts
                                                        }</span></p>
                                                    <p className='font-semibold'>Business Registration Number Or Individual Id
                                                        : <span className='text-primary'>{seller?.businessRegNumberOrIndividualId
                                                        }</span></p>
                                                    <p className='font-semibold'>Is South Africa Based
                                                        : <span className='text-primary'>{seller?.isSouthBased
                                                        }</span></p>
                                                    <p className='font-semibold'>Source of stock
                                                        : <span className='text-primary'>{seller?.sourceOfStock
                                                        }</span></p>
                                                    <p className='font-semibold'>Do supply retail outlets
                                                        : <span className='text-primary'>{seller?.supplyRetailOutlets
                                                        }</span></p>
                                                    <p className='font-semibold'>Do carry Stock
                                                        : <span className='text-primary'>{seller?.carryStock
                                                        }</span></p>
                                                    <p className='font-semibold'>Do sell hand-crafted items
                                                        : <span className='text-primary'>{seller?.sell_hand_crafted_items
                                                        }</span></p>
                                                </div>
                                            </div>
                                            <div className="modal-action">
                                                <button onClick={() => handleApprove(seller)} disabled={seller?.status === "approved" ? true : false} className='px-2 py-1 rounded bg-green-600 text-white font-medium hover:bg-green-900 cursor-pointer duration-300 transition-all disabled:opacity-40 disabled:cursor-not-allowed'>Approve</button>
                                                <button onClick={() => handleReject(seller)} disabled={seller?.status === "rejected" ? true : false} className='px-2 py-1 rounded bg-red-600 text-white font-medium hover:bg-red-900 cursor-pointer duration-300 transition-all disabled:opacity-40 disabled:cursor-not-allowed'>Reject</button>
                                                <label
                                                    htmlFor={seller?._id}
                                                    className="absolute top-3 right-3 cursor-pointer hover:text-error"
                                                >
                                                    <HiXMark className="w-7 h-7" />
                                                </label>

                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>


        </section>
    );
};

export default ManageSeller;