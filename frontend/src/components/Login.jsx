import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student'); 
  const [error, setError] = useState(''); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
     
      const response = await axios.post('http://localhost:3000/auth/login', {
        email,
        password,
        role,
      });

      if (response.data.message === "Login successful") {
     
        console.log(response.data) 
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user)); 

     
        if (role === 'student') {
          navigate('/student-dashboard');
        } else if (role === 'mentor') {
          navigate('/mentor-dashboard');
        }
      } else if (response.data.message === "Please complete your registration.") {
       
        navigate('/mentor/registration', { state: { userid: response.data.userid } });
      } else if (response.data.message === "Email not verified. Please check your inbox.") {
        setError(response.data.message); 
      } else {
        setError(response.data.message || 'Invalid credentials'); 
      }
    } catch (err) {
      
      setError(err.response?.data?.message || 'An error occurred during login');
    }
  };

  return (
    <div className="h-screen  flex items-center justify-center">
    <div className="bg-white w-full max-w-4xl h-auto md:h-4/5 shadow-lg rounded-lg flex flex-col md:flex-row overflow-hidden">
    
      <div className="hidden sm:flex w-full md:w-1/2 relative bg-gradient-to-r from-purple-800 to-pink-500 flex-col justify-center items-center text-white p-8">
        <img
          src="https://9347819.fs1.hubspotusercontent-na1.net/hubfs/9347819/blog-images/may-2024/Welcome-messages-to-new-employees.jpg"
          alt="Left Partition Image"
          className="w-full h-full object-cover absolute top-0 left-0 opacity-30"
        />
      </div>


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
          
        </form>
      </div>
    </div>
  </div>);
}

export default Login;