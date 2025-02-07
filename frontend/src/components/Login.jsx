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
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Login</h2>

        {/* Display error message */}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        >
          <option value="student">Student</option>
          <option value="mentor">Mentor</option>
        </select>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;