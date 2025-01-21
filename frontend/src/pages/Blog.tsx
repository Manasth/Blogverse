import { useBlog } from "../hooks"
import Appbar from "../components/Appbar";
import FullBlog from "../components/FullBlog";
import { useParams } from "react-router-dom";
import FullBlogSkeleton from "../components/FullBlogSkeleton";

const Blog = () => {
  const {id} = useParams();
  const {isLoading, blog} = useBlog({
    id: id || ""
  });

  if(isLoading || !blog) {
    return (
      <>
      <Appbar/>
      <FullBlogSkeleton />
      </>
    )
  }

  return (
    <div>
      <FullBlog blog={blog} />
    </div>
  )
}

export default Blog