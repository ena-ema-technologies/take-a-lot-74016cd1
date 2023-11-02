import React from 'react';
import { Link } from 'react-router-dom';

const ChangeAddress = () => {
    return (
        <section>
            <div className='bg-white p-8 text-sm'>
                <p className='pb-6'>
                    Changing your delivery address after placing an order is not possible. If you are not available <br /> to receive your order at your original delivery address, you are able to reschedule~ your delivery date here should your order be  eligible, otherwise select the Contact Us button below.
                </p>

                <p className='py-9'>
                    To change your delivery address permanently for future orders, you can update your address under
                    <span className="hidden lg:block breadcrumbs py-3">
                        <ul>
                            <li>My Account</li>
                            <li><Link className='text-blue-500'>Address Book.</Link></li>
                        </ul>

                    </span></p>

            </div>

            {/* contact */}

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


            <h1 className='my-14 font-bold text-2xl'> Related Topics </h1>

            {/* accordion part */}

            <div className="join join-vertical w-full bg-white">
                <div className="collapse collapse-arrow join-item border py-3">
                    <input type="radio" name="my-accordion-4" />
                    <Link className="collapse-title text-lg font-medium hover:underline hover:text-blue-500">
                        Reschedule your delivery
                    </Link>
                </div>
                <div className="collapse collapse-arrow join-item border py-3">
                    <input type="radio" name="my-accordion-4" />
                    <Link className="collapse-title text-lg font-medium hover:underline hover:text-blue-500">
                        How do I cancel my order ?
                    </Link>
                </div>
            </div>


        </section>
    );
};

export default ChangeAddress;