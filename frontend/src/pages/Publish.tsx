import { ChangeEvent, useState } from "react"
import Appbar from "../components/Appbar"
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
console.log(import.meta.env.VITE_BACKEND_URL)


const Publish = () => {
    // const [formData, setFormData] = useState({title: null, content: null});
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();
    
  return (
    <>
        <Appbar page="publish"/>
        <div className="flex flex-col justify-center items-center w-full pt-8">
            <div className="w-full max-w-screen-lg">
                <input onChange={(e) => setTitle(e.target.value)} type="text" id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Title" />
            </div>
            <div className="mt-3 w-full max-w-screen-lg">
                <TextEditor handleChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                    setContent(e.target.value);
    }} />
            </div>
            <div className="flex flex-row max-w-screen-lg w-full items-end justify-end mt-3">
                <button onClick={async () => {
                    const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                        title: title,
                        content: content
                    }, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        }
                    })
                    navigate(`/blog/${response.data.id}`);
                }} type="submit" className="inline-flex font-serif items-center justify-center px-5 py-2.5 text-md font-medium text-center text-white bg-green-600 rounded-full w-full focus:ring-4 focus:ring-green-200 hover:bg-green-800">
                    Publish post
                </button>
            </div>
        </div>
    </>
  )
}



function TextEditor({handleChange}: {handleChange: (e: ChangeEvent<HTMLTextAreaElement>) => void}) {
    return (
        <>
            <textarea onChange={handleChange} id="message" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
        </>
    )
}

export default Publish