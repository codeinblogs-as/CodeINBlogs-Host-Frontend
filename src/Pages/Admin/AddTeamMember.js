import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const AddTeamMember = () => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        description: '',
        memberName: '',
        role: '',
        teamImage: null,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, teamImage: file });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const postData = new FormData();
        for (const key in formData) {
            postData.append(key, formData[key]);
        }

        try {
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/admin/uploadTeam`, postData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            navigate("/");
            console.log('Team uploaded successfully');
        } catch (error) {
            console.error('Error uploading blog:', error);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-4 text-white">
            <h2 className="text-3xl font-semibold mb-4">Upload a Team</h2>
            <form onSubmit={handleSubmit} className="space-y-4">

                <textarea
                    name="description"
                    placeholder="Description"
                    onChange={handleInputChange}
                    required
                    className="p-2 border rounded w-full text-black"
                ></textarea>
                <input
                    type="text"
                    name="memberName" // Updated to match the state key
                    placeholder="Member Name"
                    onChange={handleInputChange}
                    required
                    className="p-2 border rounded w-full text-black"
                />
                <input
                    type="text"
                    name="role" // Updated to match the state key
                    placeholder="Role"
                    onChange={handleInputChange}
                    required
                    className="p-2 border rounded w-full text-black"
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

export default AddTeamMember