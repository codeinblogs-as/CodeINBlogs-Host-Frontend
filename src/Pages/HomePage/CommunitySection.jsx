import React from 'react';
import backcommunity from "../../assests/images/communityback.png";
import line1 from "../../assests/images/line1.png";
import line2 from "../../assests/images/line2.png";
import line3 from "../../assests/images/line3.png";
import line4 from "../../assests/images/line4.png";

const CommunitySection = () => {
    return (
        <div className="bg-cover bg-center h-full flex flex-col text-white space-y-10 " style={{ backgroundImage: `url(${backcommunity})` }}>
            <div>
                <p className='text-center mt-20 text-4xl md:text-6xl font-normal font-sairaSemiCondensed leading-10'>Join a community of Thousands of Developers</p>
            </div>
            <div className='flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-16'>
                <div className='flex flex-col text-center md:text-left'>
                    <p className='bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 text-4xl md:text-6xl font-medium'>2000+</p>
                    <p>Community Members</p>
                </div>
                <div className='flex flex-col text-center md:text-left'>
                    <p className='bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 text-4xl md:text-6xl font-medium'>20+</p>
                    <p>Community Ambassadors</p>
                </div>
                <div className='flex flex-col text-center md:text-left'>
                    <p className='bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 text-4xl md:text-6xl font-medium'>20+</p>
                    <p>Mentors</p>
                </div>
            </div>

            <div>
                <p className='text-xl md:text-3xl text-center'>Unlock the CodeINBlogs Experience Through Its Benefits!</p>
            </div>
            <div className='flex flex-col  md:flex-row space-y-4 md:space-y-0 md:space-x-8 md:px-8'>
                <div className=' mb-4 flex flex-col bg-[#00000047] px-4 pt-4 pb-8 border rounded-3xl border-[#00000047]'>
                    <div className='flex gap-4 text-md md:text-lg'>
                        <img src={line1} alt="" />
                        <h1>Learning Hub</h1>
                    </div>
                    <p className='text-xs md:text-sm text-[#C4C4C4]'>Unlock the benefits of CodeINBlogs Premium Membership at an affordable price starting at just ₹250 per month. With CodeINBlogs Premium Membership, you will gain access to more than 5 mentors, enjoy access to premium courses using on-demand coupons, and receive a wide range of beneficial support.</p>
                </div>
                <div className=' mb-4 flex flex-col bg-[#00000047] px-4 pt-4 pb-8 border rounded-3xl border-[#00000047]'>
                    <div className='flex gap-4 text-md md:text-lg'>
                        <img src={line2} alt="" />
                        <h1>Mentorship</h1>
                    </div>
                    <p className='text-xs md:text-sm text-[#C4C4C4]'>Unlock invaluable guidance within CodeINBlogs. Our mentors are ready to assist with project suggestions, code-related queries, resource recommendations, insights, and updates on mentoring sessions. In our supportive environment, you're never alone on your coding journey.</p>
                </div>
                <div className='mb-4 flex flex-col bg-[#00000047] px-4 pt-4 pb-8 border rounded-3xl border-[#00000047]'>
                    <div className='flex gap-4 text-md md:text-lg'>
                        <img src={line3} alt="" />
                        <h1>Hands-On</h1>
                    </div>
                    <p className='text-xs md:text-sm text-[#C4C4C4]'>Immerse yourself in practical coding experiences with CodeINBlogs. Participate in electrifying hackathons, challenges, and real-world projects expertly organized by our team. Hone your skills, gain confidence, and elevate your coding prowess within our immersive environment.</p>
                </div>
                <div className='mb-4 flex flex-col bg-[#00000047] px-4 pt-4 pb-8 border rounded-3xl border-[#00000047]'>
                    <div className='flex gap-4 text-md md:text-lg'>
                        <img src={line4} alt="" />
                        <h1>Exclusive Blogs</h1>
                    </div>
                    <p className='text-xs md:text-sm text-[#C4C4C4]'>Explore the vast coding universe with us! Discover fundamental terms from our coding-related informative and educational posts. Plus, easily share your own insightful blogs with just two simple steps. Reach a wider audience as your blogs are automatically shared with all registered CodeINBlogs members.</p>
                </div>
            </div>
        </div>
    );
}

export default CommunitySection;
