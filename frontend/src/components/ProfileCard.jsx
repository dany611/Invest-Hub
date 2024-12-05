import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileCard = ({ profile, currentUser }) => {
  const {
    name,
    industry,
    location,
    requiredInvestment,
    contactDetails,
    preferredIndustries,
    investmentRange,
    _id
  } = profile;

  const navigate = useNavigate();

   
    let type;

    if (contactDetails) {
        type = 'business';
    } else {
        type = 'investor';
    }

    

  const startChat = () => {
    let businessId;
    let investorId;
    let currentUserType;
    if (currentUser.contactDetails) {
        businessId = currentUser._id;
        investorId = _id;
        currentUserType = 'business';
    } else {
        businessId = _id;
        investorId = currentUser._id
        currentUserType = 'investor';
    }
    
    navigate(`/chat/${businessId}/${investorId}`,{
        state: { type: currentUserType, name }
    });
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden p-6 transform transition duration-300 hover:scale-105">
      <h3 className="text-xl font-bold text-blue-700 mb-2">
        {name} ({type === 'business' ? 'Business' : 'Investor'})
      </h3>
      <p className="text-sm text-gray-500 mb-4">{location}</p>
      {type === 'business' ? (
        <>
          <p className="text-gray-700">
            <strong>Industry:</strong> {industry}
          </p>
          <p className="text-gray-700">
            <strong>Required Investment:</strong> ${requiredInvestment}
          </p>
          <p className="text-gray-700">
            <strong>Contact:</strong> {contactDetails}
          </p>
        </>
      ) : (
        <>
          <p className="text-gray-700">
            <strong>Preferred Industries:</strong> {preferredIndustries}
          </p>
          <p className="text-gray-700">
            <strong>Investment Range:</strong> ${investmentRange.min} - ${investmentRange.max}
          </p>
        </>
      )}
      <button onClick={startChat} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
        Connect Via Chat
      </button>
    </div>
  );
};

export default ProfileCard;
