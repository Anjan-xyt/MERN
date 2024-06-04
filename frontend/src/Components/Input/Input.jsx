import React, { useState, useRef } from "react";
import { Eye } from "lucide-react";

function Input({ type = "text", placeholder = "", required = false, className = "", name, ...props }) {
    
  const [showPassword, setShowPassword] = useState(false);
  const {name} = useRef();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (type === "password") {
    return (
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          required={required}
          spellCheck={false}
          name={name}
          ref={name}
          className={`${className} h-10 w-80 outline outline-2 outline-gray-800 px-5 text-black placeholder-gray-400 bg-gray-200 rounded-lg hover:outline-blue-900 hover:placeholder-slate-600 peer`}
        />
        <Eye
          size={22}
          className="absolute top-1/2 right-5 transform -translate-y-1/2 cursor-pointer bg-gray-200 text-gray-800 peer-hover:text-blue-900"
          onClick={togglePasswordVisibility}
        />
      </div>
    );
  } else {
    return (
      <input
        type={type}
        placeholder={placeholder}
        required={required}
        spellCheck={false}
        name={name}
        ref={ref}
        className={`${className} h-10 w-80 outline outline-2 outline-gray-800 px-5 text-gray-800 placeholder-gray-400 bg-gray-200 rounded-lg hover:outline-blue-900 hover:placeholder-slate-600`}
        {...props}
      />
    );
  }
}

export default Input;
