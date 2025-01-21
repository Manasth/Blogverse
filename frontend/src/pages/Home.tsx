import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Appbar from "../components/Appbar";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Home = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    try{
        axios.get(`${BACKEND_URL}/api/v1/user/check`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            console.log(response);
            if(response.data.message === "success"){
                navigate("/blogs");
            } else {
                navigate("/home")
            }
        })
    }catch(error) {
        console.log(error);
    }
  }, [])

  return (
    <div>
      <Appbar/>
      <div className="flex flex-col gap-7 items-center justify-center w-screen h-screen bg-[url('/medium_signup_background.png')] bg-cover bg-center z-10">
      <p className="text-7xl text-white font-bold">Blogverse</p>
      <p className="text-3xl text-white font-thin">Where Ideas and Stories Connect</p>
      <div className="flex flex-row">
        <button type="button" className="text-white bg-transparent hover:bg-white hover:bg-opacity-10 border border-white 
                focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full 
                text-sm px-12 py-3 text-center me-2" onClick={() => {navigate("/signin")}}>
                  Sign In
        </button>
        <button type="button" className="text-white bg-black hover:bg-black hover:bg-opacity-75
                focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full 
                text-sm px-12 py-3 text-center me-2" onClick={() => {navigate("/blogs")}}>
                  Read Blogs
        </button>
      </div>
      </div>
    </div>
  )
}

export default Home