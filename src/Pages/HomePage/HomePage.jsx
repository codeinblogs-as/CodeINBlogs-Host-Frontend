import React from 'react';
import Navbar from '../../Components/Navbar';
import CreatePost from '../../Components/CreatePost';
import HeroPage from './HeroPage';
import backgroundImage from "../../assests/images/backgroundhome.png"; // Check the path to the image file
import CommunitySection from './CommunitySection';
import EventSection from './EventSection';
import BlogSection from './BlogSection';
import TestimonialSection from './TestimonialSection';
import Footer from './Footer';

const HomePage = () => {
    return (
        <> <div className="bg-cover bg-center bg-black overflow-hidden" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <Navbar />
            <HeroPage />
        </div>

            <CommunitySection />
            <EventSection />
            <BlogSection />
            <TestimonialSection />
            <Footer />
        </>
    );
};

export default HomePage;
