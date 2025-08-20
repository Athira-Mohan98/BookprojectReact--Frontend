import React, { useEffect, useState } from 'react'
import Header from "../Components/Header";
import Footer from '../../Components/PageFooter'
import { Card } from "flowbite-react";
import { FaLocationDot } from "react-icons/fa6";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { getadminAllJobsAPI } from '../../Services/Allapi';



function Careers() {

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

    const [alljobs, setalljobs] = useState([]);
  
    const [jobDetails, setjobDetails] = useState({
      title: "", location: "", jobType: "", salary: "", qualification: "", experience: "", description: ""
    })
    const [token, setToken] = useState("")

      const getAllJobs = async (token) => {
        const reqHeader = {
            Authorization: `Bearer ${token}`
        }
    
      try {
        const result = await getadminAllJobsAPI(reqHeader)
        console.log(result);
        setalljobs(result.data)
      } catch (error) {
        console.log(error);
      }
    }
    
    useEffect(() => {
      setToken(sessionStorage.getItem("token"))
    }, [])

    useEffect(()=>{
if(token)
  getAllJobs(token)
    },[token])

  return (
    <div>
      <Header />
      <div className="flex-col justify-center items-center bg-gray-50  ">
        <div className=" text-center mb-4 px-5">
          <h2 className="text-3xl font-bold mb-4 mt-18">Careers</h2>
          <p className="text-gray-700">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima distinctio aut quibusdam nostrum magnam ut culpa et nulla voluptas quia? Error vitae voluptate incidunt unde natus aut voluptatum, veritatis quas! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias minus vero officia nulla nesciunt eos laboriosam qui voluptate modi placeat. Quasi, blanditiis expedita laudantium itaque eum magni maiores ut repudiandae.
          </p>
        </div>
      </div>
      <div className='text-center mb-5 items-center' >
        <h2 className='px-2 text-2xl mb-2'>Current Openings</h2>
        <input type="text" placeholder='Job title' className='border border-stone-200 px-3  me-4' />
        <button className='!bg-gray-400 px-3 rounded'>Search</button>
      </div>

    <div className='flex flex-wrap gap-4'>
  {alljobs.map((job, index) => (
    <Card key={index} href="#" className="max-w-xxl w-115">
    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {job.title}
          </h5>
          <hr />
          <div className="font-normal text-gray-700 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <FaLocationDot className="text-2xl text-red-600" />
              <span>{job.location}</span>
            </div>
            Job Type: {job.jobType} <br />
            Salary: {job.salary} <br />
            Qualification: {job.qualification} <br />
            Experience: {job.experience} <br />
            Description: {job.description}
            <hr />
          </div>
      <button className='!bg-stone-400 rounded max-w-sm mt-2' onClick={handleOpen}>Apply</button>
    </Card>
  ))}
</div>


      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description" >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ backgroundColor: 'grey', color: '#fff', textAlign: 'center', py: 2, mb: 4 }}
          >
            Application Form
          </Typography>

          <Box className="flex flex-col gap-3 width-150">
            <input type="text" placeholder="Full name" className="border px-2 py-1 rounded " />
            <input type="text" placeholder="Qualification" className="border px-2 py-1 rounded " />
            <input type="email" placeholder="Email ID" className="border px-2 py-1 rounded " />
            <input type="tel" placeholder="Phone Number" className="border px-2 py-1 rounded " />
            <textarea type="textarea" placeholder="Cover Letter" className="border px-2 py-1 rounded " />
          </Box>

          <Typography id="modal-modal-description" sx={{ mt: 3 }}>Resume</Typography>

          <Box className="flex items-center gap-2 mt-2" >
            <input type="file" className="border px-2 py-1 rounded" placeholder='Choose file' />
          </Box>
          <Box className="flex justify-end gap-4 mt-4">
            <button
              className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded">Reset</button>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Submit</button>
          </Box>
        </Box>
      </Modal>

      <Footer />
    </div>
  )
}

export default Careers
