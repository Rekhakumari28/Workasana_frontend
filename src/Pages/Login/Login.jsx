import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("Login token");
    console.log("token:-", token);
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const user = { email, password };
    const response = await fetch("https://workasana-backend-git-main-rekha-kumari-bheels-projects.vercel.app/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await response.json();
   
    if (data.token) {
      localStorage.setItem("Login token", data.token);
      toast.success("Login successfully!");
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } else {
      navigate("/");
      toast.error("Something went wrong! Please Login again.");
    }    
    
  };

  const guestLoginHandler = async ()=>{
console.log("clicked")
    setEmail("rekha12345@gmail.com")
    setPassword("rekha12345")   
  }

  return (
    <div className="login-overlay">
      <div className="popup">
        <div className="content card-background">
          <div className=" p-4 ">
            <div className="text-center">
              <p className="fs-4 heading-color">workasana</p>
              <h2>Log in to your account</h2>
              <p className="fs-6 text-light-gray">Please enter your details.</p>
            </div>
            <form onSubmit={handleLogin}>
              <label htmlFor="email">Email</label>
              <br />
              <input
                className=" form-input"
                type="text"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <br />
              <label htmlFor="password">Password</label>
              <br />
              <input
                className=" form-input"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="btn btn-primary width-9" type="submit">
                Sign in
              </button>
              <p>
                Don't have an account?<Link to="/signup">SignUp</Link>
              </p>
            </form>
            <button className="btn btn-success" onClick={guestLoginHandler}>Guest Login</button>
            <Toaster />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
