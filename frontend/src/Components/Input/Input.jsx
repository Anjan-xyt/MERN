import React from "react";

function Input({ type = "text", placeholder = "", required = false, className = "", ...props }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      required={required}
      spellCheck={false}
      className={`${className} h-12 w-96 outline outline-2 outline-black px-5 text-black placeholder-gray-400 bg-blue-100 rounded-sm hover:outline-blue-900 hover:placeholder-slate-600`}
      {...props}
    />
  );
}

export default Input;
