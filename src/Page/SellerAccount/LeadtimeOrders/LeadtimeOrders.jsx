import React from 'react';
import { useState } from 'react';
import DashboardHead from '../../../components/DashboardHead/DashboardHead';
import { IoIosWarning } from 'react-icons/io';
import { CiNoWaitingSign } from 'react-icons/ci';
import { HiCheck } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';

const LeadtimeOrders = () => {
  const [tabName, setTabName] = useState("Leadtime Orders");
  const [selectCheck, setSelectCheck] = useState(false);
  const navigate = useNavigate()

  const handleReviewShipments = () => {
    navigate("/seller-dashboard/review-seller-shipment-details")
  }

  return (
    <section className='w-[95%] relative h-full'>
      <nav className='absolute left-0 right-0 top-0'>
        <DashboardHead title={tabName} />
      </nav>


      <div className='flex overflow-auto lg:overflow-hidden w-full lg:w-[99%] mx-auto items-center justify-start text-sm text-neutral border-t border-l border-r mt-16'>

        <div onClick={() => setTabName("Leadtime Orders")} className={`px-10 py-3 cursor-pointer inline-flex items-center gap-1 ${tabName === "Leadtime Orders" ? "bg-white border-t-2 border-t-primary text-primary" : ""}`}>Leadtime Orders</div>

        <div onClick={() => setTabName("Draft Shipments")} className={`px-10 py-3 cursor-pointer inline-flex items-center gap-1 ${tabName === "Draft Shipments" ? "bg-white border-t-2 border-t-primary text-primary" : ""}`}>Draft Shipments</div>

        <div onClick={() => setTabName("Confirmed Shipments")} className={`px-10 py-3 cursor-pointer inline-flex items-center gap-1 ${tabName === "Confirmed Shipments" ? "bg-white border-t-2 border-t-primary text-primary" : ""}`}>Confirmed Shipments</div>

        <div onClick={() => setTabName("Shipped Shipments")} className={`px-10 py-3 cursor-pointer inline-flex items-center gap-1 ${tabName === "Shipped Shipments" ? "bg-white border-t-2 border-t-primary text-primary" : ""}`}>Shipped Shipments</div>

      </div>


      {
        tabName === "Leadtime Orders"
          ?
          <div className='w-full lg:w-[99%] mx-auto h-full'>
            <div className='w-full lg:w-[95%] mt-4 flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <button className='flex items-center  text-white text-sm bg-orange-400 px-3 rounded-l-full rounded-r-full'><IoIosWarning /> Urgent</button>
                <button className='flex items-center  text-white text-sm bg-pink-600 px-3 rounded-l-full rounded-r-full'><IoIosWarning /> Late</button>
              </div>

              <div className='flex items-center gap-2'>
                <p className='text-xs font-medium'>Showing rows 1-31 of 31</p>
              </div>

              <div>
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

            </div>



            <div className='border mt-6 py-3 px-2 w-full bg-white'>


              <div className="overflow-x-auto mt-5 w-[93%] mx-auto">
                <table className="table text-xs">
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
                      <th>TSIN</th>
                      <th>DC Building</th>
                      <th>My SoH</th>
                      <th>Stock Days Cover</th>
                      <th>Qty Required</th>
                      <th>Qty Sending</th>
                      <th>Estimated Stock Days Cover</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* row 1 */}
                    <tr>
                      <th>
                        <label>
                          <input type="checkbox" className="checkbox checkbox-xs" defaultChecked={selectCheck} />
                        </label>
                      </th>
                      <td>
                        Null
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
                      <td>Null</td>
                    </tr>
                  </tbody>

                </table>
              </div>
            </div>

            <div className='mt-14 w-full lg:w-[95%] flex items-center justify-between'>

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
          </div> :
          ""
      }
    </section>
  );
};

export default LeadtimeOrders;