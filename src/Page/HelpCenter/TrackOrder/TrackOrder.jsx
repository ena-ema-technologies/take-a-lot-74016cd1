import React from 'react';
import { Link } from 'react-router-dom';

const TrackOrder = () => {
    return (
        <div>

            <div className='border-2 bg-white p-8 text-sm'>
                <p className='mt-3 mb-6'> We will deliver your order by the Estimated Delivery Date provided in your Payment Confirmation or Order Placed email.</p>

                <p className='py-6'> To track your order: </p>

                <ol type='1'>
                    <li className="hidden lg:block breadcrumbs py-3">
                        <ul>
                            <li>Go to My Account</li>
                            <li><Link className='text-blue-500'>Orders</Link></li>
                        </ul>

                    </li>

                    <li className='py-3'> Choose the order you wish to track </li>
                    <li className='py-3'>Click the <span className='font-bold'> <sup>'</sup> Track <sup>'</sup> </span> button  </li>

                </ol>

                <p className='my-5'> This is the most current tracking information we have for your order. If this date changes, we will let you know as soon as possible via email or SMS. </p>


                <p>    If the estimated delivery date for your order has passed and your tracking information hasn't changed, please select the Contact Us button below.</p>
            </div>

            <div className='w-full bg-white shadow rounded p-4 my-10'>
                        <div className='w-full bg-primary bg-opacity-10 py-5 flex items-center gap-10'>
                            <div>
                                <img src="https://media.takealot.com/help-cms/original_images/____CMS__d0da6dca9d77bd5c950880ccb158ac07bcea8752.png" alt="" className='w-32' />
                            </div>

                            <div className='w-full flex flex-col gap-2 lg:flex-row items-center'>
                                <div className='flex-1'>
                                    <p className='text-lg font-semibold'>Didn't find what you need?</p>
                                </div>

                                <div className='mr-5'>
                                    <button className='text-sm py-2 px-7 border border-primary bg-primary rounded text-white font-semibold'>Contact Us</button>
                                </div>
                            </div>

                        </div>
                    </div>

        </div>
    );
};

export default TrackOrder;