import { useLocation, useNavigate, Link } from "react-router-dom";

function BlogDetail() {
    const location = useLocation();
    const navigate = useNavigate();
    const blog = location.state?.blog;

    if (!blog) {
        return (
            <div className="text-center mt-10">
                <p className="text-red-500 mb-4">No blog content found.</p>
                <button
                    onClick={() => navigate("/")}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Go back to Home
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto px-4 py-10">
            <h1 className="text-4xl font-bold mb-4">{blog.data.title}</h1>
            <img
                src={blog.image}
                alt="Blog"
                className="w-full h-64 object-cover mb-4 rounded"
            />
            <div
                className="text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: blog.data.content }}
            />

            <div className="flex justify-between items-center">
                <button
                    onClick={() => navigate("/")}
                    className="bg-blue-600 text-white px-4 py-2 mt-5 rounded"
                >
                    Go back to Home
                </button>


                <Link
                    to={`/editblog/${blog.id}`}
                    state={{ blog }} className="bg-blue-600 text-white px-4 py-2 mt-5 rounded ml-5"
                >
                    Edit Blog
                </Link>
            </div>
        </div>
    );
}

export default BlogDetail;
