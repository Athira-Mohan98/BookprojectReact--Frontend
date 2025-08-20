import { Button, Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";
import { TbLogin2 } from "react-icons/tb";
import Auth from '../../Pages/Auth';
import { Link } from 'react-router';
import React, { useEffect,useState } from 'react'

function Header() {
   //to hold token value
  const [token,setToken]=useState("")
  const[user,setuser]=useState("")

  useEffect(()=>{
    //check token in session storage
 let usertoken = sessionStorage.getItem("token")

 //get userdetails
let userdetails = sessionStorage.getItem("existingUser")

    if(usertoken){
      setToken(usertoken) // assign token to the state
    }

     if (userdetails) {
    setuser(JSON.parse(userdetails)); 
  }
  },[token])
  console.log(token);
  return (
    <div>
       <Navbar fluid rounded className='!bg-stone-500 text-white fixed top-0 w-full'>
      <NavbarBrand href="/">
        <img src="https://icons.iconarchive.com/icons/iconarchive/golden-objects/512/Golden-Book-icon.png" className="mr-3 h-6 sm:h-9" alt="Paper Petals" />
        <span className="!self-center  text-xl font-bold text-white ">Paper Petals</span>
      </NavbarBrand>
      <div className="flex md:order-2">
      {
        token? <img src={user.profile ||"https://cdn-icons-png.flaticon.com/512/149/149071.png"} referrerPolicy="no-referrer" className="w-10 h-10 rounded-full object-cover border-2 border-white"/>
        :   <Link to={"login"}>  <Button className='!bg-stone-400'>Login<TbLogin2 className='text-2xl !bg-stone-400'/></Button> 
        </Link>
      
      }
        <NavbarToggle />
      </div>
      <NavbarCollapse>
        <NavbarLink href="/" active className="!text-white font-semibold text-xl"> 
          Home
        </NavbarLink>
        <Link to ="/allbooks" className="!text-white font-semibold text-xl">Book</Link>
        <Link to="/careers" className="!text-white font-semibold text-xl">Career</Link>
        <Link to="/contact" className="!text-white font-semibold text-xl">Contact</Link>
      </NavbarCollapse>
    </Navbar>
    </div>
  )
}

export default Header
