import axios from 'axios';

const API_URL = 'http://localhost:4000/api/auth'; // Adjust to your API URL

// Register user
export const Register = async (data) => {
  console.log(data)
  try{
    const response = await axios.post(`http://localhost:4000/api/auth/register`, data);
    return response.data;
  }
  catch(Error){
    console.log(Error)
  }

  
};

// Login user
export const login = async (data) => {
  const response = await axios.post(`${API_URL}/login`, data);
  return response.data;
};

// Forgot password functionality (optional)
export const forgotPassword = async (email) => {
  const response = await axios.post(`${API_URL}/forgot-password`, { email });
  return response.data;
};

// Reset password functionality (optional)
export const resetPassword = async (data) => {
  const response = await axios.post(`${API_URL}/reset-password`, data);
  return response.data;
};
