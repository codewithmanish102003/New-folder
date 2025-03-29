import axios from 'axios';
const API_URL = 'http://localhost:3000/api';

//Register User
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/user/register`, userData);
    return response.data;
  } catch (error) {
    console.log('Error registering user:', error.response.data.error);
    if (error.response && error.response.data) {
      throw new Error(error.response.data.error);
    } else {
      throw new Error(error.message);
    }
  }
};

// Login user
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/user/login`, userData, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log('Error logging in user:', error.response.data.error);
    if (error.response && error.response.data) {
      throw new Error(error.response.data.error || 'Login failed. Please try again.');
    } else {
      throw new Error(error.message || 'Login failed. Please try again.');
    }
  }
};

// Logout user
export const logoutUser = async () => {
  console.log("User logged out")
  try {
    const response = await axios.post(`${API_URL}/user/logout`);
    return response.data;
  } catch (error) {
    console.error('Error logging out user:', error);
    throw error;
  }
};

// Fetch user details
export const fetchUserDetails = async () => {
  try {
    const response = await axios.get(`${API_URL}/user/me`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw error;
  }
};

// Handle login
export const handleLogin = async (email, password) => {
  try {
    const response = await loginUser({ email, password });
    const { token, role } = response;
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    return { token, role };
  } catch (error) {
    console.error('Error handling login:', error);
    throw error;
  }
};

//Delete User Account
export const deleteUser = async (email) => {
  try {
    const response = await axios.delete(`${API_URL}/user/delete`, { data: { email } });
    return response.data;
  } catch (error) {
    console.error('Error handling delete:', error);
    throw error;
  }
};

//Deactivate User Account
export const deactivateUser =async () =>{
  try{
    const response=await axios.post(`${API_URL}/user/deactivate`)
    return response.data
  }catch(error){
    console.log("Error Occurred : ",error)
    throw error
  }
}

//update User details
export const updateUser =async (user) =>{
  try{
    const response=await axios.put(`${API_URL}/user/update`,user)
    return response.data
    }catch(error){
      console.log("Error Occurred : ",error)
      throw error
      }
}