import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Outlet, useNavigate } from 'react-router-dom'; // Imported useNavigate for navigation
import axios from 'axios';
import Spinner from '../Spinner';

export default function AdminRoute() {
    const [ok, setOk] = useState(false);
    const [auth] = useAuth();
    const navigate = useNavigate(); // Getting navigate function from react-router-dom

    useEffect(() => {
        const authCheck = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/admin-auth`);
                if (res.data.ok) {
                    setOk(true);
                } else {
                    setOk(false);
                    // Redirect to homepage if not authorized (modify path as needed)
                    navigate('/');
                }
            } catch (error) {
                console.error('Error:', error);
                // Redirect to homepage on error (modify path as needed)
                navigate('/');
            }
        };

        if (auth?.token) authCheck();
    }, [auth?.token, navigate]);

    return ok ? <Outlet /> : <Spinner />;
}
