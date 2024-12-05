import axios from "axios";


const API_URL = 'http://localhost:3000/api';
export const SOCKET_URL = 'http://localhost:3000';

// use token in header for all requests

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


// Business API

export const createBusiness = async (business) => {
  return await axios.post(`${API_URL}/business/register`, business);
}

// Investor API

export const createInvestor = async (investor) => {
  return await axios.post(`${API_URL}/investor/register`, investor);
}

// Login API

export const login = async (data) => {
  return await axios.post(`${API_URL}/user/login`, data);
}

// Match API

export const findMatchProfiles = async () => {
  return await axios.get(`${API_URL}/match/`);
}

// Chat API

export const getMessages = async (businessId,investorId) => {
  return await axios.get(`${API_URL}/chat/events/${businessId}/${investorId}`);
}




