import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DeleteEvent from './DeleteEvent';
import AdminPanel from './AdminPanel';
import CreateTestimonials from './CreateTestimonials';
import AddTeamMember from './AddTeamMember';
const Admin = () => {


    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        speakerName: '',
        topic: '',
        eventLink: '',
        eventImage: null,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, eventImage: file });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const postData = new FormData();
        for (const key in formData) {
            postData.append(key, formData[key]);
        }

        try {
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/admin/upload`, postData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            navigate("/");
            console.log('Event uploaded successfully');
        } catch (error) {
            console.error('Error uploading blog:', error);
        }
    };
    const [formData1, setFormData1] = useState({
        communityImage: null,
    });


    const handleFileChange1 = (e) => {
        const file = e.target.files[0];
        setFormData1({ ...formData1, communityImage: file });
    };

    const handleSubmit1 = async (e) => {
        e.preventDefault();

        const postData = new FormData();
        for (const key in formData1) {
            postData.append(key, formData1[key]);
        }

        try {
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/admin/communityUpload`, postData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Community uploaded successfully');
        } catch (error) {
            console.error('Error uploading blog:', error);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-4 text-white">
            <h2 className="text-3xl font-semibold mb-4">Upload a Event</h2>
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
                    name="speakerName" // Updated to match the state key
                    placeholder="Speaker Name"
                    onChange={handleInputChange}
                    required
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
                    name="eventLink" // Updated to match the state key
                    placeholder="Event url"
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

            <h1 className='text-3xl mt-20'>Upload Community</h1>
            <form onSubmit={handleSubmit1}>
                <input
                    type="file"
                    name="profileImage"
                    accept="image/*"
                    onChange={handleFileChange1}
                    required
                    className="p-2 border rounded w-full"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white rounded p-2 w-full hover:bg-blue-600"

                >
                    Upload Community
                </button>
            </form>
            <DeleteEvent />
            <AdminPanel />
            <CreateTestimonials />
            <AddTeamMember />
        </div >
    )
}

export default Admin