const FullBlogSkeleton = () => {
  return (
    <div role="status" className="animate-pulse">
    <div className="grid grid-cols-12 px-4 md:px-20 lg:px-40 xl:px-80 w-full py-10">
        <div className="sm:col-span-8 col-span-12 mb-10 sm:mb-0 mr-12">
              <div className="h-5 bg-gray-200 rounded-full mb-4"></div>
              <div className="h-2 bg-gray-200 rounded-full mb-3"></div>
              <div className="h-2 bg-gray-200 rounded-full mb-3"></div>
              <div className="h-2 bg-gray-200 rounded-full mb-3"></div>
              <div className="h-2 bg-gray-200 rounded-full mb-3"></div>
              <div className="h-2 bg-gray-200 rounded-full mb-3"></div>
              <div className="h-2 bg-gray-200 rounded-full mb-3"></div>
              <div className="h-2 bg-gray-200 rounded-full mb-3"></div>
              <div className="h-2 bg-gray-200 rounded-full mb-3"></div>
              <div className="h-2 bg-gray-200 rounded-full mb-3"></div>
              <div className="h-2 bg-gray-200 rounded-full mb-3"></div>
              <div className="h-2 bg-gray-200 rounded-full mb-3"></div>
        </div>
        <div className="sm:col-span-4 col-span-12">
          <div className="flex flex-col">
            <div className="h-3 bg-gray-200 rounded-full mb-3"></div>
              <div className="flex flex-row gap-1 items-start sm:items-center">
                <div className="">
                  <div className="flex justify-center flex-col pl-2">
                    <div className="h-7 w-7 rounded-full bg-gray-200"></div>
                  </div>
                </div>
                <div className="flex flex-col ml-2 flex-1">
                  <div className="h-5 bg-gray-200 rounded-full mb-4"></div>
                  <div className="h-3 bg-gray-200 rounded-full mb-4"></div>
                  <div className="h-3 bg-gray-200 rounded-full mb-4"></div>
                  <div className="h-3 bg-gray-200 rounded-full mb-4"></div>
                </div>
              </div>
            </div>
          </div>
      </div>
      </div>
  )
}

export default FullBlogSkeleton