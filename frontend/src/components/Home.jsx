import { Link } from 'react-router-dom';
import HeroSection from './HeroSection';
import MentorDashboard from '../pages/MentorDashboard';
import TopMentors from './TopMentors';
import About from './About';
import ReviewSection from './ReviewSection';

function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Nav Section */}
      <nav className="bg-white shadow-md  flex justify-between items-center p-4">
        <div className="text-2xl font-bold text-blue-600">SMARTSPACE</div>
        <div className="space-x-4">
          <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
            Login
          </Link>
          <Link to="/signup" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300">
            Sign Up
          </Link>
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

export default Home;