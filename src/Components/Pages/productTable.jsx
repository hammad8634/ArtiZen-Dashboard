import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import AdminLayout from "../layouts/AdminLayout";

function ProductTable() {
  const navigate = useNavigate();

  const user_info = JSON.parse(localStorage.getItem("user"));
  const user_id = user_info.data._id;
  const [products, setProducts] = useState([]);
  useEffect(() => {
    console.log("user_id---------:", user_id);
  }, [user_id]);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/v1/product/seller/all`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + user_info.token,
        },
      })
      .then((response) => {
        console.log(`resssdf: ${response}`, response.data.product);
        setProducts(response.data.product);
      })
      .catch((error) => console.log(`user id ${user_id} and error: ${error}`));
  }, [user_id, user_info.token]);

  const handleEdit = (_id) => {};

  const handleDelete = (_id) => {
    axios
      .delete(`http://localhost:8000/api/v1/product/delete/${_id}`)
      .then(() => {
        const updatedProducts = products.filter(
          (product) => product._id !== _id
        );
        setProducts(updatedProducts);
      })
      .catch((error) => console.log(error));
  };

  // console.log("products ", products);
  return (
    <AdminLayout>
      <section id="products-table">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <p className="mt-2 text-sm text-gray-700"></p>
              <h1 className="text-base font-bold leading-6 text-gray-900">
                Products Details
              </h1>
              <p className="mt-5 text-sm text-gray-700 text-center font-bold">
                Total Products are: {products.length}
              </p>
            </div>
            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
              <button
                type="button"
                className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-bold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={() => navigate("/createProduct")}
              >
                Create Product
              </button>
            </div>
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
                        className="text-center whitespace-nowrap  text-left text-sm font-bold text-gray-900 divide-x border_set  "
                      >
                        Product Name
                      </th>
                      <th
                        scope="col"
                        className="text-center whitespace-nowrap   text-left text-sm font-bold text-gray-900 divide-x border_set  "
                      >
                        Image
                      </th>
                      <th
                        scope="col"
                        className="text-center whitespace-nowrap  text-left text-sm font-bold text-gray-900 divide-x border_set  "
                      >
                        Rating Average
                      </th>
                      <th
                        scope="col"
                        className="text-center whitespace-nowrap  text-left text-sm font-bold text-gray-900 divide-x border_set  "
                      >
                        Category
                      </th>
                      <th
                        scope="col"
                        className="text-center whitespace-nowrap   text-left text-sm font-bold text-gray-900 divide-x border_set  "
                      >
                        Colors
                      </th>
                      <th
                        scope="col"
                        className="text-center whitespace-nowrap   text-left text-sm font-bold text-gray-900 divide-x border_set  "
                      >
                        Quantity
                      </th>
                      <th
                        scope="col"
                        className="text-center whitespace-nowrap   text-left text-sm font-bold text-gray-900 divide-x border_set  "
                      >
                        Sold Items
                      </th>
                      <th
                        scope="col"
                        className="text-center whitespace-nowrap   text-left text-sm font-bold text-gray-900 divide-x border_set  "
                      >
                        Original Price
                      </th>
                      <th
                        scope="col"
                        className="text-center whitespace-nowrap   text-left text-sm font-bold text-gray-900 divide-x border_set  "
                      >
                        Sale Price
                      </th>
                      <th
                        scope="col"
                        className="text-center whitespace-nowrap   text-left text-sm font-bold text-gray-900 divide-x border_set  "
                      >
                        Owner Name{" "}
                      </th>

                      <th
                        scope="col"
                        className="text-center whitespace-nowrap   text-left text-sm font-bold text-gray-900 divide-x border_set  "
                      >
                        Store Name{" "}
                      </th>

                      <th
                        scope="col"
                        className="text-center whitespace-nowrap   text-left text-sm font-bold text-gray-900 divide-x border_set  "
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
                    {products.map((product, index) => (
                      <tr
                        key={product._id}
                        className={index % 2 !== 0 ? "bg-gray-100" : ""}
                      >
                        <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900 divide-x border_set ">
                          {index + 1}
                        </td>
                        <td className="whitespace-nowrap py-2 text-sm text-gray-800 sm:pl-0 divide-x border_set">
                          {product.productName}
                        </td>
                        <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-900 divide-x border_set">
                          {product.productImages.map((image, imageIndex) => (
                            <img
                              key={imageIndex}
                              src={image}
                              alt={product.productName}
                              className="p-3 rounded-lg w-20 h-20 "
                            />
                          ))}
                        </td>
                        <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-800 divide-x border_set">
                          {product.ratingsAverage}
                        </td>
                        <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-800 divide-x border_set">
                          {product.category}
                        </td>
                        <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-800 divide-x border_set">
                          {product.quantity}
                        </td>
                        <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-800 divide-x border_set">
                          {product.salePrice}
                        </td>

                        <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-800 divide-x border_set">
                          {product.originalPrice}
                        </td>
                        <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-800 divide-x border_set">
                          {product.salePrice}
                        </td>
                        <td className="whitespace-nowrap w-8 h-8  text-sm text-gray-900 divide-x border_set">
                          {product.colors.map((color, colorIndex) => (
                            <div
                              key={colorIndex}
                              className="flex items-center justify-center p-2"
                            >
                              <div
                                className="w-4 h-4 rounded-full mr-1"
                                style={{ backgroundColor: color }}
                              ></div>
                              <span className="text-gray-700">{color}</span>
                              {colorIndex !== product.colors.length - 1 && (
                                <div
                                  className="h-6  border-gray-300 ml-1"
                                  style={{ alignSelf: "center" }}
                                ></div>
                              )}
                            </div>
                          ))}
                        </td>

                        <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-800 divide-x border_set">
                          {product.owner?.name}
                        </td>
                        <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-800 divide-x border_set">
                          {product.store?.name}
                        </td>

                        <td className="relative whitespace-nowrap py-2 pl-3 pr-4 text-center text-sm font-medium sm:pr-0 divide-x border_set">
                          <button
                            variant="primary"
                            onClick={() => handleEdit(product._id)}
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold  rounded p-1"
                          >
                            <PencilSquareIcon className="h-4 w-5 inline-block " />
                            {/* Edit icon */}
                          </button>{" "}
                          <button
                            onClick={() => handleDelete(product._id)}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold rounded p-1"
                          >
                            <TrashIcon className="h-4 w-5 inline-block " />
                            {/* Delete icon */}
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

export default ProductTable;
