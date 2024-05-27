import React from 'react'
import {Input} from '../index.js'

function Register() {
  return (
    <div className='h-screen w-full grid place-items-center'>
      <form action="#" className='flex flex-col justify-center items-center gap-10'>
        <Input type="text" placeholder="Username" />
        <Input type="password" placeholder="Password" />
        <Input type="password" placeholder="Confirm Password" />
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default Register