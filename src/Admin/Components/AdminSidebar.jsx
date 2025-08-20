import React from 'react';
import { FaHome } from "react-icons/fa";
import { IoBookSharp } from "react-icons/io5";
import { FaShoppingBag } from "react-icons/fa";
import { MdOutlineSettings } from "react-icons/md";

function AdminSidebar() {
  // Get user from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  const profileImage = user?.profile || "https://cdn-icons-png.flaticon.com/512/149/149071.png";
  const userName = user?.name || "Admin";

  return (
    <div className='flex flex-col !bg-stone-200 items-center fixed w-64 h-screen'>
      <img 
        src={profileImage}
        alt="Profile"
        height={100}
        width={150}
        className='rounded-full mt-5 object-cover border-2 border-gray-400'
      />
      <h3 className="mt-2 font-semibold text-gray-700">{userName}</h3>

      <nav className="flex flex-col gap-2 w-full items-center">
        <a href="/admin-home" className="flex items-center gap-2 hover:bg-stone-300 p-2 rounded w-7/12 mt-4"><FaHome size={18} /><span>Home</span></a>
        <a href="/admin-books" className="flex items-center gap-2 hover:bg-stone-300 p-2 rounded w-7/12"><IoBookSharp size={18} /><span>All Books</span></a>
        <a href="/admin-careers" className="flex items-center gap-2 hover:bg-stone-300 p-2 rounded w-7/12"><FaShoppingBag size={18} /><span>Careers</span></a>
        <a href="/admin-settings" className="flex items-center gap-2 hover:bg-stone-300 p-2 rounded w-7/12"><MdOutlineSettings size={18} /><span>Settings</span></a>
      </nav>
    </div>
  );
}

export default AdminSidebar;
