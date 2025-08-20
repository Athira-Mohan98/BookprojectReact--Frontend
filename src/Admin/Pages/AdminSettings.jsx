import React from 'react'
import AdminSidebar from '../Components/AdminSidebar'
import AdminHeader from '../Components/AdminHeader';
import { Button } from 'flowbite-react';
import { FaEdit } from "react-icons/fa";
import { useState } from 'react';
import { useEffect } from 'react';
import { getAdminDetailsAPI, updateAdminAPI } from '../../Services/Allapi';

function AdminSettings() {

   const [preview, setpreview] = useState("")
   const[token,setToken]=useState("")
  const [adminDetails,setadminDetails] = useState({

    username: "",
    password:"",
    cpassword:"",
    profile:""
  })

const handlefile=(e)=>{
  setadminDetails({...adminDetails,profile:e.target.files[0]})
  console.log(adminDetails.profile);

      const url = URL.createObjectURL(e.target.files[0])
    console.log(url);
    setpreview(url)
    console.log(preview);
     setadminDetails({...adminDetails,profile:url})
  
}

 const handleReset=()=>{
    setadminDetails({
       username: "",
    password:"",
    cpassword:"",
    profile:""
    })
    setpreview("")
  }

  const handleUpdate = async()=>{
    console.log(adminDetails);
    
    const{ username,password, cpassword, profile}=adminDetails
  
    {
      if(password!==cpassword){
        alert(" Password mismatch")
      }else{
        const reqHeader={
          Authorization: `Bearer ${token}`
        }
        const reqBody = new FormData()
    //reqBody.append("title",title)
    for(let key in adminDetails){
   
 reqBody.append(key,adminDetails[key])
      }

        try {
          const result = await updateAdminAPI(reqBody,reqHeader)
          console.log(result)
          setadminDetails(result.data)
          handleGetAdminDetails(token)
          alert("Admin Details Updated")
        }
        
        catch (error) {
          console.log(error);
          
        }
      }
    }
  }

  const handleGetAdminDetails=async(token)=>{
console.log("get AdminDetails");
    console.log("token");

    const reqHeader = {
      Authorization: `Bearer ${token}`
    }
    try {
      const result = await getAdminDetailsAPI(reqHeader)
      console.log(result);
      setadminDetails(result.data[0])
    } catch (error) {
      console.log("Error" + error);
    }
  }

  useEffect(()=>{
    setToken(sessionStorage.getItem("token"))
    if(token){
    handleGetAdminDetails(token)
    
    }

  },[])

  return (
    <div>
      <AdminHeader />
      <AdminSidebar />
      <div className='pl-64 '>
        <div className='text-center text-2xl font-bold mt-5'>Settings </div>
  <div className='flex flex-wrap gap-38 p-8'>
     <div className='flex-1'>
        <p className='text-left mt-8'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum saepe laboriosam dicta, vero tenetur velit deserunt fugiat fuga asperiores vel a delectus dolore suscipit aliquam repellendus repudiandae at quibusdam. Libero.
          Ea quidem eligendi dolore vel amet! Maiores nisi sed officia ea a animi placeat laudantium architecto? Cupiditate, explicabo impedit ratione perspiciatis dolores fugiat aut incidunt non consequuntur? Ullam, facere nobis.
          Deleniti fugit inventore fugiat assumenda incidunt, officiis qui vitae eum, eveniet accusamus quia nam, provident exercitationem fuga eaque. Inventore soluta magnam culpa optio numquam repellendus cumque totam suscipit dolore sed!
          Perspiciatis sequi tempore explicabo ut laborum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea laborum ducimus explicabo animi, neque magnam cumque culpa corporis sapiente. Architecto, quos cumque. Voluptate ducimus quo labore voluptatem sed excepturi dicta.</p></div>
        <div className='flex flex-col max-w-sm gap-4 bg-stone-200 p-4 rounded relative'>
          <label htmlFor="profile">
            <input id="profile" type='file' style={{display:'none'}} onChange={e=>handlefile(e)}/> <button className='text-yellow-400 text-4xl absolute' ><FaEdit /></button>
          <img src={preview?preview: "https://cdn-icons-png.flaticon.com/512/149/149071.png"} alt="" height={80} width={250} className='rounded mt-5' />
         </label>
          <h3>Admin</h3>
          <input type="text" placeholder=' Your name' className='border mt-2 rounded' onChange={e=>setadminDetails({...adminDetails,username:e.target.value})} value={adminDetails.username || ''}/>
          <input type="password" placeholder=' Password'className='border mt-3 rounded' onChange={e=>setadminDetails({...adminDetails,password:e.target.value})} value={adminDetails.password || ''}/>
          <input type="password" placeholder=' confirm password'className='border mt-3 rounded' onChange={e=>setadminDetails({...adminDetails,cpassword:e.target.value})} value={adminDetails.cpassword || ''}/>
          <div className='flex gap-4 mt-2'>
        <button className='text-white bg-orange-400 px-4 py-2 rounded'onClick={handleReset}>Reset</button>
        <button className='text-white bg-green-500 px-4 py-2 rounded' onClick={handleUpdate}>Update</button>
      </div>
        </div>
        </div>
      </div>
    </div>


  )
}

export default AdminSettings
