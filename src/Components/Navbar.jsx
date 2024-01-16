import React, { useState } from 'react';
import SignInPopup from './signin';
import SignUpPopup from './Signup';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import logo from "../assests/logo/logo.png";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [showSignInPopup, setShowSignInPopup] = useState(false);
    const [showSignUpPopup, setShowSignUpPopup] = useState(false);
    const [isCollapsed, setCollapsed] = useState(true);
    const { isLoggedIn, profile, logOut, isAdmin } = useAuth();
    const navigate = useNavigate();

    const openSignInPopup = () => {
        setShowSignInPopup(true);
        setCollapsed(true);
    };

    const closeSignInPopup = () => {
        setShowSignInPopup(false);
    };

    const openSignUpPopup = () => {
        setShowSignUpPopup(true);
        setCollapsed(true);
    };

    const closeSignUpPopup = () => {
        setShowSignUpPopup(false);
    };

    const handleLogout = () => {
        logOut();
    };

    const handleProfileClick = () => {
        if (isLoggedIn) {
            if (isAdmin) {
                navigate('/admindashboard');
            } else {
                navigate('/userdashboard');
            }
        }
    };

    const toggleNavbar = () => {
        setCollapsed(!isCollapsed);
    };

    return (
        <>
            {!showSignInPopup && !showSignUpPopup && (
                <nav className="border-gray-200 ">
                    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

                        <a href="https://CodeINBlogs.co/" className="flex items-center space-x-3 rtl:space-x-reverse">
                            <img src={logo} className="h-16" alt="CodeINBlogs Logo" />
                        </a>

                        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                            {isLoggedIn ? (
                                <>
                                    <button onClick={handleProfileClick}>
                                        <span className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                            {profile ? profile.name : 'User'}
                                        </span>
                                    </button>

                                    <button onClick={handleLogout} className="text-white pl-5 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <div className='flex gap-2'>
                                        <button onClick={openSignInPopup} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                            Sign In
                                        </button>
                                        <button onClick={openSignUpPopup} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                            Sign Up
                                        </button>
                                    </div>
                                </>
                            )}

                            <button data-collapse-toggle="navbar-cta" type="button" onClick={toggleNavbar} className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-cta" aria-expanded={!isCollapsed}>
                                <span className="sr-only">Open main menu</span>
                                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
                                </svg>
                            </button>
                        </div>

                        <div className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${isCollapsed ? 'hidden' : ''}`} id="navbar-cta">
                            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0  dark:border-gray-700">
                                <li>
                                    <a href="/" className="block py-2 px-3 md:p-0 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:dark:text-blue-500" aria-current="page">Home</a>
                                </li>
                                <li>
                                    <a href="#" className="block py-2 px-3 md:p-0 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Blogs</a>
                                </li>
                                <li>
                                    <a href="#" className="block py-2 px-3 md:p-0 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Events</a>
                                </li>
                                <li>
                                    <a href="/about" className="block py-2 px-3 md:p-0 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About Us</a>
                                </li>
                                <li>
                                    <a href="#" className="block py-2 px-3 md:p-0 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Membership</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            )}
            {showSignInPopup && (
                <SignInPopup onClose={closeSignInPopup} />
            )}
            {showSignUpPopup && (
                <SignUpPopup onClose={closeSignUpPopup} />
            )}
        </>
    );
};

export default Navbar;
