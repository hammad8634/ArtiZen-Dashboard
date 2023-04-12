import axios from "axios";
import React, { useEffect, useState } from "react";

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
    <section id="stores-table">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <p className="mt-2 text-sm text-gray-700"></p>
            <h1 className="text-base font-semibold leading-6 text-gray-900">
              Stores Details
            </h1>
            <p className="mt-5 text-sm text-gray-700 text-center font-bold">
              Total Stores are: {stores.length}
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
              type="button"
              className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Export
            </button>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8 ">
              <table className="min-w-full divide-y divide-gray-300 text-center">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="text-center whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                    >
                      Sr No.{" "}
                    </th>
                    <th
                      scope="col"
                      className="text-center whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      store Name
                    </th>
                    <th
                      scope="col"
                      className="text-center whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Image
                    </th>
                    <th
                      scope="col"
                      className="text-center whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Category
                    </th>

                    <th
                      scope="col"
                      className="text-center whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Total Products
                    </th>
                    <th
                      scope="col"
                      className="text-center whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Store Owner
                    </th>
                    <th
                      scope="col"
                      className="text-center whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Address
                    </th>

                    <th
                      scope="col"
                      className="text-center whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Action{" "}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {stores.map((store, index) => (
                    <tr key={store._id}>
                      <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900">
                        {index + 1}
                      </td>
                      <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-0">
                        {store.name}
                      </td>
                      <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-900">
                        {/* <img src= alt={store.name} />{" "} */}
                        {store.photo}
                      </td>
                      <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                        {store.category}
                      </td>
                      <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                        {/* {store.quantity} */}Testing
                      </td>
                      <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                        {store.owner?.name}
                      </td>
                      <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                        {store.location?.address}
                      </td>

                      <td className="relative whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        {/* <button
                        variant="primary"
                        onClick={() => handleEdit(store._id)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
  );
}

export default StoreTable;
