import React, { useEffect, useState } from 'react';
import DashboardHead from '../../../components/DashboardHead/DashboardHead';
import { IoSearchOutline } from 'react-icons/io5';
import { HiOutlineDownload } from 'react-icons/hi';
import { HiMiniArrowTopRightOnSquare, HiMiniChevronDoubleLeft, HiMiniChevronDoubleRight } from 'react-icons/hi2';
import { Link } from 'react-router-dom';
import axios from 'axios';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import moment from 'moment';

const BulkResult = () => {
  const [tabName, setTabName] = useState("View Bulk Result");
  const [bulkProducts, setBulkProduct] = useState([]);
  const [axiosSecure] = useAxiosSecure();
  const [showItemPerPage, setShowItemPerPage] = useState(10);
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
    fetchBulks();
    totalBulkProd();
  }, [currentPage, itemPerPage])

  const fetchBulks = async () => {
    try {
      setLoading(true)
      const response = await axiosSecure.get(`/show-all-bulk-result?page=${currentPage}&limit=${itemPerPage}`);
      setBulkProduct(response.data)
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  // useEffect(() => {
  //   fetch("https://take-a-lot-server-two.vercel.app/total-bulk-products")
  //     .then(res => res.json())
  //     .then(data => setTotalProducts(data.totalProduct))
  // }, []);

  const totalBulkProd = async () => {
    try {
      setLoading(true)
      const response = await axiosSecure.get("/total-bulk-products");
      setTotalProducts(response.data)
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  // console.log(totalProducts);

  return (
    <section className='w-[99%] relative h-full'>
      <nav className='absolute left-0 right-0 top-0'>
        <DashboardHead title={tabName} />
      </nav>


      <div className='flex overflow-auto lg:overflow-hidden w-full lg:w-[99%] mx-auto items-center justify-start text-sm text-neutral border-t border-l border-r mt-16'>

        {/* <div onClick={()=>setTabName("Manage My Offers")} className={`px-10 py-3 cursor-pointer inline-flex items-center gap-1 ${tabName === "Manage My Offers" ? "bg-white border-t-2 border-t-primary text-primary" : ""}`}> Manage My Offers</div> */}

        <div onClick={() => setTabName("View Bulk Result")} className={`px-10 py-3 cursor-pointer inline-flex items-center gap-1 ${tabName === "View Bulk Result" ? "bg-white border-t-2 border-t-primary text-primary" : ""}`}> View Bulk Result</div>
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
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                  </select>
                </div>

                <div className='w-full relative'>
                  <input type="text" placeholder='Search...' className='w-full border-t border-b border-r px-2 py-1 text-sm placeholder:font-medium placeholder:text-[#000] outline-none' />
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

              <div className='w-full flex items-center gap-4'>
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
              </div>

              <div className='w-full flex justify-end items-center gap-3'>
                <div className='text-primary text-sm inline-flex items-center gap-1'>
                  <input type="checkbox" id="showProductImage" name="showProductImage" />
                  <label for="showProductImage" className='text-[#000] text-xs'>Show Product Image</label>

                </div>

              </div>

            </div>

            <div className='border mt-6 py-3 px-2 w-full'>

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
                      <th>Image</th>
                      <th>Product Details</th>
                      <th>Pricing Details</th>
                      <th>Leadtime Stock</th>
                      <th>Stock At Takealot</th>
                      <th>Stock Days Cover</th>
                      <th>Stock On Way</th>
                      <th>Last 30 Days</th>
                      <th>Action</th>
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
          </div> :
          <div className='w-full lg:w-[99%] mx-auto h-full bg-white'>
            <div className='pt-6 px-3 flex items-center justify-start'>

              <div className='flex justify-start items-center gap-3'>
                <a className='text-primary text-sm inline-flex items-center gap-1' href='Template.csv' download="Template.csv">
                  <HiOutlineDownload className='h-5 w-5' /> <span className='text-xs font-medium'>Download Template</span>
                </a>


                <Link to="/seller-dashboard/add-bulk-product" className='text-xs text-white font-medium px-2 py-1 bg-neutral rounded'>Add Products in Bulk</Link>
              </div>

            </div>



            <div className='border mt-6 py-3 px-2 w-[99%]'>

              <div className='w-full flex items-center justify-between'>
                <div className='w-full inline-flex items-center gap-2 text-xs font-medium'>
                  <label>Show</label>
                  <select id="selectOption" name="selectOption" className='px-2 py-1 text-sm border rounded' onChange={(e) => setShowItemPerPage(e.target.value)}>
                    <option value="10">10</option>
                    <option value="30">30</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </select>
                  <span>per page</span>
                </div>

              </div>

              <div className="overflow-x-auto mt-5 w-[99%] mx-auto">
                <table className="table text-xs">
                  {/* head */}
                  <thead>
                    <tr>
                      <th>Date Submitted</th>
                      <th>Status</th>
                      <th>Product Name</th>
                      <th>Products ID</th>
                      <th>Fully Updated</th>
                      <th>Failed To Fully Update</th>
                      <th>Created</th>
                      <th>Download Template</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      bulkProducts?.map(prod => <tr key={prod?._id}>
                        <td>
                          {moment(prod?.date).format("L")}
                        </td>
                        <td>
                          {prod?.status}
                        </td>
                        <td>{prod?.Product_Name}</td>
                        <td>{prod?._id}</td>
                        <td>{prod?.status === "Uploaded" ? "Yes" : "No"}</td>
                        <td>{prod?.status !== "Uploaded" ? "Yes" : "No"}</td>
                        <td>{prod?.status === "Uploaded" ? "Yes" : "No"}</td>
                        <td><a className='text-primary text-sm inline-flex items-center gap-1' href='Template.csv' download="Template.csv">
                          <HiOutlineDownload className='h-5 w-5' />
                        </a></td>
                      </tr>)
                    }

                  </tbody>

                </table>
              </div>
            </div>
          </div>
      }

    </section>
  );
};

export default BulkResult;