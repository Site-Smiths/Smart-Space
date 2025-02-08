import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (user?.role === 'student') {
      navigate('/student-dashboard');
    } else if (user?.role === 'mentor') {
      navigate('/mentor-dashboard');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 to-purple-500">
      <div className="bg-white p-10 rounded-lg shadow-xl w-full max-w-md transform transition-all hover:scale-105 duration-300">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Welcome, {user?.name}!</h1>
        <p className="text-lg text-gray-600 mb-6 text-center">You have successfully logged in. Choose your next steps below.</p>
        
        <div className="flex justify-center mt-4">
          <button
            onClick={handleLogout}
            className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold text-lg hover:opacity-80 transform transition-all duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
