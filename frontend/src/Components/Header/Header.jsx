import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <nav className='w-full h-14 bg-slate-600 text-white flex p-2 gap-10'>
     <Link to='/' className='h-10 w-36 bg-blue-700 hover:bg-purple-700 rounded shadow-md shadow-black grid place-items-center' >Home</Link>
     <Link to='/register' className='h-10 w-36 bg-blue-700 hover:bg-purple-700 rounded shadow-md shadow-black grid place-items-center' >Register</Link>
    </nav>
  )
}

export default Header