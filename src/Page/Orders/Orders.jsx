import React from 'react';
import emptyIcon from '../../assets/icons/empty-order-icon.svg-6bcc4601443c5d44b8ae.svg'
import { FaCalendar } from 'react-icons/fa';
import useOrders from '../../hooks/useOrders';

const Orders = () => {
  const [allOrders, refetch] = useOrders();
  console.log(allOrders);
  return (
    <div className="w-full mt-0">
      <div className="flex text-center justify-between text-sm">
        <div>
          <h2 className="text-lg font-semibold text-[#4d4d4f]">Orders</h2>
        </div>
        <div className="flex items-center gap-2">
          <label className='text-[#9b9b9b]'>Order placed in: </label>
          <div className="relative">
            <FaCalendar className="calendar-icon absolute top-2 left-2 text-blue-500" />
            <select className="p-2 pl-8 bg-white shadow outline-primary">
              <option value="option1">Last 3 months</option>
              <option value="option2">Last 6 months</option>
              <option value="option3">2022</option>
              <option value="option4">2021</option>
              <option value="option5">2020</option>
              <option value="option6">2019</option>
              <option value="option7">2018</option>
              <option value="option8">2017</option>
              <option value="option9">2016</option>
            </select>
          </div>
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
                  <th>Status</th>
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
                  <td>{orders?.status}</td>
                </tr>))}

              </tbody>
            </table>
          </div> : <div>
            <img className="avatar rounded-full border p-2 shadow-lg" src={emptyIcon} alt="" />
            <p>You have no order in the last 3 months</p>
            <button className="bg-primary text-white font-semibold border border-primary px-4 py-2 rounded">Start Shopping</button>
          </div>
        }


      </div>


    </div>
  );
};

export default Orders;