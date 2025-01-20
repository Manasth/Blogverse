import { useEffect, useState } from "react";
import axios from "axios";
import {NavLink, useNavigate} from "react-router-dom";
import Quote from "../components/Quote";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const SignIn = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({email: "", password: ""})
    const token = localStorage.getItem("token");

    function handleChange(e: any) {
        setFormData(formData => ({...formData, [e.target.name]: e.target.value}))
    }

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

    async function handleClick() {
        try{const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, {
            "email": `${formData.email}`,
            "password": `${formData.password}`
            });
            console.log(response.data.jwt);
            localStorage.removeItem("token")
            localStorage.setItem("token", response.data.jwt);
            navigate("/blogs");
        }catch(error) {
            console.log(error);
            alert("error")
            navigate("/signin")
        }
    }


  return (
    <div className="flex flex-row">
    <div className="flex flex-col flex-1 items-center justify-center w-screen h-screen">
        <div className="w-3/4">
            <p className="text-4xl font-extrabold text-center">Login to your account</p>
            <p className="text-l text-center mt-2">Don't have an account? <NavLink to="/signup" className="underline">Sign Up</NavLink></p>

            <div className="flex flex-col gap-3 mt-5">
                <label htmlFor="" className="font-bold">Email</label>
                <input type="email" className="border border-slate-300 p-2 rounded-md" name="email" onChange={handleChange} placeholder="Enter your email"/>
                <label htmlFor="" className="font-bold">Password</label>
                <input type="password" className="border border-slate-300 p-2 rounded-md" name="password" onChange={handleChange}/>
                <button className="w-full p-2.5 rounded-lg bg-gray-800 hover:bg-gray-900 mt-3 text-white" onClick={handleClick}>Sign In</button>
            </div>
        </div>
    </div>
    <Quote />
    </div>
  )
}

export default SignIn