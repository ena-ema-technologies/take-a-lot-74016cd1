import React, { useEffect } from "react";
import DashboardHead from "../../../components/DashboardHead/DashboardHead";
import { useState } from "react";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { CiWallet } from "react-icons/ci";
import { PiTimer } from "react-icons/pi";
import useOrders from "../../../hooks/useOrder";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
  PDFViewer,
  renderToString,
} from "@react-pdf/renderer";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const SellerTransaction = () => {
  const [axiosSecure] = useAxiosSecure();
  const [pendingAmount, setPendingAmount] = useState(0)
  const [tabName, setTabName] = useState("Transaction");
  const [orders] = useOrders();
  console.log(orders);

  const inProcessOrders = orders?.filter(
    (order) => order?.status === "In-Process"
  );

  const completedOrders = orders?.filter(
    (order) => order?.status === "Completed"
  );

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      undefined,
      options
    );
    return formattedDate;
  };

  const totalAmount =
    orders?.reduce((acc, order) => {
      return (
        acc +
        (order?.orderedProducts?.reduce((productAcc, product) => {
          return productAcc + (product?.totalPrice || 0);
        }, 0) || 0)
      );
    }, 0) || 0;

  // const styles = StyleSheet.create({
  //   page: {
  //     flexDirection: "row",
  //     backgroundColor: "#E4E4E4",
  //     justifyContent: "center",
  //     alignItems: "center",
  //   },
  //   section: {
  //     marginTop: 100,
  //     padding: 10,
  //     flexGrow: 1,
  //     textAlign: "center",
  //   },
  //   title: {
  //     marginBottom: 100,
  //     color: "#0B79BF",
  //     fontWeight: "extrabold",
  //   },
  // });

  // const MyDocument = ({ order }) => (
  //   <Document>
  //     <Page size="A4">
  //       <View style={styles.section}>
  //         <Text style={styles.title}>Mustake Order Invoice</Text>
  //         <Text>Purchase Date: {formatDate(order?.purchaseDate)}</Text>
  //         <Text>Order Status: {order?.status}</Text>
  //         <Text>date From: {formatDate(order?.purchaseDate)}</Text>
  //         <Text>Date to: null</Text>
  //       </View>
  //     </Page>
  //   </Document>
  // );


  const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      padding: 10,
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
    header: {
      fontSize: 20,
      marginBottom: 10,
    },
    product: {
      marginBottom: 5,
    },
    image: {
      width: 100,
      height: 100,
      marginBottom: 5,
    },
  });


  const generatePDF = (order, companyName) => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.header}>Invoice for Order #{order._id}</Text>
          <Text>{`Purchase Date: ${order.purchaseDate}`}</Text>
          <Text>{`Buyer Email: ${order.buyerEmail}`}</Text>

          <Text style={styles.header}>Ordered Products:</Text>
          {order.orderedProducts.map((product, productIndex) => (
            <View style={styles.product} key={productIndex}>
              <Text>{`Product Name: ${product.productName}`}</Text>
              <Text>{`Quantity: ${product.quantity}`}</Text>
              <Text>{`Total Price: $${product.totalPrice.toFixed(2)}`}</Text>
            </View>
          ))}

          <Text style={styles.header}>Buyer Information:</Text>
          <Text>{`Name: ${order.orderedProducts[0].buyerInformation.firstName} ${order.orderedProducts[0].buyerInformation.lastName}`}</Text>
          <Text>{`Address: ${order.orderedProducts[0].buyerInformation.streetAddress}, ${order.orderedProducts[0].buyerInformation.province}`}</Text>
          <Text>{`Email: ${order.orderedProducts[0].buyerInformation.email}`}</Text>
        </View>
      </Page>
    </Document>
  );
  useEffect(() => {
    fetchPendingAmount();
  }, [])

  const fetchPendingAmount = async () => {
    const response = await axiosSecure.get("/total-cart-amount");
    setPendingAmount(response?.data?.totalAmount)
  }
  // console.log(pendingAmount);


  return (
    <section className="w-[99%] relative h-full">
      <nav className="absolute left-0 right-0 top-0">
        <DashboardHead title="Accounting" />
      </nav>

      <div className="flex overflow-auto lg:overflow-hidden w-full lg:w-[99%] mx-auto items-center justify-start text-sm text-neutral border-t border-l border-r mt-16">
        <div
          onClick={() => setTabName("Transaction")}
          className={`px-10 py-3 cursor-pointer inline-flex items-center gap-1 ${tabName === "Transaction"
            ? "bg-white border-t-2 border-t-primary text-primary"
            : ""
            }`}
        >
          Transaction
        </div>

        <div
          onClick={() => setTabName("Invoice")}
          className={`px-10 py-3 cursor-pointer inline-flex items-center gap-1 ${tabName === "Invoice"
            ? "bg-white border-t-2 border-t-primary text-primary"
            : ""
            }`}
        >
          Invoice
        </div>

        <div
          onClick={() => setTabName("Statements")}
          className={`px-10 py-3 cursor-pointer inline-flex items-center gap-1 ${tabName === "Statements"
            ? "bg-white border-t-2 border-t-primary text-primary"
            : ""
            }`}
        >
          Statements
        </div>
      </div>

      {tabName === "Transaction" ? (
        <div className="w-full lg:w-[99%] mx-auto h-full bg-white">
          <div className="w-full flex items-center justify-between"></div>

          <div className="mt-6 py-3 px-2 w-full">
            <div className="my-10 grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
              <div className="border px-4 py-3 rounded shadow w-full flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-400">
                    Current Balance
                  </p>
                  <h3 className="mt-2 text-base font-bold">
                    R {totalAmount.toFixed(2)}{" "}
                  </h3>
                </div>

                <div>
                  <RiMoneyDollarCircleLine className="w-10 h-10" />
                </div>
              </div>

              <div className="border px-4 py-3 rounded shadow w-full flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-400">Pending</p>
                  <h3 className="mt-2 text-base font-bold">R {pendingAmount}</h3>
                </div>

                <div>
                  <PiTimer className="w-10 h-10" />
                </div>
              </div>

              <div className="border px-4 py-3 rounded shadow w-full flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-400">
                    Available Balance
                  </p>
                  <h3 className="mt-2 text-base font-bold">
                    R {totalAmount.toFixed(2)}
                  </h3>
                </div>

                <div>
                  <CiWallet className="w-10 h-10" />
                </div>
              </div>
            </div>

            <div className="my-5 w-full flex items-end justify-end">
              <p className="text-sm text-primary">
                Download your transaction using the Account Transactions report
              </p>
            </div>

            <div className="w-full items-center justify-between border-t pt-4">
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
                    <th>Transaction Date</th>
                    <th>Transaction Type</th>
                    <th>Transaction ID</th>
                    <th>Transaction Description</th>
                    <th>Reference</th>
                    <th>Amount (Incl VAT)</th>
                    <th>VAT</th>
                    <th>Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  {orders?.map((order, i) => {
                    const orderTotal =
                      order?.orderedProducts?.reduce(
                        (acc, product) => acc + (product?.totalPrice || 0),
                        0
                      ) || 0;

                    return (
                      <tr key={i} className="">
                        <td>{formatDate(order?.purchaseDate)}</td>
                        <td>null</td>
                        <td>{order?._id}</td>
                        <td>null</td>
                        <td>null</td>
                        <td>{orderTotal.toFixed(2)}</td>
                        <td>null</td>
                        <td>{totalAmount.toFixed(2)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : tabName === "Invoice" ? (
        <div className="w-full lg:w-[99%] mx-auto h-full bg-white">
          <div className="w-full flex items-center justify-between"></div>

          <div className="border mt-6 py-3 px-2 w-full">
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
                    <th>Date Created</th>
                    <th>Status</th>
                    <th>Date From</th>
                    <th>Date To</th>
                    <th>Download</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  {inProcessOrders?.map((order, i) => {
                    return (
                      <tr key={i} className="">
                        <td>{formatDate(order?.purchaseDate)}</td>
                        <td>{order?.status}</td>
                        <td>{formatDate(order?.purchaseDate)}</td>
                        <td>null</td>
                        <td className="flex justify-start">
                          {/* <PDFDownloadLink
                            document={<MyDocument order={order} />}
                            fileName={`invoice_${order?._id}.pdf`}
                            target="_blank"
                            className="bg-primary text-white text-bold px-2 py-1 rounded-md duration-300 hover:text-black"
                          >
                            {({ loading }) =>
                              loading ? "Loading..." : "Download Invoice"
                            }
                          </PDFDownloadLink> */}

                          <PDFDownloadLink document={generatePDF(order, "Mustake")} fileName="invoice.pdf">
                            {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download PDF')}
                          </PDFDownloadLink>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

            </div>
          </div>
        </div>
      ) : (
        <div className="w-full lg:w-[99%] mx-auto h-full bg-white">
          <div className="w-full flex items-center justify-between"></div>

          <div className="border mt-6 py-3 px-2 w-full">
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
                    <th>Date Created</th>
                    <th>Status</th>
                    <th>Date From</th>
                    <th>Date To</th>
                    <th>Download</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  {completedOrders?.map((order, i) => {
                    return (
                      <tr key={i} className="">
                        <td>{formatDate(order?.purchaseDate)}</td>
                        <td>{order?.status}</td>
                        <td>{formatDate(order?.purchaseDate)}</td>
                        <td>null</td>
                        <td className="flex justify-start">
                          <PDFDownloadLink
                            document={<MyDocument order={order} />}
                            fileName={`invoice_${order?._id}.pdf`}
                            target="_blank"
                            className="bg-primary text-white text-bold px-2 py-1 rounded-md duration-300 hover:text-black"
                          >
                            {({ loading }) =>
                              loading ? "Loading..." : "Download Invoice"
                            }
                          </PDFDownloadLink>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default SellerTransaction;
