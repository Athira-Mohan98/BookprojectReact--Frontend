import React, { useContext } from 'react'
import Header from "../Components/Header";
import Footer from '../../Components/PageFooter'
import { IoSearch } from "react-icons/io5";
import { getAllBooksAPI } from '../../Services/Allapi';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SearchContext } from '../../context/ContextShare';

function AllBooks() {
  const { SearchKey, setSearchKey } = useContext(SearchContext)
  console.log(SearchKey);

  const [allBooks, setallBooks] = useState([]);
  const [tempData, setTempData] = useState([])

  const token = sessionStorage.getItem("token")
  
  const getAllBooks = async (SearchKey, token) => {
    console.log("inside get book");
    console.log("token");

    const reqHeader = {
      Authorization: `Bearer ${token}`
    }
    try {
      const result = await getAllBooksAPI(SearchKey, reqHeader)
      console.log(result);
      setallBooks(result.data);
      setTempData(result.data)
    } catch (error) {
      console.log("Error" + error);
    }
  }

  const handleFilter = (data) => {
    console.log(data);
    if (data === 'No-filter') {
      setallBooks(tempData)
    } else {
      setallBooks(tempData.filter(item =>
        (item.category).toLowerCase().trim() === data.toLowerCase().trim()
      ))
    }
  }

  useEffect(() => {
    if (token) {
      getAllBooks(SearchKey, token)
    }
  }, [token, SearchKey])
  console.log(token);

  return (
    <div>
      <Header />
      <div className="flex-col justify-center items-center bg-gray-50">
        <div className="text-center mb-4 px-5">
          <h2 className="text-3xl font-bold mb-4 mt-18">Collections</h2>

          <div className="w-full flex justify-center">
            <div className="sm:col-span-2 justify-center ">
              <div className="mt-2 ">
                <div className="flex justify-between  items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                  <label htmlFor="bookname" className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">Book Name:</label>
                  <input
                    id="bookname"
                    name="bookname"
                    type="text"
                    placeholder="Enter book name"
                    className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                    value={SearchKey} onChange={e => setSearchKey(e.target.value)} />
                  <button className="rounded bg-stone-600 text-white px-4 py-2 hover:bg-stone-700 flex items-center gap-1">
                    Search <IoSearch />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex p-10 gap-10 items-start">
            <div className="w-64 flex flex-col gap-2 bg-white rounded p-4 shadow">
              <h1 className="text-xl font-bold mb-4">Filters</h1>
              <div><input type="radio" name='filter' id='Literary Fiction' onClick={() => handleFilter('Literary Fiction')} /><label htmlFor="Literary Fiction"> Literary Fiction</label></div>
              <div><input type="radio" name='filter' id='Philosophy' onClick={() => handleFilter('Philosophy')} /><label htmlFor="Philosophy"> Philosophy</label></div>
              <div><input type="radio" name='filter' id='Thriller' onClick={() => handleFilter('Thriller')} /><label htmlFor="Thriller"> Thriller</label></div>
              <div><input type="radio" name='filter' id='Romance' onClick={() => handleFilter('Romance')} /><label htmlFor="Romance"> Romance</label></div>
              <div><input type="radio" name='filter' id='Horror' onClick={() => handleFilter('Horror')} /><label htmlFor="Horror"> Horror</label></div>
              <div><input type="radio" name='filter' id='Auto Biography' onClick={() => handleFilter('Auto Biography')} /><label htmlFor="Auto Biography"> Auto Biography</label></div>
              <div><input type="radio" name='filter' id='Self Help' onClick={() => handleFilter('Self Help')} /><label htmlFor="Self Help"> Self Help</label></div>
              <div><input type="radio" name='filter' id='Politics' onClick={() => handleFilter('Politics')} /><label htmlFor="Politics"> Politics</label></div>
              <div><input type="radio" name='filter' id='No-filter' onClick={() => handleFilter('No-filter')} /><label htmlFor="No-filter"> No-filter</label></div>
            </div>

            <div className="flex flex-wrap justify-center gap-5 flex-1">
              {allBooks.length > 0 ? (
                allBooks.map(item => (

                  <Link to={`/viewBook/${item._id}`} key={item._id}>
                    <div className="w-72 h-[400px] bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden flex flex-col " hidden={item?.status == 'pending' || item?.status == 'sold'}>
                      <img className="w-full h-48 object-contain object-center" src={item.imageUrl} alt="Book" />
                      <h5>{item.title}</h5>
                      <p>Price: {item.dprice}</p>
                      <div className="flex-1 p-3 bg-stone-400 flex flex-col">
                        <p className="text-white mb-3">{item.abstract}</p>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-center text-gray-700 mt-4">No books found</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default AllBooks
