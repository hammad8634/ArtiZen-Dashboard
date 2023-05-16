import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUpPage = ({ apiLink }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cnic, setCNIC] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const navigate = useNavigate();

  const handleSignUpClick = async () => {
    const data = {
      name,
      email,
      cnic,
      phoneNumber,
      password,
      passwordConfirm,
    };

    let result = await fetch(`${apiLink}/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });

    result = await result.json();
    console.warn("Result=====", result);

    if (result.status === "success") {
      alert(result.message);
      navigate(`/login/seller`);
    } else {
      alert("Error! Unable to sign up.");
    }
  };

  return (
    <>
      <div className="relative min-h-screen flex justify-center">
        <div className="absolute inset-0 flex-1 lg:block">
          <img
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
            alt=""
          />
        </div>
        <div className="flex justify-center">
          <div className="relative flex-1 flex justify-center px-4 py-10 sm:px-6 lg:px-20 xl:px-40 z-4 mt-5">
            <div className="mx-auto w-full max-w-auto">
              <div>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900">
                  Sign Up
                </h2>
              </div>

              <div className="">
                <div className="mt-6">
                  <div className="space-y-6">
                    <div className="flex space-x-4 ">
                      <div className="w-5/6">
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Name
                        </label>
                        <div className="mt-2">
                          <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => {
                              setName(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <div className="w-5/6">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Email
                        </label>
                        <div className="mt-2">
                          <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-4">
                      <div className="w-5/6">
                        <label
                          htmlFor="cnic"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          CNIC
                        </label>
                        <div className="mt-2">
                          <input
                            id="cnic"
                            name="cnic"
                            type="text"
                            required
                            className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="CNIC"
                            value={cnic}
                            onChange={(e) => {
                              setCNIC(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <div className="w-5/6">
                        <label
                          htmlFor="phoneNumber"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Phone Number
                        </label>
                        <div className="mt-2">
                          <input
                            id="phoneNumber"
                            name="phoneNumber"
                            type="text"
                            required
                            className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Phone Number"
                            value={phoneNumber}
                            onChange={(e) => {
                              setPhoneNumber(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-4">
                      <div className="w-5/6">
                        <label
                          htmlFor="password"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Password
                        </label>
                        <div className="mt-2">
                          <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => {
                              setPassword(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <div className="w-5/6">
                        <label
                          htmlFor="confirm-password"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Confirm Password
                        </label>
                        <div className="mt-2">
                          <input
                            id="confirm-password"
                            name="confirm-password"
                            type="password"
                            required
                            className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Confirm Password"
                            value={passwordConfirm}
                            onChange={(e) => {
                              setPasswordConfirm(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between space-x-4">
                      <div>
                        <button
                          type="submit"
                          className="flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          onClick={handleSignUpClick}
                        >
                          Sign Up
                        </button>
                      </div>
                      <p className="text-end">
                        Already have an account?{" "}
                        <a
                          href="/login/seller"
                          className="font-medium text-indigo-600 hover:text-indigo-500 "
                        >
                          <span className="font-semibold">Log In here</span>
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
