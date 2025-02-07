import React, { useState } from "react";

const SearchBar = () => {
  const [searchText, setSearchText] = useState("");
  const [locationText, setLocationText] = useState("");
  const [locationFetched, setLocationFetched] = useState(false); // Prevents multiple requests

  // Handle Input Change
  const handleSearchTextChange = (e) => setSearchText(e.target.value);
  const handleLocationTextChange = (e) => setLocationText(e.target.value);

  // Fetch User Location on Click
  const handleLocationClick = () => {
    if (locationFetched) return; // Prevent multiple requests

    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        console.log("User's Coordinates:", latitude, longitude);

        // Reverse Geocode to Get Address
        try {
          const response = await fetch(
            "https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}"
          );
          const data = await response.json();
          const address = data.display_name || "Unknown Location";
          setLocationText(address);
          setLocationFetched(true); // Prevents repeated location fetching
        } catch (error) {
          console.error("Error fetching location:", error);
          setLocationText("Location unavailable");
        }
      },
      (error) => {
        console.error("Error getting location:", error);
        alert("Could not retrieve location. Please enable location services.");
      }
    );
  };

  // Handle Search Click
  const handleSearch = () => {
    console.log("Searching for:", searchText, "at location:", locationText);
  };

  return (
    <section className="text-center px-6 md:px-12 py-16 text-white">
      <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 text-[#6457A6]">
        Learn Beyond Screens
        <br />
        Connect with Real Mentors
      </h1>
      <p className="text-lg md:text-xl mb-10 text-[#5C2751]">
        Get personalized, face-to-face mentorship from experts who’ve walked the path before you
      </p>
    <div className="flex items-center bg-white rounded-full shadow-lg px-4 py-2 space-x-4 w-full md:max-w-2xl mx-auto">
      {/* Search Bar */}
      <div className="flex items-center flex-1 space-x-2">
        <svg
          className="w-5 h-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 576 512"
        >
          <path d="M567.9 450.7L438.6 321.3C471.2 288.5 490 243.7 490 196 490 87.7 402.3 0 294 0S98 87.7 98 196s87.7 196 196 196c47.7 0 92.5-18.8 125.3-51.4l129.3 129.3c6.2 6.2 14.3 9.4 22.6 9.4s16.4-3.1 22.6-9.4C580.4 483.4 580.4 463.1 567.9 450.7zM294 352c-86 0-156-70-156-156S208 40 294 40s156 70 156 156S380 352 294 352z" />
        </svg>
        <input
          type="text"
          placeholder="Try 'Maths'"
          value={searchText}
          onChange={handleSearchTextChange}
          className="w-full text-gray-600 placeholder-gray-400 outline-none bg-transparent"
        />
      </div>

      {/* Divider */}
      <div className="h-6 w-px bg-gray-300"></div>

      {/* Location Bar */}
      <div className="flex items-center flex-1 space-x-2 relative">
        <svg
          className="w-5 h-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 384 512"
        >
          <path d="M215.7 499.2C267 435 384 279.4 384 192 384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
        </svg>
        <input
          type="text"
          placeholder="Course location"
          value={locationText}
          onChange={handleLocationTextChange}
          onClick={handleLocationClick} // Trigger location fetch on click
          className="w-full text-gray-600 placeholder-gray-400 outline-none bg-transparent cursor-pointer"
        />
      </div>

      {/* Search Button */}
      <button
        className="bg-violet-600 text-white rounded-full px-6 py-2 font-medium hover:scale-105 transition-transform"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
    </section>
  );
};

export default SearchBar;