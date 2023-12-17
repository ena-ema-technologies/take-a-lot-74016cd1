import React, { useEffect } from 'react';
import { useState } from 'react';
import DashboardHead from '../../../components/DashboardHead/DashboardHead';
import { IoIosWarning } from 'react-icons/io';
import { CiNoWaitingSign } from 'react-icons/ci';
import { HiCheck, HiMiniChevronDoubleLeft, HiMiniChevronDoubleRight, HiOutlineChevronRight } from 'react-icons/hi2';
import { Link, useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import axios from 'axios';
import moment from 'moment';

const LeadtimeOrders = () => {
  const [tabName, setTabName] = useState("Leadtime Orders");
  const [selectCheck, setSelectCheck] = useState(false);
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("")
  const [axiosSecure] = useAxiosSecure();

  const [showItemPerPage, setShowItemPerPage] = useState(100);
  const [products, setProducts] = useState([]);
  const [shippedProducts, setShippedProducts] = useState([]);
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
      const confirmShippedProds = await axiosSecure.get(`/confirmed-shipped-products?page=${currentPage}&limit=${itemPerPage}`);
      setShippedProducts(confirmShippedProds.data)
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


  const fetchTotalOrders = async () => {
    const result = await axiosSecure.get("/total-orders")
    setTotalProducts(result.data.totalProduct)
  }

  console.log(shippedProducts);


  return (
    <section className='w-[95%] relative h-full'>
      <nav className='absolute left-0 right-0 top-0'>
        <DashboardHead title={tabName} />
      </nav>


      <div className='flex overflow-auto lg:overflow-hidden w-full lg:w-[99%] mx-0 items-center justify-start text-sm text-neutral border-t border-l border-r mt-16'>

        <div onClick={() => setTabName("Leadtime Orders")} className={`px-10 py-3 cursor-pointer inline-flex items-center gap-1 ${tabName === "Leadtime Orders" ? "bg-white border-t-2 border-t-primary text-primary" : ""}`}>Leadtime Orders</div>

        <div onClick={() => setTabName("Draft Shipments")} className={`px-10 py-3 cursor-pointer inline-flex items-center gap-1 ${tabName === "Draft Shipments" ? "bg-white border-t-2 border-t-primary text-primary" : ""}`}>Draft Shipments</div>

        <div onClick={() => setTabName("Confirmed Shipments")} className={`px-10 py-3 cursor-pointer inline-flex items-center gap-1 ${tabName === "Confirmed Shipments" ? "bg-white border-t-2 border-t-primary text-primary" : ""}`}>Confirmed Shipments</div>

        <div onClick={() => setTabName("Shipped Shipments")} className={`px-10 py-3 cursor-pointer inline-flex items-center gap-1 ${tabName === "Shipped Shipments" ? "bg-white border-t-2 border-t-primary text-primary" : ""}`}>Shipped Shipments</div>

      </div>


      {
        tabName === "Leadtime Orders"
          ?
          <div className='w-full lg:w-[99%] mx-0 h-full'>
            <div className='w-full lg:w-[80%] mt-4 flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <button className='flex items-center  text-white text-sm bg-orange-400 px-3 rounded-l-full rounded-r-full'><IoIosWarning /> Urgent</button>
                <button className='flex items-center  text-white text-sm bg-pink-600 px-3 rounded-l-full rounded-r-full'><IoIosWarning /> Late</button>
              </div>

              <div className='flex items-center gap-2'>
                <div className="pagination inline-flex items-center justify-center w-full">
                  {currentPage > 5 && (
                    <button onClick={() => handlePageChange(currentPage - 5)} className='border border-primary rounded-md hover:bg-primary hover:text-white font-semibold px-3 py-1 inline-flex items-center gap-1 mr-2'><HiMiniChevronDoubleLeft className='h-6 w-6' /> <span></span></button>
                  )}

                  {Array.from({ length: pageRangeEnd - pageRangeStart + 1 }).map((_, index) => {
                    const page = pageRangeStart + index;
                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`border py-1 px-3 mr-2 rounded-md hover:bg-primary hover:text-white font-semibold my-5 ${page === currentPage ? "bg-primary text-white" : ""
                          }`}
                      >
                        {page}
                      </button>
                    );
                  })}

                  {currentPage < totalPage - 4 && (
                    <button onClick={() => handlePageChange(currentPage + 5)} className='border border-primary rounded-md hover:bg-primary hover:text-white font-semibold px-3 py-1 inline-flex items-center gap-1'><span></span> <HiMiniChevronDoubleRight className='h-6 w-6' /></button>
                  )}
                </div>
              </div>

              <div>
                <div className='w-full inline-flex items-center gap-2 text-xs font-medium'>
                  <label>Show</label>
                  <select id="selectOption" name="selectOption" className='px-2 py-1 text-sm border rounded' onChange={(e) => setShowItemPerPage(e.target.value)}>
                    <option value="100">100</option>
                    <option value="150">150</option>
                    <option value="200">200</option>
                    <option value="250">250</option>
                    <option value="300">300</option>
                  </select>
                  <span>per page</span>
                </div>
              </div>

            </div>



            <div className='border mt-6 py-3 px-2 w-full bg-white'>


              <div className="overflow-x-auto mt-5 w-[80%] mx-0">
                {
                  products.length > 0 ? <table className="table text-xs">
                    {/* head */}
                    <thead>
                      <tr>
                        <th>
                          <label>
                            <input type="checkbox" className="checkbox checkbox-xs" onClick={() => setSelectCheck(!selectCheck)} />
                          </label>
                        </th>
                        <th>Due Date</th>
                        <th>Product Title</th>
                        <th>SKU</th>
                        <th>Order ID</th>
                        <th>Qty Required</th>
                        <th>Stock at <br /> Mustake</th>
                        <th>Qty Sending</th>
                        <th>Status</th>
                        <th>Info</th>
                      </tr>
                    </thead>
                    <tbody className='font-medium'>
                      {
                        products?.map(prod => <tr key={prod?._id}>
                          <th>
                            <label>
                              <input type="checkbox" className="checkbox checkbox-xs" defaultChecked={selectCheck} />
                            </label>
                          </th>
                          <td>
                            {moment(prod?.purchaseDate).format('L')}
                          </td>

                          <td>
                            {prod?.orderedProducts?.map(p => <p className='whitespace-nowrap my-2'>{p?.productName
                            }</p>)}
                          </td>



                          <td>
                            {prod?.orderedProducts?.map(p => <p className='whitespace-nowrap my-2'>{p?.productSKU
                            }</p>)}
                          </td>


                          <td>{prod?._id}</td>


                          <td>
                            {prod?.orderedProducts?.map(p => <p className='whitespace-nowrap my-2'>{p?.quantity
                            }</p>)}
                          </td>

                          <td>
                            {mainProducts?.map(p => <p className='whitespace-nowrap my-2'>{p?.Stock_Qty
                            }</p>)}
                          </td>

                          <td>
                            {prod?.orderedProducts?.map(p => <p className='whitespace-nowrap my-2'>{p?.quantity
                            }</p>)}
                          </td>

                          <td className='whitespace-nowrap'>{prod?.status}</td>
                          <td>Null</td>
                        </tr>)
                      }

                    </tbody>

                  </table> : <div>No Order!</div>
                }
              </div>
            </div>

            <div className='mt-14 w-full lg:w-[80%] flex items-center justify-between'>

              <div className='flex items-center gap-4'>
                <p className='text-sm font-medium'>0 rows selected</p>
                <button disabled={!selectCheck} className='flex text-xs text-white bg-gray-500 py-2 px-5 rounded gap-1 disabled:opacity-50 disabled:cursor-not-allowed' onClick={() => document.getElementById('my_modal_4').showModal()}><CiNoWaitingSign className='h-4 w-4' /> Cancel Customer Order</button>

                <dialog id="my_modal_4" className="modal">
                  <div className="modal-box">
                    <form method="dialog">
                      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg">Hello!!</h3>
                    <p className="py-4">Press ESC key or click on ✕ button to close</p>
                  </div>
                </dialog>
              </div>

              <div>
                <button disabled={!selectCheck} className='text-sm flex items-center bg-green-500 px-3 py-2 rounded font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed' onClick={() => document.getElementById('my_modal_3').showModal()}><HiCheck className='h-5 w-5' /> Add Orders to Shipping</button>

                <dialog id="my_modal_3" className="modal">
                  <div className="modal-box">
                    <form method="dialog">
                      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-sm">Add Leadtime Orders to Draft Shipment JHB | QTY Sending 25</h3>
                    <div className='border-t py-3 mt-5 text-center'>
                      <button className='text-sm border px-4 py-1 border-primary rounded text-primary'>Add to Existing Draft Shipment</button>
                      <div className="divider"></div>
                      <button onClick={handleReviewShipments} className='text-sm border px-4 py-1 border-primary rounded text-primary'>Create New Draft Shipment</button>
                    </div>
                  </div>
                </dialog>

              </div>

            </div>
          </div> : tabName === "Confirmed Shipments" ?
            <div className='w-full lg:w-[99%] mx-0 h-full'>
              <div className='w-full lg:w-[80%] mt-4 flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <button className='flex items-center  text-white text-sm bg-orange-400 px-3 rounded-l-full rounded-r-full'><IoIosWarning /> Urgent</button>
                  <button className='flex items-center  text-white text-sm bg-pink-600 px-3 rounded-l-full rounded-r-full'><IoIosWarning /> Late</button>
                </div>

                <div className='flex items-center gap-2'>
                  <div className="pagination inline-flex items-center justify-center w-full">
                    {currentPage > 5 && (
                      <button onClick={() => handlePageChange(currentPage - 5)} className='border border-primary rounded-md hover:bg-primary hover:text-white font-semibold px-3 py-1 inline-flex items-center gap-1 mr-2'><HiMiniChevronDoubleLeft className='h-6 w-6' /> <span></span></button>
                    )}

                    {Array.from({ length: pageRangeEnd - pageRangeStart + 1 }).map((_, index) => {
                      const page = pageRangeStart + index;
                      return (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`border py-1 px-3 mr-2 rounded-md hover:bg-primary hover:text-white font-semibold my-5 ${page === currentPage ? "bg-primary text-white" : ""
                            }`}
                        >
                          {page}
                        </button>
                      );
                    })}

                    {currentPage < totalPage - 4 && (
                      <button onClick={() => handlePageChange(currentPage + 5)} className='border border-primary rounded-md hover:bg-primary hover:text-white font-semibold px-3 py-1 inline-flex items-center gap-1'><span></span> <HiMiniChevronDoubleRight className='h-6 w-6' /></button>
                    )}
                  </div>
                </div>

                <div>
                  <div className='w-full inline-flex items-center gap-2 text-xs font-medium'>
                    <label>Show</label>
                    <select id="selectOption" name="selectOption" className='px-2 py-1 text-sm border rounded' onChange={(e) => setShowItemPerPage(e.target.value)}>
                      <option value="100">100</option>
                      <option value="150">150</option>
                      <option value="200">200</option>
                      <option value="250">250</option>
                      <option value="300">300</option>
                    </select>
                    <span>per page</span>
                  </div>
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
            </div> : ""
      }
    </section >
  );
};

export default LeadtimeOrders;