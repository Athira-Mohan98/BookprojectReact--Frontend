import React, { useState, useEffect } from 'react'
import AdminSidebar from '../Components/AdminSidebar'
import { IoMdLogOut } from "react-icons/io";
import { Button, Card } from "flowbite-react";
import AdminHeader from '../Components/AdminHeader';
import { adminApprovedBookAPI, getAdminAllBookAPI, getadminAllUsersAPI } from '../../Services/Allapi';

function AdminBooks() {
  const [bookStatus, setBookStatus] = useState(true)
  const [userStatus, setUserStatus] = useState(false)
  const [books, setBooks] = useState([])
  const [ApproveStatus, setApproveStatus] = useState(false)
  const [users, setUsers] = useState([])

  const token = sessionStorage.getItem("token")

  const getAdminAllBook = async (token) => {
    const reqHeader = {
      Authorization: `Bearer ${token}`
    }

    try {
      const result = await getAdminAllBookAPI(reqHeader)
      console.log(result);
      setBooks(result.data)
    } catch (err) {
      console.log(err);
    }
  }


  // Approve books
  const handleApprove = async (data) => {
    const reqHeader = {
      Authorization: `Bearer ${token}`
    }
    try {
      const result = await adminApprovedBookAPI(data, reqHeader)
      console.log(result);
      setApproveStatus(true)
      getAdminAllBook(token)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAdminAllBook(token)
  }, [])
  console.log(books)



  // Get all users
  const getAllUsersAdmin = async (token) => {

    const reqHeader = {
      Authorization: `Bearer ${token}`
    }
    try {
      const result = await getadminAllUsersAPI(reqHeader)
      console.log(result);
      setUsers(result.data)
      setBookStatus(false);
      setUserStatus(true)
    } catch (err) {
      console.log("err" + err);
    }
  }

  console.log(users)

  return (
    <>
      <AdminHeader />
      <AdminSidebar />

      <div className="pl-64 pt-16 min-h-screen bg-stone-100">
        <p className='text-center text-2xl'>All Books</p>

        <div className='flex justify-center items-center'>
          <div className='flex items-center gap-6 mt-4'>
            <div>
              <p
                onClick={() => { setBookStatus(true); setUserStatus(false); }}
                className={bookStatus ? 'border border-r-2 border-l-2 border-t-2 border-b-0 p-3 mx-2' : 'border border-r-2 border-l-2 border-t-2 p-3 mx-2'}>
                Book List
              </p>
            </div>
            <div>
              <p
                onClick={() => getAllUsersAdmin(token)}
                className={userStatus ? 'border border-r-2 border-l-2 border-t-2 border-b-0 p-3 mx-2' : 'border border-r-2 border-l-2 border-t-2 p-3 mx-2'}>
                Users
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center w-full">
          {
            bookStatus ?
              <div className='flex justify-center items-center flex-wrap gap-4'>
                {
                  books.length > 0 ? books.map(item =>
                    <Card key={item._id}
                      className={`max-w-md !bg-stone-50 h-120 w-90 ${item.status === 'sold' ? 'opacity-50 cursor-not-allowed' : ""}`}
                    >

                      <img className='p-3 w-[300px] h-[300px]' src={item.imageUrl} alt="" /> :
                      <h5 className="text-2xl font-bold text-center tracking-tight text-stone-800">
                        {item.title}
                      </h5>
                      <p className="font-normal text-center text-stone-800">
                        Price: {`${item.price}`}
                      </p>
                      <div className='flex justify-center items-center'>
                        {
                          item.status === 'pending' &&
                          <button onClick={() => handleApprove(item)} className='bg-stone-950 p-2 border-2 outline-stone-400 rounded-4xl hover:bg-stone-50 hover:text-stone-950 hover:border-stone-950 text-stone-100'>Approve</button>
                        }
                        {
                          item.status === "approved" &&
                          <img className='w-[50px]' src='https://icon-library.com/images/green-check-icon-png/green-check-icon-png-6.jpg' />
                        }
                        {
                          item.status==='sold'&&
                          <img src='https://www.patent2product.com/wp-content/uploads/2020/05/sold-out.gif' className='w-[50px] '/>
                        }
                      </div>
                    </Card>
                  ) : "No books"
                }
              </div>
              :
              <div className='flex justify-center items-center flex-wrap gap-4'>
                {
                  users.length > 0 ? users.map(item =>
                    <Card key={item._id} className="max-w-sm !bg-stone-100">
                      <img className='rounded-full border ms-10 border-stone-800 w-[50px] flex justify-center' src={item.profile == "" ? 'https://cdn-icons-png.flaticon.com/512/10561/10561629.png' : `${item.profile}`} />
                      <h5 className="text-2xl font-bold tracking-tight text-stone-800 text-center">
                        {item.username}
                      </h5>
                      <div>
                        <div className='mt-2 text-stone-800'>
                          <p className="font-normal">
                            Id: {item._id}
                          </p>
                          <p>Email: {item.email}</p>
                        </div>
                      </div>
                    </Card>
                  ) : "No Users"
                }
              </div>
          }
        </div>
      </div>
    </>
  )
}

export default AdminBooks
