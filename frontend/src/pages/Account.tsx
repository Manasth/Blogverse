import { useEffect, useState } from "react"
import Appbar from "../components/Appbar"
import axios from "axios";
import Spinner from "../components/Spinner";
import Profile from "../components/Profile";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Account = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [userData, setUserData] = useState({username: "", email: ""});
    const token = localStorage.getItem("token");

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/user/check`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            setUserData(response.data.user);
            setIsLoading(false);
        })
    }, [])

  return (
    <div>
        <Appbar/>
        {isLoading ? <Spinner />: <Profile userData={userData}/>}
    </div>
  )
}

export default Account