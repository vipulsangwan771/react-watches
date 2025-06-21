import React, { useEffect, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useBlogs } from "./BlogContext";

function Home() {
  const { blogs, setBlogs, hasChanges } = useBlogs();

  // Use `useCallback` to memoize setBlogs function
  const memoizedSetBlogs = useCallback((newBlogs) => {
    setBlogs(newBlogs);
  }, [setBlogs]);

  const api = async () => {
    try {
      const response = await axios.get("https://app.heyvisuals.com/api/blogs?limit=6");
      memoizedSetBlogs(response.data.blogs.data);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    if (blogs.length === 0 || hasChanges === true) {
      api();
    }
  }, [blogs.length, hasChanges, memoizedSetBlogs]);

  return (
    <>
      <div className="flex items-center justify-between">

        <Link to="/main" className="px-6">All Main</Link>
        <h1 className="text-center text-3xl font-bold my-6">Welcome to Blogs</h1>


        <Link to="/functions" className="px-6">Function List</Link>

      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 mb-10">
        {blogs.length > 0 ? (
          blogs.map((blog, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
              <img
                src={blog.image}
                alt="Blog Thumbnail"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h5 className="text-xl font-semibold mb-2">{blog.data.title}</h5>
                <p className="text-gray-600 mb-4">{blog.data.description}</p>
                <Link
                  to={`/blog/${blog.id}`}
                  state={{ blog }}
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition duration-200"
                >
                  Go to Blog
                </Link>
              </div>
            </div>
          ))
        ) : (
          [...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
              <div className="bg-gray-300 h-48 w-full" />
              <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded w-full"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                <div className="h-4 bg-gray-300 rounded w-full"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                <div className="h-4 bg-gray-300 rounded w-full"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                <div className="h-4 bg-gray-300 rounded w-full"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                <div className="h-8 bg-blue-300 rounded w-1/3 mt-4"></div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default Home;
