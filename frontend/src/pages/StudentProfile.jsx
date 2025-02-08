import { useNavigate } from 'react-router-dom';

function StudentProfile() {
  const navigate = useNavigate();

  const handleBackToDashboard = () => {
    navigate('/student-dashboard'); 
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    localStorage.removeItem('user'); 
    navigate('/'); 
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600">
   
      <nav className="bg-white shadow-lg p-6 flex justify-between items-center rounded-b-lg">
        <div className="text-3xl font-bold text-blue-600">
          SMARTSPACE
        </div>
        <div className="flex items-center space-x-6">
          <button
            onClick={handleBackToDashboard}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-full hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 transition duration-300"
          >
            Back to Dashboard
          </button>
          <button
            onClick={handleLogout}
            className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-full hover:bg-gradient-to-r hover:from-red-600 hover:to-pink-600 transition duration-300"
          >
            Logout
          </button>
        </div>
      </nav>

  
      <div className="container mx-auto px-4 py-8 flex">
    
        <div className="w-1/4 bg-white p-6 rounded-lg shadow-lg mb-8">
          <div className="text-center">
            <div className="w-28 h-28 bg-blue-500 rounded-full mx-auto mb-6 flex items-center justify-center text-white text-4xl shadow-xl">
              👤
            </div>
            <h2 className="text-3xl font-semibold mb-3">John Doe</h2>
            <p className="text-lg text-gray-600 mb-4">john.doe@example.com</p>
            <p className="text-gray-700">
              Welcome to your profile! Here, you can manage your personal information, track your progress, and connect with mentors.
            </p>
          </div>
        </div>

    
        <div className="w-3/4">
       
          <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
            <div className="text-gray-700">
              <ul className="list-disc list-inside space-y-2">
                <li>Mentor Meeting - October 25, 2023</li>
                <li>Course Deadline - November 1, 2023</li>
                <li>Workshop - November 5, 2023</li>
              </ul>
            </div>
          </div>

        
          <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl font-bold mb-4">Your Courses</h2>
            <div className="text-gray-700">
              <ul className="list-disc list-inside space-y-2">
                <li>Introduction to React</li>
                <li>Advanced JavaScript</li>
                <li>Data Structures and Algorithms</li>
              </ul>
            </div>
          </div>

         
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Your Mentor</h2>
            <div className="flex items-center space-x-6 mt-6">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl shadow-xl">
                👩‍🏫
              </div>
              <div>
                <p className="font-semibold text-xl">Jane Smith</p>
                <p className="text-sm text-gray-600">Senior Software Engineer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentProfile;
