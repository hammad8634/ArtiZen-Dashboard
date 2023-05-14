import axios from "axios";
import React, { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";

function BuyerTable() {
  const [buyers, setBuyers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/v1/buyer/all")
      .then((response) => {
        console.log(`resssdf: ${response}`, response.data.data.user);
        setBuyers(response.data.data.user);
      })
      .catch((error) => console.log(error));
  }, []);

  // const handleEdit = (_id) => {
  // };

  const handleDelete = (_id) => {
    axios
      .delete(`http://localhost:8000/api/v1/buyer/delete/${_id}`)
      .then(() => {
        const updatedProducts = buyers.filter((buyer) => buyer._id !== _id);
        setBuyers(updatedProducts);
      })
      .catch((error) => console.log(`Errrrrrrrrrrrr: ${error}`));
  };

  console.log("Buyers: ", buyers);

  return (
    <AdminLayout>
      <section id="buyers-table">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <p className="mt-2 text-sm text-gray-700"></p>
              <h1 className="text-base font-bold leading-6 text-gray-900">
                Buyer Details
              </h1>
              <p className="mt-5 text-sm text-gray-700 text-center font-bold">
                Total Buyers are: {buyers.length}
              </p>
            </div>
            <div className="mt-2 sm:ml-16 sm:mt-0 sm:flex-none">
              <button
                type="button"
                className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-bold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Export
              </button>
            </div>
          </div>
          <div className="mt-5 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 ">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-0">
                <table className="min-w-full divide-y divide-gray-300 text-center">
                  <thead className="bg-gray-500">
                    <tr>
                      <th
                        scope="col"
                        className="text-center whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-bold text-gray-900 sm:pl-0 divide-x border_set  "
                      >
                        Sr No.
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
                        Role
                      </th>
                      <th
                        scope="col"
                        className="text-center whitespace-nowrap px-2 py-3.5 text-left text-sm font-bold text-gray-900 divide-x border_set  "
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white divide-x border_set ">
                    {buyers.map((buyer, index) => (
                      <tr
                        key={buyer._id}
                        className={index % 2 !== 0 ? "bg-gray-100" : ""}
                      >
                        <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900 divide-x border_set">
                          {index + 1}
                        </td>
                        <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-800 sm:pl-0 divide-x border_set">
                          {buyer.name}
                        </td>
                        <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-800 divide-x border_set">
                          {buyer.email}
                        </td>
                        <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-800 divide-x border_set">
                          {buyer.phoneNumber}
                        </td>
                        <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-800 divide-x border_set">
                          {buyer.role}
                        </td>
                        <td className="relative whitespace-nowrap py-2 pl-3 pr-4 text-center text-sm font-medium sm:pr-0 divide-x border_set">
                          <button
                            onClick={() => handleDelete(buyer._id)}
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

export default BuyerTable;
