import React, { useState } from 'react'

function ShowHindPassword(props) {
     const [showPassword, setShowPassword] = useState(false);

      const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="input-group">
          <input
            className=" form-control"
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={props.password}
            onChange={props.onChange}
          /><button className="btn btn-outline-primary btn-sm" type="button" onClick={togglePasswordVisibility}>
        {showPassword ? 'Hide' : 'Show'}
      </button>
</div>
  )
}

export default ShowHindPassword
