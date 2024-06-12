import DarkModeToggler from "./DarkModeToggler";
import { Link, NavLink } from "react-router-dom";
function Header() {
  return (
    <nav className="px-4 md:px-8 md:py-1  bg-neutral-200 text-gray-600 dark:bg-neutral-900 dark:text-gray-400 w-full flex justify-between items-center">
      <Link to="/">
        <span className="text-3xl md:4xl  font-extrabold ">facebook</span>
      </Link>
      <ul className="h-full flex gap-8 text-xl">
        <li>Home</li>
        <li>Friends</li>
        <li>Explore</li>
        <li>Profile</li>
      </ul>
      <div className="flex gap-4">
      <button className="text-lg bg-slate-600 text-gray-300 dark:bg-purple-950 px-10  rounded-lg shadow-md  shadow-black">Add Account</button>
      <DarkModeToggler />

      </div>
    </nav>
  );
}

export default Header;
