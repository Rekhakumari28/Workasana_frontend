import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userLoginAsync } from "../../Features/userSlice";
import ShowHidePassword from "../../Components/ShowHidePassword";

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
    try {
      const guestEmail = "guest1@example.com"
      const guestPassword= "guest1"
    setEmail(guestEmail);
    setPassword(guestPassword);
       console.log(email, password)
      await dispatch(userLoginAsync({ email, password })).unwrap();
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Invalid credentials!");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div
        className="card  border-0 p-4 "
        style={{ width: "400px", backgroundColor: "#ffffff" }}
      >
         <h4 className="heading-color text-center mb-3">Workasana</h4>
        <h2 className="text-center">Log in to your account</h2>
        <p className="text-center text-muted mb-4">Please enter your details.</p>      

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

          <ShowHidePassword  value={password} onChange={(event)=>setPassword(event.target.value)}/>

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
          <p className="text-center">
            Don't have an account? <Link to="/signup" className="text-decoration-none fw-semibold ">SignUp</Link>
          </p>
        </form>

        <Toaster />
      </div>
    </div>
  );
}

export default Login;
