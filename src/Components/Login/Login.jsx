/* eslint-disable no-unused-vars */
import { useState } from "react";
import "./Login.css";
import { useAuth } from "../../AuthPovider/AuthProvider";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  //   Auth
  const { login, token, logout } = useAuth();

  //   navigation
  const navigate = useNavigate();

  // Inputs
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  console.log(formData);

  //   All users
  const usersList = () => {
    fetch("https://dummyjson.com/users")
      .then((resp) => resp.json())
      .then((res) => console.log(res));
  };
  //   usersList();

  //   Post data
  const handleLogin = (e) => {
    e.preventDefault();

    try {
      const response = fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(formData),
      });
      response
        .then((resp) => {
          if (!resp.ok) {
            throw new Error("Login failed");
          }

          //   loggin successfull
          console.log("Login successfull");

          return resp.json();
        })
        .then((data) => {
          const token = data.token;

          //   loggin in, setting up token
          login(token);

          console.log("Local storage", localStorage.getItem("userToken"));

          //   navigate to home.
          navigate("/home");

          console.log(token);
          console.log(data);
        });
    } catch (error) {
      console.log(error);
      throw new error();
    }
  };

  //   ----------return-----------
  return (
    <>
      <div className="login-container mt-5">
        <div className="header mb-5">
          <h2 className="text-center">E-Cart Applicaiton</h2>
        </div>

        <form>
          {/* Username */}
          <div className="mb-3">
            <label htmlFor="exampleInputUsername1" className="form-label">
              Username
            </label>
            <input
              type="text"
              name="username"
              className="form-control"
              value={formData.username}
              onChange={handleInput}
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="username"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleInput}
              id="exampleInputPassword1"
              placeholder="password"
              required
            />
          </div>

          {/* Buttons */}
          <div className="d-flex justify-content-center align-items-center flex-row">
            <button
              type="submit"
              className="btn btn-primary text-center"
              onClick={handleLogin}
            >
              Log in
            </button>
          </div>
        </form>
        {/* !container */}
      </div>
    </>
  );
};
