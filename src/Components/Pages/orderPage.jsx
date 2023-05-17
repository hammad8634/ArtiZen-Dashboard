import axios from "axios";
import React, { useEffect, useState } from "react";
import "../../App.css";
import AdminLayout from "../layouts/AdminLayout";

function OrderTable() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/v1/orders/all")
      .then((response) => {
        console.log(`resssdf: ${response}`, response.data.order);
        setOrders(response.data.order);
      })
      .catch((error) => console.log(error));
  }, []);

  // const handleEdit = (_id) => {
  // };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8000/api/v1/orders/delete/${id}`)
      .then(() => {
        const updatedorders = orders.filter((order) => order._id !== id);
        console.log(`ID of order: ${updatedorders}`);
        setOrders(updatedorders);
      })
      .catch((error) => console.log(error));
  };

  // console.log("orders ", orders);
  return (
    <AdminLayout>
      <section id="orders-table">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <p className="mt-2 text-sm text-gray-700"></p>
              <h1 className="text-base font-bold leading-6 text-gray-900">
                Orders Details
              </h1>
              <p className="mt-5 text-sm text-gray-700 text-center font-bold">
                {/* Total orders are: {orders.length} */} length
              </p>
            </div>
            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none"></div>
          </div>
          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-0 ">
                <table className="min-w-full divide-y divide-gray-300 text-center">
                  <thead className="bg-gray-500">
                    <tr>
                      <th
                        scope="col"
                        className="text-center whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-bold text-gray-900 sm:pl-0 divide-x border_set  "
                      >
                        Sr No.{" "}
                      </th>
                      <th
                        scope="col"
                        className="text-center whitespace-nowrap px-2 py-3.5 text-left text-sm font-bold text-gray-900 divide-x border_set  "
                      >
                        Buyer Name
                      </th>
                      <th
                        scope="col"
                        className="text-center whitespace-nowrap px-2 py-3.5 text-left text-sm font-bold text-gray-900 divide-x border_set  "
                      >
                        Quantity
                      </th>
                      <th
                        scope="col"
                        className="text-center whitespace-nowrap px-2 py-3.5 text-left text-sm font-bold text-gray-900 divide-x border_set  "
                      >
                        Total Price
                      </th>

                      <th
                        scope="col"
                        className="text-center whitespace-nowrap px-2 py-3.5 text-left text-sm font-bold text-gray-900 divide-x border_set  "
                      >
                        Order No.
                      </th>

                      <th
                        scope="col"
                        className="text-center whitespace-nowrap px-2 py-3.5 text-left text-sm font-bold text-gray-900 divide-x border_set  "
                      >
                        Order Status
                      </th>
                      <th
                        scope="col"
                        className="text-center whitespace-nowrap px-2 py-3.5 text-left text-sm font-bold text-gray-900 divide-x border_set  "
                      >
                        Payment
                      </th>
                      <th
                        scope="col"
                        className="text-center whitespace-nowrap px-2 py-3.5 text-left text-sm font-bold text-gray-900 divide-x border_set  "
                      >
                        Order Created At
                      </th>
                      <th
                        scope="col"
                        className="text-center whitespace-nowrap px-2 py-3.5 text-left text-sm font-bold text-gray-900 divide-x border_set  "
                      >
                        Action{" "}
                      </th>

                      {/* <th
                    scope="col"
                    className="relative whitespace-nowrap py-3.5 pl-3 pr-4 sm:pr-0"
                  >
                    <span className="sr-only">Edit</span>
                  </th> */}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white divide-x border_set   ">
                    {orders.map((order, index) => (
                      <tr
                        key={order._id}
                        className={index % 2 !== 0 ? "bg-gray-100" : ""}
                      >
                        <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900 divide-x border_set ">
                          {index + 1}
                        </td>
                        <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-800 sm:pl-0 divide-x border_set">
                          {order.user.name}
                        </td>

                        <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-800 divide-x border_set">
                          {order.products.reduce(
                            (totalQuantity, product) =>
                              totalQuantity + product.quantity,
                            0
                          )}
                        </td>
                        <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-800 divide-x border_set">
                          {order.products.reduce(
                            (totalPrice, product) =>
                              totalPrice +
                              product.quantity * product.productPrice,
                            0
                          )}{" "}
                        </td>

                        <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-800 divide-x border_set">
                          {order.orderno}
                        </td>

                        <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-800 divide-x border_set">
                          <div
                            className={`text-center px-0 py-2 text-sm font-medium border rounded-lg ${
                              order.status === "Pending"
                                ? "border-yellow-600 bg-yellow-200"
                                : order.status === "Shipped"
                                ? "border-gray-600 bg-orange-400"
                                : "border-green-600 bg-green-400"
                            }`}
                            style={{ boxSizing: "border-box" }}
                          >
                            <span>{order.status}</span>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-800 divide-x border_set">
                          <div
                            className={`text-center px-0 py-2 text-sm font-medium border rounded-lg ${
                              order.paymentStatus === "Pending"
                                ? "border-yellow-600 bg-red-200"
                                : "border-green-600 bg-gray-400"
                            }`}
                            style={{ boxSizing: "border-box" }}
                          >
                            <span>{order.paymentStatus}</span>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-2 py-2  text-sm text-gray-900 divide-x border_set">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>

                        <td className="relative whitespace-nowrap px-3 py-2  text-center text-sm font-medium sm: divide-x border_set">
                          {/* <button
                        variant="primary"
                        onClick={() => handleEdit(order._id)}
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Edit
                      </button> */}
                          {""}
                          <button
                            onClick={() => handleDelete(order._id)}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </AdminLayout>
  );
}

export default OrderTable;
