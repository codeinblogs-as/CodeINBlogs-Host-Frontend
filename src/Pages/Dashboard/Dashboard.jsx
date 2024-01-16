import React from 'react'
import { useAuth } from '../../context/AuthContext';

const Dashboard = () => {
    const { isLoggedIn, profile, logOut } = useAuth();
    return (
        <>
            <p>{profile.name}</p>
            <p>{profile.email}</p>
        </>
    )
}

export default Dashboard