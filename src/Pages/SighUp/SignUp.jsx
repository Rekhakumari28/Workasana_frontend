import axios from "axios";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";


function SignUp() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

const handleSignUp =async (e)=>{
  e.preventDefault();
  const newUser = { name, email, password };
  try {
    const response = await axios.post("https://workasana-backend-git-main-rekha-kumari-bheels-projects.vercel.app/api/users/register",newUser );   
    const data = response.data
   
    if (data) {
      toast.success("SignUp successfully!");
      setName("")
      setEmail("")
      setPassword("")  
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }else{
      toast.error("Email is already registerd.")
    }

  } catch (error) {
    toast.error(error)
  }
    
}
  return (
    <div className="login-overlay">
    <div className="popup">
      <div className="content card-background">
    <div className=" p-2 ">
      <div className="text-center">
        <p className="fs-4 heading-color">workasana</p>
        <h2>Sign Up</h2>
        <p className="fs-6 text-light-gray">Please enter your details.</p>
      </div>
      <form onSubmit={handleSignUp} >
        <label htmlFor="name">Name</label>
        <br />
        <input
          className=" form-input"
          type="text"
          placeholder="Enter your Name"
          onChange={(e) => setName(e.target.value)}
        />
        <br />
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
        <button className="btn btn-primary width-9" type="submit">Sign Up</button>
        <p>
          Already have an account?<Link to="/">Login</Link>
        </p>
      </form>
      <Toaster/>
    </div> </div> </div> </div>
  );
}

export default SignUp;
