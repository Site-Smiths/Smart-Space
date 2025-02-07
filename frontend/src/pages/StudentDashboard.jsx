import { useNavigate } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import TopMentors from '../components/TopMentors';
import About from '../components/About';
import ReviewSection from '../components/ReviewSection';

function StudentDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token
    localStorage.removeItem('user'); // Clear user data
    navigate('/'); // Redirect to Home
  };

  const handleProfileClick = () => {
    navigate('/student-dashboard/student-profile'); // Redirect to student profile
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Nav Section */}
      <nav className="bg-white shadow-md p-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-blue-600">SMARTSPACE</div>
        <div className="flex items-center space-x-4">
          <button
            onClick={handleProfileClick}
            className="bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-blue-600 transition duration-300"
          >
            <span className="text-xl">👤</span> {/* Profile icon */}
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      
      <HeroSection />

      <TopMentors />

      {/* About Section */}
      <About />

      <ReviewSection />
      
    </div>
  );
}

export default StudentDashboard;