import axios from "axios";
import React, { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";

function SellerTable() {
  const parsedUserData = JSON.parse(localStorage.getItem("user"));
  const role = parsedUserData && parsedUserData.data.role;

  console.log(`Role in Seller Table is: --- ${role}\n`);

  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/v1/seller/all")
      .then((response) => {
        console.log(`resssdf: ${response}`, response.data.data.user);
        setSellers(response.data.data.user);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleEdit = (_id) => {};

  const handleDelete = (_id) => {
    axios
      .delete(`http://localhost:8000/api/v1/seller/delete/${_id}`)
      .then(() => {
        const updatedsellers = sellers.filter((user) => user._id !== _id);
        setSellers(updatedsellers);
      })
      .catch((error) => console.log(error));
  };

  console.log("sellers: ", sellers);

  const handleChangeStatus = (_id, newStatus) => {
    axios
      .patch(`http://localhost:8000/api/v1/seller/update/${_id}`, {
        isVerified: newStatus,
      })
      .then(() => {
        const updatedBuyers = sellers.map((seller) => {
          if (seller._id === _id) {
            return { ...seller, isVerified: newStatus };
          }
          return seller;
        });
        setSellers(updatedBuyers);
      })
      .catch((error) => console.log(`Errrrrrrrrrrrr: ${error}`));
  };
  return (
    <AdminLayout>
      <section id="sellers-table">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <p className="mt-2 text-sm text-gray-700"></p>
              <h1 className="text-base font-bold leading-6 text-gray-900">
                Seller Details
              </h1>
              <p className="mt-5 text-sm text-gray-700 text-center font-bold">
                Total Sellers are: {sellers.length}
              </p>
            </div>
            <div className="mt-2 sm:ml-16 sm:mt-0 sm:flex-none"></div>
          </div>
          <div className="mt-5 flow-root">
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
                        Full Name
                      </th>
                      <th
                        scope="col"
                        className="text-center whitespace-nowrap px-2 py-3.5 text-left text-sm font-bold text-gray-900 divide-x border_set  "
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="text-center whitespace-nowrap px-2 py-3.5 text-left text-sm font-bold text-gray-900 divide-x border_set  "
                      >
                        Phone No.
                      </th>
                      <th
                        scope="col"
                        className="text-center whitespace-nowrap px-2 py-3.5 text-left text-sm font-bold text-gray-900 divide-x border_set  "
                      >
                        CNIC No.{" "}
                      </th>
                      <th
                        scope="col"
                        className="text-center whitespace-nowrap px-2 py-3.5 text-left text-sm font-bold text-gray-900 divide-x border_set  "
                      >
                        Role
                      </th>

                      <th
                        scope="col"
                        className="text-center whitespace-nowrap px-2 py-3.5 text-left text-sm font-bold text-gray-900 divide-x border_set  "
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="text-center whitespace-nowrap px-2 py-3.5 text-left text-sm font-bold text-gray-900 divide-x border_set  "
                      >
                        Option
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
                    {sellers.map((seller, index) => (
                      <tr
                        key={seller._id}
                        className={index % 2 !== 0 ? "bg-gray-100" : ""}
                      >
                        <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900 divide-x border_set">
                          {index + 1}
                        </td>
                        <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-800 sm:pl-0 divide-x border_set">
                          {seller.name}
                        </td>

                        <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-800 divide-x border_set">
                          {seller.email}
                        </td>
                        <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-800 divide-x border_set">
                          {seller.phoneNumber}
                        </td>
                        <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-800 divide-x border_set">
                          {seller.cnic}
                        </td>
                        <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-800 divide-x border_set">
                          {seller.role}
                        </td>
                        <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-800 divide-x border_set">
                          {seller.isVerified ? "True" : "False"}
                        </td>
                        <td className="relative whitespace-nowrap py-2 pl-3 pr-4 text-center text-sm font-medium sm:pr-0 divide-x border_set">
                          <select
                            value={seller.isVerified}
                            onChange={(e) =>
                              handleChangeStatus(seller._id, e.target.value)
                            }
                            className="bg-white text-gray-800 font-bold border border-gray-300 rounded px-2 py-1"
                          >
                            <option value={false}>False</option>
                            <option value={true}>True</option>
                          </select>
                        </td>

                        <td className="relative whitespace-nowrap py-2 pl-3 pr-4 text-center text-sm font-medium sm:pr-0 divide-x border_set">
                          {role === "seller" && (
                            <button
                              variant="primary"
                              onClick={() => handleEdit(seller._id)}
                              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                            >
                              Edit
                            </button>
                          )}{" "}
                          <button
                            onClick={() => handleDelete(seller._id)}
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

export default SellerTable;
