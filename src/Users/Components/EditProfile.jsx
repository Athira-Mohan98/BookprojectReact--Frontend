import React, { useState } from "react";
import { Button, Drawer, DrawerHeader, DrawerItems } from "flowbite-react";
import { FaPen } from "react-icons/fa";
import { MdEditNote } from "react-icons/md";

function EditUserProfile() {
  const [isOpen, setIsOpen] = useState(false); // Open drawer by default

  const handleClose = () => setIsOpen(false);
  const userImage = "";

  return (
    <div>
       <div className="flex  items-center justify-center">
        <Button className=" !bg-amber-950" onClick={() => setIsOpen(true)}><MdEditNote className="text-4xl" /></Button>
      </div>

      <Drawer open={isOpen} onClose={handleClose}>
        <div className="bg-white text-black min-h-full px-6 py-4">
          <DrawerHeader title="Edit User Profile" />

          <DrawerItems>
            <div className="flex flex-col items-center gap-4">
              {/* Profile Image + Edit */}
              <div className="relative">
                <img
                 src={userImage || "https://via.placeholder.com/150"} // replace with your image URL
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border"
                />
                <button className="absolute bottom-2 right-2 bg-yellow-400 p-2 rounded-full shadow hover:bg-yellow-500">
                  <FaPen className="text-white text-sm" />
                </button>
              </div>

              {/* Input Fields */}
              <input
                type="text"
                placeholder="Full name"
               
                className="w-full border border-gray-300 rounded px-4 py-2 text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="password"
                placeholder="New password"
               
                className="w-full border border-gray-300 rounded px-4 py-2 text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="password"
                placeholder="Confirm password"
             
                className="w-full border border-gray-300 rounded px-4 py-2 text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                placeholder="User role"
            
                rows={3}
                className="w-full border border-gray-300 rounded px-4 py-2 text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>

              {/* Buttons */}
              <div className="flex gap-4 mt-4">
                <button className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700">
                  Reset
                </button>
                <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                  Update
                </button>
              </div>
            </div>
          </DrawerItems>
        </div>
      </Drawer>
    </div>
  );
}

export default EditUserProfile;