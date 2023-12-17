import React, { useEffect, useState } from 'react';
import DashboardHead from '../../../components/DashboardHead/DashboardHead';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { IoIosWarning } from 'react-icons/io';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { HiOutlineChevronRight } from 'react-icons/hi2';

const ConfirmedShipments = () => {

    const [axiosSecure] = useAxiosSecure();
    let currentPage = 1;
    let itemPerPage = 100;
    const [shippedProducts, setShippedProducts] = useState([]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchProducts();
    }, [currentPage, itemPerPage]);

    const fetchProducts = async () => {
        try {

            setLoading(true);
            const confirmShippedProds = await axiosSecure.get(`/confirmed-shipped-products?page=${currentPage}&limit=${itemPerPage}`);
            setShippedProducts(confirmShippedProds.data)
            setLoading(false);

        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };
    return (
        <section className="w-[99%] relative h-full">
            <nav className="absolute left-0 right-0 top-0 lg:w-[99%]">
                <DashboardHead title="Confirmed Shipments" />
            </nav>

            <div className='w-full lg:w-[99%] mx-0 h-full mt-16'>
                <div className='w-full lg:w-[80%] mt-4 flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                        <button className='flex items-center  text-white text-sm bg-orange-400 px-3 rounded-l-full rounded-r-full'><IoIosWarning /> Urgent</button>
                        <button className='flex items-center  text-white text-sm bg-pink-600 px-3 rounded-l-full rounded-r-full'><IoIosWarning /> Late</button>
                    </div>

                </div>



                <div className='border mt-6 py-3 px-2 w-full bg-white'>


                    <div className="overflow-x-auto mt-5 w-[95%] mx-0">
                        {
                            shippedProducts.length > 0 ? <table className="table text-xs">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th>Due Date</th>
                                        <th>Shipment Name</th>
                                        <th>Tracking Reference</th>
                                        <th>Qty Required</th>
                                        <th>Qty Sending</th>
                                        <th>Process Status</th>
                                    </tr>
                                </thead>
                                <tbody className='font-medium'>
                                    {
                                        shippedProducts?.map(prod => <tr key={prod?._id}>
                                            <td>
                                                {moment(prod?.date).format('L')}
                                            </td>

                                            <td>
                                                {prod?.shipmentName}
                                            </td>
                                            <td>
                                                {prod?.tracking_reference}
                                            </td>

                                            <td>
                                                {prod?.items_and_buyer_info?.map(p => p?.orderedProducts?.map(pr => <p className='whitespace-nowrap my-2'>{pr?.quantity
                                                }</p>))}
                                            </td>



                                            <td>
                                                {prod?.items_and_buyer_info?.map(p => p?.orderedProducts?.map(pr => <p className='whitespace-nowrap my-2'>{pr?.quantity
                                                }</p>))}
                                            </td>
                                            <td>
                                                <Link to={`/seller-dashboard/confirmed-shipments-details/${prod?._id}`}><HiOutlineChevronRight className='h-7 w-7 px-1 bg-green-600 text-white' /></Link>
                                            </td>
                                        </tr>)
                                    }

                                </tbody>

                            </table> : <div>No Confirmed Shipments!</div>
                        }
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ConfirmedShipments;