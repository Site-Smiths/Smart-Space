import React from 'react'

const MentorForm = () => {
    return (
        <div className='border border-1 mx-16 p-5 my-5 rounded'>
            <h2 class="text-3xl font-bold text-center mb-6">Mentor Registration</h2>
            <div className='flex '>
                <div className='w-full md:w-1/2'>
                    <form className=' bg-white/30 backdrop-blur-md p-6 rounded-xl shadow-lg'>
                        {/* Basic Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="first-name" className="block text-gray-700 font-medium mb-2">First Name</label>
                                <input
                                    type="text"
                                    id="first-name"
                                    name="first-name"
                                    placeholder="Enter your first name"
                                    className="bg-transparent text-zinc-600 w-full px-4 py-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="last-name" className="block text-gray-700 font-medium mb-2">Last Name</label>
                                <input
                                    type="text"
                                    id="last-name"
                                    name="last-name"
                                    placeholder="Enter your last name"
                                    className="bg-transparent w-full px-4 py-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </div>
                        </div>

                        <div className="mt-4">
                            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                                className="bg-transparent w-full px-4 py-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        <div className="mt-4">
                            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Enter your password"
                                className="bg-transparent w-full px-4 py-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        <div className="mt-6">
                            <label htmlFor="expertise" className="block text-gray-700 font-medium mb-2">Subject Expertise</label>
                            <input
                                type="text"
                                id="expertise"
                                name="expertise"
                                placeholder="e.g., Mathematics, Physics"
                                className="bg-transparent w-full px-4 py-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        <div className="mt-4">
                            <label htmlFor="location" className="block text-gray-700 font-medium mb-2">Location</label>
                            <input
                                type="text"
                                id="location"
                                name="location"
                                placeholder="Enter your location"
                                className="bg-transparent w-full px-4 py-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        <div className="mt-4">
                            <label htmlFor="availability" className="block text-gray-700 font-medium mb-2">Availability</label>
                            <select
                                id="availability"
                                name="availability"
                                className="bg-transparent w-full px-4 py-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                                <option value="" disabled selected>Select your availability</option>
                                <option value="weekdays">Weekdays</option>
                                <option value="weekends">Weekends</option>
                                <option value="flexible">Flexible</option>
                            </select>
                        </div>

                        <div className="mt-6">
                            <label htmlFor="profile-picture" className="block text-gray-700 font-medium mb-2">Profile Picture</label>
                            <input
                                type="file"
                                id="profile-picture"
                                name="profile-picture"
                                className="bg-transparent w-full px-4 py-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        <div className="mt-4">
                            <label htmlFor="credentials" className="block text-gray-700 font-medium mb-2">Upload Credentials</label>
                            <input
                                type="file"
                                id="credentials"
                                name="credentials"
                                className="bg-transparent w-full px-4 py-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        <div className="mt-8">
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-purple-400 to-pink-500 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition">
                                Register as Mentor
                            </button>
                        </div>
                    </form>
                </div>
                <div className='w-full md:w-1/2 '>
                <img className='w-full h-full' src="\src\assets\photos\teacherForm2.png" alt="" />
                </div>
            </div>

            
        </div>
    )
}

export default MentorForm