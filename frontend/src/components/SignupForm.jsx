import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBusiness, createInvestor} from "../api/service"

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('business'); // 'business' or 'investor'
  const [formData, setFormData] = useState({
    name: '',
    industry: '',
    location: '',
    requiredInvestment: '',
    contactDetails: '',
    preferredIndustries: '',
    minInvestmentRange: 0,
    maxInvestmentRange: 0,
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
      let func =  role === 'business' ? createBusiness : createInvestor;
      const response = await func(formData);
      alert(`Registration successful! ${formData.name} has been added.`);
      navigate("/login");
      setFormData({
        name: '',
        industry: '',
        location: '',
        requiredInvestment: '',
        contactDetails: '',
        preferredIndustries: '',
        investmentRange: '',
        minInvestmentRange: 0,
        maxInvestmentRange: 0,
          email: '',
          password: ""
      });
    } catch (error) {
      console.error(error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="mx-auto bg-white p-6 rounded shadow-md lg:min-w-96 md:min-w-60 sm:min-w-40">
      <h2 className="text-xl font-bold mb-4">Register as {role === 'business' ? 'Business' : 'Investor'}</h2>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Role</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded"
        >
          <option value="business">Business</option>
          <option value="investor">Investor</option>
        </select>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

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

        {role === 'business' && (
          <>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Industry</label>
              <input
                type="text"
                name="industry"
                value={formData.industry}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Required Investment ($)</label>
              <input
                type="number"
                name="requiredInvestment"
                value={formData.requiredInvestment}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Contact Details</label>
              <input
                type="text"
                name="contactDetails"
                value={formData.contactDetails}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 rounded"
                required
              />
            </div>
          </>
        )}

        {role === 'investor' && (
          <>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Preferred Industries</label>
              <input
                type="text"
                name="preferredIndustries"
                value={formData.preferredIndustries}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Min Investment Range ($)</label>
              <input
                type="number"
                name="minInvestmentRange"
                value={formData.minInvestmentRange}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Max Investment Range ($)</label>
              <input
                type="number"
                name="maxInvestmentRange"
                value={formData.maxInvestmentRange}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 rounded"
                required
              />
            </div>
          </>
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
