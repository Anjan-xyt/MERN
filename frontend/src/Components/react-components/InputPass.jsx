import PropTypes from 'prop-types';
import { useState, useRef } from 'react';
import { IoEye, IoEyeOff } from 'react-icons/io5';

function Input({ label, name }) {
  let [isVisible, setIsVisible] = useState(false);
  const inputRef = useRef(null);

  return (
    <div className="relative w-full">
      <input
        id={name}
        name={name}
        ref={inputRef}
        type="password"
        spellCheck="false"
        className="peer h-10 w-full rounded-bl-xl border-b-4 border-l-[1px] border-neutral-400 bg-inherit px-6 text-neutral-500 placeholder-transparent focus:border-neutral-500 focus:text-neutral-700 focus:outline-none dark:border-neutral-600 dark:text-neutral-400 dark:focus:border-neutral-400 dark:focus:text-neutral-300"
        placeholder="dummy placeholder"
      />
      <label
        htmlFor={name}
        className="absolute -top-3 left-6 cursor-text text-[12px] text-gray-600 transition-all peer-placeholder-shown:top-1 peer-placeholder-shown:text-[14px] peer-placeholder-shown:text-gray-400 peer-focus:-top-3 peer-focus:text-[12px] peer-focus:text-gray-600 dark:text-neutral-500 dark:peer-placeholder-shown:text-neutral-500 dark:peer-focus:text-neutral-300 md:-top-6 md:text-lg md:peer-placeholder-shown:top-0 md:peer-placeholder-shown:text-lg md:peer-focus:-top-6 md:peer-focus:text-lg"
      >
        {label}
      </label>
      {isVisible ? (
        <IoEye
          size={20}
          className="absolute right-2 top-1 cursor-pointer text-gray-400 peer-placeholder-shown:text-gray-400 peer-focus:text-gray-600 dark:text-neutral-500 dark:peer-placeholder-shown:text-neutral-500 dark:peer-focus:text-neutral-300"
          onClick={() => {
            setIsVisible(!isVisible);
            inputRef.current.type = 'password';
          }}
        />
      ) : (
        <IoEyeOff
          size={20}
          className="absolute right-2 top-1 cursor-pointer text-gray-400 peer-placeholder-shown:text-gray-400 peer-focus:text-gray-600 dark:text-neutral-500 dark:peer-placeholder-shown:text-neutral-500 dark:peer-focus:text-neutral-300"
          onClick={() => {
            setIsVisible(!isVisible);
            inputRef.current.type = 'text';
          }}
        />
      )}
    </div>
  );
}

Input.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default Input;
