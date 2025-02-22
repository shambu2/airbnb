import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div className='flex flex-col justify-center items-center w-[50vw] mx-auto h-[50vh]'>
        <form  >
            <h2 className='text-xl font-bold mb-4 text-center'>Login</h2>
            <input 
            type="email" 
            placeholder='Enter your email'
            className='w-full border p-2 mb-2 rounded-full'
            />
             <input 
            type="password" 
            placeholder='Enter your password'
            className='w-full border p-2 mb-2 rounded-full'
            />
            <button className='w-full bg-black text-white rounded-full h-10'>
                submit
            </button>
        </form>
        <div className='text-gray-600 mt-4'>
            Don't have account ? <Link to={'/register'} className='text-blue-600'>Register</Link>
        </div>
    </div>
  )
}

export default Login