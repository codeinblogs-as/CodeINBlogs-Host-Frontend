// BlogPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function BlogPage() {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/blog/displayBlog`);
                setBlogs(response.data);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };

        fetchBlogs();
    }, []);

    const formatDate = (dateString) => {
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <>
            <section className='bg-[#000000]'>
                <div className="container mx-auto p-4">
                    <h2 className="text-3xl font-semibold mb-4">Blog List</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
                        {blogs.map((blog) => (
                            <Link
                                to={`/blog/${blog._id}`}
                                key={blog._id}
                                className="text-black bg-gradient-to-l from-[#161B68] to-[#1D0315] border rounded-2xl border-[#000000]">
                                <div className="flex flex-col md:flex-row rounded-2xl shadow border-solid border-2 border-[#ffffff7a]">

                                    <div className="md:w-1/2 h-64 md:h-auto text-white p-4 md:p-8">
                                        <p className='text-xs'>{formatDate(blog.createdAt)}</p>
                                        <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
                                        <p className="mb-2 text-sm">{blog.description.substring(0, 200)}...</p>
                                        <div className='flex gap-2'>
                                            <p className='border rounded-full border-[#1C5CFF] text-[#1C5CFF] p-2'>{blog.topic}</p>
                                            <p className='mt-2 text-[#FF1C97]'>{blog.authorName}</p>
                                        </div>
                                    </div>

                                    <div className="md:w-1/2 flex">
                                        <img src={`data:image/jpeg;base64,${blog.profileImage}`} alt="" className='w-full h-64 md:h-auto rounded-l md:rounded-l-none md:rounded-r p-4 md:p-8' />
                                    </div>

                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}

export default BlogPage;
