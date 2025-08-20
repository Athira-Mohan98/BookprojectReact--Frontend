import React, { useEffect, useState } from 'react'
import AdminSidebar from '../Components/AdminSidebar'
import AdminHeader from '../Components/AdminHeader';
import { Card, Toast } from "flowbite-react";
import { FaLocationDot } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ToastContainer, toast } from 'react-toastify';
import { deleteJobsAPI, getadminAllJobsAPI, uploadjobAPI } from '../../Services/Allapi';
import { useContext } from 'react';
import { SearchContext } from '../../context/ContextShare';

function AdminCareers() {

  const { SearchKey, setSearchKey } = useContext(SearchContext)

  const [tempData, setTempData] = useState([])

  const [jobStatus, setjobStatus] = useState(true);
  const [ApplicantStatus, setApplicantStatus] = useState(false);
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

  const handleAddJob = async () => {

    const { title, location, jobType, salary, qualification, experience, description } = jobDetails
    console.log(jobDetails)

    if (!title || !location || !jobType || !salary || !qualification || !experience || !description
    ) {
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
    } else {

      const reqHeader = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
      try {
        const result = await uploadjobAPI(jobDetails, reqHeader)
        console.log(result);

        if (result.status == 200) {
          toast.success("Job successfully added",
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
             getAllJobs(token)
           handleReset()
        } else {
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
             handleReset()
        } 
       

      } catch (err) {
        console.log(err);

      }
    }

  }

 const handleReset=()=>{
    setjobDetails({
 title: "", location: "", jobType: "", salary: "", qualification: "", experience: "", description: ""
    })

  }

const handleDeleteJob = async (id) => {
  try {
    const result = await deleteJobsAPI(id)
    console.log(result);

    if (result.status === 200) {
      toast.success("Job successfully deleted", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
      getAllJobs(token)
    } else {
      toast.error("Unable to delete the job", {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  } catch (error) {
    console.error(error);
  }
};


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

const handleSearch = () => {
  const token = sessionStorage.getItem("token");

  if (!token) {
    alert("Please login")
    navigate('/login')
    return;
  }

  if (!SearchKey) {
    setalljobs(tempData)
    return;
  }

  const filteredJobs = tempData.filter(job =>
    job.title.toLowerCase().includes(SearchKey.toLowerCase().trim())
  )

  if (filteredJobs.length === 0) {
    toast.info("No jobs found for this title");
  }

  setalljobs(filteredJobs);
}




  useEffect(() => {
    setToken(sessionStorage.getItem("token"))
  }, [])

useEffect(() => {
  if (token) {
    getAllJobs(token)
  }
}, [token])


return (
  <>
    <AdminHeader />
    <AdminSidebar />

    <div className="pl-64 pt-16 min-h-screen bg-stone-100">
      <p className='text-center text-2xl'>Careers</p>

      <div className='flex justify-center items-center'>
        <div className='flex items-center gap-6 mt-4'>
          <div>
            <p onClick={() => {
              setjobStatus
                (true); setApplicantStatus
                  (false);
            }} className={jobStatus
              ? 'border border-r-2 border-l-2 border-t-2 border-b-0 p-3 mx-2' : 'border border-r-2 border-l-2 border-t-2 p-3 mx-2'} >Job Post</p>
          </div>
          <div>
            <p onClick={() => {
              setjobStatus
                (false); setApplicantStatus
                  (true);
            }} className={ApplicantStatus
              ? 'border border-r-2 border-l-2 border-t-2 border-b-0 p-3 mx-2' : 'border border-r-2 border-l-2 border-t-2 p-3 mx-2'}>View Applicant</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center w-full">
        {jobStatus ? (
          <>
            <div className='flex flex-wrap justify-between items-center gap-6 p-5 w-full'>
              <div className='flex gap-2'>
                <input type="text" placeholder="Search by title" className='border rounded px-3 py-2' />
                <button className='bg-blue-400 text-white rounded shadow px-5 py-3' onClick={handleSearch}>Search</button>
              </div>
              <button className='bg-green-400 text-white rounded shadow px-5 py-3' onClick={handleOpen}>Add Job+</button>
            </div>

            <div className='flex'>
            <div className="flex flex-col gap-4 p-5 w-full">
  {alljobs.map((job) => (
    <Card key={job._id} style={{ width: "900px" }} className="relative">
      <button onClick={() => handleDeleteJob(job._id)} 
        className="absolute top-2 right-2 bg-red-700 hover:bg-red-800 rounded p-2 text-white flex items-center gap-1"
      >
        <MdDelete className="text-white" />
        Delete
      </button>

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
    </Card>
  ))}
</div>

            </div>

          </>
        ) : (
          <div className='flex flex-wrap justify-center gap-6 p-5 w-full'>
            <table className="table-fixed border">
              <thead className='bg-blue-400'>
                <tr>
                  <th className='border p-2'>SI</th>
                  <th className='border p-2'>Job Title</th>
                  <th className='border p-2'>Name</th>
                  <th className='border p-2'>Qualification</th>
                  <th className='border p-2'>Email</th>
                  <th className='border p-2'>Phone</th>
                  <th className='border p-2'>Cover Letter</th>
                  <th className='border p-2'>Resume</th>
                </tr>
              </thead>
              <tbody>
                <tr >
                  <td className='border p-2'>1</td>
                  <td className='border p-2'>Front end developer</td>
                  <td className='border p-2'>Ken</td>
                  <td className='border p-2'>Btech CS</td>
                  <td className='border p-2'>Ken@gmail.com</td>
                  <td className='border p-2'>98989 98989</td>
                  <td className='border p-2'>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</td>
                  <td className='border p-2'><a href="#">Resume</a></td>
                </tr>
                <tr >
                  <td className='border p-2'>2</td>
                  <td className='border p-2'>Store Manager</td>
                  <td className='border p-2'>Ken</td>
                  <td className='border p-2'>BCA</td>
                  <td className='border p-2'>Ken@gmail.com</td>
                  <td className='border p-2'>98989 98989</td>
                  <td className='border p-2'>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</td>
                  <td className='border p-2'><a href="#">Resume</a></td>
                </tr>

              </tbody>
            </table>
          </div>
        )}
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
              <input type="text" placeholder="Job Title" className="border px-2 py-1 rounded " value={jobDetails.title} onChange={(e) => setjobDetails({ ...jobDetails, title: e.target.value })} />
              <input type="text" placeholder="Location" className="border px-2 py-1 rounded " value={jobDetails.location} onChange={(e) => setjobDetails({ ...jobDetails, location: e.target.value })} />
              <input type="text" placeholder="Job Type" className="border px-2 py-1 rounded " value={jobDetails.jobType} onChange={(e) => setjobDetails({ ...jobDetails, jobType: e.target.value })} />
              <input type="text" placeholder="Salary" className="border px-2 py-1 rounded " value={jobDetails.salary} onChange={(e) => setjobDetails({ ...jobDetails, salary: e.target.value })} />
              <input type="text" placeholder="Qualification" className="border px-2 py-1 rounded " value={jobDetails.qualification} onChange={(e) => setjobDetails({ ...jobDetails, qualification: e.target.value })} />
              <input type="text" placeholder="Experience" className="border px-2 py-1 rounded " value={jobDetails.experience} onChange={(e) => setjobDetails({ ...jobDetails, experience: e.target.value })} />
              <textarea type="textarea" placeholder="Description" className="border px-2 py-1 rounded " value={jobDetails.description} onChange={(e) => setjobDetails({ ...jobDetails, description: e.target.value })} />
            </Box>

            <Box className="flex justify-end gap-4 mt-4">
              <button
                className="bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded" onClick={handleReset}>Reset</button>
              <button
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded" onClick={handleAddJob}>Add</button>
            </Box>
          </Box>
        </Modal>
      </div>
      <ToastContainer />
    </div>
  </>
);
}

export default AdminCareers;
