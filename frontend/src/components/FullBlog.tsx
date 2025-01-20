import Appbar from "./Appbar"
import { Blog } from "../hooks"
import { Avatar } from "./BlogCard"

const FullBlog = ({blog}: {blog: Blog}) => {
  return (
    <>
    <Appbar page="blogs"/>
    <div className="grid grid-cols-12 px-4 md:px-20 lg:px-40 xl:px-80 w-full py-10">
        <div className="sm:col-span-8 col-span-12 mb-10 sm:mb-0 mr-12">
            <p className="text-3xl font-extrabold mb-1">{blog.title}</p>
            <p className="text-slate-500 mb-2">Posted on 15th October 2024</p>
            <p className="">{blog.content}</p>
        </div>
        <div className="sm:col-span-4 col-span-12">
          <div className="flex flex-col">
            <p className="mb-2 font-medium">Author</p>
            <div className="flex flex-row gap-1 items-start sm:items-center">
              <div className="flex-1">
              <Avatar name={blog.author.name || ""} />
              </div>
              <div className="flex flex-col ml-2">
                <p className="text-2xl font-bold mb-2">{blog.author.name || "Anonymous"}</p>
                <p className="text-slate-500">
                  Master of mirth, purveyor of puns, and the
                  funniest person in the kingdom.
                </p>
              </div>
            </div>
          </div>
        </div>
    </div>
    </>
  )
}

export default FullBlog