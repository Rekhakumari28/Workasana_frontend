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
    try {
      const response = await axios.post(
        "https://workasana-backend-git-main-rekha-kumari-bheels-projects.vercel.app/api/users/login",
        user
      );
  
      const data = await response.json();
      console.log(data)
      if (data.token) {
        localStorage.setItem("Login token", data.token);
        toast.success("Login successfully!");
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      }else{
        toast.error("Something went wrong! Please Login again.")
      }
    } catch (error) {
      toast.error(error)
    }
   
  };

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
                onChange={(e) => setEmail(e.target.value)}
              />
              <br />
              <label htmlFor="password">Password</label>
              <br />
              <input
                className=" form-input"
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="btn btn-primary width-9" type="submit">
                Sign in
              </button>
              <p>
                Don't have an account?<Link to="/signup">SignUp</Link>
              </p>
            </form>
            <Toaster />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
