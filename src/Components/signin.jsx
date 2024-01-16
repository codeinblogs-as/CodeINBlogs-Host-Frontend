import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import logo from "../assests/logo/logo.svg";
import or from "../assests/images/OR.svg";
import { useAuth } from '../context/AuthContext';
import SignUpPopup from './Signup';

function SignInPopup({ onClose }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { logIn } = useAuth();
    const [user, setUser] = useState([]);
    const [isCollapsed, setCollapsed] = useState(true);
    const [showSignUpPopup, setShowSignUpPopup] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`http://localhost:5000/api/v1/auth/login`, { email, password });
            if (res && res.data.success) {
                toast.success(res.data.message);
                const token = res.data.token;
                logIn(res.data, token);
                localStorage.setItem('auth', JSON.stringify(res.data));
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong");
        }
    }

    const handleGoogleLogin = useGoogleLogin({
        onSuccess: (codeResponse) => {
            setUser(codeResponse);
            toast.success("User login successfully");
            logIn(codeResponse);
        },
        onError: (error) => console.log('Login Failed:', error)
    });

    const openSignUpPopup = () => {
        setShowSignUpPopup(true);
        setCollapsed(true);
    };

    const closeSignUpPopup = () => {
        setShowSignUpPopup(false);
    };
    useEffect(() => {
        if (user) {
            axios
                .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                    headers: {
                        Authorization: `Bearer ${user.access_token}`,
                        Accept: 'application/json',
                    },
                })
                .then((res) => {
                    axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/googleLogin`, { profile: res.data }).then((response) => {
                        console.log('User register successfully', response.data);
                        const token = response.data.token;
                        logIn(response.data, token);
                        localStorage.setItem('auth', JSON.stringify(response.data));
                        window.location.reload();
                    });
                })
                .catch((err) => console.log(err));
        }
    }, [user]);

    return (
        <>
            {!showSignUpPopup && (
                <div className="min-h-screen flex flex-col items-center justify-center bg-gray-300">
                    <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md">
                        <div className="font-medium self-center text-xl sm:text-2xl uppercase text-gray-800">Login To Your Account</div>
                        <div className='mt-4 flex items-center justify-center'>


                            <button onClick={handleGoogleLogin} class="px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-grey-900 hover:border-slate-400 dark:hover:border-slate-500 hover:text-grey-950 font-bold hover:shadow transition duration-150">
                                <img class="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" alt="google logo" />
                                <span>SignIn with Google</span>
                            </button>
                        </div>
                        <div className="relative mt-10 h-px bg-gray-300">
                            <div className="absolute left-0 top-0 flex justify-center w-full -mt-2">
                                <span className="bg-white px-4 text-xs text-gray-500 uppercase">Or Login With Email</span>
                            </div>
                        </div>
                        <div className="mt-10">
                            <form onSubmit={handleLogin}>
                                <div className="flex flex-col mb-6">
                                    <label htmlFor="email" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">E-Mail Address:</label>
                                    <div className="relative">
                                        <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                                            <svg className="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                                                <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                            </svg>
                                        </div>
                                        <input
                                            id="email"
                                            type="email"
                                            name="email"
                                            className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                                            placeholder="E-Mail Address"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col mb-6">
                                    <label htmlFor="password" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Password:</label>
                                    <div className="relative">
                                        <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                                            <span>
                                                <svg className="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                                </svg>
                                            </span>
                                        </div>
                                        <input
                                            id="password"
                                            type="password"
                                            name="password"
                                            className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center mb-6 -mt-4">
                                    <div className="flex ml-auto">
                                        <a href="#" className="inline-flex text-xs sm:text-sm text-blue-500 hover:text-blue-700">Forgot Your Password?</a>
                                    </div>
                                </div>
                                <div className="flex w-full">
                                    <button type="submit" className="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in">
                                        <span className="mr-2 uppercase">Login</span>
                                        <span>
                                            <svg className="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                                                <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </span>
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="flex justify-center items-center mt-6">
                            <a onClick={openSignUpPopup} target="_blank" className="inline-flex items-center font-bold text-blue-500 hover:text-blue-700 text-xs text-center">
                                <span>
                                    <svg className="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                                        <path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                    </svg>
                                </span>
                                <span className="ml-2">You don't have an account?</span>
                            </a>
                        </div>
                    </div>
                    <ToastContainer />
                </div>
            )}

            {showSignUpPopup && (
                <SignUpPopup onClose={closeSignUpPopup} />
            )}
        </>
    );
}

export default SignInPopup;
