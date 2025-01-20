import Appbar from "../components/Appbar"
import BlogCard from "../components/BlogCard"
import BlogSkeleton from "../components/BlogSkeleton";
import { useBlogs } from "../hooks"

console.log(`${import.meta.env.VITE_BACKEND_URL}`)

const Blogs = () => {

  const {isLoading, blogs} = useBlogs();

  if(isLoading) {
    return (
      <>
      <Appbar page="blogs"/>
      <div className="flex flex-col h-screen w-screen items-center justify-start">
      <BlogSkeleton />
      <BlogSkeleton />
      <BlogSkeleton />
      <BlogSkeleton />
      <BlogSkeleton />
      <BlogSkeleton />
      </div>
      
      </>
    )
  }

  return (
    <>
    <Appbar page="blogs"/>
    <div className="mt-2">
    {blogs.map(blog => (
      <div>
        <BlogCard
      authorName={blog.author.name || ""}
      title={blog.title}
      content={blog.content}
      id={blog.id}
      publishedDate={"15 October 2024"} />
      </div>
    ))}
    </div>
    </>
  )
}

export default Blogs