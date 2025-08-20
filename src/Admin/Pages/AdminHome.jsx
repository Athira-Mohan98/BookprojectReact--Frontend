import React from 'react'
import AdminHeader from '../Components/AdminHeader'
import AdminSidebar from '../Components/AdminSidebar'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { LiaBookSolid } from "react-icons/lia";
import { IoMdPeople } from "react-icons/io";
import { FaPerson } from "react-icons/fa6";
import { LineChart, Line,XAxis,YAxis,Tooltip,CartesianGrid,ResponsiveContainer,Legend } from 'recharts';
import { useState } from 'react'


function AdminHome() {

const books = [
  { title: "The Great Gatsby", sold: 120 },
  { title: "To Kill a Mockingbird", sold: 200 },
  { title: "1984", sold: 180 },
  { title: "The Alchemist", sold: 250 },
];

  return (
    <div className="min-h-screen flex flex-col fixed">
      <AdminHeader />
      <div className="flex flex-grow">
        <AdminSidebar />

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            '& > :not(style)': {
              m: 1,
              width: 328,
              height: 148,
            },
          }}
        >
          <Paper elevation={0}></Paper>
          <Paper elevation={7} ><Typography className='p-5 !bg-red-200' sx={{ width: '100%', height: '100%' }}><LiaBookSolid size={29} />Total Number of Books <br />100+</Typography></Paper>
          <Paper elevation={7} ><Typography className='p-5 !bg-yellow-200' sx={{ width: '100%', height: '100%' }} > <IoMdPeople size={29} />Total Number of Users <br />100+</Typography></Paper>
          <Paper elevation={7} ><Typography className='p-5 !bg-green-200' sx={{ width: '100%', height: '100%' }}><FaPerson size={29} />Total Number of Employees <br />100+</Typography></Paper>
        </Box>

        
      </div>
   <div className="bg-white p-6 rounded-2xl shadow-md h-146 flex justify-center p-40">
      <h2 className="text-xl font-semibold mb-4">Book Sales</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={books}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="title" />
          <YAxis />
          <Tooltip />
          <Line dataKey="sold" fill="#6366F1" radius={[10, 10, 0, 0]} />
        </LineChart>
      </ResponsiveContainer>
    </div>
    </div>
  )
}

export default AdminHome
