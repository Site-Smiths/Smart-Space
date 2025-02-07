import React, { useState } from 'react';

const About = () => {
    const [email, setEmail] = useState('');
    const [feedback, setFeedback] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email && feedback) {
            setMessage('Thank you for your feedback!');
            setEmail('');
            setFeedback('');
        } else {
            setMessage('Please fill in both fields.');
        }
    };

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8">About Smart Space</h2>
                
                {/* Two-column layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/* Left Side - About Section */}
                    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                        <h3 className="text-2xl font-semibold mb-4">Who We Are</h3>
                        <p className="text-gray-700 text-lg mb-4">
                            Masters Hub is a platform designed to connect students with mentors who can guide them in their academic and professional journeys. Whether you're looking for career advice, academic support, or personal growth, Masters Hub has you covered.
                        </p>
                        <p className="text-gray-700 text-lg">
                            Join us today and take the first step towards achieving your goals!
                        </p>
                    </div>

                    {/* Right Side - Feedback Form */}
                    <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                        <h3 className="text-2xl font-semibold mb-4">We Value Your Feedback</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    placeholder="Enter your email"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">Your Feedback</label>
                                <textarea
                                    value={feedback}
                                    onChange={(e) => setFeedback(e.target.value)}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    placeholder="Share your thoughts..."
                                    rows="4"
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-purple-400 to-pink-500 text-white py-2 rounded-lg font-semibold hover:opacity-90 transition"
                            >
                                Submit Feedback
                            </button>
                        </form>
                        {message && <p className="mt-4 text-center text-green-600">{message}</p>}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default About;
