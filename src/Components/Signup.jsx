import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';
import SignInPopup from './signin';

function SignUpPopup({ onClose }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    const [user, setUser] = useState([]);
    const [isCollapsed, setCollapsed] = useState(true);
    const [showSignInPopup, setShowSignInPopup] = useState(false);

    const handleGoogleRegister = useGoogleLogin({
        onSuccess: (codeResponse) => {
            setUser(codeResponse);
            toast.success("User registered successfully", {
                autoClose: 1000,
            });
        },
        onError: (error) => console.log('Login Failed:', error)
    });
    const openSignInPopup = () => {
        setShowSignInPopup(true);
        setCollapsed(true);
    };

    const closeSignInPopup = () => {
        setShowSignInPopup(false);
    };
    useEffect(() => {
        if (user) {
            const res = axios
                .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                    headers: {
                        Authorization: `Bearer ${user.access_token}`,
                        Accept: 'application/json',
                    },
                })
                .then((res) => {
                    axios.post('http://localhost:5000/api/v1/auth/storeUserData', { profile: res.data }).then((response) => {
                        console.log('User data stored successfully:', response.data);
                        navigate('/about');
                        window.location.reload();
                    });
                })
                .catch((err) => console.log(err));
        }
    }, [user]);

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            if (!name || !email || !password || !confirmPassword) {
                toast.error('Please fill in all fields');
                return;
            }

            if (password !== confirmPassword) {
                toast.error('Passwords do not match');
                return;
            }

            const res = await axios.post('http://localhost:5000/api/v1/auth/register', { name, email, password, confirmPassword });
            if (res && res.data.success) {
                navigate("/about");
            } else {
                console.log(res.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            {!showSignInPopup && (
                <div className="min-h-screen flex flex-col items-center justify-center bg-gray-300">
                    <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md">
                        <div className="font-medium self-center text-xl sm:text-2xl uppercase text-gray-800">Sign Up For Your Account</div>
                        <div className='mt-2 flex items-center justify-center'>


                            <button onClick={handleGoogleRegister} class="px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150">
                                <img class="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" />
                                <span>SignUp with Google</span>
                            </button>
                        </div>
                        <div className="relative mt-8 h-px bg-gray-300">
                            <div className="absolute left-0 top-0 flex justify-center w-full -mt-2">
                                <span className="bg-white px-4 text-xs text-gray-500 uppercase">Or Sign Up With Email</span>
                            </div>
                        </div>
                        <div className="mt-10">
                            <form className="mb-6" onSubmit={handleRegister}>
                                <div className="flex flex-col mb-6">
                                    <label htmlFor="name" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Your Name:</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                                        placeholder="Your Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className="flex flex-col mb-6">
                                    <label htmlFor="email" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">E-Mail Address:</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                                        placeholder="E-Mail Address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="flex flex-col mb-6">
                                    <label htmlFor="password" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Password:</label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                                        placeholder="Password"
                                    />
                                </div>
                                <div className="flex flex-col mb-6">
                                    <label htmlFor="confirmPassword" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Confirm Password:</label>
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                                        placeholder="Confirm Password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                                <div className="flex w-full">
                                    <button
                                        type="submit"
                                        className="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in"
                                    >
                                        <span className="mr-2 uppercase">Sign Up</span>
                                        <span>
                                            <svg className="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                                                <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </span>
                                    </button>
                                </div>
                            </form>
                            <div className="flex justify-center items-center mt-6">
                                <Link onClick={openSignInPopup} className="inline-flex items-center font-bold text-blue-500 hover:text-blue-700 text-xs text-center">
                                    <span>
                                        <svg className="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                                            <path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                        </svg>
                                    </span>
                                    <span className="ml-2">Already have an account? Login</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showSignInPopup && (
                <SignInPopup onClose={closeSignInPopup} />
            )}
        </>
    );
}

export default SignUpPopup;
