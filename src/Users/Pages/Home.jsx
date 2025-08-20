import React from 'react'
import Header from "../Components/Header";
import PageFooter from '../../Components/PageFooter';
import { getHomeBooksAPI } from '../../Services/Allapi';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SearchContext } from '../../context/ContextShare';
import { useContext } from 'react';
import { IoSearch } from "react-icons/io5";

Header

function Home() {

  const[token,setToken]=useState([])
  const navigate = useNavigate()
   const { SearchKey, setSearchKey } = useContext(SearchContext)
  //to hold home books
  const [homeBooks, setHomeBooks] = useState([]);


  const getHomeBooks = async () => {
    try {
      const result = await getHomeBooksAPI()
      console.log(result);
      setHomeBooks(result?.data || []);

    } catch (error) {
      console.log("Error" + error);

    }
  }
  console.log(homeBooks);

   const handleSearch=()=>{
    const token=sessionStorage.getItem("token")
    if(SearchKey==""){
      alert("Please enter book title")
    }else if(!token){
      alert("Please login")
      navigate('/login')
    }else if(SearchKey&&token){
      navigate('/allbooks')
    }else{
      alert("something went wrong")
    }
  }

  useEffect(() => {
    const tok = sessionStorage.getItem("token")
    if(tok){
      setToken(tok)
    }
    getHomeBooks()
  }, [])

  return (
    <>
      <Header />
      <section id="banner"
        className="bg-[url('https://images.unsplash.com/photo-1419640303358-44f0d27f48e7?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZGFyayUyMGxpYnJhcnl8ZW58MHx8MHx8fDA%3D')] bg-cover bg-center bg-fixed h-170">
        <div className="h-full w-full bg-opacity-50 flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-white text-2xl md:text-3xl font-bold px-3 mb-4">
            Where every page blossoms with stories...
          </h1>

          <p className="text-white text-lg md:text-xl font-semibold mb-6 max-w-2xl">
            More than just a bookstore, <strong>Paper Petals</strong> is a cozy haven for readers, dreamers, and thinkers.
          </p>

          <form className="w-full max-w-sm relative">
  <input type="text" placeholder="Choose Your Stories Now...📒" className="bg-gray-50 border text-center border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 pr-10 shadow"
    onChange={e => setSearchKey(e.target.value)}  value={SearchKey}/>

  <button onClick={handleSearch} type="button"
    className="absolute right-2 top-1/2 -translate-y-1/2 text-white bg-stone-600 hover:bg-stone-700 px-2 py-1 rounded"
  >
    <IoSearch />
  </button>
</form>
        </div>
      </section>

      <section className='text-center '>
        <p className=' mt-4 text-2xl !text-slate-900 font-bold'>NEW ARRIVALS</p>
        <p className=' mt-2 text-2xl !text-slate-700 font-bold'>Explore our Latest Collections</p>
      </section>


      {/* Image */}
      <div className="flex flex-wrap justify-center gap-5 px-4 mt-4">
        {
          homeBooks.length > 0 ?
            homeBooks.map(item => (


              <div className="w-80 h-[560px] bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden dark:bg-gray-800 dark:border-gray-700 flex flex-col">
                <img className="w-full h-100 object-cover object-center" src={item.imageUrl} alt="Book" />
                <h5 className='mt-4 text-center font-semibold'>{item.title}</h5>
                <p className='mt-4 text-center font-semibold mb-1'>price:${item.dprice}</p>
                <div className="flex-1 p-6 bg-stone-600 flex flex-col">
                  <p className="text-white mb-3">
                    {item.abstract} </p>
                 
                </div>
              </div>

            )) :
            <p className="text-center text-gray-700 mt-4">No books found</p>
        }





      </div>

      <section className="mt-5 text-center">
        <Link to={'/allbooks'}> <button className="bg-stone-600 text-white px-6 py-2 rounded-full font-medium hover:bg-stone-800 transition duration-300 shadow">
          Explore More
        </button></Link>
       
      </section>


      {/* Authors */}
      <section className="mt-10 px-6 text-center bg-stone-400 rounded py-3">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-stone-700 mb-2">Featured Authors</h1>
          <h3 className="text-2xl font-semibold text-stone-600">Captivate each stories...</h3>
        </div>
        <div className="md:flex items-center justify-center gap-10 text-left">

          <div className="md:w-1/2 ">
            <p className="text-gray-700 leading-relaxed">
              If you're seeking a gentle rediscovery of self through moving prose and relatable emotions, Ettavum Priyappetta Ennodu is a heartfelt companion. It’s perfect for readers exploring themes of self-acceptance, healing, and the beauty of ordinary life.Ettavum Priyappetta Ennodu is more than just a romance—it's a gentle guide toward self‑love through poetic storytelling. Ideal for anyone seeking emotional depth, healing, and connection in contemporary Malayalam literature. <br />Follows Athithi, a woman reconnecting with her identity after love, loss, and heartbreak—set against Bengaluru’s cityscape <br />
              Explores self‑love, healing, resilience, and the courage to embrace your true self during crises .Spanning 216 pages, it invites readers into the tender journey of Athithi, a young woman navigating heartbreak, healing, and self-discovery in the vibrant city of Bengaluru.
              Author gives us a question of : “How often do we look into the mirror and see a friend instead of a critic?”
            </p>
          </div>
          <div className="md:w-1/2 mt-6 md:mt-0">
            <img
              src="https://rukminim2.flixcart.com/image/750/900/xif0q/regionalbooks/4/b/g/ettavum-priyapetta-ennodu-nanayuvan-njan-kadalaakunnu-nimna-original-imagquzbsqfjfyfa.jpeg?q=90&crop=false"
              alt="Featured Author"
              className="w-full max-w-sm mx-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Testimony */}

      <section className="mt-6 text-center">
        <p className="text-stone-700 text-base font-semibold mb-1 text-center">Testimonials</p>
        <h3 className="text-xl font-bold text-stone-900 mb-3">See what others are saying</h3>
        <div className="w-110 h-102 mx-auto bg-stone-200 rounded-full flex flex-col items-center justify-center shadow-lg p-6">
          <img
            src="https://th-i.thgim.com/public/migration_catalog/article14292026.ece/alternates/FREE_1200/28kisan02-KG-Ge28KI_K._G._GEORGE.j.jpg"
            alt="Testimonial"
            className="w-30 h-32 rounded-full object-cover mb-4 shadow-md"
          />

          <p className="text-gray-700 text-sm px-6 leading-relaxed ">
            “Paper Petals has redefined the way we experience stories. The books they curate are more than pages bound together — they are gateways to emotions, memories, and dreams. Every title I picked from Paper Petals carried a soul, reminding me why I fell in love with reading in the first place. Their commitment to quality and passion for literature is unmatched. I wholeheartedly recommend Paper Petals to anyone seeking books that truly leave an impact.” — Muttath Varkey
          </p>
        </div>
      </section>

      <PageFooter />


    </>
  );
}

export default Home
