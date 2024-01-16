// App.js
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage/HomePage';
import AboutPage from './Pages/AboutPage';
import BlogPage from './Pages/BlogPage';
import CreatePost from './Components/CreatePost';
import Dashboard from './Pages/Dashboard/Dashboard';
import AdminRoute from './Routes/Adminroute';
import Admin from './Pages/Admin/Admin';
import PrivateRoute from './Routes/Privateroute';
import BlogDetails from './Pages/BlogDetails';
import './App.css';
import './index.css';
import './loader.css'; // Add this line to import the loader styles

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a delay (e.g., while fetching initial data)
    const delay = setTimeout(() => {
      setLoading(false);
    }, 2000);

    // Clear the timeout when the component unmounts
    return () => clearTimeout(delay);
  }, []);

  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/postBlog" element={<CreatePost />} />
        <Route path="/userdashboard" element={<Dashboard />} />
        <Route path="/admindashboard" element={<Admin />} />
        <Route path="blog/:id" element={<BlogDetails />} />
      </Routes>

      {loading && (
        <div className="loader-overlay">
          <div className="loader"></div>
        </div>
      )}
    </div>
  );
}

export default App;
