/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FacebookIcon from "../../images/fbIcon.png";
import MailIcon from "../../images/googleIcon.png";

const LoginPage = ({ apiLink }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = async () => {
    // console.warn("Data: ", user, password);
    let data = { email, password };

    let result = await fetch(apiLink, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },

      body: JSON.stringify(data),
    });

    result = await result.json();
    console.warn("Result", result);

    if (result.status === "success") {
      // const userId = result.data.data.user._id;
      // console.warn("User Id: " + userId);
      localStorage.setItem("user", JSON.stringify(result));
      navigate("/productstable");
    } else if (result.message === "Account or password is not entered") {
      alert("Email or Password is missing.");
    } else {
      alert("Please enter a correct data");
    }
  };
  return (
    <>
      <div className="flex min-h-full">
        <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <img
                className="h-12 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt="Your Company"
              />
              <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
                Sign in to your account
              </h2>
            </div>

            <div className="mt-8">
              <div>
                <div>
                  <p className="text-sm font-medium leading-6 text-gray-900">
                    Sign in with:
                  </p>

                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <div>
                      <a
                        href="https://www.facebook.com/login/"
                        className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"
                      >
                        <span className="sr-only">Sign in with Facebook</span>
                        <svg
                          className="h-7 w-7"
                          aria-hidden="true"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <image href={FacebookIcon} width="20" height="20" />
                        </svg>
                      </a>
                    </div>

                    <div>
                      <a
                        href="https://accounts.google.com/v3/signin/identifier?dsh=S-1005734133%3A1683586203890348&authuser=0&continue=http%3A%2F%2Fsupport.google.com%2Fmail%2Fanswer%2F8494%3Fhl%3Den%26co%3DGENIE.Platform%253DDesktop&ec=GAlAdQ&hl=en&flowName=GlifWebSignIn&flowEntry=AddSession"
                        className="inline-flex w-full justify-center rounded-md bg-white px-5 py-2 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"
                      >
                        <span className="sr-only">Sign in with Google</span>
                        <svg
                          className="h-7 w-7"
                          aria-hidden="true"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <image
                            href={MailIcon}
                            x="0"
                            y="0"
                            width="20"
                            height="20"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="relative mt-6">
                  <div
                    className="absolute inset-0 flex items-center"
                    aria-hidden="true"
                  >
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-white px-2 text-gray-800">
                      Or continue with
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
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

                  <div className="space-y-1">
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
                        autoComplete="current-password"
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

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        htmlFor="remember-me"
                        className="ml-2 block text-sm text-gray-900"
                      >
                        Remember me
                      </label>
                    </div>

                    <div className="text-sm">
                      <a
                        href="#"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Forgot your password?
                      </a>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      onClick={handleLogin}
                    >
                      Sign in
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative hidden w-0 flex-1 lg:block">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export default LoginPage;
