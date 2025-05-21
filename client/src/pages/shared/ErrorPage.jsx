import React from 'react'
import { Link, useNavigate } from "react-router-dom";


export const ErrorPage = () => {
    const naviagte = useNavigate()
  return (
    <div>
        <h1 className='text-9xl decoration-4'>404</h1>
        <h1 className='text-7xl hover:text-teal-400 hover:text-9xl' onClick={()=>naviagte('/')}>page not found !</h1>
    </div>
  )
}


