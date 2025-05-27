import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUserAsync, userLoginAsync } from "../../Features/userSlice";
import ShowHidePassword from "../../Components/ShowHidePassword";

function Register() {
    const [name, setName] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleUserRegisterForm = async (event) => {
    event.preventDefault();
    try {
      await dispatch(registerUserAsync({name, email, password })).unwrap();
      toast.success("Sighup successful!");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Invalid credentials!");
    }
  };

  const guestLoginHandler = async () => {
    setEmail("rekha12345@gmail.com");
    setPassword("rekha12345");
    try {
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
        className="card p-4 border-0"
        style={{ width: "400px", backgroundColor: "#ffffff" }}
      >
        <h4 className="heading-color text-center mb-3">Workasana</h4>
        <h2 className="text-center">Create an account</h2>
        <p className="text-center text-muted mb-4">Please enter your details.</p>

        <form onSubmit={handleUserRegisterForm}>
 <label htmlFor="name" className="form-label fw-semibold mb-1">Name</label>

          <input
            className=" form-control"
            type="text"
            placeholder="Enter your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor="email" className="form-label fw-semibold mb-1 mt-3">Email</label>

          <input
            className=" form-control"
            type="text"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password" className="form-label fw-semibold mb-1 mt-3">Password</label>
<ShowHidePassword value={password} onChange={(event)=>setPassword(event.target.value)} />
          <div className="d-grid my-2">
            <button className="btn btn-primary " type="submit">
              Sign in
            </button>
          </div>
          <div className="d-grid mb-2">
            <button
              className="btn btn-outline-secondary"
              onClick={()=>guestLoginHandler}
            >
              Guest Login
            </button>
          </div>
          <p className="text-center">
            Already have an account? <Link to="/" className="text-decoration-none fw-semibold ">Login</Link>
          </p>
        </form>

        <Toaster />
      </div>
    </div>
  );
}

export default Register;
