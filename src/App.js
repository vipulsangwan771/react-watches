import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Home from "./Components/Home";
import BlogDetail from "./Components/BlogDetail";
import BlogEdit from "./Components/BlogEdit";
import { useBlogs } from "./Components/BlogContext";
import axios from "axios";
import Functions from "./Components/Functions";
import Watch from "./Components/Watch";
import StopWatch from "./Components/StopWatch";
import Timer from "./Components/Timer";
import Alarm from "./Components/Alarm";
import Main from "./Components/Main";

function App() {
  const { blogs, setBlogs } = useBlogs();

  useEffect(() => {
    const fetchBlogs = async () => {
      
      if (blogs.length === 0) {
        try {
          const response = await axios.get("https://app.heyvisuals.com/api/blogs?limit=1");
          setBlogs(response.data.blogs.data);
        } catch (error) {
          console.log("Error fetching blogs:", error);
        }
      }
    };

    fetchBlogs();
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/editblog/:id" element={<BlogEdit />} />
        <Route path="/functions" element={<Functions/>} />
        <Route path="/watch" element={<Watch/>} />
        <Route path="/stopwatch" element={<StopWatch/>} />
        <Route path="/timer" element={<Timer/>} />
        <Route path="/alarm" element={<Alarm/>} />
        <Route path="/main" element={<Main/>} />
      </Routes>
    </Router>
  );
}

export default App;
