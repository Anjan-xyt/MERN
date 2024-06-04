import {Input} from '../index.js'

function Register() {
  
  return (
    <div className='h-screen w-full grid place-items-center'>
      <form action="#" className='flex flex-col justify-center items-center gap-10'>
        <Input type="text" name="full_name" placeholder="Enter Your Name" />
        <Input type="number" name="age" placeholder="Enter Your Age" />
        <Input type="email" name="email" placeholder="Enter Your Email" />
        <Input type="number" name="phone_number" placeholder="Enter Your Phone Number" />
        <Input type="text" name="username" placeholder="Choose an Username" />
        <Input type="password" name="password" placeholder="Enter Your Password" />
        <Input type="password" placeholder="Re-Enter Your Password" />
        <button type='submit' className='bg-blue-700 hover:bg-purple-700 text-white py-2 px-4 rounded shadow-md shadow-black'>Register</button>
      </form>
    </div>
  )
}

export default Register