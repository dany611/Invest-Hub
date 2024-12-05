import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useLocation,useNavigate } from "react-router-dom";
import ChatInterface from '../components/ChatView';

const Chat = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { businessId, investorId } = useParams();
  const type = location.state ? location.state.type : null;
  const name = location.state ? location.state.name : null;

    useEffect(() => {

        if (!localStorage.getItem('token')) {
            navigate('/login');

        }

    }, []);



  if (!businessId || !investorId) {
    return <div>Please select a valid chat room.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <ChatInterface businessId={businessId} investorId={investorId}  type={type} title={name}/>
    </div>
  );
};

export default Chat;
