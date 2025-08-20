import React from 'react'
import Header from "../Components/Header";


function PaymentError() {
  return (
    <div>
       <Header/>
      <div className='flex text-center justify-center mt-25 text-red-600 text-2xl'>
        <div className='col-4'>
        <p className='font-bold'>Payment Error!! ohh noooo....!!!</p>
         <p className='font-bold'>We apologize for the inconvenience..</p>
          <p className='font-bold'>Please try again later</p>
              <button className='rounded bg-red-500 shadow px-5 text-white py-4 text-center mt-5'>Try Again</button>
        </div>
        <div className='col-4'>
           <img src="https://thumbs.dreamstime.com/b/payment-error-info-message-isometric-concept-customer-cross-marks-failure-vector-illustration-187061600.jpg" alt="" className='px-5 w-70 h-40' />
        </div>
     
      </div>
    </div>
  )
}

export default PaymentError
