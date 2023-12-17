import React from 'react';
import { Link } from 'react-router-dom';
import useOrders from '../../hooks/useOrders';
import emptyIcon from '../../assets/icons/empty-order-icon.svg-6bcc4601443c5d44b8ae.svg'
import useUserReturn from '../../hooks/useUserReturn';

const CreateReturn = () => {
    const [allOrders] = useOrders();
    const [returnsData] = useUserReturn();
    console.log(returnsData);
    return (
        <section>
            <div className="w-full flex justify-between mb-5 text-sm">
                <div className="text-lg font-semibold text-[#4d4d4f]">Create Return</div>
                <div>
                    <Link to="/all" className="bg-primary text-white font-semibold border border-primary px-4 py-2 rounded">Back To Shop</Link>
                </div>
            </div>

            <div className="text-center space-y-4 bg-white py-14 mt-4 text-sm">
                {
                    allOrders.length > 0 ? <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Product Name</th>
                                    <th>Quantity & Price</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allOrders?.map(orders => orders?.orderedProducts?.map((pd) => <tr key={pd?._id} className='font-medium'>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-14 h-14">
                                                    <img src={pd?.productImage} alt="Product Image" />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {pd?.productName}
                                    </td>
                                    <td>{pd?.totalPrice} X {pd?.quantity}</td>
                                    <td>
                                        {
                                            returnsData?.find(prd =>
                                                prd?.orderedProductId === pd?._id && prd?.orderId === orders?._id) ? <p>Submitted</p> : <Link to={`/account/submit-returns/${orders?._id}/${pd?._id}`} className='bg-primary px-2 py-1 rounded text-white'>Create Log</Link>
                                        }
                                    </td>
                                </tr>))}

                            </tbody>
                        </table>
                    </div> : <div>
                        <img className="avatar rounded-full border p-2 shadow-lg" src={emptyIcon} alt="" />
                        <p>You have no ordered products</p>
                        <button className="bg-primary text-white font-semibold border border-primary px-4 py-2 rounded">Start Shopping</button>
                    </div>
                }


            </div>
        </section>
    );
};

export default CreateReturn;