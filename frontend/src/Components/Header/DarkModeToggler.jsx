import { useState } from "react";
import { IoMdMoon, IoMdSunny } from "react-icons/io";
function DarkModeToggler() {
  let [darkMode, setDarkMode] = useState(false);

  function darkModeHandler() {
    setDarkMode(!darkMode);
    const body = document.querySelector("body");
    body.classList.toggle("dark");
  }
  return (
    <button onClick={darkModeHandler}>
      {darkMode ? <IoMdMoon className="text-gray-200 size-10" /> : <IoMdSunny className="text-gray-600 size-10" />}
    </button>
  );
}

export default DarkModeToggler;
