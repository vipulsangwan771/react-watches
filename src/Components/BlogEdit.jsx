import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useBlogs } from "./BlogContext";

function BlogEdit() {
    const location = useLocation();
    const { blog } = location.state || {}; 
    const { blogs, setBlogs, setHasChanges  } = useBlogs();
    const navigate = useNavigate();

    // Initialize the states first, even if blog is not available yet
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    // Ensure hooks are called before any conditional logic
    useEffect(() => {
        if (blog) {
            setTitle(blog.data.title);
            setDescription(blog.data.description);
        }
    }, [blog]);

    // Early return logic (loading screen) should come **after** hooks
    if (!blog) return  <div className="flex justify-center items-center h-100 w-full mt-20">
      <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
    </div>;

    const handleUpdate = async () => {
        
        setHasChanges(true);
        navigate('/');
        // try {
        //     const response = await axios.put(`https://app.heyvisuals.com/api/blogs/${blog.id}`, {
        //         title,
        //         description,
        //     });

        //     const updatedBlog = {
        //         ...blog,
        //         data: {
        //             ...blog.data,
        //             title: title,
        //             description: description
        //         }
        //     };

        //     const updatedBlogs = blogs.map(b => b.id === blog.id ? updatedBlog : b);
        //     setBlogs(updatedBlogs);
        //     setHasChanges(true);
        //     navigate("/"); 
        // } catch (error) {
        //     console.error("Failed to update blog:", error);
        // }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-xxl m-6">
                <h2 className="text-2xl font-bold mb-4">Edit Blog</h2>

                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700 mb-2">Title</label>
                    <input
                        id="title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        placeholder="Enter title"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="description" className="block text-gray-700 mb-2">Description</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        placeholder="Enter description"
                        rows={6}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex justify-between items-center">
                    <div >
                        <Link className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                            to={`/blog/${blog.id}`}
                            state={{ blog }}
                        >
                            Go to Blog
                        </Link>
                    </div>
                    <div >
                        <button disabled
                            onClick={handleUpdate}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                        >
                            Update Blog
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BlogEdit;
