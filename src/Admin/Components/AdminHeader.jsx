import React from 'react';
import {Dropdown,Navbar,NavbarBrand,NavbarToggle, DropdownItem} from 'flowbite-react';
import { useNavigate } from 'react-router-dom';

function AdminHeader() {
  const navigate = useNavigate();

  const HandleLogout = () => {
    navigate('/login');
  };

  const HandleProfile = () => {
    navigate('/editprofile');
  };

  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user')) || {};

  return (
    <div>
      <Navbar fluid rounded className="text-white fixed top-0 w-full !bg-stone-200">
        <NavbarBrand href="/">
          <img
            src="https://icons.iconarchive.com/icons/iconarchive/golden-objects/512/Golden-Book-icon.png"
            className="mr-3 h-6 sm:h-9"
            alt="Paper Petals"
          />
          <span className="!self-center text-xl font-bold text-black">Paper Petals</span>
        </NavbarBrand>

        <div className="text-white">
          <Dropdown
            label={
              <img
                src={ token && user?.profile
                    ? user.profile
                    : 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
                }
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-md hover:scale-110 transition-transform duration-200"
              />
            }
            dismissOnClick={false}
            className="bg-gray-500 text-white font-semibold text-xl border hover:text-gray-700 hover:bg-gray-300"
          >
            <DropdownItem onClick={HandleProfile}>Profile</DropdownItem>
            <DropdownItem onClick={HandleLogout}>Logout</DropdownItem>
          </Dropdown>
        </div>
 <NavbarToggle />
      </Navbar>

      <marquee behaviour="" direction="left" className="!bg-stone-400 mt-15 px-5">
        Welcome admin, You're all set to manage all and monitor the system.
      </marquee>
    </div>
  );
}

export default AdminHeader;
