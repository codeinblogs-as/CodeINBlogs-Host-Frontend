import React from 'react';
import about1 from "../assests/images/about1.png";
import about2 from "../assests/images/about2.png";
import about3 from "../assests/images/about3.png";
import Footer from './HomePage/Footer';
import about4 from "../assests/images/about4.png";
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
const AboutPage = () => {

    const [teams, setteams] = useState([]);

    useEffect(() => {
        const fetchteams = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/admin/displayTeam`);
                setteams(response.data);
            } catch (error) {
                console.error('Error fetching teams:', error);
            }
        };

        fetchteams();
    }, []);

    return (
        <>
            <section className='bg-black text-white'>
                <div className='flex flex-col'>

                    <div className='flex flex-col gap-4 py-10 md:py-20'>
                        <h1 className='text-3xl md:text-5xl font-medium text-center '>About Us Page</h1>
                        <p className='text-center text-gray-200'>Lorem ipsum dolor sit amet consectetur.</p>
                        <p className='text-center'>Home <span className='text-gray-200'>/About us </span> </p>
                    </div>
                    <div className='flex flex-col md:flex-row md:items-center py-10 md:py-20 bg-[#1F2A37]'>
                        <div className='md:pl-28 py-10 md:py-20'>
                            <p className='text-3xl md:text-5xl font-medium'>
                                Brilliant Toolkit to Build
                            </p>
                            <p className='text-3xl md:text-5xl font-medium'>
                                Nextgen Website Faster.
                            </p>

                            <p className='md:mr-40 mt-4 md:mt-8 text-[#767D8A] font-medium'>The main ‘thrust' is to focus on educating attendees on how to best protect highly vulnerable business applications with interactive panel discussions and roundtables led by subject matter experts.
                            </p>
                            <br />
                            <p className='md:mr-40 text-[#767D8A] font-medium'>
                                The main ‘thrust' is to focus on educating attendees on how to best protect highly vulnerable business applications with interactive panel</p>

                        </div>
                        <div className='flex gap-4 md:mr-96'>
                            <img src={about2} alt="" className='w-full md:w-80' />
                            <img src={about2} alt="" className='hidden md:block w-full md:w-80' />
                        </div>
                    </div>
                    <div className='bg-blue-700 flex flex-col justify-center h-80 gap-4'>
                        <p className='text-center text-3xl md:text-4xl font-medium'>
                            What Are You Looking For?
                        </p>
                        <p className='text-center text-3xl md:text-4xl font-normal'>
                            Get Started Now
                        </p>
                        <p className='text-center font-medium px-4 md:px-96'>
                            There are many variations of passages of Lorem Ipsum but the majority have suffered in some form. but the majority have suffered in some form.
                        </p>
                        <button className='py-2 mx-auto px-4 bg-green-700 border-black rounded '>Join Community</button>
                    </div>
                    <section class="bg-gray-900">
                        <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 ">
                            <div class="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
                                <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-white">Our Team</h2>
                                <p class="font-light lg:mb-16 sm:text-xl text-gray-400">Explore the whole collection of open-source web components and elements built with the utility classes from Tailwind</p>
                            </div>
                            <div class="grid gap-8 mb-6 lg:mb-16 md:grid-cols-2">
                                {teams.map((team) => (
                                    <div class="items-center  rounded-lg shadow sm:flex bg-gray-800 dark:border-gray-700">
                                        <a href="#">
                                            <img class="w-full md:w-60 rounded-lg sm:rounded-none sm:rounded-l-lg" src={`data:image/jpeg;base64,${team.teamImage}`} alt="Bonnie Avatar" />
                                        </a>
                                        <div class="p-5">
                                            <h3 class="text-xl font-bold tracking-tight text-white">
                                                <a href="#">{team.memberName}</a>
                                            </h3>
                                            <span class="text-gray-400">{team.role}</span>
                                            <p class="mt-3 mb-4 font-light text-gray-400">{team.description}</p>

                                        </div>
                                    </div>

                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            </section>
            {/* <Footer /> */}
        </>
    )
}

export default AboutPage;
