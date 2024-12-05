import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Dashboard from '../components/Dashboard';

const DashboardPage = () => {
    const navigate = useNavigate();

    useEffect(() => {

        if (!localStorage.getItem('token')) {
            navigate('/login');

        }

    }, []);

    return (
        <div className="min-h-screen bg-gray-100">
            <Dashboard />
        </div>
    );
};

export default DashboardPage;
