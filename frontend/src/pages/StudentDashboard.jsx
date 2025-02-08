import { useNavigate } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import TopMentors from '../components/TopMentors';
import About from '../components/About';
import ReviewSection from '../components/ReviewSection';

function StudentDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user'); 
    navigate('/'); 
  };

  const handleProfileClick = () => {
    navigate('/student-dashboard/student-profile');
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600">
    
      <nav className="bg-white shadow-lg p-4 flex justify-between items-center rounded-b-lg">
        <div className="text-3xl font-bold text-blue-600">
          SMARTSPACE
        </div>
        <div className="flex items-center space-x-6">
          <button
            onClick={handleProfileClick}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 transition duration-300"
          >
            <span className="text-2xl">👤</span>
          </button>
          <button
            onClick={handleLogout}
            className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-full hover:bg-gradient-to-r hover:from-red-600 hover:to-pink-600 transition duration-300"
          >
            Logout
          </button>
        </div>
      </nav>

    
      <HeroSection />


      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <TopMentors />
        </div>
      </section>

    
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <About />
        </div>
      </section>

 
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <ReviewSection />
        </div>
      </section>
    </div>
  );
}

export default StudentDashboard;
