import { useNavigate } from 'react-router-dom';

function MentorDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user'); 
    navigate('/'); 
  };

  const handleProfileClick = () => {
    navigate('/mentor-dashboard/mentor-profile'); 
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
  
      <nav className="bg-white shadow-xl p-4 flex justify-between items-center rounded-b-lg">
        <div className="text-3xl font-bold text-blue-600">Masters Hub</div>
        <div className="flex items-center space-x-6">
       
          <button
            onClick={handleProfileClick}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-700 transition duration-300"
          >
            <span className="text-xl">👤</span>
          </button>
          
       
          <button
            onClick={handleLogout}
            className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-2 rounded-full hover:bg-gradient-to-r hover:from-red-600 hover:to-pink-600 transition duration-300"
          >
            Logout
          </button>
        </div>
      </nav>

   
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md text-center">
          <h1 className="text-4xl font-semibold text-gray-800 mb-6">
            Welcome, Mentor {user?.name}!
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            You're making a great impact by helping students achieve their goals.
            Here’s where you can manage your profile, connect with students, and track your progress.
          </p>

          <div className="flex justify-center">
            <button
              onClick={handleProfileClick}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-700 transition duration-300"
            >
              Go to Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MentorDashboard;
