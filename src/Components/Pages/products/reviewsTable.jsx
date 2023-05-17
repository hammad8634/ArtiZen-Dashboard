import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../App.css";
import AdminLayout from "../../layouts/AdminLayout";

function ReviewsTable() {
  const navigate = useNavigate();

  const user_info = JSON.parse(localStorage.getItem("user"));
  const user_id = user_info.data._id;
  const user_role = user_info.data.role;
  console.log(`user role: ${user_role}`);

  const [products, setProducts] = useState([]);
  useEffect(() => {
    console.log("user_id---------:", user_id);
  }, [user_id]);

  // ...existing code...

  useEffect(() => {
    if (user_role === "admin") {
      axios
        .get(`http://localhost:8000/api/v1/product/all`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + user_info.token,
          },
        })
        .then((response) => {
          console.log(`resssdf: ${response}`, response.data.product);
          setProducts(response.data.product);
        })
        .catch((error) =>
          console.log(`user id ${user_id} and error: ${error}`)
        );
    } else if (user_role === "seller") {
      axios
        .get(`http://localhost:8000/api/v1/product/seller/all/${user_id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + user_info.token,
          },
        })
        .then((response) => {
          console.log(`resssdf: ${response}`, response.data.product);
          setProducts(response.data.product);
        })
        .catch((error) =>
          console.log(`user id ${user_id} and error: ${error}`)
        );
    }
  }, [user_id, user_info.token, user_role]);

  // console.log("products ", products);
  return (
    <AdminLayout>
      <section id="products-table">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <p className="mt-2 text-sm text-gray-700"></p>
              <h1 className="text-base font-bold leading-6 text-gray-900">
                Products Reviews
              </h1>
              <p className="mt-5 text-sm text-gray-700 text-center font-bold">
                Total Products are: {products.length}
              </p>
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
                        className="text-center whitespace-nowrap  text-left text-sm font-bold text-gray-900 divide-x border_set  "
                      >
                        Rating Average
                      </th>

                      <th
                        scope="col"
                        className="text-center whitespace-nowrap   text-left text-sm font-bold text-gray-900 divide-x border_set  "
                      >
                        Review{" "}
                      </th>
                      {user_role !== "seller" && (
                        <>
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
                        </>
                      )}
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

                        <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-800 divide-x border_set">
                          {product.ratingsAverage}
                        </td>

                        <td className="whitespace-nowrap w-8 h-8  text-sm text-gray-900 divide-x border_set">
                          {product.reviews.map((review, colorIndex) => (
                            <div
                              key={colorIndex}
                              className="flex items-center justify-center p-2"
                            >
                              <div className="w-4 h-4 rounded-full mr-1"></div>
                              <span className="text-gray-700">
                                {review.review}
                              </span>
                              {colorIndex !== product.colors.length - 1 && (
                                <div
                                  className="h-6  border-gray-300 ml-1"
                                  style={{ alignSelf: "center" }}
                                ></div>
                              )}
                              <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-800 divide-x border_set">
                                {review.user.name}
                              </td>
                              <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-800 divide-x border_set ml-2">
                                {review.rating}/5
                              </td>
                            </div>
                          ))}
                        </td>

                     

                        {user_role !== "seller" && (
                          <>
                            {" "}
                            <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-800 divide-x border_set">
                              {product.owner?.name}
                            </td>
                            <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-800 divide-x border_set">
                              {product.store?.name}
                            </td>
                          </>
                        )}
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

export default ReviewsTable;
