import React from 'react';
import DashboardHead from '../../../components/DashboardHead/DashboardHead';
import { IoSearchOutline } from 'react-icons/io5';
import { HiOutlineDownload } from 'react-icons/hi';
import { HiMiniArrowTopRightOnSquare } from 'react-icons/hi2';

const ProductEditSubmission = () => {
    return (
        <section className='w-[99%] relative h-full'>
            <nav className='absolute left-0 right-0 top-0'>
                <DashboardHead title="Bulk Offers" />
            </nav>

            <div className='mt-16'>
                <p className='text-xl font-bold'>Request Change to Takealot's Catalogue</p>
            </div>


            <div className='mt-8 w-full flex items-center justify-between bg-white py-5 px-4'>

                <div className='w-3/4 flex items-center'>
                    <div>
                        <select id="selectOption" name="selectOption" className='px-4 py-1 text-sm border rounded'>
                            <option value="Product Title">Product Title</option>
                            <option value="SKU">SKU</option>
                            <option value="TSIN">TSIN</option>
                        </select>
                    </div>

                    <div className='w-full relative'>
                        <input type="text" placeholder='Search...' className='w-full border-t border-b border-r px-2 py-1 text-sm placeholder:font-medium placeholder:text-[#000] outline-none' />
                        <IoSearchOutline className='absolute right-4 top-2' />
                    </div>

                </div>

            </div>



            <div className='w-full lg:w-[99%] mx-auto h-full bg-white mt-14'>

                <div className='border py-3 px-2 w-full'>

                    <div className='w-full items-center justify-between'>
                        <div className='w-full inline-flex items-center gap-2 text-xs font-medium'>
                            <label>Show</label>
                            <select id="selectOption" name="selectOption" className='px-2 py-1 text-sm border rounded'>
                                <option value="10">10</option>
                                <option value="option2">Option 2</option>
                                <option value="option3">Option 3</option>
                            </select>
                            <span>per page</span>
                        </div>
                    </div>

                    <div className="overflow-x-auto mt-5 w-[99%] mx-auto">
                        <table className="table text-xs">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>
                                        <label>
                                            <input type="checkbox" className="checkbox checkbox-xs" />
                                        </label>
                                    </th>
                                    <th>Product Details</th>
                                    <th>Date Submitted</th>
                                    <th>Submitted By</th>
                                    <th>Status</th>
                                    <th>Submission Name</th>
                                    <th>Submission ID</th>
                                    <th>Outcome</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                <tr>
                                    <th>
                                        <label>
                                            <input type="checkbox" className="checkbox checkbox-xs" />
                                        </label>
                                    </th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src="/tailwind-css-component-profile-2@56w.png" alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        Null
                                    </td>
                                    <td>Null</td>
                                    <td>Null</td>
                                    <td>Null</td>
                                    <td>Null</td>
                                    <td>Null</td>
                                    <td>Null</td>
                                </tr>
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>


        </section>
    );
};

export default ProductEditSubmission;