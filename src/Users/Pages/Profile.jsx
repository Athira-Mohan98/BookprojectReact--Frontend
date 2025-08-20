import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { FaCheckCircle } from 'react-icons/fa';
import { RiImageAddFill } from "react-icons/ri";
import EditProfile from '../Components/EditProfile';
import { ToastContainer, toast } from 'react-toastify';
import { uploadBookAPI } from '../../Services/Allapi';

function Profile() {
  const [sellstatus, setsellstatus] = useState(true)
  const [bookstatus, setbookstatus] = useState(false)
  const [purchaseStatus, setpurchaseStatus] = useState(false)

  const[token,setToken]=useState("")

  //to hold book details

  const [bookDetails, setbookDetails] = useState({
    title: "", author: "", noofpages: "", imageUrl: "", price: "", dprice: "", abstract: "", publisher: "", language: "", isbn: "", category: "", UploadedImages: []
  })
  console.log(bookDetails);

  const [preview, setpreview] = useState("")
  const [previewList, setpreviewList] = useState([])

  const handleUpload = (e) => {
    //image value
    console.log(e.target.files[0]);

    //to hold 3 images
    let imageArray = bookDetails.UploadedImages
    imageArray.push(e.target.files[0])
    console.log(imageArray);

    setbookDetails({ ...bookDetails, UploadedImages: imageArray })
    //obj to url conversion

    const url = URL.createObjectURL(e.target.files[0])
    console.log(url);
    setpreview(url)

    //create a new array for holding imagelist
    let imgListArray = previewList
    imgListArray.push(url)
    setpreviewList(imgListArray)
  }

  const handleReset=()=>{
    setbookDetails({
 title: "", author: "", noofpages: "", imageUrl: "", price: "", dprice: "", abstract: "", publisher: "", language: "", isbn: "", category: "", UploadedImages: []
    })
    setpreview("")
    setpreviewList([])
  }
const handleAddBook=async()=>{

  //get values from the state using destructuring
  const {title, author, noofpages, imageUrl, price, dprice, abstract, publisher, language, isbn, category, UploadedImages
}=bookDetails

//create request header, includes token
if(!title|| !author || !noofpages || !imageUrl || !price || !dprice || !abstract || !publisher || !language || !isbn || !category || !UploadedImages
){
  toast.warn("Please fill the form!", {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
}else{
  //add api
  //create request header, includes token
    const reqHeader = {
      Authorization : `Bearer ${token}`
    }
    const reqBody = new FormData()
    //reqBody.append("title",title)
    for(let key in bookDetails){
      if(key != "UploadedImages"){
 reqBody.append(key,bookDetails[key])
      }
     else{
      bookDetails.UploadedImages.forEach((item)=>(
        reqBody.append("UploadedImages",item)
      ))
     }
    }
    try {
      const result = await uploadBookAPI(reqBody,reqHeader)
      console.log(result);

      if(result.status ==200){
       toast.success("Book successfully added",
            {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              
            })
            handleReset()
      }else{
         toast.error(result.response.data,
            {
              position: "top-center",
              autoClose: 4000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            })
      }handleReset()
    } catch (err) {
      console.log(err);
      
    }
}

}
useEffect(()=>{
  setToken(sessionStorage.getItem("token"))
},[])


  return (
    <div>
      <Header />
      <div className=" mt-40">

        <div className="bg-white pt-15  rounded-t-3xl relative">

          <div className="absolute -top-24 left-24">
            <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <img
                src="/profile.jpg"
                alt="Profile"
                className="w-full h-full object-contain"
              />
            </div>
          </div>


          <div className="max-w-7xl mx-auto mt-12 px-6 md:px-16">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">

              <div className="flex items-center gap-2 mt-6 md:mt-0 ml-52 md:ml-0">
                <h1 className="text-2xl font-serif font-semibold text-gray-900">
                  Athira Mohan
                </h1>
                <FaCheckCircle className="text-blue-500 text-xl" />
              </div>
              <EditProfile />

            </div>


            <p className="mt-8 text-lg text-gray-800 max-w-6xl font-serif leading-relaxed">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laborum
              dignissimos nam voluptas, architecto totam voluptatem qui
              consequatur explicabo asperiores illum dolorem non sequi ipsam vero!
              Dolore cum aliquid amet recusandae? Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Esse culpa ratione a voluptates natus
              magni eius consequuntur velit sint commodi ipsum fuga nulla,
              dignissimos officiis aut cum quos dolore alias.
            </p>
          </div>
        </div>
      </div>
      <div className='md:px-40'>
        {/* tab */}
        <div className='flex justify-center items-center my-5'>
          <p onClick={() => { setsellstatus(true); setbookstatus(false); setpurchaseStatus(false) }} className={sellstatus ? 'p-4 text-blue-600 border-l border-t border-r border-gray-200 rounded cursor-pointer' : 'p-4 text-black border-b border-gray-200 cursor-pointer'}>Sell Book</p>
          <p onClick={() => { setsellstatus(false); setbookstatus(true); setpurchaseStatus(false) }} className={bookstatus ? 'p-4 text-blue-600 border-l border-t border-r border-gray-200 rounded cursor-pointer' : 'p-4 text-black border-b border-gray-200 cursor-pointer'} >Book status</p>
          <p onClick={() => { setsellstatus(false); setbookstatus(false); setpurchaseStatus(true) }} className={purchaseStatus ? 'p-4 text-blue-600 border-l border-t border-r border-gray-200 rounded cursor-pointer' : 'p-4 text-black border-b border-gray-200 cursor-pointer'}>Purchase History</p>
        </div>
      </div>

      {sellstatus &&
        <div className='bg-gray-200 p-10 my-20 mx-5'>

          <h1 className='text-center text-3xl font-medium'>Book Details</h1>
          <div className="md:grid grid-cols-2 mt-10 w-full">
            <div className='px-3'>
              <div className="mb-3">
                <input type="text" value={bookDetails.title} onChange={(e) => setbookDetails({ ...bookDetails, title: e.target.value })} placeholder='Title' className='p-2 bg-white rounded placeholder-gray-300 w-full' />
              </div>
              <div className="mb-3">
                <input type="text" value={bookDetails.author} onChange={(e) => setbookDetails({ ...bookDetails, author: e.target.value })} placeholder='Author' className='p-2 bg-white rounded placeholder-gray-300 w-full'
                />
              </div>
              <div className="mb-3">
                <input type="text" value={bookDetails.noofpages}onChange={(e) => setbookDetails({ ...bookDetails, noofpages: e.target.value })} placeholder='No of Pages' className='p-2 bg-white rounded placeholder-gray-300 w-full' />
              </div>
              <div className="mb-3">
                <input type="text"value={bookDetails.imageUrl} onChange={(e) => setbookDetails({ ...bookDetails, imageUrl: e.target.value })} placeholder='Image url' className='p-2 bg-white rounded placeholder-gray-300 w-full' />
              </div>
              <div className="mb-3">
                <input type="text"value={bookDetails.price} onChange={(e) => setbookDetails({ ...bookDetails, price: e.target.value })} placeholder='Price' className='p-2 bg-white rounded placeholder-gray-300 w-full' />
              </div>
              <div className="mb-3">
                <input type="text" value={bookDetails.dprice} onChange={(e) => setbookDetails({ ...bookDetails, dprice: e.target.value })} placeholder='discount price' className='p-2 bg-white rounded placeholder-gray-300 w-full' />
              </div>
              <div className="mb-3">
                <textarea rows={5} value={bookDetails.abstract} onChange={(e) => setbookDetails({ ...bookDetails, abstract: e.target.value })} placeholder='Abstract' className='p-2 bg-white rounded placeholder-gray-300 w-full' ></textarea>
              </div>
            </div>
            <div className='px-3'>
              <div className="mb-3">
                <input type="text" value={bookDetails.publisher} onChange={(e) => setbookDetails({ ...bookDetails, publisher: e.target.value })} placeholder='Publisher' className='p-2 bg-white rounded placeholder-gray-300 w-full' />
              </div>
              <div className="mb-3">
                <input type="text" value={bookDetails.language} onChange={(e) => setbookDetails({ ...bookDetails, language: e.target.value })} placeholder='Language' className='p-2 bg-white rounded placeholder-gray-300 w-full' />
              </div>
              <div className="mb-3">
                <input type="text" value={bookDetails.isbn} onChange={(e) => setbookDetails({ ...bookDetails, isbn: e.target.value })} placeholder='ISBN' className='p-2 bg-white rounded placeholder-gray-300 w-full' />
              </div>
              <div className="mb-3">
                <input type="text" value={bookDetails.category} onChange={(e) => setbookDetails({ ...bookDetails, category: e.target.value })} placeholder='Category' className='p-2 bg-white rounded placeholder-gray-300 w-full' />
              </div>

              <div className="mb-3 flex justify-center items-center w-full mt-10">
                <label htmlFor="imagefile">
                  <input id='imagefile' type="file" style={{ display: 'none' }} onChange={(e) => handleUpload(e)} />
                  <img src={preview ? preview : "https://cdn.pixabay.com/photo/2016/01/03/00/43/upload-1118929_1280.png"} alt="no image" style={{ width: '200px', height: '200px' }} />
                </label>

              </div>

              {
                preview && <div className='flex justify-center items-center'>
                  {
                    previewList?.map(item => (
                      <img src={item} alt="no image" style={{ width: '70px', height: '70px' }} className='mx-3' />
                    ))}
                  {
                    previewList?.length < 3 && <label htmlFor="imagefile">
                      <input id='imagefile' type="file" style={{ display: 'none' }} />
                      <RiImageAddFill className='text-2xl text-blue-600' />
                    </label>
                  }
                </div>
              }

            </div>
          </div>
          <div className='flex md:justify-end justify-center mt-8'>
            <button onClick={handleReset} className='bg-amber-600 rounde text-black p-3 rounded hover:bg-white hover:border hover:border-amber-600 hover:text-amber-600'>Reset</button>
            <button onClick={handleAddBook} className='bg-green-600 rounde text-white p-3 rounded hover:bg-white hover:border hover:border-green-600 hover:text-green-600 ms-4'>Submit</button>
          </div>
        </div>}
      {bookstatus &&
        <div className='p-10 my-20 shadow rounded'>


          <div className='bg-gray-200 p-5 rounded mt-4'>
            <div className="md:grid grid-cols-[3fr_1fr]">
              <div className='px-4'>
                <h1 className='text-2xl'>title</h1>
                <h2>author</h2>
                <h3 className='text-blue-600'>$ dprice</h3>
                <p>abstract</p>
                <div className='flex'>

                  <img src="https://cdn-icons-png.flaticon.com/512/6188/6188726.png" alt="no image" style={{ width: '70px', height: '70px' }} />

                </div>
              </div>
              <div className='px-4 mt-4 md:mt-4'>
                <img src="" alt="no image" className='w-full' style={{ height: '250px' }} />
                <div className='flex justify-end mt-4'>
                  <button className='p-2 rounded bg-red-600 text-white hover:bg-gray-200 hover:text-red-600 hover:border hover:border-red-600'>Delete</button>
                </div>
              </div>
            </div>
          </div>

          {/* or */}

          <div className='flex justify-center items-center flex-col'>
            <img src="https://i.pinimg.com/originals/b4/13/34/b41334a036d6796c281a6e5cbb36e4b5.gif" alt="no image" style={{ width: '200px', height: '200px' }} />
            <p className='text-red-600 text-2xl'>No Book Added Yet</p>
          </div>

        </div>}


      {purchaseStatus &&
        <div className='p-10 my-20 shadow rounded'>


          <div className='bg-gray-200 p-5 rounded mt-4'>
            <div className="md:grid grid-cols-[3fr_1fr]">
              <div className='px-4'>
                <h1 className='text-2xl'>title</h1>
                <h2>author</h2>
                <h3 className='text-blue-600'>$ dprice</h3>
                <p>abstract</p>
                <div className='flex'>

                  <img src="https://cdn-icons-png.flaticon.com/512/6188/6188726.png" alt="no image" style={{ width: '70px', height: '70px' }} />

                </div>
              </div>
              <div className='px-4 mt-4 md:mt-4'>
                <img src="imageurl" alt="no image" className='w-full' style={{ height: '250px' }} />
              </div>
            </div>
          </div>
          {/* or */}
          <div className='flex justify-center items-center flex-col'>
            <img src="https://i.pinimg.com/originals/b4/13/34/b41334a036d6796c281a6e5cbb36e4b5.gif" alt="no image" style={{ width: '200px', height: '200px' }} />
            <p className='text-red-600 text-2xl'>No Book Purchased Yet</p>
          </div>

        </div>
      }
       <ToastContainer />
    </div>
  )
}

export default Profile