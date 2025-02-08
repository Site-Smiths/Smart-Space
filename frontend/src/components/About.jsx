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
        <section className="py-16 bg-gradient-to-r from-purple-100 to-pink-100">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-12">
                    About Smart Space
                </h2>
                
             
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    
                  
                    <div className="bg-white p-8 rounded-lg shadow-xl transform transition-all hover:scale-105 duration-300">
                        <h3 className="text-3xl font-semibold text-purple-600 mb-6">Who We Are</h3>
                        <p className="text-gray-700 text-lg mb-6">
                            Smart Space is a platform designed to connect students with mentors who can guide them in their academic and professional journeys. Whether you're looking for career advice, academic support, or personal growth, Smart Space has you covered.
                        </p>
                        <p className="text-gray-700 text-lg">
                            Join us today and take the first step towards achieving your goals!
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-lg shadow-xl transform transition-all hover:scale-105 duration-300">
                        <h3 className="text-3xl font-semibold text-purple-600 mb-6">We Value Your Feedback</h3>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                                    placeholder="Enter your email"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">Your Feedback</label>
                                <textarea
                                    value={feedback}
                                    onChange={(e) => setFeedback(e.target.value)}
                                    required
                                    className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                                    placeholder="Share your thoughts..."
                                    rows="4"
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-purple-400 to-pink-500 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
                            >
                                Submit Feedback
                            </button>
                        </form>
                        {message && (
                            <p className="mt-6 text-center text-green-600 text-xl">{message}</p>
                        )}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default About;
