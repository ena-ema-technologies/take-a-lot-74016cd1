import React from 'react';
import { CiNoWaitingSign } from 'react-icons/ci';
import { HiCheck } from 'react-icons/hi2';
import { Link } from 'react-router-dom';

const ReviewShipments = () => {
    return (
        <section className='absolute top-2 left-2'>
            <div className="text-xs breadcrumbs font-medium">
                <ul>
                    <li><Link to="/seller-dashboard/leadtime-orders" className='text-primary'>Leadtime Order</Link></li>
                    <li><Link>Review Shipment</Link></li>
                </ul>
            </div>

            <div className='my-5'>
                <p className='text-sm font-semibold'>Please review the before creating the relevant draft shipment(s)</p>
                <p className='my-2 text-[10px] font-medium text-gray-500'>The product of this page is to allow you to review the shipment(s) that will be created and the relevant Mustake DC Address, based on the products and you indicated in the previous step. Products and orders are spit between Mustake DC's based on our supply chain configuration. Leadtime orders cannot be delivered to a DC of choice and will rejected if they are deliverd to the wrong DC.</p>
            </div>

            <div className='mt-5'>
                <p className='text-sm font-semibold'>Shipment - JHB</p>
            </div>

            <div className='mt-2 bg-white p-4 shadow-md'>
                <div className='w-full flex justify-around text-sm items-start'>
                    <p className='font-medium'>Shipment Name</p>

                    <div className='pl-2 pr-16 py-1 border rounded'>
                        <p className='text-xs'>PO-123456789-28/11/2023</p>
                    </div>

                    <div className='flex items-end justify-between gap-10 text-xs'>
                        <div className='space-y-1'>
                            <p className='font-medium'>Shipment Details</p>
                            <p>Qty Sending</p>
                            <p>Total SKUs</p>
                        </div>

                        <div>
                            <p></p>
                            <p>10</p>
                            <p>10</p>
                        </div>
                    </div>


                    <div className='flex items-end justify-between gap-10 text-xs'>
                        <div className='space-y-1'>
                            <p className='font-medium'>Delivery Address</p>
                            <p>Mustake Warehouse</p>
                            <p>ABCD street</p>
                            <p>Johannesburg</p>
                            <p>1619</p>
                        </div>
                    </div>
                </div>
                <div className="divider"></div>

                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr className='text-xs'>
                                <th>Status</th>
                                <th>Product Title</th>
                                <th>SKU</th>
                                <th>TSIN</th>
                                <th>Stock Days <br /> Cover JHB</th>
                                <th>Stock at <br />Mustake JHB</th>
                                <th>Qty Sending</th>
                                <th>Estimated Stock <br /> Days Cover JHB</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            <tr>
                                <td>Buyable</td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src="/tailwind-css-component-profile-2@56w.png" alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">Hart Hagerty</div>

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
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className='mt-14 w-full lg:w-[95%] flex items-center justify-between'>

                <div className='flex items-center gap-4'>
                    <Link to="/seller-dashboard/leadtime-orders" className='px-5 py-2 rounded bg-neutral text-white text-sm'>Edit</Link>
                    <button className='flex text-xs text-white bg-pink-600 py-2 px-5 rounded gap-1 disabled:opacity-50 disabled:cursor-not-allowed' onClick={() => document.getElementById('my_modal_9').showModal()}><CiNoWaitingSign className='h-4 w-4' /> Cancel Shipment</button>

                    <dialog id="my_modal_9" className="modal">
                        <div className="modal-box">
                            <form method="dialog">
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            </form>
                            <h3 className="font-bold text-sm">Cancel Shipment</h3>

                            <div className='border-t py-3 mt-5 text-center'>
                                <p className='text-sm font-medium'>Are you sure you want to discard this shipment?</p>
                                <p className='my-2 text-sm font-medium'>You will be returned to the Leadtime Order page all selections will be removed</p>
                            </div>

                            <div className='flex'>
                                <Link to="/seller-dashboard/leadtime-orders" className='flex text-xs text-white bg-pink-600 py-2 px-5 rounded gap-1 disabled:opacity-50 disabled:cursor-not-allowed'> Cancel Shipment</Link>
                            </div>
                        </div>
                    </dialog>
                </div>

                <div>
                    <button className='text-sm flex items-center bg-green-500 px-3 py-2 rounded font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed' onClick={() => document.getElementById('my_modal_8').showModal()}><HiCheck className='h-5 w-5' /> Add Orders to Shipping</button>

                    <dialog id="my_modal_8" className="modal">
                        <div className="modal-box">
                            <form method="dialog">
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            </form>
                            <h3 className="font-bold text-sm">Add Leadtime Orders to Draft Shipment JHB | QTY Sending 25</h3>
                            <div className='border-t py-3 mt-5 text-center'>
                                <button className='text-sm border px-4 py-1 border-primary rounded text-primary'>Add to Existing Draft Shipment</button>
                                <div className="divider"></div>
                                <button className='text-sm border px-4 py-1 border-primary rounded text-primary'>Create Draft Shipment</button>
                            </div>
                        </div>
                    </dialog>

                </div>

            </div>

        </section>
    );
};

export default ReviewShipments;