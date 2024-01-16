import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const BlogDetails = () => {
    const [blog, setBlog] = useState(null);
    const { id } = useParams();
    const [blogs, setBlogs] = useState([]);
    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/blog/displaySpecificBlog/${id}`);
                setBlog(response.data);
            } catch (error) {
                console.error('Error fetching blog details:', error);
            }
        };

        fetchBlog();
    }, [id]);

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

    const displayedBlogs = blogs.slice(0, 2);
    if (!blog) {
        return <div>Loading...</div>;
    }

    const formatDate = (dateString) => {
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <>
            <section className="container mx-auto p-4 bg-[#0b132e] text-white">
                <div>
                    <h2 className="text-3xl font-semibold mb-4 text-[#5058e8] text-center">{blog.title}</h2>
                    <hr className="h-px my-4 bg-gray-200 w-6/12 border-0 mx-auto dark:bg-gray-700" />
                    <div className='flex flex-col md:flex-row justify-center gap-8'>
                        <p>Author<span className='font-light ml-2'>{blog.authorName}</span></p>
                        <p>Topic<span className='font-light ml-2'>{blog.topic}</span></p>
                        <p className=''>Date<span className='font-light ml-2'>{formatDate(blog.createdAt)}</span></p>
                    </div>
                    <hr className="h-px my-4 bg-gray-200 w-6/12 border-0 mx-auto dark:bg-gray-700" />

                    <img src={`data:image/jpeg;base64,${blog.profileImage}`} alt="" className='mx-auto w-full md:w-6/12 h-6/12' />
                    <p className="mx-auto w-full md:w-6/12">{blog.description}</p>
                </div>

                <div className='pt-8 md:pt-40'>
                    <p className='text-4xl font-normal text-center text-[#5058e8]'>You might also like</p>
                </div>
                <div className="">

                    {displayedBlogs.map((blog) => (
                        <>
                            <hr className="h-px my-4 bg-gray-200 w-6/12 border-0 mx-auto dark:bg-gray-700" />
                            <div className="flex flex-col md:flex-row mx-auto md:w-3/4 lg:w-2/3 xl:w-1/2 mb-8">
                                <img src={`data:image/jpeg;base64,${blog.profileImage}`} alt="" className='w-full md:w-48 h-auto mb-4 md:mb-0' />
                                <div className='md:pl-8 flex flex-col gap-1'>
                                    <p className='text-[#5058e8] text-2xl'>{blog.title}</p>
                                    <p className="mb-2 text-sm">{blog.description.substring(0, 150)}...</p>
                                    <Link to={`/blog/${blog._id}`} key={blog._id} className="text-[#12F7D6">Read More</Link>
                                    <div className='flex gap-4 mt-2'>
                                        <p>Author<span className='font-light ml-2'>{blog.authorName}</span></p>
                                        <p>Topic<span className='font-light ml-2'>{blog.topic}</span></p>
                                        <p className=''>Date<span className='font-light ml-2'>{formatDate(blog.createdAt)}</span></p>
                                    </div>
                                </div>
                            </div>
                        </>
                    ))}
                </div>
            </section>
        </>
    );
};

export default BlogDetails;
