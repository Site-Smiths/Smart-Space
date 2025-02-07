import { useNavigate } from 'react-router-dom';

function MentorDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token
    localStorage.removeItem('user'); // Clear user data
    navigate('/'); // Redirect to home page
  };

  const handleProfileClick = () => {
    navigate('/mentor-dashboard/mentor-profile'); // Redirect to mentor profile
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Nav Section */}
      <nav className="bg-white shadow-md p-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-blue-600">Masters Hub</div>
        <div className="flex items-center space-x-4">
          <button
            onClick={handleProfileClick}
            className="bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-blue-600 transition duration-300"
          >
            <span className="text-xl">👤</span>
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
          >
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
}

export default MentorDashboard;