import React, { useEffect, useState } from 'react'
import Header from "../Components/Header";
import { FaEye } from "react-icons/fa";
import { useParams } from 'react-router-dom';
import { getABookAPI, makePaymentAPI } from '../../Services/Allapi';
import { serverURL } from '../../Services/ServerURL';
import { Modal, ModalHeader, ModalBody } from 'flowbite-react';
import {loadStripe} from '@stripe/stripe-js';

function ViewBook() {
  const [bookData, setbookData] = useState({});
  const [UploadedImages, setUploadedImages] = useState([]);
  const [token, setToken] = useState("");
  const { id } = useParams();
  
  const getAbook = async (id) => {
    console.log("get a book");

    const reqHeader = {
      Authorization: `Bearer ${token}`,
    };

    try {
      const result = await getABookAPI(id, reqHeader);
      setbookData(result.data);
      setUploadedImages(result.data.UploadedImages);
    } catch (error) {
      console.log(error);
    }
  };

  const makepayment = async()=>{
    console.log(bookData);
    // initializing a Stripe instance.
   const stripe = await loadStripe('pk_test_51RxOmt3YofcPiQecPbmh21NcmYL0cV4udFaQaSrhyxfsh02rz5iwZcCDtLVxtuRO1wBNhjnTXHJPoAjneK56ml7S00p7JJCNwy');
   console.log(stripe);

   //data to be updated in the backend
      const reqHeader = {
      Authorization: `Bearer ${token}`,
    };
const reqBody = {bookDetails: bookData}
   try {
    const result = await makePaymentAPI(reqBody,reqHeader)
    console.log(result);
    const sessionID= result.data.sessionID
    const response = stripe.redirectToCheckout({
      sessionId:sessionID
    })
    if(response.error){
      console.log("error in payment");
      
    }
    
   } catch (error) {
    console.log("error"+error);
    
   }
    
  }

  useEffect(() => {
    setToken(sessionStorage.getItem("token"));
  }, []);

  useEffect(() => {
    if (token) {
      getAbook(id);
    }
  }, [token]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Header />

      <div className="flex justify-around mt-40 p-20 mx-20 border-0 shadow-2xl rounded-2xl bg-amber-10">
        <div className="w-2/5">
          <img src={bookData?.imageUrl} width={'400px'} height={'200px'} alt="" />
        </div>

        <div className="w-3/5 text-center">
          <div className="flex justify-end">
            <h3 className="text-2xl my-5"><FaEye onClick={handleOpen} /></h3>
          </div>

          <h3 className="text-3xl my-5">{bookData?.title}</h3>
          <p className="text-2xl mb-3 text-blue-500">- {bookData?.author}</p>

          <p>Title: {bookData?.title}</p>
          <p>Language: {bookData?.language}</p>
          <p>Number of pages: {bookData?.noofpages}</p>
          <p>Real Price: {bookData?.price}</p>
          <p>Isbn: {bookData?.isbn}</p>
          <p>{bookData?.abstract}</p>

          <div className="flex justify-around mt-8">
            <button type="button"  onClick={makepayment} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              <svg className="w-3.5 h-3.5 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 21">
                <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
              </svg>
              Buy now
            </button>

            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Back
              <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Modal for Uploaded Images */}
      <Modal show={open} onClose={handleClose}>
        <ModalHeader>Uploaded Images</ModalHeader>
        <ModalBody>
          <div className="space-y-6 flex justify-around">
  {
   UploadedImages?.map((item) => (
      <>
        <img src={`${serverURL}/upload/${item}`} width={'100px'} height={'100px'} alt="" />
      </>
    )) || "No images found"
  }
</div>

        </ModalBody>
      </Modal>
    </div>
  );
}

export default ViewBook;
