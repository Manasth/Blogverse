import { useNavigate } from "react-router-dom"

interface BlogCardProps {
  authorName: string,
  title: string,
  content: string,
  publishedDate: string,
  id: string
}

const BlogCard = ({authorName, title, content, publishedDate, id}: BlogCardProps) => {
  const navigate = useNavigate();
  return (
        <div className="flex flex-row justify-center mt-2 lg:px-0 px-4">
        <div onClick={() => {
          navigate(`/blog/${id}`)
        }} className="flex flex-col border-b-slate-400 border-b w-[968px] pl-1 cursor-pointer">
          <div className="flex flex-row items-center gap-2">
            <Avatar name={authorName}/>
            <p className="font-extralight text-sm">{authorName || "Anonymous"}</p>
            <Circle />
            <p className="text-slate-500 font-thin text-sm">{publishedDate}</p>
          </div>
          <p className="text-xl font-semibold">{title}</p>
          <p className="text-md font-thin">{content.slice(0, 100) + "..."}</p>
          <div className="font-thin text-sm bg-slate-200 rounded-md max-w-fit px-2 mb-2">
            {`${Math.ceil(content.length/100)} minute(s) read`}
          </div>
        </div>
      </div>
  )
}

export function Circle() {
  return <div className="h-1 w-1 rounded-full bg-slate-400">

  </div>
}

export function Avatar({name}: {name: string}) {
  return (

  <div className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
      <span className="font-medium text-gray-600 dark:text-gray-300">{name[0]}{name.split(" ").length > 1 ? name.split(" ")[1][0]: ""}</span>
  </div>

  )
}

export default BlogCard
