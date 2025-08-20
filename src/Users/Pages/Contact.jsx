import React from 'react';
import { FaPhoneVolume, FaLocationDot } from "react-icons/fa6";
import { MdOutlineMailOutline } from "react-icons/md";
import { IoIosSend } from "react-icons/io";
import Header from "../Components/Header";
import Footer from '../../Components/PageFooter';

function Contact() {
  return (
<div>    <Header/>
    <div className="flex-col justify-center items-center min-h-screen bg-gray-50 ">
      <div className=" text-center mb-4 px-5">
        <h2 className="text-3xl font-bold mb-4 mt-18">Contacts</h2>
        <p className="text-gray-700">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima distinctio aut quibusdam nostrum magnam ut culpa et nulla voluptas quia? Error vitae voluptate incidunt unde natus aut voluptatum, veritatis quas! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias minus vero officia nulla nesciunt eos laboriosam qui voluptate modi placeat. Quasi, blanditiis expedita laudantium itaque eum magni maiores ut repudiandae.
        </p>
      </div>

      <div className="flex flex-row gap-4 items-center text-gray-800 text-lg">
        <div className="flex items-center gap-2 px-30">
          <FaLocationDot className="text-2xl text-red-600" />
          <p>123, Main Street, Bangalore, Pin - 636312</p>
        </div>
        <div className="flex items-center gap-2 px-10">
          <FaPhoneVolume className="text-2xl text-green-600" />
          <p>Phone: 98989 98989</p>
        </div>
        <div className="flex items-center gap-2 px-20">
          <MdOutlineMailOutline className="text-2xl text-blue-600" />
          <p>PaperPetals@gmail.com</p>
        </div>
      </div>
<h2 className="text-2xl font-bold mb-4 mt-4 px-5">Send me a Message</h2>
      <div className="bg-white p-6 rounded-lg shadow-md flex flex-row px-5 gap-18 w-150">
        
        <form className="flex flex-col gap-4 min-w-[500px]">
          <input type="text" placeholder="Name" className="border border-gray-400 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
          />
          <input type="email" placeholder="Email Id"className="border border-gray-400 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
          />
          <textarea placeholder="Message"
            rows="4"
            className="border border-gray-400 rounded px-4 py-2 focus:outline-none focus:border-blue-500 resize-none"
          ></textarea>
          <button
            type="submit"
            className=" gap-2 bg-stone-600 text-white px-6 py-2 rounded hover:bg-stone-700 transition"
          >Send 
          </button>
        </form>
     

      {/* Google Map */}
      <div className="  ">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m30!1m12!1m3!1d4036758.418873093!2d75.56937707441305!3d8.86591408761017!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m15!3e9!4m3!3m2!1d9.384633599999999!2d76.5979445!4m5!1s0x3b080c8e94a07a07%3A0x49921cdfae82660!2skakkanad!3m2!1d10.015860499999999!2d76.3418666!4m3!3m2!1d9.7920571!2d75.8961008!5e0!3m2!1sen!2sin!4v1751019257318!5m2!1sen!2sin"
          width="600"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
       </div>
<Footer/>
    </div>
    </div>
      
  
  );
}

export default Contact;
