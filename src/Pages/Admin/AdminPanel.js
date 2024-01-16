// AdminPanel.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminPanel() {
    const [pendingBlogs, setPendingBlogs] = useState([]);

    useEffect(() => {
        fetchPendingBlogs();
    }, []);

    const fetchPendingBlogs = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/admin/pending`);
            setPendingBlogs(response.data);
        } catch (error) {
            console.error('Error fetching pending blogs:', error);
        }
    };

    const handleApprove = async (blogId) => {
        try {
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/admin/approve`, {
                blogId,
                action: 'approve',
            });
            // Update UI after approval
            fetchPendingBlogs();
        } catch (error) {
            console.error('Error approving blog:', error);
        }
    };

    const handleReject = async (blogId) => {
        try {
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/admin/approve`, {
                blogId,
                action: 'reject',
            });
            // Update UI after rejection
            fetchPendingBlogs();
        } catch (error) {
            console.error('Error rejecting blog:', error);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-4 text-white">
            <h2 className="text-3xl font-semibold mb-4">Pending Blogs</h2>
            {pendingBlogs.length === 0 ? (
                <p>No pending blogs</p>
            ) : (
                <ul>
                    {pendingBlogs.map((blog) => (
                        <li key={blog._id} className="mb-4">
                            <h3>{blog.title}</h3>
                            <p>{blog.description}</p>
                            <div>
                                <button onClick={() => handleApprove(blog._id)} className="mr-2 bg-green-500 text-white rounded p-2">
                                    Approve
                                </button>
                                <button onClick={() => handleReject(blog._id)} className="bg-red-500 text-white rounded p-2">
                                    Reject
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default AdminPanel;
