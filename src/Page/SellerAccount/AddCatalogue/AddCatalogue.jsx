import React from 'react';
import { Link } from 'react-router-dom';

const AddCatalogue = () => {
    return (
        <div className='w-full lg:w-[99%] mx-auto h-full mt-14'>
            <div className='mb-10 flex items-center justify-between'>
                <div>
                    <h1 className='text-xl font-bold'>Add to Takealot's Catalogue</h1>
                    <p className='text-xs text-primary font-medium'>Do you have required regulatory certification</p>
                </div>

                <div className='text-xs pr-10 flex items-center gap-3'>
                    <Link to="/seller-dashboard/add-new-product" className='bg-neutral text-white px-3 py-2 rounded'>Add a Product</Link>
                    <button className='bg-neutral text-white px-3 py-2 rounded'>Add Products in Bulk</button>
                    <button className='bg-neutral text-white px-3 py-2 rounded'>Upload Loadsheet</button>
                </div>
            </div>
            <div className='bg-white'>

                <div className='border py-3 px-2 w-full'>

                    <div className='w-full items-center justify-between'>
                        <div className='w-full inline-flex items-center gap-2 text-xs font-medium'>
                            <label>Show</label>
                            <select id="selectOption" name="selectOption" className='px-2 py-1 text-sm border rounded'>
                                <option value="10">20</option>
                                <option value="option2">Option 2</option>
                                <option value="option3">Option 3</option>
                            </select>
                            <span>per page</span>
                        </div>
                    </div>

                    <div className="overflow-x-auto mt-5 w-[95%] mx-auto">
                        <table className="table text-xs">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>
                                        <label>
                                            <input type="checkbox" className="checkbox checkbox-xs" />
                                        </label>
                                    </th>
                                    <th>Date Submitted</th>
                                    <th>Status</th>
                                    <th>Submission Name</th>
                                    <th>Submission ID</th>
                                    <th>Products Requested</th>
                                    <th>New Products Created</th>
                                    <th>Existing Products</th>
                                    <th>Products Rejected</th>
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
        </div>
    );
};

export default AddCatalogue;