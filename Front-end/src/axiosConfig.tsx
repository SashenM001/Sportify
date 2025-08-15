import axios from 'axios';

// Create a new Axios instance with a base URL to simplify your API calls
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api', // Make sure this is your Spring Boot backend's base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// --- Request Interceptor ---
// This runs before every request is sent.
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      // Attach the JWT to the Authorization header in the correct format
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// --- Response Interceptor ---
// This runs for every response, allowing you to handle errors globally.
axiosInstance.interceptors.response.use(
  (response) => {
    // If the request is successful, just return the response
    return response;
  },
  (error) => {
    // Check if the error is a 401 Unauthorized error
    if (error.response && error.response.status === 401) {
      // If a 401 is received, it means the token is expired or invalid.
      // Clear the invalid token from local storage
      localStorage.removeItem('accessToken');

      // Optional: You could redirect the user to the login page here
      // window.location.href = '/login'; 
      console.log('JWT token expired or invalid. User has been logged out.');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;