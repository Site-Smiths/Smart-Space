import React, { useState } from "react";

const MentorCard = ({ name, university, image, bio, expertise, location, hourlyRate }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div>
      {/* Mentor Card */}
      <div
        className="text-card-foreground shadow lg:w-64 lg:h-[360px] h-[300px] bg-cream-50 w-52 rounded-2xl border-2 border-black-100 p-4 mx-2 flex flex-col items-center space-y-2 lg:space-y-4 hover:scale-105 transform transition duration-300 ease-in-out cursor-pointer"
        onClick={() => setShowDetails(true)}
      >
        <div className="lg:w-52 lg:h-52 border-2 border-black-200 rounded-xl overflow-hidden">
          <img
            alt={name}
            className="lg:w-full lg:h-full object-cover h-48 w-52"
            src={image}
            loading="lazy"
          />
        </div>
        <div className="text-center lg:text-left lg:px-3">
          <h3 className="text-xl pb-1 font-bold text-gray-900">{name}</h3>
          <p className="text-sm text-gray-700">Helps you apply to {university}</p>
        </div>
      </div>

      {/* Mentor Details Popup */}
      {showDetails && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
          <div className="bg-white p-8 rounded-2xl shadow-lg w-[450px] md:w-[550px] lg:w-[600px] relative">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-xl"
              onClick={() => setShowDetails(false)}
            >
              ✖
            </button>
            <div className="text-center">
              <img src={image} alt={name} className="w-28 h-28 mx-auto rounded-full border-4 border-gray-300" />
              <h2 className="text-3xl font-bold mt-3 text-gray-900">{name}</h2>
              <p className="text-gray-700 text-lg">{university}</p>

              {/* Location */}
              <p className="mt-3 text-gray-600 font-medium">
                📍 Location: <span className="text-black">{location || "Not available"}</span>
              </p>

              {/* Expertise */}
              {expertise && (
                <p className="mt-2 text-lg font-semibold text-purple-600">
                  🎓 Expertise: <span className="text-gray-900">{expertise}</span>
                </p>
              )}

              {/* Hourly Rate */}
              <p className="mt-2 text-lg text-blue-600 font-semibold">
                💰 Hourly Rate: {hourlyRate ? `$${hourlyRate}/hr` : "Not listed"}
              </p>

              {/* Bio */}
              <p className="mt-4 text-gray-700 leading-relaxed">
                {bio ? bio : "No bio available for this mentor."}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MentorCard;
