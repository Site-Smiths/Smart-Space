import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student'); // Default role
  const [error, setError] = useState(''); // For error handling
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make API call to authenticate user
      const response = await axios.post('http://localhost:3000/auth/login', {
        email,
        password,
        role,
      });

      // Handle successful login
      if (response.data.message === "Login successful") {
        // Save token to localStorage
        console.log(response.data) 
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user)); // Save user data

        // Redirect based on role
        if (role === 'student') {
          navigate('/student-dashboard');
        } else if (role === 'mentor') {
          navigate('/mentor-dashboard');
        }
      } else if (response.data.message === "Please complete your registration.") {
        // Redirect mentor to registration page
        navigate('/mentor/registration', { state: { userid: response.data.userid } });
      } else if (response.data.message === "Email not verified. Please check your inbox.") {
        setError(response.data.message); // Display email verification error
      } else {
        setError(response.data.message || 'Invalid credentials'); // Handle other errors
      }
    } catch (err) {
      // Handle network or server errors
      setError(err.response?.data?.message || 'An error occurred during login');
    }
  };

  return (
    <div className="h-screen bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center">
    <div className="bg-white w-full max-w-4xl h-auto md:h-4/5 shadow-lg rounded-lg flex flex-col md:flex-row overflow-hidden">
      {/* Left Partition */}
      <div className="hidden sm:flex w-full md:w-1/2 relative bg-gradient-to-r from-purple-800 to-pink-500 flex-col justify-center items-center text-white p-8">
        <img
          src="https://9347819.fs1.hubspotusercontent-na1.net/hubfs/9347819/blog-images/may-2024/Welcome-messages-to-new-employees.jpg"
          alt="Left Partition Image"
          className="w-full h-full object-cover absolute top-0 left-0 opacity-30"
        />
      </div>

      {/* Right Partition */}
      <div className="w-full md:w-1/2 bg-white flex flex-col justify-center items-center p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Sign In</h2>
        <form className="w-full max-w-sm" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-600 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 "
            />
          </div>
          <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 mb-5" > <option value="student">Student</option> <option value="mentor">Mentor</option> </select>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-lg font-bold hover:opacity-90"
          >
            Continue
          </button>
          <p className="text-gray-600 mt-4">or Connect with Social Media</p>
          <div className="flex flex-col w-full max-w-sm gap-3 mt-4">
            <button className="flex items-center justify-center w-full bg-blue-600 text-white p-3 rounded-lg font-bold hover:opacity-90">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="w-5 h-5 mr-2"
                viewBox="0 0 24 24"
              >
                <path d="M23.998 12.004C24 5.372 18.627 0 12 0S0 5.372 0 12.004c0 6.046 4.43 11.056 10.229 11.952V14.79H7.076v-2.786h3.153V9.52c0-3.112 1.83-4.824 4.635-4.824 1.346 0 2.75.242 2.75.242v3.002h-1.55c-1.529 0-2.004.954-2.004 1.93v2.32h3.41l-.545 2.786h-2.865v9.166c5.8-.896 10.23-5.906 10.23-11.952z" />
              </svg>
              Sign in with Facebook
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>);
}

export default Login;