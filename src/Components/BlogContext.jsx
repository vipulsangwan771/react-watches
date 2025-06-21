import { createContext, useState, useContext, useMemo } from "react";

const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
    const [blogs, setBlogs] = useState([]);
    const [hasChanges, setHasChanges] = useState(false);

    const memoizedBlogs = useMemo(() => blogs, [blogs]);

    return (
        <BlogContext.Provider value={{ blogs: memoizedBlogs, setBlogs, hasChanges, setHasChanges }}>
            {children}
        </BlogContext.Provider>
    );
};

export const useBlogs = () => useContext(BlogContext);
