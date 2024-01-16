import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateTestimonials = () => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        authorName: '',
        role: '',
        testimonialImage: null,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, testimonialImage: file });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const postData = new FormData();
        for (const key in formData) {
            postData.append(key, formData[key]);
        }

        try {
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/admin/uploadTestimonials`, postData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            navigate("/");
            console.log('Testionomials uploaded successfully');
        } catch (error) {
            console.error('Error uploading blog:', error);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-4 text-white">
            <h2 className="text-3xl font-semibold mb-4">Upload a Testimonials</h2>
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
                    name="authorName" // Updated to match the state key
                    placeholder="Speaker Name"
                    onChange={handleInputChange}
                    required
                    className="p-2 border rounded w-full"
                />
                <input
                    type="text"
                    name="role" // Updated to match the state key
                    placeholder="Role"
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

        </div >
    )
}

export default CreateTestimonials