import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

function CreatePost() {
    const { profile } = useAuth();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        authorName: profile.name,
        authorEmail: profile.email,
        topic: '',
        socialMediaHandle: '',
        profileImage: null,
    });


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, profileImage: file });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const postData = new FormData();
        for (const key in formData) {
            postData.append(key, formData[key]);
        }

        try {
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/blog/upload`, postData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Blog uploaded successfully');
        } catch (error) {
            console.error('Error uploading blog:', error);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h2 className="text-3xl font-semibold mb-4">Upload a Blog</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    onChange={handleInputChange}
                    required
                    className="p-2 border rounded w-full"
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    onChange={handleInputChange}
                    required
                    className="p-2 border rounded w-full"
                ></textarea>


                <input
                    type="text"
                    name="authorEmail"
                    placeholder="Author's Email"
                    onChange={handleInputChange}
                    required
                    value={profile.email}
                    className="p-2 border rounded w-full"
                />
                <input
                    type="text"
                    name="authorName"
                    placeholder="Author's Name"
                    onChange={handleInputChange}
                    required
                    value={profile.name}
                    className="p-2 border rounded w-full"
                />
                <input
                    type="text"
                    name="topic"
                    placeholder="Topic"
                    onChange={handleInputChange}
                    required
                    className="p-2 border rounded w-full"
                />
                <input
                    type="text"
                    name="socialMediaHandle"
                    placeholder="Social Media Handle"
                    onChange={handleInputChange}
                    required
                    className="p-2 border rounded w-full"
                />
                <input
                    type="file"
                    name="profileImage"
                    accept="image/*"
                    onChange={handleFileChange}
                    required
                    className="p-2 border rounded w-full"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white rounded p-2 w-full hover:bg-blue-600"
                >
                    Upload
                </button>
            </form>
        </div>
    );
}

export default CreatePost;