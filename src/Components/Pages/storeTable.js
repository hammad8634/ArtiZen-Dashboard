import axios from "axios";
import React, { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";

function StoreTable() {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/v1/store/all")
      .then((response) => {
        // console.log(`resssdf: ${response}`, response.data.store);
        setStores(response.data.store);
      })
      .catch((error) => console.log(error));
  }, []);

  // const handleEdit = (_id) => {
  // };

  const handleDelete = (_id) => {
    axios
      .delete(`http://localhost:8000/api/v1/store/delete/${_id}`)
      .then(() => {
        const updatedstores = stores.filter((store) => store._id !== _id);
        setStores(updatedstores);
      })
      .catch((error) => console.log(error));
  };

  // console.log("stores ", stores);
  return (
    <AdminLayout>
      <section id="stores-table">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <p className="mt-2 text-sm text-gray-700"></p>
              <h1 className="text-base font-bold leading-6 text-gray-900">
                Stores Details
              </h1>
              <p className="mt-5 text-sm text-gray-700 text-center font-bold">
                Total Stores are: {stores.length}
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
                  <thead className="bg-gray-500">
                    <tr>
                      <th
                        scope="col"
                        className="text-center whitespace-nowrap px-2 py-3.5 pl-4 pr-3 text-left text-sm font-bold text-gray-900 sm:pl-0 divide-x border_set  "
                      >
                        Sr. No.
                      </th>
                      <th
                        scope="col"
                        className="text-center whitespace-nowrap px-2 py-3.5 text-left text-sm font-bold text-gray-900 divide-x border_set  "
                      >
                        store Name
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
                        Category
                      </th>

                      <th
                        scope="col"
                        className="text-center whitespace-nowrap px-2 py-3.5 text-left text-sm font-bold text-gray-900 divide-x border_set  "
                      >
                        Total Products
                      </th>
                      <th
                        scope="col"
                        className="text-center whitespace-nowrap px-2 py-3.5 text-left text-sm font-bold text-gray-900 divide-x border_set  "
                      >
                        Store Owner
                      </th>
                      <th
                        scope="col"
                        className="text-center whitespace-nowrap px-2 py-3.5 text-left text-sm font-bold text-gray-900 divide-x border_set  "
                      >
                        Address
                      </th>

                      <th
                        scope="col"
                        className="text-center whitespace-nowrap px-2 py-3.5 text-left text-sm font-bold text-gray-900 divide-x border_set  "
                      >
                        Action{" "}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white divide-x border_set ">
                    {stores.map((store, index) => (
                      <tr
                        key={store._id}
                        className={index % 2 !== 0 ? "bg-gray-100" : ""}
                      >
                        <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900 divide-x border_set">
                          {index + 1}
                        </td>
                        <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-900 sm:pl-0 divide-x border_set">
                          {store.name}
                        </td>
                        <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-900 divide-x border_set">
                          {/* <img src= alt={store.name} />{" "} */}
                          {store.photo}
                        </td>
                        <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-800 divide-x border_set">
                          {store.category}
                        </td>
                        <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-800 divide-x border_set">
                          {/* {store.quantity} */}Testing
                        </td>
                        <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-800 divide-x border_set">
                          {store.owner?.name}
                        </td>
                        <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-800 divide-x border_set">
                          {store.location?.address}
                        </td>

                        <td className="relative whitespace-nowrap py-2 pl-3 pr-4 text-center text-sm font-medium sm:pr-0 divide-x border_set">
                          {/* <button
                      variant="primary"
                      onClick={() => handleEdit(store._id)}
                      className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Edit
                    </button> */}
                          {""}
                          <button
                            onClick={() => handleDelete(store._id)}
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

export default StoreTable;
