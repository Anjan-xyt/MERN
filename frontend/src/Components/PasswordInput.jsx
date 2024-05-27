// PasswordInput.js

import React, { useState } from 'react';
import { Eye } from 'lucide-react';


const PasswordInput = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative">
      <input
        type={showPassword ? 'text' : 'password'}
        placeholder="Enter your password"
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
      />
      <span
        className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
        onClick={togglePasswordVisibility}
      >
        <Eye />
      </span>
    </div>
  );
};

export default PasswordInput;
