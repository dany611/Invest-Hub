import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from "../api/service"

const LoginForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({

        email: '',
        password: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const response = await login(formData);
            localStorage.setItem("token", response.data.token);
            alert(`Login successful!`);
            navigate("/dashboard");
            setFormData({
                email: '',
                password: ""
            });
        } catch (error) {
            console.error(error);
            alert('Login failed. Please try again.');
        }
    };

    return (
        <div className="mx-auto bg-white p-6 rounded shadow-md lg:min-w-96 md:min-w-60 sm:min-w-40">
           

            <form onSubmit={handleSubmit}>




                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Email</label>
                    <input
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 p-2 rounded"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Password</label>
                    <input
                        type="password"
                        name="password"

                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 p-2 rounded"
                        required
                    />
                </div>


                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default LoginForm;
