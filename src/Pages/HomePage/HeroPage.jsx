import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom'

const HeroPage = () => {
    const navigate = useNavigate();
    const creatPost = () => {
        navigate("/postBlog");
    }

    const [communitys, setcommunitys] = useState([]);

    useEffect(() => {
        // Fetch communitys from the server when the component mounts
        const fetchcommunitys = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/admin/displayCommunityImage`);
                setcommunitys(response.data);
            } catch (error) {
                console.error('Error fetching communitys:', error);
            }
        };

        fetchcommunitys();
    }, []);
    return (
        <div>
            <div className='flex flex-col text-white gap-8'>
                <div className='text-center'>

                    <h1 className='text-6xl mt-20'>Powerful Platform & Community for <br />Developer.</h1>
                </div>
                <div className='text-center'>
                    <p>"Empower Your Code Journey and Ignite the CodeINBlogs <br />Revolution to Forge Your Code Destiny!"</p>
                </div>
                <div className='flex justify-center gap-4 text-xs'>
                    <div>
                        <button className='border border-black rounded-full px-5 py-3 bg-gradient-to-r from-purple-800 to-black'
                            onClick={creatPost}>START BLOGGING</button>

                    </div>
                    <div className='border border-white rounded-full px-5 py-3'>
                        <button>EXPLORE NOW
                        </button>
                    </div>


                </div>
                <div className='flex flex-col items-center justify-center'>
                    <div>

                        <p className='text-[#618ADC]'>Our Community & Certificate Partners</p>
                    </div>
                    <div className='flex '>
                        {communitys.map((community) => (
                            <div key={community._id} className="p-4">
                                <img
                                    src={`data:image/jpeg;base64,${community.communityImage}`} // Adjust the MIME type as needed
                                    alt="community"
                                    className="w-24 h-12"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default HeroPage