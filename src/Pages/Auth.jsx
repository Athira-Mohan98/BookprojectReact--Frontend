
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { GoogleLoginAPI, LoginAPI, registerAPI } from '../Services/Allapi';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode'


function Auth({ register }) {

  //create a state for holding user data

  const [userDetails, setuserDetails] = useState({

    username: "",
    email: "",
    password: ""
  })

  const navigate = useNavigate()
  const handleRegister = async () => {
    const { username, email, password } = userDetails
    if (!username || !email || !password) {

      //alert("please fill the form")
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
    }
    
    else {
      //api call
      try {
        const result = await registerAPI(userDetails)
        console.log(result);

        if (result.status == 200) {
          toast.success("register successfull",
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
          setuserDetails({
            username: "",
            email: "",
            password: ""
          });
          setTimeout(() => {
            navigate('/login')
          }, 3000)

        }

        else {
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
          setuserDetails({
            username: "",
            email: "",
            password: ""
          });
        }

      } catch (error) {
        console.log(error);

      }

    }

  }
  const handleLogin = async () => {
    const { email, password } = userDetails
    if (!email || !password) {
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
      //api call
      try {
        const result = await LoginAPI(userDetails)
        console.log(result);

        if (result.status == 200) {

          sessionStorage.setItem("existingUser", JSON.stringify(result.data.existingUser))
          sessionStorage.setItem("token", result.data.token)
          toast.success("Login successfull",
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
          setuserDetails({
            email: "",
            password: ""
          });

          if (result.data.existingUser.email == "admin@gmail.com") {
            navigate('/admin-home')
          } else {
            navigate('/')
          }


        }
        else {
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
          setuserDetails({
            email: "",
            password: ""
          });
        }

      } catch (error) {
        console.log(error);

      }
    }
  }
  const handleGoogleAuth = async (credentialResponse) => {
    console.log(credentialResponse);
    const decode = jwtDecode(credentialResponse.credential);
    console.log(decode);

    try {
      const result = await GoogleLoginAPI({ username: decode.name, email: decode.email, password: 'googlepswd', photo: decode.picture });
      console.log(result);

      if (result.status === 200) {
        sessionStorage.setItem("existingUser", JSON.stringify(result.data.existingUser));
        sessionStorage.setItem("token", result.data.token);
        toast.success("Login successful", {
          position: "top-center",
          autoClose: 4000,
          theme: "light",
        });
        setuserDetails({ email: "", password: "" });

        if (result.data.existingUser.email === "admin@gmail.com") {
          navigate('/admin-home');
        } else {
          navigate('/');
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div >
      <div className="bg-[url('https://cdn.pixabay.com/photo/2014/09/28/21/30/light-465350_1280.jpg')] bg-cover bg-center bg-fixed h-screen flex justify-center"
      >
        <div className='basis-128'></div>
        <div className='basis-128'>
          <form className="flex max-w-md flex-col gap-4 mt-30 bg-slate-50 p-5 rounded-2xl ">
            {
              register ?
                <h1 className='text-center text-slate-700 text-4xl'>Register</h1>
                :
                <h1 className='text-center text-slate-700 text-4xl'>Login</h1>
            }
            <div>
              {
                register &&
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="username" className='!text-slate-800'>Username</Label>
                  </div>
                  <TextInput onChange={e => setuserDetails({ ...userDetails, username: e.target.value })} className='' id="username" type="text" placeholder="Enter Your Name" required />
                </div>
              }
              <div className="my-2 block">
                <Label htmlFor="email1" className='!text-slate-950'>Your email</Label>
              </div>
              <TextInput onChange={e => setuserDetails({ ...userDetails, email: e.target.value })} className='' id="email1" type="email" placeholder="name@gmail.com" required />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password1" className='!text-slate-950'>Your password</Label>
              </div>
              <TextInput onChange={e => setuserDetails({ ...userDetails, password: e.target.value })} id="password1" type="password" required />
            </div>

            {
              register ?
                <div className='flex flex-col'>
                  <Button type="button" className='!bg-slate-950' onClick={handleRegister}>SignUp</Button>
                  <p className='text-center mt-3 !text-stone-500 '>Already a member?
                    <Link to={'/login'} className='!text-slate-700 me-2 px-3'>
                      Login Now!
                    </Link>
                  </p>
                </div>
                :
                <div className='flex flex-col'>
                  <Button type="button" className='!bg-slate-950' onClick={handleLogin}>SignIn</Button>
                  <p className='text-center mt-3 !text-stone-500 '>New to here?
                    <Link to={'/register'} className='!text-slate-700 me-2 px-3'>
                      Register Now!
                    </Link>
                  </p>
                  --------------------------------OR--------------------------------------
                  <div>
                    <GoogleLogin
                      onSuccess={credentialResponse => {
                        console.log(credentialResponse);
                        handleGoogleAuth(credentialResponse)
                      }}
                      onError={() => {
                        console.log('Login Failed');
                      }}
                    />
                  </div>
                </div>
            }
            <div>

            </div>
          </form>

        </div>
        <div className='basis-128'></div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Auth