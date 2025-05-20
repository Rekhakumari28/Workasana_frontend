import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userLoginAsync } from "../../Features/userSlice";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleUserLoginForm = async (event) => {
    event.preventDefault();
    try {
      await dispatch(userLoginAsync({ email, password })).unwrap();
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Invalid credentials!");
    }
  };

  const guestLoginHandler = async () => {
    setEmail("rekha12345@gmail.com");
    setPassword("rekha12345");
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div
        className="card shadow-lg border-0 p-4 rounded-4"
        style={{ width: "400px", backgroundColor: "#ffffff" }}
      >
        <h2 className="fs-3 heading-color text-center mb-4">Workasana</h2>
        <p className="text-center text-muted mb-4">Log in to your account</p>

        <form onSubmit={handleUserLoginForm}>
          <label htmlFor="email" className="form-label fw-semibold">Email</label>

          <input
            className=" form-control"
            type="text"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password" className="form-label fw-semibold">Password</label>

          <input
            className=" form-control"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="d-grid my-2">
            <button className="btn btn-primary " type="submit">
              Sign in
            </button>
          </div>
          <div className="d-grid mb-2">
            <button
              className="btn btn-outline-secondary"
              onClick={guestLoginHandler}
            >
              Guest Login
            </button>
          </div>
          <p>
            Don't have an account? <Link to="/signup" className="text-decoration-none fw-semibold ">SignUp</Link>
          </p>
        </form>

        <Toaster />
      </div>
    </div>
  );
}

export default Login;
