import React from "react";
import DashboardHead from "../../../components/DashboardHead/DashboardHead";
import useOrders from "../../../hooks/useOrder";

const ViewSales = () => {
  const orders = useOrders();
  console.log(orders);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      undefined,
      options
    );
    return formattedDate;
  };

  const totalAmount =
    orders[0]?.reduce((acc, order) => {
      return (
        acc +
        (order?.orderedProducts?.reduce((productAcc, product) => {
          return productAcc + (product?.totalPrice || 0);
        }, 0) || 0)
      );
    }, 0) || 0;
  return (
    <section className="w-[99%] relative h-full">
      <nav className="absolute left-0 right-0 top-0 lg:w-[83%]">
        <DashboardHead title="View Sales" />
      </nav>

      <div className="my-16 flex w-[82%] items-center justify-between px-3">
        <button className="bg-neutral px-2 py-1 text-white text-xs rounded">
          Export Sales Details
        </button>
        <button className="bg-neutral px-2 py-1 text-white text-xs rounded">
          Clear all Filters
        </button>
      </div>

      <div className="border mt-6 py-3 px-2 w-[82%] bg-white">
        <div className="w-full items-center justify-between">
          <div className="w-full inline-flex items-center gap-2 text-xs font-medium">
            <label>Show</label>
            <select
              id="selectOption"
              name="selectOption"
              className="px-2 py-1 text-sm border rounded"
            >
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
                <th>Order Date</th>
                <th>Sale Status</th>
                <th>Order ID</th>
                <th>Product Title</th>
                <th>SKU</th>
                <th>TSIN</th>
                <th>Qty</th>
                <th>DC</th>
                <th>Gross Sale</th>
                <th>Total Fees (Incl. VAT)</th>
                <th>Net Sales</th>
                <th>Shipment Details</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {orders[0]?.map((order, i) => {
                const orderTotal =
                  order?.orderedProducts?.reduce(
                    (acc, product) => acc + (product?.totalPrice || 0),
                    0
                  ) || 0;

                return (
                  <tr key={i} className="">
                    <td>{formatDate(order?.purchaseDate)}</td>
                    <td>{order?.status}</td>
                    <td>{order?.orderId}</td>
                    <td>
                      {order?.orderedProducts?.map((product, i) => (
                        <p className="mt-1 border-b" key={i}>
                          {product?.productName}
                        </p>
                      ))}
                    </td>
                    <td>
                      {order?.orderedProducts?.map((product, i) => (
                        <span key={i}>
                          {product?.productSKU}, <br />
                        </span>
                      ))}
                    </td>
                    <td>null</td>
                    <td>
                      {order?.orderedProducts?.map((product, i) => (
                        <span key={i}>
                          {product?.quantity}, <br />
                        </span>
                      ))}
                    </td>
                    <td>null</td>
                    <td>{orderTotal.toFixed(2)}</td>
                    <td>{totalAmount.toFixed(2)}</td>
                    <td>{totalAmount.toFixed(2)}</td>
                    <td>
                      {[
                        ...new Set(
                          order?.orderedProducts?.map(
                            (product) =>
                              product?.buyerInformation?.streetAddress
                          )
                        ),
                      ].map((address, i) => (
                        <span key={i}>
                          <span>{ }</span>
                          <span>{address}</span> <br />
                        </span>
                      ))}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ViewSales;
