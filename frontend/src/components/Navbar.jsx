import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();


  const logout = async () => {
    await localStorage.removeItem('token');
    navigate('/login', {
      replace: true,
    });
  
  }

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-lg font-bold">Invest Hub</h1>
        <div className="space-x-4">
          {localStorage.getItem('token') && <>
            <Link to="/dashboard" className="hover:underline">
              Dashboard
            </Link>
            <Link onClick={logout} className="hover:underline">
              Logout
            </Link>
          </>
          }
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
