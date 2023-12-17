import React, { useEffect, useState } from 'react';
import DashboardHead from '../../../components/DashboardHead/DashboardHead';
import { IoMdOpen } from "react-icons/io";
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { HiMiniChevronDoubleLeft, HiMiniChevronDoubleRight } from 'react-icons/hi2';
import moment from 'moment';

const ViewReturn = () => {
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
    fetchTotalOrders();
  }, [currentPage, itemPerPage]);

  const fetchProducts = async () => {
    try {

      setLoading(true);
      const response = await axiosSecure.get(`/get-all-return-request?page=${currentPage}&limit=${itemPerPage}`);
      setProducts(response.data);
      setLoading(false);

    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const fetchTotalOrders = async () => {
    const result = await axiosSecure.get("/total-return-products")
    setTotalProducts(result.data.totalProduct)
  }

  console.log(products);
  console.log(totalProducts);

  return (
    <section className='w-[99%] relative h-full'>
      <nav className='absolute left-0 right-0 top-0'>
        <DashboardHead title="View Return" />
      </nav>

      <div className='my-16 flex w-[90%] items-center px-3 gap-3'>
        <button className='bg-neutral px-2 py-1 text-white text-xs rounded'>Export 0 Return</button>
        <span className='text-xs text-primary inline-flex items-center gap-1'>Tips to reduce your return rate <IoMdOpen className='h-4 w-4' /></span>
      </div>


      <div className='border mt-6 py-3 px-2 w-[95%] bg-white'>

        <div className='w-full items-center justify-between'>
          <div className='w-full inline-flex items-center gap-2 text-xs font-medium'>
            <label>Show</label>
            <select id="selectOption" name="selectOption" className='px-2 py-1 text-sm border rounded' onChange={(e) => setShowItemPerPage(e.target.value)}>
              <option value="100">100</option>
              <option value="150">150</option>
              <option value="200">200</option>
            </select>
            <span>per page</span>
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
        </div>

        <div className="overflow-x-auto mt-5 w-[99%] mx-auto">
          <table className="table text-xs">
            {/* head */}
            <thead>
              <tr>
                <th>Return Date</th>
                <th>Order ID</th>
                <th>Product Title</th>
                <th>SKU</th>
                <th>MSIN</th>
                <th>Return Reason</th>
                <th>QTY</th>
                <th>DC</th>
                <th>Evaluation Outcome</th>
              </tr>
            </thead>
            <tbody>
              {
                products?.map(prod => <tr key={prod?._id}>
                  <td>
                    {moment(prod?.date).format("l")}
                  </td>
                  <td>
                    {prod?.orderId}
                  </td>
                  <td>{prod?.productName}</td>
                  <td>{prod?.productSKU}</td>
                  <td>Null</td>
                  <td><button className="bg-primary px-2 py-1 text-white font-medium rounded" onClick={() => document.getElementById(prod?._id).showModal()}>View</button>
                    <dialog id={prod?._id} className="modal">
                      <div className="modal-box">
                        <form method="dialog">
                          {/* if there is a button in form, it will close the modal */}
                          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                        <h3 className="font-bold text-lg">Return Reason</h3>
                        <p className="py-4">{prod?.returnIssue}</p>
                      </div>
                    </dialog>
                  </td>
                  <td>{prod?.quantity}</td>
                  <td>Null</td>
                  <td>Null</td>
                </tr>)
              }

            </tbody>

          </table>
        </div>
      </div>
    </section>
  );
};

export default ViewReturn;