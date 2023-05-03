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
        console.log(`resssdf: ${response}`, response.data.product);
        setOrders(response.data.product);
      })
      .catch((error) => console.log(error));
  }, []);

  // const handleEdit = (_id) => {
  // };

  const handleDelete = (_id) => {
    axios
      .delete(`http://localhost:8000/api/v1/orders/delete/${_id}`)
      .then(() => {
        const updatedorders = orders.filter((product) => product._id !== _id);
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
            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
              <button
                type="button"
                className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-bold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Export
              </button>
            </div>
          </div>
          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-0 ">
                <table className="min-w-full divide-y divide-gray-300 text-center">
                  <thead className="bg-blue-500">
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
                        Product Name
                      </th>
                      <th
                        scope="col"
                        className="text-center whitespace-nowrap px-2 py-3.5 text-left text-sm font-bold text-gray-900 divide-x border_set  "
                      >
                        Image
                      </th>
                      <th
                        scope="col"
                        className="text-center whitespace-nowrap px-2 py-3.5 text-left text-sm font-bold text-gray-900 divide-x border_set  "
                      >
                        Rating Average
                      </th>
                      <th
                        scope="col"
                        className="text-center whitespace-nowrap px-2 py-3.5 text-left text-sm font-bold text-gray-900 divide-x border_set  "
                      >
                        Category
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
                        Sold Items
                      </th>
                      <th
                        scope="col"
                        className="text-center whitespace-nowrap px-2 py-3.5 text-left text-sm font-bold text-gray-900 divide-x border_set  "
                      >
                        Original Price
                      </th>
                      <th
                        scope="col"
                        className="text-center whitespace-nowrap px-2 py-3.5 text-left text-sm font-bold text-gray-900 divide-x border_set  "
                      >
                        Owner Name{" "}
                      </th>

                      <th
                        scope="col"
                        className="text-center whitespace-nowrap px-2 py-3.5 text-left text-sm font-bold text-gray-900 divide-x border_set  "
                      >
                        Store Name{" "}
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
                  <tbody className="divide-y divide-gray-200 bg-white divide-x border_set  ">
                    {orders.map((product, index) => (
                      <tr
                        key={product._id}
                        className={index % 2 !== 0 ? "bg-gray-100" : ""}
                      >
                        <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900 divide-x border_set ">
                          {index + 1}
                        </td>
                        <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-0 divide-x border_set">
                          {product.productName}
                        </td>
                        <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-900 divide-x border_set">
                          <img src={product.photos} alt={product.productName} />{" "}
                        </td>
                        <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500 divide-x border_set">
                          {product.ratingAvg}
                        </td>
                        <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500 divide-x border_set">
                          {product.category}
                        </td>
                        <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500 divide-x border_set">
                          {product.quantity}
                        </td>
                        <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500 divide-x border_set">
                          {product.soldItems}
                        </td>

                        <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500 divide-x border_set">
                          {product.originalPrice}
                        </td>
                        <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500 divide-x border_set">
                          {product.owner?.name}
                        </td>
                        <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500 divide-x border_set">
                          {product.store?.name}
                        </td>

                        <td className="relative whitespace-nowrap py-2 pl-3 pr-4 text-center text-sm font-medium sm:pr-0 divide-x border_set">
                          {/* <button
                        variant="primary"
                        onClick={() => handleEdit(product._id)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Edit
                      </button> */}
                          {""}
                          <button
                            onClick={() => handleDelete(product._id)}
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
