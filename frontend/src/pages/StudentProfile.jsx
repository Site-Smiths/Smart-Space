import { useNavigate } from 'react-router-dom';

function StudentProfile() {
  const navigate = useNavigate();

  const handleBackToDashboard = () => {
    navigate('/student-dashboard'); // Redirect back to the dashboard
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token
    localStorage.removeItem('user'); // Clear user data
    navigate('/'); // Redirect to home page
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Nav Section */}
      <nav className="bg-white shadow-md p-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-blue-600">Masters Hub</div>
        <div className="flex items-center space-x-4">
          <button
            onClick={handleBackToDashboard}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
          >
            Back to Dashboard
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content Section */}
      <div className="container mx-auto px-4 py-8 flex">
        {/* Profile Section (Left - 20%) */}
        <div className="w-1/5 bg-white p-6 rounded-lg shadow-md mr-8">
          <div className="text-center">
            <div className="w-24 h-24 bg-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-4xl">
              👤
            </div>
            <h2 className="text-2xl font-bold mb-2">John Doe</h2>
            <p className="text-gray-600 mb-4">john.doe@example.com</p>
            <p className="text-gray-700">
              Welcome to your profile! Here, you can manage your personal information, track your progress, and connect with mentors.
            </p>
          </div>
        </div>

        {/* Right Section (80%) */}
        <div className="w-4/5">
          {/* Calendar Section */}
          <div className="bg-white p-8 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-bold mb-4">Calendar</h2>
            <div className="text-gray-700">
              <p>Upcoming Events:</p>
              <ul className="list-disc list-inside">
                <li>Mentor Meeting - October 25, 2023</li>
                <li>Course Deadline - November 1, 2023</li>
                <li>Workshop - November 5, 2023</li>
              </ul>
            </div>
          </div>

          {/* Purchased Courses Section */}
          <div className="bg-white p-8 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-bold mb-4">Purchased Courses</h2>
            <div className="text-gray-700">
              <p>Your Courses:</p>
              <ul className="list-disc list-inside">
                <li>Introduction to React</li>
                <li>Advanced JavaScript</li>
                <li>Data Structures and Algorithms</li>
              </ul>
            </div>
          </div>

          {/* Mentor Section */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Mentor</h2>
            <div className="text-gray-700">
              <p>Your Mentor:</p>
              <div className="flex items-center space-x-4 mt-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl">
                  👩‍🏫
                </div>
                <div>
                  <p className="font-semibold">Jane Smith</p>
                  <p className="text-sm text-gray-600">Senior Software Engineer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentProfile;