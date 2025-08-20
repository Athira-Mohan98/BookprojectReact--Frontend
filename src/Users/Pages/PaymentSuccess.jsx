import React from 'react'
import Header from "../Components/Header";
import { Link } from 'react-router-dom'


function PaymentSuccess() {
  return (
    <div>
      <Header/>
      <div className='flex text-center justify-center mt-25 text-green-800 text-2xl'>
        <div className='col-4'>
        <p className='font-bold'>Payment Successfull!! wohooo....!!!</p>
         <p className='font-bold'>Continue to read...</p>
          <p className='font-bold'>Thanks for buying and staying with us</p>
          <Link to={'/allbooks'}> <button className='rounded bg-green-400 shadow px-5 text-white py-4 text-center mt-5'>Keep Shopping</button>
 </Link>       </div>
             
        <div className='col-4'>
           <img src="https://ovslearning.com/wp-content/uploads/2022/04/payment_successful.gif" alt="" className='px-5 w-50 h-30' />
        </div>
     
      </div>
     
    </div>
  )
}

export default PaymentSuccess
