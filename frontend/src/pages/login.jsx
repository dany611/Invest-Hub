import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';

const Login = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/dashboard');
        }

    }, []);

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl w-full bg-white rounded-lg shadow-lg p-6 sm:p-8 md:py-10 md:px-12">
                <h1 className="text-3xl font-extrabold text-center mb-6 text-blue-700 sm:text-4xl">
                    Welcome to InvestHub
                </h1>
                <p className="text-gray-600 text-center mb-8 text-sm sm:text-base md:text-lg">
                    Connecting businesses with the right investors.
                </p>
                <LoginForm />
                <p className="text-gray-600 text-center mt-8 text-sm">
                    Create an account?{' '}
                    <button
                        onClick={() => navigate('/register')}
                        className="text-blue-500 hover:underline"
                    >
                        Register
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Login;
