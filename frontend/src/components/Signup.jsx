import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('student');
  const [error, setError] = useState(''); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
    
      const response = await axios.post('http://localhost:3000/auth/register', {
        name,
        email,
        password,
        confirm_password: confirmPassword,
        role,
      });

     
      if (response.data.success) {
        alert('Registration successful! Please login.'); 
        navigate('/login');
      } else {
        setError(response.data.message || 'Registration failed'); 
      }
    } catch (err) {
      
      setError(err.response?.data?.message || 'An error occurred during registration');
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-white w-full max-w-4xl h-auto md:h-4/5 shadow-lg rounded-lg flex flex-col md:flex-row overflow-hidden">
       
        <div className="hidden sm:flex w-full md:w-1/2 relative bg-gradient-to-r from-purple-800 to-pink-500 flex-col justify-center items-center text-white p-8">
          <img
            src="https://9347819.fs1.hubspotusercontent-na1.net/hubfs/9347819/blog-images/may-2024/Welcome-messages-to-new-employees.jpg"
            alt="Left Partition Image"
            className="w-full h-full object-cover absolute top-0 left-0 opacity-30"
          />
        </div>

        
        <div className="w-1/2 bg-white flex flex-col justify-center items-center p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Sign Up</h2>
          <form className="w-full max-w-sm" onSubmit={handleSubmit}>
           
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-600 mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter your full name"
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

           
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
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

           
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-600 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

          
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-gray-600 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        >
          <option value="student">Student</option>
          <option value="mentor">Mentor</option>
        </select>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-lg font-bold hover:opacity-90"
            >
              Continue
            </button>
          </form>
          
        </div>
      </div>
    </div>
  );
}

export default Signup;
