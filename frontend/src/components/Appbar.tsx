import { Link } from "react-router-dom"
import { Avatar } from "./BlogCard"
import { useNavigate } from "react-router-dom"

const Appbar = () => {
  const navigate = useNavigate();
  return (
    <div className='flex flex-row  border-b font-bold font-serif justify-between px-4 lg:px-8 py-4 items-center'>
        <Link to={"/"}>
          <div className="text-2xl">
          Blogverse
          </div>
        </Link>

          <div className="flex flex-row gap-3 items-center">
            <Link to={"/blogs"} className="hover:text-opacity-75">
              Blogs
            </Link>

              <button type="button" className="text-white bg-green-600 hover:bg-green-700 
              focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full 
              text-sm px-4 py-[6px] text-center" onClick={() => {navigate("/publish")}}>
                Publish
              </button>
              <Link to="/account">
              <Avatar name="John Doe"/>
              </Link>
          </div>
      </div>
  )
}

export default Appbar