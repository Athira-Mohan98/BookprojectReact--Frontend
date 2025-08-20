import React from 'react'
import img from '../assets/preloader3.gif'

function Preloader() {
  return (
    <div className='flex items-center justify-center w-full h-screen bg-black'>
      <img src={img} alt="" className="mx-auto w-96 !bg-black"/>
    
    </div>
  )
}

export default Preloader
