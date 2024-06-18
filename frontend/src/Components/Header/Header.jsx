import DarkModeToggler from './DarkModeToggler';
import { Link, NavLink } from 'react-router-dom';
import { IoMdPersonAdd, IoIosMenu, IoMdClose } from 'react-icons/io';
import { IoHome, IoPeople, IoImages, IoPerson } from 'react-icons/io5';
import { useState } from 'react';

function Header() {
  let [isOpen, setIsOpen] = useState(false);
  const menu = [
    {
      to: '/',
      name: 'Home',
      icon: <IoHome size={18} className="mr-4 flex items-center" />,
    },
    {
      to: '/',
      name: 'People',
      icon: <IoPeople size={18} className="mr-4 flex items-center" />,
    },
    {
      to: '/register',
      name: 'Explore',
      icon: <IoImages size={18} className="mr-4 flex items-center" />,
    },
    {
      to: '/',
      name: 'Profile',
      icon: <IoPerson size={18} className="mr-4 flex items-center" />,
    },
  ];

  function menuHandler() {
    setIsOpen(!isOpen);
    const menu = document.getElementById('menu');
    menu.classList.toggle('hidden');
  }

  const navlinks = [
    {
      to: '/',
      name: 'Home',
      className: 'flex items-center',
    },
    {
      to: '/register',
      name: 'Register',
      className: 'flex items-center',
    },
    {
      to: '/explore',
      name: 'Explore',
      className: 'flex items-center',
    },
    {
      to: '/profile',
      name: 'Profile',
      className: 'flex items-center',
    },
  ];

  return (
    <>
      <nav className="sticky top-0 flex w-full items-center justify-between bg-[#f2f2f2] px-4 text-gray-600 dark:bg-neutral-800 dark:text-gray-400 md:h-16 md:px-8 md:py-1">
        <button className="md:hidden">
          {isOpen ? (
            <IoMdClose className="size-10" onClick={menuHandler} />
          ) : (
            <IoIosMenu className="size-10" onClick={menuHandler} />
          )}
        </button>

        <Link to="/">
          <span className="text-4xl font-extrabold">network</span>
        </Link>
        <ul className="hidden h-full text-xl md:flex md:gap-8">
          {navlinks.map(function (link) {
            return (
              <li key={link.name} className={link.className}>
                <NavLink to={link.to}>{link.name}</NavLink>
              </li>
            );
          })}
        </ul>
        <div className="flex gap-4">
          <button className="align-center hidden items-center gap-4 rounded-xl bg-slate-600 p-3 text-lg text-gray-300 shadow-md shadow-black dark:bg-cyan-950 md:flex">
            <IoMdPersonAdd size={18} />
          </button>
          <DarkModeToggler />
        </div>
      </nav>
      <div
        className="sticky top-10 hidden w-full border-t-[2px] border-gray-500 bg-[#f2f2f2] text-2xl text-gray-600 dark:bg-neutral-900 dark:text-gray-400 md:hidden"
        id="menu"
      >
        <ul>
          {menu.map(function (item) {
            return (
              <li className="ul-borders flex items-center py-4 pl-28" key={item.name}>
                {item.icon}
                <NavLink to={item.to} className="flex items-center" onClick={menuHandler}>
                  {item.name}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default Header;
