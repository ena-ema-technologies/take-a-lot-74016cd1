import React, { useEffect, useState } from 'react';
import { CiNoWaitingSign } from 'react-icons/ci';
import { HiCheck } from 'react-icons/hi2';
import { Link, useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useProfile from '../../../hooks/useProfile';
import axios from 'axios';
import Swal from 'sweetalert2';

const token = import.meta.env.VITE_SHIPPING_TOKEN

const ReviewShipments = () => {
    const [userInfo] = useProfile();
    console.log(userInfo);
    const [selectCheck, setSelectCheck] = useState(false);
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState("")
    const [axiosSecure] = useAxiosSecure();

    const [showItemPerPage, setShowItemPerPage] = useState(100);
    const [products, setProducts] = useState([]);
    const [mainProducts, setMainProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalProducts, setTotalProducts] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const itemPerPage = showItemPerPage;
    const totalPage = Math.ceil(totalProducts / itemPerPage);
    const pagesToShow = 5;
    const pageRangeStart = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
    const pageRangeEnd = Math.min(totalPage, pageRangeStart + pagesToShow - 1);



    const handleReviewShipments = () => {
        navigate("/seller-dashboard/review-seller-shipment-details")
    }

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    useEffect(() => {
        fetchProducts();
    }, [currentPage, itemPerPage, searchText]);

    const fetchProducts = async () => {
        try {

            setLoading(true);
            const response = await axiosSecure.get(`/leadtime-orders-for-seller?page=${currentPage}&limit=${itemPerPage}`);
            setProducts(response.data);


            setLoading(false);

        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const findStockOfProducts = async () => {
        try {
            const prodRes = await axiosSecure.get("/find-product-stock-for-leadtime", {
                data: { ids: products?.map(product => product?.orderedProducts?.map(prod => prod?.productId)) },
                params: { ids: products?.map(product => product?.orderedProducts?.map(prod => prod?.productId)) }
            });
            setMainProducts(prodRes.data)

        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchTotalOrders();
        findStockOfProducts();
    }, [products])
    console.log(products);
    console.log(mainProducts);


    const fetchTotalOrders = async () => {
        const result = await axiosSecure.get("/total-orders")
        setTotalProducts(result.data.totalProduct)
    }

    const totalQty = products?.map(prod => prod?.orderedProducts?.reduce((sum, item) => parseInt(item.quantity) + sum, 0))

    const totalLength = products?.map(prod => prod?.orderedProducts?.length)
    // console.log(totalQty);

    function createUniqueNumber(obj) {
        const currentDate = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -5); // Remove non-digit characters from date
        const lastThreeDigits = obj._id.slice(-3).replace(/[^0-9]/g, ''); // Extract the last three digits from _id and remove non-numeric characters
        const uniqueNumberString = `${lastThreeDigits}${currentDate}`;
        console.log(uniqueNumberString); // Debug: print the generated string
        return /^\d+$/.test(uniqueNumberString) ? BigInt(uniqueNumberString) : null;
    }

    const uniqueNumbers = products.map(createUniqueNumber).filter(value => value !== null).join("");

    if (uniqueNumbers.length > 0) {
        console.log(uniqueNumbers);
    } else {
        console.log("Unable to generate unique numbers.");
    }


    // console.log(uniqueNumbers);



    const handleSipping = async () => {

        const checkRatesData = {
            collection_address: {
                company: userInfo?.businessName,
                street_address: userInfo?.street_Address,
                local_area: userInfo?.suburb,
                city: userInfo?.city_town,
                zone: userInfo?.province,
                country: 'ZA',
                code: userInfo?.postal_Code,
            },
            delivery_address: {
                company: "Mustake",
                street_address: "8 Dale Crescent Table View",
                local_area: "",
                city: "Cape Town",
                zone: "WC",
                country: "ZA",
                code: "7441"
            },
            parcels: products?.map(prod => prod?.orderedProducts?.map(details => {
                return {
                    parcel_description: details.productName,
                    submitted_length_cm: details.PackagedLength,
                    submitted_width_cm: details.PackagedWidth,
                    submitted_height_cm: details.PackagedHeight,
                    submitted_weight_kg: details.Packaged_Weight / 1000,
                }
            })).flat(),
            declared_value: 1500,
            timeout: 10000
        }

        const getRates = await axios.post("https://api.sandbox.bobgo.co.za/v2/rates", checkRatesData, {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json',
            }
        })
        // console.log(getRates.data);

        const data = {
            timeout: 20000,
            collection_address: {
                company: userInfo?.businessName,
                street_address: userInfo?.street_Address,
                local_area: userInfo?.suburb,
                city: userInfo?.city_town,
                zone: userInfo?.province,
                country: 'ZA',
                code: userInfo?.postal_Code,
            },
            collection_contact_company: userInfo?.businessName,
            collection_contact_name: userInfo?.recipient_Name,
            collection_contact_mobile_number: userInfo?.mobile_Number,
            collection_contact_email: userInfo?.email,
            delivery_address: {
                company: "Mustake",
                street_address: "8 Dale Crescent Table View",
                local_area: "",
                city: "Cape Town",
                zone: "WC",
                country: "ZA",
                code: "7441"
            },
            delivery_contact_company: "Mustake",
            delivery_contact_name: "Mustake Admin",
            delivery_contact_mobile_number: "",
            delivery_contact_email: "mustake.za@gmail.com",
            parcels: products?.map(prod => prod?.orderedProducts?.map(details => {
                return {
                    parcel_description: details.productName,
                    submitted_length_cm: details.PackagedLength,
                    submitted_width_cm: details.PackagedWidth,
                    submitted_height_cm: details.PackagedHeight,
                    submitted_weight_kg: details.Packaged_Weight / 1000,
                }
            })).flat(),
            declared_value: 0,
            custom_tracking_reference: uniqueNumbers,
            custom_order_number: uniqueNumbers,
            instructions_collection: "Test collection",
            instructions_delivery: "Test delivery",
            service_level_code: "ECO",
            provider_slug: "sandbox",
            collection_min_date: "2021-05-20T14:00:00.000+00:00",
            collection_after: "08:00",
            collection_before: "16:00"
        }

        // console.log(data);
        if (getRates.data) {
            const result = await axios.post("https://api.sandbox.bobgo.co.za/v2/shipments", data, {
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json',
                }
            })

            console.log(result.data);
            if (result.data.submission_status === "success") {
                const newData = {
                    shipmentName: uniqueNumbers,
                    items_and_buyer_info: products,
                    date: new Date(),
                    tracking_reference: result?.data?.tracking_reference,
                    charged_shipping_amount: result?.data?.charged_amount,
                    billing_transactions: result?.data?.billing_transactions
                };
                // console.log(newData);
                const response = await axiosSecure.post("/add-data-into-confirm-shipment", newData, {
                    params: { ids: products.map(product => product._id) }
                })
                if (response.data.insertedId && response.data.deletedCount > 0) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Shipment placed successfully!',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    })
                    navigate("/seller-dashboard/confirmed-shipment")
                }
            }
        }

    }




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
                        <p className='text-xs'>{uniqueNumbers}</p>
                    </div>

                    <div className='flex items-end justify-between gap-10 text-xs'>
                        <div className='space-y-1'>
                            <p className='font-medium'>Shipment Details</p>
                            <p>Qty Sending</p>
                            <p>Total SKUs</p>
                        </div>

                        <div>
                            <p></p>
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
                <div className="divider"></div>

                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr className='text-xs'>
                                <th>Status</th>
                                <th>Product Title</th>
                                <th>SKU</th>
                                <th>Stock Days <br /> Cover JHB</th>
                                <th>Stock at <br />Mustake</th>
                                <th>Qty Sending</th>
                                <th>Estimated Stock <br /> Days Cover JHB</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                products?.map(prod => <tr key={prod?._id}>
                                    <td>Buyable</td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className='flex flex-col'>
                                                {
                                                    prod?.orderedProducts?.map(p => <div className="avatar" key={p?._id}>
                                                        <div className="mask mask-squircle w-12 h-12">
                                                            <img src={p?.productImage} alt="Avatar Tailwind CSS Component" />
                                                        </div>
                                                    </div>)
                                                }
                                            </div>
                                            <div className='flex flex-col space-y-2'>
                                                {
                                                    prod?.orderedProducts?.map(p => <div className="font-bold" key={p?._id}>{p?.productName}</div>)
                                                }

                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {prod?.orderedProducts?.map(p => <p className='whitespace-nowrap my-2 font-medium'>{p?.productSKU
                                        }</p>)}
                                    </td>
                                    <td> {mainProducts?.map(p => <p className='whitespace-nowrap my-2'>{p?.Stock_Qty
                                    }</p>)}</td>
                                    <td> {mainProducts?.map(p => <p className='whitespace-nowrap my-2'>{p?.Stock_Qty
                                    }</p>)}</td>
                                    <td>{prod?.orderedProducts?.map(p => <p className='whitespace-nowrap my-2 font-medium'>{p?.quantity

                                    }</p>)}</td>
                                    <td>Null</td>
                                </tr>)
                            }

                        </tbody>
                    </table>
                </div>
            </div>

            <div className='my-14 w-full lg:w-[95%] flex items-center justify-between'>

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
                    <button className='text-sm flex items-center bg-green-500 px-3 py-2 rounded font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed' onClick={handleSipping}><HiCheck className='h-5 w-5' /> Create Shipment</button>

                </div>

            </div>

        </section>
    );
};

export default ReviewShipments;