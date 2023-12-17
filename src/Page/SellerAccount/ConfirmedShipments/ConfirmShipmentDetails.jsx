import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import moment from 'moment';

const ConfirmShipmentDetails = () => {
    const { id } = useParams();
    const [axiosSecure] = useAxiosSecure();
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState({});


    useEffect(() => {
        fetchProducts();
    }, [id]);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await axiosSecure.get(`/confirmed-shipped-details/${id}`);
            setProducts(response.data);
            setLoading(false);

        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };
    console.log(products);

    const totalQty = products?.items_and_buyer_info?.map(prd => prd?.orderedProducts?.reduce((sum, item) => parseInt(item.quantity) + sum, 0))

    const totalLength = products?.orderedProducts?.length

    return (
        <section className='absolute top-2 left-2 w-full'>
            <div className="text-xs breadcrumbs font-medium">
                <ul>
                    <li><Link to="/seller-dashboard/confirmed-shipment" className='text-primary'>Shipments</Link></li>
                    <li><Link>Confirmed Shipments</Link></li>
                </ul>
            </div>

            <div className='w-full flex justify-around text-sm items-start mt-10 bg-white p-4 shadow-md'>
                <div className='flex items-start gap-4'>
                    <div className='space-y-1'>
                        <p className='font-medium'>Shipment Name:</p>
                        <p className='font-medium'>Shipment Date:</p>
                        <p className='font-medium'>Tracking Reference:</p>
                    </div>

                    <div className='pl-2 pr-16 space-y-2'>
                        <p className='text-xs'>{products?.shipmentName}</p>
                        <p className='text-xs'>{moment(products?.date).format("l")}</p>
                        <p className='text-xs'>{products?.tracking_reference}</p>
                    </div>
                </div>

                <div className='flex items-end justify-between gap-10 text-xs'>
                    <div className='space-y-1'>
                        <p className='font-medium'>Shipment Details</p>
                        <p>Qty Sending</p>
                        <p>Qty Required</p>
                        <p>Total SKUs</p>
                    </div>

                    <div>
                        <p></p>
                        <p>{totalQty?.reduce((sum, item) => parseInt(item) + sum, 0)}</p>
                        <p>{totalQty?.reduce((sum, item) => parseInt(item) + sum, 0)}</p>
                        <p>{totalQty?.reduce((sum, item) => parseInt(item) + sum, 0)}</p>
                        <p>{totalLength?.reduce((sum, item) => parseInt(item) + sum, 0)}</p>
                    </div>
                </div>


                <div className='flex items-end justify-between gap-10 text-xs'>
                    <div className='space-y-1'>
                        <p className='font-medium'>Delivery Address</p>
                        <p>Takealot Edenval</p>
                        <p>5 Mountjoy Street</p>
                        <p>Wilbart</p>
                        <p>Johannesburg, 1401</p>
                    </div>
                </div>
            </div>


            <div className='border mt-6 py-3 px-2 w-full bg-white'>


                {
                    loading ? <>
                        <p>Loading</p>
                    </> : <div className="overflow-x-auto mt-5 w-[90%] mx-0">
                        <table className="table text-xs">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>
                                        <label>
                                            <input type="checkbox" className="checkbox checkbox-xs" />
                                        </label>
                                    </th>
                                    <th>Due Date</th>
                                    <th>Product Title</th>
                                    <th>SKU</th>
                                    <th>Qty Required</th>
                                    <th>Qty Sending</th>
                                    <th>MISN</th>
                                </tr>
                            </thead>
                            <tbody className='font-medium'>
                                {
                                    products?.items_and_buyer_info?.map(prd => prd?.orderedProducts?.map(prod => <tr key={prod?._id}>
                                        <th>
                                            <label>
                                                <input type="checkbox" className="checkbox checkbox-xs" />
                                            </label>
                                        </th>
                                        <td>{moment(products?.date).format("l")}</td>
                                        <td>
                                            {products?.items_and_buyer_info?.map(pd => pd?.orderedProducts?.map(item => <p>{item?.productName}</p>))}
                                        </td>

                                        <td>
                                            {products?.items_and_buyer_info?.map(pd => pd?.orderedProducts?.map(item => <p>{item?.productSKU}</p>))}
                                        </td>
                                        <td>
                                            {products?.items_and_buyer_info?.map(pd => pd?.orderedProducts?.map(item => <p>{item?.quantity}</p>))}
                                        </td>
                                        <td>
                                            {products?.items_and_buyer_info?.map(pd => pd?.orderedProducts?.map(item => <p>{item?.quantity}</p>))}
                                        </td>
                                        <td>Null</td>
                                    </tr>))
                                }

                            </tbody>

                        </table>
                    </div>
                }
            </div>
        </section>
    );
};

export default ConfirmShipmentDetails;