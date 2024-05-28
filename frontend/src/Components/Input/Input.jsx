import React, { useState } from "react";
import { Eye } from "lucide-react";

function Input({ type = "text", placeholder = "", required = false, className = "", ...props }) {
  const [showPassword, setShowPassword] = useState(false);

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
          className={`${className} h-10 w-80 outline outline-2 outline-black px-5 text-black placeholder-gray-400 bg-blue-100 rounded-sm hover:outline-blue-900 hover:placeholder-slate-600 peer`}
        />
        <Eye
          size={22}
          className="absolute top-1/2 right-5 transform -translate-y-1/2 cursor-pointer bg-blue-100 peer-hover:text-blue-900"
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
        className={`${className} h-10 w-80 outline outline-2 outline-black px-5 text-black placeholder-gray-400 bg-blue-100 rounded-sm hover:outline-blue-900 hover:placeholder-slate-600`}
        {...props}
      />
    );
  }
}

export default Input;
