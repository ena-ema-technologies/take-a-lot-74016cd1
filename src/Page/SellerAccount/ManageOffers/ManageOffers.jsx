import React, { useEffect } from 'react';
import DashboardHead from '../../../components/DashboardHead/DashboardHead';
import { useState } from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import { HiOutlineDownload, HiOutlinePencilAlt } from "react-icons/hi";
import { HiMiniArrowTopRightOnSquare, HiMiniChevronDoubleLeft, HiMiniChevronDoubleRight, HiOutlineTrash } from 'react-icons/hi2';
import axios from 'axios';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const ManageOffers = () => {
  const [searchText, setSearchText] = useState("")
  const [tabName, setTabName] = useState("Manage My Offers");
  const [axiosSecure] = useAxiosSecure();

  const [showItemPerPage, setShowItemPerPage] = useState(100);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = showItemPerPage;
  const totalPage = Math.ceil(totalProducts / itemPerPage);
  const pagesToShow = 5;
  const pageRangeStart = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
  const pageRangeEnd = Math.min(totalPage, pageRangeStart + pagesToShow - 1);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage, itemPerPage, searchText]);

  const fetchProducts = async () => {
    try {
      if (searchText === "") {
        setLoading(true);
        const response = await axios.get(`https://take-a-lot-server-two.vercel.app/all-products-for-seller?page=${currentPage}&limit=${itemPerPage}`);
        setProducts(response.data);
        setLoading(false);
      } else {
        setLoading(true);
        const response = await axios.get(`https://take-a-lot-server-two.vercel.app/product-search/for-manage-offers/by-title/${searchText}`);
        setProducts(response.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch("https://take-a-lot-server-two.vercel.app/total-products")
      .then(res => res.json())
      .then(data => setTotalProducts(data.totalProduct))
  }, [])

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await axiosSecure.delete(`/delete-product-by-seller/${id}`);
        if (response.data.deletedCount > 0) {
          Swal.fire({
            title: "Deleted!",
            text: "Your products has been deleted.",
            icon: "success"
          });
        }
      }
    });


  }

  // const handleUpdate = (id) => {
  //   console.log(id);
  // }
  // console.log(products);
  console.log(searchText);


  return (
    <section className='w-[99%] relative h-full'>
      <nav className='absolute left-0 right-0 top-0'>
        <DashboardHead title={tabName} />
      </nav>


      <div className='flex overflow-auto lg:overflow-hidden w-full lg:w-[99%] mx-auto items-center justify-start text-sm text-neutral border-t border-l border-r mt-16'>

        <div onClick={() => setTabName("Manage My Offers")} className={`px-10 py-3 cursor-pointer inline-flex items-center gap-1 ${tabName === "Manage My Offers" ? "bg-white border-t-2 border-t-primary text-primary" : ""}`}> Manage My Offers</div>

        {/* <div onClick={() => setTabName("View Bulk Result")} className={`px-10 py-3 cursor-pointer inline-flex items-center gap-1 ${tabName === "View Bulk Result" ? "bg-white border-t-2 border-t-primary text-primary" : ""}`}> View Bulk Result</div> */}
      </div>

      {
        tabName === "Manage My Offers"
          ?
          <div className='w-full lg:w-[99%] mx-auto h-full bg-white'>
            <div className='pt-6 w-full flex items-center justify-between'>

              <div className='w-full flex items-center'>
                <div>
                  <select id="selectOption" name="selectOption" className='px-4 py-1 text-sm border rounded'>
                    <option value="option1">Search by Product Title</option>
                  </select>
                </div>

                <div className='w-full relative'>
                  <input type="text" placeholder='Search...' className='w-full border-t border-b border-r px-2 py-1 text-sm placeholder:font-medium placeholder:text-[#000] outline-none' onChange={(e) => setSearchText(e.target.value)} />
                  <IoSearchOutline className='absolute right-4 top-2' />
                </div>
              </div>

              <div className='w-full flex justify-end items-center gap-3'>
                <div className='text-primary text-sm inline-flex items-center gap-1'>
                  <HiOutlineDownload className='h-5 w-5' /> <span className='text-xs font-medium'>Download Template</span>
                </div>

                <div className='text-xs text-white font-medium px-2 py-1 bg-neutral rounded'>
                  <HiMiniArrowTopRightOnSquare className='inline-flex items-center h-4 w-4' />  Export My Offers
                </div>

                <div className='text-xs text-white font-medium px-2 py-1 bg-neutral rounded'>
                  Bulk Upload
                </div>
              </div>

            </div>


            <div className='pt-6 w-full flex items-center justify-between'>

              {/* <div className='w-full flex items-center gap-4'>
                <div>
                  <select id="selectOption" name="selectOption" className='px-4 py-1 text-sm border rounded'>
                    <option value="option1">Search by Product Title</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                  </select>
                </div>

                <div className='w-full relative'>
                  <select id="selectOption" name="selectOption" className='px-4 py-1 text-sm border rounded w-1/2'>
                    <option value="option1">Filter</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                  </select>
                </div>

                <div>
    //TODO
                </div>
              </div> */}

              <div className='w-full flex justify-end items-center gap-3'>
                <div className='text-primary text-sm inline-flex items-center gap-1'>
                  <input type="checkbox" id="showProductImage" name="showProductImage" />
                  <label for="showProductImage" className='text-[#000] text-xs'>Show Product Image</label>

                </div>

              </div>

            </div>

            <div className='border mt-6 py-3 px-2 w-full'>

              <div className='w-full flex items-center justify-between'>
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
                <div className="pagination inline-flex items-center justify-center w-full">
                  {currentPage > 5 && (
                    <button onClick={() => handlePageChange(currentPage - 5)} className='border border-primary rounded-md hover:bg-primary hover:text-white font-semibold px-3 py-1 inline-flex items-center gap-1 mr-2'><HiMiniChevronDoubleLeft className='h-6 w-6' /> <span>prev</span></button>
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
                    <button onClick={() => handlePageChange(currentPage + 5)} className='border border-primary rounded-md hover:bg-primary hover:text-white font-semibold px-3 py-1 inline-flex items-center gap-1'><span>Next</span> <HiMiniChevronDoubleRight className='h-6 w-6' /></button>
                  )}
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
                      <th>Image</th>
                      <th>Product Details</th>
                      <th>Pricing Details</th>
                      <th>Stock On Hand</th>
                      <th>Stock Days Cover</th>
                      <th>Last 30 Days</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody className='text-sm font-medium'>
                    {
                      products?.map(prod => <tr key={prod?._id}>
                        <th>
                          <label>
                            <input type="checkbox" className="checkbox checkbox-xs" />
                          </label>
                        </th>
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="avatar">
                              <div className="mask mask-squircle w-14 h-14">
                                <img src={prod?.Image_URL} alt="Product Image" />
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <button className="px-3 py-2 border rounded border-primary text-primary hover:bg-primary hover:text-white" onClick={() => document.getElementById(prod?._id).showModal()}>See</button>
                        </td>
                        <td>R {prod?.Product_Price}</td>
                        <td>{prod?.Stock_Qty}</td>
                        <td>Null</td>
                        <td>Null</td>
                        <td className='inline-flex items-center gap-3 border-none'>
                          <button onClick={() => handleDelete(prod?._id)} className='p-1 border rounded border-error text-error hover:bg-error hover:text-white'><HiOutlineTrash className='h-5 w-5' /></button>

                          <button onClick={() => handleUpdate(prod?._id)} ></button>

                          <Link className='p-1 border rounded border-primary text-primary hover:bg-primary hover:text-white' to={`/seller-dashboard/update-my-products/${prod?._id}`}>
                            <HiOutlinePencilAlt className='h-5 w-5' />
                          </Link>
                        </td>

                        <dialog id={prod?._id} className="modal">
                          <div className="modal-box">
                            <form method="dialog">
                              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            </form>
                            <h3 className="font-bold text-lg">{prod?.Product_Name}</h3>

                            <p className='my-3'>{prod?.Description}</p>

                            <p className='text-primary'>Product Price: R {prod?.Product_Price}</p>

                            <div className='mt-5 mb-10 border rounded py-4 px-2'>
                              <p>Your Own SKU: {prod?.your_own_SKU}</p>
                              <p>Availabilities: {prod?.Availabilities}</p>
                              <p>Available Deal: {prod?.Available_Deal}</p>
                              <p>Brand Name: {prod?.Brand_Name}</p>
                              <p>Packaged Height: {prod?.Packaged_Height}</p>
                              <p>Packaged Length
                                : {prod?.Packaged_Length}</p>

                              <p>Packaged Weight
                                : {prod?.Packaged_Weight}</p>

                              <p>Packaged Width
                                : {prod?.Packaged_Width}</p>

                              <p>Warranty Period
                                : {prod?.Warranty_Period}</p>

                              <p>Warranty Type
                                : {prod?.Warranty_Type}</p>

                              <p>Whats In The Box
                                : {prod?.Whats_in_the_Box}</p>
                            </div>
                          </div>
                        </dialog>

                      </tr>)
                    }

                  </tbody>

                </table>
              </div>
            </div>
          </div> :
          <div className='w-full lg:w-[99%] mx-auto h-full bg-white'>
            <div className='pt-6 px-3 flex items-center justify-start'>


              <div className='flex justify-start items-center gap-3'>
                <div className='text-primary text-sm inline-flex items-center gap-1'>
                  <HiOutlineDownload className='h-5 w-5' /> <span className='text-xs font-medium'>Download Template</span>
                </div>


                <div className='text-xs text-white font-medium px-2 py-1 bg-neutral rounded'>
                  Bulk Upload
                </div>
              </div>

            </div>



            <div className='border mt-6 py-3 px-2 w-[90%]'>

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
                      <th>Date Submitted</th>
                      <th>Status</th>
                      <th>File Name</th>
                      <th>File ID</th>
                      <th>Updates Requested</th>
                      <th>Fully Updated</th>
                      <th>Failed To Fully Update</th>
                      <th>Created</th>
                      <th>Download Original</th>
                      <th>Download Results</th>
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
                      <td>Null</td>
                    </tr>
                  </tbody>

                </table>
              </div>
            </div>
          </div>
      }

    </section>
  );
};

export default ManageOffers;