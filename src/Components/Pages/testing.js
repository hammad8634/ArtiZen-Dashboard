/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import "../../index.css";

const LoginPage = () => {
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

    let result = await fetch("http://localhost:8000/api/v1/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },

      body: JSON.stringify(data),
    });
    // .then((result) =>
    //   result.json().then((resp) => {
    //     console.warn("response", resp);
    //   })
    // );

    result = await result.json();
    console.warn("Result", result);

    // localStorage.setItem("user", JSON.stringify(result));
    // navigate("/profile");

    if (result.status === "success") {
      localStorage.setItem("user", JSON.stringify(result));
      navigate("/dashboard");
    } else {
      alert("Please enter a correct data");
    }
  };
  return (
    <>
      <div className="login-div">
        <h2>Login Form</h2>
        <div className="input-fields">
          <input
            className="form-control"
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></input>
          <br />
          <input
            className="form-control"
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
          <br />
          <span className="psw">
            <button
              // className="login-button"
              className="btn btn-primary"
              type="submit"
              onClick={handleLogin}
            >
              Login
            </button>
            <br />

            <div className="forgot-password">
              Forgot{" "}
              <a className="forgot-link" href="#Forget">
                password?
              </a>
            </div>
          </span>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
