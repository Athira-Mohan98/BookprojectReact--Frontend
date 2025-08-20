import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Users/Pages/Home'
import { useEffect, useState } from 'react'
import Preloader from './Components/Preloader'
import Auth from './Pages/Auth'
import AllBooks from './Users/Pages/AllBooks'
import ViewBook from './Users/Pages/ViewBook'
import Careers from './Users/Pages/Careers'
import Contact from './Users/Pages/Contact'
import PageNotFound from './Pages/PageNotFound'
import AdminHome from './Admin/Pages/AdminHome'
import AdminBooks from './Admin/Pages/AdminBooks'
import AdminCareers from './Admin/Pages/AdminCareers'
import AdminSettings from './Admin/Pages/AdminSettings'
import EditProfile from './Users/Components/EditProfile'
import Profile from './Users/Pages/Profile'
import PaymentError from './Users/Pages/PaymentError'
import PaymentSuccess from './Users/Pages/PaymentSuccess'



function App() {
  const [isLoading, setisLoading] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setisLoading(true)
    }, 3000)
  }, [])
  return (
    <>
      <Routes>
        <Route path='/' element={isLoading ? <Home /> : <Preloader />} />
        <Route path='/login' element={<Auth />} />
        <Route path='/register' element={<Auth register />} />
        <Route path='/allBooks' element={<AllBooks />} />
        <Route path='/viewBook/:id' element={<ViewBook />} />
        <Route path='/careers' element={<Careers />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/editprofile' element={<EditProfile />} />
        <Route path='/profile' element={<Profile />} />

        <Route path='/admin-home' element={<AdminHome />} />
        <Route path='/admin-books' element={<AdminBooks />} />
        <Route path='/admin-careers' element={<AdminCareers />} />
        <Route path='/admin-settings' element={<AdminSettings />} />
        <Route path='/payment-success' element={<PaymentSuccess />} />
        <Route path='/payment-error' element={<PaymentError />} />
        <Route path='/*' element={<PageNotFound />} />

      </Routes>
    </>
  )
}

export default App
