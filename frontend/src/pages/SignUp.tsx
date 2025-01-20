import { useState, useEffect } from "react"
import axios from "axios";
import {NavLink, useNavigate} from "react-router-dom"
import Quote from "../components/Quote";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


const SignUp
 = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({username: "", email: "",  password: ""});
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
                    navigate("/sigin")
                }
            })
        }catch(error) {
            console.log(error);
        }
    }, [])

    function handleChange(e: any) {
        setFormData(formData => ({...formData, [e.target.name]: e.target.value}));
    }

    async function handleClick() {
        navigate("/blogs");
        try{
            const response = await axios.post("https://backend.manasths.workers.dev/api/v1/user/signup", {
                "username": `${formData.username}`,
                "email": `${formData.email}`,
                "password": `${formData.password}`
            }
            );
            localStorage.removeItem("token")
            localStorage.setItem("token", response.data.jwt);
        } catch(error) {
            alert("Error while signing up")
        }
    }
  return (
    <div className="flex flex-row">
        <div className="flex flex-col flex-1 items-center justify-center w-screen h-screen">
            <div className="w-3/4">
                <p className="text-4xl font-extrabold text-center">Create an account</p>
                <p className="text-l text-center mt-2">Already have an account? <NavLink to="/signin" className="underline">Login</NavLink></p>

                <div className="flex flex-col gap-3 mt-5">
                    <label htmlFor="" className="font-bold">Username</label>
                    <input type="text" className="border border-slate-300 p-2 rounded-md" name="username" onChange={handleChange} placeholder="Enter your username"/>
                    <label htmlFor="" className="font-bold">Email</label>
                    <input type="email" className="border border-slate-300 p-2 rounded-md" name="email" onChange={handleChange} placeholder="Enter your email"/>
                    <label htmlFor="" className="font-bold">Password</label>
                    <input type="password" className="border border-slate-300 p-2 rounded-md" name="password" onChange={handleChange}/>
                    <button className="w-full p-2.5 rounded-lg bg-gray-800 hover:bg-gray-900 mt-3 text-white" onClick={handleClick}>Sign Up</button>
                </div>
            </div>
         </div>
            <Quote />
    </div>

  )
}

export default SignUp
