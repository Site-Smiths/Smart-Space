import { Link } from 'react-router-dom';
import HeroSection from './HeroSection';
import MentorDashboard from '../pages/MentorDashboard';
import TopMentors from './TopMentors';
import About from './About';
import ReviewSection from './ReviewSection';

function Home() {
  return (
    <div className="min-h-screen ">

      <nav className="   flex justify-between items-center p-4">
        <div className="text-2xl font-bold text-blue-600">SMARTSPACE</div>
        <div className="space-x-4 flex">
        <Link to="/login" className="bg-white text-purple-600 px-4 py-2 rounded-lg flex items-center space-x-2 font-medium hover:bg-purple-600 hover:text-white hover:scale-x-110 hover:scale-y-105 transition-transform duration-30">
            Log In
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.75L21 12m0 0l-3.75 3.25M21 12H3"></path>
            </svg>
          </Link>
          <Link to="/signup" className="bg-white text-purple-600 px-4 py-2 rounded-lg flex items-center space-x-2 font-medium hover:bg-purple-600 hover:text-white hover:scale-x-110 hover:scale-y-105 transition-transform duration-30">
            Sign Up
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.75L21 12m0 0l-3.75 3.25M21 12H3"></path>
            </svg>
          </Link>
          
          
        </div>
      </nav>

   
      <HeroSection />

      <TopMentors />

  
      <About />

      <ReviewSection />
    </div>
  );
}

export default Home;